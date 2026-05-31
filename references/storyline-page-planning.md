# Storyline Page Planning

用于在绘制 PPT 前，把内容拆成符合咨询原则的逐页故事线。复杂金融咨询 deck 必须先完成本文件要求，再进入 visual preset 和构建阶段。

## Core Principle

先设计故事线，再设计页面。专业咨询 PPT 的阅读体验应满足：

1. **只读主标题**：读者能看清整份报告的逻辑链条和结论推进。
2. **读主标题 + 副标题**：读者能理解每页具体要证明什么，以及它如何连接上下页。
3. **读全页内容**：读者能看到该页如何支撑整个故事线中的一个环节。

## Three-Level Story Structure

每页必须有三层信息：

| Layer | Function | Requirement |
|---|---|---|
| 主标题 `claim_title` | 推进故事线 | 一句判断，必须能串成报告主线 |
| 副标题 `story_subtitle` | 连接内容和上下文 | 解释本页证明对象、承上启下、限定口径 |
| 页面主体 `page_body` | 证明该页判断 | 一个主证明对象 + 必要解释 + 来源 |

## Title Spine Test

进入构建前，把所有主标题单独列出来，形成 `title_spine.md`。

检查：

- 主标题连读是否像一篇 executive summary。
- 是否存在只描述主题的标题，如“行业背景”“财务分析”“案例介绍”。
- 是否存在主标题之间跳跃过大，缺少过渡页或桥接句。
- 是否存在多页重复表达同一个结论。
- 是否存在某页主标题与页面主体不匹配。

主标题写法：

- 好：`净利润增长主要来自投资回暖，承保业务贡献在多数样本中下降`
- 好：`费用分摊口径差异影响公司间可比性，需先统一披露口径再比较效率`
- 不好：`净利润分析`
- 不好：`2025年保险公司表现`

## Subtitle Bridge Test

副标题不是装饰文字。它必须完成至少一个功能：

- 说明本页证明口径：`基于 7 家上市险企 2024-2025 年披露口径，对承保、投资、所得税和其他项进行拆解`
- 承接上一页：`在确认利润增长来源后，本页进一步拆解保险服务收入的业务条线结构`
- 引导下一页：`该结构分化将进一步传导到费用分摊和服务边际口径`
- 限定判断边界：`部分公司披露口径存在差异，以下比较以可获得字段为基础`

副标题应控制在 1-2 行，不写空泛背景。

## Page Role

每页必须标注其在故事线中的角色：

| Role | Use when | Common visual |
|---|---|---|
| `setup` | 交代问题、背景、口径 | 方法说明、框架图、摘要卡 |
| `diagnosis` | 解释原因或结构 | 拆解图、对比图、矩阵 |
| `evidence` | 证明关键判断 | 图表、表格、案例卡 |
| `transition` | 从一个模块过渡到下一个模块 | 小结页、桥接页 |
| `section_divider` | 进入新章节，提示章节问题或章节答案 | 章节名 + 专业图片 + 编号 |
| `implication` | 提炼管理含义 | 三栏含义卡、行动地图 |
| `action` | 给出建议或下一步 | 路线图、责任矩阵 |

如果页面角色不清晰，先改故事线，不要进入视觉设计。

## Logic Relationship

每页还必须标注与前后页的逻辑关系：

| Relationship | Meaning | Visual implication |
|---|---|---|
| `progression` | 递进：从现象到原因、从原因到影响 | 阶梯、流程、模块推进、瀑布 |
| `parallel` | 并列：几个同等重要的因素 | 多卡片、三栏、2x2、并列矩阵 |
| `comparison` | 对比：主体、年度、准则、方案差异 | 双列、双期间图、对照表 |
| `causal_chain` | 因果/传导：A 导致 B，再影响 C | 箭头链、桥接图、传导图 |
| `drill_down` | 下钻：从总览进入细项 | 总分结构、树状拆解、分面图 |
| `synthesis` | 综合：把多个证据合成结论 | 小结卡、证据汇总、决策表 |

视觉形式必须跟逻辑关系一致。不要用三栏卡片呈现强因果链，也不要用复杂流程图呈现并列因素。

## Page Planning Schema

在 `outline.json` 或等价规划中，每页至少包含：

```json
{
  "page_id": "P05",
  "module": "overall_results",
  "page_role": "diagnosis",
  "logic_relationship": "drill_down",
  "claim_title": "净利润增长主要来自投资回暖，承保业务贡献在多数样本中下降",
  "story_subtitle": "基于 7 家上市险企披露数据，将净利润拆分为承保、投资、所得税和其他项，识别增长来源差异",
  "previous_link": "上一页确认样本公司净利润普遍增长",
  "next_link": "下一页进一步拆解综合收益和投资波动来源",
  "evidence_object": "2025 vs 2024 利润构成堆叠条",
  "insight_type": "contribution_split",
  "recommended_page_family": "stacked_contribution_split",
  "layout_reason": "本页要解释净利润增长来源，堆叠贡献图能直接拆出投资、承保、所得税和其他项的贡献差异",
  "evidence_items_count": 4,
  "content_density_status": "balanced",
  "title_fit": {
    "char_count": 24,
    "line_count_target": 2,
    "font_size_pt": 38,
    "rewrite_required": false,
    "fit_status": "pass"
  },
  "visual_intent": {
    "emphasis": ["投资贡献", "承保贡献下降"],
    "highlight_method": ["deep_navy_for_focus", "bold_labels", "callout_note"],
    "suggested_preset": "stacked_contribution_split"
  }
}
```

## Insight And Density Fields Before Preset

在分配 `preset_family` 前，`storyline_map.json` 或 `outline.json` 每个正文页必须补齐：

| Field | Source | Purpose |
|---|---|---|
| `insight_type` | `insight-to-layout-mapper.md` | 说明本页洞察类型，如排名背离、趋势背离、贡献拆分 |
| `recommended_page_family` | `insight_layout_map.json` | 进入 visual profile 白名单前的推荐版式 |
| `layout_reason` | `insight_layout_map.json` | 解释为什么该版式最适合证明本页结论 |
| `evidence_items_count` | `content_density_report.json` | 判断页面是否过薄或过载 |
| `content_density_status` | `content_density_report.json` | 取值为 `content_empty`、`content_thin`、`balanced`、`content_heavy`、`overloaded` |
| `title_fit` | `title-fit-standard.md` | 中文标题长度、行数、字号和改写状态 |

章节页、封面、目录页可以豁免 `evidence_items_count`，但必须写明 `density_exempt_reason`。

## Preset Entry Gate

进入 `preset_map.json` 前检查：

- 正文页没有 `content_empty`。
- `content_thin` 页面已有补强方案，如 benchmark、metric strip、callout、合并或用户确认。
- `content_heavy` 或 `overloaded` 页面已拆页、分组或转附录。
- 每页 `recommended_page_family` 有 `layout_reason`。
- 每页 `title_fit.fit_status` 不是 `rewrite_required` 或 `split_page_required`。

## Section Divider Planning

章节页必须进入 `title_spine.md` 和 `storyline_map.json`，但主标题不写成正文结论。它应承担章节节奏和逻辑锚点：

```json
{
  "page_id": "P04",
  "module": "asset_disposal_overview",
  "page_role": "section_divider",
  "logic_relationship": "transition",
  "section_number": "01",
  "section_title": "上市银行近五年不良概况",
  "chapter_question": "本章回答：不良压力是否已从账面暴露转向处置效率和回收质量？",
  "chapter_answer": "不良规模表面趋稳，但处置效率、回收现金流和责任认定成为新的评价重心。",
  "previous_link": "上一页完成目录和阅读路径",
  "next_link": "下一页进入银行不良率、核销和处置回收的时间序列证据",
  "visual_intent": {
    "suggested_preset": "practice_section_divider",
    "image_role": "section_background",
    "image_prompt": "blue glass financial office building, professional non-performing asset resolution practice sharing"
  }
}
```

章节页文字总量应少于 40 中文字；若需要表达更多内容，放到章节后的第一张正文页。

## Visual Intent Before Rendering

每页绘制前先写 `visual_intent`：

- 这一页要突出什么？
- 哪些信息是主证据，哪些只是补充？
- 逻辑关系是递进、并列、对比、因果、下钻还是综合？
- 是否需要数字？如果需要，是趋势、排名、构成、差异还是敏感性？
- 使用表格、图表、流程、卡片还是图片？
- 哪些关键词/数字需要视觉强调？
- 是否符合当前 visual profile 和 preset family？

## Emphasis Rules

视觉强调只能服务结论：

- 颜色：只用于焦点主体、正负语义、关键分项。
- 加粗：用于关键判断词、公司名、指标名或变化方向。
- 线条/箭头：用于传导和递进，不用于装饰。
- 图标：用于帮助识别类别，不替代文字判断。
- callout：每页最多 2 个，避免满页都是重点。

不要同时用颜色、加粗、下划线、阴影和大字号强调同一信息。

## Numeric Presentation Rules

如果页面需要数字，先判断数字任务：

| Numeric task | Preferred visual |
|---|---|
| 比较多主体单指标 | 排名条、横向条形图 |
| 比较两个期间 | 双期间条形图、并列堆叠条 |
| 展示构成 | 100% 堆叠条、构成表 |
| 展示变化来源 | 瀑布/桥接图 |
| 展示趋势 | 折线或柱线组合 |
| 展示二维敏感性 | 热力矩阵 |
| 展示多指标评分 | 指标矩阵或雷达 |
| 展示口径差异 | 对照表或注释卡 |

表格和图表都必须符合 `visual-system.md` 和 `financial-chart-grammar.md`。

## Storyline QA

构建前检查：

- `title_spine.md` 是否完整。
- 每页是否有 `story_subtitle`。
- 每页是否有 `previous_link` 和 `next_link`，封面/结尾除外。
- 每页是否只有一个主证明对象。
- 每页 visual intent 是否明确。
- 每页是否有 `insight_type`、`recommended_page_family` 和 `layout_reason`。
- 每页是否通过 `content_density_status` 检查。
- 每页是否通过 `title_fit` 检查，长标题是否已改写。
- preset family 是否匹配逻辑关系。
- 每个正式章节是否有 `section_divider` 或清楚的章节锚点。
- 章节页是否只包含章节编号、章节名、章节问题/答案和专业图片，不承担正文证明。

## Output Artifacts

建议输出：

```text
title_spine.md
storyline_map.json
outline.json
preset_map.json
```

`storyline_map.json` 用于记录页与页之间的逻辑链：

```json
{
  "storyline": [
    {
      "page_id": "P05",
      "claim_title": "...",
      "story_subtitle": "...",
      "page_role": "diagnosis",
      "logic_relationship": "drill_down",
      "previous_link": "...",
      "next_link": "..."
    }
  ]
}
```
