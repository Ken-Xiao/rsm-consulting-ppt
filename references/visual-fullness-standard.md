# Visual Fullness Standard

用于解决页面“内容不够充实、主体区域偏空、像半成品”的问题。生成 `design_system.json`、`preset_map.json`、HTML layout 或做视觉 QA 时必须读取本文件。

## Core Principle

页面充实度不是靠缩小字号、堆文字或增加无关装饰实现，而是通过三层结构实现：

```text
主结论层：标题 + 结论条
主证据层：图表 / 表格 / 矩阵 / 流程 / 案例
辅助证据层：关键数字、口径注释、对比基准、callout、管理含义
```

正文页如果只有标题、结论条和一个小图，通常显得不完整。每页应至少有一个强主证据对象，并配套 2-4 个辅助证据点。

## Body Occupancy Rule

按 16:9、1920x1080 画布计算，正文页必须满足：

| Region | Target |
|---|---:|
| 内容有效占用面积 | 70%-82% |
| 主图/主表/主矩阵宽度 | 页面可用宽度的 78%-90% |
| 主图/主表/主矩阵高度 | 页面可用正文高度的 45%-62% |
| 结论条宽度 | 页面可用宽度的 78%-90% |
| 辅助证据/注释区域 | 正文高度的 12%-22% |
| 纯空白区域 | 不超过 25%，封面和章节页例外 |

如果页面有效占用面积低于 65%，必须采取以下动作之一：

1. 放大主图或主表。
2. 增加右侧/底部证据卡。
3. 增加 2-3 个关键数字 strip。
4. 将单图改为“主图 + 解释卡”组合。
5. 合并相邻弱页面，形成更完整的一页。

禁止通过以下方式制造充实感：

- 把正文压小到最低字号以下。
- 加无意义图标、装饰线、渐变块。
- 同页放两个互不相关的图。
- 把来源、脚注、免责声明拉大充数。

## Evidence Layer Patterns

### Pattern A: 主图 + 右侧洞察卡

适合排名、趋势、散点、桥接图。

```text
左/中 68%-72%：主图
右侧 24%-28%：3 个洞察卡
底部：来源和口径
```

右侧洞察卡每张包含：

- 1 个短标题。
- 1 个关键数字或排名。
- 1 句含义，不超过 28 个中文字符。

### Pattern B: 主图 + 底部指标 strip

适合保险财务结果、银行经营指标、估值对比。

```text
上方：结论条
中部：主图卡
底部：3-4 个小指标块
```

指标 strip 必须与主图同口径，不能放无关 KPI。

### Pattern C: 对比图 + 口径注释卡

适合新旧准则、2025 vs 2024、同业对比、政策比较。

```text
左侧：期间/主体 A
右侧：期间/主体 B
中间或底部：差异标签
右下：口径差异注释卡
```

口径注释卡不能超过 70 个中文字符。

### Pattern D: 矩阵 + 顶部结论带 + 侧边分组说明

适合制度比较、风险矩阵、方法论。

```text
顶部：一句矩阵结论
中部：矩阵主体
右侧或底部：分组说明 / 关键例外 / 适用边界
```

矩阵页如果只有表格没有解释，会像数据摘录；必须加入“矩阵读法”。

### Pattern E: 小结页 3+3 结构

适合章节收束。

```text
上方：章节答案
中部：3 个核心发现卡
底部：3 个关键数字 / 下一章引导
```

小结页不得只有三张空泛卡片；每张卡必须有证据页回链。

## rsm-insurance-results Fullness Rules

默认保险财务报告风下，正文页应更接近“财务分析成稿”，不要过度留白：

- 结论条放在二级标题下方，宽度建议 88%-90%。
- 主图卡应占页面中下部主要空间，高度不低于 430px，优先 480-540px。
- 图表卡内部可分为“图表标题 / 主图 / 图内 callout / 底部指标 strip”。
- 对比类页面优先使用左右双卡或双图卡，避免一张小图漂在中间。
- 若图表数据较少，必须增加右侧洞察卡或底部指标 strip。
- 章节小结页使用 3+3 结构，避免只有大标题和少量文字。

## Visual Density Schema

在 `visual_intent` 或 `preset_map.json` 中增加：

```json
{
  "visual_fullness": {
    "body_occupancy_target": "74%-82%",
    "evidence_layers": ["takeaway_bar", "main_chart", "insight_cards", "source_note"],
    "primary_visual_scale": "large",
    "supporting_elements": ["3 insight cards", "benchmark line", "2 chart callouts"],
    "empty_space_risk": "low"
  }
}
```

如果 `empty_space_risk` 为 `medium` 或 `high`，必须在构建前调整版式。

## Page Family Fullness Requirements

| Page family | Minimum fullness requirement |
|---|---|
| `insurance_results_chart_card` | 主图卡 + 2 个 callout 或 3 个底部指标块 |
| `paired_period_comparison` | 左右双卡 + 差异标签 + 口径注释 |
| `stacked_contribution_split` | 构成图 + 分项贡献排序/指标 strip |
| `financial_metric_grid` | 矩阵 + 分组说明 + 2-3 个关键读法 |
| `executive_takeaways` | 3-4 个结论块 + 每块 1 个证据数字 |
| `chapter_synthesis` | 3 个发现卡 + 3 个关键数字 + 下一章引导 |
| `methodology_or_scope_note` | 样本/期间/口径/限制 4 区块，不做单段文字页 |

## Fullness QA

截图或 contact sheet 审查时检查：

- 页面中部是否有明确、大尺度主证据对象。
- 主图是否过小，周围是否出现大片无目的空白。
- 结论条、主图、辅助证据是否形成完整阅读路径。
- 页面是否有 2-4 个与主结论相关的辅助证据点。
- 图表卡内部是否过空：图太小、图例太大、坐标区占比不足。
- 章节小结页是否具备 3+3 结构。
- 页面看起来是否像“成稿”，而不是仅完成了标题和一个图。

