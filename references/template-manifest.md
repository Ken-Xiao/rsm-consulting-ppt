# Template Manifest

用于把 `preset_family` 稳定映射到 HTML 模板、必填字段、渲染轨道和 QA 重点。完整项目在生成 `preset_map.json` 后，应使用本规则形成 `template_manifest` 或读取 `assets/layouts/template-manifest.json`。新增或修改 `visual_profile` 前先读取 `references/visual-profile-registry.md`。

## Why It Exists

没有 manifest 时，agent 容易临时选择版式，导致同一 deck 内页面风格漂移。manifest 的作用是：

- 固定每个 page family 的模板来源。
- 明确哪些字段必须由 `outline.json` 或 `visual_intent` 提供。
- 防止模板里的示例文字被带入正式 PPT。
- 帮助 visual QA 知道每类页面要检查什么。

## Manifest Schema

```json
{
  "preset_family": "practice_section_divider",
  "visual_profile": "rsm-practice-sharing",
  "template_file": "assets/layouts/layout-practice-section-divider.html",
  "required_fields": ["section_number", "section_title", "hero_image", "chapter_question"],
  "optional_fields": ["chapter_answer", "copyright", "logo"],
  "render_tracks": ["native-text", "background-image"],
  "editable_elements": ["section_number", "section_title", "chapter_question", "footer"],
  "rasterized_elements": ["hero_image"],
  "qa_focus": ["image_crop", "title_readability", "blue_vertical_accent", "text_volume"]
}
```

## Placeholder Rules

HTML templates should avoid hard-coded project content. Use semantic placeholders:

- `{{deck_title}}`
- `{{module_name}}`
- `{{module_number}}`
- `{{section_number}}`
- `{{section_title}}`
- `{{chapter_question}}`
- `{{chapter_answer}}`
- `{{claim_title}}`
- `{{story_subtitle}}`
- `{{takeaway_text}}`
- `{{source_note}}`
- `{{page_number}}`
- `{{hero_image_url}}`

If a template still contains sample text, it must be replaced during build and flagged in QA if unchanged.

## Default Families

| Preset family | Template | Profile |
|---|---|---|
| `insurance_cover` | `layout-insurance-cover.html` | `rsm-insurance-results` |
| `insurance_section_divider` | `layout-insurance-section.html` | `rsm-insurance-results` |
| `insurance_results_chart_card` | `layout-insurance-results-chart-card.html` | `rsm-insurance-results` |
| `practice_cover` | `layout-practice-cover.html` | `rsm-practice-sharing` |
| `practice_agenda` | `layout-practice-agenda.html` | `rsm-practice-sharing` |
| `practice_section_divider` | `layout-practice-section-divider.html` | `rsm-practice-sharing` |
| `chart_plus_insight_panel` | `layout-chart-plus-insight-panel.html` | `rsm-insurance-results` |
| `executive_summary_grid` | `layout-executive-summary-grid.html` | `rsm-insurance-results` |
| `option_comparison` | `layout-option-comparison.html` | `rsm-policy-light` |
| `management_action_plan` | `layout-management-action-plan.html` | `rsm-policy-light` |

## QA Checks

- Every `preset_family` in `preset_map.json` has a manifest entry.
- Every required field is populated before rendering.
- No `{{placeholder}}` remains in the final slide.
- No sample text from the HTML template remains unless intentionally used.
- Page family in manifest matches `visual_profile`.
- `visual_profile` 必须出现在 `visual-profile-registry.md` 的 canonical 或 supported secondary profile 中。
