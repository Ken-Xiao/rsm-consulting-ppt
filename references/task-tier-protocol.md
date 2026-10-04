# Task Tier Protocol

用于把 PPT 任务按复杂度分级，避免小任务被完整生产管线拖慢，也避免客户交付项目跳过关键 gate。所有 PPT 任务先完成 `I0-forced-interview`，再进入分级；进入事实池、故事线或构建前先读取本文件。

涉及中间产物字段时读取 `references/artifact-schema-library.md`；涉及视觉模式命名时读取 `references/visual-profile-registry.md`；确定档位后读取 `references/v2-capability-router.md`，按其 Tier Defaults 只激活本档位默认能力，不加载完整 V2 能力集。

## Tier Decision

先完成 `I0-forced-interview`，再根据用户回答判断任务属于哪一档。不得在访谈前直接认定任务为 `quick-polish` 或 `express` 并开始修改。

| Tier | Use when | Typical output | Required rigor |
|---|---|---|---|
| `express` | 用户明确要求快速内部初稿、brainstorming、培训草稿，且说明不用于正式交付 | `internal-draft` deck 或页面草稿 | 只做基本来源边界、结论标题、字号/溢出/对齐 QA；禁止标记为正式交付 |
| `quick-polish` | 用户明确指定少量页码、页面范围或具体元素，只改语言/版式/标题/错字 | 修订后的页面或小 deck | 保留来源边界，做语言/视觉 QA，不强制完整数据血缘 |
| `partner-ready` | 需要形成可给经理/合伙人初审的结构化 deck，通常 8-25 页 | 有故事线、页面家族、图表口径和初步审校的 PPT | 必须有客户问题、章节答案、页面 claim、核心来源和 review report |
| `client-ready` | 正式客户交付、董事会/管理层/投委会/监管汇报，或用户明确要求高质量成稿 | 可转发/上会的完整 deck | 必须有完整事实池、lineage、证据矩阵、preset map、contact sheet、final review 和 scorecard |
| `pipeline` | 用户要求搭建、复刻或自动化 PPT 生产系统 | 模板、脚本、manifest、样张回归 | 必须有 manifest、样张、回归报告和可维护目录 |

## Tier Build Stages

选定 tier 后，读取 `references/tier-stage-matrix.md` 并使用对应 stage 列表：

| Tier | Stage list |
|---|---|
| `express` | `I0-forced-interview → S1-minimal → S2-simple → S4-basic → S6-draft` |
| `quick-polish` | `I0-forced-interview → S1-minimal → S2-patch → S3-optional → S4-basic → S6-polish` |
| `partner-ready` | `I0-forced-interview → S0 → S1 → S1.6 → S2.5 → S2.6 recommended → S2 → S3 → S4 → S5 → S6` |
| `client-ready` | `I0-forced-interview → S0 → S1 → S1.5 → S1.6 → S2.5 → S2.6 → S2 → S3 → S4 → S5 → S6` |
| `pipeline` | `I0-forced-interview → S0 → S1 → S1.5 → S1.6 → S2.5 → S2.6 → S2 → S3 → S4 → S5 → S6 → regression` |

不要在 `express` 或 `quick-polish` 中默认加载完整 `client-ready` references。

## Express Minimum

`express` 是 Genspark-style 快速通道，只适用于内部讨论和初稿探索。

必须：

- 先完成最小访谈，确认这是内部草稿、目标、范围和不可改边界。
- 用户明确说这是内部草稿、brainstorming、培训草稿或快速探索；单独的“先出一版看看”不够。
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

- 先完成最小访谈，确认范围、目标、不可改边界和风险接受。
- 任务范围必须明确为少量页面、页码范围或具体元素。
- 不改变整体故事线、章节顺序、分析框架或建议路径。
- 不新增分析结论、测算、对标样本、风险判断或管理建议。
- 每页标题改成判断句。
- 来源、口径或事实边界不丢失。
- 正文关键数字不新增无来源判断。
- 图表/表格不改变事实含义。
- 检查文字溢出、字号、页码和 logo。
- 输出简短 `polish_notes`：改了什么、未核验什么。

禁止把 `quick-polish` 标记为 `client-ready`。

如果用户说“整体优化”“整体升级”“重新 review”“再做一轮”“根据材料优化”“按这个规则更新”，默认不是 `quick-polish`，应升为 `partner-ready` 的 Question Gate，除非用户同时明确限定只改少量页/元素。

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
- 用户只给一句“帮我美化/优化这几页”：只有能识别出具体页面范围且不改故事线时才保持 `quick-polish`；否则先提问确认范围。
- 用户明确说“先快速出一个内部草稿/brainstorming/不对外”：完成最小访谈后可降为 `express`，但必须标记 `internal-draft`。
- 用户只说“先出一版看看”：默认不是 `express`，先问这是内部草稿还是希望进入结构化 deck 流程。

## Tier Output Tag

最终 `delivery_note.md` 或回复中必须说明：

- 本次按哪一档执行。
- 哪些 gate 已通过。
- 哪些 gate 因任务档位未执行。
- 是否能标记为 `partner-ready` 或 `client-ready`。
- `manager-ready` 可作为 `partner-ready` 的口语别名；正式产物中统一写 `partner-ready`。
