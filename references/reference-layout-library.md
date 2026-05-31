# Reference Layout Library

用于登记 `assets/reference-layouts/` 中的备选 PPT 版式。选择视觉风格、页面家族、HTML 预览或像素级复刻时读取本文件。

## Source Library

当前已纳入 6 套参考版式，来自用户提供的 `ppt版式/`：

| profile_id | Source path | Preview count | Best for | Dominant structure |
|---|---|---:|---|---|
| `consulting-final-deck` | `assets/reference-layouts/consulting-final-deck` | 20 | 客户最终汇报、董事会策略综合、尽调最终报告、交易建议 | Governing thought → 3 章证据 → so-what → roadmap → decisions |
| `consulting-diagnostic-audit-deck` | `assets/reference-layouts/consulting-diagnostic-audit-deck` | 18 | 经营诊断、降本增效、机会清单、转型一期诊断 | Executive answer → baseline → top opportunities → 2x2 → lever pages → roadmap |
| `consulting-capability-pitch` | `assets/reference-layouts/consulting-capability-pitch` | 17 | 咨询能力 pitch、RFP、beauty parade、竞争性提案 | Right-to-win → client understanding → differentiation → proof stack → team/commercials |
| `equity-research-earnings-deck` | `assets/reference-layouts/equity-research-earnings-deck` | 14 | 股研 earnings、业绩快评、估值更新、投研晨会 | Rating/PT panel → beat/miss bridge → guidance → model deltas → risks/catalysts |
| `crm-funnel-qbr-deck` | `assets/reference-layouts/crm-funnel-qbr-deck` | 16 | 销售漏斗、RevOps、QBR、经营例会 | Stage lock-in → push/pull/kill → funnel → waterfall → forecast/rep performance |
| `sbir-rd-grant-deck` | `assets/reference-layouts/sbir-rd-grant-deck` | 16 | 政府项目申请、研发路线、产业化计划、项目评审汇报 | Rubric mapping → technical objectives → Gantt → TRL → commercialization → risk/budget |

## Page Family Translation

将参考 deck 的页面翻译为本 skill 可调度的候选 page family：

### `consulting-final-deck`

- `governing_thought`: slide 02，适合总答案、董事会核心判断。
- `approach_map`: slide 03，适合研究方法、项目路径。
- `chapter_divider`: slides 04/09/14，适合章节转折。
- `evidence_exhibit`: slides 05/06/07/15，适合市场、客户、竞争、执行证据。
- `so_what_synthesis`: slides 08/13，适合章节小结和含义。
- `option_comparison`: slide 12，适合 build vs buy、方案对比。
- `sensitivity_tornado`: slide 16，适合敏感性和风险驱动。
- `implementation_roadmap`: slide 18，适合行动计划。
- `decisions_required`: slide 19，适合上会授权事项。

### `consulting-diagnostic-audit-deck`

- `executive_answer`: slide 02，适合 Minto/SCR 一页答案。
- `baseline_performance`: slide 04，适合经营基线。
- `top5_opportunities`: slide 05，适合机会池排序。
- `effort_impact_2x2`: slide 06，适合优先级矩阵。
- `lever_deep_dive`: slides 07-11，适合采购、SG&A、定价、营运资本等杠杆页。
- `rapid_root_cause`: slide 12，适合组织/决策权根因。
- `quick_wins`: slide 13，适合 90 天快赢。
- `phase2_roadmap`: slide 14，适合二阶段路径。
- `governance`: slide 16，适合治理机制。

### `consulting-capability-pitch`

- `right_to_win`: slide 02，适合为什么是我们。
- `client_understanding`: slide 03，适合客户问题理解。
- `differentiation`: slide 04，适合差异化判断。
- `proof_stack_overview`: slide 05，适合证据堆栈。
- `comparable_case`: slides 06-08，适合类似案例。
- `methodology`: slide 09，适合方法论。
- `workplan`: slide 11，适合项目工作计划。
- `engagement_model`: slide 12，适合协作机制。
- `named_team`: slide 13，适合团队页。
- `commercials`: slide 14，适合报价/商务。
- `decisions_required`: slide 16，适合客户下一步决策。

### `equity-research-earnings-deck`

- `rating_cover`: slide 01，适合评级、目标价、投资观点面板。
- `earnings_summary`: slide 02，适合业绩快评。
- `print_snapshot`: slide 03，适合公告快照。
- `revenue_bridge`: slide 04，适合收入 beat/miss bridge。
- `eps_bridge`: slide 05，适合 EPS bridge。
- `segment_geo`: slide 06，适合分部/区域拆解。
- `guidance_readthrough`: slide 07，适合指引解读。
- `kpi_operator`: slide 08，适合经营 KPI。
- `estimate_revisions`: slide 09，适合预测调整。
- `valuation_update`: slide 10，适合估值更新。
- `risk_catalyst_map`: slide 11，适合风险/催化。

### `crm-funnel-qbr-deck`

- `stage_lockin`: slide 02，适合口径锁定。
- `push_pull_kill`: slide 03，适合管理动作清单。
- `top_of_funnel`: slide 04，适合漏斗入口。
- `stage_conversion`: slide 05，适合阶段转化。
- `qualification_score`: slide 06，适合 MEDDIC/SPICED 评分。
- `pipeline_waterfall`: slide 07，适合 pipeline waterfall。
- `bookings_vs_plan`: slide 08，适合计划达成。
- `deal_velocity`: slide 09，适合速度/周期。
- `winrate_rep`: slide 10，适合人员绩效。
- `forecast_accuracy`: slide 12，适合预测准确性。
- `asks_decisions`: slide 15，适合管理层决策。

### `sbir-rd-grant-deck`

- `rubric_significance`: slide 02，适合项目意义。
- `innovation`: slide 03，适合创新性。
- `phase_results`: slide 04，适合既有成果。
- `technical_objectives`: slide 05，适合技术目标。
- `workplan_gantt`: slide 06，适合 Gantt。
- `trl_progression`: slide 07，适合成熟度路线。
- `rigor_feasibility`: slide 08，适合可行性。
- `commercial_market`: slide 10，适合市场空间。
- `channel_revenue`: slide 11，适合商业化收入。
- `transition_partner`: slide 12，适合合作伙伴。
- `risk_register`: slide 13，适合风险台账。
- `budget`: slide 14，适合预算。
- `rubric_map`: slide 16，适合评分映射。

## How To Use

1. 先用 `scenario-layout-selector.md` 判断业务场景。
2. 再用 `universal-page-family-registry.md` 把内容逻辑映射到跨主题 `canonical_family`。
3. 从本文件选 1-2 套候选版式，只提取版面结构，不复制英文叙事、颜色、字体或整套主题。
4. 用 `reference-layout-analysis-framework.md` 提取像素级复刻规则。
5. 在 `layout_analysis_report.json` 中写明：采用哪套参考、哪些页面采用、哪些仍沿用 RSM 默认、注入哪个 `token_set`。
6. 在 HTML preview 阶段至少预览 2 张采用参考版式的关键页。

## Agent Loading Guidance

为避免 100+ 个 HTML slide 把上下文挤满，读取参考版式时按以下顺序渐进加载：

| Situation | Read | Do not read |
|---|---|---|
| 只需要选择候选版式 | 本文件 + `scenario-layout-selector.md` + `universal-page-family-registry.md` | 不读具体 HTML |
| 需要理解某套 deck 的 page family | 对应 `assets/reference-layouts/<profile>/SKILL.md` + 2-3 张 preview 文件名 | 不批量读取全部 slide HTML |
| 需要像素级复刻某一页 | 对应单页 HTML + 对应 CSS + preview PNG | 不读取该 deck 所有 HTML |
| 需要做完整模板沉淀 | 逐页读取，但分批处理，每批不超过 5 页 | 不在一次回复中读完整套库 |

参考版式在本 skill 中的角色是 **structure reference**：

- 可以继承：栅格比例、主证据区位置、卡片数量、图表/表格结构、标注位、图片裁切方式。
- 不默认继承：英文标题风格、英文 deck 的色板、logo/chrome、页脚系统、叙事顺序。
- 必须注入：当前 `visual_profile` 的 `assets/design-tokens.json` token set。

## Chinese Financial Translation Notes

英文 page family 进入中文金融材料时，按下列方式转译：

| English reference family | 中文金融常见用途 | 中文标题示范 |
|---|---|---|
| `governing_thought` | 执行摘要、董事会总答案 | `利润改善尚未完全转化为核心经营质量，应优先验证三项驱动` |
| `evidence_exhibit` | 单图/单表证明页 | `保费增长主要由寿险业务驱动，财险承保利润仍低于样本中位` |
| `option_comparison` | 方案比较、路径选择 | `方案二在资本占用和落地周期之间更均衡，适合作为优先路径` |
| `implementation_roadmap` | 12 个月行动计划 | `短期先锁定数据口径，中期再推进产品与渠道的结构调整` |
| `decisions_required` | 上会授权事项 | `本次会议需确认三项授权：样本口径、专项诊断范围和下一阶段里程碑` |
| `risk_register` | 风险与限制条件 | `三类风险需要在方案落地前设置触发阈值和责任部门` |

如果生成中文标题时只得到“背景介绍 / 方案说明 / 数据分析”这类主题词，必须回到 `consulting-language-playbook.md` 和 `number-expression-standard.md` 改写为判断句。
