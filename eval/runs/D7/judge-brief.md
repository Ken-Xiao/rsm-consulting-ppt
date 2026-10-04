# 盲评任务说明（D7 验证 · 导航与加载维度）

你是一名独立盲评 judge。你要比较两份执行者对**同一个任务**产出的「加载计划 + 判断依据」，
判定哪一份更好地满足了 skill 自身的导航与加载规则。你不知道两份输出分别来自哪个版本，也不需要猜。

## 一、技能规则地面真值（从 SKILL.md 提取，对两份候选同样适用）

### A. Core Workflow 无条件必读（任何 PPT 任务都要读）
1. `agent-behavioral-guardrail.md` —— 「每次任务的第一个动作必须读」
2. `strategy-brief.md`、`guided-interaction-pattern.md`、`decision-to-deck-attribute-map.md` —— 「对任何 PPT 任务，第一步必须读」
3. `confirmation-state-machine.md` —— 「任何确认节点必须读」

### B. 跨阶段必读（Key References 明写「任务开始时至少读这三个」）
`agent-behavioral-guardrail.md`、`progressive-loading-protocol.md`、`failure-modes.md`

### C. Decision Router「阶段必需（下限）」列 —— 该档位在当前阶段至少要读的文件
- **targeted-edit / quick-polish**：`agent-behavioral-guardrail.md`、`task-tier-protocol.md`、`agent-runtime.md`、`language-discipline.md`、`visual-qa-protocol.md`
- **client-ready**：`agent-behavioral-guardrail.md`、`confirmation-state-machine.md`、`confirmation-log-standard.md`、`client-delivery-standard.md`、`logic-gate-checklist.md`、`conclusion-evidence-matrix.md`、`data-lineage-protocol.md`、`professional-chart-rulebook.md`、`editability-check.md`、`visual-qa-protocol.md`、`deck-quality-scorecard.md`

### D. 条件必读（触发才读，按具体任务判断）
- `title-fit-standard.md`：「主标题和副标题进入版式前必须读」（改标题的任务触发）
- `incremental-edit-protocol.md`：局部修改或用户针对某几页反馈时读
- `confirmation-log-standard.md`：`partner-ready` 以上项目必须读
- `structure-first-confirmation-protocol.md`：用户回答后必须读
- `data-lineage-protocol.md`：金融项目必须读
- `scene-router.md`：金融复杂项目先读
- `v2-capability-router.md`：**「按需读取……不要在小任务中默认加载完整 V2 能力」** —— 即小任务默认**不**加载
- 其余 reference 均按「进入某 stage 前必须读」的触发条件加载

### E. 档位与阶段纪律
Decision Router 给出的是**整条路线的档位下限**，不等于「本轮要读」；本轮只取当前 stage 的部分，
后续 stage 的件应延后加载。所有被引用的文件名必须真实存在于 `references/` 目录。

## 二、判据（按重要性排序）

1. **覆盖度**：A、B、C 三组（以及本任务已触发的 D 组）必需件是否齐全。漏掉 A/B/C 中任何一件是硬伤。
2. **精确度**：有没有加载不该加载的件（夹带）。特别注意 D 组中「默认不加载」的项。
3. **导航可复现性**：加载计划是否写成「可被他人按同一规则复现」的形式（有明确来源、有取舍理由），
   而不是只给一个结果清单。
4. **文件名校验**：引用的文件名是否真实、有无虚构。
5. **阶段归属正确性**：延后加载的理由是否与「当前 stage」一致，而不是笼统说「不需要」。

## 三、输出格式（严格照此，不要展开）

```
判定：X 更好 / Y 更好 / 平手
强度：clear（明显）/ slight（略优）
理由：<2-4 句，逐条点出覆盖度与精确度的具体差异，点名具体文件名>
```
