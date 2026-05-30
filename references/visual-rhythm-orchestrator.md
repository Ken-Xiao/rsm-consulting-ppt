# Visual Rhythm Orchestrator

用于把页面家族、认知负荷、章节节奏和色温连成可执行的视觉编排。生成或审查 `preset_map.json`、`design_system.json` 和 contact sheet 时读取本文件。

## Rhythm Score

为每页记录 `rhythm_score`：

| Page type | Score |
|---|---:|
| cover, agenda, section divider, visual break | 1 |
| executive summary, synthesis, recommendation one-page | 2 |
| single chart + 1-2 readouts | 3 |
| chart + insight panel, option comparison, action plan | 4 |
| dense KPI matrix, jurisdiction matrix, sensitivity table, appendix dense table | 5 |

规则：

- 连续正文页累计 `rhythm_score` 超过 15 时，插入 `synthesis`、`bridge`、`section_divider` 或 `visual_break`。
- 连续同一 `page_family` 不超过 4 页；高密度页不超过 3 页。
- 章节内如果前 3 页都是 4-5 分，必须提前插入 “key takeaway / method boundary / chapter synthesis”。

## `preset_map.json` Additions

```json
{
  "page_id": "P09",
  "page_family": "chart_plus_insight_panel",
  "rhythm_score": 4,
  "rhythm_role": "evidence",
  "cumulative_rhythm_score": 13,
  "requires_buffer_after": false,
  "chapter_tone": "cautionary",
  "color_temperature": "cautionary"
}
```

## Color Temperature

不破坏品牌色，只微调辅助色和图表强调色。

| Temperature | Use when | Visual rule |
|---|---|---|
| `neutral` | 方法、事实、背景、稳健分析 | 默认蓝灰 |
| `positive` | 增长、机会、改善、推荐路径 | 亮蓝为主，少量蓝绿强调 |
| `cautionary` | 风险、不良、压力、短板 | 蓝灰偏冷，少量橙/红只标注负向偏离 |

若用户提供严格品牌规范，设置 `brand_override: true`，禁用色温变化，只用品牌色。

## Buffer Page Options

优先选择：

- `module_summary`
- `executive_summary_grid`
- `decision_one-page`
- `section_divider`
- `key_takeaway_card`

缓冲页不得成为装饰页；必须承担小结、桥接、章节问题或下一步判断功能。

## Review Output

```json
{
  "visual_rhythm_audit": {
    "status": "warning",
    "max_cumulative_score": 18,
    "high_load_runs": [
      {"pages": ["P07", "P08", "P09", "P10"], "score": 18, "fix": "P10 前插入 module_summary"}
    ],
    "color_temperature_consistency": "pass",
    "brand_override": false
  }
}
```
