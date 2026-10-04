# Progressive Loading Protocol

用于控制 reference 加载量，避免小任务被完整 pipeline 拖慢，也避免 Agent 因 context 过载而漏掉关键 gate。

## Core Principle

先加载行为骨架，再按 tier 和 stage 加载必要 reference，最后按场景按需补充。不要一次性读取全部 reference。

## Loading Layers

### Layer 0: Always Loaded（每任务必读的唯一权威清单）

每个任务都应优先读取以下 9 个文件，不论档位与 stage：

| 文件 | 为什么每任务必读 | 出处 |
|---|---|---|
| `agent-behavioral-guardrail.md` | 第一个动作，行为边界；读完前不读其他 reference | SKILL.md Core Workflow |
| `strategy-brief.md` | 访谈前提，第一步必须读 | SKILL.md Core Workflow |
| `guided-interaction-pattern.md` | 阶段式确认，第一步必须读 | SKILL.md Core Workflow |
| `decision-to-deck-attribute-map.md` | 用户回答映射 deck 属性，第一步必须读 | SKILL.md Core Workflow |
| `task-tier-protocol.md` | 定档位与执行下限 | 原 Layer 0 |
| `v2-capability-router.md` | 能力路由入口；读表 ≠ 激活能力 | 原 Layer 0 |
| `confirmation-state-machine.md` | 确认节点判定 | 原 Layer 0 |
| `progressive-loading-protocol.md` | 本文件，加载决策 | SKILL.md 跨阶段三件套 |
| `failure-modes.md` | 卡住/缺失/冲突时的底线与修复 | SKILL.md 跨阶段三件套 |

**本清单是「每任务必读集」的唯一权威**：SKILL.md、INDEX、Decision Router、tier-stage-matrix 等处的必读表述只做指针或触发说明，与本清单不一致时以本清单为准；任何文件、任何 INDEX 行都不得用于把本清单中的文件排除出加载集。修改必读规则只改本清单，并全库搜「必读」同义行同步指针。

**本清单裁决的是「每任务必读」的成员资格，不改变 Decision Router 的并集规则**：本轮加载计划 = 本清单 ∪ Decision Router「阶段必需（下限）」列 ∪ 本任务触发的条件件。下限件按其所属 stage 排期读取，但**必须在任务开始时的加载计划中逐件列明**，不得以「未进入该 stage」或 Layer 1 的 stage 划分为由把下限件从计划中删除或降为可选项；Layer 1 的 Anti-Pattern 约束的是视觉/语言/场景类按需件，不适用于下限件。**下限件的 stage 归属查 Layer 1b**（Layer 1 未列出的下限件一律在 Layer 1b 有排期位；两处都查不到的档位下限件属本文件缺陷，应补入而非由执行者推断）。

Purpose: 先确定行为边界、访谈、档位、能力路由、确认与加载决策，再进入任何 stage。

### Layer 1: Stage-Triggered

按当前 build stage 读取：

| Stage | Load only when entering stage |
|---|---|
| `S1` Validate | `artifact-validation-standard.md`, `logic-gate-checklist.md` |
| `S1.6` Insight/Density | `insight-to-layout-mapper.md`, `content-density-precheck.md`, `title-fit-standard.md` |
| `S2.5` Layout | `universal-page-family-registry.md`, `layout-lock-protocol.md`, `layout-analysis-report.md`, `template-manifest.md`, `assets/design-tokens.json` |
| `S2.6` HTML Preview | `html-preview-protocol.md`, `visual-fullness-standard.md` |
| `S3/S4` Review | `visual-qa-protocol.md`, `final-review-checklist.md`, `deck-quality-scorecard.md` |

### Layer 1b: 档位下限件的 stage 归属（下限件排期权威）

Decision Router「阶段必需（下限）」列中的文件，凡未出现在 Layer 1 各 stage 行者，一律在此获得排期位。**本表是下限件排期的唯一权威**：下限件必须按下表 stage 排入任务开始时的加载计划；本表与 Layer 1 都未收录的档位下限件，视为本文件缺陷，应补入而非由执行者自行推断。

| Stage 归属 | 文件 | 适用档位 |
|---|---|---|
| `S0` 定档后（全程） | `confirmation-log-standard.md` | partner-ready、client-ready |
| `S0` 定档后 | `tier-stage-matrix.md` | pipeline（其余档位定档后同读） |
| `S0` 定档后 | `agent-runtime.md` | targeted-edit |
| `S1` 材料消化 | `source-digest-standard.md` | partner-ready、client-ready |
| `S1` 事实池 | `data-lineage-protocol.md` | client-ready（金融项目必读） |
| `S1.6` 叙事框架 | `consulting-storyline-standard.md` | partner-ready、client-ready |
| `S1.6` 逐页规划 | `storyline-page-planning.md` | partner-ready、client-ready |
| `S1.6`/`S2` 结论绑定 | `conclusion-evidence-matrix.md` | client-ready |
| `S2` 构建 | `template-catalog.md` | partner-ready |
| `S2` 构建 | `artifact-schema-library.md` | pipeline |
| `S2`/`S2.5` 图表 | `professional-chart-rulebook.md` | client-ready |
| `S2.5` 版式 | `visual-profile-registry.md` | pipeline |
| `S2` patch / `S4` 语言 | `language-discipline.md` | targeted-edit |
| `S4` 审校循环 | `review-loop.md` | partner-ready、client-ready |
| `S5` 构建/修复 | `editability-check.md` | client-ready |
| `S6` 交付 | `client-delivery-standard.md` | client-ready |
| `S0`/`S2` 体系搭建 | `workflow-san-pipeline.md` | pipeline |
| `S4`/regression | `sample-regression-test.md` | pipeline |
| `regression` | `profile-regression-matrix.md` | pipeline |

（已出现在 Layer 1 各 stage 行的下限件——`logic-gate-checklist`、`visual-qa-protocol`、`deck-quality-scorecard` 等——沿用 Layer 1 的排期，不重复列于此表。）

### Layer 2: On-Demand

只在触发条件出现时读取：

| Trigger | Reference |
|---|---|
| 压力情景、敏感性、两种图景 | `stress-scenario-content-standard.md` |
| 跨国家、跨司法辖区、制度比较 | `global-policy-comparison-template.md` |
| 英文/双语/海外总部 | `bilingual-output-standard.md` |
| 章节图片、AI 生成图片 | `section-divider-image-protocol.md`, `professional-image-rulebook.md` |
| 用户提供 `ppt版式/` 或要求参考外部版式 | `reference-layout-library.md`, `reference-layout-analysis-framework.md`, `scenario-layout-selector.md`, `universal-page-family-registry.md`, `assets/design-tokens.json` |
| 用户要求跨主题复用版式、通用模板或只调颜色 | `universal-page-family-registry.md`, `layout-lock-protocol.md`, `assets/design-tokens.json` |
| 用户反馈颜色前后不一致 | `visual-profile-registry.md`, `layout-lock-protocol.md`, `assets/design-tokens.json`, `visual-qa-protocol.md` |
| 用户反馈确认节点被跳过 | `agent-behavioral-guardrail.md`, `confirmation-state-machine.md`, `confirmation-log-standard.md`, `build-runner-protocol.md` |
| 用户要求新建、整体优化、整体升级、重构或复刻 PPT | `strategy-brief.md`, `guided-interaction-pattern.md`, `decision-to-deck-attribute-map.md`, `structure-first-confirmation-protocol.md` |
| 用户要求 Guide Mode、分阶段提问、先确认再生成 | `guided-interaction-pattern.md`, `decision-to-deck-attribute-map.md`, `confirmation-state-machine.md` |
| 用户反馈数字、百分比、pct 或 bp 表达不专业 | `number-expression-standard.md`, `consulting-language-playbook.md` |
| 交易、估值、尽调、股研等专业底稿 | relevant financial-services skill references |

## Execution Rule

After routing:

1. Read Layer 0.
2. Use tier-stage matrix to identify current stage list.
3. For each stage, load the Layer 1 references attached to that stage, plus the tier-floor files that Layer 1b schedules for that stage（下限件在任务开始时即须逐件列入加载计划）。
4. Load Layer 2 only when the page/content explicitly requires it.

## Anti-Pattern

Do not load all of these just because the deck is important:

- every visual reference
- every language reference
- every scenario reference
- every methodology pack

Important decks need stricter gates, not indiscriminate context loading.
