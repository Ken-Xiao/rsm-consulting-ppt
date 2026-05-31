# Confirmation Log Standard

用于记录用户在关键 gate 的确认、修改和跳过确认风险。`partner-ready` 及以上项目必须生成或维护 `confirmation_log.json`。

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
| `express` | optional, only if user confirms direction |
| `quick-polish` | optional, record scope confirmation if available |
| `partner-ready` | `CN1_framework`, `CN2_layout` |
| `client-ready` | `CN1_framework`, `CN2_layout`, `CN3_html_preview` |
| `pipeline` | all nodes plus schema/version lock notes |

## Status Values

- `pending`
- `confirmed`
- `confirmed_with_changes`
- `assumed_user_requested_direct`
- `preview_unavailable_confirmed`
- `blocked`

## Validation Rules

For `partner-ready`:

- `confirmation_log.json` must exist.
- `CN1_framework` must not be `pending`.
- `CN2_layout` must not be `pending` before build.

For `client-ready`:

- `CN1_framework`, `CN2_layout`, and `CN3_html_preview` must exist.
- No required node may be `pending` or `blocked`.
- If any node is `assumed_user_requested_direct`, delivery note must disclose the skipped confirmation risk.

