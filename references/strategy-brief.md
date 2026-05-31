# Strategy Brief Questions

用于在正式生成或深度优化 PPT 前，先把金融行业汇报的目标、内容和版式约束问清楚。默认必须先提问、等待回答、形成 brief，再进入后续步骤。轻量任务一次性提出 4-8 个问题；复杂 pipeline 项目按阶段一问一答，不要直接生成 PPT。

## Hard Interaction Gate

除非任务是纯 `quick-polish` / `targeted-edit`，或用户明确写出“跳过提问，直接生成最终 PPT”，否则必须先向用户提问并等待回答。

以下表达不等于跳过提问：

- `按材料处理`
- `帮我优化`
- `整体升级`
- `继续做一版`
- `参考这个模板`
- `根据这个规则更新`

这些情况下，先提出确认问题。不要因为可以从材料中推断，就自动进入生成；能推断的内容应写成“我的默认假设是...请确认”。

## Default Language Policy

- 默认输出语言为中文（`zh-CN`）。
- 不主动启用英文或双语；只有用户明确要求英文/双语、海外总部/外资机构汇报，或原始材料中存在必须保留的英文术语时，才切换到 `bilingual-output-standard.md`。
- 提问、brief、框架确认、标题链、逐页说明和审校意见均以中文为主。
- 英文机构名、准则名、指标缩写可以保留，但首次出现应给中文解释。

## When To Ask

必须先问：

- 用户只说“做一份 PPT / 优化这个 PPT / 生成董事会汇报”，但没有说明受众、目的或版式偏好。
- 任务涉及金融、法律、投资、资产、信托、估值、风险、合规等高影响结论。
- 需要新增叙事、重排结构、选择对标样本或设定分析框架。
- 用户要求复刻 Genspark/Guide Mode 或搭建可复用生产管线。

可以跳过的唯一情况：

- 用户明确说“跳过提问，直接生成最终 PPT / skip questions and build”。
- 只是改错字、换颜色、统一字体、追加一页等 targeted-edit。

不能仅因为原材料已经清楚包含 brief、目录、受众、页数、模板和数据口径就跳过；此时应快速提出 4-6 个确认问题，让用户确认默认假设。

## Question Bank

按任务选择最关键的问题。不要一次问超过 8 个。

## Interview Modes

### Quick Mode

适用于整体优化、短 PPT、材料较完整的任务。一次提出 4-8 个问题，用户回答后形成 brief。

Quick Mode 也必须等待用户回答后才能进入生成。

### Deep Mode

适用于完整 pipeline、高风险金融结论、从零生成复杂 deck。按下面五段一问一答：

1. **Audience & Decision**：谁看，做什么决定。
2. **Subject & Scope**：主体、场景、范围、时间口径。
3. **Framework & Data**：分析框架、数据来源、是否使用 MCP/手工文件。
4. **Narrative & Tone**：叙事原型、语气、红线。
5. **Constraints & Preferences**：页数、模板、参考稿、质量优先级。

Deep Mode 规则：

- 一次只问一个主问题，必要时追问。
- 不生成大纲、图表或 PPT。
- 每阶段结束时用一句话复述用户回答。
- 五段完成后输出 brief，并请用户确认。
- 对完整生成、整体重构、`partner-ready` 或 `client-ready` 项目，brief 确认后必须进入 `structure-first-confirmation-protocol.md`，先确认整体结构和分析框架，再展开逐页细节。

## Structure-First Mode

当用户提供材料并希望生成或整体优化 PPT 时，先做两层确认：

1. **Brief confirmation**：确认受众、决策、主体、数据边界、页数、视觉风格和语言。
2. **Framework confirmation**：基于材料内容提出核心问题、总答案假设、推荐框架、章节结构和页数预算，请用户确认。

在第二层确认前，不生成逐页正文、详细图表或 PPTX。输出形式参考 `references/structure-first-confirmation-protocol.md`。

### 1. Audience And Decision

- 这份 PPT 的主要受众是谁：董事会、管理层、投委会、投资人、监管/合规、银行/信托/券商客户，还是内部项目组？
- 读完后希望受众做什么决策：批准方案、识别风险、确认交易结构、投资决策、融资推进、估值认可、战略调整，还是仅用于沟通同步？
- 汇报场景是什么：正式会议、邮件分发、路演材料、项目立项、尽调汇报、风险审查、法律合规意见支持？

### 2. Subject And Financial Sector

- 被分析对象是什么：银行、信托计划、资管产品、ABS/类 ABS、租赁业务、地产/房源资产、消费金融、保险、券商、基金、平台业务，还是单一交易结构？
- 是单一主体分析、同业对标、交易结构方案、投融资方案、估值模型解释、风险合规审查，还是经营复盘？
- 是否有必须使用的分析框架：ROA/RAROC/EVA、PB/PE/PS 估值、现金流瀑布、资产池穿透、三流合一、风险矩阵、杜邦分析、压力测试等？

### 3. Materials And Data

- 可用材料有哪些：原 PPT、Word、PDF、Excel、财务模型、合同、法律意见、评级报告、系统导出数据、公开年报？
- 数据口径和时间范围是什么：月度、季度、年度；历史多少期；是否包含预测期？
- 哪些结论或数字不能改，只能重排表达？哪些部分允许我补充测算或重新组织？
- 是否允许联网/查公开资料？如果允许，优先使用哪些来源：年报、监管披露、交易所公告、评级报告、公司官网、Wind/iFinD 导出？

### 4. Benchmark And Scope

- 是否需要对标？对标对象由你指定，还是由我根据行业和业务选择？
- 对标维度是什么：规模、盈利、资产质量、资本、估值、现金流、违约风险、运营效率、客户/渠道、合规成熟度？
- 目标页数或阅读时长是多少：10-15 页决策版、20-30 页管理层版、40-50 页董事会深度版，还是 appendix-heavy 版本？
- 是否需要附录：数据口径、测算表、合同条款、风险清单、免责声明、团队介绍？

### 5. Narrative Preference

- 希望叙事更偏哪一种：先给结论、先展示问题、先讲方案、先讲风险，还是 SCQA（情境-复杂化-问题-答案）？
- 最重要的主线是什么：价值创造、风险可控、交易可行、估值合理、现金流稳定、监管合规、行动方案落地？
- 有没有必须出现的章节或页：执行摘要、交易结构图、三流合一、风险矩阵、行动地图、压力情景、财务推演？

### 6. Design And Format

- 版式风格偏好：默认使用保险财务报告风（`rsm-insurance-results`，对标《2025 年上市保险公司新准则财务结果分析》：白底、亮蓝粗标题、右上模块胶囊、浅灰结论条、白色图表卡），还是切换为实践分享风、McKinsey-like 克制白底、深色高密度、监管/法律稳重风、投行 pitchbook 风，或沿用原 PPT？
- 信息密度偏好：高密度可独立阅读、会议讲解型、路演简洁型、附录数据包型？
- 输出格式：只要 PPTX，还是同时要 PDF、预览图、contact sheet？
- 是否必须保留品牌元素、Logo、页眉页脚、字体、配色或母版？

## Recommended Opening Question Set

当用户没有提供足够信息时，优先问下面 6 个问题：

1. 这份 PPT 给谁看，读完后希望他们做什么决定？
2. 被分析对象和金融场景是什么（例如银行对标、信托/资管交易、资产池、估值、法律合规、经营复盘）？
3. 可用材料有哪些，哪些数字/结论必须严格保留？
4. 是否需要同业或交易对标？如果需要，对标对象你指定还是我建议？
5. 目标页数、阅读时长和信息密度偏好是什么？
6. 版式风格默认按保险财务报告风走；是否需要沿用原稿、切换实践分享风、McKinsey-like，还是其他模板？

## Mandatory First Response Template

当用户要求新建、整体优化或升级 PPT 时，第一轮回复必须类似下面结构，不能直接生成：

```text
我先确认几个关键点，避免直接生成后方向不对。基于你提供的材料，我的初步假设是：[1-2 句假设]。

请你先确认：
1. 这份 PPT 的主要受众是谁？读完后希望他们做什么决定？
2. 这次更偏“重构故事线”还是“保留原结构、重点提升表达和视觉”？
3. 哪些结论、数字或口径必须严格保留？
4. 目标页数/阅读时长/信息密度大概是什么？
5. 默认视觉是否按 `rsm-insurance-results`，还是沿用原稿或切换其他风格？
6. 有没有不希望我触碰或不能写得太直接的内容？

你确认后，我会先输出整体结构和框架方案；框架确认后再展开逐页内容。
```

## Brief Output

用户回答后，形成 `brief.json` 或等价文字 brief。字段尽量使用通用金融口径：

```json
{
  "audience": "董事会/管理层/投委会/投资人/监管合规/外部客户",
  "decision_ask": "批准方案/确认风险/投资决策/战略调整/沟通同步",
  "subject": {
    "name": "项目或主体名称",
    "sector": "banking/trust/asset-management/abs/real-estate/consumer-finance/insurance/securities/fund/other",
    "task_type": "benchmark/transaction-structure/valuation/risk-compliance/operating-review/financing-plan"
  },
  "materials": ["pptx", "xlsx", "docx", "pdf"],
  "data_period": "YYYY-YYYY 或用户材料口径",
  "benchmark_policy": "user-specified/agent-proposed/not-needed",
  "framework": ["SCQA", "risk matrix", "cash-flow waterfall"],
  "target_pages": 20,
  "density": "high/medium/low",
  "style": "RSM blue-gray/McKinsey-like/original-template/pitchbook/regulatory",
  "language": "zh-CN",
  "language_policy": "Chinese primary unless user explicitly requests English or bilingual output",
  "framework_confirmation_status": "pending/confirmed/confirmed_with_changes/assumed_user_requested_direct",
  "must_keep": ["不能改动的数字、法律结论、合同表述"],
  "deliverables": ["pptx", "pdf", "preview"]
}
```

## Question Style

- 用中文提问，语气简洁。
- 先说明“我需要先确认几个点，避免做出方向不对的 PPT”。
- 能推断的内容直接写假设，不要让用户重复输入。
- 如果用户只回答部分问题，基于已回答内容继续，但在 brief 中标记假设。
