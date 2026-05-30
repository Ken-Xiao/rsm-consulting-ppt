# Build Runner Protocol

用于把规则体系转成稳定执行流程。完整项目、样张回归或客户交付前应按本协议组织构建、渲染、校验和返修。

## Target Commands

理想执行入口：

```bash
npm run validate:rsm-deck
npm run build:rsm-deck
npm run render:rsm-contact-sheet
npm run review:rsm-deck
npm run regression:rsm-deck
```

本 skill 已提供无依赖 Node 校验脚本，可作为上述命令的基础：

```bash
node scripts/validate-layout-manifest.mjs
node scripts/validate-rsm-deck.mjs outputs/rsm_deck
```

`validate-layout-manifest.mjs` 检查 `assets/layouts/template-manifest.json`、模板文件存在性、重复 page family 和必填字段映射。  
`validate-rsm-deck.mjs` 检查 deck artifacts、逻辑 gate 所需字段、preset map、图表数据、review report 和 contact sheet。

如果当前环境没有这些脚本，Codex 应按同等步骤手动执行，并输出等价产物。

## Runner Stages

### Stage 1: Validate Artifacts

Read:

- `brief.json`
- `source_digest.md`
- `data_pool.json`
- `lineage_map.json`
- `consulting_pyramid.json`
- `conclusion_evidence_matrix.json`
- `argument_map.json`
- `storyline_map.json`
- `outline.json`
- `design_system.json`
- `template_manifest` or `assets/layouts/template-manifest.json`
- `preset_map.json`
- `chart_data/`
- `image_assets.json`
- `visual_intent/`

Apply:

- `references/task-tier-protocol.md`
- `references/artifact-validation-standard.md`
- `references/logic-gate-checklist.md`
- `references/conclusion-evidence-matrix.md`
- `references/logic-gate-checklist.md`
- `references/editable-component-standard.md`

Output:

- `artifact_validation_report.json`

Gate:

- Critical issue blocks build.
- `scripts/validate-layout-manifest.mjs` must pass before using HTML templates.
- `scripts/validate-rsm-deck.mjs` should return no critical issue before final build; major issues block `client-ready`.

### Stage 2: Build Draft PPTX

Read:

- `outline.json`
- `preset_map.json`
- `design_system.json`
- `template_manifest` or `assets/layouts/template-manifest.json`
- `chart_data/`
- `image_assets.json`
- `visual_intent/`
- `assets/layouts/`

Apply:

- `references/visual-rendering-engine.md`
- `references/page-family-contracts.md`
- `references/section-divider-image-protocol.md` for section pages
- `references/professional-chart-rulebook.md` for all core charts
- `references/professional-image-rulebook.md` for all images
- `references/exhibit-composition-standard.md`
- `references/editable-component-standard.md`

Output:

- `draft_deck.pptx`
- `render_metadata.json`

### Stage 3: Render Preview

Output:

- `preview_pages/Pxx.png`
- `contact_sheet.png`
- optional `draft_deck.pdf`

Gate:

- If preview cannot render, do not declare completion.
- If visual profile or manifest changed, compare against `assets/regression/*.sample-manifest.json`.

### Stage 4: Review

Apply:

- `references/review-loop.md`
- `references/final-review-checklist.md`
- `references/presentation-polish-checklist.md`
- `references/client-meeting-minutes-test.md`
- `references/deck-quality-scorecard.md`
- `references/visual-presentation-upgrade.md`

Output:

- `review_report.json`
- `final_review_report.json`

### Stage 5: Auto-Fix

Apply:

- `references/auto-fix-playbook.md`

Output:

- revised deck
- `fix_report.json`

Gate:

- Re-render after visual fixes.
- Re-run final review after critical/major fixes.

### Stage 6: Delivery Decision

Output:

- `final_deck.pptx`
- optional `final_deck.pdf`
- `delivery_note.md`

Delivery note must include:

- task tier
- output path
- validation status
- review status
- remaining risks
- whether marked `client-ready` or `partner-ready`

## Standard Output Folder

```text
outputs/rsm_deck/
├── artifacts/
│   ├── brief.json
│   ├── source_digest.md
│   ├── data_pool.json
│   ├── lineage_map.json
│   ├── conclusion_evidence_matrix.json
│   ├── argument_map.json
│   ├── storyline_map.json
│   ├── outline.json
│   ├── design_system.json
│   ├── template_manifest.json
│   └── preset_map.json
├── assets/
│   └── generated_images/
├── chart_data/
├── image_assets.json
├── visual_intent/
├── draft/
│   ├── draft_deck.pptx
│   ├── contact_sheet.png
│   └── preview_pages/
├── review/
│   ├── artifact_validation_report.json
│   ├── review_report.json
│   ├── final_review_report.json
│   └── fix_report.json
└── final/
    ├── final_deck.pptx
    ├── final_deck.pdf
    └── delivery_note.md
```

## Runner QA

Before final response:

- Build produced a PPTX.
- Preview/contact sheet exists or inability is explicitly reported.
- Validation ran or was manually checked.
- Review ran or was manually checked.
- Critical issues are fixed.
- Remaining major issues are disclosed.
