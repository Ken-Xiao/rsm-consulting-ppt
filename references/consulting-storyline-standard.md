# Consulting Storyline Standard

用于把金融 PPT 从“逐页整理材料”提升为“咨询式论证”。进入 `outline.json`、`title_spine.md` 或 `storyline_map.json` 前必须读取本文件。

## Core Principle

专业咨询 deck 必须先回答一个高层问题，再逐层拆成章节答案和页面判断：

```text
Executive question
  -> Deck answer
    -> Chapter answers
      -> Page claims
        -> Evidence objects
```

不要先堆页面再找主线。每页必须服务于一个明确的章节答案。

客户交付版必须把高层问题改写为 `client_question`，把总答案改写为 `client_answer`。这两句话应足够直接，可以放入执行摘要首页。

## Pyramid Output

在复杂项目中，先生成 `consulting_pyramid.json`：

```json
{
  "client_question": "新准则下上市险企利润改善是否可持续，后续应重点看哪些指标？",
  "client_answer": "短期利润改善更多来自投资和准则口径变化，客户应将承保质量、费用效率和投资收益稳定性作为后续监控主线",
  "executive_question": "新准则下上市险企利润增长是否具有可持续性？",
  "deck_answer": "利润改善更多来自投资和准则口径变化，承保质量和费用效率仍需分主体判断",
  "chapter_answers": [
    {
      "chapter_id": "C01",
      "chapter_title": "整体财务结果",
      "chapter_answer": "样本公司利润普遍改善，但增长来源分化明显",
      "supporting_pages": ["P04", "P05", "P06"]
    }
  ]
}
```

规则：

- `deck_answer` 必须能被 3-5 个 `chapter_answer` 支撑。
- `client_answer` 必须比 `deck_answer` 更面向客户行动，不能只是分析发现。
- 每个 `chapter_answer` 必须被 2-6 页正文支撑。
- 执行摘要只能压缩 `chapter_answer`，不能引入正文没有证明的新结论。
- 如果某页无法映射到任何 `chapter_answer`，删除、合并或移入附录。

## Page Consulting Logic

每页必须包含以下四类信息之一或多项，但不得混乱：

| Field | Meaning | Example |
|---|---|---|
| `finding` | 事实发现 | `样本公司净利润同比普遍改善，但承保贡献下降` |
| `driver` | 原因/机制 | `投资收益回暖和折现率变动是主要驱动` |
| `implication` | 管理含义 | `利润改善的可持续性需回到承保质量和费用效率验证` |
| `recommended_action` | 行动建议 | `后续应分主体拆解承保、投资和费用三类利润来源` |

诊断页至少有 `finding + driver`。  
决策页至少有 `finding + implication + recommended_action`。  
证明页可以只有 `finding`，但标题必须说明该发现支撑什么判断。

## Executive Summary Rule

客户交付版的执行摘要必须使用“结论 / 证据 / 含义 / 建议”结构：

| Block | Requirement |
|---|---|
| 结论 | 直接回答客户问题，不写背景 |
| 证据 | 引用正文已证明的 2-4 个关键事实 |
| 含义 | 说明对客户决策、管理动作或风险判断的影响 |
| 建议 | 给出下一步动作、验证事项或监控指标 |

摘要页禁止：

- 摘要只列章节目录。
- 引入正文没有证明的新判断。
- 用“整体向好、仍需关注”这类低信息密度表达。
- 建议没有责任边界、动作或指标。

## So What / Now What Rule

核心页面必须回答两个问题：

- **So what**：这个发现为什么重要？对管理层、投委会、董事会、监管/合规判断有什么含义？
- **Now what**：下一步应该验证、选择、授权、调整或监控什么？

常用结构：

```text
发现：A 指标较 B 出现背离
含义：说明原有总量判断不足，需要拆解结构
下一步：后续分析转向 C 维度，验证背离来源
```

不要把 `So what` 写成空话，如“需要持续关注”“具有重要意义”。必须指向具体管理动作或后续分析。

## Counter-Hypothesis Check

强结论页必须检查替代解释：

| Situation | Required check |
|---|---|
| 归因判断 | 是否可能由口径、样本或一次性因素导致？ |
| 同业比较 | 是否存在规模、区域、业务结构不可比？ |
| 趋势判断 | 是否受基期、会计准则、披露变化影响？ |
| 估值/交易判断 | 是否存在市场情绪、流动性、政策预期等替代解释？ |
| 风险判断 | 是否有缓释措施、抵质押、期限结构或合同条款影响？ |

输出时在页面规划中加入：

```json
{
  "counter_hypothesis": "利润改善可能来自一次性投资收益，而非经营质量改善",
  "why_current_view_is_preferred": "承保贡献下降和费用率上升同时出现，支持经营质量仍需验证"
}
```

如果无法排除替代解释，标题必须降低判断强度，使用“初步显示”“可能”“需进一步验证”。

## Chapter Close Rule

每个章节末尾建议有一个小结页或桥接页，除非章节少于 3 页。

章节小结必须包含：

- 本章回答了什么问题。
- 3 个以内关键发现。
- 对下一章的引导。
- 对最终建议的贡献。

示例：

```text
本章确认利润改善并不等同于质量改善；下一章将从承保、投资和费用三条线拆解增长来源。
```

## Consulting QA

进入构建前检查：

- 是否有 `executive_question` 和 `deck_answer`。
- 每个章节是否有一句 `chapter_answer`。
- 每页 claim 是否能回链到一个 chapter answer。
- 摘要页是否只使用正文已证明的结论。
- 核心页是否有 `So what`，决策页是否有 `Now what`。
- 强结论是否做过 counter-hypothesis check。
- 是否存在“事实页很多，但没有章节答案”的情况。
