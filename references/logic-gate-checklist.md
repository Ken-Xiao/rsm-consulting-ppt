# Logic Gate Checklist

用于把“咨询逻辑”从原则变成可检查的 gate。进入正式构建前、生成 review report 时、以及客户交付前必须读取本文件。

## Core Logic Gates

每份正式 deck 必须通过 7 个逻辑 gate：

| Gate | Pass condition | Fail signal |
|---|---|---|
| G1 Client question | 有一句可决策的 `client_question` | 只是主题，如“银行经营分析” |
| G2 Deck answer | 有一句可被章节支撑的 `client_answer/deck_answer` | 摘要像目录，没有答案 |
| G3 Chapter logic | 每章有 `chapter_question` 和 `chapter_answer` | 章节只是分类堆放 |
| G4 Page claim | 每页标题是判断，且回链章节答案 | 标题是“背景/现状/数据展示” |
| G5 Evidence fit | 主证据能证明页面 claim | 图表与标题不对应 |
| G6 Implication | 核心页有 So what，决策页有 Now what | 只有事实，没有管理含义 |
| G7 Decision path | 有建议时比较路径、推荐理由、不行动后果 | 只写“建议关注/加强/优化” |

## Page Logic Schema

每页在 `storyline_map.json` 或 `visual_intent/Pxx.json` 中必须有：

```json
{
  "page_id": "P08",
  "claim_title": "核心营收下行主要来自息差压缩，中收尚未形成稳定对冲",
  "page_role": "diagnosis",
  "chapter_answer_link": "C02",
  "logic_relationship": "downstream_driver",
  "evidence_object": "2020-2025 净息差与中收转化趋势图",
  "finding": "净息差持续下行，中收/总资产低于样本中位",
  "driver": "资产端重定价快于负债端成本调整",
  "implication": "后续估值修复不能只依赖账面利润，需要验证核心营收质量",
  "counter_hypothesis": "投资收益或拨备释放可能短期支撑利润",
  "next_link": "P09 将进一步拆解资产负债管理缺口"
}
```

## Deck-Level Logic Tests

### Title Spine Test

把所有正文页主标题连读，必须满足：

- 能回答 `client_question`。
- 不依赖演讲者解释也能看出递进关系。
- 没有连续 3 页只是事实描述。
- 章节页和小结页承担节奏切换，不承担核心证明。

Fail examples:

- `行业情况` -> `公司情况` -> `财务数据` -> `问题分析`
- `指标分析` -> `同业对比` -> `趋势分析`，但没有结论。

Pass example:

- `账面利润改善尚未完全转化为核心营收质量`
- `息差压缩是核心营收承压的主要来源`
- `中收转化不足削弱了对息差下行的对冲能力`
- `资产质量分化使估值修复仍需风险指标验证`

### Evidence Ladder Test

每个强结论必须至少满足一项：

- 原始文件或披露数据直接支持。
- 两个以上独立证据交叉支持。
- 可复算模型支持，且公式、口径和假设明确。
- 明确写成情景判断，而不是事实判断。

如果只有项目组推断，标题必须使用 `初步显示`、`可能`、`需进一步验证`。

### Decision Path Test

只要 deck 含建议、路径、行动计划、改革方案或资源投入判断，必须写清：

- 可选路径至少 2 个。
- 推荐路径是什么。
- 推荐理由与证据回链。
- 适用前提与不可用条件。
- 不行动后果。
- 下一步验证事项、责任主体、时间或指标。

## Logic Issue Severity

| Severity | Definition | Delivery impact |
|---|---|---|
| `critical` | 客户问题缺失、核心结论无证据、建议无路径比较、关键事实错误 | 不得交付 |
| `major` | 标题链断裂、章节答案不清、页面证据弱、管理含义缺失 | 不得标记 client-ready |
| `minor` | 副标题承接弱、个别页面 implication 不够具体 | 可交付但需记录 |

## Output

在 `review_report.json` 增加：

```json
{
  "logic_gate_review": {
    "client_question": "pass",
    "deck_answer": "pass",
    "chapter_logic": "warning",
    "page_claims": "pass",
    "evidence_fit": "warning",
    "implication": "pass",
    "decision_path": "pass",
    "critical": [],
    "major": [
      {
        "page": "P12",
        "issue": "页面 claim 与主图证据不完全对应",
        "fix": "将标题降级为趋势观察，或补充同业基准图"
      }
    ]
  }
}
```
