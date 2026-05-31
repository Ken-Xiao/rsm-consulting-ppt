# Universal Page Family Registry

用于把 `ppt版式/` 的版面结构从具体主题中抽离出来，形成跨主题可复用的通用 page family。核心原则是：

```text
内容逻辑 → 通用 page family → 当前 visual profile 的 design tokens → 最终页面
```

也就是说，参考版式主要提供 **layout grid、component spec、图表/表格/图片语法**；颜色、字体、页眉页脚、RSM chrome 和品牌细节由当前 `visual_profile` 的 token 注入。不要因为引用了英文参考 deck，就复制英文叙事、英文语气或整套视觉主题。

## When To Use

必须在以下情况读取本文件：

- 用户要求跨主题复用版式。
- 用户提供 `ppt版式/` 或 `assets/reference-layouts/` 作为备选版式库。
- `insight_layout_map.json` 已有推荐 page family，但当前 visual profile 白名单没有完全匹配。
- 需要把咨询最终汇报、诊断、pitch、股研、QBR、项目申请等版式迁移到中文金融咨询材料。

## Canonical Families

### 1. `governing_thought`

用于执行摘要、董事会总答案、项目总判断。

- Layout: 左侧 55%-65% 放 1 条主判断 + 2-3 条证据；右侧放关键数字卡或小型证据矩阵。
- Required slots: `claim_title`, `answer_statement`, `proof_points[]`, `kpi_strip[]`, `management_implication`。
- Visual grammar: 大标题必须是判断句；证据卡不超过 3 个；避免长段背景。
- Source examples: `consulting-final-deck/governing_thought`, `consulting-diagnostic-audit-deck/executive_answer`, `equity-research-earnings-deck/earnings_summary`。

### 2. `chapter_divider`

用于章节页、章节转折、叙事节奏重置。

- Layout: 章节编号 + 章节名称 + 一句章节问题/章节答案 + 专业图片或抽象行业图。
- Required slots: `section_number`, `section_title`, `section_question_or_answer`, `image_role`, `image_prompt_or_source`。
- Visual grammar: 不放正文证明；不放复杂表格；图片只承担节奏锚点。
- Source examples: `consulting-final-deck/chapter_divider`, `rsm-practice-sharing/practice_section_divider`。

### 3. `evidence_exhibit`

用于单页证明一个核心发现，适合图表 + insight panel。

- Layout: 主证据对象占 58%-70%；右侧或底部放 2-3 个 insight cards。
- Required slots: `claim_title`, `story_subtitle`, `primary_evidence`, `annotations[]`, `insight_cards[]`, `source_note`。
- Visual grammar: 一页只放一个主图/主表；图表必须有观点、基准和标注优先级。
- Source examples: `consulting-final-deck/evidence_exhibit`, `insurance_results_chart_card`, `chart_plus_insight_panel`。

### 4. `comparison_table`

用于主体对标、方案对比、政策制度比较、公司横向比较。

- Layout: 表格占 65%-75%；右侧或底部放 `so_what`；列数建议 3-7，行数建议 6-12。
- Required slots: `comparison_subjects[]`, `criteria[]`, `table_values`, `semantic_markers`, `takeaway`。
- Visual grammar: 不使用裸表；必须有色彩语义、排序逻辑、重点行/列和读法说明。
- Source examples: `consulting-final-deck/option_comparison`, `global_policy/jurisdiction_matrix`, `layout-comparison-table.html`。

### 5. `bridge_waterfall`

用于利润、收入、资本、估值、IRR、缺口等贡献拆解。

- Layout: 主 bridge/waterfall 占主体宽度；上方或右侧放结论条；底部放口径说明。
- Required slots: `start_value`, `steps[]`, `end_value`, `drivers[]`, `bridge_readout`, `source_note`。
- Visual grammar: 正负贡献颜色固定；关键步骤必须标注；不要用饼图替代贡献拆解。
- Source examples: `equity-research-earnings-deck/revenue_bridge`, `equity-research-earnings-deck/eps_bridge`。

### 6. `kpi_dashboard`

用于摘要页、经营概览、业绩快照、监管指标盘点。

- Layout: 4-8 个 KPI 卡片 + 1 个总体结论条；卡片可分组。
- Required slots: `kpis[]`, `period`, `benchmark`, `rank_or_change`, `overall_readout`。
- Visual grammar: 卡片大数字必须可读；每个 KPI 要有单位、期间和对比基准。
- Source examples: `sunong/kpi_dashboard`, `equity-research-earnings-deck/print_snapshot`, `crm-funnel-qbr-deck/bookings_vs_plan`。

### 7. `effort_impact_matrix`

用于机会优先级、行动排序、风险优先级。

- Layout: 2x2 矩阵占 60%-70%；右侧列出优先行动和延后事项。
- Required slots: `x_axis`, `y_axis`, `items[]`, `priority_zone`, `recommended_actions[]`。
- Visual grammar: 坐标轴含义必须业务化；高优先级象限要明确下一步。
- Source examples: `consulting-diagnostic-audit-deck/effort_impact_2x2`。

### 8. `action_roadmap`

用于 90 天计划、12 个月路线图、转型路径、项目工作计划。

- Layout: 横向时间轴或分阶段 swimlane；下方放 KPI/责任/依赖。
- Required slots: `phases[]`, `workstreams[]`, `milestones[]`, `owners[]`, `success_metrics[]`。
- Visual grammar: 行动必须有时间、责任、产出和依赖；不要只写方向性 bullet。
- Source examples: `consulting-final-deck/implementation_roadmap`, `consulting-diagnostic-audit-deck/phase2_roadmap`, `consulting-capability-pitch/workplan`。

### 9. `decision_required`

用于上会决策、授权事项、下一步请求。

- Layout: 3-5 个决策项卡片；每个卡片包含事项、推荐选择、理由、风险、下一步。
- Required slots: `decision_items[]`, `recommended_option`, `rationale`, `risk_if_no_action`, `next_step`。
- Visual grammar: 必须写“要客户今天决定什么”；不能停留在总结页。
- Source examples: `consulting-final-deck/decisions_required`, `consulting-capability-pitch/decisions_required`, `crm-funnel-qbr-deck/asks_decisions`。

### 10. `risk_register`

用于风险清单、限制条件、合规风险、项目风险。

- Layout: 风险表格 + 缓释动作；可用 RAG 色彩。
- Required slots: `risk_items[]`, `likelihood`, `impact`, `mitigation`, `owner`, `trigger`。
- Visual grammar: 风险必须有触发条件和缓释动作；不要只写“关注风险”。
- Source examples: `sbir-rd-grant-deck/risk_register`, `consulting-final-deck/sensitivity_tornado`。

### 11. `methodology_map`

用于研究方法、分析框架、项目路径、评分方法。

- Layout: 左侧框架图/流程图；右侧说明输入、方法和输出。
- Required slots: `method_steps[]`, `inputs[]`, `outputs[]`, `limitations[]`。
- Visual grammar: 方法页要说明为什么该方法能回答客户问题；限制条件不能省略。
- Source examples: `consulting-final-deck/approach_map`, `consulting-capability-pitch/methodology`。

### 12. `case_or_proof_stack`

用于案例、资质证明、能力 pitch、类似项目经验。

- Layout: 3 个案例卡或证据堆栈；每个卡片含场景、动作、结果。
- Required slots: `proof_items[]`, `context`, `action`, `outcome`, `relevance_to_client`。
- Visual grammar: 案例必须说明与当前客户问题的相关性。
- Source examples: `consulting-capability-pitch/proof_stack_overview`, `consulting-capability-pitch/comparable_case`。

### 13. `funnel_or_process`

用于流程传导、销售漏斗、处置流程、审批/合规流程。

- Layout: 横向或纵向流程；关键节点配指标和损耗/转化。
- Required slots: `stages[]`, `conversion_or_loss[]`, `bottlenecks[]`, `action_points[]`。
- Visual grammar: 每个阶段要有状态、指标或责任；不画纯装饰流程。
- Source examples: `crm-funnel-qbr-deck/top_of_funnel`, `crm-funnel-qbr-deck/stage_conversion`。

### 14. `sensitivity_or_scenario`

用于压力测试、敏感性矩阵、情景模拟。

- Layout: 主矩阵/热力图 + 情景假设 + 管理读法。
- Required slots: `scenario_assumptions[]`, `matrix_values`, `base_case`, `downside_case`, `management_readout`。
- Visual grammar: 假设和输出必须同页或相邻页；情景不能写成事实。
- Source examples: `consulting-final-deck/sensitivity_tornado`, `global_policy/scenario_table`。

### 15. `team_or_governance`

用于项目团队、治理机制、组织责任和协作模式。

- Layout: 组织/团队卡片 + 治理节奏 + 决策机制。
- Required slots: `roles[]`, `responsibilities[]`, `cadence`, `decision_rights`, `escalation_path`。
- Visual grammar: 责任边界要清楚；避免只放头像和职务。
- Source examples: `consulting-capability-pitch/named_team`, `consulting-diagnostic-audit-deck/governance`。

## Mapping Rules

1. 先根据 `logic_relationship` 选择 canonical family：
   - 总答案/总判断 → `governing_thought`
   - 单证据证明 → `evidence_exhibit`
   - 对比/选择 → `comparison_table`
   - 贡献拆解 → `bridge_waterfall`
   - 行动路径 → `action_roadmap`
   - 授权事项 → `decision_required`
   - 风险/限制 → `risk_register`
2. 再根据 `visual_profile` 注入 `assets/design-tokens.json` 的颜色、字体和 chrome。
3. 最后在 `template-manifest.json` 或 reference layout 中选择最接近的实现模板。
4. 若 canonical family 能表达内容，但当前 profile 没有专属模板，允许使用 `reference_derived` 模式，但必须记录：
   - `canonical_family`
   - `source_reference_profile`
   - `source_preview`
   - `token_set`
   - `replication_scope`
   - `adaptation_notes`

## Output Fields

`preset_map.json` 每页建议包含：

```json
{
  "page_id": "P08",
  "visual_profile": "rsm-insurance-results",
  "canonical_family": "evidence_exhibit",
  "page_family": "chart_plus_insight_panel",
  "source_reference_profile": "consulting-final-deck",
  "source_reference_family": "evidence_exhibit",
  "source_preview": "assets/reference-layouts/consulting-final-deck/previews/05-05-market-attractiveness.png",
  "token_set": "rsm-insurance-results",
  "layout_lock_status": "locked",
  "layout_lock_reason": "单一主图 + 右侧管理含义最适合证明本页判断",
  "density_level": "analysis",
  "design_token_status": "applied"
}
```

## Anti-Patterns

- 把英文参考页的颜色、字体、标题语气整套搬进中文金融 deck。
- 因为当前 profile 白名单没有某个 page family，就临时发明新布局。
- 同一章节内混用 3 套以上参考结构，造成版式跳跃。
- 只记录“参考 consulting-final-deck”，不写具体 source preview 和 adaptation notes。
- 让图片承担事实证明；图片只能作为章节、场景或案例辅助，事实仍由图表/表格/来源证明。
