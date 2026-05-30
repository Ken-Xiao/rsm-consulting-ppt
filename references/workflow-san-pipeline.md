# PPT Agent Workflow SAN Adaptation

参考 `mucsbr/ppt-agent-workflow-san` 的思想，把 PPT 生产拆成两个可审阅阶段：

1. `ppt-workflow`：先完成策略、研究、结构、页面策划和视觉蓝图。
2. `html-slide-to-pptx`：再按页面家族 preset 生成可编辑 PPTX。

不要从一句 prompt 直接跳到 PPTX。金融咨询 deck 的质量来自中间产物，而不是一次性生成。

## Core Philosophy

`workflow-san` 的核心不是“更复杂”，而是把随机生成改成可控流水线：

- 内容先于设计：先确认 brief、事实池、主线、页级脚本。
- 页面先归类再设计：每页必须匹配一个 preset/page family。
- HTML 只负责复杂视觉主体；PPTX 仍要保留可编辑文本和结构。
- 每一阶段都有可检查产物，用户可以在进入下一阶段前确认。

## Two-Layer Pipeline

### Layer 1: Planning Workflow

目标：输出可以审阅的完整 PPT 策划包，而不是直接生成 slides。

| Stage | Role | Output |
|---|---|---|
| 0. Intake Router | 判断任务类型和场景 | `project_config.yaml` |
| 1. Strategic Brief | 受众、决策、范围、视觉偏好 | `brief.json` |
| 2. Source Digest | 提取用户材料、PDF/PPT/Excel事实 | `source_digest.md` |
| 3. Fact/Data Pool | 结构化事实、指标、口径、来源 | `data_pool.json` + `lineage_map.json` |
| 4. Insight Spine | 找主要发现和叙事张力 | `insights.json` |
| 5. Conclusion Evidence Matrix | 绑定核心结论、证据强度、限制和页面 | `conclusion_evidence_matrix.json` |
| 6. Argument Map | 建立客户问题、章节答案、页面判断和证据对象 | `argument_map.json` |
| 7. Storyline Split | 拆主标题故事线、副标题和逐页角色 | `title_spine.md` + `storyline_map.json` |
| 8. Slide Plan | 页级标题、证明对象、版式 | `outline.json` |
| 9. Design Blueprint | visual profile、网格、字号、preset 映射 | `design_system.json` |

### Layer 2: Preset Build Workflow

目标：把 `outline.json` 的每页映射到稳定 preset，再构建 PPTX。

| Stage | Role | Output |
|---|---|---|
| 10. Template Manifest | 将 page family 映射到模板、必填字段和 QA 重点 | `template_manifest.json` |
| 11. Preset Assignment | 给每页分配 page family | `preset_map.json` |
| 12. Page Visual Intent | 为每页定义逻辑关系和视觉表达 | `visual_intent/Pxx.json` |
| 13. Page Family Contract | 校验每页 preset 输入字段和版式约束 | `preset_map.json` updated |
| 14. Chart Data Adapter | 把数据转成图表输入并补图表观点/基准/口径 | `chart_data/Pxx.json` |
| 15. Image Asset Register | 登记封面图、章节图、案例图、AI 生成图和使用边界 | `image_assets.json` |
| 16. HTML/PPT Draft | 用 preset 生成页面主体 | `draft_pages/` |
| 17. PPTX Assembly | 组装可编辑 PPTX | `.pptx` |
| 18. Visual QA | 渲染截图检查溢出/重叠/字号/图表/图片 | `review_report.json` |
| 19. Repair Loop | 修复最弱页面并重渲染 | final `.pptx` |

## Required Checkpoints

复杂项目至少停三次：

1. **Brief checkpoint**：确认受众、核心问题、页数、视觉风格。
2. **Storyline checkpoint**：确认主标题连读能形成完整故事线，副标题能承接上下页。
3. **Outline checkpoint**：确认模块、页序、每页一句结论和一个证明对象。
4. **Visual checkpoint**：确认 visual profile、页面 family、样张。

用户明确要求“直接按现有材料优化”时，可合并 checkpoint，但仍要在内部形成 `outline` 和 `preset_map`。

## Professional Gates

进入批量构建前必须读取：

- `professional-consulting-standard.md`：检查每页是否有决策含义、证据强度和管理含义。
- `conclusion-evidence-matrix.md`：检查核心结论是否有证据、证据强度、限制和替代解释。
- `storyline-page-planning.md`：检查主标题故事线、副标题承接、逐页角色和逻辑关系。
- `data-lineage-protocol.md`：建立关键数字和图表的血缘表。
- `methodology-packs.md`：按场景补齐样本、指标、口径、限制和方法论页。
- `financial-chart-grammar.md`：检查图表画法是否符合金融咨询规范。
- `professional-chart-rulebook.md`：检查核心图表观点、基准、标注、比较口径和禁用场景。
- `professional-image-rulebook.md`：检查图片角色、AI 生成边界、证据图片来源和版权。
- `page-family-contracts.md`：检查每页 preset 的必填字段、最大文字量、主视觉对象、可编辑性和禁用项。
- `editability-check.md`：检查最终 PPTX 是否可维护，不把关键内容整页图片化。
- `deck-quality-scorecard.md`：对最终 deck 做量化评分。

这些 gate 的输出应进入 `review_report.json` 或等价审校记录。

## Default Visual Profile

默认视觉使用 `rsm-insurance-results`，即 `2025年度上市保险公司新准则财务结果分析` 风格：

- 白底、亮蓝粗标题。
- 左上 RSM 三色短条。
- 右上浅蓝模块胶囊 + 大号章节编号。
- 二级标题深灰。
- 浅灰结论条 + 左侧亮蓝竖线。
- 主图置于白色阴影图表卡。
- 图表主色为亮蓝、深蓝、中灰、浅蓝。
- 页脚弱化，仅保留来源、版权和页码。

只有在用户指定不良处置培训、案例分享或原稿明确是书法标题/建筑照片风时，才切换到 `rsm-practice-sharing`。

对标两份 RSM 参考 PDF 时，读取 `references/rsm-reference-visual-dna.md`。视觉复刻优先级为：

1. 页面类型是否正确：封面、目录、章节、正文、案例、图表卡。
2. visual profile 是否正确：保险结果页 vs 实践分享页。
3. chrome 是否一致：页眉、标题线、模块胶囊、页脚。
4. 主体容器是否一致：图表卡、浅灰证据框、蓝色机制带、案例卡。
5. 图表色板和字体是否一致。

## Preset Families

每页必须属于一个 preset family。不要临时发明自由布局，除非用户明确要求或现有 family 无法覆盖。

### Insurance Results Defaults

| Preset family | Use when | Visual profile |
|---|---|---|
| `insurance_cover` | 保险/金融报告封面 | `rsm-insurance-results` |
| `insurance_agenda` | 目录/章节导航 | `rsm-insurance-results` |
| `insurance_section` | 章节转折 | `rsm-insurance-results` |
| `insurance_results_chart_card` | 单页核心图表 | `rsm-insurance-results` |
| `paired_period_comparison` | 2025 vs 2024、新旧准则口径 | `rsm-insurance-results` |
| `stacked_contribution_split` | 利润/收入/费用/资产构成 | `rsm-insurance-results` |
| `financial_metric_grid` | 多指标对照 | `rsm-insurance-results` |
| `accounting_policy_note` | 准则口径、披露差异说明 | `rsm-insurance-results` |
| `executive_takeaways` | 执行摘要 | `rsm-insurance-results` |

### Practice Sharing Fallbacks

| Preset family | Use when | Visual profile |
|---|---|---|
| `practice_photo_cover` | 培训分享封面 | `rsm-practice-sharing` |
| `practice_agenda` | 培训目录 | `rsm-practice-sharing` |
| `practice_section_divider` | 实践分享章节页 | `rsm-practice-sharing` |
| `case_evidence_panel` | 案例事实 + 规则依据 + 建议 | `rsm-practice-sharing` |
| `two_case_with_center_mechanism` | 两个案例证明同一机制 | `rsm-practice-sharing` |
| `three_recommendation_cards` | 三项建议 | `rsm-practice-sharing` |
| `risk_network_diagram` | 复杂结构/非标资产风险传导 | `rsm-practice-sharing` |

## Preset Map Schema

```json
{
  "pages": [
    {
      "page_id": "P05",
      "claim_title": "净利润增长背后，承保与投资贡献结构明显分化",
      "story_subtitle": "基于 7 家上市险企披露数据，将净利润拆分为承保、投资、所得税和其他项，识别增长来源差异",
      "page_role": "diagnosis",
      "logic_relationship": "drill_down",
      "previous_link": "上一页确认样本公司净利润普遍增长",
      "next_link": "下一页进一步拆解综合收益和投资波动来源",
      "preset_family": "stacked_contribution_split",
      "visual_profile": "rsm-insurance-results",
      "visual_intent": {
        "primary_message": "投资贡献回升与承保贡献下降的结构分化",
        "emphasis": ["投资贡献", "承保贡献下降"],
        "highlight_method": ["deep_navy_for_focus", "bold_labels", "callout_note"]
      },
      "render_strategy": "native_ppt_chart_or_echarts_body",
      "editable_elements": ["title", "takeaway", "source", "page_number", "legend"],
      "rasterized_elements": ["main_chart"],
      "source_files": ["chart_data/P05.json"],
      "chart_data": "chart_data/P05.json",
      "lineage_ids": ["fact_001", "fact_002"],
      "qa_focus": ["label_readability", "chart_card_alignment", "source_traceability"]
    }
  ]
}
```

## Page Script Requirements

进入构建前，每页必须有 page script：

- `claim_title`：一句结论，不是主题词。
- `story_subtitle`：补充细节、承上启下，并连接页面主体。
- `page_role`：本页在故事线中的角色，如 `setup`、`diagnosis`、`evidence`、`transition`、`implication`、`action`。
- `logic_relationship`：本页与前后页的逻辑关系，如 `progression`、`parallel`、`comparison`、`causal_chain`、`drill_down`、`synthesis`。
- `previous_link` / `next_link`：本页如何承接上一页、引导下一页。
- `evidence_object`：主图/表/流程/案例卡。
- `takeaway_text`：1-3 条短句。
- `data_source`：来源文件、页码、口径。
- `lineage_ids`：关键数字和图表对应的血缘记录。
- `conclusion_id`：本页判断对应的 `conclusion_evidence_matrix` 结论编号。
- `preset_family`：使用的页面家族。
- `visual_intent`：本页需要用什么视觉形式表达逻辑关系，哪些重点需要颜色、加粗、callout 或图表强调。
- `render_strategy`：原生、HTML、ECharts 或混合。

### Section Divider Script

章节页必须使用独立脚本，不得复用正文页脚本：

- `page_role`: `section_divider`
- `section_number`: 章节编号
- `section_title`: 章节名称
- `chapter_question`: 本章要回答的问题
- `chapter_answer`: 可选，本章先给出的方向性回答
- `hero_image`: 用户图片或生成图片资产
- `image_prompt`: 若使用生成图片，记录 prompt
- `preset_family`: `insurance_section_divider` 或 `practice_section_divider`
- `render_strategy`: `native_text_plus_background_image`

## Storyline Before Slide Design

在进入 preset assignment 前，必须完成：

1. 输出 `title_spine.md`：只列所有主标题，检查能否连读成完整故事线。
2. 输出 `storyline_map.json`：记录每页主标题、副标题、页面角色、逻辑关系、前后页连接。
3. 检查所有副标题是否能为主标题提供细节，并连接具体内容。
4. 检查每页是否只证明故事线中的一个环节。

若主标题连读不成逻辑链，不允许进入视觉设计。

## Visual Intent Before Rendering

每页分配 page family 前先判断逻辑表达方式：

- 递进：用阶梯、流程、桥接、分阶段卡。
- 并列：用三栏、2x2、并列卡片、矩阵。
- 对比：用双列、双期间图、对照表、差异标记。
- 因果/传导：用箭头链、瀑布、机制图。
- 下钻：用总分结构、拆解图、分面图。
- 综合：用小结卡、证据汇总、决策表。

视觉强调规则：

- 颜色只突出焦点主体、关键分项和正负语义。
- 加粗只突出关键判断、指标名、公司名或变化方向。
- callout 每页最多 2 个。
- 数字呈现必须先判断任务：趋势、排名、构成、差异、敏感性或口径说明。
- 表格和图片必须符合当前 template 的色板、字号、网格和页脚规则。
- 核心图表必须包含图表观点、基准、单位、期间、样本、来源和 lineage。
- 图片必须标记 image role、source/prompt、usage boundary 和 copyright note。

完成 `visual_intent/Pxx.json` 后，再用 `page-family-contracts.md` 检查所选 preset 是否匹配本页逻辑关系、文字量和主证明对象。

## Build Rules

- 先生成 2-3 页代表性样张，再批量生成全 deck。
- 不把整页压成图片；标题、脚注、来源和页码必须可编辑。
- 对于 `rsm-insurance-results`，主图卡可以使用 ECharts/SVG 渲染，但图表数据必须保留在 `chart_data/`。
- 每生成一批页面后立即渲染 contact sheet，优先修最弱页面。
- 如果某页文字必须缩到低于字号底线，必须拆页或换 preset。
- 大改 visual、preset、CSS 或渲染引擎后，读取 `sample-regression-test.md` 生成样张回归测试。
- 交付前读取 `deck-quality-scorecard.md`，输出总分和是否达到 `client-ready`。
- 交付前读取 `editability-check.md`，检查关键文字、数字和表格是否可编辑。

## When To Use This File

- 用户提到 `ppt-agent-workflow-san`。
- 用户要求重新规划整个 skill 流程。
- 用户希望从“一次性做 PPT”升级成可复用生产工作流。
- 用户要把某个参考 PDF 风格固化为默认模板。
