# HTML Page Design Standard

用于正文页在 **HTML 阶段**的页面设计。本文件回答三个问题：HTML 阶段要定什么、frontend design 方法怎么吸收、三层结构各自的判据是什么。

本文件不重复既有规则。字阶表见 [visual-system](visual-system.md)，exhibit 构成见 [exhibit-composition-standard](exhibit-composition-standard.md)，图表画法见 [professional-chart-rulebook](professional-chart-rulebook.md)，像素级 QA 见 [visual-qa-protocol](visual-qa-protocol.md)。

## 为什么 HTML 先定稿

PPTX 的版式能力弱于 HTML：一旦在 PPTX 里试错，返工要重排形状、重设字号、重对锚点。因此**三层结构必须在 HTML 阶段定稿并取得用户确认，PPTX 只做还原，不做设计决策**。

| 阶段 | 职责 | 不做什么 |
|---|---|---|
| HTML | 定稿三层结构、真实字号、真实间距、真实文字量 | — |
| 用户确认 | 确认版式、密度、字号观感 | — |
| PPTX | 还原已定稿结构；关键文字/数字/表格保持可编辑 | 不在这一阶段调结构、调密度、重新分配视觉重量 |

## Frontend Design 吸收契约

以 `impeccable`（Anthropic frontend-design 衍生）为 frontend design 方法来源。**它是 web app 设计工具集，只有一部分适用于固定画布的静态 PPT。** 按三类处理：

### 吸收（对 PPT 有直接增益）

| 条目 | 用在哪一层 | 落地方式 |
|---|---|---|
| 设计上下文三问（受众／场景／品牌调性） | 全局 | 与 `CN0_interview` 合并，不重复提问；结论写入 `design_system.json` |
| 模块化字阶（非等距缩放的比例体系） | 文字结构 | 用比例而非等差生成字阶，再对齐 [visual-system](visual-system.md) 的 minimum |
| 空间节奏（间距要有变化，不是均一 gap） | 页面结构 | 分区间距、卡间距、行间距分三级，避免全页同一 gap |
| 对比度体系（正文对背景 ≥ 4.5:1） | 文字结构 | 只借对比度算法，**色相仍锁 RSM**，不引入外部配色 |
| 视觉层级与视觉重量分配 | 页面结构 | 判断页面视觉重心，主证据占最大视觉重量 |
| critique / polish / audit 评审框架 | QA | 与 [visual-qa-protocol](visual-qa-protocol.md) 合并，不另建一套评审 |

### 丢弃（web 专属，PPT 无意义）

响应式断点与容器查询 · 动效、微交互、过渡曲线 · ARIA／键盘可达性／焦点环 · 性能、包体积、懒加载 · 暗色模式切换 · 状态机与错误态。

**固定画布（默认 16:9 / 1920×1080）是前提，不做适配分支。**

### 让路（冲突时以 RSM 为准）

| frontend design 主张 | 本 skill 的裁决 |
|---|---|
| "DON'T 万物皆卡片 / 卡片套卡片" | **不适用。** 卡片是 RSM `rsm-insurance-results` 的品牌视觉资产（白色阴影图表卡），保留。但"卡片内部要有清晰层级、不出现第三层嵌套"仍然适用 |
| 每次设计都应不同（变化明暗主题、字体、美学） | **不适用。** 全册视觉一致性优先；只有章节色温可按 [visual-rhythm-orchestrator](visual-rhythm-orchestrator.md) 变化 |
| 用 oklch/color-mix 等现代色彩空间 | 可用作实现手段，但**输出色值必须落在当前 profile 的 design token 内** |
| 大胆的美学方向 | 收敛为"专业咨询机构成稿观感"，见 [visual-presentation-upgrade](visual-presentation-upgrade.md) |

**冲突裁决顺序**：本轮用户明确要求 > 已确认样章 > 项目记忆中的用户决定 > 当前 profile design token > frontend design 通用建议。

## 三层结构

三层在 HTML 阶段按 **页面结构 → 图形结构 → 文字结构** 的顺序定稿。前一层未定稿不进入下一层。

### 层 1 · 整体页面结构 `page_structure`

定义页面的骨架分区与视觉重量分布。

| 要素 | 判据 |
|---|---|
| 画布与安全边距 | 固定画布；四边安全边距一致，内容不得贴边 |
| 页眉区 | 结论标题 + 右上模块胶囊 + 左上 RSM 三色短条；高度不随内容浮动 |
| 主体区 | 信息分区数量与比例（如 主证据 62% / 辅助读法 38%） |
| 页脚区 | 来源条 + 页码；与主体区保持可辨识的间距 |
| 网格 | 统一列网格 + 基线网格；跨区对齐到同一基线 |
| 视觉重量 | 主证据区 > 标题区 > 辅助读法区 > 页脚区 |

### 层 2 · 图形呈现结构 `graphic_structure`

定义主证据对象**内部**的构图。层 1 决定它占多大，层 2 决定它里面怎么排。

| 要素 | 判据 |
|---|---|
| 绘图区与坐标区 | 绘图区占比合理；坐标轴不挤占数据空间 |
| 数据-墨比 | 去掉不承载信息的网格线、边框、底色 |
| 标注层 | 最多 2 个强标注；标注服务判断，不重复标题 |
| 图例与单位 | 单位必须出现且与正文口径一致；图例不抢主视觉 |
| 辅助读法 | 1-3 个 readout，引用主证据，不放无关 KPI |
| 基准与焦点 | 有 benchmark 或 focus 标记，说明"和谁比、看哪个" |

图表类型选择与画法分别见 [chart-decision-tree](chart-decision-tree.md)、[professional-chart-rulebook](professional-chart-rulebook.md)。

### 层 3 · 文字呈现结构 `text_structure`

定义**字号、行宽、行距、层级**。字号上下限以 [visual-system](visual-system.md) 的 Typography Sizing Rules 为唯一来源。

| 要素 | 判据 |
|---|---|
| 字阶 | 标题／副标题／结论条／正文／来源五级；级差用模块化比例，非等差 |
| 行宽 | 中文正文每行 20-30 字；超过则收窄栏宽或拆栏 |
| 行距 | 正文 1.4-1.6；标题 1.15-1.3 |
| 层级 | 靠字号 + 字重 + 颜色三者组合，不只靠字号 |
| 对比度 | 正文对背景 ≥ 4.5:1；在页面尺寸与缩略图尺寸各查一次 |
| 字体 | 遵循当前项目已确认的字体锁（含数字与单位），不得回退 |

**文字量先于字号**：装不下时按 [visual-system](visual-system.md) 的处理顺序——删减文字 → 分栏/换版式 → 拆页 → 最后才小幅缩字号，且不得低于 minimum。不得为了保留内容而突破 minimum。

**文字语域**：页面上的标题、副标题、结论条、建议语按 writing-style 的**咨询语域**写，判据见 [consulting-language-playbook](consulting-language-playbook.md) 与 [number-expression-standard](number-expression-standard.md)。

## 执行顺序与检查点

```text
1 定 page_structure      → 分区、比例、视觉重量        → 过层 1 QA
2 定 graphic_structure   → 主证据内部构图、标注        → 过层 2 QA
3 定 text_structure      → 字阶、行宽、行距、真实文字量 → 过层 3 QA
4 程序化排版审计         → 溢出/越界/同行卡片高度
5 出 HTML 样章           → 交用户确认
6 PPTX 还原              → 只还原，不重新设计
7 最终组合件 QA          → 见 visual-qa-protocol
```

第 4 步用无头浏览器测 `getBoundingClientRect()` 与 `scrollHeight/clientHeight`，不靠肉眼看截图。方法见 `slide-html-qa` skill。

## 三层 QA

### 层 1 检查

- 内容占用面积是否在 70%-82%。
- 安全边距是否四边一致且未被突破。
- 页眉/主体/页脚是否各司其职、不跨区。
- 主证据区视觉重量是否最大。

### 层 2 检查

- 主证据是否只证明一个判断。
- 强标注是否 ≤ 2 个，且服务判断。
- 单位、样本、期间、来源是否齐全。
- 是否有 benchmark 或 focus。
- 缩略图尺寸下是否仍能读出主证据。

### 层 3 检查

- 每个字号是否 ≥ 对应 minimum。
- 正文行宽是否在 20-30 字。
- 对比度是否在页面尺寸与缩略图尺寸都达标。
- 层级是否靠三者组合而非只靠字号。
- 字体锁是否被遵守（含数字与单位）。

**三层任一未过，不得进入 HTML 样章交付；样章未确认，不得进入 PPTX 批量构建。**
