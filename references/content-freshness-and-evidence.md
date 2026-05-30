# Content Freshness And Evidence Standard

用于给金融数据、政策、市场信息和证据来源增加时效性与可信度控制。处理外部资料、公开披露、监管政策、同业数据、估算和访谈时读取本文件。

## Freshness Fields

每个进入 `data_pool.json`、`lineage_map.json` 或 `conclusion_evidence_matrix.json` 的关键事实必须尽量记录：

```json
{
  "fact_id": "F001",
  "as_of_date": "2026-03-31",
  "publication_date": "2026-04-28",
  "retrieved_date": "2026-05-30",
  "freshness_tier": "fresh",
  "freshness_note": "2026Q1 披露数据"
}
```

## Freshness Tiers

默认阈值：

| Tier | Data age | Use in core conclusion |
|---|---|---|
| `fresh` | < 3 months | 可作为核心证据 |
| `aging` | 3-12 months | 可作为核心证据，但需要期间说明 |
| `stale` | > 12 months | 不得作为核心结论唯一证据；需要限定语或触发 context enrichment |
| `unknown` | 缺少日期 | 不得作为强结论证据；标记 `requires_confirmation` |

场景可调整：

- 季报/市场数据：优先使用 3 个月阈值。
- 年报、审计报告、监管制度：可使用 12 个月阈值，但必须记录适用期间。
- 法规政策：以生效日期、修订日期和适用日期为准，不只看发布日期。

## Evidence Credibility Levels

| Level | Source type | Wording implication |
|---|---|---|
| `L1-audited` | 审计报告、经审计财务报表、监管确认结果 | 可用确定性事实表述 |
| `L2-official` | 公司公告、监管披露、官方统计、用户正式模型 | 可用“根据披露/官方数据”表述，避免必然性预测 |
| `L3-estimated` | 行业报告、第三方估算、项目组测算、模型推演 | 使用“估算/测算/预计/约为”，写明假设 |
| `L4-anecdotal` | 访谈、观察、未经核验反馈、初步假设 | 使用“初步显示/可能/需验证”，不得作为强结论唯一支撑 |

## Page Rules

- 核心结论如只由 `L3-estimated` 或 `L4-anecdotal` 支撑，标题必须降低判断强度。
- `stale` 数据如用于正文，页面来源条或脚注必须注明截至日期。
- `unknown` 日期的数据只能进入待确认项、附录或方法限制页。
- 若同一结论有多个来源，优先展示可信度最高、最新且最可追溯的来源。

## Review Output

在 `review_report.json` 中增加：

```json
{
  "content_freshness_audit": {
    "status": "warning",
    "fresh": 18,
    "aging": 6,
    "stale": 2,
    "unknown": 1,
    "stale_core_evidence": [
      {
        "page": "P08",
        "fact_id": "F021",
        "issue": "该事实截至 2024-12，作为核心结论唯一证据",
        "fix": "补充最新披露或将标题降级为历史观察"
      }
    ]
  },
  "evidence_credibility_audit": {
    "status": "pass",
    "low_credibility_core_claims": []
  }
}
```

## Language Link

判断强度必须与 `evidence_credibility` 匹配；具体措辞读取 `language-calibration-standard.md`。
