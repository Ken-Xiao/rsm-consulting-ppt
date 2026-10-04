# Confirmation Log Standard

用于记录用户在关键 gate 的访谈、确认、修改和未确认风险。所有 PPT 任务都应记录 `CN0_interview` 或等价最小访谈记录；`partner-ready` 及以上项目必须生成或维护 `confirmation_log.json`。

## Core Principle

确认不是聊天记忆，而是可审计 artifact。未来任何构建、返修、push 或客户交付都应能追溯：谁确认了什么，何时确认，确认后锁定了哪些产物。

## Required File

`confirmation_log.json` can live at project root or `artifacts/confirmation_log.json`.

```json
{
  "project_id": "rsm_project_001",
  "tier": "client-ready",
  "nodes": [
    {
      "node": "CN0_interview",
      "status": "interview_complete",
      "requested_at": "2026-05-31T09:50:00+08:00",
      "confirmed_at": "2026-05-31T09:58:00+08:00",
      "user_signal": "给董事会看，正式交付，按保险财务报告风，先看三张样章",
      "changes_applied": [],
      "artifact_versions_locked": ["interaction_locks v1.0", "brief.json v0.1"]
    },
    {
      "node": "CN1_framework",
      "status": "confirmed_with_changes",
      "requested_at": "2026-05-31T10:00:00+08:00",
      "confirmed_at": "2026-05-31T10:15:00+08:00",
      "user_signal": "整体结构可以，第三章改成风险缓释路径",
      "changes_applied": ["module_3 renamed", "page_budget adjusted from 28 to 30"],
      "artifact_versions_locked": ["brief.json v1.1", "framework_confirmation.md v1.0"]
    }
  ]
}
```

## Required Nodes By Tier

| Tier | Required nodes |
|---|---|
| `express` | `CN0_interview` or equivalent minimal interview note |
| `quick-polish` | `CN0_interview` or equivalent scope confirmation note |
| `partner-ready` | `CN0_interview`, `CN1_framework`, `CN2_layout` |
| `client-ready` | `CN0_interview`, `CN1_framework`, `CN2_layout`, `CN3_html_preview` |
| `pipeline` | all nodes plus schema/version lock notes |

## Status Values

- `pending`
- `interview_complete`
- `minimal_interview_complete`
- `confirmed`
- `confirmed_with_changes`
- `assumed_user_requested_direct`
- `preview_unavailable_confirmed`
- `blocked`

## Validation Rules

For `partner-ready`:

- `confirmation_log.json` must exist.
- `CN0_interview` must not be `pending`.
- `CN1_framework` must not be `pending`.
- `CN2_layout` must not be `pending` before build.

For `client-ready`:

- `CN1_framework`, `CN2_layout`, and `CN3_html_preview` must exist.
- `CN0_interview` must exist.
- No required node may be `pending` or `blocked`.
- If any node uses `direct_build_after_minimal_interview` or `assumed_user_requested_direct`, delivery note must disclose the limited-confirmation risk.
