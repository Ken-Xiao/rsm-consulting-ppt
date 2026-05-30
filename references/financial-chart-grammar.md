# Financial Chart Grammar

用于规范专业金融咨询 PPT 的图表表达。选择图表前先读 `chart-decision-tree.md`，确定图表后用本文件检查画法。

客户交付核心图表还必须读取 `professional-chart-rulebook.md`。本文件负责基础图表语法，`professional-chart-rulebook.md` 负责合伙人级图表契约、标注、基准和审校。

## Core Rules

- 图表只服务一个结论。
- 标题讲结论，图表讲证据，脚注讲口径。
- 每张图必须先定义 `chart_point_of_view`，即这张图让客户看到什么判断。
- 图表必须有单位、期间、样本、来源。
- 不用 3D、饼图、过度渐变、装饰性网格。
- 不用双轴，除非两个指标单位不同且趋势关系是页面结论的一部分。
- 图例能直接标注时不用图例。
- 颜色数量越少越好；默认使用亮蓝、深蓝、灰、浅蓝。

## Chart Point Of View Schema

每张核心图表在 `chart_data/Pxx.json` 或 `visual_intent` 中必须包含：

```json
{
  "chart_point_of_view": "利润改善主要来自投资端，承保贡献未同步改善",
  "benchmark_type": "2025 vs 2024 / 同业中位 / 行业均值 / 目标阈值",
  "focus_series": "投资收益贡献",
  "annotation_priority": ["投资收益提升", "承保贡献下降"],
  "chart_readout": "净利润增长不能直接等同于经营质量改善"
}
```

规则：

- `chart_point_of_view` 必须服务页面标题。
- `benchmark_type` 必须明确；没有基准的图通常不能支撑咨询判断。
- `focus_series` 只能 1-2 个，避免满图高亮。
- `annotation_priority` 最多 2 个。
- `chart_readout` 应能放进图表卡或洞察卡。
- 核心图表还必须包含 `conclusion_id`、`comparison_basis`、`period`、`sample` 和 `lineage_ids`，用于回链 `conclusion_evidence_matrix.json`。

## Bar / Column Charts

Use for:

- 多主体比较。
- 双年度比较。
- 单指标排名。

Rules:

- 排名条必须明确排序方向。
- 主体高亮只高亮 1-2 个，不要全页多色。
- 正负值必须以 0 轴为基准。
- 若标签密集，优先横向条形图。
- 柱状图超过 12 个类目时，考虑分组、筛选或改为表格。

## Stacked Contribution

Use for:

- 利润、收入、费用、资产、资本等构成。
- 新旧年度分项贡献。

Rules:

- 构成占比必须归一到 100%，除非明确是金额分解。
- 正负项混合时，优先用 waterfall，不强行堆叠。
- 分项颜色顺序固定：亮蓝、深蓝、灰、浅蓝。
- 每个堆叠段标签只显示关键值；太小的段落移到脚注或表格。
- 图例顺序必须与堆叠顺序一致。

## Line / Trend Charts

Use for:

- 多年趋势、季度趋势、预测轨迹。

Rules:

- 一页最多 4 条线。
- 只标注关键拐点和终点，不给每个点贴标签。
- 历史与预测必须用线型或底色区分。
- 年化、累计、单期指标不能混在同一条趋势上。
- 若有结构性口径变化，必须加垂直标记线或脚注。

## Waterfall / Bridge

Use for:

- 利润变化、估值差异、现金流传导、EVA 分解。

Rules:

- 必须有起点、增项、减项、终点。
- 增减项排序按业务逻辑，不按大小机械排序。
- 正项和负项颜色固定，终点用深蓝或黑。
- 小项合并为“其他”，并在脚注说明。

## Scatter / Regression

Use for:

- 估值解释、主体定位、两个指标关系。

Rules:

- 样本少于 5 个不要用回归线。
- 回归线不能被写成因果关系。
- 焦点主体高亮，其他样本用浅灰或浅蓝。
- 轴含义必须清楚，象限解释必须写在图上或旁边。
- 如果 R² 或显著性不足，只能说“相关性较弱/不明显”。

## Heatmap / Matrix

Use for:

- 敏感性分析、风险评分、多维比较。

Rules:

- 色阶不要超过 5 档。
- 基准情景必须高亮。
- 行列变量必须有单位。
- 红绿不要作为唯一信息编码；同时用文字/边框标识。
- 矩阵正文页每格最多 1 个主判断 + 1 个补充短句。

## Insurance Results Specifics

适用于 `rsm-insurance-results`：

- 新准则/旧准则对比必须明确口径可比性。
- 2025 vs 2024 图表必须保证样本一致；样本不一致时在结论条注明。
- 承保、投资、其他损益、所得税等分项不能跨页改变颜色。
- 保险服务收入、保险服务费用、投资收益、综合收益等指标首次出现必须给中文全称和口径说明。
- 如果公司披露口径不一致，不能强行排名；应使用“披露口径存在差异”的注释框。

## Forbidden Chart Situations

禁止：

- 用饼图表达 5 个以上分项。
- 用面积图比较多个主体。
- 用双轴图证明因果。
- 把数值量级差异极大的主体放在同一坐标轴但不解释。
- 把会计口径变化造成的差异写成经营变化。
- 图表没有来源条或口径说明。

## Chart QA Checklist

每张图输出前检查：

- 图表是否只服务一个结论？
- 图表是否回链到 `conclusion_evidence_matrix.json`？
- 单位、期间、样本、来源是否完整？
- 颜色是否与语义一致？
- 标签是否清楚且不重叠？
- 是否存在口径变化或样本变化？
- 图表能否在 contact sheet 中看清主结构？
