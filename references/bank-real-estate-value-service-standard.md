# Bank Real Estate Value Service Standard

用于商业银行不动产价值管理、押品重估、按揭全生命周期分析及外部专业服务方案。该场景沿用 RSM 咨询报告纪律，但使用经客户样稿确认的高密度蓝白灰视觉覆盖层。

## Scene Contract

- `scene_id`: `bank-real-estate-value-service`
- `base_profile`: `rsm-light`
- `narrative_archetype`: 运营模式 → 生产机制 → 业务案例 → 治理边界 → 试点决策
- `audience`: 零售信贷、风险管理、押品管理、内审、数据安全与采购负责人
- `decision_objective`: 先判断是否启动固定范围专项试点，再根据验证结果决定持续联合运营

## Core Design Principles

### 1. Controlled Variety

固定品牌、字体、栅格、页眉页脚和标题层级；通过有限页面家族改变构图。每个页面家族最多保留两个组合变体，禁止每页重新发明版式。

### 2. Dual-Layer Reading

- 核心标题和结论优先满足投屏阅读。
- 核心正文不小于 `12pt`。
- 次级解释控制在 `10–10.5pt`。
- 来源、口径和脚注控制在 `8.5–9pt`。
- 该字号覆盖只在用户已确认高密度样稿时启用；其他 RSM 客户稿仍遵循通用 `18pt` 正文下限。
- 标题过长时拆为主标题和副标题，禁止通过缩小标题字号解决。

### 3. MECE Title Chain

- 每页只回答一个问题或给出一个答案。
- 主标题直接陈述判断，建议不超过 26 个中文字符。
- 相邻标题必须承接，章节内互斥且完整。
- 主图证明标题；页底结论说明管理含义，不能重复标题。

### 4. Content Change Control

- 删除、合并、实质性改写或转附录前必须取得用户确认。
- 超载页依次尝试：章节内重排 → 建议转附录 → 讨论删减。
- 不通过缩小字号、压缩行距或移除来源解决超载。

## Visual Tokens

- Background: `#FFFFFF`
- Primary navy: `#00153D`
- Secondary navy: `#0F2747`
- RSM blue: `#009CDE`
- Analytical blue: `#1E73A8`
- Pale blue: `#EAF5FB`
- Pale gray-blue: `#F3F7FA`
- Body text: `#1F2937`
- Secondary text: `#475569` / `#64748B`
- Divider: `#D9E2EA`
- 禁止金色、棕色、渐变、厚重阴影、大量圆角卡片、装饰性图标和无意义插画。
- 深色页只用于封面、章节转折以及治理／风险／决策收束页。

## Seven Page Families

| ID | Family | Primary use | Canonical mapping |
|---|---|---|---|
| `F1` | 封面／章节过渡 | 建立主题、角色和章节节奏 | `chapter_divider` |
| `F2` | 管理层结论／核心主张 | 执行摘要、模式选择、会议决策 | `governing_thought` / `decision_required` |
| `F3` | 运营架构／角色分工 | 分层责任、底座、专业引擎 | `team_or_governance` / `methodology_map` |
| `F4` | 双栏比较／模式选择 | 采购模式、监管映射、体系对照 | `comparison_table` |
| `F5` | 流程／实施路径 | 生命周期、作业步骤、试点路径 | `funnel_or_process` / `action_roadmap` |
| `F6` | 案例／数据证据 | 区间、候选池、信号与案例 | `evidence_exhibit` / `case_or_proof_stack` |
| `F7` | 治理边界／风险与决策 | 数据边界、签发边界、认定权 | `team_or_governance` / `risk_register` |

## Density Tiers

- `executive`: 一个结论，最多三个支撑点。
- `standard`: 一个主视觉，三至五条必要解释。
- `evidence_dense`: 表格、样本或治理证据；仍须保留一个清晰的核心读法。

每页只有一个主证明对象。高密度不等于信息平均铺开：主证据应占主体区域，辅助证据不得与主证据争夺视觉焦点。

## Recommended Storyline

1. 先解释谁服务、谁运营底座、谁保留最终决定。
2. 再区分专项任务与联合运营的采购和责任结构。
3. 展开从需求、事实、规则、复核到认定的生产机制。
4. 用按揭贷前逐笔和贷后批量案例验证机制。
5. 明确数据方向、签发主体、敏感数据边界和现有估值体系关系。
6. 以试点范围、验收问题、尽调衔接和决策门收束。

## Required QA

- 标题连读形成完整答案链。
- 全稿只使用蓝、白、灰；无金色或棕色残留。
- 正文最小字号符合已确认的密度模式。
- 每页主图可证明标题，页底结论增加管理含义。
- 不连续使用超过四页同一页面家族。
- 所有来源、口径、能力成熟度和责任边界可读。
- PPTX 保持文字、表格、流程和关键数字可编辑。
- 原生渲染后检查中文字体、溢出、重叠、页码和 contact sheet 节奏。

## Usage Boundary

本标准是场景覆盖层，不替代 RSM 通用事实血缘、确认门、可编辑性和客户交付 QA。政策、资格、授权关系、供应商责任、试点阈值和估值结论仍需以当前文件、合同和试点证据核验。
