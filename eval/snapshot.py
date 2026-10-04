#!/usr/bin/env python3
"""snapshot.py — 生成规格快照（spec-A / spec-B），治 D8 型快照不纯净。

复制 skill 目录（排除 .git、eval/runs、缓存），打印 SKILL.md 字节数供台账记录。
若改动前快照需要同步个别后续才修改的文件（如 references/docs 与 SKILL.md 版本错位），
用 --set 显式覆盖，不要手工 cp 后再改。

用法：
  python3 eval/snapshot.py /tmp/rsm-<id>/spec-A <skill_dir>
  python3 eval/snapshot.py /tmp/rsm-<id>/spec-A <skill_dir> --set references/docs/GLOSSARY.md=/path/to/old/GLOSSARY.md
"""
import argparse
import shutil
import sys
from pathlib import Path

EXCLUDE_DIRS = {".git", "runs", "__pycache__", "node_modules"}
EXCLUDE_FILES = {".DS_Store"}


def ignore(dir_, names):
    return [n for n in names if n in EXCLUDE_DIRS or n in EXCLUDE_FILES
            or (dir_.endswith("eval") and n != "README.md")]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("dst")
    ap.add_argument("src")
    ap.add_argument("--set", action="append", default=[], metavar="REL=ABS",
                    help="复制后用指定来源文件覆盖相对路径 REL")
    args = ap.parse_args()
    src, dst = Path(args.src).resolve(), Path(args.dst).resolve()
    if not src.is_dir():
        print(f"FAIL: source not a directory: {src}")
        return 1
    if dst.exists():
        print(f"FAIL: destination already exists（快照必须纯净，禁止覆盖）: {dst}")
        return 1
    shutil.copytree(src, dst, ignore=shutil.ignore_patterns(*EXCLUDE_DIRS, *EXCLUDE_FILES))
    for pair in args.set:
        rel, _, override = pair.partition("=")
        if not rel or not override:
            print(f"FAIL: --set 需要 REL=ABS 格式，得到：{pair}")
            return 1
        o = Path(override).resolve()
        if not o.is_file():
            print(f"FAIL: --set 来源不存在: {o}")
            return 1
        target = dst / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(o, target)
        print(f"override: {rel} <- {o}")
    skill = dst / "SKILL.md"
    size = skill.stat().st_size if skill.is_file() else -1
    n_files = sum(1 for p in dst.rglob("*") if p.is_file())
    print(f"快照完成: {dst}  共 {n_files} 个文件  SKILL.md = {size} bytes")
    return 0


if __name__ == "__main__":
    sys.exit(main())
