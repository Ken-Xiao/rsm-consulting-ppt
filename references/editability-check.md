# Editability Check

用于确保最终 PPTX 可被团队、客户或合伙人继续修改。完整项目和客户可交付 PPTX 必须执行。

## Principle

专业咨询 PPT 不只是展示文件，也是一份可迭代工作底稿。除非用户明确只要定稿图片，否则关键内容必须可编辑。

## Must Be Editable

以下对象必须保持 PPT 原生可编辑：

- 主标题、副标题。
- 页码、来源、脚注、版权。
- 结论条、callout、管理含义。
- 关键数字和单位。
- 表格文字。
- 流程节点和箭头标签。
- 案例文字、政策依据、建议。
- 图例和图表注释。

## Can Be Rasterized

以下对象可图片化，但必须保留源数据或源文件：

- 复杂 ECharts/D3 图表。
- 热力矩阵。
- 雷达图。
- 复杂瀑布图。
- 背景照片和纹理。
- 高密度但不需要客户编辑的主体图。

## Required Source Files

图片化对象必须有对应源文件：

| Object | Required source |
|---|---|
| 图片化图表 | `chart_data/Pxx.json` + renderer config |
| HTML 主体区 | `draft_pages/Pxx.html` or layout source |
| 背景图片 | asset path / source note |
| SVG 图 | source SVG or generation script |

## Editability Metadata

在 `preset_map.json` 中记录：

```json
{
  "page_id": "P05",
  "editable_elements": ["title", "subtitle", "takeaway", "source", "page_number", "legend"],
  "rasterized_elements": ["main_chart"],
  "source_files": ["chart_data/P05.json", "draft_pages/P05.html"],
  "editability_risk": "low"
}
```

## QA Checks

- 是否存在整页截图。
- 标题和来源是否可编辑。
- 图片化图表是否有 `chart_data/Pxx.json`。
- 表格是否因为图片化导致无法改数。
- 客户最可能修改的文字是否可编辑。
- 页面修改后是否不会破坏母版页脚和页码。

## Output

在 `review_report.json` 增加：

```json
{
  "editability_check": {
    "status": "pass",
    "pages_with_full_page_images": [],
    "rasterized_elements_without_source": [],
    "warnings": [
      {
        "page": "P12",
        "issue": "主图图片化，需保留 chart_data/P12.json",
        "fix": "已保留源数据"
      }
    ]
  }
}
```
