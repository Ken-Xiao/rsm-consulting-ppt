# Artifact Validation Standard

用于检查 PPT 生产管线的中间产物是否完整、互相一致、可进入下一阶段。完整项目、客户交付项目和样张回归必须读取本文件。

## Core Principle

不要只看最终 PPT 是否好看。成熟生产流程必须保证每个中间产物都能被下一步消费：

```text
brief.json
  -> source_digest.md
  -> data_pool.json + lineage_map.json
  -> insights.json
  -> consulting_pyramid.json + conclusion_evidence_matrix.json + argument_map.json
  -> storyline_map.json + outline.json
  -> design_system.json + template_manifest + preset_map.json
  -> chart_data/Pxx.json + image_assets.json + visual_intent/Pxx.json
  -> review_report.json + final_review_report.json
```

如果关键产物缺字段，后续页面会变成临场发挥。

## Tier-Aware Validation

先读取 `references/task-tier-protocol.md` 判断任务档位，再决定校验深度：

| Artifact | quick-polish | partner-ready | client-ready |
|---|---|---|---|
| `brief.json` | optional note | required | required |
| `source_digest.md` | source boundaries | required | required |
| `data_pool.json` | only if new data | key facts/metrics | required |
| `lineage_map.json` | not required | key numbers | required |
| `consulting_pyramid.json` | draft ok | required | required |
| `conclusion_evidence_matrix.json` | not required | key conclusions | required |
| `argument_map.json` | not required | required | required |
| `storyline_map.json` | title spine ok | required | required |
| `preset_map.json` | visual notes ok | required | required |
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

Fail if:

- 标题不是判断。
- 页面无法回链章节答案。
- 前后页逻辑断裂。
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

Fail if:

- 正文页没有 `exhibit_structure`。
- 没有 `density_level`。
- 没有可编辑性说明。
- 未按 `editable-component-standard.md` 区分 `native_editable_layer`、`rendered_evidence_layer` 和 `metadata_layer`。

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
