# Layout Analysis Report

用于在正式 PPTX 构建前，向用户和 agent 展示整份 deck 的版式分配、密度风险和页面证明对象。它是交互反馈节点，不是事后 QA。

## When To Use

必须使用：

- `create`、整体 `optimize`、`partner-ready`、`client-ready`、`pipeline` 项目。
- 任何需要生成 `preset_map.json` 的项目。
- 用户反馈“版面空/密”“需要先看结构和版式”的项目。

可以跳过：

- `quick-polish` 或 `targeted-edit`，且没有重排版式。

## Position In Workflow

```text
insight_layout_map.json
  -> content_density_report.json
  -> storyline_map.json
  -> preset_map.json
  -> layout_analysis_report.json
  -> user confirms layout direction
  -> HTML preview / PPTX build
```

如果没有 `layout_analysis_report.json`，不得进入正式 PPTX build。

## Report Schema

```json
{
  "deck_id": "rsm_project",
  "visual_profile": "rsm-insurance-results",
  "status": "pending_user_confirmation",
  "summary": {
    "page_count": 24,
    "profile_allowed_pages": 24,
    "layout_gaps": 0,
    "content_thin_pages": 2,
    "content_heavy_pages": 1,
    "repeated_family_warnings": 0
  },
  "reference_layout_choice": {
    "primary_visual_profile": "rsm-insurance-results",
    "backup_layouts": ["consulting-final-deck"],
    "selection_reason": "客户正式交付以 RSM 保险财务报告风为主，最终建议和路线图借用 tier-1 final deck 结构",
    "pages_using_reference": [
      {
        "page_id": "P18",
        "reference_profile": "consulting-final-deck",
        "reference_page_family": "implementation_roadmap",
        "canonical_family": "action_roadmap",
        "token_set": "rsm-insurance-results",
        "source_preview": "assets/reference-layouts/consulting-final-deck/previews/18-18-implementation-roadmap.png",
        "replication_scope": ["body_grid", "roadmap_structure", "owner_milestone_table"],
        "best_rsm_profile_match": "rsm-insurance-results",
        "adaptation_notes": "只复用路线图结构，颜色、标题层级、页脚和模块胶囊使用 rsm-insurance-results token"
      }
    ]
  },
  "pages": [
    {
      "page_id": "P05",
      "claim_title": "利润改善主要来自投资端，承保端仍需单独验证",
      "canonical_family": "bridge_waterfall",
      "page_family": "stacked_contribution_split",
      "visual_profile": "rsm-insurance-results",
      "token_set": "rsm-insurance-results",
      "design_token_status": "applied",
      "layout_lock_status": "locked",
      "insight_type": "contribution_split",
      "evidence_items_count": 4,
      "content_density_status": "balanced",
      "title_fit_status": "pass",
      "density_level": "analysis",
      "fullness_risk": "low",
      "primary_visual": "stacked contribution chart",
      "primary_visual_min_height": 480,
      "supporting_layer": ["takeaway_bar", "metric_strip"],
      "layout_reason": "构成拆分需要用堆叠图呈现贡献结构，并用指标条补足读法"
    }
  ],
  "user_confirmation_prompt": "请确认版式分配、密度风险和关键页型是否符合预期。确认后再进入 HTML 预览或 PPTX 构建。"
}
```

## Density Rules

| Evidence count | Default status | Required action |
|---|---|---|
| 0 | `content_empty` | 不得生成正文页；补证据或删除 |
| 1 | `content_thin` | 增加 benchmark、metric strip、callout 或合并页面 |
| 2-4 | `balanced` | 可进入 build |
| 5-6 | `content_heavy` | 考虑拆页、分组或转附录 |
| >6 | `overloaded` | 必须拆页或重构 |

## Fullness Risk Rules

`fullness_risk` 必须为：

- `low`：主证据对象充分，辅助层完整。
- `medium`：证据足够但可能需要指标 strip 或 callout。
- `high`：页面可能显空或显密，必须先调整。

高风险页面不得进入批量构建，除非用户明确确认。

## User-Facing Summary

给用户看的摘要应为中文，格式类似：

```text
我先不进入正式构建。当前版式分配如下：

- 共 24 页，默认使用 rsm-insurance-results。
- 18 页已锁定到核心白名单版式，3 页使用 fallback，3 页需要确认。
- P07、P12 存在 content_thin 风险，建议补充指标 strip 或合并。
- P18 存在 content_heavy 风险，建议拆成两页。

请确认：这些版式分配和密度调整方向是否可以进入 HTML 预览？
```

## Build Gate

进入 PPTX build 前必须满足：

- `status` 为 `confirmed` 或 `assumed_user_requested_direct`。
- 无 `layout_gaps`。
- 无 `fullness_risk=high`，除非用户明确确认。
- 所有 `page_family` 通过 `layout-lock-protocol.md`。
- 所有正文页已从 `insight_layout_map.json` 继承 `insight_type` 和 `layout_reason`。
- 所有正文页已从 `content_density_report.json` 继承 `content_density_status`。
- 所有正文页 `title_fit_status` 不是 `rewrite_required`。
- 如使用外部参考版式，必须有 `reference_layout_choice`，且每个引用页有 `source_preview`、`replication_scope` 和 `best_rsm_profile_match`。
