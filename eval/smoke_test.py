#!/usr/bin/env python3
"""smoke_test.py — rsm-consulting-ppt-skills 结构完整性检查（优化轮必备门槛）。

固化 2026-10-03 架构审计用过的三类检查：
  1. 死链：所有 md 内的相对链接指向不存在的文件
  2. 孤儿：references/ 下的 md 没有被任何其他 md 提及（白名单除外）
  3. INDEX 覆盖：references/INDEX.md 的链接目标与 references/ 实际文件互相对账无缺无幻

注意：只核验链接目标，不裸搜文件名 token——skill 中大量 `xxx.md` 形态的反引号文本是
执行者要创建的「产物名」（如 title_spine.md / source_digest.md，见 docs/DEBT.md 架构
审计节），裸搜会把它们误判为死链/幻引。

用法：python3 eval/smoke_test.py <skill_dir>
退出码：0 = 全部通过；1 = 存在 FAIL。
"""
import re
import sys
from pathlib import Path

SKIP_DIRS = {".git", "eval", "__pycache__", "node_modules"}
ORPHAN_WHITELIST = {"SKILL.md", "README.md", "INDEX.md"}  # references/ 入口不需被引用
LINK_RE = re.compile(r"\[[^\]]*\]\(([^)\s]+)\)")
MD_TOKEN_RE = re.compile(r"([A-Za-z0-9][A-Za-z0-9_\-]*\.md)")


def collect_md(root: Path):
    return sorted(p for p in root.rglob("*.md") if not (set(p.parts) & SKIP_DIRS))


def main(skill_dir: str) -> int:
    root = Path(skill_dir).resolve()
    if not root.is_dir():
        print(f"FAIL: not a directory: {root}")
        return 1
    mds = collect_md(root)
    texts = {f"./{p.relative_to(root).as_posix()}": p.read_text(encoding="utf-8", errors="replace") for p in mds}
    all_names = {p.name for p in mds}
    fails, warns = [], []

    # 1. 死链（只认 markdown 链接目标）
    dead = []
    for key, text in texts.items():
        src = Path(key).parent
        for m in LINK_RE.finditer(text):
            target = m.group(1)
            if target.startswith(("http://", "https://", "mailto:", "#")):
                continue
            target = target.split("#")[0].split("?")[0]
            if not target:
                continue
            resolved = (src / target).resolve()
            if not resolved.exists():
                dead.append(f"{key} -> {target}")
    if dead:
        fails.append(f"死链 {len(dead)} 处: " + "; ".join(dead))

    # 2. 孤儿（references/ 下没有被任何其他 md 提及的文件；按词干匹配，容忍省略 .md）
    orphans = []
    refs_dir = root / "references"
    if refs_dir.is_dir():
        outside_corpus = "\n".join(t for k, t in texts.items() if not k.startswith("./references/"))
        for p in refs_dir.rglob("*.md"):
            stem = p.stem
            if stem in ORPHAN_WHITELIST:
                continue
            # INDEX 自身提及即不算孤儿；references 内其他文件提及 +1；外部提及 +1
            hits = outside_corpus.count(stem)
            inner = sum(t.count(stem) for k, t in texts.items()
                        if k.startswith("./references/") and not k.endswith("INDEX.md") and not k.endswith(p.name))
            if hits < 1 and inner < 1:
                orphans.append(p.name)
        if orphans:
            fails.append(f"孤儿 {len(orphans)} 个: {', '.join(orphans)}")

    # 3. INDEX 覆盖（链接目标对账）
    index_path = refs_dir / "INDEX.md"
    if index_path.is_file():
        index_text = index_path.read_text(encoding="utf-8", errors="replace")
        index_targets = set()
        for m in LINK_RE.finditer(index_text):
            t = m.group(1).split("#")[0].split("?")[0]
            if t.endswith(".md"):
                index_targets.add(Path(t).name)
        actual_refs = {p.name for p in refs_dir.rglob("*.md")} - {"INDEX.md"}
        missing = sorted(actual_refs - index_targets)
        phantom = sorted(n for n in index_targets if n not in all_names)
        if missing:
            fails.append(f"INDEX 缺收 {len(missing)} 个: {', '.join(missing)}")
        if phantom:
            fails.append(f"INDEX 幻引 {len(phantom)} 个（链接目标不存在）: {', '.join(phantom)}")
    else:
        warns.append("未找到 references/INDEX.md，跳过 INDEX 对账")

    print(f"扫描 {len(mds)} 个 md 文件于 {root.name}")
    for w in warns:
        print(f"WARN: {w}")
    if fails:
        for f in fails:
            print(f"FAIL: {f}")
        return 1
    print("PASS: 死链 0 / 孤儿 0 / INDEX 覆盖无缺无幻")
    return 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(2)
    sys.exit(main(sys.argv[1]))
