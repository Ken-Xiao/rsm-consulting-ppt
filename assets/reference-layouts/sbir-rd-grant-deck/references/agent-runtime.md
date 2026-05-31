# Agent runtime brief — Win an SBIR Grant like a Phase II awardee

## Core principle

every slide heading must contain verbatim or near-verbatim language from the agency's published review criteria (NIH Simplified Framework, NSF rubric, DOE 5-criterion list, USDA NIFA evaluation criteria, Navy SBIR Phase II Initial Proposal Instructions). If the PI cannot name the specific PA / NOFO / topic code, the deck is incomplete.

## Context the agent must establish before generating

> Before producing the deck, the agent must know each item below.
> - If the user's prior messages already supply an item, use it; do NOT re-ask.
> - If an item can be reasonably inferred from the user's stated topic, infer it and state the assumption inline on slide 2.
> - Ask only what is missing AND cannot be inferred — one targeted question at a time, not a script.

1. **Agency + topic code + Phase I award number** — "NIH PA-26-014, Sec 2.1; Phase I award R43-XX-2024-12345". Generic "NIH SBIR" is rejected; the agent re-asks for the specific PA / NOFO / topic code so the rubric language can be pulled verbatim.
2. **Phase I technical achievement + the data plot that proves it** — the specific TRL-N result, the measurement, the sample size, the statistical confidence. Required for slide 4.
3. **3-5 Phase II technical objectives, each tied to a rubric criterion** — TO-1 tied to Significance, TO-2 tied to Approach, TO-3 tied to Rigor & Feasibility, etc. Generic "we will continue developing the platform" is rejected.
4. **TRL progression — entry, exit, and the measurable transition criterion** — Phase I exit TRL → Phase II exit TRL with the specific measurement (e.g. "TRL 4 → TRL 6, defined by ≥92% concordance with gold-standard ELISA across 3 reference labs"). Required for slide 7.
5. **Commercialization plan — TAM/SAM/SOM (bottom-up), customer segments, named first customers, 3-year revenue projection** — generic market sizing is auto-rejected. Required for slides 10-11.
6. **Phase III transition partner — named, with Letter of Support status** — "Quest Diagnostics signed LoS (App C), 6-month validation pilot @ $480K, exit-criterion ≥90% concordance". For DoD applications, named prime contractor + TPOC; for NIH, named clinical reference partner.
7. **Top-5 risk register** — likelihood × impact, mitigation, owner. Required for slide 13.

## Mandatory checks (during generation)

- ✅ Every slide heading echoes agency-rubric language. NIH headings use NIH-specific terms (Significance / Investigators / Innovation / Approach / Environment under the Simplified Framework[^2]); DOE headings use DOE's 5 criteria[^3]; USDA NIFA uses its scored criteria[^4]; Navy SBIR uses Phase II Initial Proposal Instructions language[^5].
- ✅ Slide 06 (Approach — Work Plan Gantt) shows every milestone colour-coded to a named review criterion. Unmapped milestones trigger a rewrite.
- ✅ Slide 07 (TRL Progression) names entry TRL, exit TRL, and the measurable exit criterion for each transition. "TRL will increase" → auto-flagged.
- ✅ Slide 10-11 (Commercialization Plan) uses bottom-up TAM/SAM/SOM with named first customers; top-down TAM numbers are blocked at output.
- ✅ Slide 12 (Phase III Transition Partner) names the partner + LoS / LoI status + the pilot exit criterion. For DoD: prime + TPOC. For NIH: reference lab / clinical partner.
- ✅ Slide 13 (Risk Register) shows top-5 risks with likelihood × impact, mitigation, and named owner. "Challenges to be addressed" without ownership → auto-rejected.
- ✅ Slide 16 (Criterion-to-Slide Rubric Map) verifies every scored criterion is addressed by at least one slide. Missing criteria are flagged.
- ✅ The deck never uses "cutting-edge", "revolutionary", "game-changing". Auto-replaced with concrete TRL / measurement statements.

## Template selection

- **NIH Simplified Framework** (default for health / life-sciences): 16 slides organized around the 3 scored factors (Importance of the Research, Rigor and Feasibility, Investigators/Environment) plus 2 regulatory criteria (Resources, Human Subjects).
- **DoD / Navy SBIR Variant** (alternate for defense / DoD agencies): 16 slides organized around Navy Phase II Initial Proposal Instructions — technical objectives, work plan, related research, key personnel, transition plan, commercialization strategy[^5]; expanded transition slide with TPOC + prime contractor.
- **NSF / DOE / USDA Variant** (alternate for science / energy / agriculture agencies): 16 slides organized around DOE's 5 review criteria (novelty, R&D content, topic responsiveness, work plan solidity, commercialization plan strength)[^3].

## Use the bundled deck as a starting point

The included `deck/sbir-rd-grant.slides/` is a complete reference deck modelled on an NIH-SBIR Phase I awardee developing a sub-ng/mL biomarker assay, applying for a 2-year $2.5M Phase II with Quest Diagnostics as the Phase III transition partner. The agent should copy this deck into the new project and replace slide content in place, preserving palette (navy `#1B3A6B` + brick `#9A2B2B` + ink `#0F172A` on structural white `#FFFFFF`), typography (Public Sans / Source Sans 3 / IBM Plex Sans for headlines, JetBrains Mono for budget / TRL / Gantt grids), and the 16-slot order. Slide 5 (Technical Objectives) and slide 12 (Phase III Transition) are normative.

## Recommended 16-slide structure

| # | Page | Purpose | Required? |
|---:|---|---|:---:|
| 1 | Cover | Company, PI, agency + topic code, Phase I award #, Phase II ask, period of performance | yes |
| 2 | Significance — Scored | The programmatic need addressed; verbatim agency-rubric language | **yes** |
| 3 | Innovation — Scored | What is novel; differentiation from prior art; IP position | **yes** |
| 4 | Phase I Results | The TRL-N technical achievement Phase I established; data plot | **yes** |
| 5 | Phase II Technical Objectives | 3-5 named objectives, each tied to a rubric criterion | **yes** |
| 6 | Approach — Work Plan Gantt | Tasks, milestones, deliverables, decision gates; criterion-mapped | **yes** |
| 7 | TRL Progression | Phase I exit TRL → Phase II exit TRL with measurable exit criteria | **yes** |
| 8 | Rigor & Feasibility | Statistical power, sample sizes, controls, replication plan | **yes** |
| 9 | Investigators & Environment | PI, co-I, key personnel; facilities, equipment, partner labs | yes |
| 10 | Commercialization Plan — Market | TAM/SAM/SOM, customer segments, bottom-up sizing | **yes** |
| 11 | Commercialization Plan — Channel & Revenue | Named first customers, channel strategy, 3-year revenue projection | **yes** |
| 12 | Phase III Transition Partner | Named prime / commercial partner with Letter of Support | **yes** |
| 13 | Risk Register | Top-5 risks, likelihood × impact, mitigation, owner | **yes** |
| 14 | Budget & Resource Plan | Direct costs, indirect costs, subawards; cost-share if applicable | yes |
| 15 | Team Capability & Past Performance | Prior SBIR / publications / patents; named PI experience | yes |
| 16 | Criterion-to-Slide Rubric Map (Appendix) | Verifies every scored criterion is addressed | **yes** |
