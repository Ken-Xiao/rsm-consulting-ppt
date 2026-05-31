# Visual Rendering Engine

用于选择 PPT 构建技术路线。目标是在可编辑性和像素级视觉质量之间做明确取舍，而不是默认使用单一工具。

## Core Principle

金融咨询 PPT 的页面分为两类对象：

- **必须可编辑**：标题、页码、来源、脚注、关键数字、表格文字、结论框。
- **可以像素渲染**：复杂 KPI 卡片组、雷达图、瀑布图、IRR/敏感性热力图、复杂二分法页面、高密度视觉主体。

不要无差别把整页截图塞入 PPT。优先“骨架可编辑 + 主体精确渲染 + 关键数字叠加可编辑”。

完整项目先读取 `references/workflow-san-pipeline.md`，生成 `preset_map.json` 后再进入构建。构建阶段只执行已确认的 preset/page family，不在渲染时临时重写叙事结构。

进入渲染前必须读取 `references/layout-lock-protocol.md` 和 `references/layout-analysis-report.md`：

- `preset_map.json` 中每页 page family 必须被 visual profile 白名单允许。
- `layout_analysis_report.json` 必须在正式 PPTX build 前生成，并经用户确认或明确标记为 `assumed_user_requested_direct`。
- 若存在 `layout_gap`、未知 page family 或 `fullness_risk=high`，不得批量构建。

每页渲染前还必须读取 `references/storyline-page-planning.md` 中的 `visual_intent` 要求，先判断本页逻辑关系是递进、并列、对比、因果、下钻还是综合，再选择图表、表格、流程、卡片或图片。

选择 page family 后读取 `references/page-family-contracts.md`，确认必填字段、最大文字量、主视觉对象、禁用项和可编辑性要求。导出前读取 `references/editability-check.md`，不得把关键文字、数字、来源和结论整页图片化。

## Rendering Tracks

### Track A: Native PPT Layer

Use for:

- 标题、章节、页眉页脚、来源、页码。
- 简单文本框、形状、线条、箭头。
- 可编辑表格。
- 简单柱状图、折线图、散点图。
- ≤2 数据系列、标准类型、客户可能修改数据的图表。

Preferred tools:

- artifact-tool presentation JSX when available in Codex presentation workflow.
- PptxGenJS if building through Node.js.
- python-pptx only for simple template edits or when Node is unavailable.

### Track B: HTML / CSS / Playwright Image Layer

Use for:

- KPI 仪表盘卡片。
- 模块小结卡片组。
- 高密度双栏/三栏咨询版式。
- IRR 矩阵、敏感性矩阵、风险热力表。
- 需要像素级对齐、阴影、网格、色带、条件格式的页面主体。

Build rule:

1. 用 HTML/CSS 生成单页主体区域。
2. 用 Playwright/Chromium 截图，至少 2x 分辨率。
3. 把 PNG 放入 PPT 主体区域。
4. 用原生 PPT 叠加标题、页码、来源和必要关键数字。

### Track C: ECharts / D3 / SVG Chart Layer

Use for:

- 雷达图。
- 瀑布/桥接图。
- 敏感性热力图。
- 复杂散点、象限、回归图。
- 漏斗、现金流传导、阶段式水位图。

Build rule:

1. 从 `chart_data/` 读取标准输入。
2. 生成 SVG 或高分辨率 PNG。
3. 嵌入 PPT。
4. 图表标题、结论、来源保持原生可编辑。

## Selection Rules

### Native Chart Priority Path

优先判断 `chart_render_path`：

| Chart condition | Path |
|---|---|
| 简单柱状、条形、折线、面积、散点、饼图，且 ≤2 数据系列 | `native-chart` |
| 简单图表但标签/标注密集 | `native-chart-with-simplified-labels` 或 `echarts-image-with-chart-data` |
| 瀑布、雷达、热力矩阵、Sankey、复杂回归、情景敏感性 | `echarts-or-html-image` |
| 客户明确要求后续可改数据 | 优先 `native-chart`，复杂图表也必须保留 `chart_data/Pxx.json` |

在 `preset_map.json` 或 `chart_data/Pxx.json` 中记录：

```json
{
  "chart_render_path": "native-chart",
  "native_editability_reason": "bar chart with two series; client likely revises values"
}
```

不得为了视觉方便把简单图表默认截图化。

先按逻辑关系选择视觉大类：

先按逻辑关系选择视觉大类：

| Logic relationship | Preferred visual |
|---|---|
| `progression` | 阶梯、流程、路线图、桥接图 |
| `parallel` | 多栏卡片、2x2、并列矩阵 |
| `comparison` | 双列对照、双期间图、差异表 |
| `causal_chain` | 箭头链、机制图、瀑布/传导图 |
| `drill_down` | 总分结构、拆解图、分面图 |
| `synthesis` | 小结卡、证据汇总、决策表 |

再按数据形状选择具体图表，并用 `financial-chart-grammar.md` 检查画法。

| Page / object | Default track |
|---|---|
| 封面、章节页 | Native unless complex background needed |
| section_divider with generated image | Native text + generated background image; record image metadata |
| 标题、页脚、来源 | Native |
| 执行摘要文字卡 | Native or HTML if high density |
| KPI dashboard | HTML image + editable key numbers |
| ranking_bar | Native for simple; HTML/ECharts for dense |
| trend_line | Native if <= 4 series; ECharts if annotated |
| radar | ECharts/SVG image |
| bridge_waterfall | ECharts/SVG image |
| sensitivity_matrix | HTML table image |
| appendix_dense_table | Native table if editable; HTML image if too complex |
| insurance_results_chart_card | Native title/footer + ECharts/PPT chart in white card |
| paired_period_comparison | Native/PptxGenJS if labels simple; ECharts if dense labels |
| stacked_contribution_split | ECharts/SVG image + editable labels when final |
| practice_photo_cover | Native text + background image layer |
| practice_agenda | Native text + background image layer |
| practice_section_divider | Native text + background image layer |
| observation_with_timeline | Native for text/timeline; HTML only if dense visual alignment is hard |
| two_case_with_center_mechanism | Native shapes/text preferred; HTML if card shadows/photos dominate |
| three_recommendation_cards | Native shapes/text preferred |
| case_evidence_panel | Native text preferred; right-side photo as image |
| risk_network_diagram | Native shapes for editability; SVG only for complex networks |
| executive_summary_grid | HTML layout or native cards; see `assets/layouts/layout-executive-summary-grid.html` |
| option_comparison | HTML layout or native table; see `assets/layouts/layout-option-comparison.html` |
| management_action_plan | Native table if editable; HTML for stable preview, see `assets/layouts/layout-management-action-plan.html` |
| chart_plus_insight_panel | HTML layout + chart image/native overlay; see `assets/layouts/layout-chart-plus-insight-panel.html` |

## Style-Specific Rendering Notes

### `rsm-insurance-results`

- Keep title, module pill, source and page number editable.
- Render the main chart card as editable PPT chart when the user is likely to revise numbers.
- Use ECharts/SVG for dense stacked contribution labels, but preserve chart data in `chart_data/`.
- Do not rasterize the whole slide; the visual quality comes from a consistent chrome plus clean chart area.

### `rsm-practice-sharing`

- Keep case text editable whenever possible because training decks are frequently revised.
- Use native shapes for blue title rules, numbered circles, case cards and timelines.
- Background building photos can be bitmap assets; overlay geometric white blocks as native shapes when feasible.
- Section divider photos may be generated with `gpt-image-generate` when no licensed asset is available; record prompt and usage boundary in `visual_intent/Pxx.json` or image metadata.
- Avoid converting long case pages to images; it makes legal and factual edits painful.

## Output Metadata

For each page record:

```json
{
  "page_id": "P08",
  "render_tracks": ["native", "html-image"],
  "editable_elements": ["title", "source", "page_number", "key_metric"],
  "image_elements": ["risk_heatmap"],
  "source_files": ["chart_data/P08.json", "draft_pages/P08.html"],
  "editability_risk": "low",
  "rationale": "heatmap requires conditional formatting and precise alignment"
}
```
