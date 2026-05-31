# Task Tier Protocol

用于把 PPT 任务按复杂度分级，避免小任务被完整生产管线拖慢，也避免客户交付项目跳过关键 gate。进入事实池、故事线或构建前先读取本文件。

涉及中间产物字段时读取 `references/artifact-schema-library.md`；涉及视觉模式命名时读取 `references/visual-profile-registry.md`；涉及 PRD V2 增量能力时读取 `references/v2-capability-router.md`。

## Tier Decision

先判断任务属于哪一档：

| Tier | Use when | Typical output | Required rigor |
|---|---|---|---|
| `express` | 用户明确要求快速内部初稿、brainstorming、培训草稿、一句话先出一版 | `internal-draft` deck 或页面草稿 | 只做基本来源边界、结论标题、字号/溢出/对齐 QA；禁止标记为正式交付 |
| `quick-polish` | 用户要求快速优化、改语言、改版式、补标题、单页/少量页 targeted edit | 修订后的页面或小 deck | 保留来源边界，做语言/视觉 QA，不强制完整数据血缘 |
| `partner-ready` | 需要形成可给经理/合伙人初审的结构化 deck，通常 8-25 页 | 有故事线、页面家族、图表口径和初步审校的 PPT | 必须有客户问题、章节答案、页面 claim、核心来源和 review report |
| `client-ready` | 正式客户交付、董事会/管理层/投委会/监管汇报，或用户明确要求高质量成稿 | 可转发/上会的完整 deck | 必须有完整事实池、lineage、证据矩阵、preset map、contact sheet、final review 和 scorecard |
| `pipeline` | 用户要求搭建、复刻或自动化 PPT 生产系统 | 模板、脚本、manifest、样张回归 | 必须有 manifest、样张、回归报告和可维护目录 |

## Tier Build Stages

选定 tier 后，读取 `references/tier-stage-matrix.md` 并使用对应 stage 列表：

| Tier | Stage list |
|---|---|
| `express` | `S1-minimal → S2-simple → S4-basic → S6-draft` |
| `quick-polish` | `S1-minimal → S2-patch → S3-optional → S4-basic → S6-polish` |
| `partner-ready` | `S0 → S1 → S1.6 → S2.5 → S2.6 recommended → S2 → S3 → S4 → S5 → S6` |
| `client-ready` | `S0 → S1 → S1.5 → S1.6 → S2.5 → S2.6 → S2 → S3 → S4 → S5 → S6` |
| `pipeline` | `S0 → S1 → S1.5 → S1.6 → S2.5 → S2.6 → S2 → S3 → S4 → S5 → S6 → regression` |

不要在 `express` 或 `quick-polish` 中默认加载完整 `client-ready` references。

## Express Minimum

`express` 是 Genspark-style 快速通道，只适用于内部讨论和初稿探索。

必须：

- 输出标记为 `internal-draft`。
- 保留或标明数据/来源边界。
- 每页标题尽量改为判断句。
- 做基础 visual QA：溢出、重叠、字号、对齐、页码。
- 明确说明未做完整 logic gate、lineage、fact check 和 client-ready review。

禁止：

- 标记为 `partner-ready` 或 `client-ready`。
- 用 `express` 结果直接替代客户正式交付。
- 新增未经核验的金融、法律、估值或监管判断。

## Quick-Polish Minimum

`quick-polish` 可跳过完整中间产物，但不得跳过：

- 每页标题改成判断句。
- 来源、口径或事实边界不丢失。
- 正文关键数字不新增无来源判断。
- 图表/表格不改变事实含义。
- 检查文字溢出、字号、页码和 logo。
- 输出简短 `polish_notes`：改了什么、未核验什么。

禁止把 `quick-polish` 标记为 `client-ready`。

## Partner-Ready Minimum

`partner-ready` 必须形成或等价记录：

- `client_question` 和 `draft_client_answer`
- `consulting_pyramid`：deck answer + chapter answers
- `title_spine`：主标题连读故事线
- `outline`：每页 claim、证据对象、page family、来源
- `preset_map`：每页 visual profile、density、render strategy
- `review_report`：至少覆盖逻辑、证据、视觉、语言

可接受的限制：

- 核心数字可先使用来源注释，不要求每个数字都有完整 `lineage_id`。
- 图表可先用 mock 或手工图，但必须标注待替换数据。
- 可输出 `partner-ready`，不得输出 `client-ready`。

## Client-Ready Minimum

`client-ready` 必须通过：

- `artifact-validation-standard.md`
- `logic-gate-checklist.md`
- `conclusion-evidence-matrix.md`
- `professional-chart-rulebook.md`
- `editability-check.md`
- `visual-qa-protocol.md`
- `sample-regression-test.md` 或等价 contact sheet 检查
- `client-meeting-minutes-test.md`
- `deck-quality-scorecard.md`
- `confirmation-state-machine.md`
- `confirmation-log-standard.md`

交付前必须生成：

```json
{
  "tier": "client-ready",
  "required_artifacts": {
    "brief": true,
    "source_digest": true,
    "confirmation_log": true,
    "data_pool": true,
    "lineage_map": true,
    "consulting_pyramid": true,
    "conclusion_evidence_matrix": true,
    "argument_map": true,
    "storyline_map": true,
    "preset_map": true,
    "chart_data": true,
    "visual_intent": true,
    "contact_sheet": true,
    "review_report": true,
    "final_review_report": true
  }
}
```

## Escalation Rule

任务过程中如果出现以下情况，自动升档：

- 用户要求“客户可交付”“董事会”“投委会”“管理层正式汇报”：升至 `client-ready`。
- 出现建议、方案选择、行动计划或风险判断：至少 `partner-ready`。
- 出现外部数据、政策、估值、法律或财务判断：至少 `partner-ready`，正式交付为 `client-ready`。
- 用户只给一句“帮我美化/优化这几页”：保持 `quick-polish`，除非页面事实存在明显风险。
- 用户明确说“先快速出一个内部草稿/brainstorming/不对外”：可降为 `express`，但必须标记 `internal-draft`。

## Tier Output Tag

最终 `delivery_note.md` 或回复中必须说明：

- 本次按哪一档执行。
- 哪些 gate 已通过。
- 哪些 gate 因任务档位未执行。
- 是否能标记为 `partner-ready` 或 `client-ready`。
- `manager-ready` 可作为 `partner-ready` 的口语别名；正式产物中统一写 `partner-ready`。
