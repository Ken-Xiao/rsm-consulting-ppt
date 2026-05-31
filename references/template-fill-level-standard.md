# Template Fill Level Standard

用于把 HTML 模板从“骨架级”升级为“填充级”。生成或修改 `assets/layouts/*.html`、`template-manifest.json`、HTML preview 或 PPTX 主体区时必须读取本文件。

## Core Principle

模板不能只提供页眉、页脚和一个 placeholder。高频 page family 必须明确主图、洞察卡、指标 strip、注释卡和来源条的内部排布，让 Agent 填内容而不是重新设计页面。

## Fill-Level Definition

| Level | Meaning | Allowed use |
|---|---|---|
| `skeleton` | 只有 chrome、标题、页脚和大 placeholder | 仅用于实验或低频页面 |
| `structured` | 主体区有固定栅格、主证据区、辅助层和来源区 | `partner-ready` minimum |
| `filled` | 主图、洞察卡、metric strip、callout、legend、note 都有明确槽位 | `client-ready` required for high-frequency families |

## High-Frequency Families Requiring Filled Templates

- `insurance_results_chart_card`
- `chart_plus_insight_panel`
- `paired_period_comparison`
- `stacked_contribution_split`
- `financial_metric_grid`
- `executive_takeaways`
- `management_action_plan`
- `practice_section_divider`
- `case_evidence_panel`

## Required Template Slots

正文分析页至少包含：

- `claim_title`
- `story_subtitle`
- `takeaway_bar`
- `primary_evidence_area`
- `supporting_layer`
- `metric_strip` or `insight_cards`
- `source_note`
- `page_number`

图表卡页还必须包含：

- `chart_title`
- `chart_body`
- `chart_readout`
- `legend_area`
- `annotation_slots`

## Manifest Fields

`template-manifest.json` 的高频模板建议补充：

```json
{
  "fill_level": "filled",
  "body_grid": "12-column / chart 8 + insights 4",
  "minimum_supporting_slots": 3,
  "placeholder_policy": "no visible placeholder text in client-ready output"
}
```

## QA Rules

- `client-ready` 不得出现可见 placeholder，如 `主图区域`、`chart_placeholder`、`待补充`。
- 高频页面若 `fill_level=skeleton`，必须在 layout analysis 中标记为 `template_gap`。
- 如果数据不足以填满模板，先触发 `content-density-precheck.md`，不要删掉模板辅助层。

