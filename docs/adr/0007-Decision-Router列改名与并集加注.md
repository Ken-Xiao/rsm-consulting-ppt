# ADR-0007：Decision Router 列改名 + 并集加注

- **状态**：已采纳（"反向副作用"一节被 ADR-0008 部分更正）
- **日期**：2026-10-03

## 背景

DEBT D7：`Decision Router` 表的 `Minimum references` 列与 `Core Workflow` 的「必须读」声明冲突。以 `targeted-edit` 为例：

| 来源 | 文件 |
|---|---|
| Decision Router 的 `Minimum references` | `agent-behavioral-guardrail` / `task-tier-protocol` / `agent-runtime` / `language-discipline` / `visual-qa-protocol`（5 个） |
| Core Workflow §2「对任何 PPT 任务，第一步必须读」 | 另有 `strategy-brief` / `guided-interaction-pattern` / `decision-to-deck-attribute-map`，以及 §1 `agent-behavioral-guardrail`、确认节点 `confirmation-state-machine` |

**实证（D2 验证中发现）**：quick-polish 配对测试里，3 个 judge 有 2 个指出执行者**主动推理掉了 `strategy-brief`**，理由原话是"Decision Router 的 targeted-edit 最小集不含它"。

**根因**：`Minimum references` 字面读作"最小必需集"，与 Core Workflow 的"必须读"冲突时，agent 会选更小的那个。这是**规则权重关系不明**——与 D5 同源（局部内容的权重边界没写清）。

## 决策

采用 D7 备选方案中的**方向 ①（改名 + 加注）**，用户 2026-10-03 确认。改动 2 处，均只动 `SKILL.md`：

1. 列名 `Minimum references` → **`阶段必需（下限）`**。
2. 表下新增加注：
   > **「阶段必需（下限）」列是该档位在当前阶段至少要读的文件，不是 Core Workflow 必须读清单的全集。** Core Workflow 中写明「必须读」「第一步必须读」的文件在任何档位都要读——本轮加载集取两者的**并集**；本列未列出不等于可以不读，也不得据本列推断某文件「本任务不需要」。完整文件清单见 `references/INDEX.md`。

## 为什么选方向 ① 而不是 ② / ③

- **方向 ②（把 Core Workflow 强制件补进每行下限）**：会让 5 行表格各自膨胀，且 Core Workflow 的强制件清单未来一变，表格要同步改 5 处——违反 D1 单一事实来源。**被否决。**
- **方向 ③（删列，只留 Core Workflow 单一口径）**：会丢掉"该档位至少读什么"的速查价值，且 D2 建立的 INDEX 分组路由失去一个入口。**被否决。**
- **方向 ①**：只改 2 处文本，把"下限"与"全集"的关系一次性说清，并给出可执行的合并规则（**取并集**）。成本最低、语义最准。

## 为什么加注要写"不得据本列推断某文件本任务不需要"

只写"下限不是全集"仍留一个漏洞：agent 可以承认它是下限，却仍以"本列没列它"为理由把文件判为不需要。故加注显式封掉这条推理路径——**未列出 ≠ 不需要**。这与 D3 检查点表加"停点表列出的禁止项不替代降级记录要求"是同一种写法：**在可能被反向解读的地方，把反向读法点名禁止**。

## 后果

### 需要接受

- **体积微增**：`SKILL.md` 51,410 → 51,862 字节（+452）。
- **产生一个反向副作用**：并集注记鼓励"宁可多读"，P1 的执行者因此多加载了 `v2-capability-router`——而该文件在 `SKILL.md` 第 84 行被写为"小任务默认不加载"。该夹带未改变本轮判定，但已登记为 **D9**。**这条经验值得记下：一条"补漏"的注记可能诱发"过量"，需要配一条反向约束。**

### 得到的

- 小任务档位的加载集不再漏 Core Workflow 强制件（`strategy-brief` / `guided-interaction-pattern` / `decision-to-deck-attribute-map` / `confirmation-state-machine`）。
- 大任务档位不被拖慢——加注只纠正误读，不追加"必须多读"的要求。

### 验证结果

2 个请求 × 2 spec × 3 独立盲评 judge（X/Y 位置随机交换）：

| Prompt | 任务 | 结果 | 强度 |
|---|---|---|---|
| P1 | targeted-edit / quick-polish | **3-0 改动后更好** | clear ×3 |
| P2 | create / client-ready | **3-0 改动后更好** | slight ×3 |

**合计 6-0 → keep**，位置交换后判定完全一致，无位置偏差。

判据用**地面真值**：A 组 Core Workflow 无条件必读、B 组跨阶段必读三件套、C 组档位下限、D 组本任务已触发的条件件（`title-fit-standard` 因改标题触发、`incremental-edit-protocol` 因局部修改触发、`confirmation-log-standard` 因档位为 partner-ready 触发）。

**取证（P1 两版加载集差异）**：改动前的执行者引用 **"Minimum references 给出档位基线"**，把自己引用的 5 件下限里的 3 件（`agent-runtime` / `language-discipline` / `visual-qa-protocol`）判为"延后"，并漏掉 `title-fit-standard` 与 `confirmation-log-standard`；改动后的执行者引用加注原文后补入了全部强制件。**这直接证明改名 + 加注改变了取舍行为，且方向正确。**

### 副产物

3 个 judge 独立指出 P2 改动前版本的执行者**自相矛盾**——判断依据称"依据 INDEX.md 的「何时读」列"，却在末尾写"未读 INDEX.md"。属 D2 的延伸观察，不单列。

## 相关

- `SKILL.md` Decision Router 表头与表下加注
- `docs/DEBT.md` D7（已处理）、D9（新登记）、D5（同源根因）
- ADR-0003 — 单一事实来源（否决方向 ② 的依据）
- ADR-0005 — reference 索引分层（`references/INDEX.md` 作为"完整清单"的落点）
- ADR-0006 — 检查点标记与反例编号（"在可能被反向解读处点名禁止反向读法"的同款写法）
