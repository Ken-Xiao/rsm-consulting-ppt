# Final Review Checklist

用于每次完成 PPT 草稿后的最终审阅、问题定位和返修。适用于客户正式交付、董事会/投委会/管理层汇报、重要内部评审材料。

## Review Protocol

草稿完成后必须执行：

```text
Draft deck
  -> Partner Review
  -> Client Review
  -> Issue log
  -> Fix plan
  -> Revision
  -> Re-review
  -> Delivery decision
```

不要直接把初稿标记为完成。每轮审查必须输出 `final_review_report.json` 或等价文字记录。

## Severity

| Severity | Meaning | Required action |
|---|---|---|
| `critical` | 会导致误导、无法交付或客户返工 | 必须修复后重审 |
| `major` | 明显降低专业度或说服力 | 应修复后再给客户 |
| `minor` | 不影响理解，但影响精致度 | 可在交付前批量修 |
| `suggestion` | 风格或偏好优化 | 视时间处理 |

出现任一 `critical`，不得标记为 `client-ready`。

## Partner Review Checklist

合伙人视角关注：判断是否有价值、证据是否站得住、结构是否能支撑客户决策、风险是否可控。

### 1. Content

- 客户问题是否是可决策问题，而不是主题描述。
- 执行摘要是否直接回答客户问题。
- 每个章节是否有一句明确 `chapter_answer`。
- 每页标题是否是可证明的判断。
- 是否存在事实堆砌但没有管理含义的页面。
- 是否存在强结论但证据不足的页面。
- 是否存在摘要页引入正文未证明的新结论。
- 是否有口径、样本、期间、限制和不可比因素说明。
- 建议是否回链到前文证据、风险或机会。
- 若有方案/路径，是否比较可选路径、推荐路径和不行动后果。

### 2. Logic

- 主标题连读是否形成完整故事线。
- 章节之间是否有递进关系，而不是资料并列。
- 每页是否只承担一个逻辑任务。
- 页面之间是否存在跳跃，是否需要桥接页。
- 诊断、证据、含义、行动是否闭环。
- 是否存在重复页面或可以合并的弱页面。
- 是否有替代解释或反事实检查，避免过度归因。
- 行动计划是否与诊断问题一一对应。

### 3. Evidence And Data

- 关键数字是否能追溯到原始材料、`data_pool.json`、`chart_data/` 或 `lineage_map.json`。
- 同一指标跨页是否一致。
- 排名、同比、环比、bp、百分点、倍数是否计算正确。
- 图表口径和标题判断是否一致。
- 外部事实是否有来源和日期。
- 情景测算是否标明假设，不写成事实。
- 异常值是否被解释或标记待确认。

### 4. Presentation

- 每页是否像成熟咨询 exhibit，而不是标题加图表。
- 核心正文页是否有 `exhibit_structure`：scope、主证据、标注、辅助读法、来源边界。
- 页面是否具备主结论层、主证据层、辅助证据层。
- 主图是否有观点、基准、焦点和图内读法。
- 页面有效内容占用是否在合理区间，是否显得空或挤。
- contact sheet 下是否能看出章节节奏。
- 是否通过 thumbnail test、print test、partner flip test。

### 5. Language

- 标题是否专业、简洁、可证明。
- 判断强度是否匹配证据强度。
- 是否存在“显著、核心、必须、严重”等过强措辞但证据不足。
- 是否存在“持续优化、建议关注、进一步加强”等不可执行表达。
- 建议是否包含动作、对象、指标、阈值、时间或责任边界。
- 法律、财务、估值、合规判断是否写清前提。

## Client Review Checklist

客户视角关注：是否能读懂、是否可信、是否能拿去汇报、是否知道下一步怎么做。

### 1. Content

- 客户只读执行摘要，是否知道本报告回答什么问题。
- 客户是否能理解推荐路径和主要理由。
- 客户是否知道哪些结论是事实、哪些是推断、哪些是情景假设。
- 客户是否能看出本报告对其决策有什么影响。
- 客户是否能找到样本、口径和数据来源。
- 客户是否会质疑“为什么没有比较其他方案”。

### 2. Logic

- 客户快速读标题，是否能理解完整故事线。
- 每章开头是否知道本章要回答什么。
- 每章结尾是否知道本章结论如何引出下一章。
- 建议页是否能解释“为什么是这条路径”。
- 行动计划是否能被客户转成内部任务。

### 3. Presentation

- 客户快速翻页，是否感觉是完整成稿。
- 封面、目录、章节页、正文页、附录页是否像同一套模板。
- 每页第一眼是否看到标题和主证据。
- 图表是否不听讲解也能读懂。
- 是否存在字体太小、图表太密、页面太空、对齐不稳。
- 打印或 PDF 阅读时是否仍然可读。
- 客户是否能在 PPT 中修改关键文字、数字和建议。

### 4. Language

- 客户是否能把核心结论复制进会议纪要。
- 建议是否避免空话，能转成会议行动项。
- 敏感表述是否稳健，不会引发不必要争议。
- 术语和缩写是否已解释。
- 语气是否专业、中立、不过度销售化。

## Fix Plan

审查后必须输出修正计划：

```json
{
  "final_review": {
    "status_before_fix": "partner-ready",
    "partner_review": {
      "content": "pass",
      "logic": "major",
      "evidence": "pass",
      "presentation": "major",
      "language": "minor"
    },
    "client_review": {
      "content": "pass",
      "logic": "pass",
      "presentation": "major",
      "language": "pass"
    },
    "issues": [
      {
        "page": "P08",
        "severity": "major",
        "angle": "presentation",
        "reviewer_view": "partner",
        "issue": "页面只有小图和结论条，缺少辅助读法",
        "fix": "改为主图 + 右侧 3 张洞察卡，并补图内基准线"
      }
    ],
    "fix_order": ["critical", "major", "minor"],
    "status_after_fix_target": "client-ready"
  }
}
```

## Delivery Decision

修正后再次审查：

- 无 `critical`。
- `major` 已修复或有明确交付前提。
- 内容、逻辑、证据、呈现、语言均通过合伙人视角。
- 内容、逻辑、呈现、语言均通过客户视角。
- `quality_scorecard.total_score >= 90` 才能标记为 `client-ready`。

如果时间不足，必须在最终回复中说明残余风险和建议优先修复项。

