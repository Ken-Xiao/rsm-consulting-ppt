# Financial Methodology Packs

用于按场景加载专业金融咨询方法论。生成 `brief.json` 和 `outline.json` 后，根据 `scene_id` 选择对应 pack。

## Common Methodology Page

复杂金融 deck 必须包含或隐含方法论说明：

- 研究对象和样本。
- 数据期间和截至日期。
- 数据来源和可比性处理。
- 指标定义和公式。
- 排名方向和异常值处理。
- 口径限制和免责声明。

## Peer Benchmarking Engine

银行对标、保险同业、区域政策比较、行业 ranking / quartile 场景必须明确 peer set 选择逻辑，不得临时拼样本。

### Peer Set Criteria

在 `brief.json` 或 `methodology_note` 中记录：

```json
{
  "peer_benchmarking": {
    "target_entity": "目标机构",
    "peer_criteria": ["规模", "区域", "业务组合", "上市状态", "监管分类"],
    "included_peers": ["公司A", "公司B"],
    "excluded_peers": [
      {"entity": "公司C", "reason": "业务结构不可比"}
    ],
    "ranking_method": "quartile",
    "ranking_direction_notes": "NPL 越低越好，ROA 越高越好"
  }
}
```

### Common Metric Sets

银行：

- 净息差（NIM）
- 成本收入比（CIR）
- 不良贷款率（NPL）
- 关注类贷款占比
- ROA / ROE / RAROC
- 核心一级资本充足率
- 市净率（PB）

保险：

- 综合成本率
- 保险服务收入
- 承保利润
- 投资收益率
- 综合投资收益率
- 核心/综合偿付能力充足率

政策/区域比较：

- 适用主体
- 触发条件
- 监管目标
- 会计/税务/资本联动
- 执行机制
- 行为影响

### Benchmark Wording

- `目标机构在 [指标] 上位于样本 P25-P50 区间，低于标杆主体 [X]。`
- `该差距更可能来自 [驱动因素]，仍需结合 [口径/样本限制] 验证。`
- `排名结论只在当前 peer set 和披露期间内成立。`

## Peer Tier Classification Module

当需要形成“第一梯队/第二梯队/第三梯队/第四梯队”或竞争格局分层时，必须记录分类方法，不得凭印象分组。

### Tiering Method Choices

| Method | Use when | Required note |
|---|---|---|
| `percentile_split` | 样本数量较多，指标分布平滑 | 分位点和排序方向 |
| `natural_breaks` | 指标出现明显断点或聚类 | 断点位置和解释 |
| `two_axis_matrix` | 两个指标共同决定定位 | x/y 轴定义、象限含义 |
| `expert_adjusted` | 数据不足或存在不可比因素 | 专家调整原因和限制 |

### Required Fields

```json
{
  "peer_tier_classification": {
    "tiering_method": "two_axis_matrix",
    "dimensions": [
      {"name": "ROA", "direction": "higher_better"},
      {"name": "风险调整收益率", "direction": "higher_better"}
    ],
    "threshold_policy": "样本中位数切分 + 自然断点复核",
    "tiers": [
      {"tier": "第一梯队", "criteria": "两项指标均高于样本中位", "members": ["A银行"]},
      {"tier": "第二梯队", "criteria": "账面收益高但风险调整收益待验证", "members": ["B银行"]}
    ],
    "limitations": ["样本仅覆盖上市同业", "不同机构披露口径存在差异"]
  }
}
```

### Wording

- `基于 [X] 和 [Y] 两个维度，样本自然形成 [N] 个梯队；[主体] 位于第 [N] 梯队。`
- `该分层反映当前样本和口径下的相对位置，不代表绝对经营优劣。`
- `若采用 [替代指标]，梯队位置可能变化，需在方法论页披露限制。`

## Insurance Results Review Pack

Use when:

- 上市保险公司业绩盘点。
- 新准则财务结果分析。
- IFRS 17 / IFRS 9 / 新保险合同准则影响分析。

Recommended modules:

1. 封面与目录。
2. 研究口径和样本。
3. 整体财务结果分析。
4. 承保业务分析。
5. 投资业务分析。
6. 费用分摊/服务边际/综合收益专题。
7. 偿付能力与风险提示。
8. 总结与管理含义。

Core indicators:

- 净利润、归母净利润、综合收益。
- 保险服务收入、保险服务业绩。
- 投资收益、总投资收益率、综合投资收益率。
- 承保业务贡献、投资业务贡献、所得税影响、其他项目。
- 费用分摊比例、获取费用、维持费用。
- 资产减值、信用减值损失。
- 偿付能力充足率、核心偿付能力充足率。

Methodology cautions:

- 新旧准则期间必须说明可比性。
- 公司披露口径不同，不能机械排名。
- 投资收益与综合收益需区分当期损益和 OCI。
- 样本公司缺失项必须标记，不得静默补齐。

Preferred presets:

- `insurance_results_chart_card`
- `paired_period_comparison`
- `stacked_contribution_split`
- `financial_metric_grid`
- `accounting_policy_note`

## Bank Performance Pack

Use when:

- 银行经营对标。
- 银行业绩复盘。
- 董事会经营诊断。

Recommended modules:

1. 研究口径、样本和指标定义。
2. 执行摘要。
3. 行业/同业坐标。
4. 盈利能力。
5. 净息差和资产负债管理。
6. 中间业务和非息收入。
7. 资产质量和风险成本。
8. 资本效率和估值。
9. 结构性矛盾和行动建议。

Core indicators:

- ROA、ROE、营收增速、利润增速。
- 净息差、生息资产收益率、计息负债成本率。
- 手续费及佣金净收入 / 平均总资产。
- 不良率、关注率、拨备覆盖率、信用成本。
- 核心一级资本充足率、RWA 密度。
- PB、估值折价/溢价。

Methodology cautions:

- 同业样本必须说明类型、区域、规模和上市状态。
- 银行指标排名必须明确方向。
- 风险调整指标必须说明公式和资本成本假设。
- PB/ROE 关系不能写成单因果。

## NPL Disposal Practice Pack

Use when:

- 商业银行不良处置。
- 呆账核销、批量转让、贷款减免。
- 保险非标资产不良案例。

Recommended modules:

1. 行业不良概况。
2. 处置工具和监管要求。
3. 关键观察。
4. 案例复盘。
5. 风险传导和管理影响。
6. 整改建议和审计关注点。

Core topics:

- 不良率、关注率、不良余额、转让规模。
- 核销、批量转让、单户转让、反委托、贷款减免。
- 责任认定、流程合规、价格发现、关联方受让。
- 保险非标资产估值、确权、处置、风险传递。

Methodology cautions:

- 案例必须脱敏。
- 政策依据必须写明文件名、文号和日期。
- 对违规/风险判断必须保留条件和证据边界。
- 不能把单案例推导为行业普遍结论，除非有样本支持。

Preferred presets:

- `case_evidence_panel`
- `two_case_with_center_mechanism`
- `three_recommendation_cards`
- `risk_network_diagram`
- `observation_with_timeline`

## Asset Valuation Pack

Use when:

- 资产收储。
- 不动产/园区/商业物业估值。
- 投资测算和谈判边界。

Core methods:

- 市场法、收益法、成本法适用性判断。
- NOI、cap rate、IRR、DSCR、现金流覆盖。
- 基准、压力、乐观情景。
- 敏感性矩阵和安全边界。

Cautions:

- 估值区间必须写明假设。
- 可比交易必须说明时间、位置、资产类型和调整项。
- 退出价值必须说明退出 cap rate 或倍数。

## Due Diligence Pack

Use when:

- 财务尽调、商业尽调、合规尽调。
- 收购、融资、IPO、重组。

Core modules:

- 交易背景。
- 财务质量。
- 收入质量。
- 成本费用和利润质量。
- 营运资本和现金流。
- 合规和或有风险。
- 估值影响和建议。

Cautions:

- 红旗风险必须有证据。
- 调整项必须区分已确认、估计和待确认。
- 尽调结论不能替代法律意见或审计意见。
