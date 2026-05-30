# Genspark-Style PPT Pipeline

用于把复杂分析型 PPT 生产过程拆成可复用、可迭代的工程管线。该文件不是要复刻某个产品内部实现，而是把“多角色分阶段工作流”转写成 Codex 可执行步骤。

## Core Idea

复杂 deck 不应直接从 prompt 跳到 PPTX。先把任务拆为七个模块，让同一个 agent 分阶段扮演不同角色：

| Module | Role | Output |
|---|---|---|
| 0. Scene Router | 场景路由器 | `project_config.yaml` |
| 1. Strategic Interview | 演示策略顾问 | `brief.json` |
| 2. Data Pipeline | 研究与数据分析员 | `data_pool.json` + `context_enrichment.json` |
| 2.5 Insight Discovery | 数据洞察发现员 | `insights.json` |
| 3. Narrative Architect | 叙事架构师 | `outline.json` |
| 4. Visual System | 版式与视觉系统设计师 | `design_system.json` + `chart_data/` |
| 5. Build | PPT 构建工程师 | `.pptx` + previews |
| 6. Review / Learn | 审校与场景沉淀 | `review_report.json` / scene variant |

轻量优化任务可以合并阶段；董事会、投委会、银行对标、估值、合规方案等高风险任务应保留阶段产物。

## Module 0: Scene Router

目标：识别项目类型，选择默认框架、模块序列和视觉配置。详见 `references/scene-router.md`。

输出 `project_config.yaml`，至少包含：

- `scene_id`
- `analysis_frameworks`
- `module_sequence`
- `visual_profile`
- `data_mode`

## Module 1: Strategic Interview

目标：先定义“这份 PPT 要让谁做什么决定”。

必须确认或推断：

- `audience`：董事会、管理层、投委会、监管/合规、外部客户。
- `decision_ask`：批准行动方案、确认交易结构、识别风险、调整战略等。
- `subject`：项目、公司、银行、资产包或交易结构。
- `scope`：页数、语言、时间范围、数据口径。
- `brand`：RSM、公司模板、McKinsey-like、用户指定模板。

建议输出 `brief.json`：

```json
{
  "audience": "董事会/投委会",
  "decision_ask": "确认交易结构可行并批准下一步落地",
  "subject": {"name": "项目或公司名称", "type": "交易/银行/业务"},
  "data_period": "用户材料所覆盖期间",
  "target_pages": 15,
  "brand": "RSM",
  "language": "zh-CN",
  "modules": ["executive_summary", "structure", "risk", "action_plan"]
}
```

## Module 2: Data Pipeline

目标：整理材料和事实池，不在设计阶段临时找依据。

素材来源可以是：

- 原始 PPT、Word、PDF、Excel、CSV。
- 合同、法律意见、业务方案、财务模型。
- 用户明确允许使用的公开资料。

输出 `data_pool.json` 时保留：

- 原始事实。
- 指标和计算口径。
- 来源文件与页码/表名。
- 缺口和不能新增的结论。

质量要求：

- 不使用未提供或未核验的数据。
- 法律、合规和财务结论必须保留条件。
- 数字、比例、排名、金额必须能追溯。

详见 `references/data-pipeline.md`。

## Module 2.5: Insight Discovery

目标：让数据先说话，再组织故事。读取 `references/insight-discovery.md`，扫描排名跳变、趋势背离、极值、聚类分离和回归/归因信号。

输出 `insights.json`，至少包含：

- `type`：发现类型。
- `severity`：优先级。
- `description`：数据事实。
- `narrative_implication`：对叙事的含义。
- `suggested_module` / `suggested_page_type`。

这些发现必须先给用户确认；未经确认的敏感结论不要写入主线。

## Module 3: Narrative Architect

目标：把事实池变成页级叙事，而不是直接排版。

每页必须定义：

- `page_id`
- `module`
- `claim_title`：一句结论。
- `support_object`：图、表、矩阵、流程、时间轴、证据卡。
- `layout_pattern`：从 `references/template-catalog.md` 选择。
- `data_keys`：引用 `data_pool.json` 的哪些事实。
- `source_note`

建议输出 `outline.json`：

```json
{
  "pages": [
    {
      "page_id": "P01",
      "module": "cover",
      "claim_title": "项目法律合规结论依赖交易结构、票流和证据链同步闭环",
      "layout_pattern": "cover",
      "support_object": "thesis rail",
      "data_keys": [],
      "source_note": "原始材料；项目组整理"
    }
  ]
}
```

复杂项目必须设置三个确认点：叙事原型、模块页级结构、完整大纲。详见 `references/narrative-architect.md`。

## Module 4: Visual System

目标：先锁定视觉系统，再逐页构建。

输出 `design_system.json` 或等价文本，至少包括：

- 色板：主色、辅助色、语义色。
- 字体层级：标题、副标题、正文、注释、页脚。
- 网格：页边距、页眉、页脚、卡片间距。
- 图表语法：排名条、趋势线、矩阵、流程、证据卡。
- 页面模板：每个 `layout_pattern` 对应的布局规则。
- 渲染策略：原生 PPT、HTML/Playwright 图片层、ECharts/D3 图表层或混合。
- 图表输入：通过 `references/chart-data-adapter.md` 生成每页 `chart_data/Pxx.json`。

RSM 默认视觉（除非用户另行指定）：

- `visual_profile: rsm-insurance-results`，对标《2025 年上市保险公司新准则财务结果分析》。
- 白底、亮蓝粗标题、左上 RSM 三色短条，右上浅蓝模块胶囊和大号章节编号。
- 页面正文优先采用浅灰结论条、白色阴影图表卡、蓝色标题栏和克制页脚。
- 图表色板以亮蓝、深蓝、灰、浅蓝为主；绿色/金色/红色只作为语义色，不作为默认主视觉。
- 不良处置、培训分享或案例教学场景可切换 `rsm-practice-sharing`；全球政策制度比较场景仅在用户指定时切换 `rsm-policy-light`。

详见 `references/visual-system.md`、`references/chart-decision-tree.md`、`references/chart-data-adapter.md` 和 `references/visual-rendering-engine.md`。

## Module 5: Build

目标：逐页生成、渲染、检查、迭代。

构建规则：

- 优先使用可编辑 PPT 文本、形状、表格和图表。
- 复杂雷达图、桥接图、散点图、热力矩阵优先使用 ECharts/D3/SVG 或 HTML/CSS 渲染为高分辨率图片。
- 标题、页码、来源、页脚、关键数字和需要后续改写的内容优先保持可编辑。
- 可使用 PptxGenJS 或 presentation JSX 组装 PPTX；python-pptx 仅作为简单原生对象 fallback。
- 每页只放一个主证明对象。
- 不把整页截图塞入 PPT。

QA 必做：

- 渲染 contact sheet。
- 复杂项目读取 `references/visual-qa-protocol.md`，执行截图级视觉 QA 和返工循环。
- 检查所有页标题是否为结论。
- 检查数据和法律结论是否有来源。
- 检查文字溢出、卡片拥挤、流程箭头含糊。
- 对最弱 2-3 页迭代，而不是只修小瑕疵。

## Module 6: Review / Learn

目标：输出后做四维审校，并在用户要求时沉淀场景库。

- 审校：读取 `references/review-loop.md`，检查数据一致性、叙事自洽性、视觉质量和事实校验。
- 沉淀：用户说“保存为模板/以后复用”时读取 `references/scene-library-updater.md`。

## Bank Board Deck Pattern

适用于银行对标、价值创造、经营分析类董事会汇报。不要硬编码到所有项目中；只有用户材料属于银行/金融机构分析时使用。

推荐模块：

1. 元数据层：报告口径、样本、指标定义、阅读路径。
2. 摘要层：执行摘要、双视角结论、核心框架。
3. 对标层：行业坐标、同业排名、同城对照、雷达或矩阵。
4. 穿透层：ROA、RAROC、EVA 或用户指定框架。
5. 专题层：中收、息差、资产质量、资本、负债结构等。
6. 实证层：估值、PB、市场定价、回归或第三方验证。
7. 综合层：结构性矛盾、竞争格局、行动地图。
8. 合规层：团队、风险提示、免责声明。

常用页面模式：

- `kpi_dashboard`：4-8 个核心指标。
- `ranking_bar`：同业排名、中位线、焦点主体。
- `trend_line`：多年趋势、关键转折点、底部数据表。
- `module_summary`：3 个结论卡 + 3 个数字卡。
- `scenario_table`：基线、压力、行动后三种情景。

## When To Stop And Ask

只在以下情况停下来问用户：

- 受众或决策问题无法从材料推断。
- 用户要求使用外部数据，但未说明来源或是否允许联网。
- 法律/财务结论会因为缺失材料而产生高风险误导。
- 目标页数、模板风格和交付格式互相冲突。
