# Deck Quality Scorecard

用于给金融咨询 PPT 做交付质量评分。完整项目、重要客户材料或大改后必须使用。

完整 review 或合伙人审稿时，同步读取 `references/quality-dashboard-standard.md`，输出 deck quality radar。

## Score Dimensions

总分 100 分：

| Dimension | Weight | Pass standard |
|---|---:|---|
| 故事线完整性 | 20 | 有客户问题、客户答案、章节答案；主标题连读形成清晰逻辑链，副标题承上启下 |
| 洞察和决策价值 | 20 | 每页有明确管理含义；建议比较可选路径、推荐路径、不行动后果并能回链证据 |
| 数据血缘和事实严谨性 | 20 | 关键数字、图表、判断可追溯 |
| 视觉和版式专业度 | 15 | 符合 visual profile，有页面节奏、密度层级、字号、对齐和留白稳定 |
| 图表语法 | 10 | 图表类型、单位、标签、颜色和口径正确；主图能证明页面判断 |
| 可编辑性和可维护性 | 10 | 关键文字/数字可编辑，图片化区域有源数据 |
| 语言和合规边界 | 5 | 标题句式专业，措辞客观，判断强度匹配证据强度 |

## Radar Dimensions

在总分之外输出四维雷达，不替代评分：

- 逻辑：storyline coherence、evidence coverage、decision path clarity。
- 内容：data freshness、insight density、source credibility。
- 呈现：visual rhythm、page fullness、chart professionalism。
- 语言：assertion-evidence alignment、audience calibration、tone consistency。

## Rating

| Score | Rating | Meaning |
|---:|---|---|
| 90-100 | `client-ready` | 可交付，只有轻微建议项 |
| 80-89 | `partner-ready` | 可给合伙人审，需少量修订 |
| 70-79 | `manager-review` | 需要经理级重看故事线/数据/视觉 |
| <70 | `rework` | 不宜交付，需重做关键模块 |

## Mandatory Fail Conditions

出现以下任一问题，即使总分较高也不得标记为 `client-ready`：

- 未声明任务档位，或 `quick-polish` / `partner-ready` 被标记为 `client-ready`。
- 摘要页有正文没有证明过的新结论。
- 没有 `client_question` 或 `client_answer`，导致执行摘要无法直接回答客户问题。
- `client_question` 只是主题描述，不是可决策问题，且未改写。
- 未通过 `logic-gate-checklist.md` 中任一 critical gate。
- 页面判断无法回链到任何章节答案。
- 核心结论无法回链到 `conclusion_evidence_matrix.json`。
- 含建议、方案或行动计划，但没有比较可选路径或说明推荐路径理由。
- 关键数字无法追溯。
- 核心图表缺少观点、基准、单位、期间、样本、来源或 lineage。
- AI 生成图片被用作事实证据。
- 页面主标题不是判断。
- 关键图表口径错误或单位混用。
- 正文字号低于最低要求。
- 敏感法律、财务、估值判断没有前提。
- PPTX 中关键文字或数字完全不可编辑，且无源文件。
- 行动计划、建议、来源或客户会修改的关键数字被整页图片化，且未通过 `editable-component-standard.md`。
- 连续高密度正文页导致主线不可读，且未设置小结/桥接页。
- 客户建议停留在“关注、优化、加强”，没有指标、动作、阈值或责任边界。
- 标题、摘要或建议未按受众场景做语言改写，且出现不适合董事会/监管/投委会的措辞。
- 大改 visual profile 或 manifest 后未做 profile regression/contact sheet 检查。
- 最终三角度审查中，内容、呈现或语言任一项未通过。
- final review 中合伙人视角或客户视角存在 `critical`。
- final review 中存在未修复且未说明残余风险的 `major`。

## Output

在 `review_report.json` 中增加：

```json
{
  "quality_scorecard": {
    "total_score": 86,
    "rating": "partner-ready",
    "dimensions": {
      "storyline": 18,
      "decision_value": 16,
      "data_lineage": 19,
      "visual_quality": 13,
      "chart_grammar": 8,
      "editability": 8,
      "language_compliance": 4
    },
    "mandatory_fail": [],
    "top_fixes": [
      "P06 副标题未承接上一页",
      "P12 图表标签过密"
    ]
  },
  "deck_quality_radar": {
    "logic": 86,
    "content": 82,
    "presentation": 78,
    "language": 88
  }
}
```
