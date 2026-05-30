# Data Pipeline

用于建立金融 PPT 的事实池、指标池和上下文来源。支持用户文件、手工数据、公开资料和可用 MCP/Tushare 连接。不要假设 MCP 已配置；只有当工具上下文明确可用或用户确认可接入时才使用。

## Input

- `project_config.yaml`
- `brief.json`
- 用户材料：PPT、Excel、Word、PDF、CSV、合同、模型、公开资料。

## Data Modes

| Mode | Use when | Rule |
|---|---|---|
| `manual-file` | 用户提供 Excel/CSV/模型 | 优先读取文件，不联网补数 |
| `source-deck` | 用户只给旧 PPT | 抽取旧 PPT 中事实，保留来源页 |
| `public-research` | 用户允许查公开资料 | 只用可引用来源，记录链接和日期 |
| `mcp-tushare` | 环境有 Tushare MCP 或用户明确要求 | 先确认 token/接口可用，再拉取 |
| `hybrid` | MCP 覆盖不足 | MCP 拉基础数据，缺口由手工文件补充 |

## Context Enrichment

当用户明确允许使用公开资料、联网研究或最新监管/市场信息时，先读取 `references/context-enrichment.md`，生成 `context_enrichment.json`，再进入指标整理。

常见补全对象：

- 最新利率、LPR、监管指标、行业景气度。
- 主体近三个月公告、新闻、评级或重大事项。
- 资产估值所需的可比交易、租金、cap rate、退出通道。
- 尽调/交易所需的政策、处罚、诉讼、合规边界。

如果用户只要求基于现有材料优化 PPT，不主动联网补数；仅把现有材料中的事实整理为 `data_pool.json`。

## Indicator Registry

按场景选择指标，不要把银行指标套到资产估值或尽调场景。

### 银行通用

- `roa`：净利润 / 平均总资产，越高越好。
- `roe`：净利润 / 平均净资产，越高越好。
- `nim`：净息差，结合资产负债结构解释。
- `fee_ta`：手续费及佣金净收入 / 平均总资产，越高越好。
- `npl_ratio`：不良贷款率，越低越好。
- `provision_coverage`：拨备覆盖率，结合风险偏好解释。
- `cet1_ratio`：核心一级资本充足率，越高越稳健。
- `rwa_density`：风险加权资产 / 总资产，场景依赖。
- `pb`：市净率，结合 ROE、成长和风险解释。

### 银行衍生/深度指标

- `raroc`：风险调整后资本回报，需明确风险成本、资金成本、运营成本口径。
- `eva`：经济利润，需明确资本成本。
- `nim_gap`：资产端收益降幅与负债端成本降幅的缺口。
- `deposit_termification`：定期存款 / 核心存款总额。
- `broad_npl`：广义不良口径，必须说明关注类折算方式。

### 资产估值

- `noi`：有效毛收入 - 运营成本。
- `cap_rate`：NOI / 资产价值，需说明可比交易口径。
- `irr`：现金流内部收益率。
- `dscr`：NOI / 债务本息偿付。
- `occupancy`：出租率或入住率。
- `rent_growth`：租金增长率。
- `exit_value`：退出价值，需说明退出 cap rate 或估值倍数。

### 尽调/交易

- `normalized_ebitda`：调整后 EBITDA。
- `net_debt`：净债务。
- `working_capital_gap`：营运资本缺口。
- `contingent_liability`：或有负债。
- `quality_of_earnings_adjustment`：盈利质量调整。
- `red_flag_count`：红旗风险数量，需分等级。

## Output: data_pool.json

专业金融咨询项目还必须读取 `references/data-lineage-protocol.md`，同步输出 `lineage_map.json`。`data_pool.json` 负责存事实和指标，`lineage_map.json` 负责记录这些数字如何进入每一页、每一张图和每一个结论。

```json
{
  "scene_id": "asset-valuation",
  "subject": {"name": "项目名称"},
  "sources": [
    {"file": "model.xlsx", "sheet": "cashflow", "range": "B2:H40"}
  ],
  "facts": [
    {"key": "base_noi", "value": 12000000, "unit": "RMB", "source": "model.xlsx"}
  ],
  "indicators": [
    {"key": "irr_base", "value": 0.082, "direction": "higher_better", "source": "computed"}
  ],
  "gaps": [
    {"item": "出租率预测未提供敏感性", "severity": "warning"}
  ]
}
```

若执行过上下文补全，同时输出：

```json
{
  "context_enrichment": {
    "macro_indicators": [],
    "recent_events": [],
    "policy_changes": [],
    "source_date": "YYYY-MM-DD"
  }
}
```

## Validation

- 缺失值：标记，不要静默填补。
- 异常值：超过同业/历史中位显著偏离时提示用户确认。
- 排名方向：必须按指标方向处理。
- 单位一致：百分比、bp、倍数、亿元不能混用。
- 来源完整：每个数字至少能追到文件、页码、表名或公开链接。
- 外部事实：必须记录发布日期、访问日期和来源链接；无法核验的内容只作为待确认项。
- 血缘完整：正文关键数字必须能回链到 `lineage_map.json`；无法回链则不得进入正式结论。
