# Confirmation State Machine

用于把“先确认再生成”从自然语言要求变成可执行状态机。完整生成、整体优化、`partner-ready`、`client-ready` 和 `pipeline` 项目必须读取本文件。

## Core Principle

只要流程进入确认节点，Agent 的下一步只能是等待用户确认、记录用户修改，或返回上一阶段修正。不得在同一回复中一边请求确认，一边继续展开后续页面、图表或 PPTX 构建。

## Confirmation Signals

明确确认信号包括：

- 中文：`确认`、`可以`、`没问题`、`同意`、`通过`、`继续`、`按这个走`、`可以往下做`
- 英文：`OK`、`ok`、`proceed`、`approved`、`yes`、`go ahead`
- 带修改确认：`整体可以，但...`、`可以，第三章改成...`、`同意这个框架，补充...`

不构成确认的表述：

- `按现有材料处理`
- `帮我优化`
- `整体升级`
- `继续做一版`
- `先出一版看看`
- `你看着办`

这些表述只说明用户想继续推进任务，不等于确认某个具体 gate。

明确跳过确认的强指令：

- `跳过提问，直接生成`
- `不要确认了直接做`
- `我不需要确认环节`
- `skip questions and build`
- `build directly without confirmation`

出现强指令时，记录 `assumed_user_requested_direct` 和未确认风险。

## State Nodes

| Node | Input artifact | Required output | Confirmed status |
|---|---|---|---|
| `CN1_framework` | `brief.json` + `source_digest.md` or equivalent material readout | `framework_confirmation.md` | `confirmed` / `confirmed_with_changes` / `assumed_user_requested_direct` |
| `CN2_layout` | `storyline_map.json` + `preset_map.json` + `layout_analysis_report.json` | user confirmation of page family, density and fallback | `confirmed` / `confirmed_with_changes` / `assumed_user_requested_direct` |
| `CN3_html_preview` | `html_preview_report.json` + key page screenshots or preview plan | user confirmation of key-page visual direction | `confirmed` / `preview_unavailable_confirmed` / `assumed_user_requested_direct` |

## State Transitions

```text
pending_user_answers
  -> pending_framework_confirmation
  -> confirmed / confirmed_with_changes
  -> pending_layout_confirmation
  -> confirmed / confirmed_with_changes
  -> pending_html_preview_confirmation
  -> confirmed / preview_unavailable_confirmed
  -> build_allowed
```

Invalid transitions:

- `pending_framework_confirmation -> preset_map.json`
- `pending_layout_confirmation -> draft_deck.pptx`
- `pending_html_preview_confirmation -> client-ready delivery`

## Agent Reply Rule

When a node is pending, the agent reply must:

1. Summarize the artifact to be confirmed.
2. Ask the user to confirm or modify.
3. End with the confirmation request.
4. Not include later-stage outputs.

Bad:

```text
请确认这个框架。下面我先生成 P01-P20...
```

Good:

```text
请确认：核心问题、章节结构和页数预算是否可以按这个版本进入逐页故事线？
```

## Artifact Status Rules

Each confirmation artifact must include:

```json
{
  "confirmation_node": "CN1_framework",
  "status": "pending_framework_confirmation",
  "requested_at": "2026-05-31T10:00:00+08:00",
  "user_signal": null,
  "next_allowed_stage": "wait_for_user_confirmation"
}
```

Only after user confirmation can `next_allowed_stage` advance.

