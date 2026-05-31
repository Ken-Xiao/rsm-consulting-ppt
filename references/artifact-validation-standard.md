# Artifact Validation Standard

用于检查 PPT 生产管线的中间产物是否完整、互相一致、可进入下一阶段。完整项目、客户交付项目和样张回归必须读取本文件。

## Core Principle

不要只看最终 PPT 是否好看。成熟生产流程必须保证每个中间产物都能被下一步消费：

```text
brief.json
  -> framework_confirmation.md
  -> source_digest.md
  -> data_pool.json + lineage_map.json
  -> insights.json
  -> insight_layout_map.json
  -> content_density_report.json
  -> consulting_pyramid.json + conclusion_evidence_matrix.json + argument_map.json
  -> contradiction_map.json + action_derivation_map.json + scenario_analysis.json
  -> storyline_map.json + outline.json
  -> design_system.json + template_manifest + preset_map.json + layout_analysis_report.json + html_preview_report.json
  -> chart_data/Pxx.json + image_assets.json + visual_intent/Pxx.json
  -> review_report.json + final_review_report.json
```

如果关键产物缺字段，后续页面会变成临场发挥。

## Tier-Aware Validation

先读取 `references/task-tier-protocol.md` 判断任务档位，再决定校验深度：

| Artifact | quick-polish | partner-ready | client-ready |
|---|---|---|---|
| `brief.json` | optional note | required | required |
| `framework_confirmation.md` | optional | required | required |
| `source_digest.md` | source boundaries | required | required |
| `data_pool.json` | only if new data | key facts/metrics | required |
| `lineage_map.json` | not required | key numbers | required |
| `consulting_pyramid.json` | draft ok | required | required |
| `conclusion_evidence_matrix.json` | not required | key conclusions | required |
| `argument_map.json` | not required | required | required |
| `contradiction_map.json` | optional | required if synthesis/action | required if synthesis/action |
| `action_derivation_map.json` | optional | required if recommendations | required if recommendations |
| `scenario_analysis.json` | optional | required if stress pages | required if stress pages |
| `insight_layout_map.json` | optional | required | required |
| `content_density_report.json` | optional | required | required |
| `storyline_map.json` | title spine ok | required | required |
| `preset_map.json` | visual notes ok | required | required |
| `layout_analysis_report.json` | optional | required | required |
| `html_preview_report.json` | optional | preferred | required before batch build |
| `chart_data/` | if chart changed | core charts | all core charts |
| `review_report.json` | polish notes | required | required |
| `contact_sheet.png` | optional | preferred | required |

`quick-polish` 如果缺少完整 artifacts，不算 validation fail，但必须在交付说明中写明未执行完整事实血缘和逻辑 gate。

## Logic Gate Dependency

`partner-ready` 和 `client-ready` 必须同步检查 `references/logic-gate-checklist.md`：

- `client_question` 必须可决策。
- `deck_answer` 必须能由章节答案支撑。
- 每页 `claim_title` 必须回链 `chapter_answer_link`。
- 每页 `evidence_object` 必须能证明 claim。
- 核心页必须有 `implication`。
- 建议页必须有 `decision_path`。

缺少以上任一项：

- `client-ready`：`critical` 或 `major`。
- `partner-ready`：至少 `major`。

## Required Artifacts

### `brief.json`

Required:

- `task_tier`
- `audience`
- `client_question`
- `client_answer` or draft hypothesis
- `subject`
- `data_sources`
- `target_pages`
- `visual_profile`
- `delivery_context`

Fail if:

- `task_tier` 缺失，或 quick-polish 被标记为 client-ready。
- `client_question` 只是主题描述。
- 没有受众或决策场景。
- 视觉 profile 未指定且未使用默认 `rsm-insurance-results`。

### `framework_confirmation.md`

Required:

- `language_policy`
- `material_readout`
- `client_question`
- `deck_answer_hypothesis`
- `recommended_framework`
- `module_sequence`
- `page_budget`
- `visual_profile`
- `confirmation_status`

Fail if:

- `partner-ready` 或 `client-ready` 项目缺少整体框架确认记录。
- 直接进入逐页细节，但 `confirmation_status` 仍为 `pending`。
- 章节只是主题词，没有章节问题、章节作用或暂定答案。
- 默认语言不是中文，且没有用户明确英文/双语要求。

### `data_pool.json`

Required:

- `facts`
- `metrics`
- `source_metadata`
- `assumptions`
- `data_gaps`

Fail if:

- 关键数字没有来源。
- 假设和事实混在一起。
- 数据缺口没有标记。

### `source_digest.md`

Required:

- `source_inventory`
- `key_facts`
- `visual_references`
- `open_questions`
- `usage_boundaries`

Fail if:

- 把视觉参考当作业务事实。
- 没有标记来源可信度、日期或使用边界。
- 用户假设没有标记为 hypothesis。

### `lineage_map.json`

Required:

- `lineage_id`
- `source`
- `calculation`
- `used_in_pages`
- `confidence`

Fail if:

- 正文关键数字没有 lineage。
- 图表使用的数字无法追溯。

### `consulting_pyramid.json`

Required:

- `client_question`
- `client_answer`
- `executive_question`
- `deck_answer`
- `chapter_answers`
- `decision_path` if recommendations exist

Fail if:

- 没有章节答案。
- 建议型材料没有 decision path。

### `argument_map.json`

Required:

- `client_question`
- `deck_answer`
- `chapters[].chapter_question`
- `chapters[].chapter_answer`
- `chapters[].supporting_pages`
- `pages[].claim_title`
- `pages[].evidence_object`
- `pages[].implication`

Fail if:

- 有章节但没有章节问题或章节答案。
- 页面结论没有证据对象。
- 行动建议无法回链到诊断页。

### `conclusion_evidence_matrix.json`

Required:

- `conclusions[].conclusion_id`
- `conclusions[].conclusion`
- `conclusions[].evidence`
- `conclusions[].limitations`
- `conclusions[].language_strength`
- `conclusions[].pages`

Fail if:

- 执行摘要或章节答案中的核心结论没有 `conclusion_id`。
- 结论没有证据或证据强度不足以支撑措辞。
- 替代解释或口径限制没有记录。

### `contradiction_map.json`

Required when deck contains 三大矛盾、结构性矛盾、问题诊断综合页 or action plan:

- `contradictions[].contradiction_id`
- `positive_signal`
- `negative_signal`
- `driver_cluster`
- `decision_implication`
- `recommended_action_links`

Fail if:

- 矛盾没有正负信号。
- 矛盾首次出现在综合页，前文没有来源页面。
- 行动项无法回链矛盾。

### `action_derivation_map.json`

Required when deck contains recommendations, roadmap, action plan, rectification plan or authorization ask:

- `recommended_action_id`
- `linked_contradiction_id` or `linked_risk_id`
- `linked_root_cause`
- `improvement_path`
- `owner`
- `timeline`
- `kpi`
- `evidence_pages`

Fail if:

- 行动项只写方向，没有责任、时间或指标。
- 行动项与前文诊断没有链路。
- 行动页新增前文未证明的判断。

### `scenario_analysis.json`

Required when deck contains stress scenario, sensitivity matrix, financial projection, two-scenario future:

- `scenario_names`
- `parameter_axes`
- `output_indicators`
- `baseline_case`
- `management_implication`

Fail if:

- 情景假设无来源或未标记为 RSM 假设。
- 输出指标与执行摘要核心 KPI 不一致且没有解释。
- 两种图景页没有展示 delta。

### `insight_layout_map.json`

Required before `storyline_map.json` and `preset_map.json` for complete projects:

- `pages[]` or `insights[]`
- `page_id`
- `insight_id`
- `insight_type`
- `recommended_page_family`
- `page_role`
- `logic_relationship`
- `layout_reason`
- `required_evidence`

Fail if:

- 核心洞察没有 `insight_type`。
- 推荐 page family 没有 `layout_reason`。
- 推荐 page family 与 visual profile 白名单明显不匹配，且没有 fallback。
- 行动页没有回链洞察或矛盾。

### `content_density_report.json`

Required before `preset_map.json` for complete projects:

- `status`
- `summary`
- `pages[]`
- `pages[].page_id`
- `pages[].evidence_items_count`
- `pages[].density_status`
- `pages[].required_action`
- `pages[].can_enter_layout_analysis`

Fail if:

- 正文页 `content_empty` 仍进入 `preset_map.json`。
- `overloaded` 页面未拆页或转附录。
- `content_thin` 页面没有补强方案、合并说明或用户确认。
- `can_enter_layout_analysis=false` 但仍进入 layout analysis。

### `html_preview_report.json`

Required before batch build for `client-ready`; preferred for `partner-ready`:

- `status`
- `visual_profile`
- `preview_pages[]`
- `preview_pages[].page_id`
- `preview_pages[].page_family`
- `preview_pages[].title_fit_status`
- `preview_pages[].density_status`
- `preview_pages[].fullness_risk`
- `summary`

Fail if:

- `client-ready` 项目状态仍为 `pending_user_confirmation`。
- `revise_required` 状态下进入批量构建。
- `preview_unavailable` 但没有用户确认或交付风险说明。
- 关键页预览没有覆盖执行摘要、核心分析页和章节/小结页。

### `storyline_map.json`

Required per page:

- `page_id`
- `claim_title`
- `story_subtitle`
- `page_role`
- `logic_relationship`
- `previous_link`
- `next_link`
- `chapter_answer_link`
- `evidence_object`
- `insight_type`
- `recommended_page_family`
- `layout_reason`
- `evidence_items_count`
- `content_density_status`
- `title_fit`

Fail if:

- 标题不是判断。
- 页面无法回链章节答案。
- 前后页逻辑断裂。
- 副标题不能说明口径、承接或下一页引导。
- 正文页缺少 `layout_reason`。
- 正文页 `title_fit.fit_status` 为 `rewrite_required` 或 `split_page_required`。
- 正式章节缺少 `section_divider` 或章节锚点。
- 章节页承担正文证明任务，或文字量超过章节页限制。

### `outline.json`

Required per page:

- `page_id`
- `module`
- `claim_title`
- `evidence_object`
- `data_keys`
- `page_family`
- `source_note`

Fail if:

- 页面没有主证明对象。
- 页面没有来源。

### `preset_map.json`

Required per page:

- `page_id`
- `visual_profile`
- `page_family`
- `density_level`
- `render_strategy`
- `editable_elements`
- `rasterized_elements`
- `qa_focus`
- `exhibit_structure`
- `visual_fullness`
- `layout_lock_status`
- `layout_lock_reason`

Fail if:

- 正文页没有 `exhibit_structure`。
- 没有 `density_level`。
- 没有可编辑性说明。
- 未按 `editable-component-standard.md` 区分 `native_editable_layer`、`rendered_evidence_layer` 和 `metadata_layer`。
- `page_family` 不在当前 `visual_profile` 的 layout lock 白名单内，且没有 `fallback_reason`。
- `layout_lock_status` 缺失或为 `unlocked`。

### `layout_analysis_report.json`

Required:

- `visual_profile`
- `status`
- `summary.page_count`
- `summary.layout_gaps`
- `summary.content_thin_pages`
- `summary.content_heavy_pages`
- `pages[].page_id`
- `pages[].page_family`
- `pages[].layout_lock_status`
- `pages[].density_level`
- `pages[].fullness_risk`
- `pages[].layout_reason`

Fail if:

- `partner-ready` 或 `client-ready` 项目缺少 layout analysis。
- `status` 不是 `confirmed` 或 `assumed_user_requested_direct`。
- 存在 `layout_gaps > 0`。
- 存在 `fullness_risk=high` 且没有用户确认。

Section divider pages additionally require:

- `section_number`
- `section_title`
- `hero_image` or `image_prompt`
- `image_role`
- `image_usage_boundary`
- `preset_family` in [`insurance_section_divider`, `practice_section_divider`]

Fail if:

- 章节页没有专业图片或图片生成记录。
- 章节页使用正文页 page family。
- 章节页图片包含可识别 logo、可读文字或暖色广告风。

### `template_manifest`

Required:

- Every `preset_family` in `preset_map.json` has a manifest entry.
- Each manifest entry defines `template_file`, `required_fields`, `render_tracks`, `editable_elements`, `qa_focus`.

Fail if:

- `preset_family` cannot map to a template.
- HTML template contains unresolved `{{placeholder}}`.
- Template sample text leaks into final content.

### `chart_data/Pxx.json`

Required when page has chart:

- `chart_type`
- `conclusion_id`
- `chart_point_of_view`
- `benchmark_type`
- `comparison_basis`
- `focus_series`
- `annotation_priority`
- `chart_readout`
- `data`
- `unit`
- `period`
- `sample`
- `source`
- `lineage_ids`

Fail if:

- 没有图表观点。
- 没有单位、样本、期间或来源。
- 图表没有基准却支撑强判断。
- 图表观点不能回链到 `conclusion_evidence_matrix.json`。
- 核心图表没有基准、焦点系列、标注优先级或图表读法。

### `image_assets.json`

Required when deck uses images:

- `asset_id`
- `page_id`
- `image_role`
- `style_profile`
- `source_type`
- `source_or_prompt`
- `usage_boundary`
- `copyright_note`

Fail if:

- 图片没有角色或使用边界。
- AI 生成图片被当作事实证据。
- 证据图片没有来源、日期或脱敏说明。
- 图片包含真实 logo、可读文字、人物特写或与 visual profile 不一致。

### `visual_intent/Pxx.json`

Required:

- `logic_relationship`
- `primary_visual`
- `supporting_elements`
- `emphasis_budget`
- `empty_space_risk`
- `render_tracks`

For section pages also require:

- `image_role`
- `style_profile`
- `image_prompt` if AI-generated
- `usage_boundary`

Fail if:

- 视觉形式和逻辑关系不匹配。
- `empty_space_risk` 为 `high` 仍进入构建。

### `review_report.json`

Required:

- `client_delivery_review`
- `logic_gate_review`
- `storyline_review`
- `data_lineage_audit`
- `conclusion_evidence_audit`
- `chart_professionalism_audit`
- `image_asset_audit`
- `meeting_minutes_test`
- `visual_review`
- `editability_check`
- `editable_component_review`
- `quality_scorecard`
- `final_review`
- `issues`

Fail if:

- 没有 final review。
- `client-ready` 任务没有 logic gate、meeting minutes test 或 editable component review。
- 没有 issue severity。
- 没有修复建议。

## Validation Output

生成 `artifact_validation_report.json`：

```json
{
  "status": "fail",
  "critical": 1,
  "major": 3,
  "checks": [
    {
      "artifact": "preset_map.json",
      "severity": "critical",
      "issue": "P08 缺少 exhibit_structure",
      "fix": "补充 scope、primary_evidence、annotation_plan、supporting_readout 和 source_and_caveat"
    }
  ]
}
```

## Gate

- `critical > 0`：不得构建客户版 PPT。
- `major > 0`：可以生成草稿，但不得标记为 `client-ready`。
- 所有 `chart_data`、`preset_map`、`lineage_map`、`logic_gate` 和 `editable_component_review` 必须通过后，才能进入 final review。
