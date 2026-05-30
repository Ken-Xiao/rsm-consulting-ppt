# Exhibit Composition Standard

用于把每页 PPT 从“页面”提升为成熟咨询方案中的“exhibit”。选择页面结构、图表、注释和辅助证据时必须读取本文件。

## Core Principle

成熟咨询页不是简单的标题加图表，而是一个可独立阅读、可截图进入报告正文的证据展品。

标准 exhibit 必须包含：

```text
Claim title
  -> Exhibit subtitle / scope
    -> Primary evidence object
      -> Annotation / benchmark / focus
        -> Supporting readout
          -> Source and caveat
```

## Exhibit Structure

每页正文页在 `visual_intent` 或 `preset_map.json` 中必须增加：

```json
{
  "exhibit_structure": {
    "exhibit_title": "本页展品证明的判断",
    "scope_note": "样本、期间、口径或方法",
    "primary_evidence": "主图/主表/主矩阵/流程/案例",
    "reader_path": ["claim_title", "takeaway_bar", "chart_focus", "insight_panel", "source_note"],
    "annotation_plan": ["benchmark_line", "difference_label", "method_caveat"],
    "supporting_readout": ["关键数字1", "关键数字2", "管理含义"],
    "source_and_caveat": "来源、口径和限制"
  }
}
```

如果页面没有 `primary_evidence`，通常不是正文 exhibit，应改为章节页、摘要页或附录页。

## Reader Path

成熟咨询页必须有明确阅读路径：

1. 先读标题，知道本页判断。
2. 看副标题/口径，知道比较范围。
3. 看主证据对象，确认判断依据。
4. 看标注和洞察卡，理解为什么重要。
5. 看来源和限制，确认可用边界。

不要让读者先看到图例、脚注、装饰图形或无关照片。

## Annotation Standards

每个 exhibit 最多保留 2 个强标注。标注必须服务判断：

- `benchmark_line`：同业中位、行业均值、目标值、阈值。
- `difference_label`：同比差异、方案差异、新旧准则差异。
- `focus_label`：主体公司、推荐方案、异常样本。
- `method_caveat`：样本不一致、口径变化、数据缺口。
- `decision_callout`：本图支持的选择或下一步。

禁止：

- 每个数据点都标注。
- 标注内容重复标题。
- 用箭头或颜色强调无关元素。
- 口径 caveat 放在难以阅读的位置。

## Supporting Readout

主图之外必须有 1-3 个 readout，帮助客户完成“看图 -> 得结论”：

| Readout type | Use |
|---|---|
| `metric_strip` | 3-4 个关键数字 |
| `insight_cards` | 2-3 个解释卡 |
| `basis_note` | 口径/样本/方法说明 |
| `decision_note` | 对推荐路径或下一步的含义 |
| `exception_note` | 不可比项、异常值、披露差异 |

Readout 必须引用主证据，不得放无关 KPI。

## Exhibit Completeness QA

交付前逐页检查：

- 标题是否是本 exhibit 的结论。
- 副标题是否说明 scope。
- 主证据是否足以支撑标题。
- 是否有 benchmark、focus 或 annotation。
- 是否有 supporting readout。
- 来源和 caveat 是否存在且可读。
- 该页是否可被单独截图给客户阅读。

任一核心分析页缺少 `primary_evidence + annotation + readout + source`，不得标记为 `client-ready`。

