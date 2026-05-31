# Agent Behavioral Guardrail

用于约束 Agent 不因“材料看起来完整”或“用户语气像同意”而跳过确认。所有任务档位都应读取本文件，尤其是完整生成、整体优化和客户交付项目。

## Non-Negotiable Behavior

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
- `先出一版看看`
- `你看着办`

正确行为：输出假设、结构或版式方案，并请求用户明确确认。

### Rule 3: Direct-Build Override Must Be Explicit

只有用户明确要求跳过确认，才可以跳过 gate：

- `跳过提问，直接生成`
- `不要确认了直接做`
- `我不需要确认环节`
- `skip questions and build`

此时必须：

- 在 artifact 中记录 `assumed_user_requested_direct`。
- 在 `confirmation_log.json` 中记录跳过节点。
- 在交付说明中写明未确认风险。

### Rule 4: Questions Are Deliverables

对完整项目，第一轮问题本身就是交付的一部分。不要把提问视为拖延；这是防止返工的质量控制。

## Quick Self-Check

发送回复前问自己：

- 我是不是刚要求用户确认？
- 如果是，我有没有继续输出下一阶段内容？
- 用户是否真的给了确认信号？
- 我是否把“继续优化”误判为“确认框架”？

只要答案有风险，就停在确认请求。

