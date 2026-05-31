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

## Tier-Stage Matrix

先按 `references/tier-stage-matrix.md` 选择 stage 列表，不要让所有任务都进入完整管线。

| Stage | express | quick-polish | partner-ready | client-ready | pipeline |
|---|---|---|---|---|---|
| `S0` Phase Lock | skip | skip | required | required | required |
| `S1` Validate Artifacts | minimal | minimal | full | full | full |
| `S1.5` Milestone Preview | skip | skip | optional if >25 pages | required if >15 pages | required |
| `S1.6` Insight Mapping & Density | skip | skip | required | required | required |
| `S2` Build Draft | simple | patch | full | full | full |
| `S2.5` Layout Analysis Gate | skip | skip | required | required | required |
| `S2.6` HTML Preview Gate | skip | skip | recommended | required | required |
| `S3` Render Preview | optional | optional | required | required | required |
| `S4` Review | basic QA | basic QA | full review | full review + regression | full review + regression |
| `S5` Auto-Fix | if critical | if critical | all critical/major | all critical/major | all critical/major |
| `S6` Delivery | internal draft note | polish notes | delivery note | full delivery package | full delivery package + artifacts |

Gate:

- `express` 和 `quick-polish` 不应读取完整 stage 体系，除非用户升档。
- `partner-ready` 和 `client-ready` 必须维护 `confirmation_log.json`。
- `client-ready` 的 `S2.6` 不得跳过，除非记录 `assumed_user_requested_direct` 或 `preview_unavailable_confirmed`。

### Stage 0: Phase Lock Check

`partner-ready` 以上项目启用 `phase_lock`。当用户、项目经理或合伙人确认了关键产物后，在对应 artifact 中写入：

```json
{
  "phase_lock": {
    "locked": true,
    "locked_at": "2026-05-30T00:00:00+08:00",
    "locked_by": "user",
    "lock_scope": ["brief", "storyline_map"],
    "version": "v1.0",
    "unlock_reason": null
  }
}
```

锁定后：

- 构建、渲染和视觉修复不得重写 `client_question`、`deck_answer`、章节答案、页面 claim 或推荐路径。
- 如必须修改，先输出 `unlock_request`，说明修改原因、影响页面和回滚风险。
- `quick-polish` 和 `express` 默认不启用 phase lock。

### Stage 1: Validate Artifacts

Read:

- `brief.json`
- `confirmation_log.json`
- `source_digest.md`
- `data_pool.json`
- `lineage_map.json`
- `insight_layout_map.json`
- `content_density_report.json`
- `consulting_pyramid.json`
- `conclusion_evidence_matrix.json`
- `argument_map.json`
- `storyline_map.json`
- `outline.json`
- `design_system.json`
- `template_manifest` or `assets/layouts/template-manifest.json`
- `preset_map.json`
- `layout_analysis_report.json`
- `html_preview_report.json`
- `chart_data/`
- `image_assets.json`
- `visual_intent/`

Apply:

- `references/task-tier-protocol.md`
- `references/tier-stage-matrix.md`
- `references/confirmation-state-machine.md`
- `references/confirmation-log-standard.md`
- `references/v2-capability-router.md`
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

### Stage 1.5: Milestone Preview Plan

For long decks, `partner-ready`, `client-ready`, board-level materials, and decks above 25 pages, read `references/milestone-preview-protocol.md` and define milestone preview points before bulk build.

Default preview points:

- `MP1`：封面、执行摘要、方法论或前 5-7 页。
- `MP2`：第一个核心诊断模块及其小结。
- `MP3`：矛盾提炼、行动地图、压力情景和建议页。

Milestone failure should roll back only the affected page range and direct bridge pages, not the full deck.

### Stage 1.6: Insight Mapping And Density Gate

在进入 `storyline_map.json`、`outline.json` 和 `preset_map.json` 前，必须先确认洞察映射、内容密度和标题适配。

Read:

- `insights.json`
- `insight_layout_map.json`
- `content_density_report.json`
- `storyline_map.json`
- `references/insight-to-layout-mapper.md`
- `references/content-density-precheck.md`
- `references/title-fit-standard.md`

Output:

- updated `storyline_map.json`
- updated `outline.json`

Gate:

- 每页必须有 `insight_type`、`recommended_page_family` 和 `layout_reason`。
- `content_empty` 不得进入正文构建。
- `content_thin` 必须有补强、合并或用户确认。
- `overloaded` 必须拆页或转附录。
- 正文页 `title_fit.fit_status` 不得为 `rewrite_required` 或 `split_page_required`。

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
- `references/visual-rhythm-orchestrator.md` for rhythm score and buffer page decisions
- `references/page-family-contracts.md`
- `references/template-fill-level-standard.md`
- `references/section-divider-image-protocol.md` for section pages
- `references/professional-chart-rulebook.md` for all core charts
- `references/professional-image-rulebook.md` for all images
- `references/exhibit-composition-standard.md`
- `references/editable-component-standard.md`

Output:

- `draft_deck.pptx`
- `render_metadata.json`

### Stage 2.5: Layout Analysis Gate

在正式 PPTX build 或批量 HTML 渲染前，必须先完成版式分析。

Read:

- `preset_map.json`
- `design_system.json`
- `storyline_map.json`
- `template_manifest` or `assets/layouts/template-manifest.json`
- `references/layout-lock-protocol.md`
- `references/layout-analysis-report.md`

Output:

- `layout_analysis_report.json`

Gate:

- 每页 `page_family` 必须通过 visual profile 白名单。
- 每页必须有 `layout_lock_status`，正文页必须为 `locked` 或 `fallback_confirmed`。
- `fullness_risk=high` 的页面不得进入 build，除非用户确认。
- 缺少 `layout_analysis_report.json` 时不得标记 `partner-ready` 或 `client-ready`。

User checkpoint:

- 向用户展示版式分配、密度风险和 fallback 页。
- 用户确认后，将 `layout_analysis_report.status` 标记为 `confirmed`。

### Stage 2.6: HTML Preview Gate

正式 PPTX build 前，先生成关键页 HTML 预览或说明无法预览。

Read:

- `layout_analysis_report.json`
- `storyline_map.json`
- `preset_map.json`
- `design_system.json`
- `assets/layouts/`
- `references/html-preview-protocol.md`
- `references/title-fit-standard.md`
- `references/visual-fullness-standard.md`

Output:

- `html_preview_report.json`
- `preview_html/Pxx.html`
- `preview_pages/Pxx.png` where rendering is available

Gate:

- `client-ready` 项目必须有 `html_preview_report.status = confirmed`，或 `preview_unavailable / assumed_user_requested_direct` 且有用户确认和风险说明。
- `partner-ready` 项目若跳过 HTML preview，必须在交付说明中写明。
- `revise_required` 状态不得进入批量构建。
- 关键页预览至少覆盖执行摘要、核心分析页和章节/小结页。
- 高频正文模板必须达到 `structured` 或 `filled` 的 fill level；出现可见 placeholder 时不得进入客户交付。

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
- `references/quality-dashboard-standard.md`
- `references/final-review-checklist.md`
- `references/presentation-polish-checklist.md`
- `references/client-meeting-minutes-test.md`
- `references/deck-quality-scorecard.md`
- `references/visual-presentation-upgrade.md`

Output:

- `review_report.json`
- `final_review_report.json`
- optional `logic_health_dashboard.json`
- optional `deck_quality_radar.json`

## Check Frequency Layers

不要把所有检查都压到每一页。按频率分层：

### Per-Page Checks

每页生成后立即执行：

- 标题是否是结论。
- 证明对象是否支撑标题。
- 来源条、页码、单位、口径是否存在。
- 文字是否溢出，字号是否低于限制。
- 页面是否只有一个主阅读路径。
- 若为表格，解读列是否满足 `page-family-contracts.md` 的最低含义要求。

### Per-Batch Checks

每完成一个章节或模块后执行：

- 章节答案是否被页面支撑。
- 小结页是否只压缩已出现内容。
- 章节内数字、排名、样本和口径是否一致。
- 该章节是否自然引出下一章。
- 若有多视角分析，经营/市场/风险视角是否一致或已解释分歧。

### Deck-Level Checks

全 deck 完成后执行：

- 标题链是否能连读成完整故事线。
- 三大矛盾是否由前文证据推导。
- 行动项是否回链矛盾、根因和改善路径。
- 压力情景是否与执行摘要 KPI 对齐。
- contact sheet、profile regression、final review 和 scorecard 是否通过。

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

Optional formats, only when requested or configured:

- `final_deck.pdf`
- `html_preview/index.html`
- `video_narration.mp4`

Read `references/delivery-format-extension.md` before enabling optional channels.

Delivery note must include:

- task tier
- output path
- validation status
- review status
- remaining risks
- whether marked `client-ready` or `partner-ready`
- whether any phase-locked artifact was changed or unlocked

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
