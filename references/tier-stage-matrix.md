# Tier Stage Matrix

用于把任务档位转成明确的 build runner stage 列表，减少 Agent 自行判断哪些步骤可以跳过。

## Stage Matrix

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

## Build Stage Lists

Use these lists after tier routing:

```json
{
  "express": ["S1-minimal", "S2-simple", "S4-basic", "S6-draft"],
  "quick-polish": ["S1-minimal", "S2-patch", "S3-optional", "S4-basic", "S6-polish"],
  "partner-ready": ["S0", "S1", "S1.6", "S2.5", "S2.6-recommended", "S2", "S3", "S4", "S5", "S6"],
  "client-ready": ["S0", "S1", "S1.5", "S1.6", "S2.5", "S2.6", "S2", "S3", "S4", "S5", "S6"],
  "pipeline": ["S0", "S1", "S1.5", "S1.6", "S2.5", "S2.6", "S2", "S3", "S4", "S5", "S6", "regression"]
}
```

## Rule

Once tier is selected, the agent should follow the corresponding list. Do not read or execute stages outside the tier unless the user escalates the task or risk conditions require it.

