# 盲评任务说明（D10 验证 · 档位下限件 stage 排期维度）

你是一名独立盲评 judge。你要比较两份执行者对**同一个任务**的产出，判定哪一份更正确地处理了
「档位下限件的排期与列示」这一维度。你不知道两份输出分别来自哪个版本，也不需要猜。

## 一、技能规则地面真值（从源文件提取，对两份候选同样适用；每条注明出处）

### A. 每任务必读 9 文件（唯一权威 = `progressive-loading-protocol.md` Layer 0）
`agent-behavioral-guardrail.md`、`strategy-brief.md`、`guided-interaction-pattern.md`、
`decision-to-deck-attribute-map.md`、`task-tier-protocol.md`、`v2-capability-router.md`、
`confirmation-state-machine.md`、`progressive-loading-protocol.md`、`failure-modes.md`
（出处：`progressive-loading-protocol.md` Layer 0 表格）

### B. 并集规则
本轮加载计划 = A 组清单 ∪ Decision Router「阶段必需（下限）」列 ∪ 本任务触发的条件件；
**下限件必须在任务开始时的加载计划中逐件列明**，不得以「未进入该 stage」为由删除或降为可选项
（出处：`progressive-loading-protocol.md` Layer 0 裁决段；`SKILL.md` Decision Router 表下注）。

### C. 下限件 stage 归属权威表（本轮重点）
Decision Router 下限列中未出现在 Layer 1 各 stage 行的文件，其 stage 归属一律查
`progressive-loading-protocol.md` **Layer 1b「档位下限件的 stage 归属」表**，例如：
`data-lineage-protocol.md`→`S1` 事实池、`conclusion-evidence-matrix.md`→`S1.6`/`S2` 结论绑定、
`professional-chart-rulebook.md`→`S2`/`S2.5` 图表、`editability-check.md`→`S5`、
`client-delivery-standard.md`→`S6`、`confirmation-log-standard.md`→`S0` 全程、
`tier-stage-matrix.md`→`S0` 定档后、`language-discipline.md`→`S2` patch/`S4`、
`agent-runtime.md`→`S0`、`review-loop.md`→`S4`、`source-digest-standard.md`→`S1`、
`consulting-storyline-standard.md`/`storyline-page-planning.md`→`S1.6`、`template-catalog.md`→`S2` 等
（出处：`progressive-loading-protocol.md` Layer 1b 表）。
- **Layer 1 与 Layer 1b 都查不到的档位下限件属文件缺陷，应补入而非由执行者自行推断**（出处：同上 Layer 0 裁决段末句）。
- 已在 Layer 1 各 stage 行的下限件（如 `logic-gate-checklist`→`S1`、`visual-qa-protocol`→`S3/S4`、
  `deck-quality-scorecard`→`S3/S4`）沿用 Layer 1 排期（出处：Layer 1 表 + Layer 1b 表下注）。

### D. 已排期下限件的完整清单（client-ready 档，用于覆盖度核对）
`confirmation-log-standard`(S0)、`client-delivery-standard`(S6)、`logic-gate-checklist`(S1)、
`conclusion-evidence-matrix`(S1.6/S2)、`data-lineage-protocol`(S1)、`professional-chart-rulebook`(S2/S2.5)、
`editability-check`(S5)、`visual-qa-protocol`(S3/S4)、`deck-quality-scorecard`(S3/S4)
（出处：`SKILL.md` Decision Router 第 4 行下限列 + Layer 1b）

## 二、判据（按重要性排序）

1. **client-ready（或相应档位）下限件是否全部列入加载计划并标注 stage 排期**：漏列任一、
   或只写「以后再读」而不给 stage 归属，均为硬伤。
2. **排期依据是否正确**：是否援引 Layer 1b 表（或 Layer 1 行）作为排期出处；
   有没有把下限件说成「不属本轮加载集」而整体排除，或自行发明与 Layer 1b 不符的 stage 归属。
3. **有无过度加载**：把 Layer 1b 的下限件说成「任何任务、任何档位都必读」，
   或把 Layer 1 的 stage 触发件（如 `html-preview-protocol`）当成本轮必读。
4. **A 组 9 件每任务必读是否齐全**。

## 三、输出格式（严格照此，不要展开）

```
判定：X 更好 / Y 更好 / 平手
强度：clear（明显）/ slight（略优）
理由：<2-4 句，逐条点出具体差异，点名具体文件名或 stage>
```
