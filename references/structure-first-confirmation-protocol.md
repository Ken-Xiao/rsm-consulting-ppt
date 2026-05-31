# Structure-First Confirmation Protocol

用于确保金融咨询 PPT 在生成细节前，先基于用户材料和项目目标确认整体结构、分析框架和叙事主线。核心原则是：**先框架，后细节；先确认故事线，再生成页面内容；先确定章节作用，再选择图表和版式**。

## When To Use

必须使用：

- 从 PDF、PPT、Word、Excel 或多份材料生成新 deck。
- 对现有 PPT 做整体重构、重排故事线或升级为客户交付版。
- `partner-ready`、`client-ready` 或 `pipeline` 档位。
- 用户要求“按照咨询原则拆故事线”“先看逻辑”“先搭框架”。
- 材料涉及金融、法律、估值、监管、风险、合规、投资、交易结构等高影响结论。

可以简化或跳过：

- `quick-polish`：只改字体、颜色、错别字、个别页面排版。
- `targeted-edit`：用户明确指定只改某一页或某个元素。
- 用户明确说“不要确认，直接按材料做”。此时仍需记录假设和未确认风险。

## Non-Negotiable Gate

本协议有两个连续门槛：

1. **Question Gate**：先问 4-8 个确认问题，并等待用户回答。
2. **Framework Gate**：根据用户回答和材料内容，输出整体框架方案，并等待用户确认。

在这两个门槛完成前，不得生成以下内容：

- 完整逐页正文。
- 详细图表数据、图表样式和页面视觉稿。
- PPTX 正式构建。
- 对客户可见的 final deck。

允许先生成：

- 材料阅读摘要。
- 初步事实池或材料目录。
- 推荐分析框架。
- 章节结构和页数预算。
- 只包含主标题方向的故事线草案。
- 需要用户确认的问题清单。

## Question Gate

第一轮必须是问题，而不是方案生成。问题可以带默认假设，但必须让用户选择或修正。

最低问题集：

1. 主要受众和决策动作是什么？
2. 本次是重构故事线，还是保留原结构做表达/视觉升级？
3. 哪些结论、数字、口径或页必须严格保留？
4. 目标页数、阅读时长和信息密度是什么？
5. 默认视觉是否采用 `rsm-insurance-results`，还是沿用原稿或切换其他风格？
6. 有没有敏感表述、禁区或不能写得太直接的内容？

用户回答前，`framework_confirmation_status` 必须保持 `pending_user_answers`。

## Framework Confirmation Package

基于材料先输出一个 `framework_confirmation.md` 或等价内容，包含：

```json
{
  "language_policy": "zh-CN primary",
  "material_readout": "材料主要讲了什么、已经有哪些事实和结论",
  "client_question": "这份报告需要回答的核心问题",
  "deck_answer_hypothesis": "暂定总答案或主判断",
  "recommended_framework": {
    "name": "SCQA / 矛盾-证据-行动 / 反差-诊断-跃迁 / 风险-穿透-建议 / 其他",
    "why": "为什么该框架适合这批材料"
  },
  "module_sequence": [
    {
      "module": "章节名称",
      "role": "setup / diagnosis / evidence / implication / action / appendix",
      "chapter_question": "本章回答的问题",
      "chapter_answer_hypothesis": "本章暂定答案",
      "estimated_pages": 3
    }
  ],
  "page_budget": {
    "target_pages": 25,
    "density": "high / medium / low"
  },
  "visual_profile": "rsm-insurance-results",
  "key_evidence_sources": ["用户材料", "Excel", "公开披露", "待补充来源"],
  "open_questions": ["需要用户确认的问题"],
  "not_generated_yet": ["逐页正文", "正式图表", "PPTX"]
}
```

## User Confirmation Prompt

用中文向用户确认，不要一次性进入页面生成：

```text
我先不进入逐页生成。基于现有材料，我建议这份报告按以下结构走：

1. 核心问题：[client_question]
2. 暂定总答案：[deck_answer_hypothesis]
3. 推荐框架：[recommended_framework]，原因是 [...]
4. 章节结构：
   - 第一章：[章节] — [作用] — [预估页数]
   - 第二章：[章节] — [作用] — [预估页数]
5. 默认语言：中文为主；如需英文或双语，我会单独切换。
6. 默认视觉：[visual_profile]

请先确认三件事：
- 核心问题和总答案方向是否准确？
- 章节是否需要增删或调序？
- 页数、信息密度和视觉风格是否可接受？

确认后，我再展开每页主标题、副标题、图表/表格形式和正文内容。
```

## Confirmation Status

在后续 artifact 中记录：

| Status | Meaning | Next step |
|---|---|---|
| `pending_user_answers` | 已提出问题，等待用户回答 | 不进入框架生成 |
| `pending_framework_confirmation` | 已输出框架方案，等待用户确认 | 不进入逐页生成 |
| `confirmed` | 用户确认框架无修改 | 进入标题链和逐页结构 |
| `confirmed_with_changes` | 用户提出调整 | 先更新框架，再进入细节 |
| `assumed_user_requested_direct` | 用户明确要求跳过提问并直接生成最终 PPT | 可以推进，但交付说明中标记风险 |
| `blocked` | 用户未确认且无法合理假设 | 不进入逐页生成 |

## Quality Rules

- 框架必须来自材料内容和客户问题，而不是套模板。
- 章节名应是“要回答的问题”或“要证明的判断”，不要只是主题词。
- 每个章节必须有明确作用：铺垫、诊断、证据、含义、建议或附录。
- 若材料本身逻辑混乱，先指出可能的重构方向，不要照搬原目录。
- 默认中文表达；英文术语仅在金融惯例、机构名称、准则名称或用户要求时出现。
