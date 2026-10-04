# Reference Index

本 skill 的 **reference 加载路由表**。96 个 reference 按任务阶段分 9 组，每组列「职责」和「何时读」。先按当前任务所处阶段定位分组，再用「何时读」列确认触发条件。

**加载纪律**：不要通读。先读 `progressive-loading-protocol`（见第 0 节），只加载当前 tier 与 stage 必需的文件。本表用于**定位**，不构成必读清单；**必读性的唯一权威是 `progressive-loading-protocol` Layer 0 的每任务必读清单（9 个文件），本表「何时读」列是逐文件触发说明，不得据本表把该清单中的任何文件排除出加载集。**

**维护规则**：新增、删除或重命名 reference 必须同步本表。改完后跑链接校验（见文末「校验」），确认本表与 SKILL.md 无死链。

---

## 0. 跨阶段必读（不属任何单一阶段）

本组是**跨阶段必读**三件套。**每任务必读集的唯一权威清单**是 `progressive-loading-protocol` **Layer 0（Always Loaded，当前 9 个文件）**= 本组三件套 + Core Workflow「第一步必须读」三件（`strategy-brief`、`guided-interaction-pattern`、`decision-to-deck-attribute-map`）+ 原 Layer 0 三件（`task-tier-protocol`、`v2-capability-router`、`confirmation-state-machine`）；不一致时以该清单为准。

| 文件 | 职责 | 何时读 |
|---|---|---|
| [agent-behavioral-guardrail](agent-behavioral-guardrail.md) | 约束 Agent 不因「材料看起来完整」或「用户语气像同意」而跳过访谈和确认 | **每次任务的第一个动作**，读完之前不读其他 reference、不生成内容 |
| [progressive-loading-protocol](progressive-loading-protocol.md) | 控制 reference 加载量，避免小任务被完整 pipeline 拖慢、避免 context 过载漏掉 gate | **任务开始时**（跨阶段必读三件套之一）；多阶段执行、决定本轮读哪些文件前 |
| [failure-modes](failure-modes.md) | 流程卡住时的操作细则：15 条失败分支 + 一线修复 + 兜底动作 + 不可降底线 | **任务开始时**（跨阶段必读三件套之一）；以及任何 tier、任何 stage 出现卡住、缺失、冲突或不可用时 |

---

## 1. 路由 · 档位 · 场景

定任务走哪条路线、什么档位、加载哪些 reference、用哪套场景配置。

| 文件 | 职责 | 何时读 |
|---|---|---|
| [agent-runtime](agent-runtime.md) | 运行总纲：每页可独立阅读原则 + 本 skill 作为前置治理层的定位 | 任务开始时建立整体执行心态 |
| [task-tier-protocol](task-tier-protocol.md) | 把任务按复杂度分为五档，决定必需 gate 与可声称的交付级别 | `I0-forced-interview` 之后、进入事实池或故事线之前 |
| [tier-stage-matrix](tier-stage-matrix.md) | 把档位转成明确的 build runner stage 列表 | 选定 tier 后，确定推进顺序时 |
| [v2-capability-router](v2-capability-router.md) | 按任务风险加载 PRD V2.0 增量能力，避免小任务默认全载 | **各档位都读**（Layer 0；读路由表 ≠ 激活能力）：读完 task-tier-protocol 后，按 Tier Defaults 定本档位激活集 |
| [scene-router](scene-router.md) | 把项目路由到正确的场景配置（只做分类和配置，不写正文） | 金融复杂项目开始规划时 |
| [bank-real-estate-value-service-standard](bank-real-estate-value-service-standard.md) | 商业银行不动产价值管理、押品重估、按揭全生命周期与外部专业服务方案标准 | 押品、不动产价值管理、按揭年度重估类材料 |
| [workflow-san-pipeline](workflow-san-pipeline.md) | 把 PPT 生产拆成「先策略研究」与「再按家族生成 PPTX」两个可审阅阶段 | 完整生产管线或复刻 `ppt-agent-workflow-san` 时 |
| [genspark-style-pipeline](genspark-style-pipeline.md) | 多角色分阶段工程管线的可执行拆解（七个模块） | 需要对比 Guide Mode 多阶段管线时 |
| [scene-library-updater](scene-library-updater.md) | 从完成项目中提取可复用模式并沉淀进场景库 | 用户明确要求「保存为模板」「以后复用」「沉淀经验」时 |

---

## 2. 访谈 · 确认 · 属性锁定

把用户回答转成可执行的 deck 属性，并在每个 gate 停在确认。

| 文件 | 职责 | 何时读 |
|---|---|---|
| [strategy-brief](strategy-brief.md) | 任何 PPT 任务开始前问清目标、内容与版式约束，形成 brief 或最小访谈记录 | 第一条回复之前 |
| [guided-interaction-pattern](guided-interaction-pattern.md) | 把一次性猜测升级为阶段式确认：每轮 1-4 题、带推荐选项 | **任务开始时**（与 strategy-brief 同批，「第一步必须读」）；设计访谈问题时 |
| [decision-to-deck-attribute-map](decision-to-deck-attribute-map.md) | 把用户回答映射为 `interaction_locks` 等 deck 属性锁定项 | **任务开始时**（与 strategy-brief 同批，「第一步必须读」）；用户回答之后立即使用 |
| [structure-first-confirmation-protocol](structure-first-confirmation-protocol.md) | 先框架后细节：确认核心问题、总答案假设、分析框架、章节结构、页数预算、视觉风格 | 用户回答后、展开逐页正文前 |
| [confirmation-state-machine](confirmation-state-machine.md) | 把「先访谈、再确认、再生成」写成可执行状态机（CN0→CN1→CN2→CN3） | 每个确认节点；判断能否进入下一阶段时 |
| [confirmation-log-standard](confirmation-log-standard.md) | 记录用户在关键 gate 的访谈、确认、修改和未确认风险 | 所有任务记录 `CN0_interview`；`partner-ready` 以上维护 `confirmation_log.json` |

---

## 3. 事实 · 数据 · 证据

把材料拆成可引用事实，并为关键数字建立来源血缘与时效控制。

| 文件 | 职责 | 何时读 |
|---|---|---|
| [source-digest-standard](source-digest-standard.md) | 把 PDF/PPT/Word/Excel/网页/访谈纪要整理成可审计事实底稿 | 处理用户原始材料时；故事线设计之前 |
| [data-pipeline](data-pipeline.md) | 建立事实池、指标池和上下文来源（支持用户文件、手工数据、公开资料、可用 MCP） | 处理数据、公开资料或用户文件时 |
| [data-lineage-protocol](data-lineage-protocol.md) | 保证每个数字、图表、排名、估算和判断可追溯 | 金融项目必读；关键数据进入核心结论时 |
| [content-freshness-and-evidence](content-freshness-and-evidence.md) | 给外部数据、政策、市场信息增加时效性与可信度控制 | 关键数据/政策进入核心结论时 |
| [context-enrichment](context-enrichment.md) | 补充宏观背景、近期事件、政策变化，并在审校阶段验证事实 | 用户允许联网或提供明确外部来源时 |
| [insight-discovery](insight-discovery.md) | 扫描 `data_pool.json`，先找排名跳变、趋势背离、极值、聚类和回归信号 | 已有 `data_pool.json`、进入页面规划前 |

---

## 4. 叙事 · 论证 · 行动

把材料组织成咨询式论证链：问题 → 总答案 → 章节答案 → 页面判断 → 行动。

| 文件 | 职责 | 何时读 |
|---|---|---|
| [consulting-storyline-standard](consulting-storyline-standard.md) | 先定义 `executive_question`、`deck_answer`、`chapter_answer`，再拆页面判断 | 进入 `outline.json` / `title_spine.md` / `storyline_map.json` 前 |
| [storyline-page-planning](storyline-page-planning.md) | 把内容拆成逐页故事线：主标题自成故事线、副标题承上启下 | 进入逐页设计前 |
| [argument-map-standard](argument-map-standard.md) | 把逻辑从「页面顺序」提升为「可审查论证链」 | 进入 `outline.json` 和 `preset_map.json` 前 |
| [conclusion-evidence-matrix](conclusion-evidence-matrix.md) | 把每条结论绑定证据、证据强度、限制和对应页面 | 核心结论进入页面前；客户交付版进入 `outline.json` 前 |
| [logic-gate-checklist](logic-gate-checklist.md) | 7 个逻辑 gate：客户问题、总答案、章节答案、页面判断、证据匹配、管理含义、决策路径 | 正式构建前、生成 review report 时、客户交付前 |
| [decision-path-standard](decision-path-standard.md) | 比较可选路径、推荐路径和不行动后果，说明「为什么选这条路径」 | 材料包含建议、方案、路径或行动计划时 |
| [action-derivation-chain](action-derivation-chain.md) | 确保行动项回链矛盾、根因、改善路径、责任和指标，不是「建议清单」 | 行动地图、12 个月路径、整改建议或授权事项 |
| [contradiction-synthesis-protocol](contradiction-synthesis-protocol.md) | 从正负信号共存中提炼 top 3 结构性矛盾 | 专题模块完成后需要提炼结构性矛盾时 |
| [stress-scenario-content-standard](stress-scenario-content-standard.md) | 压力情景、敏感性矩阵、财务推演和「两种图景」页面的内容标准 | 需要情景推演或双图景页面时 |
| [narrative-architect](narrative-architect.md) | 数据/事实池之后和用户一起确认「怎么讲」，用确认点推进 | 复杂项目；不要一次性生成完整大纲 |
| [narrative-skeleton](narrative-skeleton.md) | SCQA + 金字塔混合叙事框架：SCQA 建张力（前 1/3）+ 金字塔展答案（后 2/3） | 董事会深度分析、经营诊断或需要 SCQA 张力时 |
| [methodology-packs](methodology-packs.md) | 按场景加载专业金融咨询方法论（样本、指标、口径、限制） | 生成 `brief.json` 和 `outline.json` 后，按 `scene_id` 选择 |
| [global-policy-comparison-template](global-policy-comparison-template.md) | 跨国家、跨司法辖区、跨监管制度的比较研究型页面模板 | 监管政策或制度比较项目 |

---

## 5. 版式 · 页面家族 · 模板

把内容逻辑映射到稳定的页面家族与模板，并控制标题适配与内容密度。

| 文件 | 职责 | 何时读 |
|---|---|---|
| [universal-page-family-registry](universal-page-family-registry.md) | 把参考版式的版面结构抽离为主题无关的通用 page family | 生成 `preset_map.json` 前；采用外部参考版式时 |
| [layout-lock-protocol](layout-lock-protocol.md) | 把视觉规则从「建议」升级为「生成期硬约束」 | 生成 `preset_map.json`、HTML 预览或 PPTX 前 |
| [page-family-contracts](page-family-contracts.md) | 把页面类型变成可执行契约：必填字段、文字量、主视觉对象、禁用项 | 进入 `preset_map.json` 前 |
| [template-catalog](template-catalog.md) | 帮助判断「这一页该用什么版式」，先判断页面意图再选证明对象 | 页面版式选择时 |
| [template-manifest](template-manifest.md) | 把 `preset_family` 稳定映射到 HTML 模板、必填字段、渲染轨道和 QA 重点 | 生成 `preset_map.json` 后；新增或修改 `visual_profile` 前 |
| [consulting-page-archetypes](consulting-page-archetypes.md) | 补齐议题树、方案比较、推荐路径、风险缓释、行动计划、方法限制等高频页型 | 选择 `page_family`、生成 `preset_map.json` 或优化版式时 |
| [exhibit-composition-standard](exhibit-composition-standard.md) | 把每页从「页面」提升为可独立阅读、可截图进正文的咨询 exhibit | 核心正文页；选择页面结构、图表、注释和辅助证据时 |
| [content-density-precheck](content-density-precheck.md) | 判断每页证据量是 `content_thin` / `balanced` / `content_heavy` / `overloaded` | 选版式和构建页面前 |
| [title-fit-standard](title-fit-standard.md) | 中文标题的长度、行数、字号和改写检查（标题过长先改写，不先缩小字号） | 主标题和副标题进入版式前 |
| [insight-to-layout-mapper](insight-to-layout-mapper.md) | 把 `insights.json` 转成页面角色、逻辑关系和稳定 page family | 进入 `preset_map.json` 前 |
| [layout-analysis-report](layout-analysis-report.md) | 向用户展示整份 deck 的版式分配、密度风险和页面证明对象 | 完整项目构建前；这是交互反馈节点，不是事后 QA |
| [scenario-layout-selector](scenario-layout-selector.md) | 按项目场景选择默认 RSM visual profile 或备选版式 | 进入 `layout_analysis_report.json` 前 |
| [reference-layout-library](reference-layout-library.md) | 登记 `assets/reference-layouts/` 中的备选 PPT 版式 | 选择视觉风格、页面家族、HTML 预览或像素级复刻时 |
| [reference-layout-analysis-framework](reference-layout-analysis-framework.md) | 把外部版式样本拆解为可复用页面家族、视觉 token 和像素级复刻约束 | 用户提供 `ppt版式/`、参考 deck、截图、PDF 或 PPTX 时 |

---

## 6. 视觉 · 图表 · 图片 · 三层结构

定视觉系统、图表语法、图片规则，以及正文页 HTML 阶段的三层结构。

| 文件 | 职责 | 何时读 |
|---|---|---|
| [visual-profile-registry](visual-profile-registry.md) | 统一四套视觉模式（`rsm-insurance-results` / `rsm-practice-sharing` / `rsm-global-policy` / `sunong-value-creation`）的命名、别名与回归覆盖 | 选择 `visual_profile`、更新 manifest、新增 HTML layout 前 |
| [visual-system](visual-system.md) | 视觉系统、字号、色板、渲染分层和反模式检查 | 读取 `outline.json` 后 |
| [rsm-reference-visual-dna](rsm-reference-visual-dna.md) | 对齐两份参考 PDF 的视觉复刻标准（Mode A 保险结果 / Mode B 不良处置分享） | 用户要求「按参考 PDF 风格」时 |
| [html-page-design-standard](html-page-design-standard.md) | 正文页 HTML 阶段的三层结构（整体页面结构 → 图形呈现结构 → 文字呈现结构）与 frontend design 吸收契约 | 正文页进入 HTML 设计阶段前 |
| [visual-presentation-upgrade](visual-presentation-upgrade.md) | 检查阅读路径、密度层级、主证据突出度、辅助读法和视觉重量 | 需要提升专业咨询机构成稿观感时 |
| [visual-fullness-standard](visual-fullness-standard.md) | 用主证据层和辅助证据层填充主体区域，解决页面偏空 | 页面显得空、内容不够充实或客户交付版需更饱满时 |
| [visual-executive-rhythm](visual-executive-rhythm.md) | 控制整份 deck 的页面节奏、密度层级、图表证明规则和视觉层级 | 重要客户材料和完整 deck |
| [visual-rhythm-orchestrator](visual-rhythm-orchestrator.md) | 把页面家族、认知负荷、章节节奏和色温连成可执行的视觉编排 | `partner-ready` 以上生成 `preset_map.json` 后 |
| [chart-decision-tree](chart-decision-tree.md) | 根据数据形状自动选择图表（先判断要证明什么，再选图表） | 图表选择时 |
| [chart-data-adapter](chart-data-adapter.md) | 把 `data_pool.json` 标准化为每种图表可直接渲染的输入 | 渲染前（不要在图表代码里临时拼字段） |
| [financial-chart-grammar](financial-chart-grammar.md) | 专业金融咨询图表的画法规范 | 选定图表后用本文件检查画法 |
| [professional-chart-rulebook](professional-chart-rulebook.md) | 图表观点、基准、标注、口径、色彩和禁用场景的专业标准 | 重要图表、客户交付图表和复杂金融图表 |
| [professional-image-rulebook](professional-image-rulebook.md) | 图片用途、风格、版权、生成 prompt、可替代性和禁用项 | 封面图、章节图、正文侧图、案例图、图标和 AI 生成图片 |
| [section-divider-image-protocol](section-divider-image-protocol.md) | 章节页、目录页和章节转折视觉的生成规范 | 章节页、目录页和章节转折图片生成时 |
| [section-image-prompt-library](section-image-prompt-library.md) | 不同金融咨询场景下的章节页背景图 prompt 库 | 生成章节页背景图时，与 `section-divider-image-protocol` 配合使用 |

---

## 7. 语言 · 数字 · 语域

中文表达纪律、数字口径、受众校准与外部语域绑定。

| 文件 | 职责 | 何时读 |
|---|---|---|
| [language-discipline](language-discipline.md) | 4 条编辑规则：客观中立陈述、禁用比喻与文学化表达 | 全部董事会汇报材料 |
| [consulting-language-playbook](consulting-language-playbook.md) | 把表达压缩为专业咨询口径：标题、副标题、结论条、建议、风险提示 | 写标题、副标题、结论条和建议时 |
| [language-style-library](language-style-library.md) | 不同汇报场景下的中文咨询表达、标题链和负面判断替代表达 | 写标题、摘要、建议、风险和会议纪要口径时 |
| [number-expression-standard](number-expression-standard.md) | 中文金融数字、金额、百分比、同比/环比、基点、估值倍数的统一表达 | 写标题、副标题、图表标签、结论条、注释和来源时 |
| [language-calibration-standard](language-calibration-standard.md) | 统一受众专业程度、证据强度、判断力度和整份 deck 的语气弧线 | `partner-ready` 以上或受众专业程度不一时 |
| [language-rewrite-pass](language-rewrite-pass.md) | 草稿生成后的语言改写：提升判断强度、边界清晰度和客户可读性（不改事实） | 客户交付版语言润色时 |
| [bilingual-output-standard](bilingual-output-standard.md) | 中英双语平行创作（非直译） | 用户要求双语、外资/合资/海外总部汇报时 |

**外部语域绑定**：页面文字的语域判定与验收绑定 `writing-style` skill 的咨询语域——读其 `DISTILLATION/麦肯锡咨询文风.md`（放宽边界、不放宽项、10 条验收判据），交付前跑 `python3 <writing-style>/scripts/check_prose.py --register consulting <稿件>`。**咨询语域是叠加层，不替代本 skill 的 client-ready 硬要求**。

---

## 8. 构建 · 产物 · 交付 · 可编辑性

把规则转成执行流程，管理中间产物、预览节奏、渲染路线和可编辑性。

| 文件 | 职责 | 何时读 |
|---|---|---|
| [build-runner-protocol](build-runner-protocol.md) | 按 validate → build → render → review → fix → delivery 组织执行闭环 | 完整项目、样张回归或客户交付前 |
| [artifact-schema-library](artifact-schema-library.md) | 统一中间产物字段名，不临时发明 JSON 结构 | 生成 `brief.json`、`data_pool.json`、`preset_map.json`、`chart_data/` 等前 |
| [artifact-validation-standard](artifact-validation-standard.md) | 检查中间产物是否完整、互相一致、可进入下一阶段 | 完整项目、客户交付项目和样张回归 |
| [visual-rendering-engine](visual-rendering-engine.md) | 在可编辑性和像素级视觉质量之间做明确取舍，选择构建技术路线 | 构建策略决策时 |
| [template-fill-level-standard](template-fill-level-standard.md) | 把 HTML 模板从 `skeleton` 升级为 `structured` 或 `filled`，禁止留 placeholder | 生成或修改 HTML 模板、preview 或 PPTX 主体区时 |
| [html-preview-protocol](html-preview-protocol.md) | 正式 PPTX 构建前先用关键页 HTML 样张确认方向 | `partner-ready` 以上项目正式构建前 |
| [milestone-preview-protocol](milestone-preview-protocol.md) | 长 deck 设置 MP1/MP2/MP3 阶段预览，避免大规模返工 | 25 页以上、董事会/合伙人/客户正式交付材料 |
| [incremental-edit-protocol](incremental-edit-protocol.md) | 处理既有 PPT 的局部反馈，不触发全 deck 重生成 | 用户针对某几页或指定元素反馈时 |
| [editability-check](editability-check.md) | 确保关键文字、数字、表格、来源和结论可编辑，图片化对象保留源数据 | 完整项目和客户可交付 PPTX |
| [editable-component-standard](editable-component-standard.md) | 区分原生可编辑层、渲染证据层和来源元数据层 | 构建 PPTX、HTML 渲染主体区或做可编辑性检查时 |
| [delivery-format-extension](delivery-format-extension.md) | PPTX 之外的可选交付形态（`pdf-print` / `html-preview` / `video-narration`） | 用户要求或项目需要非 PPTX 交付时 |

---

## 9. 审校 · 评分 · 回归 · 返修

导出后的质量检查、交付门槛、评分和问题返修。

| 文件 | 职责 | 何时读 |
|---|---|---|
| [visual-qa-protocol](visual-qa-protocol.md) | 截图级视觉检查：溢出、重叠、字号、来源和页码 | 导出后（不允许第一次导出直接交付） |
| [review-loop](review-loop.md) | 六维审校：故事线、数据血缘、专业判断、视觉质量、事实校验、可编辑性 | 完整审校时 |
| [final-review-checklist](final-review-checklist.md) | 分别站在合伙人和客户视角形成修正清单 | 每次完成草稿后 |
| [presentation-polish-checklist](presentation-polish-checklist.md) | 对齐、视觉重量、标签图例、缩略图、打印和快速翻阅检查 | 导出预览图、contact sheet 或准备交付前 |
| [professional-consulting-standard](professional-consulting-standard.md) | 用合伙人审稿标准检查每页是否有决策含义 | 生成、优化、审校复杂金融 deck 时 |
| [client-delivery-standard](client-delivery-standard.md) | 从内容、视觉、语言三道门检查是否达到客户可用标准 | 客户正式交付、董事会/投委会/管理层材料 |
| [client-meeting-minutes-test](client-meeting-minutes-test.md) | 检查标题、结论和建议能否直接进入会议纪要且不产生误解 | 客户会议或董事会材料 |
| [deck-quality-scorecard](deck-quality-scorecard.md) | 给 deck 做交付质量评分，判断是否达到 `client-ready` 或 `partner-ready` | 交付评分时 |
| [quality-dashboard-standard](quality-dashboard-standard.md) | 把逻辑、内容、呈现和语言审校结果转成合伙人可快速读取的仪表盘 | 完整 review、合伙人审稿、客户交付前 |
| [auto-fix-playbook](auto-fix-playbook.md) | 把审校问题转成返修动作，按事实/逻辑/决策/呈现/语言/polish 排序 | `review_report.json` 或 `final_review_report.json` 出现 issue 后 |
| [sample-regression-test](sample-regression-test.md) | 生成样张回归测试，确保 skill 更新后仍能稳定产出 | 大改视觉系统、preset、字号、渲染引擎、故事线规则或交付门槛后 |
| [profile-regression-matrix](profile-regression-matrix.md) | 补足四套 visual profile 的样张回归覆盖 | 大改视觉、模板、manifest 或构建逻辑后 |

---

## 与 GLOSSARY 六类术语的对应

本表按**工作流阶段**分组（面向「何时读」），[docs/GLOSSARY.md](../docs/GLOSSARY.md) 按**术语类别**分组（面向「怎么用词」）。两者互补，不是同一套分类：

| 本表分组 | 对应 GLOSSARY 节 |
|---|---|
| 1 路由 · 档位 · 场景 | §1 流程与档位 |
| 2 访谈 · 确认 · 属性锁定 | §1 流程与档位 |
| 3 事实 · 数据 · 证据 | §4 数据与证据 |
| 4 叙事 · 论证 · 行动 | §5 叙事与内容 |
| 5 版式 · 页面家族 · 模板 | §2 页面与版式 |
| 6 视觉 · 图表 · 图片 · 三层结构 | §3 视觉与设计 + §6 语言与三层结构（三层结构部分） |
| 7 语言 · 数字 · 语域 | §6 语言与三层结构 |
| 8 构建 · 产物 · 交付 · 可编辑性 | §1 流程与档位（无独立术语节） |
| 9 审校 · 评分 · 回归 · 返修 | §1 流程与档位（无独立术语节） |

GLOSSARY 六类覆盖术语，不覆盖构建与审校两个阶段；把 96 个文件硬塞进六类会让「流程与档位」一组超过 30 个文件，失去分层意义，因此本表另按阶段分组。

---

## 非 references 资源

| 路径 | 用途 | 何时读 |
|---|---|---|
| [assets/design-tokens.json](../assets/design-tokens.json) | 各 `visual_profile` 的 design token（颜色、字体、字号、尺寸） | 生成 `preset_map.json` 前 |
| [assets/layouts/](../assets/layouts/) | HTML/CSS 参考版式 | 需要稳定调度 HTML 模板时 |
| [assets/layouts/template-manifest.json](../assets/layouts/template-manifest.json) | 模板 manifest 实体 | 与 template-manifest.md 配合使用 |
| [assets/previews/](../assets/previews/) | 预览样例 | 需要参考既有预览效果时 |
| [assets/reference-layouts/](../assets/reference-layouts/) | 备选英文参考版式 | 采用外部参考版式时（须先读 reference-layout-library.md） |
| [assets/regression/](../assets/regression/) | 四套 profile 的样张回归样本 manifest | 与 profile-regression-matrix.md 配合使用 |
| [scripts/validate-rsm-deck.mjs](../scripts/validate-rsm-deck.mjs) | deck 结构校验 | 需要脚本化检查时 |
| [scripts/validate-layout-manifest.mjs](../scripts/validate-layout-manifest.mjs) | layout manifest 校验 | 修改 manifest 后 |
| [scripts/validate-confirmation-state.mjs](../scripts/validate-confirmation-state.mjs) | 确认状态校验 | stage 切换前 |

---

## 校验

改完 reference 集合或本表后，确认以下三项：

1. **链接可达**：本表与 SKILL.md 中每个 `xxx.md` 链接都指向 `references/` 下的真实文件。
2. **孤儿清零**：`references/*.md` 中不存在未被 SKILL.md 或本表引用的文件。
3. **真实请求验证**：用一条真实 PPT 请求走一遍，确认能按本表定位到正确分组并加载到必需 reference。
