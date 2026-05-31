# Insight To Layout Mapper

用于把 `insights.json` 中的数据发现转成页面角色、逻辑关系和稳定 page family。进入 `preset_map.json` 前必须读取本文件，避免“有洞察但版式随手选”。

## Core Principle

先判断洞察类型，再选择视觉表达。页面版式必须解释“为什么这种图形最能证明这句话”，不能只因为模板好看。

## Required Position

```text
insights.json
  -> insight_layout_map.json
  -> content_density_report.json
  -> storyline_map.json / outline.json
  -> preset_map.json
```

没有 `insight_layout_map.json` 的完整项目，不得进入 `preset_map.json`。

## Insight Type Mapping

| insight_type | 典型含义 | 推荐 page_role | 推荐 logic_relationship | 首选 page family | 备选 page family |
|---|---|---|---|---|---|
| `rank_divergence` | 两个指标排名明显背离 | `diagnosis` | `comparison` | `chart_plus_insight_panel` | `sunong_chart_diagnostic`, `financial_metric_grid` |
| `trend_divergence` | 两条趋势或两个期间方向不一致 | `diagnosis` | `causal_chain` / `comparison` | `paired_period_comparison` | `insurance_results_chart_card` |
| `extreme_value` | 指标处于最高、最低或异常区间 | `evidence` | `comparison` | `insurance_results_chart_card` | `chart_plus_insight_panel` |
| `contribution_split` | 总量由多个分项贡献或拖累 | `diagnosis` | `drill_down` | `stacked_contribution_split` | `insurance_results_chart_card` |
| `policy_difference` | 政策、准则、口径或地区制度差异 | `evidence` | `comparison` | `accounting_policy_note` | `policy_matrix` |
| `scenario_sensitivity` | 双变量假设影响结果 | `evidence` | `synthesis` | `financial_metric_grid` | `management_action_plan` |
| `structural_contradiction` | 正负信号共存，需要提炼矛盾 | `transition` / `implication` | `synthesis` | `chapter_synthesis` | `executive_takeaways` |
| `action_need` | 发现可转化为行动或授权事项 | `action` | `progression` | `management_action_plan` | `three_recommendation_cards` |

如果无法归类，先向用户或项目 brief 回问，不得用 `freeform` 作为默认方案。

## Required Fields

`insight_layout_map.json` 每页或每条洞察必须包含：

```json
{
  "page_id": "P05",
  "insight_id": "insight_003",
  "insight_type": "contribution_split",
  "claim_title": "利润改善主要来自投资端，承保端仍需单独验证",
  "recommended_page_family": "stacked_contribution_split",
  "fallback_page_family": "insurance_results_chart_card",
  "page_role": "diagnosis",
  "logic_relationship": "drill_down",
  "layout_reason": "本页要解释净利润增长来源，堆叠贡献图能直接拆出投资、承保、所得税和其他项的贡献差异",
  "required_evidence": [
    "2025 vs 2024 净利润",
    "承保贡献",
    "投资贡献",
    "所得税及其他项"
  ],
  "expected_supporting_layer": ["takeaway_bar", "metric_strip", "source_note"]
}
```

## Mapping Rules

### Rule 1: 排名背离必须用“对比 + 解释”

`rank_divergence` 页面不能只放一个排名图。必须至少展示：

- 指标 A 的排名或位置。
- 指标 B 的排名或位置。
- 排名差异或价值含义。
- 为什么该背离对管理层重要。

### Rule 2: 趋势背离必须显示同一时间轴或同一口径

`trend_divergence` 若两个指标口径不同，副标题必须说明口径边界；视觉上应优先用双轴谨慎呈现，或拆为左右双卡，不默认双轴折线。

### Rule 3: 构成拆分必须有“总量 + 分项 + 读法”

`contribution_split` 页面必须同时展示总量变化、分项贡献和 1-2 个读法标签。只有堆叠图而没有读法，不能进入客户交付。

### Rule 4: 政策/口径差异优先矩阵，不优先长段文字

政策、准则、监管或地区比较页，应使用矩阵、双列比较或制度地图。长段落只能作为注释，不作为主证据。

### Rule 5: 行动页必须回链诊断洞察

`action_need` 页面必须包含 `linked_insight_ids` 或 `linked_contradiction_ids`。如果行动没有来源洞察，应降级为“待讨论建议”。

## Layout Reason Test

每个 page family 都必须通过一句话测试：

> “因为本页要证明 [claim]，且证据形态是 [evidence shape]，所以使用 [page family]，它能让读者先看到 [first read]，再得到 [second read]。”

不能写出这句话，说明版式还没有选对。

## Output Gate

进入 `content_density_report.json` 前检查：

- 每条核心洞察有 `insight_type`。
- 每页有 `recommended_page_family`。
- 每页有 `layout_reason`。
- 推荐 page family 在当前 visual profile 的 layout lock 白名单或 fallback 中。
- 每页的证据形态与 page family 契约一致。
