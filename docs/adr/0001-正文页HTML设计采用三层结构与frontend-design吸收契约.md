# ADR-0001：正文页 HTML 设计采用三层结构，frontend design 方法以吸收契约引入

- **状态**：已采纳
- **日期**：2026-10-03

## 背景

用户要求"视觉部分加入 frontend design 的设计内容，先用 HTML 格式做页面设计，需要考虑整体页面结构、图形呈现结构、文字呈现结构"。

现状核查：

| 检查项 | 结果 |
|---|---|
| 本 skill 是否已引用 frontend design / impeccable | **否**，全库 grep 0 命中 |
| 本 skill 是否已有"HTML 阶段页面设计"的专门标准 | **否**。已有 `exhibit-composition-standard`（exhibit 构成）、`visual-system`（字号/色板）、`html-preview-protocol`（预览流程），但没有把页面设计拆成可分别定稿、分别验收的结构层 |
| frontend design 方法的可得来源 | `impeccable` skill，其 frontmatter 自述 "Based on Anthropic's frontend-design skill" |

关键约束：**`impeccable` 是为 web app 写的，其中一条明确反模式是 "DON'T 万物皆卡片 / 卡片套卡片"，而本 skill 默认 profile `rsm-insurance-results` 的核心视觉资产恰恰是卡片（白色阴影图表卡）。** 整段引入会与本 skill 的品牌视觉直接冲突。

另一个约束：PPTX 的版式能力弱于 HTML，若在 PPTX 阶段试错，返工成本远高于在 HTML 阶段定稿。

## 决策

1. **新增 `references/html-page-design-standard.md`**，承载三层结构细则；`SKILL.md` 只加路由与硬约束，不内联细则（沿用既有"SKILL.md 路由 + references 细则"架构）。
2. **三层结构命名为** 整体页面结构 `page_structure` → 图形呈现结构 `graphic_structure` → 文字呈现结构 `text_structure`，按此顺序定稿，前一层未定稿不进入下一层，三层各带独立 QA。
3. **HTML 阶段定稿，PPTX 只做还原**。三层结构与真实字号、真实间距、真实文字量都在 HTML 阶段确认；PPTX 阶段不调结构、不调密度、不重新分配视觉重量。
4. **frontend design 以"吸收契约"引入**，三类分流：

   | 类别 | 内容 |
   |---|---|
   | 吸收 | 设计上下文三问（与 `CN0_interview` 合并，不重复提问）、模块化字阶、空间节奏、对比度体系、视觉层级与视觉重量、critique/polish/audit 评审框架 |
   | 丢弃 | 响应式断点与容器查询、动效与微交互、ARIA/键盘可达性、性能与包体积、暗色模式切换、状态机与错误态 |
   | 让路 | "反卡片"主张不适用（卡片是本 skill 品牌资产）；"每次设计都应不同"不适用（全册一致性优先）；现代色彩空间只作实现手段，输出色值必须落在 profile token 内 |

5. **冲突裁决顺序明确化**：本轮用户明确要求 > 已确认样章 > 项目记忆中的用户决定 > 当前 profile design token > frontend design 通用建议。

## 被否决的方案

- **把三层结构内联写进 `SKILL.md`**：否决理由：细则量约 8KB，会把 SKILL.md 从 45.7KB 推到 54KB+，进一步稀释其路由作用；且与既有"路由 + 细则"架构不一致。
- **整体引入 `impeccable` 作为视觉标准来源**：否决理由：其反卡片原则、响应式要求、动效要求与固定画布静态 PPT 直接冲突；整段引入会产生自相矛盾的规则集。
- **合并 `impeccable` 进本 skill 的 references**：否决理由：`impeccable` 是独立维护的通用设计 skill，其内容面向 web 而非 PPT；复制会产生双份维护和版本漂移。改为**引用 + 吸收契约**，让上游可独立演进。
- **在 PPTX 阶段做版式设计**：否决理由：返工成本高；且 PPTX 无法表达层 2/层 3 的精细判据（数据-墨比、行宽、模块化级差）。

## 后果

### 需要接受

- **多一层间接**：使用 frontend design 方法时要先读 `html-page-design-standard.md` 的吸收契约，不能直接照搬 `impeccable`。这是为隔离冲突付出的代价。
- **`impeccable` 上游变更不会自动同步**：契约是按当前版本（v2.0.0）写的；若上游大改，需人工复核契约是否仍成立。
- **"三层"是新增概念层**，与既有 `exhibit-composition-standard` 的 exhibit 构成存在部分重叠。已通过分工处理：exhibit 标准管"一页要有什么"，本文件管"这些东西怎么排"。

### 得到的

- 页面设计从"整体感觉"变成可分别定稿、分别验收的三层，QA 可定位到具体层。
- frontend design 的方法增益可用，而其 web 专属包袱与品牌冲突被显式隔离。
- HTML/PPTX 的职责边界明确，减少 PPTX 阶段的返工。

## 相关

- `references/html-page-design-standard.md` — 三层结构细则、吸收契约、三层 QA。
- `references/visual-system.md` — 字阶上下限的唯一来源。
- `references/exhibit-composition-standard.md` — exhibit 构成（与本文件分工：要什么 vs 怎么排）。
- `docs/DEBT.md` — 本轮未处理的结构债务。
