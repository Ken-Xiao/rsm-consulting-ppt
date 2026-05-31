# Incremental Edit Protocol

用于处理用户对既有 PPT 或已生成 draft 的局部反馈，例如“只改 P11 解读列”“第 3 页标题太弱”“把这张图换成表格”。目标是局部修改，不触发全 deck 重新生成。

## Core Principle

增量修改只改必要范围。除非修改影响核心事实、标题链、章节结构或视觉 profile，否则不得重写整份 deck。

## Edit Scope Classification

| Scope | Examples | Regeneration boundary |
|---|---|---|
| `page-local` | 改标题、改段落、调整对齐、换图表标签 | 只改该页 |
| `module-local` | 修改一个章节的结论、小结或图表口径 | 改该章节及小结页 |
| `cross-page-data` | 修改一个多页复用数字或口径 | 联动所有引用页 |
| `storyline-impacting` | 修改客户问题、总答案、章节顺序 | 回到 framework/storyline checkpoint |
| `visual-profile-impacting` | 切换模板、色板、page family | 重新生成 preset map 和样张 |

## Required Steps

1. **Locate**
   - 明确页码、对象、字段和用户意图。
   - 若用户没有说明页码，先用标题或内容定位。

2. **Protect**
   - 标记不可改区域：来源、页码、logo、已确认数字、phase-locked artifact。

3. **Patch**
   - 只修改必要字段或页面。
   - 不重写无关页面。

4. **Re-check**
   - `page-local`：重新执行该页 per-page checks。
   - `module-local`：执行该模块 per-batch checks。
   - `cross-page-data`：查找所有复用数字并联动更新。
   - `storyline-impacting`：回到结构确认或标题链确认。

5. **Log**
   - 记录 `edit_log.json` 或等价说明。

## Edit Log Schema

```json
{
  "edit_log": [
    {
      "edit_id": "edit_001",
      "request": "P11 解读要点太短",
      "scope": "page-local",
      "pages_changed": ["P11"],
      "fields_changed": ["comparison_table.interpretation"],
      "linked_pages_checked": [],
      "checks_run": ["per-page", "table_interpretation_column"],
      "status": "pass"
    }
  ]
}
```

## Guardrails

- 不因局部反馈重写已确认框架。
- 不新增未经来源支持的数字或判断。
- 修改标题时必须检查标题链是否仍连贯。
- 修改图表时必须检查图表观点、单位、来源和可编辑性。
