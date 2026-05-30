# Context Enrichment And Fact Check

用于补充宏观背景、近期事件、政策变化，并在审校阶段验证事实。只有在用户允许联网或提供明确外部来源时使用。

## Context Enrichment

Use when:

- 用户要求加入宏观、监管、政策或行业背景。
- deck 涉及最新市场环境、利率、监管政策、行业数据。
- 用户允许联网或提供可查来源。

Do not use when:

- 用户明确要求只基于内部材料。
- 法律/交易结论不能引入外部资料。
- 无法验证来源。

## Suggested Queries

按场景选择：

- `[主体名称] 最新公告`
- `[行业] 最新监管政策`
- `商业银行 净息差 监管数据`
- `LPR 最新调整 人民银行`
- `[资产类型] cap rate 交易案例`
- `[行业] 市场规模 竞争格局`

## Output: context_enrichment.json

```json
{
  "macro_indicators": [
    {"key": "lpr_1y", "value": "3.0%", "date": "YYYY-MM-DD", "source": "PBOC"}
  ],
  "recent_events": [
    {"date": "YYYY-MM-DD", "headline": "事件", "relevance": "high", "source": "URL"}
  ],
  "policy_changes": [
    {"date": "YYYY-MM-DD", "policy": "政策名称", "impact_assessment": "影响判断", "source": "URL"}
  ]
}
```

## Fact Check Loop

在 `references/review-loop.md` 中调用：

1. 内部一致性：
   - 同一指标跨页是否一致。
   - 摘要页、正文页、小结页是否冲突。
2. 来源追溯：
   - 每个数字是否能追溯到 `data_pool.json` 或 `context_enrichment.json`。
3. 合理性范围：
   - 银行 ROA、PB、净息差、不良率等是否在合理区间。
   - 资产 IRR、cap rate、DSCR 是否与业务常识冲突。
4. 外部事实：
   - 政策、利率、监管数据是否有来源和日期。

## Report Format

```json
{
  "fact_check": [
    {
      "page": "P04",
      "severity": "critical",
      "data_point": "ROA 0.93%",
      "issue": "P15 写作 0.92%，跨页不一致",
      "fix": "统一为 data_pool.json 中的值"
    }
  ]
}
```
