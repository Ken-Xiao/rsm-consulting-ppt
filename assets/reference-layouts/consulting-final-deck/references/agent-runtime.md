# Agent runtime brief — Write a Client Final Deck like a McKinsey Engagement Manager

## Core principle

a Final deck has one Governing Thought. If the author cannot state it in one sentence, the engagement is not finished — the deck is rejected and the agent prompts to sharpen the answer first.

## Context the agent must establish before generating

> Before producing the deck, the agent must know each item below.
> - If the user's prior messages already supply an item, use it; do NOT re-ask.
> - If an item can be reasonably inferred from the user's stated topic, infer it and state the assumption inline on slide 2.
> - Ask only what is missing AND cannot be inferred — one targeted question at a time, not a script.

1. **Client question** — the original question the engagement was scoped against, in one sentence ("Should we enter North America, and if so, how?"). The agent rewrites vague questions before proceeding.
2. **Governing Thought (the answer)** — single declarative sentence. The agent stress-tests: is this an answer or a topic? "Yes, enter North America via acquisition of Distributor B by Q3" is an answer; "We analyzed North American options" is a topic.
3. **Top-of-Pyramid arguments** — three (rarely four), MECE-collectively proving the Governing Thought. The agent checks for overlap and gaps.
4. **Engagement scope + duration** — when did the engagement start, what was in/out of scope, what data was gathered. Drives slide 03 (Approach).
5. **The "so what" for each chapter** — for each of the three Top-of-Pyramid arguments, the headline finding. These become the chapter divider action titles.
6. **Implementation owner counterparts** — for each workstream, the named client-side executive or organization. If the author cannot name them, the agent uses a placeholder and flags it for the Partner to fill before the readout.
7. **CEO / sponsor pre-read context** — has the CEO seen any of these findings already? What did they push back on? The deck's opening sequence (slide 02 Governing Thought + slide 03 Approach) is shaped by this.
8. *(optional)* **Counter-argument the room will raise** — the deck explicitly addresses it on a Risks slide rather than letting it derail Q&A.

## Mandatory checks (during generation)

- ✅ Slide 02 has exactly one Governing Thought (single sentence, declarative) and 3 (rarely 4) Top-of-Pyramid bullets. **Topic titles like "Executive Summary" are blocked.**
- ✅ Every body slide title is a full sentence with a verb. "Market sizing" is rewritten to "The addressable market is $24B, growing 11% — concentrated in three customer segments". Slides with topic titles are flagged red.
- ✅ The deck follows Pyramid order: Top-of-Pyramid arguments determine chapter order; within each chapter, the action-titled slides are ordered by deductive (if-then-therefore) or inductive (parallel evidence) structure — but never a chronological narrative of the engagement.
- ✅ Every chart is the right chart for the comparison (Zelazny[^4]: components → pie or stacked bar; items → bar; time series → line; frequency → histogram; correlation → scatter). The agent rewrites charts that violate this.
- ✅ Numbers always carry: a denominator, a year, and a source. "$24B market" is rewritten to "$24B revenue (2024, USD billion, IBISWorld + adjustment for X)".
- ✅ Slide 18 (Roadmap) has every workstream owned. "TBD" owners are flagged for the Partner.
- ✅ The deck never opens with "About Us". The McKinsey opening is the SCQA (Situation → Complication → Question → Answer) on slide 02; the firm-credentials slide, if used at all, is in the back-pocket appendix.
- ✅ No bullet point exceeds two lines on the rendered slide. The McKinsey discipline is "one chart or three bullets, never both".

## Template selection

- **CXO Final Readout** (default, bundled): white background, McKinsey-style navy `#1F2A44` chrome, slate accent `#5A6271`, ink charts. Tight typography; designed to read identically on screen and printed.
- **Board Strategy Synthesis** (alternate, not bundled): same content compressed to 12 slides, executive-summary-first, for a 20-minute board strategy session.

## Use the bundled deck as a starting point

The included `deck/mckinsey-final.slides/` is a complete, ready-to-use reference deck on **a 10-week engagement: should an EU industrial-equipment manufacturer enter North America, and how?** — chosen because it stress-tests every slot (a binary recommendation, three Top-of-Pyramid chapters, a build-vs-buy chart, a sensitivity-analysis page, and a board-level political constraint). The agent should copy this deck into the new project and replace slide-by-slide content, preserving:

- The 20-slot order (Governing Thought at slide 02, Roadmap at slide 18 are normative)
- Color tokens: navy `#1F2A44`, slate `#5A6271`, accent ochre `#B68C2E`, white background, charcoal text
- Typography: Source Serif 4 for headings, Inter for body, IBM Plex Mono for numbers and footnote markers
- Action-title height — never reduce the title font to fit more words; rewrite the title shorter

## Recommended 20-slide structure

| # | Page | Purpose | Required? |
|---:|---|---|:---:|
| 1 | Cover | Engagement title + client + Partner + date | yes |
| 2 | Governing Thought + Top-of-Pyramid | Single declarative answer + 3 supporting arguments | **yes** |
| 3 | Approach + Scope | Timeline, work performed, data sources | yes |
| 4 | Chapter 1 Divider | Action title = argument #1 | yes |
| 5-7 | Argument 1 — Evidence | Action-titled body slides | yes |
| 8 | Argument 1 — So what | Implication for the client | yes |
| 9 | Chapter 2 Divider | Action title = argument #2 | yes |
| 10-12 | Argument 2 — Evidence | Action-titled body slides | yes |
| 13 | Argument 2 — So what | Implication for the client | yes |
| 14 | Chapter 3 Divider | Action title = argument #3 | yes |
| 15-16 | Argument 3 — Evidence | Action-titled body slides | yes |
| 17 | Risks & Sensitivities | Top 3 risks, P50 / P10 / P90 quantified | yes |
| 18 | Implementation Roadmap | Day 1 / 30 / 90 / 365 by workstream with owners | **yes** |
| 19 | Decisions Required Today | 1-3 binary asks for the CEO | yes |
| 20 | Appendix Cover | Pointer to back-pocket pages | yes |
