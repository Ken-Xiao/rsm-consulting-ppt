# Agent Runtime Brief

## Core Principle

每页都要能脱离讲者独立阅读：标题给结论，图表/矩阵给证据，短句给解释，页脚给来源。

## Before Building

默认先判断是否需要策略访谈。用户只给主题、材料或一句“帮我做 PPT”时，先读取 `references/strategy-brief.md`，提出一组精简问题；收到回答后再继续。只有在用户明确要求“直接做/不要提问/按现有材料优化”或任务是小范围 targeted-edit 时，才跳过访谈。

必须确认或推断：

1. 被汇报对象：项目、公司、业务或交易结构。
2. 受众：董事会、管理层、投委会、监管/合规、外部客户。
3. 核心问题：可行性、风险、价值、行动方案或综合判断。
4. 数据/事实来源：用户材料、原始 PPT、合同、模型、报告或公开资料。
5. 输出范围：新建、整体优化、局部修改。

## Guided Strategy Brief

当需要提问时：

- 一次提出 4-8 个最高影响问题，不要分散成十几轮。
- 对能从文件名、材料内容或上下文合理推断的信息，先给出假设，让用户确认或修正。
- 问题必须覆盖内容、版式和交付约束，不只问业务背景。
- 用户回答后，先形成 `brief.json` 或等价 brief，再进入 `Source read`。

## Workflow

如用户要求完整生产管线、复刻 `ppt-agent-workflow-san`、或从零生成复杂分析型 deck，先读取 `references/scene-router.md` 和 `references/workflow-san-pipeline.md`，按“Planning Workflow → Preset Build Workflow”执行；需要参考 Guide Mode 多阶段思路时，再读取 `references/genspark-style-pipeline.md`。否则使用下面的轻量工作流。

1. **Source read**
   - 抽取原材料的标题、结论、数字、合同/法律观点、未决事项。
   - 对已有 PPT 先渲染 contact sheet，判断哪些页是内容源，哪些页是反面样例。
   - 如果材料是跨国家、跨司法辖区、跨监管制度或政策比较研究，读取 `references/global-policy-comparison-template.md`。
2. **Claim spine**
   - 写出每页一句结论。
   - 每页指定一个证明对象。
   - 标记不能新增的事实和需要保留的原始措辞。
   - 如果存在 `data_pool.json`，读取 `references/insight-discovery.md`，先扫描数据发现，再写叙事。
3. **Template selection**
   - 读取 `references/template-catalog.md`。
   - 读取 `references/chart-decision-tree.md`，为数据页选择图表。
   - 完整项目必须为每页生成 `preset_family`，形成 `preset_map.json` 或等价页面家族映射。
   - 默认视觉为 `rsm-insurance-results`：白底、亮蓝粗标题、右上浅蓝模块胶囊、浅灰结论条、白色阴影图表卡。
   - 政策比较类页面优先考虑 `policy_philosophy_map`、`jurisdiction_matrix`、`jurisdiction_chapter_cover`、`policy_framework_cards`、`policy_timeline`、`behavior_impact_triad` 和 `industry_response_grid`。
   - 为每页选择版式类型；相邻 3 页不要使用同一种宏观布局。
4. **Language pass**
   - 读取 `references/language-discipline.md`。
   - 把长段落改成短句、矩阵、流程或证据卡。
5. **Build**
   - 读取 `references/visual-rendering-engine.md`，选择原生、HTML 或混合渲染路径。
   - 优先生成可编辑 PPT 对象。
   - HTML 参考版式可借鉴 `assets/layouts/layout-*.html` 和 `assets/layouts/chrome.css`；示例页中的公司名、数字和口径必须全部替换为用户材料。
   - 不要把整页无差别导出为图片；只把复杂主体区域或复杂图表渲染为图片，关键标题、页脚、来源、核心数字尽量保持可编辑。
6. **Render and QA**
   - 导出 PPTX。
   - 渲染预览图或 contact sheet。
   - 复杂项目读取 `references/visual-qa-protocol.md`，做截图级视觉检查。
   - 检查文字溢出、来源条、页码、流程线、色彩语义。
   - 弱页必须迭代。

## Pipeline Artifacts

复杂项目建议在工作目录保留以下中间产物，供后续迭代复用。字段结构和命名先读取 `references/artifact-schema-library.md`，不要临时发明 JSON 结构。

- `project_config.yaml`：场景路由、默认框架、模块序列、视觉配置。
- `brief.json`：受众、决策问题、对象、数据口径、目标页数。
- `context_enrichment.json`：宏观背景、政策、近期事件和来源。
- `data_pool.json`：事实、指标、来源、计算口径和缺口。
- `insights.json`：数据驱动发现、优先级和建议叙事含义。
- `outline.json`：模块、页序、每页结论、证明对象、版式类型。
- `design_system.json`：颜色、字体、网格、图表语法、页面模板选择。
- `preset_map.json`：每页的 page family、visual profile、render strategy、QA focus。
- `chart_data/`：每页图表的标准化输入数据。
- `review_report.json`：数据一致性、叙事自洽性、视觉质量问题和修复建议。

## Page-Level Checklist

每一页生成后检查：

- 标题是否是一句结论。
- 证明对象是否能支撑标题。
- 是否删掉了可删的形容词和口号。
- 数字、法律观点、合同口径是否有来源。
- 页面是否只有一个主阅读路径。
- 同一类卡片是否对齐、同高、同宽。
- 文本是否不挤、不贴边、不溢出。

## Layout Rules

- 正文页优先使用“标题栏 + 主证明对象 + 底部解释/来源”的结构。
- 法律/合规页优先用 `issue_answer_matrix`，不要堆条文段落。
- 跨司法辖区政策比较页优先先给分类，再给矩阵，最后逐辖区深挖；不要一上来堆国家事实。
- 交易结构页优先分层：主债权链、履约链、回款/票据/信息流。
- 实施路径页优先压成 3 阶段；必须保留细节时再用 4-7 步流程。
- 风险页必须同时写风险和控制动作，不只列风险。

## QA Gates

硬性不通过：

- 页面没有来源条。
- 标题只是主题词，不是判断。
- 使用用户未提供或未核验的数据/法律依据。
- 长段文字超过一个卡片还未结构化。
- 流程箭头方向含糊或节点关系不清。
- 同一页出现多个互相抢夺注意力的主图。

## Output Notes

交付时简要说明：

- 修正了哪些叙事/版式问题。
- 输出文件路径。
- 是否已渲染和布局检查。
