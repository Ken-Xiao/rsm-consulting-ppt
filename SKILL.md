---
name: rsm-consulting-ppt-skills
description: Use this skill for ANY Chinese finance/consulting PPT request before using generic Presentations, pitch-deck, deck-refresh, or layout-only skills. 适用于生成、整体优化、局部美化、改标题、改颜色、重构、复刻风格、客户交付、董事会/管理层/投委会/监管汇报等所有 PPT 任务。强制先访谈：第一响应只提出中文确认问题并等待回答；先锁定受众、场景、范围、不可改边界、核心信息、研究深度、页数、叙事、风险态度、视觉和样章节奏；访谈完成并确认框架前不得直接生成逐页内容、HTML preview 或 PPTX。
---

# RSM Consulting PPT Skills

把材料整理成可独立阅读的中文金融咨询 PPT。每页必须有一句结论标题、一个主证明对象、必要解释和来源条。不要把 PPT 写成演讲提纲，也不要为了塞内容牺牲字号和可读性。

默认语言为中文（`zh-CN`）：除非用户明确要求英文、双语、海外总部/外资机构汇报，或原始材料必须保留英文表达，否则标题、正文、注释、审校意见和交付说明都以中文为主。

## First Response Contract

这是本 skill 的最高优先级运行规则。只要本 skill 因任何 PPT 相关任务触发，无论是新建、整体优化、局部修改、美化、改标题、改颜色、快速草稿、内部草稿、复刻风格、客户交付、董事会/管理层/投委会/监管汇报，当前第一条回复都必须停在访谈。

本 skill 是 PPT 任务的治理入口，不只是渲染 skill。若同时可用 `Presentations`、`pitch-deck`、`deck-refresh`、reference-layout 子 skill 或其他 PPT 生成工具，必须先执行本 skill 的 `I0-forced-interview`；其他工具只能在 `CN0_interview` 完成后作为下游渲染/构建工具使用。

Fail closed：如果不确定是否已经完成访谈，默认视为未完成，当前回复必须先提问；不得用“历史上下文可能已经聊过”作为继续构建的理由。

第一条回复只能做三件事：

1. 说明将先完成强制访谈，避免直接生成后方向不对。
2. 给出 1-2 句基于材料/文件名/上下文的默认假设。
3. 根据任务规模提出中文确认问题，并停在等待用户回答（**【硬停】**，见 Core Workflow 的检查点速查）。

第一条回复不得输出逐页正文、完整大纲、图表细节、HTML preview、PPTX 构建或“我先开始做”。即使用户写“跳过提问，直接生成最终 PPT / 不要确认了直接做 / skip questions and build”，也不得无交互开工；必须先走最小访谈，确认跳过意图、修改范围和未确认风险接受，再决定下一步执行档位。

所有 PPT 任务的提问必须遵守 [guided-interaction-pattern](references/guided-interaction-pattern.md)：每轮 1-4 题，题目带推荐选项，并说明每个选择会锁定哪些 PPT 属性。用户回答后用 [decision-to-deck-attribute-map](references/decision-to-deck-attribute-map.md) 将回答写入 `interaction_locks` 或等价记录。

## What This Skill Changes

普通 PPT 往往先堆材料、再套版式；本 skill 先确认客户问题和整体框架，再把材料拆成“结论-证据-含义-行动”的咨询页。

| Before | After |
|---|---|
| 标题是主题词：`经营情况分析` | 标题是判断句：`利润改善尚未完全转化为核心营收质量` |
| 目录按材料顺序堆放 | 章节按客户问题、总答案和证据链组织 |
| 图表只展示数字 | 图表必须有观点、基准、标注和管理含义 |
| 建议写成“持续优化/加强关注” | 建议必须回链矛盾、根因、行动、责任和指标 |
| 做完整份再审 | 长 deck 设置 milestone preview，分段确认方向 |

## Decision Router

先用下表定任务路线；只读取当前路线需要的 reference，避免小任务被完整生产管线拖慢。

| User asks for | Route | Tier | Build stages | 阶段必需（下限） |
|---|---|---|---|---|
| 明确内部草稿、brainstorming、培训草稿，且用户说明不用于正式交付 | `express` | `express` / `internal-draft` | `I0-forced-interview → S1-minimal → S2-simple → S4-basic → S6-draft` | `agent-behavioral-guardrail.md`, `task-tier-protocol.md`, `v2-capability-router.md`, `visual-qa-protocol.md` |
| 明确小范围美化、润色、改标题、只改指定页码或指定元素 | `targeted-edit` | `quick-polish` | `I0-forced-interview → S1-minimal → S2-patch → S3-optional → S4-basic → S6-polish` | `agent-behavioral-guardrail.md`, `task-tier-protocol.md`, `agent-runtime.md`, `language-discipline.md`, `visual-qa-protocol.md` |
| 从材料生成结构化 deck、整体优化/升级/重构，或给经理/合伙人初审 | `create` / `structural-optimize` | `partner-ready` | `I0-forced-interview → S0 → S1 → S1.6 → S2.5 → S2.6 recommended → S2 → S3 → S4 → S5 → S6` | `agent-behavioral-guardrail.md`, `confirmation-state-machine.md`, `confirmation-log-standard.md`, `strategy-brief.md`, `source-digest-standard.md`, `consulting-storyline-standard.md`, `storyline-page-planning.md`, `template-catalog.md`, `review-loop.md` |
| 客户正式交付、董事会、管理层、投委会、监管汇报，或用户要求高质量成稿 | `create` / `structural-optimize` | `client-ready` | `I0-forced-interview → S0 → S1 → S1.5 → S1.6 → S2.5 → S2.6 → S2 → S3 → S4 → S5 → S6` | `agent-behavioral-guardrail.md`, `confirmation-state-machine.md`, `confirmation-log-standard.md`, `client-delivery-standard.md`, `logic-gate-checklist.md`, `conclusion-evidence-matrix.md`, `data-lineage-protocol.md`, `professional-chart-rulebook.md`, `editability-check.md`, `visual-qa-protocol.md`, `deck-quality-scorecard.md` |
| 搭建/复刻/自动化 PPT 生产体系或模板库 | `pipeline` | `pipeline` | `I0-forced-interview → S0 → S1 → S1.5 → S1.6 → S2.5 → S2.6 → S2 → S3 → S4 → S5 → S6 → regression` | `agent-behavioral-guardrail.md`, `progressive-loading-protocol.md`, `tier-stage-matrix.md`, `workflow-san-pipeline.md`, `template-manifest.md`, `artifact-schema-library.md`, `visual-profile-registry.md`, `sample-regression-test.md`, `profile-regression-matrix.md` |

**「阶段必需（下限）」列是该档位在当前阶段至少要读的文件，不是 Core Workflow 必须读清单的全集。** Core Workflow 中写明「必须读」「第一步必须读」的文件在任何档位都要读——本轮加载集取两者的**并集**；本列未列出不等于可以不读，也不得据本列推断某文件「本任务不需要」。每任务必读集的唯一权威清单是 [progressive-loading-protocol](references/progressive-loading-protocol.md) 的 Layer 0（当前 9 个文件）；完整文件清单见 [references/INDEX.md](references/INDEX.md)。

访谈不可跳过，只有访谈后的执行深度可以降低；各档位差异见 Non-Negotiables By Tier，强指令处理见 First Response Contract。

“按现有材料处理”“帮我优化”“整体优化”“整体升级”“继续做一版”“先出一版看看”“之前已经聊过类似项目”不视为完成访谈；仍必须先提问并等待用户回答。

## Core Workflow

**检查点速查**：下表是全部硬停点。标 **【硬停】** 的节点未通过时，当前回复必须停在该节点，不得生成后续阶段产物。细则（State Nodes / Invalid transitions / Agent Reply Rule）见 [confirmation-state-machine](references/confirmation-state-machine.md)。

用户坚持跳过某个硬停点时，走 [failure-modes](references/failure-modes.md) F6：必须先要求用户**显式接受风险**；接受后才可推进，且必须记录 `direct_build_after_minimal_interview`、在交付说明中声明未确认风险，并**不得声称 `client-ready`**。停点表列出的禁止项不替代这一降级记录要求。

| 检查点 | 位置 | 通过条件 | 未通过时 |
|---|---|---|---|
| **【硬停】** `CN0_interview` | Route 之后 | 用户回答了访谈问题，或明确接受最小访谈 | 停在提问，不得输出逐页正文、HTML preview 或 PPTX |
| **【硬停】** `CN1_framework` | Design The Story 结束前 | 用户确认核心问题、总答案假设、章节结构、页数预算 | 只能输出 `framework_confirmation`，不得展开逐页细节 |
| **【硬停】** `CN2_layout` | Choose Layout And Visual System 结束前 | 用户确认页面家族、密度和回退方案 | 不得生成 `preset_map.json` 或进入构建 |
| **【硬停】** `CN3_html_preview` | Build And Render 的批量构建之前 | 用户确认关键页视觉方向，或明确接受 `preview_unavailable` | 不得批量构建 PPTX |
| **【硬停】** stage gate | 每次 stage 切换前 | `validate-confirmation-state.mjs` 通过 | 停止，不得进入下一 stage |

各步的输入与产出见下；`partner-ready` 以上项目的确认状态必须落到 `confirmation_log.json`。

1. **Route**
   - **输入**：用户请求 + 工作区既有记录（`.workbuddy-ai/memory/`、`HANDOFF.md`、`confirmation_log.json`、已确认预览）；**产出**：`route`、`tier`、stage 序列和本轮 reference 清单，写入 `interaction_locks` 或 `brief.json`。
   - 每次任务的第一个动作必须读 [agent-behavioral-guardrail](references/agent-behavioral-guardrail.md)，在读完之前不得读其他 reference、生成内容或进入构建，避免把“继续做一版/按材料处理”误判为确认信号。
   - 若用户要求继续既有项目，或工作区存在 `.workbuddy-ai/memory/`、`HANDOFF.md`、`confirmation_log.json`、已确认预览或批次审阅记录，先只读核对最新日期的项目日志与确认/交付产物，再看较早交接文档。只把明确记录为用户确认的决定当作已锁定；助手建议、推断和过期状态不得冒充用户决定。发现记录冲突时注明来源和日期，无法判定时询问用户。记忆可避免重复提问，但不能替代当前任务必需的 `CN0_interview`。
   - 若任务需要多阶段执行，读 [progressive-loading-protocol](references/progressive-loading-protocol.md)，只加载当前 tier 和 stage 必需 reference。
   - 先进入 `I0-forced-interview`，提出最少必要问题并等待用户回答；访谈完成后再判断任务是 `express`、`create`、`structural-optimize`、`targeted-edit` 还是 `pipeline`。
   - 判断任务复杂度时先读 [task-tier-protocol](references/task-tier-protocol.md)，选择 `express`、`quick-polish`、`partner-ready`、`client-ready` 或 `pipeline`，并按档位决定必需 gate。
   - 选定 tier 后读 [tier-stage-matrix](references/tier-stage-matrix.md)，按对应 stage 列表推进，不自行跳过或扩展 stage。
   - PRD V2 能力按需读取 [v2-capability-router](references/v2-capability-router.md)：**读这张路由表不等于「加载 V2 能力」**——它是判断本任务该激活哪些能力的入口，各档位都要读（`progressive-loading-protocol` 的 Layer 0）。受档位限制的是**激活哪些能力**：`express` / `quick-polish` 只激活 Tier Defaults 列出的基本项，不得加载完整 V2 能力集，也不得因激活某项能力而抬高档位或交付等级。
   - 金融复杂项目先读 [scene-router](references/scene-router.md)。
   - 商业银行押品、不动产价值管理、按揭年度重估或价值认定服务材料，路由到 `bank-real-estate-value-service`，并读取 [bank-real-estate-value-service-standard](references/bank-real-estate-value-service-standard.md)。
   - 完整生产管线、复刻 `ppt-agent-workflow-san` 或自动化体系时读 [workflow-san-pipeline](references/workflow-san-pipeline.md)。
   - 需要对比 Guide Mode 多阶段管线时再读 [genspark-style-pipeline](references/genspark-style-pipeline.md)。

2. **Ask Before Building**
   - **输入**：材料线索（文件名或内容）+ 默认假设；**产出**：`brief.json`、`interaction_locks`、`confirmation_log.json` 的 `CN0_interview` 记录；`partner-ready` 以上另有 `framework_confirmation.md`（`CN1_framework`）。
   - 对任何 PPT 任务，第一步必须读 [strategy-brief](references/strategy-brief.md)、[guided-interaction-pattern](references/guided-interaction-pattern.md) 和 [decision-to-deck-attribute-map](references/decision-to-deck-attribute-map.md)，先向用户提出中文确认问题并等待回答。即使材料看起来完整，也要把推断写成假设请用户确认。
   - 每个提问必须对应一个 deck 属性锁定项，例如受众语气、信息密度、核心信息、研究深度、页数预算、叙事框架、风险页位置、模板保留度、样章节奏或批量产出节奏；不会改变 PPT 属性的问题不要问。
   - 任何确认节点必须读 [confirmation-state-machine](references/confirmation-state-machine.md)：只有 `CN0_interview` 访谈完成后，才能进入下一阶段；后续节点只有用户明确确认或确认带修改，才能推进。
   - 所有 PPT 任务都应记录或等价记录 `CN0_interview` 的用户回答和锁定属性；`partner-ready` 以上项目必须读 [confirmation-log-standard](references/confirmation-log-standard.md)，维护 `confirmation_log.json`，记录 CN0/CN1/CN2/CN3 的用户信号、状态和锁定产物。
   - 用户回答后，必须读 [structure-first-confirmation-protocol](references/structure-first-confirmation-protocol.md)：基于材料向用户确认核心问题、总答案假设、分析框架、章节结构、页数预算和视觉风格；用户确认前不得展开逐页正文、详细图表或正式 PPTX 构建。
   - 局部修改或用户针对某几页反馈时读 [incremental-edit-protocol](references/incremental-edit-protocol.md)，先限定修改范围，不触发整 deck 重生成。

3. **Build The Fact Base**
   - **输入**：用户原始材料（PDF/PPT/Word/Excel/网页/访谈纪要）+ `brief.json`；**产出**：`source_digest.md`、`data_pool.json`、`lineage_map.json`、可选 `context_enrichment.json`，以及已有 `data_pool.json` 时的 `insights.json` 和 `insight_layout_map.json`。
   - 处理用户 PDF/PPT/Word/Excel 原始材料时先读 [source-digest-standard](references/source-digest-standard.md)，把素材拆成可引用事实、可用图片线索、限制条件和证据强度。
   - 处理数据、公开资料、Tushare/MCP 或用户文件时读 [data-pipeline](references/data-pipeline.md)。
   - 金融项目必须读 [data-lineage-protocol](references/data-lineage-protocol.md)，为关键数字、图表和测算建立来源血缘。
   - 关键数据、政策或市场信息进入核心结论时读 [content-freshness-and-evidence](references/content-freshness-and-evidence.md)，记录 `as_of_date`、`freshness_tier` 和证据可信度。
   - 用户允许外部资料或最新政策时读 [context-enrichment](references/context-enrichment.md)。
   - 已有 `data_pool.json` 时读 [insight-discovery](references/insight-discovery.md)，先找排名跳变、趋势背离、极值、聚类和回归信号。
   - 发现进入页面规划前必须读 [insight-to-layout-mapper](references/insight-to-layout-mapper.md)，把每条洞察映射为 `insight_type`、页面角色、逻辑关系和推荐 page family。
   - 估值、交易、股研、私募、财富管理、基金运营或 KYC 场景可先借用本地 Anthropic financial-services skills 形成专业分析底稿，再转译为中文咨询页：
     - 建模/估值：`comps-analysis`、`dcf-model`、`lbo-model`、`3-statement-model`、`audit-xls`。
     - 投行材料：`pitch-deck`、`cim-builder`、`teaser`、`buyer-list`、`merger-model`、`process-letter`、`deal-tracker`。
     - 股研：`earnings-analysis`、`earnings-preview`、`model-update`、`sector-overview`、`initiating-coverage`、`thesis-tracker`。
     - 私募/投委会：`ic-memo`、`deal-screening`、`dd-checklist`、`returns-analysis`、`portfolio-monitoring`、`value-creation-plan`。
     - 基金运营/财富管理/KYC：`gl-recon`、`nav-tieout`、`variance-commentary`、`client-review`、`financial-plan`、`kyc-doc-parse`、`kyc-rules`。
   - 借用这些 skills 时，只吸收其分析框架、检查清单和输出结构；最终中文 PPT 仍必须遵守本 skill 的叙事、来源血缘、页面密度、视觉系统和审校要求。

4. **Design The Story**
   - **输入**：`brief.json` + `source_digest.md` + `data_pool.json`/`insights.json`；**产出**：`conclusion_evidence_matrix.json`、`argument_map.json`、`title_spine.md`、`storyline_map.json`、`outline.json`、`content_density_report.json`。**本步结束前必须通过【硬停】`CN1_framework`。**
   - 客户正式交付、董事会/投委会/管理层汇报必须读 [client-delivery-standard](references/client-delivery-standard.md)，从内容、视觉、语言三道门检查是否能达到客户可用标准。
   - 专业金融咨询交付必须读 [professional-consulting-standard](references/professional-consulting-standard.md)，用合伙人审稿标准检查每页是否有决策含义。
   - 进入大纲前读 [consulting-storyline-standard](references/consulting-storyline-standard.md)，先定义 `executive_question`、`deck_answer`、`chapter_answer`，再拆页面判断。
   - 进入逐页大纲前再次核对 [structure-first-confirmation-protocol](references/structure-first-confirmation-protocol.md)：**【硬停】** 如果整体框架尚未被用户确认，只能输出 `framework_confirmation`，不能继续生成细节。
   - 正式汇报或经理级以上材料必须读 [logic-gate-checklist](references/logic-gate-checklist.md)，用 7 个逻辑 gate 检查客户问题、总答案、章节答案、页面判断、证据匹配、管理含义和决策路径。
   - 材料包含建议、方案、路径或行动计划时读 [decision-path-standard](references/decision-path-standard.md)，比较可选路径、推荐路径和不行动后果。
   - 专题模块完成后需要提炼结构性矛盾时读 [contradiction-synthesis-protocol](references/contradiction-synthesis-protocol.md)，从正负信号共存中提炼 top 3 矛盾。
   - 行动地图、12 个月路径、整改建议或授权事项必须读 [action-derivation-chain](references/action-derivation-chain.md)，确保行动项回链矛盾、根因、改善路径、责任和指标。
   - 压力情景、敏感性矩阵、财务推演或两种图景页面必须读 [stress-scenario-content-standard](references/stress-scenario-content-standard.md)。
   - 复杂项目先读 [narrative-architect](references/narrative-architect.md)，用确认点推进：数据发现、叙事原型、模块页级结构、完整大纲。
   - 进入逐页设计前必须读 [storyline-page-planning](references/storyline-page-planning.md)，先形成 `title_spine.md` 和 `storyline_map.json`：主标题自成故事线，副标题承上启下，每页只证明故事线中的一个环节。
   - 逐页大纲进入视觉前必须读 [content-density-precheck](references/content-density-precheck.md)，先判断每页证据量是 `content_thin`、`balanced`、`content_heavy` 还是 `overloaded`，再决定补证据、合并或拆页。
   - 主标题和副标题进入版式前必须读 [title-fit-standard](references/title-fit-standard.md)，对中文标题做长度、行数、字号和改写检查；标题过长时先改写，不先缩小字号。
   - 进入章节拆分和逐页论证前读 [argument-map-standard](references/argument-map-standard.md)，确保每个章节答案、页面结论、证据对象和客户含义之间存在清晰论证链。
   - 核心结论进入页面前读 [conclusion-evidence-matrix](references/conclusion-evidence-matrix.md)，把每条结论、证据、证据强度、限制和对应页面绑定。
   - 按场景读取 [methodology-packs](references/methodology-packs.md)，补充样本、指标、口径、限制和方法论页。
   - 董事会深度分析、经营诊断或需要 SCQA 张力时读 [narrative-skeleton](references/narrative-skeleton.md)。
   - 跨国家、跨司法辖区、监管政策或制度比较项目读 [global-policy-comparison-template](references/global-policy-comparison-template.md)。
   - 需要中文表达和合规措辞时读 [language-discipline](references/language-discipline.md)、[consulting-language-playbook](references/consulting-language-playbook.md) 和 [language-style-library](references/language-style-library.md)，控制标题句式、判断强度、场景语气和敏感表达。
   - 页面文字的语域判定与验收必须绑定 `writing-style` skill 的咨询语域：写标题、副标题、结论条和建议语时，除本 skill 的 playbook 外，读该 skill 的 `DISTILLATION/麦肯锡咨询文风.md`（放宽边界、不放宽项、10 条验收判据）；交付前用 `python3 <writing-style>/scripts/check_prose.py --register consulting <稿件>` 做程序化检查。`consulting` 语域放宽破折号、引号密度和段首「此外／与此同时」，但不放宽「不编造数据与来源、口径声明、假设显式化、空泛重要性、模糊归因」。语域判错等于规则方向判错。**咨询语域是叠加层，不替代本 skill 既有的 client-ready 硬要求**：建议必须比较至少两个路径、必须给出指标与阈值、禁止单独使用「建议关注／持续优化」等表达——这些要求不因切换语域而放宽；两者冲突时以本 skill 的硬要求为准。
   - 中文金融数字、金额、百分比、同比/环比、百分点、基点和估值倍数表达必须读 [number-expression-standard](references/number-expression-standard.md)，避免 `%`、`pct`、`bp`、排名样本和小数位口径混乱。
   - `partner-ready` 以上或受众专业程度不一时读 [language-calibration-standard](references/language-calibration-standard.md)，校准受众、判断强度和语气弧线。
   - 用户要求中英双语、外资/合资/海外总部汇报时读 [bilingual-output-standard](references/bilingual-output-standard.md)，做双语平行创作而非直译。

5. **Choose Layout And Visual System**
   - **输入**：`outline.json` + `storyline_map.json` + 用户视觉要求 + [assets/design-tokens.json](assets/design-tokens.json)；**产出**：`design_system.json`、`visual_locks`、`layout_analysis_report.json`、`preset_map.json`、`template_manifest`，以及采用外部参考版式时的 `reference_layout_profile.json`。**本步结束前必须通过【硬停】`CN2_layout`。**
   - 选择视觉模式前先读 [visual-profile-registry](references/visual-profile-registry.md)，统一 canonical profile、别名、适用场景和弃用项。
   - 每个 PPT 项目在视觉方案确认后，把用户明确的视觉要求转为既有 `interaction_locks` / `design_system.json` 中的 `visual_locks`，至少记录 `property`、`value`、`source`（本轮用户明确 / 已确认样章 / 项目记忆中的用户决定 / profile 默认）、`scope`（全册 / 章节 / 页码）、`status`（confirmed / proposed / superseded）和 `qa_check`；不另造平行文件。优先级为本轮明确要求 > 本轮最近确认的样章/决定 > 项目记忆中有证据的用户决定 > profile 默认。助手建议不得升级成锁；记忆与当前指令冲突时以当前指令为准，冲突范围不清时先问。项目级偏好不得自动推广成 profile 的全局默认。
   - 用户每次给出视觉反馈时，只更新其明确覆盖的属性和受影响页面，保留其他已确认锁；记录被替代的旧锁及影响范围，并把对应 QA 检查带入本轮回归。视觉锁至少覆盖用户触及的字体、允许/禁用色、语义编码、字号/密度、图像与页码规则、可编辑性和预览节奏。
   - 生成 `preset_map.json` 前必须读 [universal-page-family-registry](references/universal-page-family-registry.md)、[layout-lock-protocol](references/layout-lock-protocol.md) 和 [assets/design-tokens.json](assets/design-tokens.json)：先按内容逻辑选择跨主题通用 `canonical_family`，再注入当前 `visual_profile` 的 design tokens，最后映射到具体模板；不得临时发明自由布局。
   - 对标 RSM 参考 PDF/PPT 时先读 [rsm-reference-visual-dna](references/rsm-reference-visual-dna.md)，区分 `rsm-insurance-results`、`rsm-practice-sharing`、`rsm-global-policy` 和 `sunong-value-creation` 四种视觉模式。
   - 用户提供或要求使用 `ppt版式/` 参考版式时，必须读 [reference-layout-library](references/reference-layout-library.md)、[reference-layout-analysis-framework](references/reference-layout-analysis-framework.md)、[scenario-layout-selector](references/scenario-layout-selector.md) 和 [universal-page-family-registry](references/universal-page-family-registry.md)，只把英文参考版式当作版面结构参考，先分析版面布局、字体、字号、结构、图表、表格和图片规则，再迁移到中文金融叙事和当前 RSM token。
   - 页面版式选择读 [template-catalog](references/template-catalog.md)。
   - 客户交付版的高频咨询页型读 [consulting-page-archetypes](references/consulting-page-archetypes.md)，补齐议题树、方案比较、推荐路径、风险缓释、行动计划、方法限制等页型。
   - 页面家族契约读 [page-family-contracts](references/page-family-contracts.md)，确认每页必填字段、文字量、主视觉对象和禁用项。
   - 章节页、目录页和章节转折图片生成读 [section-divider-image-protocol](references/section-divider-image-protocol.md)；需要现成背景图 prompt 时再读 [section-image-prompt-library](references/section-image-prompt-library.md)。章节页默认采用“章节编号 + 章节名称 + 专业金融/建筑/数据图片”的结构，图片可用 `gpt-image-generate` 生成。
   - 需要稳定调度 HTML 模板时读 [template-manifest](references/template-manifest.md)，用 manifest 将 `preset_family` 映射到模板、必填字段、渲染轨道和 QA 重点。
   - 图表选择读 [chart-decision-tree](references/chart-decision-tree.md)。
   - 专业金融图表画法读 [financial-chart-grammar](references/financial-chart-grammar.md)。
   - 重要图表、客户交付图表和复杂金融图表必须读 [professional-chart-rulebook](references/professional-chart-rulebook.md)，明确图表观点、基准、标注、口径、色彩和禁用场景。
   - 图表数据适配读 [chart-data-adapter](references/chart-data-adapter.md)。
   - 封面图、章节图、正文侧图、案例图、图标和 AI 生成图片必须读 [professional-image-rulebook](references/professional-image-rulebook.md)，明确图片用途、风格、版权、生成 prompt、可替代性和禁用项。
   - 视觉系统、字号、色板和反模式读 [visual-system](references/visual-system.md)。
   - 正文页进入 HTML 设计阶段前必须读 [html-page-design-standard](references/html-page-design-standard.md)：按「整体页面结构 → 图形呈现结构 → 文字呈现结构」三层定稿，前一层未定稿不进入下一层，三层各过各的 QA。三层在 HTML 阶段定稿并取得用户确认，PPTX 只做还原、不重新设计。
   - frontend design 方法（`impeccable`）按该文件的吸收契约取用：吸收设计上下文、模块化字阶、空间节奏、对比度体系、视觉层级与评审框架；丢弃响应式断点、动效、可达性、性能等 web 专属项；冲突时以 RSM 品牌、当前 profile token 和已确认视觉锁为准。
   - `partner-ready` 以上生成 `preset_map.json` 后读 [visual-rhythm-orchestrator](references/visual-rhythm-orchestrator.md)，计算 `rhythm_score`、章节色温和缓冲页需求。
   - 需要提升专业咨询机构成稿观感时读 [visual-presentation-upgrade](references/visual-presentation-upgrade.md)，检查阅读路径、密度层级、主证据突出度、辅助读法和视觉重量。
   - 核心正文页必须读 [exhibit-composition-standard](references/exhibit-composition-standard.md)，把页面组织为可独立阅读的咨询 exhibit。
   - 重要客户材料和完整 deck 读 [visual-executive-rhythm](references/visual-executive-rhythm.md)，控制页面节奏、密度层级、图表证明规则和视觉层级。
   - 若页面显得空、内容不够充实或客户交付版需要更饱满，必须读 [visual-fullness-standard](references/visual-fullness-standard.md)，用主证据层和辅助证据层填充主体区域。
   - 生成或修改高频 HTML 模板、HTML preview 或客户交付正文页时必须读 [template-fill-level-standard](references/template-fill-level-standard.md)，确保模板从 `skeleton` 升级为 `structured` 或 `filled`，不得只留 `主图区域` 类 placeholder。
   - 采用外部参考版式时，必须在 `layout_analysis_report.json` 中写明 `reference_layout_choice`、`source_preview`、`replication_scope` 和 `best_rsm_profile_match`，并至少生成 2 张关键页 HTML preview 供用户确认。
   - 默认视觉使用 `2025年度上市保险公司新准则财务结果分析` 风格：`rsm-insurance-results`。
   - 默认页面特征：白底、亮蓝粗标题、左上 RSM 三色短条、右上浅蓝模块胶囊、浅灰结论条、白色阴影图表卡、蓝/深蓝/灰图表色板、极简页脚。
   - 不良处置/行业实践分享优先使用 `rsm-practice-sharing`。
   - 全球贷款核销、IFRS 9/CECL、税务协同、跨司法辖区政策比较优先使用 `rsm-global-policy`。
   - 苏农、农商行经营对标、价值创造、VQA、ROA/RAROC/EVA/PB、董事会经营诊断优先使用 `sunong-value-creation`。

6. **Build And Render**
   - **输入**：`preset_map.json` + `layout_analysis_report.json` + `chart_data/` + `image_assets.json`；**产出**：`html_preview_report.json`、`visual_intent/`、可编辑 PPTX 和渲染预览。**批量构建前必须通过【硬停】`CN3_html_preview`。**
   - 完整项目先读 [build-runner-protocol](references/build-runner-protocol.md)，按 validate → build → render → review → fix → delivery 的执行闭环推进。
   - 25 页以上、董事会/合伙人/客户正式交付材料必须读 [milestone-preview-protocol](references/milestone-preview-protocol.md)，设置 MP1/MP2/MP3 阶段预览，避免方向错误后大规模返工。
   - 完整项目构建前必须读 [layout-analysis-report](references/layout-analysis-report.md)，在 `preset_map.json` 之后生成 `layout_analysis_report.json`，让用户确认版式分配、密度风险和关键页型后再进入 HTML 预览或 PPTX 构建。
   - `partner-ready` 以上项目在正式 PPTX 构建前必须读 [html-preview-protocol](references/html-preview-protocol.md)，先生成或说明 3-5 张关键页 HTML 预览，等待用户确认后再批量构建。
   - 如需脚本化检查，优先运行 `scripts/validate-rsm-deck.mjs <output_dir>` 和 `scripts/validate-layout-manifest.mjs`。
   - `partner-ready` 以上在 stage 切换前优先运行 `scripts/validate-confirmation-state.mjs <output_dir> --tier <tier> --stage <stage>`；**【硬停】** 确认节点未通过时必须停止，不能继续生成下一阶段产物。
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
   - **输入**：构建产物 + 渲染预览或 contact sheet；**产出**：`review_report.json`、`final_review_report.json`、质量评分，以及 `polish_notes` 或交付说明。
   - 导出后读 [visual-qa-protocol](references/visual-qa-protocol.md)，渲染预览或 contact sheet，检查溢出、重叠、字号、来源和页码。
   - 若最终交付是由封面、章节页、正文页或外层框架装配的完整 deck，必须对用户实际接收的最终组合件再做一次结构与截图级 QA；单页 HTML/PNG 和 contact sheet 不能替代组合件检查。核对装配后页序、内容页码、章节衔接、空白/占位页、框架装饰和内容区；交付 PPTX 时还要检查最终 PPTX 渲染，不只检查 HTML 源页。
   - 客户交付前读 [presentation-polish-checklist](references/presentation-polish-checklist.md)，做对齐、视觉重量、标签图例、缩略图、打印和快速翻阅检查。
   - 每次完成草稿后必须读 [final-review-checklist](references/final-review-checklist.md)，分别站在合伙人和客户视角，从内容、逻辑、证据、呈现、语言、可编辑性等角度形成修正清单。
   - 完整审校读 [review-loop](references/review-loop.md)，覆盖数据一致性、叙事自洽性、视觉质量和事实校验。
   - 审校出现问题后读 [auto-fix-playbook](references/auto-fix-playbook.md)，按事实/逻辑/决策/呈现/语言/polish 的顺序返修。
   - 客户交付版语言润色读 [language-rewrite-pass](references/language-rewrite-pass.md)，逐页把标题、副标题、结论条和建议语句改写为专业咨询表达。
   - 客户会议或董事会材料必须读 [client-meeting-minutes-test](references/client-meeting-minutes-test.md)，检查标题、结论和建议能否直接进入会议纪要且不产生误解。
   - 交付评分读 [deck-quality-scorecard](references/deck-quality-scorecard.md)，判断是否达到 `client-ready` 或 `partner-ready`。
   - 完整 review 或合伙人审稿读 [quality-dashboard-standard](references/quality-dashboard-standard.md)，输出 logic health dashboard 和 deck quality radar。
   - 大改 visual、preset 或渲染逻辑后读 [sample-regression-test](references/sample-regression-test.md)，生成样张回归测试。
   - 四套 visual profile 或 manifest 大改后读 [profile-regression-matrix](references/profile-regression-matrix.md)，并读取 `assets/regression/*.sample-manifest.json`，确保 `rsm-insurance-results`、`rsm-practice-sharing`、`rsm-global-policy`、`sunong-value-creation` 都有样张覆盖。
   - 用户要求沉淀模板时读 [scene-library-updater](references/scene-library-updater.md)。

## Failure Modes And Degradation

流程卡住时读 [failure-modes](references/failure-modes.md)（15 条完整分支，含一线修复、兜底动作和不可降底线）。**失败不许静默跳过；降级只能降执行工具，不能降判断标准**，且降级必须在交付说明中显式声明。

以下是最高频的触发信号速查（细则见该文件，不要只按本表执行）：

| 触发信号 | 立刻做什么 | 不可降的底线 |
|---|---|---|
| 用户拒绝访谈或要求跳过 | 走最小访谈，记录 `direct_build_after_minimal_interview` | 不得无交互开工 |
| 关键数字缺来源，或两处口径不可比 | 降级为「待验证事项」或从结论中删除 | 不得用二手来源顶替 |
| 引用的 reference 读不到 | 用 SKILL.md 硬约束兜底，交付说明中列出缺失项 | 判断标准不放宽 |
| 确认节点未通过但用户要求继续 | 停止并说明；只有用户显式接受风险才可推进且必须记录 | 通过条件不得下调 |
| 审校发现 `critical` 而工期不足 | 不得交付；显式降档（如 `client-ready` → `partner-ready`） | 不得带 `critical` 声称 `client-ready` |

## Anti-Patterns（高频反例速查）

以下是最高频的交付反例。**本表是速查，不是全集**——完整禁令散见 Core Workflow、Failure Modes、Non-Negotiables 和对应 reference，本表只列最容易重犯、后果最重的一批。

| # | 反例 | 正确做法 |
|---|---|---|
| A1 | 跳过访谈直接生成，包括用户写「跳过提问，直接做」 | 先走最小访谈，记录 `direct_build_after_minimal_interview` 和未确认风险 |
| A2 | 标题写成主题词：`经营情况分析`、`数据展示`、`方案说明` | 标题写成判断句，且正好是这一页要证明的那一句 |
| A3 | 一页放多个主证明对象 | 一页一个主证明对象；其余降为辅助读法 |
| A4 | 建议停在「持续优化」「加强关注」 | 给指标、阈值、责任边界或下一步验证事项；有方案时比较至少两条路径 |
| A5 | 装不下就缩小字号（正文低于 `18pt`，密集矩阵低于 `12pt`） | 删减、拆页或换版式，不缩字号 |
| A6 | 整页压成图片，或图片化对象不留源数据 | 优先原生可编辑文本/形状/表格/图表；复杂主体区图片化时保留源数据 |
| A7 | 数字、图表或判断没有来源、口径或前提 | 每条关键数字回链 `lineage_map.json` / `data_pool.json` / `chart_data/` / 原始材料 |
| A8 | 引用外部版式只写「参考某某风格」 | 提取 layout grid、字体字号、颜色、图表语法和像素级复刻风险 |
| A9 | `content_thin` 页面直接进入构建 | 先补指标 strip、洞察卡或 benchmark；或与用户确认合并/保留 |
| A10 | 页面存在可见 placeholder 仍标记为客户交付版 | 模板必须达到 `structured` 或 `filled` |
| A11 | 章节页塞正文细节 | 章节页只留章节编号、章节名称、一句话章节问题和专业图片 |
| A12 | 连续同一 page family 超过 4 页 | 每 6-8 页插入小结、桥接、含义或章节转折页 |
| A13 | 引用规则只写条号（如「Rule 2.5」），或把条号归到没有该条号的文件 | 条号是**文件局部**命名空间——必须写成「文件名 + 条号」（如 `agent-behavioral-guardrail` Rule 2.5）；文件没有编号规则时引用章节标题，不得自行编号 |

## Non-Negotiables By Tier

### Always

- 默认使用中文；英文和双语只在用户明确要求、海外/外资汇报或专业名词必须保留时启用。
- 每次任务先遵守 `agent-behavioral-guardrail.md`：**【硬停】** 要求等待确认时，当前回复必须停在确认请求，不得继续后续 stage。
- 所有 PPT 任务先执行 First Response Contract 的强制访谈；完整生成、整体优化和整体重构先问 4-8 个确认问题，等用户回答后再确认整体结构和分析框架，最后才生成逐页内容。
- 跨主题复用版式时，默认采用“通用 page family + 当前 profile design token”的模式；参考 deck 只提供结构，不提供默认颜色、语言和整套叙事。
- 每页标题必须是结论，不用“背景介绍 / 方案说明 / 数据展示”这类空标题。
- 每页只放一个主证明对象：图、表、矩阵、流程、时间轴、证据卡或对比结构。
- 所有数字、法律/财务/估值判断都要有来源、口径或前提。
- 图片必须有明确 `image_role`：cover、section_background、evidence_photo、case_context、icon 或 decorative_texture；只有 `evidence_photo` 可以作为事实证据，且必须有来源。
- 正文页普通正文不得小于 `18pt`；密集矩阵正文不得小于 `12pt`。装不下时删减、拆页或换版式，不继续缩小。仅当用户已确认高密度样稿且场景标准明确覆盖时，可按场景 token 执行；例如 `bank-real-estate-value-service` 使用核心正文 `12pt`、次级解释 `10–10.5pt`、来源 `8.5–9pt`，且不得再缩小。
- 深色只用于封面、章节转折或用户明确要求；正文页不要使用厚重深色页眉。
- 正文页必须先在 HTML 阶段完成三层结构定稿（整体页面结构／图形呈现结构／文字呈现结构）并过三层 QA，才能出样章；样章未确认不得进入 PPTX 批量构建。页面文字按 `writing-style` 咨询语域写，交付前过 `check_prose.py --register consulting`。
- 每个任务必须标记执行档位：`quick-polish` 不得声称 client-ready；`partner-ready` 不得声称 client-ready。

### Express

- 仅用于内部初稿、brainstorming、培训草稿或用户明确要求快速出片。
- 输出必须标记为 `internal-draft`，不得声称 `partner-ready` 或 `client-ready`。
- “先出一版看看”只有在用户同时说明“内部草稿/不对外/快速 brainstorm”时才可走 express；否则走 `partner-ready` 的问题 gate。
- 可跳过完整深度访谈和完整逻辑 gate，但必须保留标题为结论、基本来源边界、字号/溢出/对齐 QA。
- 如用户试图把 `express` 结果用于客户正式交付，必须升档到 `partner-ready` 或 `client-ready` 并补完整 gate。

### Quick-Polish

- 保留原材料的事实边界、来源、页码、logo、必要口径和用户要求保留的措辞。
- 只有同时满足以下三点才可使用：用户明确指定少量页面/元素；不改变故事线或章节结构；不新增分析结论、测算或建议。
- 可以不生成完整中间产物，但必须输出或说明 `polish_notes`：改了什么、哪些事实未核验、哪些页面仍有风险。
- 不新增未经用户材料支持的数字、法律/财务判断或管理建议。

### Partner-Ready

- 必须有 `framework_confirmation` 或等价确认记录，证明客户问题、总答案假设、分析框架、章节结构和页数预算已先行确认。
- 全 deck 的主标题必须能连读成完整故事线；副标题必须连接主标题、页面主体和上下页。
- 完整 deck 必须先有一个高层问题、一个总答案和若干章节答案；页面判断必须回链到章节答案。
- 核心分析页必须写清 `finding` 和 `implication`；决策页必须进一步写清 `recommended_action`。
- 建议不得停留在“关注、优化、加强”；必须给出指标、动作、阈值、责任边界或下一步验证事项。
- 核心正文页必须具备 `exhibit_structure`：scope、主证据、标注计划、辅助读法、来源边界。

### Client-Ready

- 构建前必须确认整体框架；若用户要求跳过深度确认，交付说明中必须标记 `direct_build_after_minimal_interview` 和未确认风险。
- 客户交付版必须明确 `client_question` 和 `client_answer`；执行摘要必须能直接回答客户问题。
- 只要出现建议、方案或行动计划，必须比较至少两个路径，说明推荐路径、前提、不行动后果和下一步。
- 每个核心结论必须能回链到 `conclusion_evidence_matrix`；无证据的判断必须降级为假设、待验证事项或删除。
- 所有正文关键数字必须能回链到 `lineage_map.json`、`data_pool.json`、`chart_data/Pxx.json` 或原始材料。
- 所有核心图表必须有 `chart_point_of_view`、`benchmark_type`、`focus_series`、`annotation_priority`、`chart_readout`、单位、样本、期间和来源；缺任一项不得作为客户交付核心图表。
- 连续同一 page family 不宜超过 4 页；每 6-8 页至少有一页小结、桥接、含义或章节转折页。
- 每个正式章节必须有章节页或章节锚点；章节页只保留章节编号、章节名称、必要的一句话章节问题/章节答案和专业图片，不塞正文细节。
- 使用章节图片时必须记录 `image_prompt`、`image_role`、`style_profile` 和版权/生成说明；图片不得替代正文页证据。
- 正文页有效内容占用面积目标为 70%-82%；如果页面显得空，优先放大主证据对象、增加洞察卡或指标 strip，而不是缩小字号或增加装饰。
- 正文页进入版式分配前必须有内容密度状态；`content_thin` 不得直接进入构建，除非已补指标 strip、洞察卡、benchmark 或用户确认合并/保留。
- 正文页进入 HTML 预览前必须有 `title_fit`；主标题超过 30 个中文字符且未改写的页面不得进入批量构建。
- 客户交付版进入批量构建前必须完成关键页 HTML 预览或明确标记 `preview_unavailable` 并取得用户确认。
- 客户交付版必须有 `confirmation_log.json`，且 `CN1_framework`、`CN2_layout`、`CN3_html_preview` 不得为 `pending` 或 `blocked`。
- 高频正文页模板必须达到 `structured` 或 `filled`；出现可见 placeholder 的页面不得标记为客户交付版。
- 使用 `assets/reference-layouts/` 备选版式时，不得只写“参考某某风格”；必须提取 layout grid、字体/字号、颜色、图表/表格语法、图片处理和像素级复刻风险。
- 使用 `assets/reference-layouts/` 备选版式时，必须写明 `canonical_family`、`source_reference_profile`、`source_preview`、`token_set` 和 `adaptation_notes`，证明该页是在复用版式结构而不是混入另一套颜色/语言体系。
- 客户交付版必须生成或检查 contact sheet，确认整份 deck 的视觉节奏和模板一致性。
- 客户交付版必须通过 thumbnail test、print test 和 partner flip test。
- 每次草稿完成后必须做 final review；合伙人视角或客户视角出现 `critical` 不得交付，出现 `major` 必须修复或说明残余风险。
- 客户交付版构建前必须通过 artifact validation；存在 `critical` 不得进入正式构建。
- `client-ready` 必须通过逻辑 gate、语言 gate、可编辑 gate 和 contact sheet/profile 回归检查。
- 外部数据、政策、市场信息或公开披露作为核心证据时必须通过 freshness 和 evidence credibility 检查。
- 上市公司、金融机构或监管敏感客户的核心结论必须通过公开引用风险检查。

### Pipeline

- 复杂项目必须先形成 Core Workflow 第 1-7 步各自声明的「产出」，不得跳步。任一步缺少产出不得进入下一步；用「等价记录」替代时必须写明替代范围和缺口。
- 完整项目必须用 preset/page family 约束构建：先 `storyline_map.json`，再 `visual_intent/` 和 `preset_map.json`，再 PPTX。
- template manifest、visual profile、HTML layout 或渲染策略大改后，必须生成样张回归并记录缺口。
- pipeline 应设计可选交付通道：`pptx` 为主，`pdf-print`、`html-preview`、`video-narration` 仅在用户要求或项目需要时启用。

## Invocation Examples

### Example A: Quick Polish Existing PPT

User: `帮我把这几页 PPT 标题和版式优化一下，不用重新做分析。`

Do:
- 标记 tier 为 `quick-polish`。
- 先执行 `I0-forced-interview`，确认页码/元素范围、修改目标、不可改边界和风险接受；未回答前不得开始改标题或版式。
- 读取 `task-tier-protocol.md`、`language-discipline.md`、`visual-qa-protocol.md`。
- 保留原事实和来源；只改标题判断句、段落结构、对齐、字号、溢出和视觉层级。
- 交付时说明 `polish_notes` 和未核验事实。

### Example B: Client-Ready From Source Files

User: `基于这些 PDF/Excel，做一份给管理层的正式汇报。`

Do:
- 标记 tier 为 `client-ready`，先问或确认 `client_question`、受众、对象、数据来源、页数和模板约束。
- 第一回复停在 `I0-forced-interview`；收到回答后再进入 `CN1_framework`。
- 读取 source digest、data lineage、storyline、logic gate、chart rulebook、visual profile、artifact schema 和 QA references。
- 先生成 brief、事实池、证据矩阵、标题链、preset map 和 chart data，再构建 PPTX。
- 导出后做 contact sheet、final review、scorecard；不能通过时返修或说明残余风险。

### Example C: Build Reusable PPT Pipeline

User: `帮我搭建一套 RSM 金融咨询 PPT 自动化生产管线。`

Do:
- 标记 tier 为 `pipeline`。
- 先执行 `I0-forced-interview`，确认这套管线的使用场景、默认视觉、交互深度、样章节奏和回归标准。
- 读取 `workflow-san-pipeline.md`、`template-manifest.md`、`visual-profile-registry.md`、`artifact-schema-library.md`、`sample-regression-test.md`。
- 明确输入 artifact、page family、template manifest、渲染轨道、可编辑层和回归样张。
- 大改后运行 manifest 校验和 profile regression，输出缺模板、缺样张和风格漂移清单。

## Key References

全部 96 个 reference 的加载路由见 [references/INDEX.md](references/INDEX.md)：按任务阶段分 9 组，每组含「职责」和「何时读」，另附 `assets/` 与 `scripts/` 资源清单。**本段只列跨阶段必读和高频入口，完整清单以 INDEX 为准。**

任务开始时至少读这三个跨阶段文件（**每任务必读集的唯一权威清单是 progressive-loading-protocol 的 Layer 0，当前共 9 个文件 = 本组三件套 + Core Workflow 第一步三件 + 原 Layer 0 三件；本段是入口指针，不是必读集合的裁决处**）：

- [agent-behavioral-guardrail](references/agent-behavioral-guardrail.md)：每次任务的第一个动作，读完前不读其他 reference、不生成内容。
- [progressive-loading-protocol](references/progressive-loading-protocol.md)：决定本轮加载哪些 reference，避免小任务被完整 pipeline 拖慢。
- [failure-modes](references/failure-modes.md)：流程卡住、缺失、冲突或资源不可用时的操作细则与不可降底线。

高频入口（细则见 INDEX 对应分组）：

| 阶段 | 入口 reference |
|---|---|
| 定档位与路线 | [task-tier-protocol](references/task-tier-protocol.md)、[tier-stage-matrix](references/tier-stage-matrix.md)、[scene-router](references/scene-router.md) |
| 访谈与确认 | [strategy-brief](references/strategy-brief.md)、[guided-interaction-pattern](references/guided-interaction-pattern.md)、[confirmation-state-machine](references/confirmation-state-machine.md) |
| 事实与证据 | [source-digest-standard](references/source-digest-standard.md)、[data-lineage-protocol](references/data-lineage-protocol.md) |
| 叙事与论证 | [consulting-storyline-standard](references/consulting-storyline-standard.md)、[storyline-page-planning](references/storyline-page-planning.md)、[logic-gate-checklist](references/logic-gate-checklist.md) |
| 版式与视觉 | [universal-page-family-registry](references/universal-page-family-registry.md)、[html-page-design-standard](references/html-page-design-standard.md)、[visual-profile-registry](references/visual-profile-registry.md)、[professional-chart-rulebook](references/professional-chart-rulebook.md) |
| 语言与语域 | [language-discipline](references/language-discipline.md)、[consulting-language-playbook](references/consulting-language-playbook.md)、[number-expression-standard](references/number-expression-standard.md) |
| 构建与交付 | [build-runner-protocol](references/build-runner-protocol.md)、[artifact-schema-library](references/artifact-schema-library.md)、[html-preview-protocol](references/html-preview-protocol.md)、[editability-check](references/editability-check.md) |
| 审校与评分 | [visual-qa-protocol](references/visual-qa-protocol.md)、[review-loop](references/review-loop.md)、[final-review-checklist](references/final-review-checklist.md)、[client-delivery-standard](references/client-delivery-standard.md)、[deck-quality-scorecard](references/deck-quality-scorecard.md) |

外部语域：`writing-style` skill 的 `DISTILLATION/麦肯锡咨询文风.md`（咨询语域规则正文与 10 条验收判据）+ `scripts/check_prose.py --register consulting`（程序化检查）。
