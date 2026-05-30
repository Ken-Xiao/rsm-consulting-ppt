# Sample Regression Test

用于确保 skill 更新后仍能生成稳定、专业的客户交付样张。每次大改视觉系统、preset、字号、渲染引擎、故事线规则或客户交付门槛后使用。

## Purpose

避免 skill 越改越散。通过固定样张测试：

- 默认视觉是否仍是 `rsm-insurance-results`。
- 字号是否达标。
- 图表卡、结论条、模块胶囊是否稳定。
- HTML layout 与 PPT 原生元素是否对齐。
- contact sheet 下是否能读出主标题和主图结构。
- 每页是否符合 exhibit composition，而不是只有标题和图。
- 是否通过 thumbnail、print 和 partner flip 三类成熟咨询观感测试。

如果更新涉及四套 visual profile、template manifest、HTML layout 或 PPTX 渲染策略，还必须读取 `references/visual-profile-registry.md` 和 `references/profile-regression-matrix.md`，按 profile 分组做样张覆盖。

## Profile Coverage Minimum

四个 canonical profile 的回归样张不得只覆盖单页视觉。每个 profile 至少覆盖 6 类页面；缺任一类时，该 profile 的 regression status 只能标记为 `partial`。

| Profile | Required sample coverage |
|---|---|
| `rsm-insurance-results` | cover, agenda/scope, section divider, chart card, chart+insight, executive summary/action |
| `rsm-practice-sharing` | cover, agenda, section divider, observation/case page, mechanism/process page, recommendation cards |
| `rsm-global-policy` | cover, agenda/framework, dark summary, policy philosophy map, jurisdiction matrix, policy framework cards/action implications |
| `sunong-value-creation` | dark cover, KPI dashboard, chart diagnostic, ranking/trend page, bridge/regression/sensitivity page, module summary/action page |

每类样张必须记录：

- `preset_family`
- `visual_profile`
- `template_file`
- `required_fields_present`
- `editable_elements_checked`
- `rasterized_elements_checked`
- `placeholder_leakage`
- `style_drift`

## Required Client-Delivery Sample Pages

客户交付回归样张应生成 10-15 页，默认 12 页。样张必须完整覆盖“客户问题 -> 证据 -> 路径取舍 -> 建议落地”。

1. `sample_01_cover`：保险/金融结果分析封面。
2. `sample_02_agenda`：目录页。
3. `sample_03_insurance_section_divider`：保险财务报告风章节页，验证章节编号、专业图片和标题带。
4. `sample_04_methodology_scope_limitations`：样本、期间、口径和限制说明。
5. `sample_05_executive_summary_grid`：执行摘要，回答 `client_question`。
6. `sample_06_issue_tree`：客户问题拆解为 3-5 个子问题。
7. `sample_07_results_chart_card`：单页核心图表卡，含洞察卡或指标 strip。
8. `sample_08_paired_period_comparison`：2025 vs 2024 或新旧准则双期间对比。
9. `sample_09_stacked_contribution_split`：利润/收入构成堆叠拆解。
10. `sample_10_chart_plus_insight_panel`：主图 + 右侧洞察卡，用于验证视觉充实度。
11. `sample_11_option_comparison`：2-4 个路径比较，并标出推荐路径。
12. `sample_12_risk_mitigation_matrix`：风险、影响、缓释、责任和预警指标。
13. `sample_13_management_action_plan`：责任、时间、输入、输出、指标。

已提供基础 HTML 样张模板：

- `assets/layouts/layout-executive-summary-grid.html`
- `assets/layouts/layout-option-comparison.html`
- `assets/layouts/layout-management-action-plan.html`
- `assets/layouts/layout-chart-plus-insight-panel.html`

如需扩展到 15 页，增加：

14. `sample_14_chapter_synthesis`：3 个发现卡 + 3 个关键数字 + 下一章引导。
15. `sample_15_recommendation_path`：三阶段推荐路径。
16. `sample_16_appendix_dense_table`：附录密表，验证正文/附录密度边界。

如果更新了实践分享视觉，再额外生成：

17. `sample_17_practice_section_divider`：不良处置实践分享章节页，验证生成图片、白色几何块和章节问题。
18. `sample_18_practice_observation`：观察 + 案例/建议页。
19. `sample_19_three_recommendation_cards`：三建议卡。

## Sample Storyline Requirement

样张必须包含：

```json
{
  "client_question": "新准则下利润改善是否可持续，下一阶段应重点监控哪些指标？",
  "client_answer": "短期改善更多来自投资和准则口径变化，后续应以承保质量、费用效率和投资收益稳定性作为监控主线",
  "decision_to_make": "是否建立承保、投资、费用三线监控机制",
  "recommended_path": "建立三线监控机制，并设置月度指标和季度复盘阈值"
}
```

标题连读必须形成完整故事线。执行摘要、方案比较和行动计划必须互相回链。

## Test Data Rules

- 可使用虚拟数据，但必须标注 `示例数据，不用于正式结论`。
- 示例公司名使用 `公司A`、`公司B`，不得误用真实客户。
- 示例页不能混入正式项目文件。

## QA Checklist

每张样张检查：

- 是否使用正确 visual profile。
- 是否符合 `client-delivery-standard.md`。
- 是否包含 `client_question`、`client_answer`、章节答案和页面 claim。
- 标题是否为结论句。
- 字号是否达到最低标准。
- 正文页有效内容占用面积是否达到 70%-82%。
- 主图是否位于白色阴影卡内。
- 主图是否有焦点、基准、单位、口径、图内结论和来源。
- 图表数据少时是否补充洞察卡、指标 strip 或口径卡。
- 结论条是否不超过 3 行。
- 方案页是否比较至少两个路径并给出推荐理由。
- 建议页是否包含责任、时间、指标、输出或触发条件。
- 来源条和页码是否位置稳定。
- 图例、标签、单位是否清楚。
- contact sheet 下是否能辨认主结构。
- 缩略图下是否能看出整份 deck 的章节节奏。
- 是否通过 `exhibit-composition-standard.md`：scope、主证据、标注、辅助读法、来源边界完整。
- 核心图表是否通过 `professional-chart-rulebook.md`：观点、基准、比较口径、标注、单位、样本、期间、来源和 lineage 完整。
- 图片是否通过 `professional-image-rulebook.md`：图片角色、来源/prompt、使用边界、版权说明和 visual profile 完整。
- 核心结论是否通过 `conclusion-evidence-matrix.md`：结论、证据、证据强度、限制和页面回链完整。
- 标题和建议是否通过 `client-meeting-minutes-test.md`：可直接进入会议纪要。
- 是否通过 `presentation-polish-checklist.md`：对齐、视觉重量、标签图例、缩略图、打印和快速翻阅检查。
- 章节页是否符合 `section-divider-image-protocol.md`：专业图片、章节编号、章节名、短章节问题和生成图片元数据完整。
- 是否通过 `editable-component-standard.md`：客户会改的标题、建议、来源、行动计划和关键数字保持可编辑。
- 是否通过 `logic-gate-checklist.md`：标题链、章节答案、页面 claim、证据对象、管理含义和决策路径完整。
- 是否通过 `language-style-library.md`：当前受众语气、负面判断替代表达和建议句式达标。

## Mature Consulting View Tests

除逐页检查外，必须做三类观感测试：

1. **Thumbnail Test**：在 contact sheet 中，是否能看出每页的主视觉结构和章节节奏。
2. **Print Test**：模拟 A4 横向打印，标题、结论条、主图标签和来源是否可读。
3. **Partner Flip Test**：快速翻阅 30 秒，是否能感受到完整故事线，是否存在半成品页或模板跑偏页。

## Output

建议输出：

```text
outputs/skill_regression/
├── sample_deck.pptx
├── contact_sheet.png
├── sample_pages/
│   ├── sample_01_cover.png
│   ├── sample_02_agenda.png
│   └── ...
└── regression_report.json
```

`regression_report.json`：

```json
{
  "visual_profile": "rsm-insurance-results",
  "samples": 12,
  "critical": 0,
  "warning": 1,
  "client_delivery": {
    "client_question_present": true,
    "decision_path_present": true,
    "consulting_archetypes_covered": [
      "methodology_and_limitations",
      "executive_summary_grid",
      "issue_tree",
      "option_comparison",
      "risk_mitigation_matrix",
      "management_action_plan"
    ]
  },
  "mature_consulting_view_tests": {
    "thumbnail_test": "pass",
    "print_test": "pass",
    "partner_flip_test": "warning",
    "exhibit_composition": "pass",
    "presentation_polish": "warning"
  },
  "issues": [
    {
      "page": "sample_04",
      "severity": "warning",
      "issue": "右侧标签略密",
      "fix": "缩短标签或增加图表卡内边距"
    }
  ]
}
```

## Profile-Specific Regression

四套 profile 大改后追加：

- `rsm-insurance-results`：验证保险封面、目录、章节页、模块胶囊、结论条、白色图表卡。
- `rsm-practice-sharing`：验证书法标题、三段标题线、建筑照片、案例证据页和三建议卡。
- `rsm-global-policy`：验证全球政策封面、研究框架、深色总结、监管哲学图、司法辖区矩阵和政策框架卡。
- `sunong-value-creation`：验证深蓝封面、KPI 仪表盘、主图诊断、桥接/回归/情景页和模块小结。

每组 profile 的 regression report 必须说明：

- 测试了哪些 `preset_family`。
- 哪些 template 仍缺样张。
- 是否出现 placeholder 泄露。
- 是否存在 profile 风格漂移。
- 是否存在不可编辑的客户关键内容。
- 是否满足 `visual-profile-registry.md` 的 6 类样张覆盖；不满足时标记为 `partial`。
