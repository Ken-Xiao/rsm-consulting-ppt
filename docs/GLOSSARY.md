# GLOSSARY

本 skill 的术语权威定义。**96 个 reference 之间存在同义异名和同名异义，本文件是裁决依据。**

用途：① 阅读/编写 reference 时对齐用词；② 新增 reference 时先查本表，避免造重复术语；③ 与 `references/INDEX.md` 配合——本表按**术语类别**组织（面向"怎么用词"），INDEX 按**工作流阶段**组织（面向"何时读"）。

维护规则：新增术语必须写明**出处文件**；同一概念只保留一个正名，其他写法列入「不推荐写法」。

---

## 1. 流程与档位

| 术语 | 定义 | 出处 |
|---|---|---|
| `tier` | 任务执行档位，决定必需 gate 与可声称的交付级别。五档：`express` / `quick-polish` / `partner-ready` / `client-ready` / `pipeline` | task-tier-protocol.md |
| `route` | 任务路线，决定加载哪些 reference 与 stage 序列。五种：`express` / `targeted-edit` / `create` / `structural-optimize` / `pipeline` | SKILL.md Decision Router |
| `stage` | 构建阶段。`S0` `S1` `S1.5` `S1.6` `S2` `S2.5` `S2.6` `S3` `S4` `S5` `S6` `regression` | tier-stage-matrix.md |
| `I0-forced-interview` | 强制访谈入口节点。任何 PPT 任务的第一个动作 | SKILL.md First Response Contract |
| `CN` 节点 | 确认节点：`CN0_interview`（访谈）→ `CN1_framework`（框架）→ `CN2_layout`（版式）→ `CN3_html_preview`（预览） | confirmation-state-machine.md |
| `MP` 节点 | 里程碑预览：`MP1` `MP2` `MP3`，用于 25 页以上或客户正式交付材料 | milestone-preview-protocol.md |
| `direct_build_after_minimal_interview` | 用户在最小访谈后接受「未做完整框架访谈」风险的记录标记 | SKILL.md Non-Negotiables |

**易混淆**：`tier`（交付级别）≠ `route`（任务路线）。同一 route 可对应不同 tier（如 `create` 可为 `partner-ready` 或 `client-ready`）。

## 2. 页面与版式

| 术语 | 定义 | 出处 |
|---|---|---|
| `canonical_family` | 跨主题通用的页面家族，只描述内容逻辑，不含颜色和语言 | universal-page-family-registry.md |
| `preset_family` | `canonical_family` 注入当前 `visual_profile` 的 design token 后的产物 | layout-lock-protocol.md |
| `preset_map.json` | 页面家族到具体模板的映射产物，构建 PPTX 前必须生成 | artifact-schema-library.md |
| `exhibit` | 可独立阅读、可截图进入报告正文的证据展品（标题+口径+主证据+标注+读法+来源） | exhibit-composition-standard.md |
| `page archetype` | 高频咨询页型：议题树、方案比较、推荐路径、风险缓释、行动计划、方法限制等 | consulting-page-archetypes.md |
| template fill level | 模板填充度：`skeleton`（只有 placeholder）/ `structured` / `filled` | template-fill-level-standard.md |

**不推荐写法**：用「页面类型」「版式名」泛指上述任一概念——请明确是 `canonical_family` 还是 `preset_family`。

## 3. 视觉与设计

| 术语 | 定义 | 出处 |
|---|---|---|
| `visual_profile` | 视觉模式，四选一：`rsm-insurance-results`（默认）/ `rsm-practice-sharing` / `rsm-global-policy` / `sunong-value-creation` | visual-profile-registry.md |
| `design_token` | profile 级的设计变量（颜色、字体、字号、尺寸），存 `assets/design-tokens.json` | assets/design-tokens.json |
| `visual_lock` | **用户确认**的视觉约束，六字段：`property` / `value` / `source` / `scope` / `status` / `qa_check` | SKILL.md §5 |
| `rhythm_score` | 页面节奏评分，用于检查密度层级与缓冲页需求 | visual-rhythm-orchestrator.md |
| `severity encoding` | 严重度的视觉编码方式。本项目用 RSM 蓝同色系明度，越深越差 | visual-system.md |

**关键区分**：`design_token` 是 profile 默认值；`visual_lock` 是**用户明确确认**的约束，优先级高于 token。助手建议不得升级成锁。

## 4. 数据与证据

| 术语 | 定义 | 出处 |
|---|---|---|
| `data_pool.json` | 从材料中抽出的事实池 | data-pipeline.md |
| `lineage_map.json` | 关键数字/图表/测算的来源血缘 | data-lineage-protocol.md |
| `chart_data/Pxx.json` | 每页图表的源数据，按页号存放 | artifact-schema-library.md |
| `insight` / `insight_layout_map` | 从数据池发现的洞察，及其到页面角色与 page family 的映射 | insight-discovery.md / insight-to-layout-mapper.md |
| `as_of_date` / `freshness_tier` | 数据时效标记，用于外部数据的可信度判定 | content-freshness-and-evidence.md |
| evidence strength | 证据强度五级：强数据 / 多证据交叉 / 单一推断 / 情景测算 / 专家判断 | consulting-language-playbook.md |

## 5. 叙事与内容

| 术语 | 定义 | 出处 |
|---|---|---|
| `executive_question` / `client_question` | 决策者要回答的问题 | consulting-storyline-standard.md |
| `deck_answer` / `client_answer` | 整份 deck 的总答案 | consulting-storyline-standard.md |
| `chapter_answer` | 每个章节的答案，页面判断必须回链到它 | consulting-storyline-standard.md |
| `title_spine.md` | 主标题连读成的故事线 | storyline-page-planning.md |
| `storyline_map.json` | 故事线到页面角色的映射 | storyline-page-planning.md |
| `conclusion_evidence_matrix` | 结论-证据-强度-限制-页面的绑定矩阵 | conclusion-evidence-matrix.md |
| `exhibit_structure` | 单页 exhibit 的字段结构（scope / 主证据 / 标注计划 / 辅助读法 / 来源边界） | exhibit-composition-standard.md |
| `content_density` | 内容密度四态：`content_thin` / `balanced` / `content_heavy` / `overloaded` | content-density-precheck.md |

## 6. 语言与三层结构

| 术语 | 定义 | 出处 |
|---|---|---|
| `register`（语域） | 语言规则的适用档：`strict`（成稿从严）/ `rewrite`（改写从宽）/ `consulting`（咨询语域）/ `finance`（金融语域） | writing-style skill |
| `page_structure` | 三层结构之一：页面级网格、安全边距、分区比例、视觉重量 | html-page-design-standard.md |
| `graphic_structure` | 三层结构之二：主证据对象内部构图（坐标、数据-墨比、标注、辅助读法） | html-page-design-standard.md |
| `text_structure` | 三层结构之三：字阶、行宽、行距、层级、密度 | html-page-design-standard.md |
| assertion strength | 断言强度，必须与证据强度匹配（见「证据强度」） | consulting-language-playbook.md |
| meeting-minutes test | 会议纪要测试：标题/结论/建议能否直接被客户放进会议纪要 | consulting-language-playbook.md |
| failure mode / degradation | 失败模式与降级路径。降级只降执行工具，不降判断标准 | failure-modes.md |

**语域互斥**：同一篇稿件只取一个 register，不叠加。`consulting` 是**叠加层**，不替代 client-ready 硬要求。

---

## 待裁决项（原计划在 D2 处理）

| 现象 | 说明 | D2 处置（2026-10-03） |
|---|---|---|
| `standard` / `protocol` / `playbook` / `library` / `rulebook` 五种后缀混用 | 无稳定语义差异 | **已裁决**（2026-10-03 D8，语义见下表）。**既有文件名不回改**（D2 决策：不动文件位置）；新文件按本表命名。引用规则条号必须「文件名 + 条号」成对出现（SKILL.md Anti-Patterns A13） |

### 后缀语义（D8 裁决）

| 后缀 | 语义 | 判据 | 现有数量 |
|---|---|---|---|
| `-protocol` | **流程规则**：规定何时做、按什么顺序做、卡住怎么办 | 状态机、加载顺序、gate、交接 | 12 |
| `-standard` | **质量规则**：规定做成什么样算合格 | 验收判据、阈值、格式 | 20 |
| `-rulebook` | **对象专属禁令集**：某类对象的必须/禁止清单 | 图表、图片 | 2 |
| `-playbook` | **操作手册**：针对具体动作的步骤化做法 | 改写、修复 | 2 |
| `-library` | **素材集合**：可选取的条目，不是规则 | schema、语料、版式、prompt | 4 |

引用某份 reference 的内部规则时，以其「职责」与正文为准，**不以后缀推断行为**；后缀只回答"这类文件管什么"，不回答"这份文件说什么"。
| 96 个文件中 `visual-` 前缀 8 个、`language-` 4 个 | 可按本表 1-6 节重新分组 | **已处理**：`references/INDEX.md` 按工作流阶段分 9 组，并附本表 1-6 节的映射 |
| 部分 reference 内容重叠（如多个 layout 相关文件） | 曾计划按本表分组后合并 | **不合并**（用户决定）：合并会改文件名与全部交叉引用，风险大于收益；改为在 INDEX 中显式写清每份文件的「职责」与「何时读」边界 |
