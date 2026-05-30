# Auto-Fix Playbook

用于把审校问题快速转成返修动作。每次 `review_report.json` 或 `final_review_report.json` 出现 issue 后读取本文件。

## Fix Order

修复顺序固定：

1. 事实和数据错误。
2. 逻辑断裂和证据不足。
3. 客户决策路径不清。
4. 页面展现和可读性。
5. 语言和措辞。
6. 微观 polish。

不要为了视觉美化改动未经确认的事实、法律、财务或估值判断。

## Common Fix Map

| Issue | Fix |
|---|---|
| 标题是主题词 | 用 `consulting-language-playbook.md` 改成判断句 |
| `client_question` 太泛 | 改写为“是否/如何/优先做什么”的决策问题 |
| 执行摘要像目录 | 改为“结论 / 证据 / 含义 / 建议”结构 |
| 页面无法回链章节答案 | 删除、合并、移入附录或补章节桥接 |
| 结论强于证据 | 降低措辞强度，补来源或改为假设 |
| 建议不可执行 | 补动作、对象、指标、阈值、时间或责任边界 |
| 没有方案比较 | 增加 `option_comparison` 或说明其他路径不可取 |
| 图表没有观点 | 补 `chart_point_of_view` 和 `chart_readout` |
| 图表没有基准 | 增加同比、同业中位、行业均值、阈值或目标线 |
| 页面太空 | 放大主证据对象，增加洞察卡、指标 strip 或口径卡 |
| 页面太挤 | 拆页、减少标签、改为矩阵/附录，不缩小到最低字号以下 |
| 图例太复杂 | 改为直接标签，减少颜色数量 |
| 标签重叠 | 减少标注、改横向条、分组或提高图表宽度 |
| 视觉结构重复 | 插入 synthesis、decision one-page 或换 page family |
| 整页图片化 | 恢复标题、来源、关键数字、表格文字为可编辑 |
| 来源缺失 | 补 source note 和 lineage id |
| QA 出现 `overflow` | 启用 `auto_layout_fix`：先缩短非关键文字，再调间距，再拆页 |
| QA 出现 `overlap` | 启用 `auto_layout_fix`：先恢复网格和层级，再减少标注 |
| 连续高密度页面 | 按 `visual-rhythm-orchestrator.md` 插入 synthesis/bridge |
| stale 数据支撑强结论 | 补最新来源，或把标题降级为历史观察 |

## Auto Layout Fix Mode

当 QA 报告出现 `overflow`、`overlap`、`text_too_dense`、`empty_space` 时，可启用 `auto_layout_fix`。自动修复只允许改布局和表达密度，不改事实、法律、财务、估值和推荐路径。

优先级：

1. 缩短非关键文字：注释、来源解释、卡片说明，但不得低于最低字号。
2. 调整元素间距、卡片宽高和图表内边距。
3. 减少图内标注数量，保留最多 2 个强标注。
4. 页面仍太挤时拆为两页，并标记 `continued_from` / `continued_to`。
5. 页面太空时放大主证据对象，补洞察卡、指标 strip 或口径卡。
6. 仍无法修复时标记 `manual_review_required`，不要硬改。

输出到 `fix_report.json`：

```json
{
  "auto_layout_fix": {
    "status": "partial",
    "safe_fixes_applied": ["reduced_secondary_note", "increased_card_spacing"],
    "split_pages": ["P08"],
    "manual_review_required": []
  }
}
```

## Page-Specific Fixes

### Executive Summary

If weak:

- 顶部放 `client_answer`。
- 中部放 3-4 个结论卡，每张必须有证据数字。
- 底部放推荐路径和下一步。
- 删除章节目录式摘要。

### Chart Page

If weak:

- 补 `chart_point_of_view`。
- 明确 `benchmark_type`。
- 高亮 1 个焦点主体或焦点分项。
- 加 1-2 个图内标注。
- 增加右侧洞察卡或底部指标 strip。

### Option Comparison

If weak:

- 至少比较 `status_quo` 和 `recommended`。
- 增加 4-6 个评价标准。
- 推荐方案用蓝色边框和文字理由，而不只靠颜色。
- 底部写前提和不选其他路径的原因。

### Management Action Plan

If weak:

- 每行行动必须有 owner、timeline、input、output、metric。
- 删除“加强/优化/完善”类动作词。
- 加入触发条件或复盘节奏。

### Methodology / Limitations

If weak:

- 改为 4-6 张规则卡。
- 每张卡写“口径/限制 + 对结论影响”。
- 底部放使用边界。

## Fix Report

返修后输出：

```json
{
  "fix_report": {
    "fixed": [
      {
        "page": "P08",
        "issue": "页面太空",
        "fix_applied": "改为主图 + 右侧 3 张洞察卡，并补同业中位线"
      }
    ],
    "remaining_risks": [],
    "requires_user_confirmation": []
  }
}
```
