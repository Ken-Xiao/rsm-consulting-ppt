# Agent runtime brief — Write a Consulting Capability Pitch like an MBB Partner Beating Big 4

## Core principle

the pitch is won on slide 02 or lost on slide 02. Generic firm credentials are not differentiation; specific situational fit is.

## Context the agent must establish before generating

> Before producing the deck, the agent must know each item below.
> - If the user's prior messages already supply an item, use it; do NOT re-ask.
> - If an item can be reasonably inferred from the user's stated topic, infer it and state the assumption inline on slide 2.
> - Ask only what is missing AND cannot be inferred — one targeted question at a time, not a script.

1. **Prospect + decision-maker** — company, industry, the named executive sitting across the table (CFO, CSO, COO). The Right-to-Win statement must be tailored to their stated priorities.
2. **The engagement type** — strategy, transformation, due-diligence, performance improvement, M&A integration, organization design. Different types have different proof-stack analogues.
3. **The competition** — explicitly which firms are also pitching? (Deloitte, PwC, EY, KPMG, Accenture, Boutique X, internal team option.) The Right-to-Win statement is differentiation *from named competitors*, not "from generic alternatives".
4. **The three best comparable engagements** — names + outcomes + lead partner. The agent rejects vague "we've done many similar projects"; if the firm cannot name three real comparables, the deck is downgraded to a "capability primer" not a pitch.
5. **The team that will actually work the engagement** — named partners, senior advisors, project leads. Phantom-team pitches (where the team named on the pitch is not the team that staffs the work) are flagged; the agent prompts the partner to confirm.
6. **The procurement scoring rubric** — if available, the rubric tells the deck which dimensions to overweight (capability fit 30%, team experience 25%, methodology 20%, commercial 25%, etc.). The deck is structured to score top in the heaviest categories.
7. **Commercial structure preference** — fixed fee, time & materials, success fee, retainer. Affects slide 14 (Commercials).
8. *(optional)* **The Big-4 weakness the client has explicitly named** — if the client has said "the Big 4 we worked with last year handed us a binder, not a result", the deck explicitly addresses this on slide 04 (Differentiation).

## Mandatory checks (during generation)

- ✅ Slide 02 (Right-to-Win) names three specific reasons. Generic phrases like "deep industry experience", "global capabilities", "trusted advisor relationships" are rewritten with specifics or removed. **The slide cannot use the words "best-in-class", "world-class", or "leading".**
- ✅ Slides 06-08 (Proof Stack) name a real engagement. The client name is preserved if public; sanitized to a defensible descriptor if confidential ("a Global 50 specialty-chemicals manufacturer", not "a leading industrial company"). Each proof slide includes a quantified outcome.
- ✅ Slide 13 (Team) names individuals with photos + tenure + relevant prior engagements. Generic "our 1,200 industry experts" is removed.
- ✅ Slide 14 (Commercials) shows the structure clearly: fee, timeline, scope inclusions, scope exclusions. Hidden assumptions are flagged. Fee bands (rather than a single number) are acceptable for very early-stage pitches.
- ✅ The deck never uses Big 4 firm names disparagingly. Differentiation is positive ("partner-led model with fewer than 6 senior consultants on the engagement") not negative ("unlike the larger firms").
- ✅ Every claim about "we deliver results" is followed by a footnote citing the specific case. Unsubstantiated claims are flagged red.
- ✅ Slide 15 (Approach) is the firm's actual approach (a methodology, not a roadmap). The roadmap goes on slide 12 (Workplan).
- ✅ Cover slide names both the prospect and the firm; the firm logo is smaller than the prospect's name. This is a deference signal experienced procurement teams notice.

## Template selection

- **MBB Beauty Parade** (default, bundled): white background, restrained navy `#1F2A44` chrome, ochre `#B68C2E` accent. Conservative, partner-grade typography; designed to read at procurement scoring panel + at CXO read-back.
- **Big 4 Defending Against Boutique** (alternate, not bundled): same structure, more emphasis on scale + cross-service capabilities (audit-adjacent, technology-implementation-adjacent), useful when a Big 4 partner is defending against a boutique.

## Use the bundled deck as a starting point

The included `deck/consulting-capability-pitch.slides/` is a complete, ready-to-use reference deck on **an MBB partner pitching a 14-week revenue-growth strategy to a $4B specialty-chemicals manufacturer, against Deloitte Monitor and a boutique** — chosen because it stress-tests every slot (a defensive Big-4 incumbent, a boutique price-disrupter, three high-credibility comparables, and a procurement scoring rubric the partner has obtained). The agent should copy this deck into the new project and replace slide-by-slide content, preserving:

- The 16-slot order (Right-to-Win at slide 02, Proof Stack at slides 06-08, Team at slide 13 are normative)
- Color tokens: navy `#1F2A44`, ochre `#B68C2E`, slate `#5A6271`, white background, charcoal text
- Typography: Source Serif 4 for headings, Inter body, IBM Plex Mono for fee bands / dates / case-study tags
- The named-partner photo treatment on slide 13 — never replace with anonymous team illustrations

## Recommended 16-slide structure

| # | Page | Purpose | Required? |
|---:|---|---|:---:|
| 1 | Cover | Prospect name (large) + firm logo (smaller) + date | yes |
| 2 | Right-to-Win | Three specific reasons | **yes** |
| 3 | Our Understanding of Your Situation | Demonstrates pre-pitch homework | yes |
| 4 | Differentiation | What we see that hasn't been articulated | yes |
| 5 | Proof Stack — Overview | One slide on the three named comparables | yes |
| 6 | Comparable Engagement #1 | Situation / work / outcome / partner / reference | **yes** |
| 7 | Comparable Engagement #2 | Situation / work / outcome / partner / reference | **yes** |
| 8 | Comparable Engagement #3 | Situation / work / outcome / partner / reference | **yes** |
| 9 | Methodology | The firm's distinctive approach to this type of work | yes |
| 10 | What's Different — One Asset / IP / Database | Concrete asset that compresses time-to-value | yes |
| 11 | Proposed Workplan (12-16 weeks) | Workstreams + milestones + decision gates | yes |
| 12 | Engagement Model | How we will work together — meeting cadence, decision rights | yes |
| 13 | Named Team | Partners + senior advisors + leads with photos + prior context | **yes** |
| 14 | Commercials | Fee structure + timeline + scope inclusions / exclusions | yes |
| 15 | Risks & How We Manage Them | The 3 things the prospect is worried about | yes |
| 16 | Decisions Required + Next Steps | 1-3 binary asks; reference-call offer | **yes** |
