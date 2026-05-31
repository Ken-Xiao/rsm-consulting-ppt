# Agent runtime brief — Write an Earnings Note Deck like a Goldman Sachs Sell-Side Analyst

## Core principle

every revision, bridge, and rationale ties to a public disclosure — 10-Q line item, earnings release page #, or transcript timestamp. Floating claims ("management was upbeat") are blocked unless paired with a transcript quote and slide footnote.

## Context the agent must establish before generating

> Before producing the deck, the agent must know each item below.
> - If the user's prior messages already supply an item, use it; do NOT re-ask.
> - If an item can be reasonably inferred from the user's stated topic, infer it and state the assumption inline on slide 2.
> - Ask only what is missing AND cannot be inferred — one targeted question at a time, not a script.

1. **Ticker, exchange, and fiscal period** — e.g. CRM, NYSE, Q3 FY26. Drives the cover and the disclosure footer.
2. **Reported figures vs. consensus** — paste revenue, gross margin, op-margin, EPS, plus Bloomberg / Visible Alpha consensus. The agent will not build the bridge without both sides.
3. **Your prior rating and PT** — Buy / Hold / Sell + the prior 12-month PT. Drives the rationale boxout and revision narrative.
4. **What changed in your model** — pick from: revenue growth assumption, gross-margin trajectory, capex / opex, share count, discount rate, terminal multiple. Drives slide 09.
5. **The one-line PM takeaway** — sentence form, not "in line with expectations". This becomes the cover sub-headline.
6. *(optional)* **Bull/base/bear PT bands** — if provided, the agent renders the scenario panel; otherwise it asks for the multiple/DCF inputs to compute one.

## Mandatory checks (during generation)

- ✅ Cover carries the rating, 12-month PT, return-to-PT %, analyst name + CFA designation if applicable, and the disclosure footer (analyst certification + ratings distribution + material-conflict statement).
- ✅ The beat/miss bridge slides reconcile to the reported figure to the cent. Off-by-more triggers a mandatory methodology footnote.
- ✅ Every consensus comparison cites the consensus source and snapshot timestamp (e.g. "Visible Alpha consensus as of 16:00 ET, day before earnings").
- ✅ Estimate-revision table shows old / new / Δ / Δ% for revenue, GM%, OpM%, EPS — across the current quarter, next quarter, and the next two fiscal years.
- ✅ Guidance read-through (slide 07) shows company guide vs. consensus vs. analyst's new estimate, in a three-column comparison.
- ✅ No "in line" or "upbeat" without a transcript quote and footnote.
- ✅ The "what we're watching" slide (slide 12) names ≤ 3 KPIs and the next catalyst date.

## Template selection

- **US Large-Cap Tech** (default): 14 slides, EPS-led, GAAP vs. non-GAAP reconciliation slide included. Best for US-listed software / internet / semis.
- **HK / China ADR** (alternate): 14 slides, same structure with IFRS adjustments, RMB/HKD/USD currency stack on every monetary panel, and an explicit non-GAAP recon page for stock-based comp. Best for HK-listed and China-ADR coverage.

## Use the bundled deck as a starting point

The included `deck/equity-research-earnings.slides/` is a complete reference deck modelled on a US-listed enterprise software company's Q3 print. The agent should copy this deck into the new project and replace specific numbers and quotes in place, preserving palette (Goldman-style navy `#082147` + ledger gold `#B8975A` on cream `#F7F3EB`), typography (Roboto Slab headlines, IBM Plex Sans body, IBM Plex Mono numerical tables), and the 14-slot order. The cover rating boxout, the bridge waterfalls (slides 04-05), and the estimate-revision table (slide 09) are normative.

## Recommended 14-slide structure

| # | Page | Purpose | Required? |
|---:|---|---|:---:|
| 1 | Cover | Ticker, period, rating boxout, one-line thesis, disclosure footer | **yes** |
| 2 | Executive Summary | 3-sentence thesis + 3 bullets of "what changed" | **yes** |
| 3 | Print Snapshot | Reported vs. consensus, key metrics, side-by-side | yes |
| 4 | Revenue Bridge | Reported → consensus waterfall, line by line | **yes** |
| 5 | EPS Bridge | Reported → consensus waterfall, including non-GAAP recon | **yes** |
| 6 | Segment / Geo Detail | Where the beat / miss came from | yes |
| 7 | Guidance Read-through | Company guide vs. consensus vs. analyst new | **yes** |
| 8 | KPI Operator Slide | The 3-5 KPIs management discusses on the call | yes |
| 9 | Estimate Revisions | Old / new / Δ for revenue, GM, OpM, EPS across Q+1, Q+2, FY+1, FY+2 | **yes** |
| 10 | Valuation Update | DCF / multiple update, scenario bands | yes |
| 11 | Risk & Catalyst Map | Next 4 quarters of dates and tape-movers | yes |
| 12 | What We're Watching | ≤3 KPIs + next catalyst date | **yes** |
| 13 | Q&A Preparation | Likely PM pushbacks + the analyst's answers | yes |
| 14 | Disclosures & Sources | Full rating distribution, conflicts, sources | **yes** |
