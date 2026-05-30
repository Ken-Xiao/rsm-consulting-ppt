# Chart Decision Tree

用于根据 `data_pool.json` 和 `outline.json` 中的数据形状自动选择图表。先判断要证明什么，再选图表。

选定图表后必须读取 `references/financial-chart-grammar.md`，检查单位、口径、标签、颜色、双轴、样本一致性和来源血缘。客户交付核心图表还必须读取 `references/professional-chart-rulebook.md`，补齐图表观点、基准、标注、比较口径和禁用场景。

## Decision Tree

### Q1: 是否在比较多个实体？

- N <= 12，单指标：`ranking_bar`
- N > 12，单指标：`grouped_bar` 或 `scatter_positioning`
- 多指标、少主体：`comparison_table` 或 `radar`
- 有焦点主体：横向条形图 + 中位线 + 焦点高亮

### Q2: 是否在展示时间趋势？

- 单指标 × 5-10 期：`trend_line`
- 多指标 <= 4 条线：`multi_trend_line`
- 历史 + 预测：`historic_forecast_chart`
- 有结构性拐点：折线 + 注释标记

### Q3: 是否在说明两个指标关系？

- 连续变量关联：`scatter_regression`
- 需要象限解释：`scatter_quadrant`
- 样本少于 5：不要用散点，改用对比表或案例卡

### Q4: 是否在做传导或拆解？

- 起点 → 多个增减项 → 终点：`bridge_waterfall`
- 总量组成：`stacked_bar`，不要用饼图
- 现金流路径：`cashflow_waterfall` 或 `funnel`
- 阶段传导：`process_sequence` 或 `waterline_ladder`

### Q5: 是否在展示多维画像？

- >= 6 个维度：`radar`
- 3-5 个维度：`scorecard_matrix`
- 维度有权重：`weighted_score_table`

### Q6: 是否在做双变量情景模拟？

- 行变量 × 列变量 → 结果：`sensitivity_matrix`
- 基线/压力/乐观：`scenario_table`
- 安全边界或谈判底线：`sensitivity_matrix` + 高亮基准格

### Q7: 是否在说明交易或合同关系？

- 主体关系：`transaction_structure`
- 合同/资金/发票/信息对齐：`multi_flow_map`
- 执行顺序：`process_sequence` 或 `three_phase_roadmap`
- 职责边界：`role_boundary_compare`

### Q8: 是否在比较多个政策、国家或司法辖区？

- 多辖区 × 多维度制度比较：`jurisdiction_matrix`
- 需要先分类监管哲学或政策模式：`policy_philosophy_map`
- 进入单一国家/制度章节：`jurisdiction_chapter_cover`
- 单一制度由 4 个组成部分构成：`policy_framework_cards`
- 制度沿革、政策改革、准则落地：`policy_timeline`
- 政策对银行/企业/市场行为的影响：`behavior_impact_triad`
- 行业应对策略或最佳实践：`industry_response_grid`
- 两个准则/制度体系比较：`standard_dual_compare`
- 多制度评分排序：`scoring_ladder`

### Q9: 是否是保险新准则/上市险企业绩盘点？

- 单一财务指标 × 多家公司 × 两个年度：`paired_period_comparison`
- 利润/收入/费用/投资收益由多项构成：`stacked_contribution_split`
- 新旧准则或披露口径差异：`standard_dual_compare` + `accounting_policy_note`
- 公司经营结果总览：`insurance_results_chart_card`
- 多项财务指标同页比较：优先分成 2-3 张图表页，不把所有指标塞进一张密表

### Q10: 是否是不良处置/行业实践分享？

- 行业概况数据：`trend_line` 或柱线组合，右侧用 `observation_with_timeline`
- 单项处置观察 + 政策依据 + 建议：`case_evidence_panel`
- 两个案例证明同一风险通道：`two_case_with_center_mechanism`
- 三项整改/估值/流程建议：`three_recommendation_cards`
- 保险非标、SPV、基金、项目公司、关联方之间风险传导：`risk_network_diagram`
- 目录、章节封面、培训开场：`practice_agenda`、`practice_section_divider`

## Default Mapping

| layout_pattern | chart_type |
|---|---|
| `kpi_dashboard` | KPI cards |
| `ranking_bar` | horizontal bar |
| `trend_line` | line / column-line |
| `scatter_regression` | scatter + regression |
| `bridge_waterfall` | waterfall |
| `sensitivity_matrix` | heatmap matrix |
| `scenario_table` | table |
| `transaction_structure` | node-link diagram |
| `multi_flow_map` | swimlane |
| `risk_control_matrix` | matrix/table |
| `policy_philosophy_map` | 2x2 positioning map |
| `jurisdiction_matrix` | dense comparison matrix |
| `jurisdiction_chapter_cover` | chapter cover + KPI cards |
| `policy_framework_cards` | 2x2 rule cards |
| `policy_timeline` | timeline |
| `behavior_impact_triad` | 3-column impact cards |
| `industry_response_grid` | 2x2 strategy cards |
| `standard_dual_compare` | dual-column comparison |
| `scoring_ladder` | score ladder |
| `insurance_results_chart_card` | chart card |
| `paired_period_comparison` | paired bars / paired stacked bars |
| `stacked_contribution_split` | horizontal stacked bar |
| `practice_agenda` | agenda list |
| `practice_section_divider` | photo chapter divider |
| `observation_with_timeline` | observation timeline |
| `two_case_with_center_mechanism` | case cards + node mechanism |
| `three_recommendation_cards` | numbered recommendation cards |
| `case_evidence_panel` | evidence quote + advice blocks |
| `risk_network_diagram` | node-link risk network |

## Ask User When

- 数据形状可以支持多个图表且结论不同。
- 图表会暗示因果关系但数据只支持相关性。
- 用户要求的图表与数据形状不匹配。
- 需要在可编辑性和像素精确之间取舍。
- 图表缺少基准但页面标题是强判断。
- 样本口径不一致，可能导致图表误导。
