# Layout Lock Protocol

用于把视觉规则从“建议”升级为“生成期硬约束”。在生成 `preset_map.json`、HTML 预览或 PPTX 前必须读取本文件。

## Core Principle

本 skill 采用 **通用 page family + visual profile design token** 的版式锁定模式：

```text
页面内容逻辑 → universal canonical family → visual profile token set → concrete preset family
```

因此，版式结构可以跨主题复用，但颜色、字体、页眉页脚、模块胶囊、页脚和品牌 chrome 必须来自当前 deck 的 `visual_profile`。参考 deck 只提供 layout grid 和 component spec，不提供默认主题色或语言风格。

每套 visual profile 仍保留推荐 page family 清单，用于稳定交付；但当内容逻辑需要跨主题复用某个结构时，可以通过 `universal-page-family-registry.md` 选择 `canonical_family`，再映射到当前 profile 的可用模板或 `reference_derived` 模式。若找不到合适实现，先停下来输出 `layout_gap`，不要临时发明自由布局。

## Required Artifacts

- `design_system.json`：记录当前 deck 的 canonical visual profile。
- `preset_map.json`：每页必须包含 `visual_profile`、`canonical_family`、`page_family`、`token_set`、`density_level`、`layout_lock_status`。
- `layout_analysis_report.json`：在 build 前对全 deck 版式分配做一次审阅。
- `assets/design-tokens.json`：当前 profile 的颜色、字体、间距、chrome 和密度 token。

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
  "canonical_family": "evidence_exhibit",
  "page_family": "insurance_results_chart_card",
  "token_set": "rsm-insurance-results",
  "layout_lock_status": "locked",
  "layout_lock_reason": "single primary chart plus management takeaway",
  "density_level": "analysis",
  "primary_visual_min_height": 460,
  "supporting_layer_count": 2,
  "allowed_fallback": false,
  "design_token_status": "applied"
}
```

## Selection Rules

1. 先根据 `logic_relationship`、`insight_type`、`evidence_items` 和页面角色，从 `universal-page-family-registry.md` 选择 `canonical_family`。
2. 再根据 `visual_profile` 读取 `assets/design-tokens.json`，锁定 `token_set`，并确认颜色、字体、密度、chrome 不跨 profile 漂移。
3. 最后把 `canonical_family` 映射到当前 `visual_profile` 的推荐 `page_family`。
4. 若当前 profile 没有专属模板，但 reference layout 有合适结构，可用 `reference_derived`，但必须填写 `source_reference_profile`、`source_preview`、`replication_scope`、`best_rsm_profile_match` 和 `adaptation_notes`。
5. 若需要 fallback，必须填写 `allowed_fallback: true` 和 `fallback_reason`。
6. 若 page family 不在推荐清单、fallback 清单或 `reference_derived` 记录不完整，构建前必须失败。

## Token Consistency Rules

- 同一 deck 只能有一个主 `token_set`；章节页或封面可使用同 profile 的深浅变体，但不能切到另一套 profile 颜色。
- 页面从英文参考版式迁移时，只继承布局结构，不继承英文 deck 的主色、字体、logo、页脚和标题语气。
- `design_token_status` 只能取 `applied`、`missing`、`mixed_profile_risk`。
- `mixed_profile_risk` 只能出现在 `layout_analysis_report.json` 的待修正状态，不得进入批量 build。

## Failure Handling

| Failure | Action |
|---|---|
| `page_family_not_allowed` | 改用白名单 page family，或请求用户确认新增版式 |
| `missing_layout_lock_status` | 停止 build，补全 preset map |
| `unknown_visual_profile` | 回到 visual profile selection |
| `missing_canonical_family` | 回到 `universal-page-family-registry.md` 重新选择页面原型 |
| `mixed_profile_risk` | 回到 design token 注入，不允许继续 build |
| `layout_gap` | 输出缺口说明，不临时发明自由布局 |

## Why This Matters

版式锁定的目标不是减少表达能力，而是避免 AI 在生成阶段临时创造不稳定页面。咨询 PPT 的专业感来自少量高质量版式的稳定复用，而不是每页重新设计。
