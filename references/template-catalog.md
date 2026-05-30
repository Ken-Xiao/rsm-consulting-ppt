# Template Catalog

参考 `mckinsey-pptx` 的做法，本目录用于帮助 agent 决定“这一页该用什么版式”。不要机械套模板；先判断页面意图，再选择最合适的证明对象。

通用可选字段：

- `title`：结论标题。
- `subtitle`：说明为什么读这一页。
- `source`：来源条。
- `page_number`：页码。
- `section_marker`：章节/模块标签。

## 1. cover

**Use when**：独立 PPT 的第一页。
**Do not use when**：章节分隔，用 `dark_statement` 或 `module_summary`。
**Required content**：项目名、核心判断、客户/机构、日期。
**Layout cue**：深蓝主视觉 + 左侧或底部元数据条。

## 2. executive_takeaways

**Use when**：需要 2-4 条摘要，每条有 1-3 个支撑点。
**Do not use when**：只有一句核心判断，用 `dark_statement`。
**Required content**：`takeaways[{claim, evidence}]`。
**Layout cue**：纵向证据卡或 2x2 摘要卡，底部给出建议或下一步。

## 3. dark_statement

**Use when**：章节转折、北极星结论、必须让读者记住的一句话。
**Do not use when**：页面需要承载很多事实细节。
**Required content**：一句核心判断。
**Layout cue**：深蓝满版或深蓝横幅；正文不超过 2 行。

## 4. issue_answer_matrix

**Use when**：法律、合规、风控或投决问题需要逐项回答。
**Do not use when**：只是普通风险清单，用 `risk_control_matrix`。
**Required content**：`issues[{question, answer, basis, control}]`。
**Layout cue**：每个问题一张卡或一行矩阵；判断标签使用绿/金/红。

## 5. option_comparison

**Use when**：比较 2-4 个方案并推荐其中一个。
**Do not use when**：只有单一推荐方案，用 `transaction_structure` 或 `issue_answer_matrix`。
**Required content**：方案、标准、判断、推荐理由。
**Layout cue**：横向比较表；推荐方案用蓝色高亮，不用大面积红绿。

## 6. transaction_structure

**Use when**：展示 SPV、债务人、信托、服务商、供应商等交易角色关系。
**Do not use when**：只是普通流程步骤，用 `process_sequence`。
**Required content**：主体、合同关系、债权关系、付款关系、通知关系。
**Layout cue**：主债权链居上，下游履约链居中，回款/票据/信息流居下。

## 7. multi_flow_map

**Use when**：合同流、资金流、发票流、信息流需要对齐说明。
**Do not use when**：只展示一条线性流程。
**Required content**：每条流的节点、方向、关键凭证。
**Layout cue**：分泳道展示；每条泳道一行，节点位置尽量对齐。

## 8. risk_control_matrix

**Use when**：展示风险、影响、控制动作、责任方或文件证据。
**Do not use when**：需要回答“是否可行”的法律问题，用 `issue_answer_matrix`。
**Required content**：`risks[{risk, impact, control, owner/evidence}]`。
**Layout cue**：2x2 或表格；风险用红/金，控制用蓝/绿。

## 9. evidence_checklist

**Use when**：说明交易落地必须准备哪些合同、发票、验收或通知文件。
**Do not use when**：需要展示时间顺序，用 `process_sequence`。
**Required content**：文件清单、用途、对应风险点。
**Layout cue**：左侧文件组，右侧用途/核查要点。

## 10. process_sequence

**Use when**：4-7 个顺序步骤必须按先后执行。
**Do not use when**：步骤可归并为三大阶段，用 `three_phase_roadmap`。
**Required content**：步骤名、关键动作、输出文件。
**Layout cue**：横向流程或编号竖排；每步文字不超过两行。

## 11. three_phase_roadmap

**Use when**：落地路径可归为三个阶段，例如“建立基础 / 组织履约 / 转让债权”。
**Do not use when**：必须逐项展示 6-7 个合同签署步骤，用 `process_sequence`。
**Required content**：三阶段名称、核心动作、核查点。
**Layout cue**：三张并列阶段卡，底部给出审查口径。

## 12. fee_or_value_stack

**Use when**：展示费用构成、收入分解、资金池构成或价值分配。
**Do not use when**：没有金额或占比关系。
**Required content**：总额、组成项、占比、合规/业务含义。
**Layout cue**：堆叠条 + 组成卡；避免只用表格。

## 13. role_boundary_compare

**Use when**：需要区分“谁负责 / 谁不负责”“SPV / 装修公司”等职责边界。
**Do not use when**：只是普通优劣势对比。
**Required content**：可承担事项、不承担事项、执行口径。
**Layout cue**：左右对照，中间放边界提示。

## 14. module_summary

**Use when**：章节结尾，需要总结结论、证据和下一模块。
**Do not use when**：短 deck 不需要章节小结。
**Required content**：模块编号、核心结论、3 个证据点、下一步。
**Layout cue**：左侧深蓝模块栏，右侧证据卡。

## 15. appendix_dense_table

**Use when**：必须保留合同条款、口径、文件清单等密集内容。
**Do not use when**：正文页可以讲清楚；正文不要滥用 appendix 版式。
**Required content**：表头、分组、来源。
**Layout cue**：只在附录中使用相对密集字号；正文页不要用附录小字。即使是附录，也必须有清晰行列层级和页脚来源。

## 16. kpi_dashboard

**Use when**：需要在一页展示 4-8 个核心指标，作为执行摘要、经营复盘或 KPI 目标页。
**Do not use when**：只有一个关键数字，用 `dark_statement` 或单数字英雄页。
**Required content**：`kpis[{label, value, unit, change/rank, interpretation}]`。
**Layout cue**：2x2 或 4 列卡片；每张卡必须有大数字、标签、口径/排名和一句解释。

## 17. ranking_bar

**Use when**：展示同业、项目、资产或方案在单一指标上的排名。
**Do not use when**：比较维度超过 3 个，用 `option_comparison` 或矩阵。
**Required content**：主体、同业/样本、指标值、排名方向、中位线或阈值。
**Layout cue**：横向条形图；焦点主体高亮；右侧放 2-3 条解释。

## 18. trend_line

**Use when**：展示单一或少数指标的多年趋势、季度变化或预测轨迹。
**Do not use when**：系列超过 4 条；改用分面图或表格。
**Required content**：时间序列、单位、关键转折点、解释。
**Layout cue**：折线或柱线组合；直接标注关键点，避免复杂图例。

## 19. scatter_regression

**Use when**：展示两个指标之间的关系、估值解释或主体定位。
**Do not use when**：样本少于 5 个或关系无法解释。
**Required content**：x/y 指标、样本点、焦点主体、趋势线/象限解释。
**Layout cue**：焦点主体高亮，右侧写“观察/含义/结论”。

## 20. bridge_waterfall

**Use when**：展示估值、利润、现金流、EVA 或价格差异的分解传导。
**Do not use when**：没有明确起点、增减项和终点。
**Required content**：起点、增项、减项、终点、每项口径。
**Layout cue**：瀑布/桥接图；颜色区分正负，底部放口径说明。

## 21. sensitivity_matrix

**Use when**：展示 IRR、估值、DSCR、现金流覆盖等对两个变量的敏感性。
**Do not use when**：只有一个变量变化，用 `trend_line` 或情景表。
**Required content**：行变量、列变量、结果值、基准情景。
**Layout cue**：热力矩阵；基准格高亮；旁边解释安全边界。

## 22. scenario_table

**Use when**：比较基线、压力、乐观或行动后三类情景。
**Do not use when**：变量是连续二维敏感性，用 `sensitivity_matrix`。
**Required content**：情景、假设、核心指标、管理含义。
**Layout cue**：三列或四列表格；假设和输出分层。

## 23. policy_philosophy_map

**Use when**：把多个国家、司法辖区、监管体系或政策模式放进二维监管哲学坐标。
**Do not use when**：只有单一维度排名，用 `ranking_bar` 或 `scoring_ladder`。
**Required content**：x/y 轴定义、样本点、类型标签、每类一句解释。
**Layout cue**：主体为 2x2 坐标，底部放 6-8 个类型卡；样本标签用白卡，底色用低饱和象限色。

## 24. jurisdiction_matrix

**Use when**：多个国家/司法辖区需要按统一维度做横向比较。
**Do not use when**：只比较 2 个体系，用 `standard_dual_compare`。
**Required content**：`jurisdictions[]`、`dimensions[]`、每格 1-3 行短文本、来源。
**Layout cue**：左侧维度列深蓝，顶部样本列亮蓝；各样本列低饱和浅色。主体区适合 HTML/Playwright 渲染。

## 25. jurisdiction_chapter_cover

**Use when**：跨区域/跨政策报告进入单一国家、地区或制度章节。
**Do not use when**：普通章节转折无样本属性，用 `dark_statement`。
**Required content**：地区/制度名称、一句话定位、核心特征、3-4 个指标卡。
**Layout cue**：可用城市/机构背景图、半透明白色结论条、底部指标卡；标题和页脚仍应可编辑。

## 26. policy_framework_cards

**Use when**：解释单一制度的 4 个核心组成部分，如会计框架、税务规则、触发条件、监管协同。
**Do not use when**：内容是方案取舍，用 `option_comparison`。
**Required content**：`cards[{title, summary, rule_box, icon}]`。
**Layout cue**：2x2 卡片；每卡左侧蓝色竖线，内部浅蓝规则框。

## 27. policy_timeline

**Use when**：展示政策沿革、监管改革、准则实施或制度演进。
**Do not use when**：展示执行步骤，用 `process_sequence`。
**Required content**：年份、政策事件、影响说明。
**Layout cue**：年份醒目，事件名称加粗，说明一行到两行；同一页最多 6 个节点。

## 28. behavior_impact_triad

**Use when**：解释政策对机构行为的三类影响，如资本利润、拨备行为、不良处置。
**Do not use when**：只有风险和控制动作，用 `risk_control_matrix`。
**Required content**：3 个影响卡，每卡有机制说明、证据条和管理含义。
**Layout cue**：三栏高卡片，底部浅色证据条；负面关键数据可用红色强调。

## 29. industry_response_grid

**Use when**：总结银行、监管者、投资者或企业在某制度下的应对策略。
**Do not use when**：需要顺序执行路径，用 `three_phase_roadmap`。
**Required content**：4 个策略卡，每卡有行动、要求、指标或文件证据。
**Layout cue**：2x2 策略卡，蓝色图标 + 标题，底部可放一个量化指标条。

## 30. standard_dual_compare

**Use when**：比较两个准则、模型或政策体系，如 IFRS 9 vs CECL。
**Do not use when**：样本超过 2 个，用 `jurisdiction_matrix`。
**Required content**：左右体系的定义、关键规则、实施特点、核心差异。

**Layout cue**：左右两栏，底部或右侧放“关键差异”。

## 31. scoring_ladder

**Use when**：按若干维度为国家、制度或方案评分。
**Do not use when**：没有统一评分维度或分数口径不稳定。
**Required content**：样本、评分维度、总分、评分口径。
**Layout cue**：每个样本一行，右侧总分突出；维度标签保持一致。

## 32. insurance_results_chart_card

**Use when**：上市保险/银行/金融机构业绩盘点中的单页核心图表，如利润结构、综合收益、承保收入、费用分摊、投资收益。
**Do not use when**：页面主要是案例文本或流程建议，用 `case_evidence_panel` 或 `three_recommendation_cards`。
**Required content**：一句结论、1-2 条关键观察、主图、口径说明、来源。
**Layout cue**：顶部亮蓝总标题 + 右上浅蓝模块胶囊；中部浅灰结论条；下方白色阴影图表卡。主图可为双期间并列条形图、堆叠条或柱线组合。

## 33. paired_period_comparison

**Use when**：同一指标需要比较两个年度/两个准则口径，如 2025 vs 2024、新准则 vs 旧准则。
**Do not use when**：只是多年趋势，用 `trend_line`。
**Required content**：两个期间、统一样本、指标分项、差异解释。
**Layout cue**：左右两组图表或左右两列堆叠条，中间放样本名称列；颜色和坐标轴完全一致，差异标签直接贴在图上。

## 34. stacked_contribution_split

**Use when**：解释利润、收入、费用、投资收益、资产结构等由多个组成项贡献。
**Do not use when**：组成项没有合计关系或正负项混杂太多；改用 `bridge_waterfall`。
**Required content**：总额、组成项、占比/金额、负项处理、口径说明。
**Layout cue**：横向堆叠条优先；颜色固定为亮蓝、深蓝、灰、浅蓝；负值用灰色短条或反向条，不用饼图。

## 35. practice_photo_cover

**Use when**：行业实践分享、培训材料、案例经验分享的封面。
**Do not use when**：严肃董事会材料或政策比较报告封面。
**Required content**：主题、机构、日期、logo。
**Layout cue**：右侧或全幅建筑/金融场景照片，左侧白色留白放标题；标题使用亮蓝书法感中文；配半透明方块拼贴和亮蓝竖条。

## 36. practice_agenda

**Use when**：实践分享型材料目录。
**Do not use when**：只有 2 个部分，用普通章节导航即可。
**Required content**：3-5 个模块、每个模块页码范围。
**Layout cue**：左侧照片带白色几何方块，右侧目录列表；每行用浅灰分隔线，页码右对齐，当前/重点模块可用浅蓝短线。

## 37. practice_section_divider

**Use when**：实践分享型材料进入新章节。
**Do not use when**：财务结果盘点章节，用 `dark_statement` 或 `insurance_results_chart_card` 的模块胶囊。
**Required content**：章节编号、章节名称、专业图片、可选章节问题/章节答案。
**Layout cue**：左侧或半幅建筑照片，右侧大号灰色章节编号和黑色/深灰章节名，页面边缘放亮蓝竖条，白色几何方块拼贴。可参考 `assets/layouts/layout-practice-section-divider.html`。

## 38. observation_with_timeline

**Use when**：不良处置/合规风险/流程缺陷页，需要列出 2-4 个观察并解释影响。
**Do not use when**：观察之间没有顺序或层级；改用 `risk_control_matrix`。
**Required content**：观察标题、观察解释、证据或案例、管理含义。
**Layout cue**：右侧竖向时间线/观察线，亮蓝圆点标记观察；左侧放图表或结论框；每个观察不超过 3 行正文。

## 39. two_case_with_center_mechanism

**Use when**：两个案例共同证明一个机制、通道或风险传导。
**Do not use when**：只有一个案例，用 `case_evidence_panel`。
**Required content**：案例一、案例二、中心机制图、核心警示。
**Layout cue**：左右各一张白色案例卡，中间用蓝色横条或关系图连接；中心机制用 4 个胶囊节点或角色关系图表达。

## 40. three_recommendation_cards

**Use when**：给出 3 条行动建议、整改要点、估值控制点或流程优化项。
**Do not use when**：建议超过 4 条；改用 `industry_response_grid`。
**Required content**：编号、建议标题、一句话动作、适用场景。
**Layout cue**：三张竖向白卡，顶部亮蓝圆形编号或进度环，卡片轻阴影；左侧可保留案例证据文本。

## 41. case_evidence_panel

**Use when**：单页展示案例事实、政策依据、案例发现和建议。
**Do not use when**：需要复杂交易结构图，用 `transaction_structure` 或 `risk_network_diagram`。
**Required content**：案例事实、引用规则/依据、发现、建议。
**Layout cue**：上方标题线，中部大浅灰引用/证据框，底部 2 个蓝色图标建议块；右侧可放淡化照片。

## 42. risk_network_diagram

**Use when**：保险非标、不良资产、关联方受让、SPV/基金/项目公司等复杂风险传导。
**Do not use when**：简单线性流程，用 `process_sequence`。
**Required content**：主体节点、投资/债权/控制/资金流关系、风险点、最终影响。
**Layout cue**：中心放 3-6 个角色节点，箭头按关系类型分色；底部用 2-3 条风险解释，避免把所有合同细节塞进图中。

## 43. insurance_photo_cover

**Use when**：保险/金融业绩盘点报告封面，尤其是 `rsm-insurance-results` 默认风格。
**Do not use when**：不良处置培训或实践分享封面，用 `practice_photo_cover`。
**Required content**：主标题、副标题、团队/机构、日期、logo、横向金融数据图片。
**Layout cue**：浅蓝灰背景，左上深蓝大标题，中下横向金融图片，右侧 RSM 三色竖条，右上 logo，低透明点阵/线图装饰。

## 44. insurance_section_divider

**Use when**：保险/金融结果分析进入新章节。
**Do not use when**：实践分享章节页，用 `practice_section_divider`。
**Required content**：章节编号、章节名称、专业图片、logo、版权，可选章节问题/章节答案。
**Layout cue**：上半蓝色玻璃建筑照片，中部浅灰白标题带，左侧深蓝编号块，右侧亮蓝竖条。图片可按 `section-divider-image-protocol.md` 生成。

## 45. insurance_agenda

**Use when**：保险/金融结果分析目录页。
**Do not use when**：实践分享目录页，用 `practice_agenda`。
**Required content**：3-6 个章节、章节编号、页码范围。
**Layout cue**：白底或浅蓝背景，左侧/顶部可放低透明建筑照片，章节列表使用亮蓝编号、浅灰分隔线和右对齐页码。

## 46. practice_quote_evidence

**Use when**：不良处置实践分享中展示政策原文、案例发现和底部建议。
**Do not use when**：只需要两个案例互证，用 `two_case_with_center_mechanism`。
**Required content**：规则/政策依据、案例发现、2 个建议或审计关注点。
**Layout cue**：标题三段线；中部大浅灰引用框；右侧淡化金融照片+亮蓝竖条；底部蓝色图标建议块。

## 47. global_policy_cover

**Use when**：全球/跨司法辖区政策比较报告封面，例如贷款核销制度、IFRS 9/CECL、税务协同、监管哲学比较。
**Do not use when**：普通经营诊断或保险业绩盘点封面，用 `insurance_cover` 或 `sunong_dark_cover`。
**Required content**：报告题目、副标题、司法辖区范围、机构/团队、日期、研究目的。
**Layout cue**：极浅建筑背景 + 左侧亮蓝/深蓝竖条 + 大号亮蓝标题 + 右下 RSM 标识。

## 48. global_policy_agenda

**Use when**：跨区域政策比较报告需要展示研究框架和核心维度。
**Do not use when**：只是普通目录页，用 `insurance_agenda` 或 `practice_agenda`。
**Required content**：研究框架、核心维度、样本/范围说明、页码或章节映射。
**Layout cue**：白底，顶部亮蓝大标题和三段横线，左右两栏，底部浅灰范围说明框。

## 49. global_policy_dark_summary

**Use when**：全球政策比较报告需要做总结与展望、核心启示或高层记忆点。
**Do not use when**：正文证据页需要展示具体制度细节，用 `policy_framework_cards` 或 `jurisdiction_matrix`。
**Required content**：核心启示、未来展望/管理含义、3-4 个关键数字或记忆点。
**Layout cue**：深蓝到亮蓝渐变背景，两张半透明内容卡，底部大数字 strip。

## 50. policy_framework_cards_global

**Use when**：解释单一司法辖区、单一制度或监管框架的 4 个组成部分；实际 preset 仍使用 `policy_framework_cards`。
**Do not use when**：需要多国家横向比较，用 `jurisdiction_matrix`；需要二维定位，用 `policy_philosophy_map`。
**Required content**：4 个框架卡，每卡含标题、机制解释、规则框/适用边界。
**Layout cue**：2x2 浅灰卡片，左侧亮蓝竖线，卡内浅蓝规则框。

## 51. sunong_dark_cover

**Use when**：苏农/农商行/银行经营价值创造类董事会或管理层汇报封面。
**Do not use when**：全球政策研究或保险业绩盘点，用 `global_policy_cover` 或 `insurance_cover`。
**Required content**：客户名称、股票代码、主标题、副标题、报告元数据、阅读路径、日期。
**Layout cue**：深蓝渐变背景，左侧超大白色标题，右侧元数据栏，底部阅读路径。

## 52. sunong_chart_diagnostic

**Use when**：银行经营诊断页需要一个主图和右侧管理含义，例如同业排名、趋势、散点、桥接、雷达或情景图。
**Do not use when**：一页只需要 KPI 总览，用 `kpi_dashboard`；需要模块结束，用 `module_summary`。
**Required content**：结论标题、副标题、主图数据、图表读法、诊断含义、关键指标、来源。
**Layout cue**：白底，左上短亮蓝线，左侧大主图，右侧诊断卡和指标 strip。

## Choosing Rules

- 单一句核心判断：`dark_statement`
- 多条摘要：`executive_takeaways`
- “能不能 / 是否有效 / 有何前提”：`issue_answer_matrix`
- “谁和谁是什么关系”：`transaction_structure`
- “合同、资金、票据怎么对齐”：`multi_flow_map`
- “风险如何控制”：`risk_control_matrix`
- “落地先后顺序”：`process_sequence` 或 `three_phase_roadmap`
- “角色边界”：`role_boundary_compare`
- “金额/比例构成”：`fee_or_value_stack`
- “核心指标总览”：`kpi_dashboard`
- “同业/样本排名”：`ranking_bar`
- “多年趋势”：`trend_line`
- “估值或利润传导”：`bridge_waterfall`
- “双变量压力测试”：`sensitivity_matrix`
- “基线/压力/行动后比较”：`scenario_table`
- “多个司法辖区统一维度比较”：`jurisdiction_matrix`
- “监管哲学/政策类型定位”：`policy_philosophy_map`
- “进入单一国家/制度章节”：`jurisdiction_chapter_cover`
- “解释单一制度组成”：`policy_framework_cards`
- “制度演进”：`policy_timeline`
- “政策影响分析”：`behavior_impact_triad`
- “行业应对策略”：`industry_response_grid`
- “两个准则/模型比较”：`standard_dual_compare`
- “评分排序”：`scoring_ladder`
- “保险新准则/上市险企业绩拆解”：`insurance_results_chart_card`、`paired_period_comparison`、`stacked_contribution_split`
- “不良处置/案例实践分享”：`practice_photo_cover`、`practice_agenda`、`practice_section_divider`、`observation_with_timeline`、`two_case_with_center_mechanism`、`three_recommendation_cards`、`case_evidence_panel`
- “保险非标/不良资产复杂关系”：`risk_network_diagram`
- “保险业绩盘点封面/目录/章节”：`insurance_photo_cover`、`insurance_agenda`、`insurance_section_divider`
- “不良处置政策依据/案例发现”：`practice_quote_evidence`
- “全球政策比较封面/议程/总结”：`global_policy_cover`、`global_policy_agenda`、`global_policy_dark_summary`
- “全球政策框架卡”：`policy_framework_cards`
- “苏农/农商行价值创造封面”：`sunong_dark_cover`
- “银行经营诊断图表页”：`sunong_chart_diagnostic`
- “章节转折/章节节奏”：默认 `insurance_section_divider`；不良处置、培训分享、案例复盘用 `practice_section_divider`；图片生成和版权说明遵守 `section-divider-image-protocol.md`
