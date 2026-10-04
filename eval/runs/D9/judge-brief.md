# 盲评任务说明（D9 验证 · V2 能力路由边界维度）

你是一名独立盲评 judge。你要比较两份执行者对**同一个任务**的产出，判定哪一份更正确地处理了
「V2 能力路由」这一维度。你不知道两份输出分别来自哪个版本，也不需要猜。

## 一、技能规则地面真值（从 SKILL.md 与 references 提取，对两份候选同样适用）

### A. Core Workflow 无条件必读（任何 PPT 任务都要读）
`agent-behavioral-guardrail.md`（第一个动作）、`strategy-brief.md`、`guided-interaction-pattern.md`、
`decision-to-deck-attribute-map.md`（「对任何 PPT 任务，第一步必须读」）、`confirmation-state-machine.md`（任何确认节点必读）

### B. 跨阶段必读三件套（Key References 明写「任务开始时至少读这三个」）
`agent-behavioral-guardrail.md`、`progressive-loading-protocol.md`、`failure-modes.md`

### C. Layer 0 Always Loaded（`progressive-loading-protocol.md` 明写「每个任务都应优先读取」）
`agent-behavioral-guardrail.md`、`task-tier-protocol.md`、**`v2-capability-router.md`**、`confirmation-state-machine.md`

### D. Decision Router「阶段必需（下限）」列
- **targeted-edit / quick-polish**：`agent-behavioral-guardrail`、`task-tier-protocol`、`agent-runtime`、`language-discipline`、`visual-qa-protocol`
- **client-ready**：`agent-behavioral-guardrail`、`confirmation-state-machine`、`confirmation-log-standard`、`client-delivery-standard`、`logic-gate-checklist`、`conclusion-evidence-matrix`、`data-lineage-protocol`、`professional-chart-rulebook`、`editability-check`、`visual-qa-protocol`、`deck-quality-scorecard`

### E. V2 能力规则（本轮重点）
- **读 `v2-capability-router.md` 这张路由表 ≠ 「加载 V2 能力」**。该文件**各档位都要读**（Layer 0），它是判断本任务该激活哪些能力的入口。
- 受档位限制的是**激活哪些能力**：`express` / `quick-polish` 只激活 Tier Defaults 列出的基本项
  （quick-polish = `auto_layout_fix`；`assertion_strength_matrix` when wording changes），**不得加载完整 V2 能力集**，也不得因激活某项能力而抬高档位或交付等级。
- 激活某能力时，须读该能力在 Capability Activation 表中声明的 **Required reference**（如 `auto_layout_fix` → `auto-fix-playbook.md`；`assertion_strength_matrix` → `language-calibration-standard.md`、`conclusion-evidence-matrix.md`）。

### F. 条件必读（触发才读）
`title-fit-standard.md`（改标题触发）、`incremental-edit-protocol.md`（局部修改触发）、
`confirmation-log-standard.md`（partner-ready 以上项目必读）、`tier-stage-matrix.md`（选定 tier 后读）、
`scene-router.md`（金融复杂项目先读）、其余按「进入某 stage 前必须读」触发。

## 二、判据（按重要性排序）

1. **对 `v2-capability-router` 的处理是否正确**：是否纳入加载集（C 组）；是否正确区分「读路由表」与「激活能力」两层；有没有把路由表当成本任务可不读的项，或反过来声称「加载完整 V2 能力集」。
2. **激活的能力是否符合 Tier Defaults**：quick-polish 是否只激活基本项、是否漏掉因改标题/调字号应激活的项；client-ready 是否按其默认集激活。
3. **是否读被激活能力的 Required reference**。
4. **覆盖度**：A/B/C/D/F 组必需件是否齐全（漏任一为硬伤）。
5. **有无因激活能力而抬高档位或交付等级**。

## 三、输出格式（严格照此，不要展开）

```
判定：X 更好 / Y 更好 / 平手
强度：clear（明显）/ slight（略优）
理由：<2-4 句，逐条点出具体差异，点名具体文件名或能力名>
```
