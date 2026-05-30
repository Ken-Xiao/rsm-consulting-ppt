# Scene Router

用于把金融咨询 PPT 项目路由到正确的场景配置。该模块只做分类和配置，不直接写正文或做 PPT。

## Registered Scenes

| Scene ID | 场景 | 触发关键词 | 默认叙事 | 默认页数 |
|---|---|---|---|---|
| `bank-benchmarking` | 银行经营对标分析 | 银行、农商行、城商行、同业、对标、VQA、经营分析 | 矛盾→证据→行动 | 35-55 |
| `bank-valuation` | 银行价值创造/估值修复 | 价值创造、PB、估值修复、经济利润、董事会 | 反差→诊断→跃迁 | 25-45 |
| `asset-valuation` | 资产收储/估值咨询 | 收储、收购、估值、NOI、Cap Rate、IRR、现金流 | 水位线→传导→安全边界 | 20-35 |
| `due-diligence` | 财务/商业/合规尽调 | 尽调、DD、风险排查、收购、融资、IPO、重组 | 风险标记→穿透→建议 | 20-45 |
| `industry-research` | 行业研究/赛道分析 | 行业、赛道、市场规模、竞争格局、趋势 | 市场结构→竞争格局→机会 | 20-40 |
| `policy-comparison` | 全球/区域政策制度比较 | 监管、政策、制度、司法辖区、准则、税务、核销、跨境比较 | 分类→矩阵→深挖→启示 | 30-55 |
| `transaction-structure` | 交易结构/融资方案 | 信托、ABS、资管、融资、交易结构、三流合一 | 约束→结构→风控→落地 | 12-30 |
| `insurance-results-review` | 保险公司新准则财务结果/业绩盘点 | 保险公司、上市险企、新准则、IFRS 17、财务结果、承保、投资收益、偿付能力 | 结果→结构分化→驱动解释→风险提示 | 25-40 |
| `npl-practice-sharing` | 银行/保险不良处置行业实践分享 | 不良处置、核销、批量转让、责任认定、资产减值、非标不良、案例分享 | 概况→观察→案例→建议 | 25-40 |
| `custom` | 自定义金融汇报 | 无法匹配以上场景 | 由访谈确定 | 用户指定 |

## Routing Rules

1. 从用户请求、文件名、材料标题中识别关键词。
2. 如果能明确匹配，输出场景假设并进入 `references/strategy-brief.md`。
3. 如果不确定，先问用户选择：

```text
这个项目更接近哪种类型？
1. 银行同业对标
2. 银行价值创造/估值修复
3. 资产收储/估值
4. 尽调报告
5. 行业研究
6. 全球/区域政策制度比较
7. 交易结构/融资方案
8. 保险公司新准则财务结果/业绩盘点
9. 银行/保险不良处置行业实践分享
10. 其他，请描述
```

## Project Config

路由后生成 `project_config.yaml` 或等价文字配置：

```yaml
scene_id: bank-benchmarking
scene_name: 银行经营对标分析
typical_audience: [董事会, 管理层, 战略委员会]
typical_page_range: [35, 55]
analysis_frameworks:
  - VQA三层穿透
  - PB面板计量
data_mode:
  default: manual_or_mcp
  mcp_optional: true
narrative_archetype: contradiction-action
module_sequence:
  - metadata
  - executive_summary
  - framework_intro
  - benchmark
  - deep_dive
  - valuation_or_risk
  - action_plan
  - appendix
visual_profile: rsm-insurance-results
```

## Scene Defaults

### bank-benchmarking

- 数据结构：同业截面 + 多年面板。
- 常见图表：排名条、趋势线、雷达、散点回归、模块小结。
- 常见模块：元数据、执行摘要、框架、行业坐标、专题穿透、估值/市场验证、矛盾、行动。

### bank-valuation

- 数据结构：单体银行 + 对标组 + 市场估值。
- 常见图表：PB/ROE 散点、经济利润桥接、六维雷达、估值修复路径。
- 常见模块：反差、估值诊断、经营穿透、资本市场验证、跃迁路径。

### asset-valuation

- 数据结构：单体资产现金流、交易案例、估值参数、压力情景。
- 常见图表：IRR 矩阵、瀑布桥接、敏感性热力、现金流漏斗。
- 常见模块：交易背景、三线水位、现金流、估值区间、压力测试、谈判边界。

### due-diligence

- 数据结构：财务报表、合同、访谈、风险清单、证据包。
- 常见图表：风险矩阵、红旗清单、调整桥、质量评分、证据链。
- 常见模块：摘要、交易背景、财务质量、经营质量、合规风险、估值影响、建议。

### industry-research

- 数据结构：市场规模、增速、竞争格局、政策、产业链、案例。
- 常见图表：市场规模趋势、竞争矩阵、产业链图、五力/价值链、机会地图。
- 常见模块：市场定义、规模与增速、结构变化、竞争格局、机会、风险、建议。

### policy-comparison

- 数据结构：多个国家/司法辖区/制度体系 × 统一比较维度。
- 常见图表：政策哲学二维图、大矩阵、双体系比较、评分梯、制度沿革时间线、三栏影响分析。
- 常见模块：研究框架、核心启示、全景分类、横向矩阵、单一辖区深挖、行为影响、行业应对、总结展望。
- 读取 `references/global-policy-comparison-template.md` 作为默认模板。

### insurance-results-review

- 数据结构：上市保险公司样本、年度/半年度财务数据、新旧准则或同比口径、利润/承保/投资/费用/偿付能力分项。
- 常见图表：双期间并列条、横向堆叠构成、柱线组合、费用分摊堆叠、公司对比表、会计口径说明框。
- 常见模块：封面、目录、整体财务结果、承保业务、投资业务、费用/服务边际、偿付能力与风险提示、总结。
- 默认视觉：`rsm-insurance-results`。
- 默认版式：`insurance_results_chart_card`、`paired_period_comparison`、`stacked_contribution_split`、`standard_dual_compare`。

### npl-practice-sharing

- 数据结构：行业概况数据、政策依据、处置流程、审计/监管观察、案例事实、建议清单。
- 常见图表：柱线组合、观察时间线、案例卡、中心机制图、三建议卡、风险网络图、流程合规矩阵。
- 常见模块：封面、团队/目录、行业概况、银行不良处置观察、保险资产减值概况、保险不良资产案例、管理影响和建议。
- 默认视觉：`rsm-practice-sharing`。
- 默认版式：`practice_photo_cover`、`practice_agenda`、`practice_section_divider`、`observation_with_timeline`、`two_case_with_center_mechanism`、`case_evidence_panel`、`risk_network_diagram`。
