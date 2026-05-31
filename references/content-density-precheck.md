# Content Density Precheck

用于在选版式和构建页面前判断每页“料是否够、是否太挤”。完整生成、整体优化、客户交付和 pipeline 项目必须读取本文件。

## Core Principle

内容密度先于视觉饱满度。页面显空，通常不是 CSS 问题，而是证据层不足；页面显挤，通常不是字号问题，而是一个页面承担了多个论证任务。

## Required Position

```text
insight_layout_map.json
  -> content_density_report.json
  -> storyline_map.json / outline.json
  -> preset_map.json
  -> layout_analysis_report.json
```

没有 `content_density_report.json` 的完整项目，不得进入正式 `preset_map.json`。

## Evidence Item Definition

一个 `evidence_item` 是能独立支撑页面判断的事实、数字、图表对象、案例、政策条款或测算结果。

不计为 evidence item：

- 空泛背景句。
- 没有来源的判断。
- 只重复标题含义的短句。
- 装饰图标或无证据属性的图片。

## Density Status

| evidence_items_count | status | Meaning | Required action |
|---:|---|---|---|
| 0 | `content_empty` | 没有证据 | 删除、补材料或改为章节页 |
| 1 | `content_thin` | 只有单点证据，页面容易空 | 补 benchmark、趋势、口径注释、metric strip 或合并页面 |
| 2-4 | `balanced` | 证据量适中 | 可进入版式映射 |
| 5-6 | `content_heavy` | 信息偏多 | 分组、减少次要点或拆页 |
| >6 | `overloaded` | 单页承担过多 | 必须拆页或转附录 |

章节页、封面、目录页不适用正文密度规则，但必须标记 `density_exempt_reason`。

## Required Output

`content_density_report.json`:

```json
{
  "status": "pending_user_confirmation",
  "summary": {
    "page_count": 24,
    "content_empty_pages": 0,
    "content_thin_pages": 2,
    "balanced_pages": 18,
    "content_heavy_pages": 3,
    "overloaded_pages": 1
  },
  "pages": [
    {
      "page_id": "P05",
      "claim_title": "利润改善主要来自投资端，承保端仍需单独验证",
      "page_role": "diagnosis",
      "evidence_items_count": 4,
      "evidence_strength_mix": {
        "audited_disclosure": 2,
        "derived_calculation": 1,
        "management_assumption": 1
      },
      "density_status": "balanced",
      "required_action": "可进入版式映射",
      "suggested_supporting_layer": ["metric_strip", "callout_note"],
      "can_enter_layout_analysis": true
    }
  ]
}
```

## Fix Rules

### `content_thin`

优先按以下顺序补强：

1. 增加同业或历史 benchmark。
2. 增加 2-3 个关键数字 strip。
3. 增加口径/限制注释卡。
4. 增加管理含义卡。
5. 与前后弱页合并。

不要通过放大装饰图、增加无关图标或拉大脚注制造充实感。

### `content_heavy`

优先按以下顺序减压：

1. 把一页拆成“现象页 + 原因页”。
2. 将数据底表转附录，正文只保留关键读法。
3. 把 5-6 个并列点归为 2-3 组。
4. 删除与标题无关的证据。

### `overloaded`

必须拆页。不得用缩小字号、压缩行距或去掉来源解决。

## User Checkpoint

给用户看的确认语应类似：

```text
在进入版式设计前，我先做了内容密度预检：

- P07、P12 偏薄：建议补 3 个指标 strip 或与相邻页面合并。
- P18 过载：建议拆成“指标变化”和“原因拆解”两页。
- 其余页面证据量基本均衡，可以进入版式映射。

请确认这些拆分和补强方向。
```

`partner-ready` 以上项目如果用户尚未确认密度调整，不能进入批量构建。
