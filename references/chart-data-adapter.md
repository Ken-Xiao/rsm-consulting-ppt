# Chart Data Adapter

用于把 `data_pool.json` 标准化为每种图表可直接渲染的输入。渲染前必须先适配数据，不要在图表代码里临时拼字段。

## Inputs

- `data_pool.json`
- `outline.json`
- `design_system.json`

## Output

每页生成一个 `chart_data/Pxx.json`：

```json
{
  "page_id": "P15",
  "chart_type": "ranking_bar",
  "source_keys": ["roa_2025"],
  "data": {}
}
```

## Standard Interfaces

### ranking_bar

Input spec:

```json
{
  "indicator_key": "roa",
  "entities": ["A", "B"],
  "highlight_entity": "A",
  "show_median": true
}
```

Output:

```json
{
  "items": [
    {"name": "A", "value": 0.92, "rank": 3, "is_highlight": true}
  ],
  "median_value": 0.86,
  "unit": "%"
}
```

### trend_line

```json
{
  "years": [2020, 2021, 2022],
  "series": [
    {"name": "主体", "values": [0.75, 0.82, 0.92], "is_highlight": true}
  ],
  "unit": "%",
  "annotations": [{"year": 2022, "label": "拐点"}]
}
```

### scatter_regression

```json
{
  "points": [
    {"name": "A", "x": 0.92, "y": 0.62, "is_highlight": true}
  ],
  "x_label": "ROA",
  "y_label": "PB",
  "regression": {"slope": 0.8, "intercept": 0.1, "r_squared": 0.42}
}
```

### radar

```json
{
  "dimensions": ["盈利", "资本", "资产质量"],
  "entity_values": [78, 65, 82],
  "benchmark_values": [70, 70, 70],
  "scale": [0, 100]
}
```

### bridge_waterfall

```json
{
  "steps": [
    {"label": "起点", "value": 100, "type": "total"},
    {"label": "增项", "value": 20, "type": "increase"},
    {"label": "减项", "value": -15, "type": "decrease"},
    {"label": "终点", "value": 105, "type": "total"}
  ],
  "unit": "亿元"
}
```

### sensitivity_matrix

```json
{
  "row_labels": ["低", "中", "高"],
  "col_labels": ["低", "中", "高"],
  "values": [[6.1, 7.2, 8.4]],
  "unit": "%",
  "base_case": {"row": 1, "col": 1}
}
```

## Validation

- 每个 `source_key` 必须存在。
- 单位必须写入输出。
- 排名方向必须从指标注册表读取。
- 缺失值不渲染为 0；要标为 `null` 并提示。
- 同一图表内的实体、年份、维度顺序必须稳定。
