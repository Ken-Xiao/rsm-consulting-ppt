# Source Digest Standard

用于把用户提供的 PDF、PPT、Word、Excel、网页和访谈纪要整理成可审计的事实底稿。任何客户交付版 deck 在进入故事线设计前，都应先形成 `source_digest.md` 或等价记录。

## Purpose

`source_digest.md` 不是摘要文章，而是证据台账。它回答四个问题：

- 这个来源能支持哪些结论？
- 哪些内容只能作为背景，不能作为硬证据？
- 哪些图片、版式或图表可以作为视觉参考？
- 哪些事实存在口径、时点或披露限制？

## Source Record Schema

每个来源至少记录：

```yaml
- source_id: src_001
  file_or_url: "2025年上市保险公司新准则财务结果分析_final.pdf"
  source_type: pdf_reference_deck
  date_or_period: "2025"
  owner_or_publisher: "RSM / 容诚"
  credibility: high
  use_scope: ["visual_reference", "page_pattern_reference"]
  usable_facts:
    - "上市险企业绩页常用图表卡 + 结论条结构"
  usable_visuals:
    - "白底、亮蓝标题、右上模块胶囊、浅灰结论条、白色阴影图表卡"
  limitations:
    - "不可直接复用原 PDF 图片和客户特定数据"
  linked_pages: ["P01", "P04-P18"]
```

## Evidence Strength

给每条证据标记强度：

| Strength | Definition | Use |
|---|---|---|
| `hard_fact` | 来源文件直接披露的数字、日期、政策原文 | 可支撑核心判断 |
| `derived_fact` | 基于硬数据计算得到的指标 | 可支撑图表，需保留公式 |
| `professional_judgment` | 基于事实的咨询判断 | 可写入结论，但需说明依据 |
| `visual_reference` | 视觉、版式、色板、节奏参考 | 只能指导设计，不作为业务证据 |
| `hypothesis` | 用户或项目组初步判断 | 需要后续验证 |

## Output Requirements

`source_digest.md` 应包含：

1. `source_inventory`：所有来源列表。
2. `key_facts`：可进入 `data_pool.json` 或页面证据的事实。
3. `visual_references`：可进入视觉系统的版式/色彩/图片风格观察。
4. `open_questions`：需要用户确认或补充的数据缺口。
5. `usage_boundaries`：不可引用、不可外推或需要脱敏的内容。

## QA Checks

- 不得把视觉参考当作事实证据。
- 不得把用户假设写成已验证事实。
- 每个核心结论至少应能回链到 1 条 `hard_fact`、`derived_fact` 或清楚标记的 `professional_judgment`。
- 若来源只是参考风格，必须标记为 `visual_reference`。
