#!/usr/bin/env python3
"""check_brief.py — judge 简报地面真值核验（防 D7 型失真：判据写入误读）。

检查四项：
  1. 简报中提到的每个 *.md 文件必须真实存在于 skill 中
  2. 简报不得残留模板使用说明引用块
  3. 负面表述（「不读 X」「不默认加载 X」「按需启用 X」）分级核验：
     - 强否定（不默认读/无需读/不读/不加载…）在源文件同现 → 通过
     - 仅「按需」类弱依据 → FAIL（弱依据不足以支撑条件性负面结论）
     - 与源文件「各档位都读 / Always Loaded / 每个任务都应 / Layer 0」同现且无强否定
       → FAIL（与源文件正面表述冲突，即 D7 失真形态）
  4. 正面必读表述在源文件找不到依据时给 WARN

匹配按词干（省略 .md 后缀也可命中，源文件常写作 `confirmation-state-machine`）。

用法：python3 eval/check_brief.py <brief.md> <skill_dir>
退出码：0 = 通过；1 = 存在 FAIL（必须修完简报再发 judge）。
"""
import re
import sys
from pathlib import Path

SKIP_DIRS = {".git", "eval", "__pycache__", "node_modules"}
MD_TOKEN_RE = re.compile(r"([A-Za-z0-9][A-Za-z0-9_\-]*\.md)")
NEG_MARKERS = ["不默认加载", "不默认读", "不得默认", "不需要读", "无需读", "不必读", "不加载", "不读", "按需读取", "按需启用", "按需读"]
STRONG_NEG = ["不默认加载", "不默认读", "不需要读", "无需读", "不必读", "不加载", "不读"]
WEAK_NEG = ["按需读取", "按需启用", "按需读"]
ALWAYS_POS = ["各档位都读", "各档位都要读", "Always Loaded", "always loaded", "每个任务都应", "Layer 0"]
POS_MARKERS = ["必读", "Always Loaded", "always loaded", "第一步必须读", "每个任务都应", "至少读", "任务开始时", "后读取", "后读"]


def collect(root: Path):
    out = {}
    for p in sorted(root.rglob("*.md")):
        if set(p.parts) & SKIP_DIRS:
            continue
        out[str(p.relative_to(root))] = p.read_text(encoding="utf-8", errors="replace").splitlines()
    return out


def grounded(lines, stem, markers, window=1):
    for i, line in enumerate(lines):
        if stem not in line:
            continue
        lo, hi = max(0, i - window), min(len(lines), i + window + 1)
        ctx = "\n".join(lines[lo:hi])
        if any(m in ctx for m in markers):
            return True
    return False


def main(brief_path: str, skill_dir: str) -> int:
    brief = Path(brief_path).read_text(encoding="utf-8", errors="replace")
    root = Path(skill_dir).resolve()
    src = collect(root)
    all_names = {Path(k).name for k in src}
    fails, warns = [], []

    # 1. 文件存在性
    mentioned = set(MD_TOKEN_RE.findall(brief))
    for name in sorted(mentioned):
        if name not in all_names:
            fails.append(f"简报引用的文件不存在于 skill：{name}")

    # 2. 模板残留
    if "模板使用说明" in brief:
        fails.append("简报仍包含模板使用说明引用块——发 judge 前必须删除")

    # 3/4. 逐行核验表述与文件名的共现
    for raw in brief.splitlines():
        line = raw.strip()
        files = set(MD_TOKEN_RE.findall(line))
        if not files:
            continue
        is_neg = any(m in line for m in NEG_MARKERS)
        is_pos = not is_neg and any(m in line for m in POS_MARKERS)
        for f in files:
            stem = f[:-3]
            hit = lambda ms: any(grounded(ls, stem, ms) for ls in src.values())
            if is_neg:
                strong, weak, conflict = hit(STRONG_NEG), hit(WEAK_NEG), hit(ALWAYS_POS)
                if conflict:
                    fails.append(f"GROUNDING-FAIL：负面表述与源文件正面表述冲突 —— 「{line[:60]}」中的 {f}，"
                                 f"源文件同现「各档位都读/Always Loaded/Layer 0」类表述"
                                 f"（即使另有强否定同现，也须人工复核宾语是否为同一对象）")
                elif not strong and weak:
                    fails.append(f"GROUNDING-FAIL：负面表述仅有「按需」类弱依据 —— 「{line[:60]}」中的 {f}，"
                                 f"弱依据不足以支撑条件性负面结论，请回链原文补强或删除该表述")
                elif not strong and not weak:
                    fails.append(f"GROUNDING-FAIL：负面表述缺源依据 —— 「{line[:60]}」中的 {f}")
            elif is_pos:
                if not hit(POS_MARKERS):
                    warns.append(f"正面必读表述未找到源同现：{f}（行：{line[:50]}）——请人工确认出处并补注")

    print(f"核验 {brief_path}（对 {root.name}，{len(src)} 个源文件）")
    for w in warns:
        print(f"WARN: {w}")
    if fails:
        for f in fails:
            print(f"FAIL: {f}")
        print(f"结论：{len(fails)} 项 FAIL，修完再发 judge")
        return 1
    print(f"PASS：{len(mentioned)} 个文件名全部存在；负面表述全部有源依据；{len(warns)} 条 WARN 待人工确认")
    return 0


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(2)
    sys.exit(main(sys.argv[1], sys.argv[2]))
