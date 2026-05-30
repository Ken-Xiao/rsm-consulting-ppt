# Argument Map Standard

用于把咨询 deck 的逻辑从“页面顺序”提升为“可审查论证链”。进入 `outline.json` 和 `preset_map.json` 前，应先形成 `argument_map.json` 或等价记录。

## Core Principle

专业咨询报告的每一页都应回答：

- 这页在证明哪个章节答案？
- 这个判断靠什么证据成立？
- 读者接受这个判断后，下一步自然应该看什么？

## Argument Levels

| Level | Artifact | Requirement |
|---|---|---|
| Client question | `client_question` | 客户真正要解决的问题 |
| Deck answer | `deck_answer` | 全 deck 的一句总答案 |
| Chapter answer | `chapter_answer[]` | 每个章节的一句回答 |
| Page claim | `claim_title` | 每页的一句判断 |
| Evidence object | `evidence_object` | 图、表、案例、流程、矩阵或图片 |
| Implication | `management_implication` | 对客户决策/行动的含义 |

## Argument Map Schema

```json
{
  "client_question": "新准则下上市保险公司财务结果变化说明了什么？",
  "deck_answer": "利润改善不能只看归母净利润，需拆分承保、投资和口径变化后判断质量。",
  "chapters": [
    {
      "chapter_id": "01",
      "chapter_title": "整体财务结果分析",
      "chapter_question": "利润改善是否来自经营质量提升？",
      "chapter_answer": "多数样本利润改善受投资端和口径影响，承保端贡献需要单独验证。",
      "supporting_pages": ["P05", "P06", "P07"],
      "transition_to_next": "确认利润来源后，下一章进一步拆解投资波动和综合收益。"
    }
  ],
  "pages": [
    {
      "page_id": "P05",
      "claim_title": "净利润增长主要来自投资回暖，承保业务贡献在多数样本中下降",
      "supports_chapter_answer": true,
      "evidence_object": "2025 vs 2024 利润构成堆叠条",
      "evidence_ids": ["fact_014", "fact_015"],
      "logic_role": "diagnosis",
      "implication": "后续应单独评估承保端质量，而不是直接把利润增长视为经营改善。"
    }
  ]
}
```

## Logic Gap Detector

构建前检查：

- 有章节标题但没有章节问题。
- 有章节问题但没有章节答案。
- 页面标题只是主题词，没有判断。
- 页面判断没有证据对象。
- 证据对象不能支撑页面判断。
- 行动建议没有回链到前文诊断。
- 章节页没有承接上一章或预告下一章。

## Fix Rules

1. 先修章节答案，再修页面标题。
2. 若同一页证明两个判断，拆页或选择主判断。
3. 若页面只有事实没有含义，补 `management_implication`。
4. 若建议没有证据，降级为“待验证事项”或补证据页。
