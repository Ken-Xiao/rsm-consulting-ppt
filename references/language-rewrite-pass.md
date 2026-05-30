# Language Rewrite Pass

用于在草稿生成后，把页面语言改成更接近专业金融咨询交付的表达。该步骤不改变事实，只提升判断强度、边界清晰度和客户可读性。

## Rewrite Targets

每页至少检查四处：

1. `claim_title`：是否是一句结论。
2. `story_subtitle`：是否补充口径、证据范围和上下页连接。
3. `takeaway_text`：是否从图表读法变成管理含义。
4. `recommended_action`：是否有动作、条件、对象和下一步。

正式客户交付、董事会、管理层、投委会、监管/合规或培训分享材料，还必须读取 `references/language-style-library.md`，先选择 audience tone profile，再改写标题、摘要和建议。

## Rewrite Rules

| Weak | Better |
|---|---|
| `财务结果分析` | `利润改善主要由投资端回暖驱动，承保端贡献仍需单独验证` |
| `不良处置情况` | `不良处置从规模出清转向责任认定和现金回收并重` |
| `建议加强管理` | `建议将处置项目分为现金回收、核销退出和责任追偿三类路径管理` |
| `整体表现较好` | `在可比口径下，样本公司利润端改善更明显，但经营质量分化仍然存在` |

## Strength Control

根据证据强度选择措辞：

- 硬数据充分：`显示`、`表明`、`主要来自`、`显著高于`。
- 证据中等：`可能反映`、`倾向于说明`、`需要结合口径进一步判断`。
- 假设或建议：`建议`、`可考虑`、`需优先验证`。

避免：

- `必然`、`一定`、`完全证明`。
- 没有证据的 `严重`、`巨大`、`根本性`。
- 只有口号没有动作的 `加强`、`优化`、`提升`。

## Page-Level Checklist

- 主标题能否单独放进 executive summary。
- 副标题是否说明样本、期间、口径或承接关系。
- 结论条是否有 `发现 + 含义`，而不是重复图表标题。
- 建议是否能落到指标、对象、动作或验证事项。
- 是否使用了统一术语，例如“承保端”“投资端”“处置回收”“核销退出”“责任追偿”。

## Scenario Rewrite Pass

按场景追加一轮改写：

| Scenario | Rewrite focus |
|---|---|
| 董事会 | 结论必须指向授权、边界、风险和下一步决策 |
| 管理层 | 建议必须指向责任主体、时间、指标和复盘节奏 |
| 投委会 | 结论必须区分基准/压力情景和下行风险 |
| 监管/合规 | 表述必须写清法规、口径、适用边界和待确认事项 |
| 培训分享 | 语言必须把案例事实、机制和可复制做法分开 |
| 资本市场 | 估值判断必须写成可验证指标，不写成股价必然反应 |

## Title Spine Rewrite

完成逐页改写后，把所有 `claim_title` 连读一次：

- 如果标题链像目录，重写为“发现 -> 归因 -> 含义 -> 行动”。
- 如果连续 3 页都是事实，至少一页改成 synthesis 或 implication。
- 如果标题强度高于证据强度，降级为“初步显示/可能/需验证”。
- 如果建议没有动作，按 `language-style-library.md` 的 suggestion sentence patterns 改写。

在 `review_report.json` 增加：

```json
{
  "language_rewrite_review": {
    "audience_profile": "董事会",
    "title_spine": "pass",
    "assertion_strength": "pass",
    "negative_judgment_replacements": "pass",
    "action_language": "warning",
    "issues": [
      {
        "page": "P10",
        "issue": "建议仍停留在方向表述",
        "fix": "补充责任主体、季度指标和触发阈值"
      }
    ]
  }
}
```
