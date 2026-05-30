---
name: rsm-consulting-ppt-skills
description: 生成、优化或搭建中文金融咨询 PPT 生产管线。适用于董事会、管理层、投委会、投资人、监管/合规、培训分享等场景，覆盖银行对标、银行价值创造、保险公司新准则财务结果、银行/保险不良处置、资产/收储估值、尽调、行业研究、全球/区域政策制度比较、交易结构、融资方案和风险审查。强调先做引导访谈和场景路由，再做数据/事实池、叙事结构、视觉系统、可编辑 PPT 构建与审校。
---

# RSM Consulting PPT Skills

把材料整理成可独立阅读的中文金融咨询 PPT。每页必须有一句结论标题、一个主证明对象、必要解释和来源条。不要把 PPT 写成演讲提纲，也不要为了塞内容牺牲字号和可读性。

## Decision Router

先用下表定任务路线；只读取当前路线需要的 reference，避免小任务被完整生产管线拖慢。

| User asks for | Route | Tier | Minimum references |
|---|---|---|---|
| 美化、润色、改标题、优化少量页面 | `targeted-edit` / `optimize` | `quick-polish` | `task-tier-protocol.md`, `agent-runtime.md`, `language-discipline.md`, `visual-qa-protocol.md` |
| 从材料生成结构化 deck 或给经理/合伙人初审 | `create` / `optimize` | `partner-ready` | `strategy-brief.md`, `source-digest-standard.md`, `consulting-storyline-standard.md`, `storyline-page-planning.md`, `template-catalog.md`, `review-loop.md` |
| 客户正式交付、董事会、管理层、投委会、监管汇报 | `create` / `optimize` | `client-ready` | `client-delivery-standard.md`, `logic-gate-checklist.md`, `conclusion-evidence-matrix.md`, `data-lineage-protocol.md`, `professional-chart-rulebook.md`, `editability-check.md`, `visual-qa-protocol.md`, `deck-quality-scorecard.md` |
| 搭建/复刻/自动化 PPT 生产体系或模板库 | `pipeline` | `pipeline` | `workflow-san-pipeline.md`, `template-manifest.md`, `artifact-schema-library.md`, `visual-profile-registry.md`, `sample-regression-test.md`, `profile-regression-matrix.md` |

如果用户明确说“直接做/不要提问/按现有材料处理”，可跳过访谈，但仍要标记 tier、来源边界和未核验事项。

## Core Workflow

1. **Route**
   - 先判断任务是 `create`、`optimize`、`targeted-edit` 还是 `pipeline`。
   - 判断任务复杂度时先读 [task-tier-protocol](references/task-tier-protocol.md)，选择 `quick-polish`、`partner-ready`、`client-ready` 或 `pipeline`，并按档位决定必需 gate。
   - 金融复杂项目先读 [scene-router](references/scene-router.md)。
   - 完整生产管线、复刻 `ppt-agent-workflow-san` 或自动化体系时读 [workflow-san-pipeline](references/workflow-san-pipeline.md)。
   - 需要对比 Guide Mode 多阶段管线时再读 [genspark-style-pipeline](references/genspark-style-pipeline.md)。

2. **Ask Before Building**
   - 信息不足时先读 [strategy-brief](references/strategy-brief.md)，围绕受众、决策、主体、数据来源、对标范围、页数、语言、模板和版式密度提问。
   - 用户明确要求“直接优化/无需提问/按现有材料处理”时，可跳过访谈，但仍要保留来源和事实边界。

3. **Build The Fact Base**
   - 处理用户 PDF/PPT/Word/Excel 原始材料时先读 [source-digest-standard](references/source-digest-standard.md)，把素材拆成可引用事实、可用图片线索、限制条件和证据强度。
   - 处理数据、公开资料、Tushare/MCP 或用户文件时读 [data-pipeline](references/data-pipeline.md)。
   - 金融项目必须读 [data-lineage-protocol](references/data-lineage-protocol.md)，为关键数字、图表和测算建立来源血缘。
   - 用户允许外部资料或最新政策时读 [context-enrichment](references/context-enrichment.md)。
   - 已有 `data_pool.json` 时读 [insight-discovery](references/insight-discovery.md)，先找排名跳变、趋势背离、极值、聚类和回归信号。
   - 估值、交易、股研、私募、财富管理、基金运营或 KYC 场景可先借用本地 Anthropic financial-services skills 形成专业分析底稿，再转译为中文咨询页：
     - 建模/估值：`comps-analysis`、`dcf-model`、`lbo-model`、`3-statement-model`、`audit-xls`。
     - 投行材料：`pitch-deck`、`cim-builder`、`teaser`、`buyer-list`、`merger-model`、`process-letter`、`deal-tracker`。
     - 股研：`earnings-analysis`、`earnings-preview`、`model-update`、`sector-overview`、`initiating-coverage`、`thesis-tracker`。
     - 私募/投委会：`ic-memo`、`deal-screening`、`dd-checklist`、`returns-analysis`、`portfolio-monitoring`、`value-creation-plan`。
     - 基金运营/财富管理/KYC：`gl-recon`、`nav-tieout`、`variance-commentary`、`client-review`、`financial-plan`、`kyc-doc-parse`、`kyc-rules`。
   - 借用这些 skills 时，只吸收其分析框架、检查清单和输出结构；最终中文 PPT 仍必须遵守本 skill 的叙事、来源血缘、页面密度、视觉系统和审校要求。

4. **Design The Story**
   - 客户正式交付、董事会/投委会/管理层汇报必须读 [client-delivery-standard](references/client-delivery-standard.md)，从内容、视觉、语言三道门检查是否能达到客户可用标准。
   - 专业金融咨询交付必须读 [professional-consulting-standard](references/professional-consulting-standard.md)，用合伙人审稿标准检查每页是否有决策含义。
   - 进入大纲前读 [consulting-storyline-standard](references/consulting-storyline-standard.md)，先定义 `executive_question`、`deck_answer`、`chapter_answer`，再拆页面判断。
   - 正式汇报或经理级以上材料必须读 [logic-gate-checklist](references/logic-gate-checklist.md)，用 7 个逻辑 gate 检查客户问题、总答案、章节答案、页面判断、证据匹配、管理含义和决策路径。
   - 材料包含建议、方案、路径或行动计划时读 [decision-path-standard](references/decision-path-standard.md)，比较可选路径、推荐路径和不行动后果。
   - 复杂项目先读 [narrative-architect](references/narrative-architect.md)，用确认点推进：数据发现、叙事原型、模块页级结构、完整大纲。
   - 进入逐页设计前必须读 [storyline-page-planning](references/storyline-page-planning.md)，先形成 `title_spine.md` 和 `storyline_map.json`：主标题自成故事线，副标题承上启下，每页只证明故事线中的一个环节。
   - 进入章节拆分和逐页论证前读 [argument-map-standard](references/argument-map-standard.md)，确保每个章节答案、页面结论、证据对象和客户含义之间存在清晰论证链。
   - 核心结论进入页面前读 [conclusion-evidence-matrix](references/conclusion-evidence-matrix.md)，把每条结论、证据、证据强度、限制和对应页面绑定。
   - 按场景读取 [methodology-packs](references/methodology-packs.md)，补充样本、指标、口径、限制和方法论页。
   - 董事会深度分析、经营诊断或需要 SCQA 张力时读 [narrative-skeleton](references/narrative-skeleton.md)。
   - 跨国家、跨司法辖区、监管政策或制度比较项目读 [global-policy-comparison-template](references/global-policy-comparison-template.md)。
   - 需要中文表达和合规措辞时读 [language-discipline](references/language-discipline.md)、[consulting-language-playbook](references/consulting-language-playbook.md) 和 [language-style-library](references/language-style-library.md)，控制标题句式、判断强度、场景语气和敏感表达。

5. **Choose Layout And Visual System**
   - 选择视觉模式前先读 [visual-profile-registry](references/visual-profile-registry.md)，统一 canonical profile、别名、适用场景和弃用项。
   - 对标 RSM 参考 PDF/PPT 时先读 [rsm-reference-visual-dna](references/rsm-reference-visual-dna.md)，区分 `rsm-insurance-results`、`rsm-practice-sharing`、`rsm-global-policy` 和 `sunong-value-creation` 四种视觉模式。
   - 页面版式选择读 [template-catalog](references/template-catalog.md)。
   - 客户交付版的高频咨询页型读 [consulting-page-archetypes](references/consulting-page-archetypes.md)，补齐议题树、方案比较、推荐路径、风险缓释、行动计划、方法限制等页型。
   - 页面家族契约读 [page-family-contracts](references/page-family-contracts.md)，确认每页必填字段、文字量、主视觉对象和禁用项。
   - 章节页、目录页和章节转折图片生成读 [section-divider-image-protocol](references/section-divider-image-protocol.md)。章节页默认采用“章节编号 + 章节名称 + 专业金融/建筑/数据图片”的结构，图片可用 `gpt-image-generate` 生成。
   - 需要稳定调度 HTML 模板时读 [template-manifest](references/template-manifest.md)，用 manifest 将 `preset_family` 映射到模板、必填字段、渲染轨道和 QA 重点。
   - 图表选择读 [chart-decision-tree](references/chart-decision-tree.md)。
   - 专业金融图表画法读 [financial-chart-grammar](references/financial-chart-grammar.md)。
   - 重要图表、客户交付图表和复杂金融图表必须读 [professional-chart-rulebook](references/professional-chart-rulebook.md)，明确图表观点、基准、标注、口径、色彩和禁用场景。
   - 图表数据适配读 [chart-data-adapter](references/chart-data-adapter.md)。
   - 封面图、章节图、正文侧图、案例图、图标和 AI 生成图片必须读 [professional-image-rulebook](references/professional-image-rulebook.md)，明确图片用途、风格、版权、生成 prompt、可替代性和禁用项。
   - 视觉系统、字号、色板和反模式读 [visual-system](references/visual-system.md)。
   - 需要提升专业咨询机构成稿观感时读 [visual-presentation-upgrade](references/visual-presentation-upgrade.md)，检查阅读路径、密度层级、主证据突出度、辅助读法和视觉重量。
   - 核心正文页必须读 [exhibit-composition-standard](references/exhibit-composition-standard.md)，把页面组织为可独立阅读的咨询 exhibit。
   - 重要客户材料和完整 deck 读 [visual-executive-rhythm](references/visual-executive-rhythm.md)，控制页面节奏、密度层级、图表证明规则和视觉层级。
   - 若页面显得空、内容不够充实或客户交付版需要更饱满，必须读 [visual-fullness-standard](references/visual-fullness-standard.md)，用主证据层和辅助证据层填充主体区域。
   - 默认视觉使用 `2025年度上市保险公司新准则财务结果分析` 风格：`rsm-insurance-results`。
   - 默认页面特征：白底、亮蓝粗标题、左上 RSM 三色短条、右上浅蓝模块胶囊、浅灰结论条、白色阴影图表卡、蓝/深蓝/灰图表色板、极简页脚。
   - 不良处置/行业实践分享优先使用 `rsm-practice-sharing`。
   - 全球贷款核销、IFRS 9/CECL、税务协同、跨司法辖区政策比较优先使用 `rsm-global-policy`。
   - 苏农、农商行经营对标、价值创造、VQA、ROA/RAROC/EVA/PB、董事会经营诊断优先使用 `sunong-value-creation`。

6. **Build And Render**
   - 完整项目先读 [build-runner-protocol](references/build-runner-protocol.md)，按 validate → build → render → review → fix → delivery 的执行闭环推进。
   - 如需脚本化检查，优先运行 `scripts/validate-rsm-deck.mjs <output_dir>` 和 `scripts/validate-layout-manifest.mjs`。
   - 生成或校验中间产物时读 [artifact-schema-library](references/artifact-schema-library.md)，使用统一字段名，不临时发明 JSON 结构。
   - 构建前读 [artifact-validation-standard](references/artifact-validation-standard.md)，检查 `brief.json`、`data_pool.json`、`lineage_map.json`、`storyline_map.json`、`preset_map.json`、`chart_data/` 等中间产物是否完整。
   - 构建策略读 [visual-rendering-engine](references/visual-rendering-engine.md)。
   - 完整项目必须先生成 `preset_map.json` 或等价页面家族映射，再构建 PPTX。
   - 完整项目如包含章节，必须在 `preset_map.json` 中显式插入 `section_divider` 页；章节页不承担正文证明任务，只承担节奏切换、章节问题提示和视觉锚点。
   - 每页构建前先写 `visual_intent`：判断逻辑关系是递进、并列、对比、因果、下钻或综合，再选择图表、表格、流程、卡片或图片。
   - 优先使用可编辑 PPT 文本、形状、表格和图表；不要把整页压成图片。
   - 可编辑性检查读 [editability-check](references/editability-check.md)，关键文字、数字、表格、来源和结论必须可编辑；图片化对象必须保留源数据。
   - 客户可维护性检查读 [editable-component-standard](references/editable-component-standard.md)，区分原生可编辑层、渲染证据层和来源元数据层。
   - 复杂 KPI、热力矩阵、雷达、瀑布、高密度矩阵可用 HTML/Playwright 或 ECharts 渲染主体区。
   - HTML/CSS 参考在 [assets/layouts](assets/layouts/)；预览样例在 [assets/previews](assets/previews/)。

7. **Review**
   - 导出后读 [visual-qa-protocol](references/visual-qa-protocol.md)，渲染预览或 contact sheet，检查溢出、重叠、字号、来源和页码。
   - 客户交付前读 [presentation-polish-checklist](references/presentation-polish-checklist.md)，做对齐、视觉重量、标签图例、缩略图、打印和快速翻阅检查。
   - 每次完成草稿后必须读 [final-review-checklist](references/final-review-checklist.md)，分别站在合伙人和客户视角，从内容、逻辑、证据、呈现、语言、可编辑性等角度形成修正清单。
   - 完整审校读 [review-loop](references/review-loop.md)，覆盖数据一致性、叙事自洽性、视觉质量和事实校验。
   - 审校出现问题后读 [auto-fix-playbook](references/auto-fix-playbook.md)，按事实/逻辑/决策/呈现/语言/polish 的顺序返修。
   - 客户交付版语言润色读 [language-rewrite-pass](references/language-rewrite-pass.md)，逐页把标题、副标题、结论条和建议语句改写为专业咨询表达。
   - 客户会议或董事会材料必须读 [client-meeting-minutes-test](references/client-meeting-minutes-test.md)，检查标题、结论和建议能否直接进入会议纪要且不产生误解。
   - 交付评分读 [deck-quality-scorecard](references/deck-quality-scorecard.md)，判断是否达到 `client-ready` 或 `partner-ready`。
   - 大改 visual、preset 或渲染逻辑后读 [sample-regression-test](references/sample-regression-test.md)，生成样张回归测试。
   - 四套 visual profile 或 manifest 大改后读 [profile-regression-matrix](references/profile-regression-matrix.md)，并读取 `assets/regression/*.sample-manifest.json`，确保 `rsm-insurance-results`、`rsm-practice-sharing`、`rsm-global-policy`、`sunong-value-creation` 都有样张覆盖。
   - 用户要求沉淀模板时读 [scene-library-updater](references/scene-library-updater.md)。

## Non-Negotiables By Tier

### Always

- 每页标题必须是结论，不用“背景介绍 / 方案说明 / 数据展示”这类空标题。
- 每页只放一个主证明对象：图、表、矩阵、流程、时间轴、证据卡或对比结构。
- 所有数字、法律/财务/估值判断都要有来源、口径或前提。
- 图片必须有明确 `image_role`：cover、section_background、evidence_photo、case_context、icon 或 decorative_texture；只有 `evidence_photo` 可以作为事实证据，且必须有来源。
- 正文页普通正文不得小于 `18pt`；密集矩阵正文不得小于 `12pt`。装不下时删减、拆页或换版式，不继续缩小。
- 深色只用于封面、章节转折或用户明确要求；正文页不要使用厚重深色页眉。
- 每个任务必须标记执行档位：`quick-polish` 不得声称 client-ready；`partner-ready` 不得声称 client-ready。

### Quick-Polish

- 保留原材料的事实边界、来源、页码、logo、必要口径和用户要求保留的措辞。
- 可以不生成完整中间产物，但必须输出或说明 `polish_notes`：改了什么、哪些事实未核验、哪些页面仍有风险。
- 不新增未经用户材料支持的数字、法律/财务判断或管理建议。

### Partner-Ready

- 全 deck 的主标题必须能连读成完整故事线；副标题必须连接主标题、页面主体和上下页。
- 完整 deck 必须先有一个高层问题、一个总答案和若干章节答案；页面判断必须回链到章节答案。
- 核心分析页必须写清 `finding` 和 `implication`；决策页必须进一步写清 `recommended_action`。
- 建议不得停留在“关注、优化、加强”；必须给出指标、动作、阈值、责任边界或下一步验证事项。
- 核心正文页必须具备 `exhibit_structure`：scope、主证据、标注计划、辅助读法、来源边界。

### Client-Ready

- 客户交付版必须明确 `client_question` 和 `client_answer`；执行摘要必须能直接回答客户问题。
- 只要出现建议、方案或行动计划，必须比较至少两个路径，说明推荐路径、前提、不行动后果和下一步。
- 每个核心结论必须能回链到 `conclusion_evidence_matrix`；无证据的判断必须降级为假设、待验证事项或删除。
- 所有正文关键数字必须能回链到 `lineage_map.json`、`data_pool.json`、`chart_data/Pxx.json` 或原始材料。
- 所有核心图表必须有 `chart_point_of_view`、`benchmark_type`、`focus_series`、`annotation_priority`、`chart_readout`、单位、样本、期间和来源；缺任一项不得作为客户交付核心图表。
- 连续同一 page family 不宜超过 4 页；每 6-8 页至少有一页小结、桥接、含义或章节转折页。
- 每个正式章节必须有章节页或章节锚点；章节页只保留章节编号、章节名称、必要的一句话章节问题/章节答案和专业图片，不塞正文细节。
- 使用章节图片时必须记录 `image_prompt`、`image_role`、`style_profile` 和版权/生成说明；图片不得替代正文页证据。
- 正文页有效内容占用面积目标为 70%-82%；如果页面显得空，优先放大主证据对象、增加洞察卡或指标 strip，而不是缩小字号或增加装饰。
- 客户交付版必须生成或检查 contact sheet，确认整份 deck 的视觉节奏和模板一致性。
- 客户交付版必须通过 thumbnail test、print test 和 partner flip test。
- 每次草稿完成后必须做 final review；合伙人视角或客户视角出现 `critical` 不得交付，出现 `major` 必须修复或说明残余风险。
- 客户交付版构建前必须通过 artifact validation；存在 `critical` 不得进入正式构建。
- `client-ready` 必须通过逻辑 gate、语言 gate、可编辑 gate 和 contact sheet/profile 回归检查。

### Pipeline

- 复杂项目必须先形成中间产物：`brief.json`、`source_digest.md`、`conclusion_evidence_matrix.json`、`argument_map.json`、`data_pool.json`、`lineage_map.json`、`insights.json`、`title_spine.md`、`storyline_map.json`、`outline.json`、`design_system.json`、`preset_map.json`、`chart_data/`、`image_assets.json`、`visual_intent/`、`review_report.json` 或等价记录。
- 完整项目必须用 preset/page family 约束构建：先 `storyline_map.json`，再 `visual_intent/` 和 `preset_map.json`，再 PPTX。
- template manifest、visual profile、HTML layout 或渲染策略大改后，必须生成样张回归并记录缺口。

## Invocation Examples

### Example A: Quick Polish Existing PPT

User: `帮我把这几页 PPT 标题和版式优化一下，不用重新做分析。`

Do:
- 标记 tier 为 `quick-polish`。
- 读取 `task-tier-protocol.md`、`language-discipline.md`、`visual-qa-protocol.md`。
- 保留原事实和来源；只改标题判断句、段落结构、对齐、字号、溢出和视觉层级。
- 交付时说明 `polish_notes` 和未核验事实。

### Example B: Client-Ready From Source Files

User: `基于这些 PDF/Excel，做一份给管理层的正式汇报。`

Do:
- 标记 tier 为 `client-ready`，先问或确认 `client_question`、受众、对象、数据来源、页数和模板约束。
- 读取 source digest、data lineage、storyline、logic gate、chart rulebook、visual profile、artifact schema 和 QA references。
- 先生成 brief、事实池、证据矩阵、标题链、preset map 和 chart data，再构建 PPTX。
- 导出后做 contact sheet、final review、scorecard；不能通过时返修或说明残余风险。

### Example C: Build Reusable PPT Pipeline

User: `帮我搭建一套 RSM 金融咨询 PPT 自动化生产管线。`

Do:
- 标记 tier 为 `pipeline`。
- 读取 `workflow-san-pipeline.md`、`template-manifest.md`、`visual-profile-registry.md`、`artifact-schema-library.md`、`sample-regression-test.md`。
- 明确输入 artifact、page family、template manifest、渲染轨道、可编辑层和回归样张。
- 大改后运行 manifest 校验和 profile regression，输出缺模板、缺样张和风格漂移清单。

## Key References

- Runtime: [agent-runtime](references/agent-runtime.md)
- Scene routing: [scene-router](references/scene-router.md)
- Task tiering: [task-tier-protocol](references/task-tier-protocol.md)
- Workflow SAN: [workflow-san-pipeline](references/workflow-san-pipeline.md)
- Strategy questions: [strategy-brief](references/strategy-brief.md)
- Data and context: [source-digest-standard](references/source-digest-standard.md), [data-pipeline](references/data-pipeline.md), [data-lineage-protocol](references/data-lineage-protocol.md), [context-enrichment](references/context-enrichment.md)
- Client delivery: [client-delivery-standard](references/client-delivery-standard.md)
- Narrative: [professional-consulting-standard](references/professional-consulting-standard.md), [consulting-storyline-standard](references/consulting-storyline-standard.md), [logic-gate-checklist](references/logic-gate-checklist.md), [decision-path-standard](references/decision-path-standard.md), [argument-map-standard](references/argument-map-standard.md), [conclusion-evidence-matrix](references/conclusion-evidence-matrix.md), [narrative-architect](references/narrative-architect.md), [storyline-page-planning](references/storyline-page-planning.md), [narrative-skeleton](references/narrative-skeleton.md), [methodology-packs](references/methodology-packs.md), [global-policy-comparison-template](references/global-policy-comparison-template.md)
- Language: [language-discipline](references/language-discipline.md), [consulting-language-playbook](references/consulting-language-playbook.md), [language-style-library](references/language-style-library.md), [language-rewrite-pass](references/language-rewrite-pass.md), [client-meeting-minutes-test](references/client-meeting-minutes-test.md)
- Visuals: [visual-profile-registry](references/visual-profile-registry.md), [rsm-reference-visual-dna](references/rsm-reference-visual-dna.md), [visual-system](references/visual-system.md), [visual-presentation-upgrade](references/visual-presentation-upgrade.md), [section-divider-image-protocol](references/section-divider-image-protocol.md), [professional-image-rulebook](references/professional-image-rulebook.md), [exhibit-composition-standard](references/exhibit-composition-standard.md), [visual-executive-rhythm](references/visual-executive-rhythm.md), [visual-fullness-standard](references/visual-fullness-standard.md), [template-catalog](references/template-catalog.md), [template-manifest](references/template-manifest.md), [consulting-page-archetypes](references/consulting-page-archetypes.md), [page-family-contracts](references/page-family-contracts.md), [financial-chart-grammar](references/financial-chart-grammar.md), [professional-chart-rulebook](references/professional-chart-rulebook.md), [visual-rendering-engine](references/visual-rendering-engine.md)
- Build and validation: [build-runner-protocol](references/build-runner-protocol.md), [artifact-schema-library](references/artifact-schema-library.md), [artifact-validation-standard](references/artifact-validation-standard.md), [editable-component-standard](references/editable-component-standard.md)
- QA: [visual-qa-protocol](references/visual-qa-protocol.md), [presentation-polish-checklist](references/presentation-polish-checklist.md), [final-review-checklist](references/final-review-checklist.md), [review-loop](references/review-loop.md), [editability-check](references/editability-check.md), [deck-quality-scorecard](references/deck-quality-scorecard.md), [auto-fix-playbook](references/auto-fix-playbook.md), [sample-regression-test](references/sample-regression-test.md), [profile-regression-matrix](references/profile-regression-matrix.md)
