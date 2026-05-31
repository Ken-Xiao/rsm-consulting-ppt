# Agent runtime brief — Write a CRM Funnel + QBR Deck like a Stripe RevOps Lead

## Core principle

every percentage on every slide is anchored to a CRM stage ID disclosed on slide 02. Floating conversion numbers without a stage anchor are blocked.

## Context the agent must establish before generating

> Before producing the deck, the agent must know each item below.
> - If the user's prior messages already supply an item, use it; do NOT re-ask.
> - If an item can be reasonably inferred from the user's stated topic, infer it and state the assumption inline on slide 2.
> - Ask only what is missing AND cannot be inferred — one targeted question at a time, not a script.

1. **Which CRM, and what is the export window?** — HubSpot / Salesforce, plus the closed-won/lost period (e.g. Q3 FY26 = Aug-Oct).
2. **What are the stage IDs and stage names?** — the agent ingests the export and confirms; if the stage list isn't shared across reps, the deck flags inconsistency and refuses to compute aggregate conversion.
3. **Which qualification framework is in use?** — MEDDIC (enterprise) or SPICED (PLG / mid-market). Drives slide 06 and the deal-scoring rubric.
4. **What is the ARR / ACV mix?** — by segment (SMB / MM / Ent) and by motion (inbound / outbound / partner). Drives the segmentation cuts.
5. **Who is the audience and what is the decision being made?** — CRO + execs (commit forecast?), board (pipeline coverage?), rep all-hands (push/pull/kill list?). Shapes which 4-5 slides go to the front.
6. *(optional)* **Last-quarter forecast accuracy** — the agent overlays the actual band on slide 12 if provided.

## Mandatory checks (during generation)

- ✅ Slide 02 lists every CRM stage with: stage ID, stage name, exit criteria, average days-in-stage, and current open count. If any stage is missing exit criteria, the slide raises a yellow flag.
- ✅ Slide 03 (Push / Pull / Kill) names ≤ 10 deals total — typically 3-4 per bucket. More than 10 reads as noise; fewer than 3 is a flag the quarter is too tightly bunched to make calls.
- ✅ The pipeline waterfall slide (slide 07) reconciles to ±1 % of CRM truth. Off-by-more triggers a methodology slide insertion.
- ✅ Forecast accuracy is reported with last 4 quarters of actual vs. commit, with a confidence band — never just "we hit 96 % last quarter".
- ✅ Rep-level slides use small-multiples or a strip plot; never a single bar chart that ranks reps. Avoid public shaming, surface coaching signals.
- ✅ Lost-deal analysis (slide 11) shows the top 3 closed-lost reasons by ARR, not by count. Counts mislead when lost SMB deals dominate volume.
- ✅ Every conversion ratio cites the numerator and denominator stages in monospace under the chart.

## Template selection

- **Enterprise QBR** (default): 16 slides, MEDDIC scoring, deeper deal-desk + forecast accuracy slides. Best for enterprise SaaS sales orgs (ACV ≥ $50k).
- **PLG / Mid-Market** (alternate): 12 slides, SPICED scoring, more emphasis on conversion velocity, PQL → SQL handoff, and self-serve cohort. Best for usage-led motions.

## Use the bundled deck as a starting point

The included `deck/crm-funnel-qbr.slides/` is a complete reference deck modelled on a B2B SaaS payments business (HubSpot pipeline, multi-touch attribution, enterprise + SMB segments). The agent should copy this deck into the new project and replace the funnel numbers and waterfall components in place, preserving palette (Stripe-style indigo `#635BFF` + slate ink `#0A2540` + cream `#F6F9FC`), typography (Inter / Sohne-style sans), and the 16-slot order. Slot 02 (stage lock-in) and slot 07 (waterfall) are normative.

## Recommended 16-slide structure

| # | Page | Purpose | Required? |
|---:|---|---|:---:|
| 1 | Cover | Quarter, owner, CRM source-of-truth, snapshot date | yes |
| 2 | Stage Definitions Lock-in | Stage IDs, exit criteria, current open count | **yes** |
| 3 | Push / Pull / Kill | ≤10 named deals with action | **yes** |
| 4 | Top-of-Funnel Health | New pipeline by source × ICP fit | yes |
| 5 | Stage-by-Stage Conversion | Win rate, days-in-stage, cohorted by quarter | **yes** |
| 6 | Qualification Score (MEDDIC / SPICED) | Open deals scored, gaps flagged | **yes** |
| 7 | Pipeline Waterfall | Opening → ending, fully reconciled | **yes** |
| 8 | Bookings vs. Plan | Segment × motion mix vs. quarterly plan | yes |
| 9 | Deal Velocity | Median days-in-stage trend, slippage rate | yes |
| 10 | Win-rate by Segment / Rep | Small multiples, coaching signals | yes |
| 11 | Lost-Deal Analysis | Top 3 reasons by ARR, with verbatim quotes | **yes** |
| 12 | Forecast Accuracy | Commit / best-case / coverage / linearity vs. last 4Q | **yes** |
| 13 | Quota Attainment | Rep distribution, ramped vs. non-ramped | yes |
| 14 | Operational Health | Hygiene metrics: stale deals, missing fields, no-MB cases | yes |
| 15 | Asks / Decisions | One row per ask, owner + due date | **yes** |
| 16 | Appendix | Raw exports, links, methodology | yes |
