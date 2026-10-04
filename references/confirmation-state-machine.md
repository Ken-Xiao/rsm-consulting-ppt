# Confirmation State Machine

用于把“先访谈、再确认、再生成”从自然语言要求变成可执行状态机。所有 PPT 任务都必须读取本文件，完整生成、整体优化、`partner-ready`、`client-ready` 和 `pipeline` 项目还必须维护可审计确认记录。

## Core Principle

只要流程进入访谈或确认节点，Agent 的下一步只能是等待用户回答/确认、记录用户修改，或返回上一阶段修正。不得在同一回复中一边请求回答/确认，一边继续展开后续页面、图表或 PPTX 构建。

## Confirmation Signals

明确确认信号包括：

- 中文：`确认这个框架`、`确认这个版式`、`确认这些预览`、`可以按这个框架走`、`没问题，按这个结构往下做`、`同意这个方案`、`通过这个版本`、`按这个走`
- 英文：`OK`、`ok`、`proceed`、`approved`、`yes`、`go ahead`
- 带修改确认：`整体可以，但...`、`可以，第三章改成...`、`同意这个框架，补充...`

单独的 `继续`、`可以`、`ok` 只有在上一条 agent 回复明确停在某个具体确认节点，且用户上下文可唯一指向该节点时，才可视为确认。若上下文中同时存在多个待确认事项，或用户只是说“继续做一版/继续优化/继续吧”，不得视为确认。

不构成确认的表述：

- `按现有材料处理`
- `帮我优化`
- `整体升级`
- `继续做一版`
- `继续优化`
- `继续吧`
- `可以再做一轮`
- `先出一版看看`
- `你看着办`
- `按你的判断来`

这些表述只说明用户想继续推进任务，不等于确认某个具体 gate。

明确要求跳过完整确认的强指令：

- `跳过提问，直接生成`
- `不要确认了直接做`
- `我不需要确认环节`
- `skip questions and build`
- `build directly without confirmation`

出现强指令时，仍必须先完成最小访谈，并记录 `direct_build_after_minimal_interview` 和未确认风险。

## State Nodes

| Node | Input artifact | Required output | Confirmed status |
|---|---|---|---|
| `CN0_interview` | user request + available material/file names | answered interview questions + `interaction_locks` or minimal scope/risk record | `interview_complete` / `minimal_interview_complete` |
| `CN1_framework` | `brief.json` + `source_digest.md` or equivalent material readout | `framework_confirmation.md` | `confirmed` / `confirmed_with_changes` / `direct_build_after_minimal_interview` |
| `CN2_layout` | `storyline_map.json` + `preset_map.json` + `layout_analysis_report.json` | user confirmation of page family, density and fallback | `confirmed` / `confirmed_with_changes` / `direct_build_after_minimal_interview` |
| `CN3_html_preview` | `html_preview_report.json` + key page screenshots or preview plan | user confirmation of key-page visual direction | `confirmed` / `preview_unavailable_confirmed` / `direct_build_after_minimal_interview` |

## State Transitions

```text
pending_user_answers
  -> interview_complete / minimal_interview_complete
  -> pending_framework_confirmation
  -> confirmed / confirmed_with_changes
  -> pending_layout_confirmation
  -> confirmed / confirmed_with_changes
  -> pending_html_preview_confirmation
  -> confirmed / preview_unavailable_confirmed
  -> build_allowed
```

Invalid transitions:

- `pending_user_answers -> outline.json`
- `pending_user_answers -> html_preview_report.json`
- `pending_user_answers -> draft_deck.pptx`
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
  "confirmation_node": "CN0_interview",
  "status": "pending_user_answers",
  "requested_at": "2026-05-31T10:00:00+08:00",
  "user_signal": null,
  "next_allowed_stage": "wait_for_user_answers"
}
```

Only after user confirmation can `next_allowed_stage` advance.
