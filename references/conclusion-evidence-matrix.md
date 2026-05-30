# Conclusion Evidence Matrix

用于把“咨询判断”变成可审查、可追溯、可交付的证据链。客户交付版在进入 `outline.json` 前必须形成 `conclusion_evidence_matrix.json` 或等价表格。

## Core Principle

每个核心结论都必须回答：

- 这个结论解决哪个客户问题？
- 它由哪些事实、数据、案例或方法支撑？
- 证据强度是否足以支撑当前措辞？
- 有哪些口径、样本、时点或替代解释限制？
- 这个结论会落到哪几页？

## Matrix Schema

```json
{
  "conclusions": [
    {
      "conclusion_id": "c_001",
      "conclusion": "利润改善主要由投资端回暖驱动，承保端质量仍需单独验证",
      "client_question_link": "cq_001",
      "chapter_id": "01",
      "evidence": [
        {
          "evidence_id": "fact_014",
          "type": "derived_fact",
          "source_id": "src_002",
          "description": "7 家上市险企利润构成拆分显示投资收益贡献上升",
          "strength": "high",
          "used_in_pages": ["P06"]
        }
      ],
      "limitations": [
        "部分公司披露口径不完全一致",
        "投资收益受市场环境影响，不能外推为长期趋势"
      ],
      "alternative_explanations": [
        "所得税、准备金释放或一次性项目也可能贡献部分利润改善"
      ],
      "language_strength": "strong_but_bounded",
      "allowed_wording": "主要由...驱动；仍需...验证",
      "forbidden_wording": "完全来自；必然持续",
      "pages": ["P04", "P06", "P12"]
    }
  ]
}
```

## Evidence Strength

| Strength | Meaning | Allowed wording |
|---|---|---|
| `high` | 多个硬数据或可复核计算支持 | 显示、表明、主要来自 |
| `medium` | 单一来源或披露口径存在限制 | 可能反映、倾向于说明 |
| `low` | 假设、访谈、项目组判断 | 初步判断、需进一步验证 |

## Mandatory Checks

- 执行摘要的每条结论必须出现在矩阵中。
- 章节页的 `chapter_answer` 必须由至少 1 条矩阵结论支撑。
- 正文页强判断必须回链到 `conclusion_id`。
- 没有证据的判断不得进入主标题；可降级为 `hypothesis` 或 `open_question`。
- 如存在替代解释，必须在副标题、脚注或限制页中体现边界。

## Fix Rules

1. 证据不足：降低措辞强度。
2. 证据与结论不匹配：重写结论或补证据。
3. 证据过多但结论不清：先提炼单一判断，再拆页。
4. 结论只对内部有意义：重写为客户决策含义。
