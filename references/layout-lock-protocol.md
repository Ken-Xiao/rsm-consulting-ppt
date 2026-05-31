# Layout Lock Protocol

用于把视觉规则从“建议”升级为“生成期硬约束”。在生成 `preset_map.json`、HTML 预览或 PPTX 前必须读取本文件。

## Core Principle

每套 visual profile 都必须有允许使用的 page family 白名单。生成页面时只能从白名单里选择版式；如果内容找不到合适版式，先停下来输出 `layout_gap`，不要临时发明自由布局。

## Required Artifacts

- `design_system.json`：记录当前 deck 的 canonical visual profile。
- `preset_map.json`：每页必须包含 `visual_profile`、`page_family`、`density_level`、`layout_lock_status`。
- `layout_analysis_report.json`：在 build 前对全 deck 版式分配做一次审阅。

## Profile Whitelists

### `rsm-insurance-results`

默认用于保险财务结果、金融机构业绩盘点、管理层财务分析。允许 page family：

- `insurance_cover`
- `insurance_agenda`
- `insurance_section_divider`
- `insurance_results_chart_card`
- `chart_plus_insight_panel`
- `executive_summary_grid`
- `paired_period_comparison`
- `stacked_contribution_split`
- `management_action_plan`

Fallback only:

- `comparison_table`
- `option_comparison`

### `rsm-practice-sharing`

默认用于不良处置、培训分享、案例复盘。允许 page family：

- `practice_cover`
- `practice_agenda`
- `practice_section_divider`
- `case_evidence_panel`
- `three_recommendation_cards`
- `management_action_plan`

Fallback only:

- `comparison_table`

### `rsm-global-policy`

默认用于跨司法辖区、制度比较、政策研究。允许 page family：

- `global_policy_cover`
- `global_policy_agenda`
- `global_policy_dark_summary`
- `policy_framework_cards`
- `policy_philosophy_map`
- `jurisdiction_matrix`
- `comparison_table`
- `option_comparison`

Fallback only:

- `comparison_table`
- `option_comparison`

### `sunong-value-creation`

默认用于苏农、银行 VQA、价值创造、董事会经营诊断。允许 page family：

- `sunong_dark_cover`
- `kpi_dashboard`
- `module_summary`
- `sunong_chart_diagnostic`
- `comparison_table`
- `management_action_plan`

Fallback only:

- `comparison_table`
- `management_action_plan`

## `preset_map.json` Requirements

Each page:

```json
{
  "page_id": "P08",
  "visual_profile": "rsm-insurance-results",
  "page_family": "insurance_results_chart_card",
  "layout_lock_status": "locked",
  "layout_lock_reason": "single primary chart plus management takeaway",
  "density_level": "analysis",
  "primary_visual_min_height": 460,
  "supporting_layer_count": 2,
  "allowed_fallback": false
}
```

## Selection Rules

1. 先根据 `visual_profile` 读取白名单。
2. 再根据 `logic_relationship`、`insight_type` 和 `evidence_items` 选择 page family。
3. 若需要 fallback，必须填写 `allowed_fallback: true` 和 `fallback_reason`。
4. 若 page family 不在白名单或 fallback 清单内，构建前必须失败。

## Failure Handling

| Failure | Action |
|---|---|
| `page_family_not_allowed` | 改用白名单 page family，或请求用户确认新增版式 |
| `missing_layout_lock_status` | 停止 build，补全 preset map |
| `unknown_visual_profile` | 回到 visual profile selection |
| `layout_gap` | 输出缺口说明，不临时发明自由布局 |

## Why This Matters

版式锁定的目标不是减少表达能力，而是避免 AI 在生成阶段临时创造不稳定页面。咨询 PPT 的专业感来自少量高质量版式的稳定复用，而不是每页重新设计。
