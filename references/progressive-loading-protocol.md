# Progressive Loading Protocol

用于控制 reference 加载量，避免小任务被完整 pipeline 拖慢，也避免 Agent 因 context 过载而漏掉关键 gate。

## Core Principle

先加载行为骨架，再按 tier 和 stage 加载必要 reference，最后按场景按需补充。不要一次性读取全部 reference。

## Loading Layers

### Layer 0: Always Loaded

每个任务都应优先读取：

- `agent-behavioral-guardrail.md`
- `task-tier-protocol.md`
- `v2-capability-router.md`
- `confirmation-state-machine.md`

Purpose: 先确定行为边界、任务档位、是否需要确认、能否继续。

### Layer 1: Stage-Triggered

按当前 build stage 读取：

| Stage | Load only when entering stage |
|---|---|
| `S1` Validate | `artifact-validation-standard.md`, `logic-gate-checklist.md` |
| `S1.6` Insight/Density | `insight-to-layout-mapper.md`, `content-density-precheck.md`, `title-fit-standard.md` |
| `S2.5` Layout | `layout-lock-protocol.md`, `layout-analysis-report.md`, `template-manifest.md` |
| `S2.6` HTML Preview | `html-preview-protocol.md`, `visual-fullness-standard.md` |
| `S3/S4` Review | `visual-qa-protocol.md`, `final-review-checklist.md`, `deck-quality-scorecard.md` |

### Layer 2: On-Demand

只在触发条件出现时读取：

| Trigger | Reference |
|---|---|
| 压力情景、敏感性、两种图景 | `stress-scenario-content-standard.md` |
| 跨国家、跨司法辖区、制度比较 | `global-policy-comparison-template.md` |
| 英文/双语/海外总部 | `bilingual-output-standard.md` |
| 章节图片、AI 生成图片 | `section-divider-image-protocol.md`, `professional-image-rulebook.md` |
| 用户提供 `ppt版式/` 或要求参考外部版式 | `reference-layout-library.md`, `reference-layout-analysis-framework.md`, `scenario-layout-selector.md` |
| 交易、估值、尽调、股研等专业底稿 | relevant financial-services skill references |

## Execution Rule

After routing:

1. Read Layer 0.
2. Use tier-stage matrix to identify current stage list.
3. For each stage, load only Layer 1 references attached to that stage.
4. Load Layer 2 only when the page/content explicitly requires it.

## Anti-Pattern

Do not load all of these just because the deck is important:

- every visual reference
- every language reference
- every scenario reference
- every methodology pack

Important decks need stricter gates, not indiscriminate context loading.
