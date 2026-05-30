# Insight Discovery

用于在叙事架构前扫描 `data_pool.json`，让数据先提出可能的叙事线。不要把扫描结果直接写成结论；先呈现给用户确认。

## Inputs

- `data_pool.json`
- `project_config.yaml`
- `brief.json`

## Output: insights.json

```json
{
  "insights": [
    {
      "type": "rank_divergence",
      "severity": "high",
      "description": "ROA排名前段，但风险调整后收益排名后段",
      "indicators": ["roa", "raroc"],
      "narrative_implication": "账面表现与价值质量存在背离",
      "suggested_module": "profitability_deepdive",
      "suggested_page_type": "ranking_bar"
    }
  ]
}
```

## Insight Density Governor

数据扫描后先做 `insight_triage`，控制 deck 不试图“说太多事”。

规则：

- 核心洞察数量不超过 `3 × chapter_count`。
- 超出阈值的洞察进入 `appendix_candidates`，不是删除。
- 排序维度优先为客户决策影响，其次为证据强度，再次为呈现可解释性。

```json
{
  "insight_triage": {
    "chapter_count": 4,
    "core_insight_limit": 12,
    "selected_core_insights": ["I001", "I003"],
    "appendix_candidates": ["I009"],
    "excluded_insights": [
      {"insight_id": "I010", "reason": "证据弱且与客户决策关联低"}
    ]
  }
}
```

不要因为数据扫描发现很多模式就把所有洞察放入正文。选择不说什么，是咨询 deck 的一部分。

## Scan Rules

### 1. Rank Divergence

同一主体在两个相关指标的排名差距 >= 3 位：

- ROA vs RAROC
- ROE vs PB
- 营收增速 vs 利润增速
- 资产规模 vs 盈利质量
- 估值水平 vs 现金流覆盖

Implication：可能存在“账面与质量背离”“规模与效率背离”“市场定价未认可”。

### 2. Trend Divergence

理论上应同向变化的指标出现背离：

- 净利润上升，核心营收下降。
- 资产扩张，资本充足率下降。
- 租金增长，NOI 不增长。
- 估值上升，DSCR 下降。

Implication：利润/估值/现金流来源结构可能变化。

### 3. Extremes

指标排名第 1、末位、或显著偏离中位：

- 排名前段：可作为优势或防御项。
- 排名末位：可作为短板或风险项。
- 偏离中位超过阈值：需要解释原因。

### 4. Cluster Separation

样本自然分为 3-4 个梯队：

- 银行估值/盈利梯队。
- 资产风险收益梯队。
- 行业竞争梯队。

Implication：可生成竞争格局页或定位页。

### 5. Regression / Attribution Signal

仅在数据足够且口径清晰时使用：

- PB 驱动因子。
- 估值与 NOI / cap rate / IRR 的关系。
- 风险指标与价格折扣的关系。

必须区分相关性和因果，不要把统计相关写成政策或经营因果。

## Present To User

```text
数据扫描发现 [N] 个值得关注的模式：

高优先级：
1. [发现] — [叙事含义] — 建议放入 [模块]

中优先级：
2. ...

你希望把哪些发现作为核心叙事线？有没有需要排除或补充的判断？
```

## Quality Rules

- 不使用没有来源的数字。
- 不把探索性发现写成定论。
- 法律、估值和投资判断必须保留前提。
- 用户否定的发现不得进入核心叙事。
