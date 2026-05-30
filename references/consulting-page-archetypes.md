# Consulting Page Archetypes

用于补齐客户交付中高频的咨询页型。选择 `page_family`、生成 `preset_map.json` 或优化版式时读取本文件。

## Purpose

基础图表页只能证明数据，咨询页型负责推动决策。正式客户交付至少应包含若干“咨询动作页”：

- 问题拆解。
- 方案比较。
- 推荐路径。
- 风险缓释。
- 行动计划。
- 方法和限制。

## Archetype 1: Issue Tree

**Use when**：需要把客户问题拆成可回答的分析模块。

**Required fields**：

- `client_question`
- `sub_questions[3-5]`
- `evidence_needed`
- `linked_chapters`

**Layout**：

- 左侧：客户问题大卡。
- 右侧：3-5 个子问题分支。
- 底部：对应章节或证据页。

**Wireframe**：

- 顶部 14%-18%：claim title + subtitle。
- 左侧 30%-34%：客户问题卡。
- 右侧 58%-62%：子问题树。
- 底部 8%-10%：章节映射和来源。

**Visual fullness**：

- 每个子问题必须有一句“本报告如何回答”。
- 不做空泛思维导图。

## Archetype 2: Decision One-Page

**Use when**：需要给董事会、投委会或管理层一页看清建议。

**Required fields**：

- `recommendation`
- `supporting_evidence[3]`
- `key_risks[2-3]`
- `next_actions[3]`
- `decision_required`

**Layout**：

- 顶部：推荐判断。
- 左中：3 个证据卡。
- 右中：风险和缓释卡。
- 底部：下一步行动条。

**Wireframe**：

- 顶部 18%-22%：推荐判断和决策请求。
- 中部左 58%-62%：3 个证据卡。
- 中部右 30%-34%：风险和缓释卡。
- 底部 14%-18%：下一步行动条。

**Language**：

- 推荐必须可执行。
- 风险必须带缓释。

**Template asset**：

- 可参考 `assets/layouts/layout-executive-summary-grid.html` 作为一页决策摘要的基础骨架。

## Archetype 3: Option Comparison

**Use when**：比较 2-4 个方案或路径。

**Required fields**：

- `options[2-4]`
- `evaluation_criteria[4-6]`
- `score_or_judgment`
- `recommended_option`
- `rationale`

**Layout**：

- 横向方案列。
- 纵向评价维度。
- 推荐方案用亮蓝边框或顶部标签。
- 底部写推荐理由和前提。

**Wireframe**：

- 顶部 14%-18%：页面判断。
- 中部 62%-68%：方案比较矩阵。
- 右上或推荐列顶部：推荐标签。
- 底部 12%-16%：推荐理由、前提和不选其他路径的原因。

**Forbidden**：

- 只列优缺点，不给推荐。
- 推荐方案只靠颜色高亮，没有文字理由。

**Template asset**：

- `assets/layouts/layout-option-comparison.html`

## Archetype 4: Recommendation Path

**Use when**：展示推荐路径、阶段安排或实施路线。

**Required fields**：

- `phases[3-4]`
- `actions`
- `owners`
- `outputs`
- `milestones`
- `success_metrics`

**Layout**：

- 横向时间轴或三阶段路线图。
- 每阶段：动作、输出、责任和指标。
- 右侧或底部：关键前提和风险。

**Wireframe**：

- 顶部 14%-18%：推荐路径判断。
- 中部 58%-64%：三阶段路线图。
- 每阶段卡内固定：动作、输出、指标。
- 底部 14%-18%：前提、风险和里程碑。

**Fullness**：

- 每阶段至少 3 个要素：动作、输出、指标。
- 不要只有阶段名。

## Archetype 5: Risk Mitigation Matrix

**Use when**：需要说明方案风险、影响、缓释和责任。

**Required fields**：

- `risks`
- `impact`
- `likelihood`
- `mitigation`
- `owner`
- `early_warning_indicator`

**Layout**：

- 左侧风险矩阵或风险列表。
- 右侧缓释动作。
- 底部预警指标。

**Wireframe**：

- 顶部 14%-18%：风险判断。
- 左侧 46%-52%：风险矩阵或风险列表。
- 右侧 38%-44%：缓释动作和责任。
- 底部 10%-12%：预警指标 strip。

**Language**：

- 风险表述使用边界措辞。
- 缓释动作必须具体。

## Archetype 6: Management Action Plan

**Use when**：把建议变成客户可执行事项。

**Required fields**：

- `action`
- `owner`
- `timeline`
- `input_needed`
- `output`
- `metric_or_threshold`

**Layout**：

- 表格或泳道。
- 行：行动事项。
- 列：责任、时间、输入、输出、指标。

**Wireframe**：

- 顶部 14%-18%：行动计划判断。
- 主体 68%-74%：行动泳道/表格。
- 底部 8%-10%：关键依赖、风险或复盘节奏。

**Forbidden**：

- 行动都是“加强、优化、完善”。
- 没有责任或时间。

**Template asset**：

- `assets/layouts/layout-management-action-plan.html`

## Archetype 7: Methodology And Limitations

**Use when**：说明样本、期间、口径、限制和不可比因素。

**Required fields**：

- `sample_scope`
- `period`
- `data_sources`
- `method`
- `limitations`
- `impact_on_interpretation`

**Layout**：

- 4-6 个规则卡。
- 每卡：口径/限制 + 对结论的影响。
- 底部：使用边界。

**Wireframe**：

- 顶部 14%-18%：方法和限制结论。
- 中部 66%-72%：2x2 或 2x3 规则卡。
- 底部 8%-12%：使用边界和来源。

**Rule**：

- 正式客户交付必须至少有一页方法和限制页，除非是纯视觉优化任务。

## Archetype 8: Executive Summary Grid

**Use when**：执行摘要需要客户一页看懂。

**Required fields**：

- `answer_to_client_question`
- `key_findings[3-4]`
- `evidence_numbers`
- `implications`
- `recommended_actions`

**Layout**：

- 顶部：一句客户答案。
- 中部：3-4 张结论卡，每张有证据数字。
- 底部：建议和下一步。

**Wireframe**：

- 顶部 18%-22%：客户答案。
- 中部 58%-64%：3-4 张结论卡。
- 底部 14%-18%：建议、路径和下一步。

**Forbidden**：

- 摘要页变成目录。
- 没有证据数字。

**Template asset**：

- `assets/layouts/layout-executive-summary-grid.html`

## Archetype 9: Chart Plus Insight Panel

**Use when**：一个主图需要更充实的解释。

**Required fields**：

- `main_chart`
- `benchmark`
- `callouts[1-2]`
- `insight_cards[2-3]`
- `source_note`

**Layout**：

- 左/中：主图。
- 右侧：洞察卡。
- 底部：来源和口径。

**Wireframe**：

- 顶部 14%-18%：claim title + scope subtitle。
- 左/中 64%-70%：主图卡。
- 右侧 24%-28%：2-3 张洞察卡。
- 底部 6%-8%：来源、口径和 caveat。

**Rule**：

- 适合修复“页面显得空”的问题。
- 洞察卡必须引用图中数据。

**Template asset**：

- `assets/layouts/layout-chart-plus-insight-panel.html`

## Archetype 10: Chapter Synthesis

**Use when**：章节收束并引导下一章。

**Required fields**：

- `chapter_answer`
- `findings[3]`
- `evidence_links`
- `key_metrics[3]`
- `next_chapter_bridge`

**Layout**：

- 上方：章节答案。
- 中部：3 个发现卡。
- 底部：3 个关键数字 + 下一章引导。

**Rule**：

- 每张发现卡必须回链到证据页。

## Archetype Selection Rules

- 如果页面推动“如何选择”：用 `Option Comparison`。
- 如果页面推动“如何落地”：用 `Recommendation Path` 或 `Management Action Plan`。
- 如果页面解释“为什么可信”：用 `Methodology And Limitations`。
- 如果页面从数据跳到含义：用 `Chart Plus Insight Panel`。
- 如果页面承接章节：用 `Chapter Synthesis`。
- 如果页面给高层快速决策：用 `Decision One-Page` 或 `Executive Summary Grid`。

## Preset Map Fields

在 `preset_map.json` 中加入：

```json
{
  "page_id": "P09",
  "consulting_archetype": "option_comparison",
  "decision_function": "compare_and_recommend",
  "required_fields_status": "complete",
  "client_decision_link": "选择下一阶段利润质量监控路径",
  "fallback_if_overcrowded": "split into option_comparison + recommendation_path"
}
```

## QA

- 页面是否承担一个明确的咨询动作。
- 必填字段是否完整。
- 是否有客户决策链接。
- 是否只有形式，没有推荐或判断。
- 是否符合 `visual-fullness-standard.md` 的充实度要求。
