# Editable Component Standard

用于把呈现从“看起来像 PPT”提升为“客户可维护的专业 PPT”。构建 PPTX、HTML 渲染主体区或做可编辑性检查时读取本文件，并与 `editability-check.md` 同时使用。

## Layering Principle

正式交付 PPT 应分三层：

1. **Native editable layer**：客户最可能修改的内容。
2. **Rendered evidence layer**：复杂图表、矩阵、热力图等可图片化，但必须保留数据源。
3. **Reference metadata layer**：来源、口径、页码、lineage、版权和生成说明。

不要为了视觉稳定把整页压成图片。除非用户只要视觉预览，否则关键文字和数字必须可编辑。

## Must Be Editable

以下对象必须优先使用 PPT 原生文本、形状、表格或可编辑 chart：

- `claim_title`
- `story_subtitle`
- `takeaway_text`
- `recommended_action`
- `source_note`
- `page_number`
- `logo` 或机构文字
- 执行摘要结论
- 行动计划中的 owner、timeline、metric
- 方案比较中的推荐标签和推荐理由
- 所有客户可能会改的关键数字

## May Be Rasterized

以下对象可以用 HTML/Playwright、ECharts、SVG 或图片化主体区：

- 高密度司法辖区矩阵。
- 敏感性热力图。
- 雷达图、复杂瀑布图、复杂散点标注。
- 复杂 KPI 卡组。
- 章节页背景图、封面图和装饰纹理。
- 不作为事实证据的案例氛围图。

条件：

- 必须保留 `chart_data/Pxx.json` 或等价源数据。
- 必须记录 `render_strategy`。
- 必须说明哪些元素不可编辑。
- 来源、页码、标题不要并入图片主体。

## Component Contracts

### Chart Card

Required editable:

- 标题、副标题、来源、页码、结论条。

Rendered allowed:

- 主图、复杂标签、图内 callout。

Data requirement:

- `chart_point_of_view`
- `unit`
- `period`
- `sample`
- `source`
- `lineage_ids`

### Matrix

Required editable:

- 页面标题、矩阵读法、来源、页码。

Rendered allowed:

- 矩阵主体。

QA:

- 每格 1 个主判断 + 1 个补充短句。
- 颜色语义稳定。
- 打印后可读。

### Action Plan

Required editable:

- 所有行动、责任主体、时间、输入、输出、指标。

Rendered allowed:

- 背景线条、阶段条、图标。

Fail if:

- 表格整张不可编辑且没有源文件。

### Cover / Section

Required editable:

- 标题、章节名、章节编号、日期、团队、版权。

Rendered allowed:

- 背景图片、建筑照片、装饰纹理。

Fail if:

- 章节页塞入正文 bullet。

## Editable QA Output

在 `review_report.json` 增加：

```json
{
  "editable_component_review": {
    "status": "pass",
    "native_required_elements": "pass",
    "rasterized_elements_have_sources": "pass",
    "client_edit_risk": "low",
    "issues": [
      {
        "page": "P14",
        "issue": "行动计划表格被整体图片化",
        "fix": "改为原生表格，保留图标和背景为形状"
      }
    ]
  }
}
```

## Delivery Rule

如果关键文字、建议、来源或行动计划不可编辑，且没有源文件，不得标记为 `client-ready`。
