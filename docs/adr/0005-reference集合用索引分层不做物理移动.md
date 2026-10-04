# ADR-0005：reference 集合用索引分层，不做物理移动

- **状态**：已采纳
- **日期**：2026-10-03

## 背景

`references/` 下 96 个 `.md` 文件（764KB）全部平铺，无子目录、无索引。`SKILL.md` 的 Key References 段用 9 个大类字符串硬撑，且**只覆盖 76 个文件**，其余 20 个仅散落在 Core Workflow 正文里。

侦察实测：

| 指标 | 值 |
|---|---|
| reference 文件数 | 96（原估 95） |
| `SKILL.md` 引用的 reference | 95 |
| **孤儿文件** | **1**：`section-image-prompt-library.md`（未被 `SKILL.md` 引用，但被其他 reference 引用 2 次） |
| 全库交叉引用 | 167 处（裸文件名 15 + 带 `references/` 路径 152） |
| 被引用最多 | `visual-qa-protocol`(5)、`visual-rendering-engine`(4)、`chart-decision-tree`(4)、`review-loop`(4)、`professional-chart-rulebook`(4)、`visual-profile-registry`(4) |
| 按前缀可成组的 | 只有 `visual-*`(8)；其余是 2-4 个的小簇 |
| 命名后缀种类 | 20 种（`standard` 20、`protocol` 12、`library` 4…） |

两个候选方案：

- **A（物理分层）**：按类别建子目录，移动文件。会改变全部 `SKILL.md` 链接与 167 处交叉引用。
- **B+（索引分层）**：建 `INDEX.md` 分组 + `SKILL.md` 改指针 + 接孤儿，**文件位置不动**。

## 决策

采纳 **B+**。用户于 2026-10-03 明确选择 B+，并追加两项约束：**不合并同族文件**、**孤儿文件加进 `SKILL.md` 引用**。

具体：

1. **新增 `references/INDEX.md`**，按**工作流阶段**分 9 组（不是按 GLOSSARY 的术语六类，理由见下），顶部另有「跨阶段必读」3 个。每个文件带「职责」与「何时读」两列。
2. **`SKILL.md` 的 Key References 段改为指向 INDEX**，只保留 3 个跨阶段必读 + 8 行「阶段 → 高频入口」表。
3. **孤儿 `section-image-prompt-library.md` 接进 §5 章节页路由**，与 `section-divider-image-protocol` 并列。
4. **不动文件位置，不合并同族文件，不改任何文件名。**

## 分组轴为什么不用 GLOSSARY 的六类

`docs/GLOSSARY.md` 的六类（流程与档位 / 页面与版式 / 视觉与设计 / 数据与证据 / 叙事与内容 / 语言与三层结构）是**术语分类**，面向"怎么用词"。它**不覆盖构建与审校两个阶段**——把 96 个文件硬塞进六类，「流程与档位」一组会超过 30 个文件，等于没分层。

故 INDEX 改用**工作流阶段**分组（面向"何时读"），并在 INDEX 内附「本表分组 ↔ GLOSSARY 节」映射表。两者互补：GLOSSARY 管用词，INDEX 管加载。

## 被否决的方案

- **A 物理分层**：否决理由：收益主要是"看起来整齐"，成本是改 167 处交叉引用 + 全部 `SKILL.md` 链接。且分层后仍需要索引，否则"哪个子目录"只是把一次查找变成两次。
- **合并同族文件**（`visual-*` 8 个、`language-*` 4 个、`template-*` 3 个）：用户明确否决。理由：合并会改文件名与全部交叉引用，风险大于收益；改为在 INDEX 中显式写清每份文件的职责与触发边界。
- **把 `SKILL.md` 的 Key References 整段删掉，只留 INDEX 指针**：否决理由：跨阶段必读的 3 个文件（`agent-behavioral-guardrail` / `progressive-loading-protocol` / `failure-modes`）是 fail-closed 的锚，必须在 `SKILL.md` 里直接可见，不能让 agent 多跳一层。

## 后果

### 需要接受

- **净增体积**：`SKILL.md` 48,468 → 45,992 字节（-2,476，-5.1%），但新增 `INDEX.md` 24,284 字节。**总字节数上升**。换来的是加载路由可定位，不是体积优化。
- **INDEX 与文件集合会漂移**：新增或删除 reference 时必须同步 INDEX。已在 INDEX 文末写明维护规则与校验步骤。
- **INDEX 多一跳**：agent 读 INDEX 才能定位文件。验证显示这一跳被普遍接受（6 个 judge 中 5 个认为 D2 后版本的导航入口**更**可复现，因为前版本要从三处自行拼装且拼不全）。

### 得到的

- 96 个文件有了单一可复现入口，且每个文件带「职责」与「何时读」。
- 孤儿清零，死链清零。
- `SKILL.md` 从 6,900 字节的平铺清单缩到 3,500 字节的入口表。

### 验证结果

三重校验全部通过（链接可达 / 孤儿死链清零 / 真实请求验证）。第三重用 2 个请求（client-ready 建 deck、quick-polish 改两页）× 2 个 spec × 3 个独立盲评 judge，**5-1 支持 D2 后版本**。

### 未解决的

- **D7**：`Decision Router` 的 `Minimum references` 与 `Core Workflow` 的「必须读」不一致，导致 quick-polish 场景下有执行者把 `strategy-brief` 推理掉。与 D5 同源（规则权重关系不明）。
- **D8**：命名后缀无稳定语义，实测已导致 agent 虚构条号（引用不存在的 `Rule 2.5`）。

## 相关

- `references/INDEX.md` — 本决策的产物
- `SKILL.md` Key References 段、§5 章节页路由
- `docs/DEBT.md` D2 / D7 / D8
- `docs/GLOSSARY.md` — 术语轴，与 INDEX 的阶段轴互补
- ADR-0001 — 正文页 HTML 三层结构
- ADR-0004 — 失败模式编码（D6）
