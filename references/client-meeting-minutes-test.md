# Client Meeting Minutes Test

用于检查 PPT 中的标题、结论和建议能否直接进入客户会议纪要、董事会纪要或管理层行动清单。

## Test Objects

逐页检查：

- `claim_title`
- `story_subtitle`
- `takeaway_text`
- `recommended_action`
- `chapter_answer`

## Pass Standard

一条语句通过测试，必须满足：

1. 独立阅读不误解。
2. 有必要前提或边界。
3. 不夸大证据。
4. 可以转成会议事项、判断或行动。
5. 没有空话或不可执行动词。

## Rewrite Examples

| Weak | Client-ready |
|---|---|
| 建议持续关注不良处置 | 建议按现金回收、核销退出和责任追偿三类路径建立月度处置台账 |
| 投资收益表现较好 | 2025 年利润改善主要受投资收益回升驱动，仍需单独验证承保端质量 |
| 需加强风险管理 | 建议对非标资产设置项目级预警阈值，并按季度复盘现金回收偏差 |
| 新准则影响较大 | 新准则改变利润确认节奏，跨公司比较前需先统一承保和投资口径 |

## Failure Cases

- 只有主题，没有判断：`不良资产处置情况`
- 只有方向，没有动作：`进一步优化管理机制`
- 判断过强：`完全证明经营质量改善`
- 缺少边界：`所有公司均实现高质量增长`
- 无法落地：`持续强化协同`

## Output

在 `review_report.json` 中增加：

```json
{
  "meeting_minutes_test": {
    "status": "warning",
    "failed_items": [
      {
        "page": "P12",
        "field": "recommended_action",
        "issue": "建议停留在'持续关注'，无法转成会议行动项",
        "rewrite": "建议建立月度处置台账，按现金回收率、核销完成率和追偿进度三项指标跟踪"
      }
    ]
  }
}
```
