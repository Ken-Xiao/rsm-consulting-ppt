# Contradiction Synthesis Protocol

用于把专题分析后的零散发现，提炼为客户能决策的“结构性矛盾”。适用于董事会深度分析、经营诊断、价值创造、风险审查和需要从问题转向行动的金融咨询 deck。

## Core Principle

不要凭感觉写“三大矛盾”。矛盾必须来自前文已经证明的正负信号共存，并且能解释为什么客户现在需要采取行动。

## Required Inputs

- `module_summary` 或每章小结。
- `insights.json` 中的排名跳变、趋势背离、极值、聚类和回归信号。
- `conclusion_evidence_matrix.json` 中的核心结论。
- `argument_map.json` 中的章节答案和页面证据对象。

## Synthesis Steps

1. **Collect signals**
   - 从每个专题模块提取 `positive_signal`、`negative_signal`、`neutral_constraint`。
   - 每个 signal 必须带来源页面和证据强度。

2. **Cluster by driver**
   - 将 signal 聚类到以下驱动因素：
     - 收入结构
     - 成本结构
     - 风险定价
     - 资产质量
     - 资本配置
     - 组织效能
     - 客户/渠道能力
     - 监管/会计约束

3. **Find contradiction pairs**
   - 在同一驱动因素内寻找正负信号共存：
     - `账面指标领先` vs `风险调整后排名下滑`
     - `利润增长` vs `核心营收走弱`
     - `规模扩张` vs `资本消耗上升`
     - `资产端收益承压` vs `负债成本刚性`
     - `政策空间存在` vs `落地条件不足`

4. **Rank by decision impact**
   - 按四项排序：
     - 对客户核心问题的解释力。
     - 是否影响未来 12 个月行动。
     - 证据强度。
     - 是否能连接到可执行行动项。
   - 只保留 top 3，最多 top 4。

5. **Write contradiction statement**
   - 标准句式：
     - `矛盾一：[正向信号] 已出现，但 [负向信号] 限制其转化为 [客户关心的结果]。`
     - `矛盾二：[表层结果] 与 [穿透指标] 出现背离，提示 [管理含义]。`
     - `矛盾三：[短期支撑] 可以缓释压力，但 [中长期约束] 仍需通过 [行动路径] 解决。`

## Output Schema

```json
{
  "contradictions": [
    {
      "contradiction_id": "ct_001",
      "statement": "ROA 位于样本前段，但风险调整后收益排名下移，账面优势尚未完全转化为价值优势",
      "positive_signal": {
        "description": "ROA 排名第 3/9",
        "source_pages": ["P15"],
        "evidence_strength": "high"
      },
      "negative_signal": {
        "description": "RAROC 排名第 9/9",
        "source_pages": ["P16"],
        "evidence_strength": "medium"
      },
      "driver_cluster": "风险定价",
      "decision_implication": "行动方案应优先验证风险定价和资产质量，而不是只追求利润总量",
      "recommended_action_links": ["act_001", "act_003"]
    }
  ]
}
```

## Failure Signals

- 矛盾只是“问题清单”，没有正负信号张力。
- 矛盾首次出现于总结页，前文没有证据。
- 三个矛盾互相重复，只是换词表达。
- 矛盾无法推导出行动项。

## Gate

进入行动地图前必须检查：

- 每个行动项至少回链一个 `contradiction_id`。
- 每个 `contradiction_id` 至少有两个来源页面。
- 矛盾表述必须是中文判断句，不写成主题词。
