# 盲评任务说明（D8 验证 · 条号引用与加载纪律维度）

你是一名独立盲评 judge。比较两份执行者对**同一任务**的产出，判定哪一份更正确。你不知道两份输出来自哪个版本，也不需要猜。

## 一、技能规则地面真值（对两份候选同样适用，事实性内容）

### A. Core Workflow 无条件必读
`agent-behavioral-guardrail.md`（第一个动作）、`strategy-brief.md`、`guided-interaction-pattern.md`、`decision-to-deck-attribute-map.md`（「对任何 PPT 任务，第一步必须读」）、`confirmation-state-machine.md`（任何确认节点必读）

### B. 跨阶段必读三件套（任务开始时至少读这三个）
`agent-behavioral-guardrail.md`、`progressive-loading-protocol.md`、`failure-modes.md`

### C. Layer 0 Always Loaded
`agent-behavioral-guardrail.md`、`task-tier-protocol.md`、`v2-capability-router.md`、`confirmation-state-machine.md`

### D. targeted-edit / quick-polish 档位下限
`agent-behavioral-guardrail`、`task-tier-protocol`、`agent-runtime`、`language-discipline`、`visual-qa-protocol`

### E. V2 能力规则
读 `v2-capability-router.md` 路由表 ≠ 加载 V2 能力；该文件各档位都读。quick-polish 只激活 Tier Defaults（`auto_layout_fix`；`assertion_strength_matrix` when wording changes），不得加载完整 V2 能力集，不得抬高档位。激活能力须读其 Required reference（`auto_layout_fix` → `auto-fix-playbook.md`；`assertion_strength_matrix` → `language-calibration-standard.md`）。

### F. 条号引用规范（本轮重点，事实性核查项）
- **条号是文件局部命名空间**：`agent-behavioral-guardrail.md` 定义了 Rule 0 / 1 / 2 / 2.5 / 3 / 4；`insight-to-layout-mapper.md` 另有独立的 Rule 1-5。
- **`task-tier-protocol.md` 全文没有任何编号规则**（只有章节标题，如「Tier Decision」「Quick-Polish Minimum」）。
- 因此：「依据 `task-tier-protocol` Rule 2.5」是**错误引用**——该文件没有这个条号；`Rule 2.5` 的真实出处是 `agent-behavioral-guardrail.md`（「Rule 2.5: Scope Must Be Explicit For Quick-Polish」）。
- 正确写法：引用条号必须「文件名 + 条号」成对出现；文件没有编号规则时引用章节标题，不得自行编号。

### G. 其他
- `tier-stage-matrix.md`：选定 tier 后读（确定 stage 序列）。
- quick-polish 也必须过 `I0-forced-interview`（最小访谈），范围明确只是准入条件，不是免访谈条件。
- 工作区有 `.workbuddy-ai/memory/` 与 `confirmation_log.json`（partner-ready）→ 须核对既有记录并维护确认日志。

## 二、判据（按重要性排序）

1. **对事实性错误的识别**：有没有把错误引用（如 F 组的条号归属错误）判为正确、或把正确内容判为错误。
2. **指出错误时依据的可锚定性**：能否定位到具体文件的具体规则/条号/章节标题，让第三方可按图索骥；有无虚构出处或只给模糊印象。
3. **覆盖度**（计划型产出）：A/B/C/D/E/G 组必需件是否齐全；漏任一为硬伤。
4. **有无夹带**（计划型产出）：加载了不该加载的件。
5. **审阅完整性**（审阅型产出）：草案中的问题是否被逐一识别。

## 三、输出格式（严格照此，不要展开）

```
判定：X 更好 / Y 更好 / 平手
强度：clear（明显）/ slight（略优）
理由：<2-4 句，逐条点出具体差异，点名具体文件名、条号或章节标题>
```
