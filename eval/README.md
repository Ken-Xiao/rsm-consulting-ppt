# 评测基建（optimizer 专用，运行时执行者不需要读本目录）

本目录固化 rsm-consulting-ppt-skills 优化循环（Darwin 配对验证）的评测工件与检查工具，
目标：消灭三类已发生过的评测工件失真（DEBT.md「架构审计」节与 D7/D8/D9 各节有实录）：

| 历史失真 | 本目录的对策 |
|---|---|
| judge 简报手写判据写入误读（D7 误读 V2 路由，波及 D9 登记） | `judge-brief-template.md` 强制每条判据回链原文；`check_brief.py` 自动核验 |
| 快照不纯净（D8 第一次 spec-A 带上了未还原文件） | `snapshot.py` 统一快照 + 可选覆盖文件，杜绝手工 cp |
| 结构断点靠临时脚本检查（死链/孤儿/INDEX 漂移） | `smoke_test.py` 一条命令跑全部结构检查 |

## 标准流程（每轮优化）

1. **快照**：`python3 eval/snapshot.py /tmp/rsm-<id>/spec-A <skill_dir>`（改动前）；
   改动后同样命令生成 spec-B。若 spec-A 需要还原个别文件（如某轮 references/docs 与
   SKILL.md 不同步），用 `--set 相对路径=来源文件路径` 显式覆盖，不要手工 cp 后再改。
2. **结构检查**：改动后必须 `python3 eval/smoke_test.py <skill_dir>`，死链 0 / 孤儿 0 /
   INDEX 覆盖无缺无幻才允许进入配对验证。
3. **写 judge 简报**：按 `judge-brief-template.md` 写，地面真值每条必须注明出处文件。
4. **核验简报**：`python3 eval/check_brief.py <brief.md> <skill_dir>`，出现 GROUNDING-FAIL
   必须先修简报再发 judge。历史上 D7 的失真（把「小任务不读路由文件」写进判据，而源文件
   明写 Layer 0 Always Loaded）就是这一步能拦住的。
5. **执行与盲评**：executor 输出落 `out/<prompt>/<A|B>/`；judge 判定落 `out/<prompt>/`。
6. **归档**：/tmp 目录易失。每轮结束后把 `judge/brief.md` 与各 judge 的判定原文
   复制到 `eval/runs/<轮次id>/`（只存简报与判定，不存 executor 全文，控制体积），
   并在 darwin-skill `results.tsv` 记一行。

## 与运行时的边界

- `eval/` 不是运行时资产：执行者加载集不含本目录，`references/INDEX.md` 不收录本目录。
- `scripts/` 下的 validate-*.mjs 是交付物运行时校验，与本目录职责不同，勿混。
