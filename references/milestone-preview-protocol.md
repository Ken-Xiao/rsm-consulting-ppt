# Milestone Preview Protocol

用于长 deck、客户正式交付、董事会深度分析和合伙人审稿场景。目标是在完整构建前设置阶段性预览，避免做完几十页后才发现方向偏了。

## Core Principle

复杂 deck 不应一次性从 outline 直接生成 final。每个关键里程碑只审查“方向是否正确”和“证据是否足以继续”，不做琐碎美化。

## Standard Milestones

### MP1: Opening Direction Preview

适用范围：封面、目录、执行摘要、方法论或前 5-7 页。

审查问题：

- 核心问题是否定义准确？
- 总答案假设是否过强或过弱？
- 默认中文语言和视觉风格是否符合客户场景？
- 摘要是否回答客户问题，而不是复述目录？

若不通过：回到 `framework_confirmation` 或 `brief`，不要继续生成后续章节。

### MP2: First Diagnostic Module Preview

适用范围：第一个核心诊断章节及其小结。

审查问题：

- 对标样本或证据样本是否合理？
- 核心发现是否由数据支撑？
- 章节小结是否能自然引出下一章？
- 页面密度和图表形式是否符合模板风格？

若不通过：只回退该章节和其前后桥接页。

### MP3: Synthesis And Action Preview

适用范围：矛盾提炼、行动地图、压力情景和关键建议页。

审查问题：

- 三大矛盾是否来自前文证据？
- 行动项是否回链矛盾和根因？
- 压力情景是否与执行摘要 KPI 对齐？
- 建议是否具备责任、时间、指标和触发条件？

若不通过：回退综合章节和行动章节，不重写事实页。

## Preview Output

每个 milestone 输出：

```json
{
  "milestone": "MP1",
  "pages_reviewed": ["P01", "P02", "P03", "P04", "P05"],
  "decision": "pass / revise / stop",
  "issues": [
    {
      "severity": "major",
      "issue": "执行摘要尚未回答客户问题",
      "fix_scope": "P04-P05"
    }
  ],
  "next_step": "continue_to_next_module"
}
```

## Rules

- milestone 通过后，可对该范围启用 `phase_lock`。
- milestone 修订只影响覆盖范围和直接相邻桥接页。
- 若用户要求快速出稿，可合并 milestone，但交付说明中必须标记未做完整预览。
