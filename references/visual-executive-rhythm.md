# Visual Executive Rhythm

用于把专业金融 PPT 的视觉从“单页好看”提升为“整份 deck 易读、有节奏、有层级”。选择 preset、生成 `preset_map.json` 和做视觉 QA 时读取本文件。

## Core Principle

专业咨询 deck 的视觉节奏应服务决策阅读：

1. 高层先看到结论。
2. 再看到支持结论的主证据。
3. 最后看到口径、来源和补充解释。

不要让所有页面都长得一样，也不要为了变化牺牲模板一致性。

## Page Rhythm

每个章节建议采用以下节奏：

```text
Section divider
  -> Setup / framing page
  -> 2-4 evidence or diagnosis pages
  -> Synthesis / implication page
  -> Transition to next chapter
```

规则：

- 连续 `insurance_results_chart_card` 不宜超过 4 页；超过时插入小结、桥接、矩阵或含义页。
- 每 6-8 页至少出现 1 页 `synthesis`、`transition` 或 `executive_takeaways`。
- 执行摘要不要使用附录式密表；优先使用 3-4 个结论块 + 关键数字。
- 附录页可以密，但正文页必须保留清晰视觉焦点。

## Core Client Page Set

客户交付版至少应覆盖以下页面家族，除非项目很短或用户明确要求删减：

| Page family | Purpose | Visual profile |
|---|---|---|
| `insurance_photo_cover` | 建立正式交付感 | `rsm-insurance-results` |
| `insurance_agenda` | 告诉客户阅读路径 | `rsm-insurance-results` |
| `insurance_section_divider` | 区分章节节奏 | `rsm-insurance-results` |
| `executive_takeaways` | 回答客户问题 | `rsm-insurance-results` |
| `insurance_results_chart_card` | 用单图证明判断 | `rsm-insurance-results` |
| `paired_period_comparison` | 比较期间、准则或方案 | `rsm-insurance-results` |
| `stacked_contribution_split` | 解释构成和驱动 | `rsm-insurance-results` |
| `financial_metric_grid` | 做多指标对照 | `rsm-insurance-results` |
| `methodology_or_scope_note` | 说明口径和边界 | `rsm-insurance-results` |
| `chapter_synthesis` | 小结并引导下一章 | `rsm-insurance-results` |

如果某个核心页型没有对应模板，优先用最接近的 page family，并在 `preset_map.json` 里记录替代关系。

## Density Levels

为每页标注 `density_level`：

| Level | Use when | Layout rule |
|---|---|---|
| `executive` | 摘要、章节小结、决策页 | 1 个主判断 + 2-3 个支撑点；留白较多 |
| `analysis` | 正文分析页 | 1 个大尺度主图 + 1 个结论条 + 2 个以内 callout + 2-3 个辅助证据点 |
| `evidence_dense` | 对比矩阵、方法、样本表 | 可以高密度，但必须有分组、表头、来源和矩阵读法 |
| `appendix` | 底表、完整口径、明细清单 | 可用较小字号，但不进入正文主线 |

如果正文页被标成 `evidence_dense`，必须说明为什么不能拆页。

正文页不能因为追求“克制”而显得空。若主体区域有效占用不足，读取 `references/visual-fullness-standard.md`，补充主证据和辅助证据层。

## Visual Hierarchy Check

截图审查时按 3 秒阅读顺序检查：

1. 第一眼是否看到 `claim_title`。
2. 第二眼是否看到 `takeaway_text` 或主图焦点。
3. 第三眼是否能理解主图中的比较对象、期间、单位和结论。
4. 来源、脚注和页码是否可见但不抢主视觉。

如果第一眼看到的是装饰、图例、页脚、密集表格或无关图片，页面不合格。

## Chart As Proof Rule

每张主图必须具备：

- 焦点主体：主体公司、核心指标、关键分项或重点期间。
- 参照基准：同业中位、行业均值、上年同期、阈值、目标或政策要求。
- 单位和口径：百分比、bp、亿元、倍数、样本范围。
- 图内结论：一句短 callout 或标签，说明图表证明什么。
- 数据来源：页脚或图下注明。

禁止：

- 只有图，没有结论。
- 图例和数据标签重复堆叠。
- 用颜色装饰而非强调。
- 坐标轴、单位或样本口径缺失。
- 把不具可比性的主体放在同一排名图中且不注明。

## Emphasis Budget

每页最多使用：

- 1 个主强调色。
- 1-2 个 callout。
- 1 个焦点区域。
- 3 个以内加粗关键词或数字。

不要同时使用颜色、加粗、阴影、箭头和大字号强调同一内容。强调越少，咨询感越强。

## rsm-insurance-results Rhythm

默认保险财务报告风下：

- 正文页优先使用：页眉模块胶囊 + 二级标题 + 结论条 + 主图卡 + 弱页脚。
- 章节页必须使用照片和编号块，不能用普通白底文字页替代。
- 财务结果分析章节以图表卡为主，但每 3-4 页加入一页小结或口径页。
- 主图卡应占据正文主体区域，图表数据较少时必须增加右侧洞察卡、底部指标 strip 或口径说明卡，避免单图漂浮。
- 颜色节奏保持冷静：亮蓝用于结构和焦点，深蓝用于重点数据，灰色用于辅助和负项。
- 红绿不作为大面积业绩判断色，避免把财务分析做成情绪化 dashboard。

## Preset Map Requirement

生成 `preset_map.json` 时，每页至少包含：

```json
{
  "page_id": "P05",
  "page_role": "diagnosis",
  "logic_relationship": "drill_down",
  "density_level": "analysis",
  "visual_profile": "rsm-insurance-results",
  "page_family": "stacked_contribution_split",
  "primary_visual": "2025 vs 2024 利润构成堆叠条",
  "visual_fullness": {
    "body_occupancy_target": "74%-82%",
    "evidence_layers": ["takeaway_bar", "main_chart", "bottom_metric_strip", "source_note"],
    "empty_space_risk": "low"
  },
  "hierarchy_focus": ["claim_title", "investment_contribution", "source_note"],
  "emphasis_budget": {
    "main_color": "results_navy",
    "max_callouts": 2,
    "bold_terms": ["投资收益", "承保贡献"]
  }
}
```

## Visual Rhythm QA

构建前：

- 是否有连续超过 4 页同一 page family。
- 是否每 6-8 页有 synthesis/transition。
- 是否每页都有 `density_level`。
- 是否正文页都只有一个主视觉对象。
- 是否主图满足 Chart As Proof Rule。
- 是否读取 `visual-fullness-standard.md` 并检查正文页有效占用、辅助证据点和空白风险。

构建后：

- 生成 contact sheet，观察页面节奏是否单调。
- contact sheet 中封面、目录、章节、正文、小结、附录是否明显属于同一视觉系统。
- 抽查截图 3 秒阅读顺序。
- 检查强调预算是否超标。
- 检查正文页是否误用了附录密表字号。
- 检查页面是否显得空：主图过小、图表卡内部空、缺少洞察卡或指标 strip。
