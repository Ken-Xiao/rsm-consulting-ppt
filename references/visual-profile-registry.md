# Visual Profile Registry

用于统一 RSM 金融咨询 PPT 的视觉模式命名。选择 `visual_profile`、更新 `template-manifest.json`、新增 HTML layout、做 profile regression 前必须读取本文件。

## Canonical Profiles

| Canonical profile | Use when | Required proof in deck |
|---|---|---|
| `rsm-insurance-results` | 默认；上市保险公司新准则财务结果、财务盘点、同业指标对比、金融机构结果复盘 | 模块胶囊、浅灰结论条、白色图表卡、蓝/深蓝/灰图表色板 |
| `rsm-practice-sharing` | 不良处置、监管培训、行业实践分享、案例复盘 | 书法/楷体感蓝色标题、三段标题线、建筑/案例图片、案例卡或机制图 |
| `rsm-global-policy` | 全球贷款核销、IFRS 9/CECL、税务协同、跨司法辖区政策比较 | 三段标题线、制度矩阵、监管哲学图、司法辖区固定色、深色总结页可选 |
| `sunong-value-creation` | 苏农、农商行经营对标、价值创造、PB/EVA/ROA/RAROC、董事会经营诊断 | 深蓝封面、KPI 仪表盘、主图+诊断读法、经营指标与资本市场定价联动 |

## Supported Secondary Profiles

| Secondary profile | Status | Use when | Notes |
|---|---|---|---|
| `rsm-policy-light` | supported | 一般监管研究、合规方案、政策框架页、行动计划页 | 可作为 `rsm-global-policy` 的轻量正文页，但不替代全球政策 profile |
| `rsm-light` | supported | 用户要求稳重白底、无强 RSM 样式复刻 | 适合沿用原稿但提升咨询感 |
| `rsm-dark` | supported | 封面、章节转折、董事会强仪式感页 | 正文页慎用，避免全 deck 厚重深色页眉 |
| `minimal-data` | supported | 投行、投委会、数据优先场景 | 视觉克制，强调表格、估值区间和直接标签 |
| `pitchbook` | supported | 融资、估值、交易谈判 | 高密度表格、估值区间、交易对比 |
| `original-template` | fallback | 用户明确要求沿用原稿母版 | 只做局部优化，不主动替换为 RSM profile |

## Aliases And Deprecated Names

| Input or old name | Normalize to | Reason |
|---|---|---|
| `global-policy-light` | `rsm-global-policy` or `rsm-policy-light` | 旧名含义不清；全球制度比较用 `rsm-global-policy`，普通政策页用 `rsm-policy-light` |
| `policy-light` | `rsm-policy-light` | 保持 RSM 命名空间 |
| `insurance-results` | `rsm-insurance-results` | 保持 profile 命名一致 |
| `practice-sharing` | `rsm-practice-sharing` | 保持 profile 命名一致 |
| `sunong` | `sunong-value-creation` | 明确使用场景 |

当用户口语描述视觉风格时，先映射到 canonical 或 supported secondary profile，再写入 `preset_map.json`、`design_system.json` 和 `template-manifest.json`。

## Selection Rules

1. 没有明确场景时，默认 `rsm-insurance-results`。
2. 出现全球贷款核销、IFRS 9/CECL、跨司法辖区政策比较、税务协同，优先 `rsm-global-policy`。
3. 出现不良处置、行业实践分享、培训、案例复盘，优先 `rsm-practice-sharing`。
4. 出现苏农、农商行价值创造、PB/EVA/ROA/RAROC、董事会经营诊断，优先 `sunong-value-creation`。
5. 用户要求沿用原稿母版时，用 `original-template`，并只在局部引入 RSM 语言和图表纪律。
6. 同一 deck 可以混合 profile，但必须在 `preset_map.json` 中说明切换原因；不得为了装饰在正文页频繁切换。

## Manifest Rules

每个 `template-manifest.json` entry 必须使用 registry 中的 profile。新增 profile 前必须同时更新：

- 本文件的 profile 表。
- `references/visual-system.md` 的视觉描述。
- `references/sample-regression-test.md` 或 `references/profile-regression-matrix.md` 的样张覆盖。
- `assets/regression/*.sample-manifest.json` 或等价 regression fixture。

## Regression Coverage

四个 canonical profile 必须各有最少 6 类样张覆盖：

- cover
- agenda or scope page
- section divider
- one primary evidence page
- one matrix/comparison page
- one synthesis or action page

如果某个 profile 少于 6 类样张，`profile_regression` 只能标记为 `partial`，不得标记为 `complete`。
