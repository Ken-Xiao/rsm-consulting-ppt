# Agent Behavioral Guardrail

用于约束 Agent 不因“材料看起来完整”或“用户语气像同意”而跳过访谈和确认。所有 PPT 任务档位都应读取本文件，包括 express、quick-polish、targeted-edit、完整生成、整体优化和客户交付项目。

## Non-Negotiable Behavior

### Rule 0: Every PPT Task Starts With Interview

任何 PPT 相关任务的第一步都是访谈。不得因为任务看起来很小、用户说“直接做”、材料已经完整、历史上下文充分，或用户只要求美化/改标题/换颜色，就无交互进入内容、版式或构建。

不得先调用通用 PPT 工具再补访谈。`Presentations`、`pitch-deck`、`deck-refresh`、reference-layout 子 skill、HTML preview、PPTX renderer 都必须排在 `CN0_interview` 之后。

允许降低访谈深度，但不允许跳过访谈：

- `express`、`quick-polish`、`targeted-edit`：先做最小访谈，确认范围、目标、不可改边界和风险接受。
- `partner-ready`、`client-ready`、`pipeline`：先做完整或分阶段访谈，再进入框架确认。
- 用户明确要求“跳过提问直接生成”：仍须先做最小访谈，确认跳过完整访谈的风险接受，并记录为 `direct_build_after_minimal_interview`。

### Rule 1: Wait Means Wait

当 `SKILL.md` 或任何 reference 写明“等待用户确认”时，当前回复必须停在确认请求。

不得在同一回复中继续：

- 逐页正文生成。
- 图表数据或图表样式细节。
- HTML 预览构建。
- PPTX 构建。
- final review 或交付说明。

### Rule 2: Soft Continuation Is Not Confirmation

以下表述不构成确认：

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

正确行为：输出假设、结构或版式方案，并请求用户明确确认。

### Rule 2.5: Scope Must Be Explicit For Quick-Polish

`quick-polish` 只有在用户明确限定少量页面、页码范围或具体元素时才能使用，例如“只改 P3-P5 的标题和配色”。如果用户说“整体优化、整体升级、重新 review、再做一轮、根据材料优化”，必须升档到 `partner-ready` 或 `client-ready` 的问题/框架 gate。

### Rule 3: Direct-Build Override Does Not Skip Interview

用户明确要求跳过确认时，只能跳过完整深度访谈，不能跳过最小访谈：

- `跳过提问，直接生成`
- `不要确认了直接做`
- `我不需要确认环节`
- `skip questions and build`

此时必须：

- 先问最小访谈问题，至少确认范围、目标、不可改边界和风险接受。
- 在 artifact 中记录 `direct_build_after_minimal_interview`。
- 在 `confirmation_log.json` 或等价记录中记录 `CN0_interview`。
- 在交付说明中写明未确认风险。

### Rule 4: Questions Are Deliverables

对所有 PPT 项目，第一轮问题本身就是交付的一部分。不要把提问视为拖延；这是防止返工和误改的质量控制。

## Quick Self-Check

发送回复前问自己：

- 我是不是刚要求用户确认？
- 如果是，我有没有继续输出下一阶段内容？
- 我是否已经完成了 `CN0_interview`？
- 用户是否真的给了确认信号？
- 我是否把“继续优化”误判为“确认框架”？

只要答案有风险，就停在确认请求。
