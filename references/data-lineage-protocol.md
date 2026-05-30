# Data Lineage Protocol

用于保证金融 PPT 中每个数字、图表、排名、估算和判断都可追溯。处理金融数据、公开资料、用户文件或模型时必须使用。关键数据进入核心结论时同步读取 `references/content-freshness-and-evidence.md`。

## Principle

任何出现在 PPT 正文、图表、摘要、小结或脚注中的数字，都必须能追溯到一个 lineage record。

没有 lineage 的数字不得进入正文页。若必须保留，标记为 `pending_confirmation`。

## Lineage Record Schema

```json
{
  "id": "fact_001",
  "value": 0.127,
  "display_value": "12.7%",
  "unit": "%",
  "metric": "综合收益同比增速",
  "entity": "样本公司A",
  "period": "2025",
  "source_type": "annual_report",
  "source_file": "2025年报.pdf",
  "source_page": 42,
  "source_table": "合并利润表",
  "source_cell": null,
  "as_of_date": "2025-12-31",
  "publication_date": "2026-03-28",
  "retrieved_date": "2026-05-30",
  "freshness_tier": "aging",
  "evidence_credibility": "L2-official",
  "formula": "(current - prior) / prior",
  "dependencies": ["fact_revenue_2025", "fact_revenue_2024"],
  "transformation": "同比计算",
  "owner": "RSM整理",
  "confidence": "high",
  "notes": "新准则口径，已与披露口径一致"
}
```

## Required Artifacts

复杂项目必须形成：

- `data_pool.json`：事实和指标池。
- `lineage_map.json`：数字血缘表。
- `chart_data/Pxx.json`：每页图表输入。
- `source_digest.md`：来源摘要。

## Lineage Map

`lineage_map.json` 结构：

```json
{
  "pages": {
    "P05": {
      "title_claim": "净利润增长背后，承保与投资贡献结构明显分化",
      "numbers": ["fact_001", "fact_002"],
      "chart_data": "chart_data/P05.json",
      "source_note": "数据来源：上市公司年报；RSM整理",
      "status": "verified"
    }
  }
}
```

## Data Confidence Levels

| Level | Meaning | Use in PPT |
|---|---|---|
| `high` | 原始披露、用户模型、可复算 | 可进入正文结论 |
| `medium` | 公开资料或手工提取，已交叉检查 | 可进入正文，但保留来源 |
| `low` | 单一非权威来源或 OCR 提取 | 只作为待确认或附录 |
| `assumption` | 项目组假设或情景 | 必须标注假设 |
| `pending_confirmation` | 缺来源或口径不清 | 不进入正文结论 |

## Freshness And Credibility

每个核心数字尽量补充：

- `as_of_date`
- `publication_date`
- `retrieved_date`
- `freshness_tier`: `fresh` / `aging` / `stale` / `unknown`
- `evidence_credibility`: `L1-audited` / `L2-official` / `L3-estimated` / `L4-anecdotal`

规则读取 `references/content-freshness-and-evidence.md`。`stale` 或 `unknown` 数据不得作为核心结论唯一支撑；`L3/L4` 支撑的结论必须降低措辞强度。

## Number Audit Rules

检查：

- 同一个指标在摘要、正文、小结中的显示值是否一致。
- 单位是否一致：亿元、百万元、%、bp、倍数不能混用。
- 年份是否一致：2024、2025、2025H1 不能在同一图表中含糊混排。
- 排名方向是否正确：越高越好/越低越好/场景依赖。
- 衍生指标公式是否记录。
- 估算、推演、情景和事实是否区分。

## Chart Data Contract

每个图表页必须有 `chart_data/Pxx.json`：

```json
{
  "page_id": "P05",
  "chart_type": "stacked_contribution_split",
  "source_fact_ids": ["fact_001", "fact_002", "fact_003"],
  "series": [
    {"name": "承保业务", "values": [0.41, 0.26], "unit": "%"}
  ],
  "display_rules": {
    "number_format": "0.0%",
    "negative_style": "gray_reverse_bar",
    "sort_order": "original_disclosure_order"
  }
}
```

## Source Note Rules

来源条必须具体：

- 好：`数据来源：中国人寿、人保集团等上市公司2025年年报；RSM整理`
- 好：`数据来源：项目财务模型，现金流测算表；RSM测算`
- 不好：`资料来源：公开资料`
- 不好：`数据来源：网络`

## Audit Output

在 `review_report.json` 增加：

```json
{
  "data_lineage_audit": {
    "total_numbers": 84,
    "verified": 80,
    "pending_confirmation": 4,
    "critical_issues": [
      {
        "page": "P04",
        "number": "12.7%",
        "issue": "摘要页数字无法回链到 data_pool.json",
        "fix": "补充 lineage record 或删除该数字"
      }
    ]
  },
  "content_freshness_audit": {
    "fresh": 0,
    "aging": 0,
    "stale": 0,
    "unknown": 0,
    "stale_core_evidence": []
  },
  "evidence_credibility_audit": {
    "low_credibility_core_claims": []
  }
}
```
