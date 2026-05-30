# Artifact Schema Library

用于统一复杂 PPT 生产中的中间产物字段。生成 `brief.json`、`data_pool.json`、`lineage_map.json`、`storyline_map.json`、`preset_map.json`、`chart_data/`、`visual_intent/` 或 review report 前读取本文件。

## Naming Rules

- 页码统一写成 `P01`、`P02`，章节统一写成 `C01`、`C02`。
- 同一个事实使用稳定 `fact_id`，同一个结论使用稳定 `conclusion_id`，同一个来源使用稳定 `source_id`。
- 字段名使用 snake_case。
- 不确定内容必须显式写 `confidence`、`assumption` 或 `requires_confirmation`，不要伪装成事实。
- 用户材料来自文件时，记录 `source_file`、`page_or_sheet` 和 `extraction_note`。

## Minimum Artifact Set By Tier

| Tier | Required artifacts |
|---|---|
| `quick-polish` | `polish_notes` 或等价说明；可选 `page_fix_list` |
| `partner-ready` | `brief`, `consulting_pyramid`, `title_spine`, `outline`, `preset_map`, `review_report` |
| `client-ready` | `brief`, `source_digest`, `data_pool`, `lineage_map`, `conclusion_evidence_matrix`, `argument_map`, `storyline_map`, `preset_map`, `chart_data`, `visual_intent`, `contact_sheet`, `final_review_report`, `quality_scorecard` |
| `pipeline` | `project_config`, `template_manifest`, `profile_registry`, `sample_manifest`, `regression_report`, plus representative artifacts above |

## `brief.json`

```json
{
  "tier": "client-ready",
  "route": "create",
  "audience": "管理层",
  "client_name": "客户名称或匿名主体",
  "client_question": "是否/如何/优先做什么",
  "decision_to_make": "需要客户授权、选择或确认的事项",
  "scope": "覆盖主体、期间、地区、业务或交易范围",
  "source_boundaries": ["用户材料", "公开披露", "项目组测算"],
  "audience_expertise_level": "informed",
  "bilingual": false,
  "page_count_target": 18,
  "visual_profile": "rsm-insurance-results",
  "constraints": ["沿用 logo", "不得新增未核验数据"],
  "open_questions": []
}
```

## `source_digest.md` / `source_digest.json`

每个来源至少记录：

```json
{
  "source_id": "S001",
  "source_file": "原始材料.pdf",
  "source_type": "pdf",
  "page_or_sheet": "p.12",
  "extracted_facts": ["F001", "F002"],
  "usable_visual_cues": ["可复用结构图，但需重绘"],
  "limitations": ["口径只覆盖上市样本"],
  "confidence": "medium"
}
```

## `data_pool.json`

```json
{
  "facts": [
    {
      "fact_id": "F001",
      "metric": "净利润同比增速",
      "entity": "公司A",
      "period": "2025H1",
      "value": 12.3,
      "unit": "%",
      "source_id": "S001",
      "calculation": null,
      "confidence": "high",
      "as_of_date": "2026-03-31",
      "publication_date": "2026-04-28",
      "retrieved_date": "2026-05-30",
      "freshness_tier": "fresh",
      "evidence_credibility": "L2-official",
      "notes": "示例数据，不用于正式结论"
    }
  ]
}
```

## `lineage_map.json`

```json
{
  "lineage": [
    {
      "lineage_id": "L001",
      "fact_ids": ["F001", "F002"],
      "derived_metric": "利润改善幅度",
      "used_on_pages": ["P07"],
      "used_in_charts": ["P07_main_chart"],
      "calculation_note": "同比变化，样本口径一致",
      "source_ids": ["S001"],
      "review_status": "checked"
    }
  ]
}
```

## `consulting_pyramid.json`

```json
{
  "client_question": "新准则下利润改善是否可持续？",
  "client_answer": "短期改善更多来自投资和准则口径变化，后续应以承保质量、费用效率和投资收益稳定性作为监控主线",
  "executive_question": "利润改善是否具有可持续性？",
  "deck_answer": "利润改善普遍出现，但增长来源分化，需要拆解三类驱动验证质量",
  "chapter_answers": [
    {
      "chapter_id": "C01",
      "chapter_title": "整体结果",
      "chapter_answer": "利润改善已出现，但主体差异扩大",
      "supporting_pages": ["P04", "P05", "P06"]
    }
  ]
}
```

## `conclusion_evidence_matrix.json`

```json
{
  "conclusions": [
    {
      "conclusion_id": "CNL001",
      "page_id": "P07",
      "claim": "利润改善主要来自投资端，承保贡献仍需验证",
      "evidence_fact_ids": ["F001", "F002"],
      "lineage_ids": ["L001"],
      "evidence_strength": "medium",
      "evidence_credibility": "L2-official",
      "freshness_tier": "fresh",
      "limitations": ["样本只覆盖上市主体"],
      "counter_hypothesis": "改善可能来自一次性因素",
      "wording_strength": "初步显示"
    }
  ]
}
```

## `storyline_map.json`

```json
{
  "pages": [
    {
      "page_id": "P07",
      "chapter_id": "C01",
      "claim_title": "利润改善主要来自投资端，承保贡献仍需验证",
      "story_subtitle": "该页解释利润增长来源，为后续三线监控建议提供依据",
      "finding": "投资收益改善贡献较高",
      "driver": "资本市场回暖和准则口径影响",
      "implication": "不能仅用利润总量判断经营质量",
      "recommended_action": "将承保、费用、投资三线指标纳入季度复盘",
      "conclusion_id": "CNL001"
    }
  ]
}
```

## `preset_map.json`

```json
{
  "pages": [
    {
      "page_id": "P07",
      "preset_family": "insurance_results_chart_card",
      "visual_profile": "rsm-insurance-results",
      "render_strategy": "html-image-with-native-text",
      "primary_evidence_object": "stacked_contribution_chart",
      "density": "medium-high",
      "rhythm_score": 4,
      "rhythm_role": "evidence",
      "chapter_tone": "neutral",
      "color_temperature": "neutral",
      "editable_elements": ["claim_title", "story_subtitle", "takeaway_text", "source_note"],
      "rasterized_elements": ["main_chart"],
      "qa_focus": ["chart_labels", "source_traceability", "takeaway_bar_readability"]
    }
  ]
}
```

## `chart_data/Pxx.json`

```json
{
  "page_id": "P07",
  "chart_id": "P07_main_chart",
  "chart_type": "stacked_bar",
  "chart_point_of_view": "利润改善更多来自投资端贡献",
  "chart_render_path": "native-chart",
  "benchmark_type": "year_over_year",
  "focus_series": ["投资收益", "承保利润"],
  "annotation_priority": ["投资端贡献", "承保贡献下降"],
  "chart_readout": "利润总量改善不等同于经营质量改善",
  "unit": "亿元",
  "period": "2024-2025",
  "sample": "上市险企样本",
  "lineage_ids": ["L001"],
  "source_note": "来源：用户材料；RSM 整理"
}
```

## `visual_intent/Pxx.json`

```json
{
  "page_id": "P07",
  "logic_relation": "因果",
  "primary_reading_path": "标题 -> 结论条 -> 主图 -> 右侧读法 -> 来源",
  "exhibit_structure": {
    "scope": "上市险企样本，2024-2025",
    "primary_evidence": "stacked_contribution_chart",
    "annotation_plan": ["标注投资端贡献", "标注承保贡献变化"],
    "secondary_readouts": ["可持续性需回到三线指标验证"],
    "source_boundary": "用户材料，未补外部数据"
  },
  "empty_space_risk": "low",
  "editability_risk": "medium"
}
```

## Review Artifacts

`review_report.json` 和 `final_review_report.json` 至少包含：

```json
{
  "tier": "client-ready",
  "status": "partner-ready",
  "critical": [],
  "major": [],
  "warnings": [],
  "gates": {
    "logic_gate": "pass",
    "language_gate": "pass",
    "visual_gate": "warning",
    "editability_gate": "pass",
    "lineage_gate": "pass"
  },
  "residual_risks": ["部分外部政策数据仍需客户确认"],
  "next_fixes": []
}
```

## Anti-Patterns

- 同一个字段在不同文件里写成 `page`, `slide`, `page_no`，导致回链失败。
- `source_note` 只写“公开资料”，没有 `source_id`。
- 结论写入 `storyline_map`，但没有进入 `conclusion_evidence_matrix`。
- 图表有数字，但没有 `lineage_ids`。
- `visual_profile` 使用未注册名称。
