# V2 Capability Router

用于把 PRD V2.0 的增量能力按任务风险加载。读取 `task-tier-protocol.md` 后使用；不要在 `quick-polish` 中默认加载所有 V2 能力。

## Capability Activation

| Capability | Activate when | Required reference |
|---|---|---|
| `phase_lock` | `partner-ready` 以上，用户或项目经理确认了 brief、storyline、preset 或 final review | `build-runner-protocol.md`, `artifact-schema-library.md` |
| `logic_health_dashboard` | 合伙人审稿、客户正式交付、完整 review report | `quality-dashboard-standard.md`, `review-loop.md` |
| `reverse_inference_gate` | `client-ready` / `pipeline`，且同时存在 `data_pool.json` 和 `conclusion_evidence_matrix.json` | `review-loop.md`, `insight-discovery.md` |
| `decision_game_theory_layer` | 并购、竞争策略、监管博弈、交易谈判、对手方反应影响路径选择 | `decision-path-standard.md` |
| `content_freshness_decay` | 外部数据、财务指标、政策、市场数据、监管信息或公开资料进入核心结论 | `content-freshness-and-evidence.md`, `data-lineage-protocol.md` |
| `insight_density_governor` | 已生成 `insights.json`，或数据扫描发现超过章节数 3 倍 | `insight-discovery.md` |
| `peer_benchmarking_engine` | 银行对标、保险同业、区域政策比较、行业 ranking / quartile | `methodology-packs.md` |
| `visual_rhythm_orchestrator` | `partner-ready` 以上，连续数据密集页较多或章节超过 6 页 | `visual-rhythm-orchestrator.md`, `visual-executive-rhythm.md` |
| `immersive_section_divider` | 董事会、高管 retreat、培训分享、章节需要更强视觉锚点 | `section-divider-image-protocol.md` |
| `native_chart_priority` | 图表为简单柱状/折线/散点/饼图/堆叠柱，且客户可能改数据 | `visual-rendering-engine.md` |
| `auto_layout_fix` | QA 报告出现 `overflow`、`overlap`、`text_too_dense`、`empty_space` | `auto-fix-playbook.md` |
| `multi_format_delivery` | 用户要求 PDF、HTML 预览、打印存档或异步汇报 | `delivery-format-extension.md`, `build-runner-protocol.md` |
| `audience_language_calibrator` | 受众专业程度不一，或包含非金融背景董事/高管 | `language-calibration-standard.md`, `language-discipline.md` |
| `assertion_strength_matrix` | 所有核心结论页、标题、结论条、执行摘要和建议页 | `language-calibration-standard.md`, `conclusion-evidence-matrix.md` |
| `tone_arc` | `partner-ready` 以上，需要完整叙事节奏 | `language-calibration-standard.md`, `consulting-language-playbook.md` |
| `bilingual_parallel_output` | 用户指定中英双语、外资/合资/海外总部汇报 | `bilingual-output-standard.md` |
| `public_citation_risk` | `client-ready`，且客户为上市公司、金融机构、监管敏感主体 | `client-meeting-minutes-test.md` |
| `deck_quality_radar` | 完整 review、合伙人审稿或 `client-ready` 交付 | `quality-dashboard-standard.md`, `deck-quality-scorecard.md` |
| `express_lane` | 用户明确要快速内部初稿、brainstorming、培训草稿 | `task-tier-protocol.md` |

## Tier Defaults

| Tier | Default V2 capabilities |
|---|---|
| `express` | `auto_layout_fix` basic checks only; output `internal-draft` |
| `quick-polish` | `auto_layout_fix`, `assertion_strength_matrix` when wording changes |
| `partner-ready` | `phase_lock`, `logic_health_dashboard`, `visual_rhythm_orchestrator`, `audience_language_calibrator`, `tone_arc` |
| `client-ready` | all `partner-ready` capabilities plus `content_freshness_decay`, `reverse_inference_gate`, `public_citation_risk`, `deck_quality_radar` |
| `pipeline` | all relevant capabilities plus regression and multi-format delivery design |

## Guardrails

- `express` and `quick-polish` outputs must not be labeled `client-ready`.
- V2 capabilities must strengthen existing data lineage, editability and QA rules; they must not replace them.
- If a capability requires artifacts that do not exist, output a missing-artifact note rather than inventing results.
- Any capability that changes storyline, source evidence, or recommendation path after user confirmation must respect `phase_lock`.
