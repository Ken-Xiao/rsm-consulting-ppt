# 已知结构债务

本文件登记结构性问题。Darwin 优化每轮只改一个维度，混改会让 paired 比较失去归因能力，故这些项单独排队。

登记日期：2026-10-03。最近更新：2026-10-04（D10 已处理：新增 Layer 1b 下限件排期表，6-0 keep）。

## 状态总览

| # | 项 | 状态 | 处理日期 |
|---|---|---|---|
| D1 | 强制访谈规则在 `SKILL.md` 重复 | **已处理** | 2026-10-03 |
| D2 | 96 个 reference 平铺，无分层 | **已处理** | 2026-10-03 |
| D3 | 静态 triage 短板未细化定位 | **已处理**（诊断 + 三项弱项修复） | 2026-10-03 |
| D4 | `html-page-design-standard` 与 exhibit 标准分工 | 观察中 | — |
| D5 | 新增绑定条款稀释既有硬要求 | **已处理**（第二实例已修） | 2026-10-03 |
| D6 | 失败模式未编码 | **已处理** | 2026-10-03 |
| D7 | Decision Router 的 Minimum references 与 Core Workflow 的强制读项不一致 | **已处理** | 2026-10-03 |
| D8 | 命名后缀无稳定语义 + 条号是文件局部命名空间、无全局引用规范 | **已处理**（实证更正后按引用规范 + 后缀裁决处理） | 2026-10-03 |
| D9 | `v2-capability-router` 的「小任务默认不加载」边界不明 | **已处理**（前提更正后按澄清措辞处理） | 2026-10-03 |
| D10 | Layer 1 stage 表未覆盖 5 个下限件的排期位（A 轮叠加条款无法兑现） | **已处理**（范围更正为 19 件，新增 Layer 1b 全量补齐；6-0 keep） | 2026-10-04 |

---

## D1 · 强制访谈规则在 `SKILL.md` 重复 —— 已处理

**现象**：同一条规则（"任何 PPT 任务第一条回复必须停在访谈"）出现在 22 处：`description` frontmatter、First Response Contract、Decision Router 表后说明、Core Workflow §1/§2、Non-Negotiables 的 Always / Express / Quick-Polish / Client-Ready、以及 3 个 Invocation Examples。

**为什么是问题**：违反单一事实来源。改一处要同步改多处，漏改会产生规则不一致；且 SKILL.md 体积被这类重复占据，挤压路由空间。对应 darwin rubric 维度 7「整体架构」（权重 12，一处冗余扣 1 分）。

**实际处理（2026-10-03）**：按「保留 First Response Contract 为唯一规则正文 + Non-Negotiables 各 tier 保留差异部分，其余改指针」的方案改 6 处：

| 位置 | 处理 |
|---|---|
| Decision Router 后说明 | 删去与 First Response Contract 重复的两点，保留独特的"非确认信号清单"，并补入"之前已经聊过类似项目" |
| Core Workflow §2 末条 | 删除（与非确认信号清单重复） |
| Non-Negotiables / Always | 改为指向 First Response Contract，保留"4-8 个确认问题"的具体数字 |
| Non-Negotiables / Express | 删去"必须先完成最小访谈"，保留 tier 差异部分 |
| Non-Negotiables / Quick-Polish | 删除整条（与 Always 重复） |
| Non-Negotiables / Client-Ready | 删去"也必须先完成最小访谈"，保留 `direct_build_after_minimal_interview` 标记要求 |

**结果**：压缩 654 字节（47,898 → 47,244），减少 5 行。访谈规则出现次数 22 → 19，**剩余 19 处均为「引用」而非「规则正文重复」**（规则正文、stage 名、非确认信号清单、确认状态机、示例流程）。

**与原预估的差异**：原估"可压缩 2-3KB"，实际 654 字节。原因是逐处核对后发现多数出现位置携带**独特信息**（stage 序列、确认状态机机制、示例流程步骤、tier 差异），不能简单删除。真正冗余的只有 6 处。**这是好事**：说明原判断（"重复 6 处以上"）高估了冗余量。

**2026-10-03 实证（保留）**：Darwin 验证首轮，4 个执行者中有 3 个在任务已写明"已确认的前提，不需要再访谈，直接做"的情况下仍拒绝产出、改为提问。规则按设计 fail-closed 生效，但在**前提已完全给定**的场景下会浪费一轮交互。本轮去重后需观察该行为是否缓解。

---

## D2 · 96 个 reference 平铺，无分层 —— 已处理

**现象**：`references/` 下 96 个 `.md` 文件、764KB，全部平铺，无子目录、无索引分组。`SKILL.md` 的 Key References 用 9 个大类字符串硬撑，且**只覆盖 76 个文件，其余 20 个仅散落在正文中**。

**实测数据（2026-10-03 侦察）**：文件数 96（非原估 95）；`SKILL.md` 引用 95 个；**孤儿 1 个** —— `section-image-prompt-library.md`（未被 `SKILL.md` 引用，但被其他 reference 引用 2 次）；全库交叉引用 167 处（裸文件名 15 处 + 带 `references/` 路径 152 处）；被引用最多的是 `visual-qa-protocol.md`(5)、`visual-rendering-engine.md`(4)、`chart-decision-tree.md`(4)、`review-loop.md`(4)、`professional-chart-rulebook.md`(4)、`visual-profile-registry.md`(4)。按前缀只有 `visual-*`(8) 能成组，其余是 2-4 个的小簇。

**为什么是问题**：
- 按需加载时定位成本高，模型容易漏读或读错。
- 文件命名后缀 20 种（`standard` 20 个、`protocol` 12 个、`library` 4 个…），职责边界靠记忆。
- 存在明显可合并项（`visual-*` 8 个、`language-*` 4 个、`template-*` 3 个）。

**影响范围**：整个 `references/`。

**决策（用户 2026-10-03 确认 B+ 方案）**：**建索引 + 改指针 + 接孤儿，不做物理移动、不合并同族文件。** 理由：物理移动会改变全部 `SKILL.md` 链接与 167 处交叉引用，风险高而收益（主要是"看起来整齐"）低；索引能拿到分层的全部实际收益。

**实际处理（2026-10-03）**：
- 新增 `references/INDEX.md`（24,284 字节，239 行）：96 个 reference 按**任务阶段分 9 组**（路由·档位·场景 / 访谈·确认·属性锁定 / 事实·数据·证据 / 叙事·论证·行动 / 版式·页面家族·模板 / 视觉·图表·图片·三层结构 / 语言·数字·语域 / 构建·产物·交付·可编辑性 / 审校·评分·回归·返修）+ 顶部「跨阶段必读」3 个（`agent-behavioral-guardrail` / `progressive-loading-protocol` / `failure-modes`）。每个文件带「职责」和「何时读」两列，另附 `assets/` 与 `scripts/` 资源清单、与 GLOSSARY 六类的映射表、维护与校验说明。
- `SKILL.md` 的 Key References 段（6,900 → 3,500 字节）改为**指向 INDEX**，只保留 3 个跨阶段必读 + 8 行「阶段 → 高频入口」表。
- 孤儿 `section-image-prompt-library.md` 接进 §5 章节页路由，与 `section-divider-image-protocol` 并列。

**与 GLOSSARY 六类的偏离（有意）**：`docs/GLOSSARY.md` 的六类是**术语分类**（面向"怎么用词"），不覆盖构建与审校两个阶段。把 96 个文件硬塞进六类会让「流程与档位」一组超过 30 个文件，失去分层意义。故 INDEX 改用**工作流阶段**分组，并在 INDEX 内附「本表分组 ↔ GLOSSARY 节」映射表，两者互补而非重复。

**结果**：`SKILL.md` 48,468 → **45,992 字节**（-2,476，-5.1%）；新增 `INDEX.md` 24,284 字节。净增体积，但换来的是加载路由可定位。

**三重校验（用户 2026-10-03 指定的验收口径）**：
1. **链接可达**：`SKILL.md` 95 个唯一引用 0 死链；`INDEX.md` 96 个唯一链接 0 死链；`INDEX.md` 的 10 处 `../` 链接 0 死链。
2. **孤儿/死链清零**：孤儿 0；未进 INDEX 的 reference 0；全库 97 个 `.md` 的交叉引用死链 0；INDEX 内重复列出 0。
3. **真实请求验证**：2 个请求（client-ready 建 deck / quick-polish 改两页）× 2 个 spec × 3 个独立盲评 judge = 6 组配对比较 → **5-1 支持 D2 后版本**（client-ready 3-0：clear/clear/slight；quick-polish 2-1：slight×3）。

**judge 反馈的净收益（为什么 keep）**：D2 后版本的执行者把 `INDEX.md` 当作**单一可复现入口**（前版本需从 Decision Router、Core Workflow、Key References 三处自行拼装，且拼出的清单不全）；D2 后版本的阶段归属与 `tier-stage-matrix` 一致，前版本把 `milestone-preview-protocol` 误放 S0/S1、把 `build-runner-protocol`/`artifact-*` 塞进事实底座。judge 明确点出前版本的平铺清单「96 个只列约 60」。

**残余问题（已登记为 D7/D8）**：见下。

**风险复盘**：原判"破坏性重构，必须单独一轮做"未成立——因为选择了不动文件位置的 B+ 方案，实际是**纯增量**改动，回归面小。**这条经验值得记下：重构 reference 集合时，"建索引"与"移动文件"可以解耦，索引拿走大部分收益。**

---

## D7 · Decision Router 的 Minimum references 与 Core Workflow 的强制读项不一致 —— 已处理

**现象（2026-10-03 D2 验证中发现）**：`Decision Router` 表的 `Minimum references` 列与 `Core Workflow` 的「必须读」声明不一致。以 `targeted-edit` 为例：

| 来源 | 文件 |
|---|---|
| Decision Router 的 Minimum references | `agent-behavioral-guardrail` / `task-tier-protocol` / `agent-runtime` / `language-discipline` / `visual-qa-protocol`（5 个） |
| Core Workflow §2「对任何 PPT 任务，第一步必须读」 | 另有 `strategy-brief` / `guided-interaction-pattern` / `decision-to-deck-attribute-map` / `confirmation-state-machine` / `incremental-edit-protocol` 等 |

**实证**：D2 的 quick-polish 配对测试中，3 个 judge 里有 2 个指出 D2 后版本的执行者**主动推理掉了 `strategy-brief`**（理由："Decision Router 的 targeted-edit 最小集不含它"）；而前版本的两个执行者都读了它。

**为什么是问题**：`Minimum references` 字面读作"最小必需集"，与 Core Workflow 的"必须读"冲突时，agent 会选择更小的那个，从而跳过 `strategy-brief` 这类强制件。这是**规则权重关系不明**，与 D5 同源。

**处理（2026-10-03 第五轮，采用方向 ①）**：改动 2 处，均只动 `SKILL.md`：

1. 列名 `Minimum references` → **`阶段必需（下限）`**（表头，1 行）。
2. 表下新增加注（2 行）：
   > **「阶段必需（下限）」列是该档位在当前阶段至少要读的文件，不是 Core Workflow 必须读清单的全集。** Core Workflow 中写明「必须读」「第一步必须读」的文件在任何档位都要读——本轮加载集取两者的**并集**；本列未列出不等于可以不读，也不得据本列推断某文件「本任务不需要」。完整文件清单见 [references/INDEX.md](../references/INDEX.md)。

`SKILL.md` 51,410 → 51,862 字节（+452）。

**验证（两 prompt × 2 版本 × 3 盲评 judge = 6 判，X/Y 位置随机交换）**：

| Prompt | 任务 | 结果 | 强度 |
|---|---|---|---|
| P1 | targeted-edit / quick-polish（改第 7、12 页标题与字号） | **3-0 后者更好** | clear ×3 |
| P2 | create / client-ready（银行年报 → 管理层正式汇报） | **3-0 后者更好** | slight ×3 |

合计 **6-0 keep**，位置交换后判定完全一致，无位置偏差。

**判据取地面真值**：A 组 Core Workflow 无条件必读（`agent-behavioral-guardrail` + `strategy-brief` / `guided-interaction-pattern` / `decision-to-deck-attribute-map` + `confirmation-state-machine`）；B 组跨阶段必读三件套；C 组 Decision Router「阶段必需（下限）」；D 组本任务已触发的条件件（`title-fit-standard` 因改标题触发、`incremental-edit-protocol` 因局部修改触发、`confirmation-log-standard` 因档位为 partner-ready 触发）。

**取证（P1 两版加载集差异）**：

| 项 | spec-A（旧） | spec-B（新） |
|---|---|---|
| 加载文件数 | 10 | 18 |
| C 组下限 5 件 | 缺 `agent-runtime` / `language-discipline` / `visual-qa-protocol`（**3 件硬伤**） | 齐 |
| A 组无条件必读 | 齐 | 齐 |
| D 组已触发件 | 缺 `title-fit-standard`、`confirmation-log-standard` | 齐 |
| 精确度 | 未夹带 `v2-capability-router` | 夹带 `v2-capability-router`（→ 登记 D9） |

spec-A 的执行者在「判断依据」里直接写 **"Minimum references 给出档位基线"**，并把自己引用的 5 件下限里的 3 件判为"延后"；spec-B 的执行者明确引用新加注原文（"该列不是全集……本轮加载集 = 两者并集"）后补入了这些强制件。**这直接证明改名 + 加注改变了 agent 的取舍行为，且方向正确。**

**风险复盘**：原判"低风险"成立。改动是纯文本 2 处，回归面小；P2 的 client-ready 场景两版差异不大（judge 给 slight），说明加注没有把大任务拖慢——它只在小任务档位上纠正了"下限当全集"的误读。**唯一副作用**：新注记鼓励"取并集"，P1 的 spec-B 执行者因此多加载了 `v2-capability-router`（见 D9）。该夹带未改变本轮判定（6 个 judge 均认为覆盖度权重高于这一处精确度扣分），但说明**加注需要配一条反向约束**——已登记 D9。

**副产物**：3 个 judge 独立指出 P2 的 spec-A 执行者**自相矛盾**——判断依据称"依据 INDEX.md 的「何时读」列"，却在末尾写"未读 INDEX.md"。这是 INDEX 入口未被强制化的表现，属 D2 的延伸观察，不单列。

**后续更正（2026-10-03 D9 轮）**：本节取证表中「spec-B 夹带 `v2-capability-router`（→ 登记 D9）」一行**判错了**。D9 轮侦察发现：技能里没有任何规则说小任务不读该文件——`progressive-loading-protocol` 的 Layer 0 明确把它列为 Always Loaded，express 档位下限列也含它。执行者没有夹带，是**当时的 judge 判据写入了这条误读**（本项目第三次评测工件失真）。详见 D9 节与 ADR-0008。D7 的 6-0 keep 结论不受影响——6 个 judge 均以覆盖度为决定因素，该条只是被记为精确度扣分。

---

## D9 · `v2-capability-router` 的「小任务默认不加载」边界不明 —— 已处理（前提更正后按澄清措辞处理）

**登记时的前提（后被更正）**：D7 轮 P1 配对测试里，改动后版本的执行者把 `v2-capability-router` 列入必读并激活 `auto_layout_fix` / `assertion_strength_matrix`，当时判为"小任务夹带"，登记为 D9。

**侦察推翻了前提（2026-10-03 第六轮）**：全库共 6 处涉及该文件"何时加载"的表述，**没有任何一处明写"小任务不读该文件"**：

| 来源 | 表述 | 指向 |
|---|---|---|
| `progressive-loading-protocol.md` Layer 0 | "Always Loaded——每个任务都应优先读取"（含该文件） | **读** |
| `SKILL.md` express 行下限列 | 含 `v2-capability-router.md` | **读** |
| `v2-capability-router.md` L3 | "读取 task-tier-protocol 后使用；不要在 quick-polish 中默认加载**所有 V2 能力**" | 读文件；限制的是能力 |
| `SKILL.md` L84（旧） | "按需读取……不要在小任务中默认加载**完整 V2 能力**" | 歧义 |
| `task-tier-protocol.md` L5（旧） | "涉及 PRD V2 增量能力时读取" | 条件读（异类） |
| `INDEX.md` L30 | "按任务风险加载……避免小任务默认全载" | 歧义 |

**结论**：执行者没有错——它照着 Layer 0 的原文执行。真正的缺陷是**同一件事两种口径**（Layer 0 说"每任务都读"，另两处说"按需读"），这正好解释了为什么两轮执行者会得出相反结论且各自引用的都是真实存在的规则。**连带更正**：D7 轮的 judge 说明里把这一条写成了"默认不加载"，等于把一处误读写进了判据——这是本项目**第三次评测工件失真**（前两次见 D3、D5 节）。

**处理（用户确认方向：澄清措辞，保留"各档位都读"）**：改动 2 处——

1. `SKILL.md` L84 改写为显式两层：**读这张路由表不等于「加载 V2 能力」**——它是判断本任务该激活哪些能力的入口，各档位都要读（Layer 0）；受档位限制的是**激活哪些能力**，`express` / `quick-polish` 只激活 Tier Defaults 列出的基本项，不得加载完整 V2 能力集，也不得因激活某项能力而抬高档位或交付等级。
2. `references/task-tier-protocol.md` L5 对齐（原是异类表述）："确定档位后读取……按其 Tier Defaults 只激活本档位默认能力，不加载完整 V2 能力集"。

`SKILL.md` 51,862 → 52,207 字节。

**验证（3 prompt × 2 版本，12 个盲评 judge，X/Y 位置随机交换）**：

| Prompt | 任务 | 结果 |
|---|---|---|
| P1 | quick-polish 小任务（执行计划） | 第 1 次 **2-1 支持改动前**；复采样 **2-1 支持改动后**（合计 3-3） |
| P2 | client-ready 大任务（执行计划） | **3-0 支持改动后**（slight ×3） |
| P3 | 审阅含误读的加载计划草案 | **3-0 支持改动后**（2 slight + 1 clear） |

**总判定 9-6 → keep**。改动所针对的维度上 **6-0 一致**：改动前的执行者把路由表表述为"按需读取"（定性错误）、激活能力后不读其 Required reference；改动后的执行者逐字引用澄清后的规则，并点名 `auto-fix-playbook.md` / `language-calibration-standard.md`。

**P1 反转的追查（按 D3 确立的纪律）**：两次 P1 的分歧点都不是 D9 改动涉及的内容——第 1 次分歧在 `failure-modes.md`、第 2 次在 `strategy-brief.md`，两次漏的是**不同的文件**，而 `diff` 确认两版 spec 只有 2 行差异且都不涉及这些文件；D7 轮的改动前版本执行者还明确纳入过 `failure-modes`。判定：**正交的执行者方差**，不是改动效应。处理方式是复采样而非修工件。

**遗留观察（已结案，2026-10-03 架构审计）**：小任务执行计划偶发漏掉一个必读件且无规则依据——根因已定位并修复：`INDEX.md` 的 `failure-modes` 行「何时读」只写了"出现卡住…时"，弱于 SKILL.md 的"任务开始时必读三件套"，执行者正是引用该行排除 failure-modes，行为完全有据、错在索引。INDEX 行已补齐，见文末「架构审计」。

---

## D8 · 命名后缀无稳定语义 + 条号无全局引用规范 —— 已处理

（现象与实证更正见上文，2026-10-03 架构审计已把"虚构条号"更正为"跨文件归属错误"。）

**处理（2026-10-03 第七轮 Darwin）**：改动 2 处——

1. `SKILL.md` Anti-Patterns 新增 **A13**：引用规则只写条号、或把条号归到没有该条号的文件，是高频反例；正确做法是**条号是文件局部命名空间，引用必须「文件名 + 条号」成对出现**（如 `agent-behavioral-guardrail` Rule 2.5），文件没有编号规则时引用章节标题，不得自行编号。
2. `docs/GLOSSARY.md` **裁决五种后缀语义**（protocol=流程规则 12 个 / standard=质量规则 20 个 / rulebook=对象专属禁令集 2 个 / playbook=操作手册 2 个 / library=素材集合 4 个），**既有文件名不回改**（D2 决策：不动文件位置），并明写"引用以各文件的「职责」与正文为准，不以后缀推断行为"。

`SKILL.md` 52,207 → 52,508 字节。

**验证（2 prompt × 2 版本 × 3 盲评 judge，X/Y 位置随机交换）**：P1（计划型，防回归）**3-0 支持改动**（1 clear + 2 slight——三个 judge 一致抓到改动前执行者把 `strategy-brief` 归入"不读"，与 D7 漏件机制同类）；P2（审计型，草案含「依据 `task-tier-protocol` Rule 2.5」）**3-0 支持改动**。合计 **6-0 keep**。

**最有说服力的对照**：改动前的审计者把条号归属错误定性为"**编造的引用**"——这是事实性错误（Rule 2.5 真实存在于 `agent-behavioral-guardrail.md`），且**正是当初登记 D8 时犯的同一个错**；改动后的审计者正确锚定真实出处（含原规则标题「Scope Must Be Explicit For Quick-Polish」）、给出规范写法，并援引 A13 作为依据。**缺引用规范时，连审校者都会滑向同一种误判**。

**至此 D1-D9 全部处理完毕，仅剩 D4（观察项）。**

**现象（2026-10-03 D2 验证中发现）**：两个独立来源：
1. `docs/GLOSSARY.md` 的「待裁决项」已登记：`standard` / `protocol` / `playbook` / `library` / `rulebook` 五种后缀混用，无稳定语义差异。
2. D2 的 quick-polish 测试中，D2 后版本的执行者引用了 **`task-tier-protocol` 的「Rule 2.5」**——当时判为"该条号不存在，agent 自己编了一个"。**（2026-10-03 架构审计更正）**：`Rule 2.5` 并非虚构——它真实存在于 `agent-behavioral-guardrail.md`（该文件有 Rule 0/1/2/2.5/3/4），执行者犯的是**跨文件归属错误**。真正的断点是：条号是**文件局部命名空间**，但技能没有全局引用规范（要求「文件名 + 条号」成对出现）；且 `task-tier-protocol.md` 本身没有任何编号规则，agent 却在为它引条号。另 `insight-to-layout-mapper.md` 也有独立的 Rule 1-5，两个文件的条号空间互不相通，跨文件引用必然撞号。

**为什么是问题**：跨文件归属错误（更正后的定性）与凭空编号一样，会让审校、引用和争议裁决失效——引用了一个无法定位的依据。

**修复方向（按更正后诊断调整）**：核心是给「条号引用」立全局规范——① 规定引用条号必须写成「文件名 + 条号」（如 `agent-behavioral-guardrail` Rule 2.5），禁止只写条号或只写编号；② 给高频被引用但尚无编号的 reference（如 `task-tier-protocol`）补稳定条号，或在文件头声明「本文件无编号规则，引用时用章节标题」；③ 后缀语义（standard / protocol / playbook / library / rulebook）单独裁决。①成本最低、直接消除断点。

**风险**：中（涉及多个文件），需单独一轮。

---

## D3 · 静态 triage 短板未细化定位 —— 已处理（诊断 + 三项弱项修复）

**现象**：Darwin 静态 9 维 triage 得分 75.2，但未细分到具体扣分点。

**诊断结果（2026-10-03）**：按 darwin rubric 逐维打分（自评，绝对分只用于 triage）：

| 维度 | 权重 | 分 | 失分 |
|---|---:|---:|---:|
| 7 整体架构 | 12 | 4 | **7.2** |
| 3 失败模式编码 | 12 | 4 | **7.2** |
| 8 实测表现 | 23 | 7 | 6.9 |
| 5 可执行具体性 | 18 | 8 | 3.6 |
| 2 工作流清晰度 | 12 | 7 | 3.6 |
| 4 检查点设计 | 6 | 6 | 2.4 |
| 9 反例与黑名单 | 6 | 6 | 2.4 |
| 6 资源整合度 | 4 | 8 | 0.8 |
| 1 Frontmatter | 7 | 9 | 0.7 |

维度 7 与维度 3 已由 D1 / D6 处理。

**三项剩余弱项的取证（2026-10-03）**：

| 弱项 | 取证结果 |
|---|---|
| 维度 2 工作流输入/产出 | Core Workflow 7 步只写"读哪些 reference"，`输入` 在整段出现 **0 次**、`交付物` 0 次；中间产物清单被压成一坨平铺列表放在 Non-Negotiables/Pipeline，未映射到步骤 |
| 维度 4 检查点显性标记 | `🔴`/`🛑`/`⛔`/`STOP`/`❌` **全部 0 处**；停点确实存在（`必须停止` 1 处、`不得继续` 1 处、`停在` 2 处），但散在正文靠扫读发现 |
| 维度 9 反例与黑名单 | **无任何反例/黑名单小节**（0 个匹配标题）；禁令散落 **57 处**（`不得` 35、`不要` 8、`避免` 7、`不能` 6、`禁止` 1） |

**关键发现**：`confirmation-state-machine.md` **已有**标准的 `Node | Input artifact | Required output | Confirmed status` 表 —— 输入/产出模式在 CN 节点层已解决，只是没下沉到 Core Workflow 步骤层。故修法有现成范式可对齐，不需要新造。

**实际处理（2026-10-03，用户确认"三项全做"）**：

| 弱项 | 处理 |
|---|---|
| 维度 2 | Core Workflow 7 步各加一行「**输入** → **产出**」，产出一律给具体中间产物名（`source_digest.md`、`data_pool.json`、`preset_map.json` 等），与 `confirmation-state-machine` 的 State Nodes 对齐 |
| 维度 4 | Core Workflow 开头新增「检查点速查」表（5 行：CN0/CN1/CN2/CN3 + stage gate，列「位置 / 通过条件 / 未通过时」），并在 4 处真正的强制停点加统一文本标记 **【硬停】**（共 13 处标记） |
| 维度 9 | 新增「Anti-Patterns（高频反例速查）」小节：12 条稳定编号（A1-A12）的反例，每条带「正确做法」，并明写**「本表是速查，不是全集」** |
| 附带去重 | 删除 Non-Negotiables/Pipeline 里那份 22 项中间产物平铺清单（现已被 Core Workflow 各步「产出」覆盖），改指向 Core Workflow；并把唯一遗漏的 `reference_layout_profile.json` 补进第 5 步。**依据 D1 的单一事实来源原则**，避免我自己引入新的重复 |

**结果**：`SKILL.md` 45,992 → **51,410 字节**（原始基线 112.6%）。体积净增，但增的都是非冗余内容（步骤输入/产出、检查点、反例编号），且删掉了一处重复清单。

**验证（2026-10-03，两阶段）**：
- 第一阶段（2 个请求 × 2 spec × 3 独立盲评 judge）：P1「执行计划 + 反例清单」**3-0 clear×3**；P2「停点判断」**2-1 slight×3**。
- 第二阶段（追查 P2）：P2 的结果被拆成两个原因——① 评测工件缺陷（我的摘要版漏写了 `direct_build_after_minimal_interview`，原输出里两版都有）；② **真实的稀释效应**——新增的检查点表只写了禁止项，挤掉了 `failure-modes` F6 的降级后果（不得声称 `client-ready`）。修正工件 + 补写降级段后重跑执行者与 judge → **P2 3-0 slight×3**。
- **D3 最终 6-0 → keep**。

**judge 反馈的净收益**：D3 后版本的执行计划把检查点内联到步骤（【硬停】CN0-CN3），gate 与步骤一一对应；反例有稳定编号 A1-A12，可被后续引用核查；前版本自述"未引用统一的编号体系"，条目无法稳定引用，且漏掉「placeholder 交付」「章节页塞正文」两条指定高频项。

---

## D4 · `html-page-design-standard.md` 与既有 exhibit 标准的分工 —— 观察中

**现象**：2026-10-03 新增的 `html-page-design-standard.md` 与 `exhibit-composition-standard.md` 存在概念邻接（前者"怎么排"，后者"要什么"）。已在两份文件的 ADR 与正文中写明分工，但未经过实战检验。

**修复方向**：下次做正文页时观察是否出现"两份都要读、读哪份不明确"的情况。若出现，合并或加判据表。

**风险**：低，观察项。

---

## D5 · 新增绑定条款可能稀释既有硬要求 —— 已处理

**现象**：2026-10-03 首次 paired 验证中，文字改写组（组 2）after 版本 3-0 落后。judge 一致指出：after 版结论条停在"向中位靠拢、并关注传导"，而 before 版给出了双路径比较 + 推荐——后者是 client-ready 的硬要求。

**归因**：新增的"绑定 writing-style 咨询语域"条款被读成"文字规则以咨询语域为准"，从而稀释了既有的 client-ready 硬要求。

**已采取的修复**：在该条款末尾显式加写"**咨询语域是叠加层，不替代本 skill 既有的 client-ready 硬要求**：建议必须比较至少两个路径、必须给出指标与阈值、禁止单独使用「建议关注／持续优化」等表达——这些要求不因切换语域而放宽；两者冲突时以本 skill 的硬要求为准。"

**修复后复测**：用 2 个新样本重跑（盈利能力页、执行摘要结论条），after 版本 3-0 与 3-0 胜出，两稿均出现双路径比较与推荐。

**留档观察**：本项属"新增条款与既有条款的权重关系"这类问题，可能在其他新增绑定上重演。**后续每次新增外部绑定条款，都应显式写明它是"叠加"还是"替代"。**

**第二实例（2026-10-03 D3 验证中发现）**：同一类问题再次出现，但形态不同——不是"绑定外部规范"，而是"**新增的速查表挤掉了细则**"。D3 新增的「检查点速查」表把 CN2/CN3 的"未通过时"写成禁止项（"不得生成 `preset_map.json` 或进入构建"），结果 3 个 judge 一致指出：执行者满足了禁止项就停下了，**没有继续取用 `failure-modes` F6 的降级后果**（"必须先要求显式风险接受 → 记录 `direct_build_after_minimal_interview` → **不得声称 `client-ready`**"）。

**修法**：在检查点表下补写一段显式的降级说明，并加一句 **"停点表列出的禁止项不替代这一降级记录要求"**。重跑后 3-0 通过。

**由此得到的一般规律**：新增"速查表/清单"类内容时，**必须在表内或表下显式声明它与细则的关系**——否则读者会把速查表当作完整规则，细则是"可选的深入"。这与第一实例（绑定外部规范必须声明叠加/替代）是同一根因：**局部内容的权重边界没写清**。

---

## D6 · 失败模式未编码 —— 已处理

**现象（本轮诊断新发现）**：`SKILL.md` 内几乎没有「如果 X 失败 → Y」的显式分支。失败处理全部下沉到 `auto-fix-playbook.md`，而该文件只覆盖**审校发现问题后**的返修顺序，不覆盖**流程卡住**（材料不足、工具不可用、用户拒绝、确认节点未通过）。对应 darwin rubric 维度 3（权重 12），rubric 明确规定"只写正向流程而不写失败分支扣 ≥3 分"。

**实际处理（2026-10-03）**：
- 新增 `references/failure-modes.md`：15 条失败模式，四列结构（触发条件 / 一线修复 / 仍失败兜底 / 不可降的底线）+ 降级记录格式。
- `SKILL.md` 新增「Failure Modes And Degradation」一节：核心原则 + 5 条高频触发速查表 + 指向细则。
- Key References 的 Build and validation 行加入该文件。

**核心原则（RSM 此前完全没有）**：**降级只能降「执行工具」，不能降「判断标准」**。脚本不可用就手工核，reference 缺失就用硬规则兜，预览不可用就用结构说明替代——但来源可追溯、口径声明、建议可执行、字号不低于 minimum 这些标准不因工具受限而放宽。

**与 `auto-fix-playbook.md` 的分工**：本文件管流程卡住，auto-fix-playbook 管审校发现问题后的返修顺序。

---

## 处理顺序建议

1. **~~D3~~** 已完成诊断（2026-10-03）→ 结论指向 D1、D6，两项均已完成
2. **~~D1~~** 已完成（2026-10-03）
3. **~~D6~~** 已完成（2026-10-03）
4. **~~D2~~** 已完成（2026-10-03，B+ 方案：建索引 + 改指针 + 接孤儿，不动文件位置）
5. **~~D3 剩余弱项~~** 已完成（2026-10-03，维度 2 + 4 + 9 三项全做）
6. **~~D7~~** 已完成（2026-10-03，方向 ①：改名「阶段必需（下限）」+ 并集加注；配对验证 6-0 keep）
7. **~~D9~~** 已完成（2026-10-03，前提更正后按「澄清措辞、保留各档位都读」处理；12 judge，目标维度 6-0，总 9-6 keep）
8. **~~D8~~** 已完成（2026-10-03，A13 引用规范 + GLOSSARY 后缀裁决；6-0 keep）
9. **D4**（观察项，顺手处理）—— **唯一遗留**

**结构债务状态**：D1-D9 全部闭环，仅剩 D4 观察。**选题约束提醒**：D4 若要从观察转处理，仍须单独一轮。

**后续路线（2026-10-03 brainstorm，用户裁决）**：B 评测基建固化 → A 加载集单一事实来源（tier×stage 矩阵）→ C 真实项目端到端实测（借下次交付顺带）→ F（=D4）→ G 体积整合（等 A 落地后再做）。B 已完成（见文末）。

---

## 架构审计（2026-10-03，断点修复轮）

**背景**：用户要求用 codebase-design 透镜做全库断点审计，**只修断点、不加功能**。断点 = 失效的 seam：死链、孤儿、双口径、被引用但不存在的条号/文件。审计范围：108 个 markdown 文件全扫。

### 审计结果

| 检查 | 结果 |
|---|---|
| markdown 死链 | 修复前 1 → 修复后 **0** |
| references/ 孤儿 | **0**（96 个全部可达） |
| INDEX 一致性 | 96/96，无缺、无幻 |
| 被提及但不存在的 .md | 全部为产物名或工作区文件（`framework_confirmation.md` / `title_spine.md` / `HANDOFF.md` / `delivery_note.md` 等），非断点 |
| 脚本引用 | `validate-confirmation-state.mjs` 6 处名称一致；3 个脚本均已被 INDEX 资源清单收录 |
| 外部绑定 | writing-style v1.2.0 的 `check_prose.py` 存在 ✓ |
| `Minimum references` 旧列名残留 | 仅存在于 docs 历史记录，`SKILL.md` 已清零 |

### 修复的 5 处断点

1. **死链**：`docs/DEBT.md` → `references/INDEX.md` 相对路径错（docs/ 下应为 `../`）。
2. **INDEX `v2-capability-router`「按需启用」**→「各档位都读（Layer 0；读路由表 ≠ 激活能力）」。这是 **D9 自己引入的漂移**——D9 改了 SKILL.md 和 task-tier-protocol，漏了 INDEX 的同义行。被本轮审计抓到。
3. **INDEX `failure-modes` 何时读缺「任务开始时」**——**这就是 D9 轮 P1 两次方差的根因**：执行者引用该行排除 failure-modes，行为完全有据，错的是索引。已补「任务开始时（跨阶段必读三件套之一）」。
4. INDEX `progressive-loading-protocol` 同类漂移（同批修复）。
5. INDEX `guided-interaction-pattern` / `decision-to-deck-attribute-map` 触发条件弱于 SKILL.md 的「第一步必须读」——与 D7 实证的漏件机制同类（INDEX 弱触发 → 执行者延后 → 漏件），预防性修复。

### 顺带更正：D8 的实证

`Rule 2.5` **不是虚构条号**——它真实存在于 `agent-behavioral-guardrail.md`（Rule 0/1/2/2.5/3/4）。执行者犯的是**跨文件归属错误**（归到 `task-tier-protocol`，而该文件根本没有编号规则）。真正断点：条号是**文件局部命名空间**，但无全局引用规范要求「文件名 + 条号」成对出现；`insight-to-layout-mapper.md` 另有独立的 Rule 1-5，两个条号空间互不相通，跨文件引用必然撞号。D8 的修复方向已按此更新（核心从"加编号"改为"立引用规范"）。

### 记录为观察（不修）

- Layer 0（4 文件）与 INDEX 第 0 组（3 文件）是两个不同轴的"起始集"，成员不同——已在第 0 组加一句并集说明，避免执行者二选一。（**A 轮更新**：Layer 0 已升为 9 文件的唯一权威清单，INDEX 第 0 组注已改为指针；本条为历史记录。）
- `task-tier-protocol` 的 Layer 0 身份与「I0 之后定档」不矛盾（文件加载靠前、用于定档在后），不改。
- 教训（可复用）：**改任何「必读/触发」规则时，必须同步索引里的同义行**——D9 改 SKILL.md 漏了 INDEX，产生新漂移；而 INDEX 的弱触发行会把执行者的漏件"合法化"，让配对验证出现看似随机的方差。

---

## 评测基建固化（2026-10-03，B 轮，brainstorm 路线第一项）

**背景**：D1-D9 配对验证中共发生 3 次评测工件失真（D7 判据误读 V2 路由并波及 D9 登记、D8 快照不纯净、D9 简报写入误读），每次都差点导致 keep/revert 误判；结构检查每次靠临时脚本。用户在 brainstorm 七方向后裁决路线 B→A→C→F，B 为地基先行。

**新建 `eval/`（optimizer 专用，不进运行时 INDEX）**：

| 资产 | 作用 | 针对的历史失真 |
|---|---|---|
| `README.md` | 六步标准流程（快照→结构检查→写简报→核验→盲评→归档） | 流程无固化入口 |
| `judge-brief-template.md` | 地面真值每条必须注明出处文件；禁「印象/应该」；负面表述须源文等价 | D7/D9 判据手写误读 |
| `check_brief.py` | 文件存在性 + 负面表述分级核验（强否定/弱「按需」/与 Always-Loaded 冲突即 FAIL）+ 正面表述 WARN | D7 型失真（实测可拦截） |
| `smoke_test.py` | 死链/孤儿/INDEX 覆盖一条命令；只认链接目标，不裸搜文件名（产物名误报） | 结构断点靠临时脚本 |
| `snapshot.py` | 统一快照 + `--set` 显式覆盖 + 禁止覆盖已有目录 | D8 快照不纯净 |
| `runs/D7 D8 D9/` | /tmp 简报与判定归档（/tmp 易失；D9 方差追查靠的正是归档完整） | 工件丢失不可追溯 |

**验证记录**（本轮自测，双向用例）：
- smoke_test：当前库 PASS（死链 0 / 孤儿 0 / INDEX 覆盖无缺无幻，121 个 md）
- check_brief 阴性用例：D9 真实简报 PASS（0 WARN，修复词干匹配后）
- check_brief 阳性用例：手工构造 D7 型误读简报（「小任务不默认读 v2-capability-router.md」）→ FAIL 拦截 ✓
- snapshot：正常快照 + 覆盖守卫（二次执行拒绝）✓

**检查器自身迭代的两点教训**：
1. 初版 smoke_test 裸搜文件名 token，把 `title_spine.md` 等**执行者产物名**误报为死链（DEBT 上文架构审计节已有此结论，检查器却重蹈）——改为只认链接目标。
2. 初版 check_brief 放行了合成误读简报：源文件 L5 的「不加载完整 V2 能力集」宾语是能力集而非读文件，被强否定同现误判为依据——与 D7 失真同款混淆。修复为**冲突检测压过强否定**（同现「各档位都读」即 FAIL）。**教训：校验脚本必须用历史真实失败案例做双向测试（阴性=应通过的真实工件，阳性=应拦截的失真复现），否则检查器的假阴性会制造虚假安全感。**

**对后续轮次的约束**：A 轮（tier×stage 加载矩阵）动工时，`check_brief.py` 的地面真值提取可为矩阵对账提供基础；每轮优化照 README 流程执行，简报必须过 check_brief。

---

## A 轮 · 加载集单一事实来源（2026-10-03，brainstorm 路线第二项）—— 已处理

**登记的根因**：漏件方差 ×3（strategy-brief ×2、failure-modes ×1）的结构性根因是「每任务必读集合」散落在 4 处表述——progressive-loading-protocol Layer 0（4 件）、SKILL.md Core Workflow「第一步必须读」（3 件）、跨阶段三件套、INDEX 第 0 组并集注——执行者引用任何一处较弱表述都能"合法"排除文件（D9 P1 方差的机制）。

**处理**：把 progressive-loading-protocol 的 **Layer 0 升级为唯一权威清单（9 文件 = 三处并集）**，逐件标注理由与出处，并附裁决规则（其他文件只做指针/触发说明；任何 INDEX 行不得用于把清单成员排除出加载集；改必读规则只改此清单）。SKILL.md 的 Decision Router 并集注与 Key References 段、INDEX 的加载纪律行与第 0 组注，全部降为指向该清单的指针。选 Layer 0 做宿主的理由：它属于跨阶段三件套、任务开始时必在上下文中。

**验证（首次全程使用 eval/ 基建）**：snapshot 快照 spec-A/B → smoke_test PASS（死链 0/孤儿 0/INDEX 96）→ 简报按模板撰写并过 check_brief.py（0 WARN）→ 配对盲评 → 判定归档 `eval/runs/A/`（10 份）。

- **P1（quick-polish）3-0 支持改动**（slight ×3）：双方 9 件全齐；改动版显式以权威清单构造加载集，改动版执行者还用档位推理排除了已触发的条件件 `title-fit-standard`（judge 点名）。
- **P2（client-ready）第一轮 0-3 反对**：三名 judge 事实现场一致（表面 2-1 是 judge 标签互换，经与执行者原文核对实为 3-0）——改动版执行者以 Layer 1「Load only when entering stage」把 9 个下限件全部推迟出加载计划。**诊断：D5 模式第三次出现**——新的「权威清单」框架稀释了 D7 确立的并集语义（新增绑定条款未声明与既有硬要求的权重关系）。
- **修复（叠加条款）**：权威段落补充「本清单裁决的是每任务必读的成员资格，**不改变并集规则**——本轮加载计划 = 本清单 ∪ Decision Router 下限列 ∪ 触发件；下限件按 stage 排期但必须逐件列入计划；Layer 1 Anti-Pattern 只约束视觉/语言/场景类按需件」。
- **P2r 复采样（全新执行者+judge）3-0 支持改动**：复采样中改动前执行者也把下限件整体推迟（证明第一轮方向差异含执行者处置成分），修复版逐件排期并援引叠加条款——正确行为已结构化。

**最终结果：keep**。SKILL.md 52,508 → 52,909 字节。results.tsv 已记录；ADR-0010。

**两条方法论记录**：
1. judge 标签互换审计：三名 judge 用互换的标签描述同一事实时，表面票型（2-1）完全失真，必须对照执行者原文逐条核实后再计票。
2. 「权威/单一来源」类改写天然带稀释风险：凡引入新的权威框架，必须同轮显式声明它**不改变**哪些既有语义（并集、降级、底线），并配对验证这些语义的行为面没有被挪动。

---

## D10 · Layer 1 stage 表未覆盖下限件的排期位 —— 已处理（2026-10-04）

**发现（2026-10-03 断点复审，A 轮后）**：A 轮叠加条款要求「下限件按其所属 stage 排期读取，但必须在任务开始时的加载计划中逐件列明」，而 Layer 1 stage 表只覆盖部分下限件。

**范围更正（2026-10-04 实施时实测）**：登记时只查了 client-ready 档，写为 5 件；**实际把五个档位的下限件取并集后为 29 件，其中 Layer 1 仅覆盖 10 件、Layer 0 覆盖 6 件，缺口为 19 件**（含 partner-ready 的 `source-digest-standard` / `consulting-storyline-standard` / `storyline-page-planning` / `template-catalog` / `review-loop`、targeted-edit 的 `agent-runtime` / `language-discipline`、pipeline 的 `workflow-san-pipeline` / `artifact-schema-library` / `visual-profile-registry` / `sample-regression-test` / `profile-regression-matrix` / `tier-stage-matrix` 等）。**教训：登记「缺口」类债务时必须把口径取到全量（全部档位/全部成员），只查一个档位会低估 3 倍以上。**

**处理（2026-10-04）**：`progressive-loading-protocol` 新增 **Layer 1b「档位下限件的 stage 归属」表**，19 件逐件给出 stage 归属与适用档位；Layer 0 裁决段补一句「下限件的 stage 归属查 Layer 1b；Layer 1 与 Layer 1b 都查不到的档位下限件属本文件缺陷，应补入而非由执行者推断」；Execution Rule 第 3 步改为「加载 Layer 1 本 stage 件 + Layer 1b 为该 stage 排期的下限件」。脚本复验：29 件下限件**零缺口**。

**验证（2026-10-04，2 prompt × 2 spec × 3 盲评 judge，位置交换）**：P1（client-ready 加载计划）**3-0 clear ×3**；P2（审计一份违规草案）**3-0 clear ×3**。合计 **6-0 keep**。judge 取证：
- 改动版逐件援引 Layer 1b，排期与权威表完全一致（`client-delivery-standard`→S6、`editability-check`→S5、`professional-chart-rulebook`→S2/S2.5、`confirmation-log-standard`→S0）。
- 改动前版本只能从散落表述自行拼装，产生**与权威表冲突的归属**（`client-delivery-standard`→「S2 前」、`editability-check`→「S2 构建」、`consulting-storyline-standard`→S2 而非 S1.6）——缺口造成了真实的行为分叉，这正是复审能抓到它的原因。
- 另抓到改动前审计产出把 `html-preview-protocol`（Layer 1 stage 触发件）误列为「本任务必读」。

**体积**：`progressive-loading-protocol.md` 5,396 → 7,794 字节；`SKILL.md` 不变（52,909）。ADR-0011；results.tsv 已记录；判定归档 `eval/runs/D10/`。

---

## D10 原始登记（2026-10-03，供追溯）

**发现（2026-10-03 断点复审，A 轮后）**：A 轮叠加条款要求「下限件按其所属 stage 排期读取，但必须在任务开始时的加载计划中逐件列明」。但 `progressive-loading-protocol` 的 **Layer 1 stage 表只覆盖 Decision Router client-ready 下限 11 件中的 6 件**；以下 5 件在 Layer 1 无任何排期位（该文件内提及次数为 0）：

`data-lineage-protocol`、`conclusion-evidence-matrix`、`professional-chart-rulebook`、`editability-check`、`client-delivery-standard`

**证据**：`grep -c` 逐件核对，`progressive-loading-protocol.md` 对上述 5 件提及 0 次；其余 6 件（artifact-validation-standard、logic-gate-checklist、visual-qa-protocol、deck-quality-scorecard、final-review-checklist、confirmation-log-standard）均有 Layer 1 归属。这 5 件在 INDEX 的「何时读」列只有**条件触发式**描述（如「金融项目必读」「核心结论进入页面前」「客户正式交付」），无 stage 归属。

**为什么是问题**：叠加条款给执行者派了「按 stage 排期」的义务，而 Layer 1 无法兑现这 5 件的排期——执行者只能自行推断读取时机（读早/读晚/漏读各有其"合理"依据）。这正是 A 轮要消灭的方差形态，属于 **A 轮自身欠下的断点**。

**修复方向（待单独一轮 + 配对验证）**：在 Layer 1 表中为这 5 件补齐 stage 归属（拟：`data-lineage-protocol` → S1 事实池；`conclusion-evidence-matrix` → S1.6/S2 结论绑定；`professional-chart-rulebook` → S2.5/S2 图表；`editability-check` → S5 构建；`client-delivery-standard` → S6 交付），或新增一张「下限件 stage 归属」小表置于 Layer 1 之后，保持单一事实来源在 `progressive-loading-protocol` 内。改后须配对验证：执行者是否按表排期且不再漏列/误排除。

**关联检查（本轮同时核过，均干净）**：死链 0 / 孤儿 0 / INDEX 96 无缺无幻；`Minimum references` 旧列名仅存 docs 历史；「按需启用」旧表述仅存 ADR-0008 引文；跨文件条号裸引用 0（`Rule X` 仅出现在两个定义文件的标题行）；SKILL.md 中 `title_spine.md` 等 4 处 .md 提及均为产物名非断点；3 个 `validate-*.mjs` 名称与路径一致；外部绑定 `writing-style/scripts/check_prose.py` 存在；eval/runs 归档 A/D7/D8/D9 齐备。

**同轮修复的两处文档陈旧项（无行为影响，未配对）**：
1. 上文「记录为观察（不修）」中「Layer 0（4 文件）与 INDEX 第 0 组（3 文件）」表述已加 A 轮更新注。
2. `eval/judge-brief-template.md` 中指向 `/tmp/rsm-d9/judge/brief.md` 的引用改为 `eval/runs/` 归档。
