# 盲评任务说明（A 验证 · 每任务必读集单一权威清单维度）

你是一名独立盲评 judge。你要比较两份执行者对**同一个任务**的产出，判定哪一份更正确地处理了
「每任务必读集的确定」这一维度。你不知道两份输出分别来自哪个版本，也不需要猜。

## 一、技能规则地面真值（从源文件提取，对两份候选同样适用；每条注明出处）

### A. 每任务必读 9 文件（唯一权威清单 = `progressive-loading-protocol.md` Layer 0）
`agent-behavioral-guardrail.md`、`strategy-brief.md`、`guided-interaction-pattern.md`、
`decision-to-deck-attribute-map.md`、`task-tier-protocol.md`、`v2-capability-router.md`、
`confirmation-state-machine.md`、`progressive-loading-protocol.md`、`failure-modes.md`
（出处：`references/progressive-loading-protocol.md` Layer 0 表格，标注「每任务必读的唯一权威清单」）

### B. 权威裁决规则
- SKILL.md、INDEX、Decision Router、tier-stage-matrix 等处的必读表述只是指针或触发说明，
  与 A 组清单不一致时**以清单为准**（出处：`progressive-loading-protocol.md` Layer 0 裁决段）。
- **任何文件、任何 INDEX 行都不得用于把 A 组清单中的文件排除出加载集**
  （出处：同上；`references/INDEX.md` 加载纪律行明写「不得据本表把该清单中的任何文件排除出加载集」）。
- Decision Router「阶段必需（下限）」列是档位下限不是全集，加载集 = 下限 ∪ A 组清单
  （出处：`SKILL.md` Decision Router 表下注，明写「并集」且指向 Layer 0 权威清单）。

### C. 档位差异（本轮任务如为 quick-polish 档）
- 能力激活受限于 Tier Defaults（`v2-capability-router.md`），读路由表 ≠ 加载完整 V2 能力集
  （出处：`SKILL.md` L84、`task-tier-protocol.md` 第 5 行）。
- 下限列对 targeted-edit/quick-polish 另列 `agent-runtime.md`、`language-discipline.md`、
  `visual-qa-protocol.md`（出处：`SKILL.md` Decision Router 第 2 行）——这些是**下限补充**，
  不改变 A 组 9 件在任何档位都要读的规则。

### D. 条件触发（非每任务必读，触发才读）
`data-lineage-protocol.md`（金融项目必读——这是**逐文件条件**，非全局清单成员）、
`title-fit-standard.md`（改标题触发）、`tier-stage-matrix.md`（选定 tier 后读）
（出处：`references/INDEX.md` 各行「何时读」列）。

## 二、判据（按重要性排序）

1. **加载集是否包含 A 组全部 9 个文件**（漏任一为硬伤；特别检查执行者有没有引用 INDEX 行、
   档位、任务规模等理由排除其中任何一个）。
2. **是否正确使用权威裁决**：当某个较弱表述（如下限列未列出某文件）与 A 组清单冲突时，
   执行者是否以清单为准纳入；还是反过来用弱表述排除（这是本轮改动针对的核心失败模式）。
3. **有无过度加载**：把 C 组下限补充件或 D 组条件件说成「任何任务都必读」，
   或声称加载完整 V2 能力集。
4. **表述是否指明出处**（文件名 + 位置），是否出现「印象中应该读」类无锚点表述。

## 三、输出格式（严格照此，不要展开）

```
判定：X 更好 / Y 更好 / 平手
强度：clear（明显）/ slight（略优）
理由：<2-4 句，逐条点出具体差异，点名具体文件名>
```
