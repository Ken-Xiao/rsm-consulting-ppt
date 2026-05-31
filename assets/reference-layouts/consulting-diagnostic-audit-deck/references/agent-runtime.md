# Agent runtime brief — Diagnose a Client like a McKinsey Implementation lead

## Core principle

every opportunity on the deck must be **dollar-sized with a confidence level and a named source** (interview, benchmark, internal data pull). "Significant opportunity" without dollar-sizing is auto-rejected. The deck must commit the team to Results Delivery rigor in phase-2 — open-ended "next phase" asks are auto-rejected.

## Context the agent must establish before generating

> Before producing the deck, the agent must know each item below.
> - If the user's prior messages already supply an item, use it; do NOT re-ask.
> - If an item can be reasonably inferred from the user's stated topic, infer it and state the assumption inline on slide 2.
> - Ask only what is missing AND cannot be inferred — one targeted question at a time, not a script.

1. **Engagement scope, client, partner-in-charge, diagnostic period** — "10-week ops transformation diagnostic, mid-sized industrial client, Partner X, Days 1-10". Required for slide 1.
2. **Top-line + bottom-line KPI today vs internal-best vs external benchmark** — the four numbers that anchor slide 4. Each benchmark needs a source line. Anonymous benchmarks are flagged.
3. **Diagnostic approach — interviews (n), benchmarks (named sources), data pulls** — "n=14 interviews across Sales, Ops, Finance; competitive cost benchmark via Bain Holistic Performance Improvement methodology; 3-year P&L data pull". Required for slide 3.
4. **Opportunity register — 12-15 sized opportunities** — each with: name, Bain PI lever (procurement, SG&A, pricing, working capital, footprint, manufacturing, complexity, organization, digital, customer)[^2], $ impact (annualized), confidence (low/medium/high), named source. Aggregate-level "improvement areas" are auto-expanded into specific opportunities.
5. **One named organizational decision-rights problem** — the slide 12 RAPID diagnosis. "Decisions take too long" is rewritten as a specific broken decision in RAPID terms (e.g. "Pricing-exception approval: 4 Recommenders, 3 Agreers, no Decider")[^3].
6. **Quick wins (90-day) — 3-5 actions delivering $X by day 90 with named owners** — required for slide 13.
7. **Phase-2 scope — workstreams, team, duration, expected $ / cost ratio** — required for slide 17. Open-ended "we recommend a next phase" asks are auto-rejected.

## Mandatory checks (during generation)

- ✅ Slide 02 (Executive Answer) is the Minto Situation-Complication-Resolution paragraph + one supporting chart. Decks failing this structure are auto-flagged.
- ✅ Every opportunity slide has $ impact + confidence level + named source. "Significant opportunity" without dollar-sizing is auto-rejected.
- ✅ Slide 06 (Effort-vs-Impact 2×2) has dot-size proportional to $ impact; top-5 are named on-chart; quick-wins quadrant is called out.
- ✅ Every opportunity is slotted into one of Bain's 10 PI levers[^2]. Unlabelled "miscellaneous" opportunities are auto-categorised.
- ✅ Slide 12 (Organizational Root Cause) expresses at least one decision-rights problem in RAPID terms. Process diagnostics without decision-rights mapping are flagged.
- ✅ Every benchmark has a source line in the slide footer (McKinsey-style exhibit-number / source-line format).
- ✅ Slide 17 (The Ask) names workstreams, owners, duration, and expected $ / cost ratio (the deal-economics test the partner will run). Open-ended asks are auto-rejected.
- ✅ The deck never uses "synergies", "best-practice", "low-hanging fruit". Auto-replaced with specific lever names and dollar-anchored descriptors.

## Template selection

- **McKinsey Implementation Standard** (default): 18 slides, slate + signal-blue + accent-red palette, dense exhibit-style layouts, exhibit-number / source-line footer on every slide. Best for McKinsey RTS / Recovery & Transformation Services engagements and tier-one partner reviews.
- **Bain Performance Improvement Variant** (alternate): 18 slides with Bain's 10-lever scorecard expanded into a dedicated slide between slide 4 and slide 5, and the Results Delivery rigor commitment expanded into slide 14. Best for Bain PI engagements and industrial-sector diagnostics.

## Use the bundled deck as a starting point

The included `deck/consulting-diagnostic-audit.slides/` is a complete reference deck modelled on a 10-week ops transformation diagnostic for a mid-sized industrial client, with 14 sized opportunities totaling ~$42M annualized impact. The agent should copy this deck into the new project and replace slide content in place, preserving palette (slate `#1F2937` + signal-blue `#1E40AF` + accent-red `#B91C1C` on clean white `#FFFFFF`), typography (Söhne / Inter / IBM Plex Sans for headlines, JetBrains Mono for every $-impact / KPI grid), and the 18-slot order. Slide 2 (Minto answer) and slide 6 (2×2) are normative.

## Recommended 18-slide structure

| # | Page | Purpose | Required? |
|---:|---|---|:---:|
| 1 | Cover | Engagement, client, date, partner-in-charge, diagnostic period | yes |
| 2 | Executive Answer (Minto) | Situation / Complication / Resolution in one paragraph + one chart | **yes** |
| 3 | Diagnostic Approach | 5-10 working-day plan: interviews (n=N), benchmarks, data pulls | yes |
| 4 | Baseline Performance | Top-line + bottom-line KPI today vs internal-best vs external benchmark | **yes** |
| 5 | Top-5 Improvement Opportunities (named) | One line + $ impact + confidence per opportunity | **yes** |
| 6 | Effort-vs-Impact 2×2 | All 12-15 opportunities plotted; dot-size = $ impact; top-5 highlighted | **yes** |
| 7 | Lever 1 — [e.g. Procurement] | Baseline / benchmark / opportunity / $ impact / mechanism / owner | **yes** |
| 8 | Lever 2 — [e.g. SG&A] | Same template | **yes** |
| 9 | Lever 3 — [e.g. Pricing / Revenue Mgmt] | Same template | **yes** |
| 10 | Lever 4 — [e.g. Working Capital] | Same template | **yes** |
| 11 | Lever 5 — [e.g. Footprint / Network] | Same template | **yes** |
| 12 | Organizational Root Cause (RAPID) | Decision-rights mapping; named broken decisions | **yes** |
| 13 | Quick Wins (90-day) | 3-5 actions delivering $X by day 90; named owner each | **yes** |
| 14 | Phase-2 Roadmap | 6-month implementation plan, workstreams, Results Delivery rigor | **yes** |
| 15 | Risks & Dependencies | Top-5 risks with mitigation owner | yes |
| 16 | Recommended Governance | Steering committee cadence, decision rights (RAPID), reporting | yes |
| 17 | The Ask | Phase-2 scope, team, duration, expected $ impact / cost ratio | **yes** |
| 18 | Appendix — Methodology & Sources | Interview list (anonymised), benchmark sources, data lineage | yes |
