# Bilingual Output Standard

用于中英双语金融咨询 PPT。用户要求 `bilingual: true`、外资银行在华机构、合资公司、海外总部汇报或双语董事会材料时读取。

## Principle

不要做逐字翻译；做双语平行创作。中文和英文标题都必须是各自语言中自然、专业、可独立阅读的咨询表达。

## Output Modes

| Mode | Use when |
|---|---|
| `parallel_on_slide` | 每页需要中英对照，适合短标题和图表标签 |
| `chinese_with_english_summary` | 正文中文，附英文执行摘要，适合中国管理层 + 海外总部 |
| `english_with_chinese_notes` | 正文英文，中文脚注或内部备注，适合外资机构 |

## Rules

- 中文标题和英文标题各自成句，不强求字面对齐。
- 图表轴名、单位、图例可双语；来源条中的英文机构名、期刊名、公司名通常不翻译。
- 金融术语使用行业惯用英文，不直译。
- 双语页正文必须减少信息密度；如果中英文字同时出现，优先拆页或使用附录。
- 中英文数字口径必须完全一致，单位换算需记录。

## Schema Additions

```json
{
  "bilingual": true,
  "language_mode": "parallel_on_slide",
  "claim_title_zh": "利润改善主要来自投资端，承保贡献仍需验证",
  "claim_title_en": "Investment gains drove most profit improvement, while underwriting quality still needs validation",
  "source_note_language": "en",
  "term_glossary": [
    {"zh": "拨备覆盖率", "en": "allowance coverage ratio", "abbr": null}
  ]
}
```

## QA

- 中英文标题是否都为结论句。
- 英文是否是咨询表达，而不是机器直译。
- 双语排版是否导致字号低于最低要求。
- 图表标签是否拥挤；必要时用编号 + 图例。
- 术语表是否覆盖首次出现的关键金融术语。
