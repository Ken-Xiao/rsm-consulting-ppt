# Visual System

用于定义金融咨询 PPT 的视觉系统、图表选择、渲染路线和反模式检查。读取 `outline.json` 后使用。

## V3 Visual Principle

视觉系统不只决定“好不好看”，还要决定“哪些内容必须可编辑、哪些内容可以像素级渲染”。复杂金融 PPT 默认采用混合渲染：

- 原生 PPT 层：标题、页码、来源、脚注、关键数字、简单表格和需要后续修改的对象。
- HTML/Playwright 像素层：复杂 KPI 卡片组、密集小结页、热力矩阵、敏感性表、复杂二分法页面。
- ECharts/D3/SVG 图表层：雷达、瀑布/桥接、复杂散点回归、漏斗、现金流路径和情景热力图。

详细渲染选择读取 `references/visual-rendering-engine.md`。不要把整页无差别压成图片；只有复杂主体区或复杂图表可以图片化。

如果用户要求对标 `2025年上市保险公司新准则财务结果分析_final.pdf` 或 `final-20251031 商业银行及保险公司不良处置行业实践分享-1103.pdf`，先读取 `references/rsm-reference-visual-dna.md`。该文件优先级高于通用 visual rules。

## Visual Profiles

| Profile | Use when | Style |
|---|---|---|
| `rsm-insurance-results` | 默认；上市保险公司业绩盘点、新准则财务结果分析、同业财务指标对比、金融机构财务复盘 | 白底、亮蓝总标题、浅蓝模块胶囊、白色阴影图表卡、蓝/深蓝/灰堆叠图 |
| `rsm-policy-light` | 监管研究、金融咨询、政策比较、合规方案、董事会阅读版 | 白底、亮蓝大标题横线、浅灰卡片、浅蓝规则框、极简页脚 |
| `rsm-dark` | 董事会、深度分析、高密度数据 | 深蓝页眉/深色章节 + 浅灰正文 |
| `rsm-light` | 外部客户、监管/法律稳重风 | 白底、蓝灰线条、低装饰 |
| `minimal-data` | 投行/投委会、数据优先 | 白底、高留白、图表直接标签 |
| `original-template` | 用户要求沿用原稿 | 保留母版、字体、色板，局部优化 |
| `pitchbook` | 融资、估值、交易谈判 | 高密度表格、估值区间、交易对比 |
| `global-policy-light` | 跨国家/司法辖区政策比较、监管制度研究 | 白底、亮蓝标题线、浅色国家列、卡片化制度解释 |
| `rsm-practice-sharing` | 不良处置、监管培训、行业实践分享、案例复盘 | 白底、书法感蓝色大标题、分段标题线、建筑照片拼贴、案例卡、流程/关系图 |
| `rsm-global-policy` | 全球贷款核销、会计准则、税务协同、跨司法辖区监管政策比较 | 白底亮蓝大标题、三段横线、浅建筑底纹、2x2 坐标、司法辖区矩阵、深色总结页 |
| `sunong-value-creation` | 银行董事会/管理层价值创造、经营对标、PB/EVA/ROA/RAROC 诊断 | 深蓝封面、白底高密度诊断页、KPI 仪表盘、模块小结、经营/资本市场双视角 |

默认优先使用 `rsm-insurance-results`。只有用户明确要求监管政策矩阵/合规方案，才切换到 `rsm-policy-light`；原稿是深色模板、董事会强仪式感章节或用户明确要求深色时，才切换到 `rsm-dark`。

当用户给出或提到 `global_loan_writeoff_policy_comparison`、全球贷款核销、跨国家/司法辖区政策比较、IFRS 9/CECL/税务协同等内容时，优先使用 `rsm-global-policy`。当用户给出或提到 `苏农汇报材料`、苏州农商行、价值创造、经营对标、ROA/RAROC/EVA/PB、董事会经营诊断时，优先使用 `sunong-value-creation`。

## RSM Insurance Results Profile

用于复刻 `2025年度上市保险公司新准则财务结果分析` 这类“专业财务结果盘点”视觉。它的核心不是炫，而是让密集图表显得干净、可信、可横向比较。

视觉特征：

- 画布为 16:9 横版，白底，页眉区高度约 13%-15%。
- 左上保留 RSM 三色短条或等价 brand mark；主标题使用亮蓝超粗中文，字号约 34-42pt。
- 右上使用浅蓝渐变或浅蓝底的模块胶囊，显示章节名和大号章节编号，如 `整体财务结果分析 01`。
- 二级标题放在页眉下方，深灰色，字号约 24-28pt。
- 关键结论条使用浅灰底 + 左侧亮蓝竖线，正文不小于 18pt；结论条最多 2-3 行。
- 主图放在白色大卡片内，卡片圆角 6-10px，轻阴影；图表本身不加重背景。
- 图表色板固定为亮蓝 `#0099D8`、深蓝 `#061B3A`、中灰 `#6A6F76`、浅蓝 `#7ED0F0`，负值可用灰色或红色，但不要整页红色化。
- 脚注和口径说明在主图下方，字号 10-12pt；正文页页码右下角，弱灰色。

精确版式参数：

| Element | 1920x1080 reference |
|---|---|
| Header height | 142-150px |
| Header bottom rule | 12-16px 浅灰 |
| Brand bars | x=0, y≈70px, h≈42px，灰/绿/亮蓝 |
| Deck title | x≈105px, y≈66px, 50px 左右，亮蓝超粗 |
| Module pill | x≈1360px, y≈66px, w≈560px, h≈74px，左上圆角 |
| Page subtitle | x≈105px, y≈185px, 42px 左右，深灰 |
| Takeaway bar | x≈105px, y≈295px, w≈1710px, h≈80-110px，浅灰底+蓝竖线 |
| Chart card | x≈105px, y≈405-430px, w≈1710px, h≈430-520px，白底阴影 |
| Footnote | x≈105px, y≈890px 起，灰色小字 |
| Footer page no. | 右下，弱灰 |

适合版式：

- `insurance_results_chart_card`
- `paired_period_comparison`
- `stacked_contribution_split`
- `financial_metric_grid`
- `accounting_policy_note`

不适合：

- 大面积深色页眉。
- 手写/书法标题。
- 大量照片占据正文页。
- 强装饰图标。

## RSM Practice Sharing Profile

用于复刻 `商业银行及保险公司不良处置行业实践分享` 这类“培训分享 / 案例复盘 / 行业经验”PPT。它的特点是观点直接、案例密集、图解表达强，视觉上更像咨询培训课件。

视觉特征：

- 白底，大标题使用亮蓝色、书法感或楷体/行楷风格中文；若系统缺少书法字体，使用 `STKaiti`、`KaiTi` 或 Noto Serif SC，并加粗。
- 标题下方使用三段横线：灰线、深蓝线、亮蓝长线；这是该风格的关键识别锚点。
- 封面/目录/章节页使用建筑玻璃幕墙照片，配合半透明白色几何方块和左/右侧亮蓝色竖条。
- 正文页不使用厚重页眉，内容直接落在白底上。
- 案例页使用带阴影的白卡，顶部可嵌入窄幅照片或蓝色胶囊标签。
- 观察/建议类页面常用“左侧案例文本 + 右侧三张建议卡 / 时间线 / 关系结构图”。
- 流程节点使用亮蓝圆点、编号圆章、细灰连接线；编号圆章不宜过小。
- 允许较高文字密度，但正文段落不得低于 16pt；案例卡正文优先 18-20pt。

精确版式参数：

| Element | 1920x1080 reference |
|---|---|
| Body title | x≈65px, y≈75px, 56-62px，亮蓝书法/楷体 |
| Segmented rule | y≈178px，高 10-12px，灰线 12%、深蓝 29%、亮蓝剩余 |
| Lead paragraph | x≈65px, y≈235px，26-28px，黑色楷体 |
| Footer | 左下版权，右下页码，10-12pt |
| Agenda photo | 左侧约 45% 宽，满高或接近满高 |
| Agenda list | 右侧白底，行高约 120-130px |
| Case card | 白底、浅蓝描边、蓝色阴影，顶部可嵌图片 |
| Mechanism band | 横向亮蓝带，高约 185-220px |

适合版式：

- `practice_photo_cover`
- `practice_agenda`
- `practice_section_divider`
- `observation_with_timeline`
- `two_case_with_center_mechanism`
- `three_recommendation_cards`
- `case_evidence_panel`
- `risk_network_diagram`

不适合：

- 保险财务盘点式顶部模块胶囊。
- 过度卡片化 KPI 仪表盘。
- 彩虹色矩阵。
- 把案例正文压成脚注字号。

## RSM Global Policy Profile

用于复刻 `global_loan_writeoff_policy_comparison_20260121015942.pdf` 这类全球政策比较研究。核心是把复杂制度差异压缩为可比较的监管哲学、制度矩阵和行为影响。

视觉特征：

- 白底或极浅建筑底纹，亮蓝标题，标题下常用灰/深蓝/亮蓝三段横线。
- 封面允许大面积浅建筑照片，但正文页以白底为主。
- 页面主体常用 2x2 坐标、2x2 政策卡、8 司法辖区卡片网格、大矩阵和深色总结页。
- 司法辖区颜色应低饱和并固定映射：美国蓝、欧洲紫、新加坡绿、香港红/粉、日本橙、巴西青、巴拿马靛、开曼玫红。
- 图标只作分类提示，不承担证据；制度证据必须来自文本、出处、法规或政策口径。

适合版式：

- `global_policy_cover`
- `global_policy_agenda`
- `global_policy_dark_summary`
- `policy_philosophy_map`
- `jurisdiction_matrix`
- `policy_framework_cards`
- `standard_dual_compare`
- `policy_timeline`
- `behavior_impact_triad`

不适合：

- 单色深蓝全篇正文。
- 高饱和彩虹矩阵。
- 只罗列各国事实，不提炼监管哲学、行为影响和适用边界。
- 用国家旗帜或图标替代制度差异解释。

## Sunong Value Creation Profile

用于复刻 `苏农汇报材料.pptx` 这类董事会/管理层价值创造与经营对标汇报。核心是把银行经营指标与资本市场定价联系起来，形成“发现 -> 归因 -> 缺口 -> 行动”的高密度阅读路径。

视觉特征：

- 封面为深蓝渐变，左侧大标题，右上 RSM 白底 logo，右侧元数据栏，底部阅读路径。
- 正文页白底，左上短亮蓝线，深蓝结论标题，灰色副标题。
- 常用结构包括 4 KPI 仪表盘、主图 + 右侧诊断、同业排名、散点/回归、瀑布桥接、雷达图、情景测算、模块小结。
- 正文允许较高信息密度，但必须有一个清晰主证明对象和 1-3 个诊断读法。
- 红色只用于负向偏离或风险，金色用于约束/压力区间，亮蓝用于焦点主体或推荐方向。

适合版式：

- `sunong_dark_cover`
- `kpi_dashboard`
- `sunong_chart_diagnostic`
- `ranking_bar`
- `trend_line`
- `scatter_regression`
- `bridge_waterfall`
- `sensitivity_matrix`
- `module_summary`

不适合：

- 营销式 hero 或大面积照片封面。
- 每页只有一个孤立图表、没有诊断含义。
- 把估值模型、回归或 SHAP 结果写成无前提事实。
- 使用附录密表作为正文核心页。

## Default Color Scheme

默认参考 `2025年度上市保险公司新准则财务结果分析`：

| Token | Color | Use |
|---|---|---|
| `results_blue` | `#0099D8` | deck 主标题、模块主色、图表主色、结论条左竖线 |
| `results_navy` | `#061B3A` | 强调数据、图表深色系列、标题关键字 |
| `results_gray` | `#6A6F76` | 第三图表系列、负值辅助、说明文字 |
| `results_sky` | `#7ED0F0` | 第四图表系列、辅助分项 |
| `module_pill` | `#DDF2FF` | 右上章节胶囊底色 |
| `takeaway_gray` | `#F3F3F3` | 关键结论条背景 |
| `chart_card` | `#FFFFFF` | 主图卡背景 |
| `page_rule_gray` | `#F2F2F2` | 页眉分隔浅灰带 |

监管政策、合规方案或全球比较场景可使用 `rsm-policy-light` 色板：

| Token | Color | Use |
|---|---|---|
| `bright_blue` | `#0099D8` | 大标题、横线、图标、规则框边线、重点标签 |
| `deep_navy` | `#061B3A` | 正文强调、章节封面压线、页脚页码 |
| `card_gray` | `#F7F8FA` | 规则卡、2x2 框架卡、策略卡背景 |
| `rule_blue` | `#DFF1FC` | 卡片内嵌规则框、说明框 |
| `body_gray` | `#2F3A4A` | 正文 |
| `muted_gray` | `#667085` | 来源、页脚、辅助说明 |
| `warning_red` | `#EF4444` | 仅用于负向关键数字或重大风险 |
| `success_green` | `#10B981` | 可行、协同、正向机制 |
| `condition_gold` | `#F59E0B` | 条件、过渡、审慎提示 |

多国家/多主体矩阵使用低饱和列底色：浅蓝、浅紫、浅绿、浅金、浅黄、浅青、浅粉、浅灰。不要使用高饱和色块。

## Style Selection Rules

- 用户给的是上市公司业绩盘点、保险新准则、IFRS 17/IFRS 9、利润/费用/承保/投资收益拆解：优先 `rsm-insurance-results`。
- 用户给的是不良处置、核销、批量转让、责任认定、行业经验分享、培训材料：优先 `rsm-practice-sharing`。
- 用户给的是全球政策比较、贷款核销制度、IFRS 9/CECL、税务协同、跨司法辖区监管：优先 `rsm-global-policy`。
- 用户给的是苏农、农商行经营对标、VQA、ROA/RAROC/EVA/PB、董事会价值创造汇报：优先 `sunong-value-creation`。
- 同一项目若同时包含财务数据分析和案例培训：数据分析章节用 `rsm-insurance-results`，案例/观察章节用 `rsm-practice-sharing`，但封面和页脚保持同一套 logo、日期、版权格式。

## Design Rules

生成正式客户交付页时，先读取 `references/visual-presentation-upgrade.md`，用其补充阅读路径、视觉重量、密度层级、主证据突出度和可编辑性要求。

1. 信息密度分层：
   - 封面/转折页：少于 50 字。
   - 摘要页：2-4 个结论 + 必要数字。
   - 分析页：1 个大尺度主图 + 2-4 个解读点/辅助证据点。
   - 附录页：表格为主，但标题仍给结论。
   - 正文页有效内容占用面积目标为 70%-82%；低于 65% 时必须放大主证据对象、增加洞察卡或增加指标 strip。
2. 二分法版面：
   - 左 60% 主图，右 40% 解读；或上半主图，下半三栏结论。
   - 如果使用“主图 + 右侧解读”，右侧解读必须是证据卡或管理含义卡，不做空泛文字块。
3. 标题系统：
   - 正文页标题使用亮蓝大字左对齐，右侧延展 4-5px 亮蓝横线。
   - 重点章节可使用“灰线 + 亮蓝线 + 深蓝线”的分段标题线。
   - 标题不放在深色页眉条内。
4. 卡片系统：
   - 正文卡片优先浅灰底、左侧亮蓝竖线。
   - 卡片内的口径、规则、关键机制放在浅蓝规则框中。
   - 2x2 规则卡用于政策/监管/合规框架页。
5. KPI 卡片：
   - 一页最多 4 个核心 KPI；超过则拆页或放附录。
6. 排名条形图：
   - 横向排序，主体高亮，中位线/阈值线明确。
7. 大矩阵：
   - 左侧维度列深蓝或亮蓝，顶部表头亮蓝。
   - 主体列用低饱和浅色，不用重色填充。
   - 矩阵文字每格 1-3 行，超出则拆页。
8. 模块小结：
   - 3 个结论卡 + 3 个数字卡 + 下一模块提示。
   - 小结页不得只有 3 张文字卡；每张卡必须有证据页回链或关键数字。
9. 页脚系统：
   - 来源在左下，页码在右下，灰色小字，不加厚重页脚条。

10. 参考 PDF 复刻优先级：
   - `rsm-insurance-results` 正文页必须使用固定页眉、模块胶囊、结论条、图表卡和弱页脚。
   - `rsm-insurance-results` 正文页必须让主图卡占据中下部主体区域；图表数据不足时增加洞察卡、指标 strip 或口径卡。
   - `rsm-practice-sharing` 正文页必须使用书法标题、三段标题线和弱页脚。
   - 不得混用：保险正文页不使用书法标题；实践分享正文页不使用右上模块胶囊。
   - 封面/章节/目录必须使用照片和白色几何方块拼贴；不要用纯渐变或普通卡片替代。

## Typography Sizing Rules

字号必须跟版式和阅读距离匹配。默认按 16:9、1920x1080 画布设计，优先保证投影和截图预览可读。

| Page / Element | Recommended | Minimum |
|---|---:|---:|
| 正文页大标题 | 48-56px / 36-42pt | 42px / 32pt |
| 小标题/卡片标题 | 30-34px / 22-26pt | 26px / 20pt |
| 普通正文 | 26-30px / 19-22pt | 24px / 18pt |
| 卡片内规则框正文 | 23-27px / 17-20pt | 22px / 16.5pt |
| KPI 标签/说明 | 18-22px / 14-16pt | 17px / 13pt |
| 表格/矩阵正文 | 18-22px / 14-16pt | 17px / 13pt |
| 密集矩阵最低字号 | 16-18px / 12-14pt | 16px / 12pt |
| 页脚/来源 | 14-16px / 10.5-12pt | 13px / 10pt |

版式适配规则：

- 2x2 政策框架卡：正文不低于 26px；每卡超过 90-110 中文字时拆成两页或改为 2 页连续讲。
- 三栏影响卡：正文不低于 24px；每栏最多 2 段正文 + 1 条证据条。
- 大矩阵：每格最多 1 个主判断 + 1 个补充短句；若需要超过 16px 才能装下，拆成两张矩阵或改为分组矩阵。
- KPI 页：大数字可以略小，但解释文字不低于 18pt；不要为了保留 4 张 KPI 卡而把说明压到小字。
- 附录密表：可以使用 16px，但必须是附录页；正文页不使用附录密表字号。
- 如果文字溢出，处理顺序是：删减文字 → 分栏/换版式 → 拆页 → 最后才小幅缩字号；不得低于上表 minimum。

## Chart Selection Matrix

先读取 `references/chart-decision-tree.md`，再使用下表作为快速映射。生成前应把 `data_pool.json` 通过 `references/chart-data-adapter.md` 转成对应图表的标准输入格式。

| Data shape | Recommended visual |
|---|---|
| 单指标 × 多主体排名 | 横向排名条 |
| 单指标 × 多年趋势 | 折线图或柱线组合 |
| 两指标关系 | 散点图 + 回归线/象限 |
| 多维对比 | 雷达图或评分矩阵 |
| 指标分解/传导 | 瀑布/桥接图 |
| 情景模拟 | 敏感性热力图/矩阵 |
| 现金流路径 | 漏斗、瀑布、泳道 |
| 主体关系 | 交易结构图 |
| 风险与缓释 | 风险控制矩阵 |
| 两个主体对比 | 双列对比表 |
| 多辖区 × 多制度维度 | 大矩阵 / 政策比较矩阵 |
| 政策哲学定位 | 二维坐标图 + 类型标签 |
| 制度沿革 | 时间线 |

## Anti-Patterns

避免：

- 3D 图表。
- 渐变填充条形图。
- 超过 7 条线的折线图。
- 饼图/圆环图用于金融分析中的关键判断。
- 单页超过 2 种主图表。
- 大段文字没有层级。
- 正文字号过小，导致缩略图或投影下不可读。
- 为了塞进单页而把正文压到表格/脚注字号。
- 图例和数据标签重复。
- 同一页同时出现多个主结论。
- 为了省事把整页做成不可编辑图片。
- 用图片图表承载需要用户经常改数的表格或指标。
- 没有为复杂图表保留可追溯数据输入文件。
- HTML 渲染区和原生 PPT 标题/页脚之间没有统一网格。
- 国家/辖区颜色过于鲜艳，导致比较矩阵像彩虹表。
- 跨政策比较页只罗列事实，不提炼监管哲学、行为影响和适用边界。

## Rendering Assignment

在 `design_system.json` 中为每页增加 `render_strategy`：

```json
{
  "P08": {
    "layout_pattern": "sensitivity_matrix",
    "chart_type": "heatmap_matrix",
    "render_strategy": "html_image_plus_editable_overlay",
    "editable_elements": ["claim_title", "source_note", "page_number", "key_takeaway"],
    "image_elements": ["main_heatmap"]
  }
}
```

选择规则：

- 后续需要改文字或改数：优先原生 PPT。
- 版面复杂、需要像素级对齐、PowerPoint 原生难以稳定复现：HTML/Playwright 渲染主体区。
- 图表复杂且审美要求高：ECharts/D3/SVG 渲染为高分辨率 PNG/SVG。
- 法律/合规、交易结构、风险矩阵：优先可编辑形状和文本，除非用户只要求定稿展示。

## Visual QA

生成后必须读取 `references/visual-qa-protocol.md`，至少完成一轮截图级检查。复杂项目要修复后重新渲染，直到没有 critical 视觉问题。

## Output: design_system.json

```json
{
  "visual_profile": "rsm-insurance-results",
  "colors": {
    "results_blue": "#0099D8",
    "results_navy": "#061B3A",
    "results_gray": "#6A6F76",
    "results_sky": "#7ED0F0",
    "takeaway_gray": "#F3F3F3",
    "chart_card": "#FFFFFF"
  },
  "density": "high",
  "chart_assignments": {
    "P04": "insurance_results_chart_card",
    "P08": "paired_period_comparison"
  },
  "render_assignments": {
    "P04": "native_ppt_chart_or_echarts_body",
    "P08": "native_ppt_chart_or_echarts_body"
  },
  "layout_rules": {
    "chrome": "insurance header + module pill + gray takeaway + chart card",
    "footer": "source + page number",
    "max_main_visuals": 1
  }
}
```
