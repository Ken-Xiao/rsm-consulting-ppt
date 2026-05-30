# Visual Presentation Upgrade

用于把页面从“符合模板”提升到“专业咨询机构成稿观感”。选择 visual profile、写 `visual_intent`、构建 HTML/PPTX 或做 visual QA 时读取本文件。

## Upgrade Principle

专业咨询页的高级感来自五件事：

1. **清晰阅读路径**：标题、口径、主证据、标注、读法、来源顺序稳定。
2. **克制的视觉重量**：只高亮需要客户看的内容，不用装饰抢证据。
3. **稳定网格**：标题、主图、卡片、来源和页码落在统一边距与基线。
4. **证据层次**：主证据最大，辅助读法次之，来源和限制弱化但可读。
5. **可维护性**：客户会改的文字、数字、建议和来源保持可编辑。

## Page Hierarchy

每页视觉层级按以下顺序组织：

```text
L1 Claim title
L2 Scope / story subtitle
L3 Takeaway or synthesis strip
L4 Primary evidence object
L5 Annotation / benchmark / focus label
L6 Supporting readout
L7 Source / caveat / page number
```

如果 L4 不明显，页面会像文字稿；如果 L6 缺失，页面会像数据截图；如果 L7 缺失，页面不能客户交付。

## Professional Density Bands

| Density | Use when | Visual rule |
|---|---|---|
| `executive` | 摘要、决策页、章节小结 | 2-4 个核心结论，留白较多，数字突出 |
| `analysis` | 正文核心分析页 | 1 个主图 + 1-3 个读法/指标/洞察卡 |
| `evidence_dense` | 矩阵、政策比较、附录前置页 | 表格/矩阵可密，但必须有分组、读法和来源 |
| `appendix` | 备份数据、条款、明细 | 可小字，但标题仍给结论，正文不混入核心页 |

正文页不要把 `appendix` 密度带入 `analysis`。

## Visual Refinement Rules

### Title Refinement

- 标题必须左对齐，避免居中大标题用于正文页。
- 正文标题旁可用短亮蓝线或三段线，不使用厚重深色页眉。
- 标题超过 2 行时，优先压缩语言，不缩小到低于 profile 最小字号。

### Card Refinement

- 卡片圆角保持 6-10px；不要使用 SaaS 风大圆角。
- 阴影只用于主证据卡或浮层，不给每个小标签加阴影。
- 卡片之间保持 18-32px 间距；同组卡同高同宽。
- 辅助卡必须服务主证据，不能成为装饰。

### Chart Refinement

- 主图必须占页面主体宽度 60%-85%，除非是 2x2 矩阵。
- 直接标注焦点主体、同业中位、目标线或异常点。
- 图例与标签不得重复；能直接标注时少用图例。
- 坐标、单位、样本、期间和来源缺一不可。

### Matrix Refinement

- 顶部表头和左侧维度列必须有明显层级。
- 每格最多 1 个主判断 + 1 个短补充。
- 多国家/多主体颜色必须低饱和，且跨页固定。
- 矩阵页必须有“矩阵读法”或底部 synthesis。

### Dark Page Refinement

- 深色页只用于封面、章节、总结或用户明确要求。
- 深色页正文不超过两块内容区；避免长表格。
- 白字正文不低于 24px，来源可弱化但必须可读。

## Profile-Specific Upgrades

### `rsm-insurance-results`

- 维持浅灰结论条 + 白色图表卡 + 右上模块胶囊。
- 图表卡底部优先增加 2-3 个指标 strip，而不是增加段落。
- 同一章节内图表颜色顺序固定：亮蓝、深蓝、灰、浅蓝。

### `rsm-global-policy`

- 保持亮蓝标题、三段横线、白底/浅建筑底纹。
- 政策矩阵避免高饱和彩虹色，采用低饱和国家列。
- 每个制度页必须有“监管哲学 / 机制 / 行为影响 / 适用边界”中的至少 2 个读法。

### `sunong-value-creation`

- 深蓝封面只出现一次；正文页以白底诊断页为主。
- 每个经营诊断页都要出现 benchmark：同业中位、排名、目标线或历史区间。
- 模块小结必须含证据回链，避免三张空泛文字卡。

### `rsm-practice-sharing`

- 保持书法感标题、三段标题线、建筑照片拼贴。
- 案例事实和建议必须分区；建议卡不要塞案例原文。
- 右侧照片必须淡化，不得影响文字可读。

## Visual QA Additions

在 `review_report.json` 增加：

```json
{
  "visual_presentation_upgrade_review": {
    "reading_path": "pass",
    "density_band": "analysis",
    "primary_evidence_prominence": "pass",
    "supporting_readout": "pass",
    "matrix_or_chart_refinement": "pass",
    "client_editability": "pass",
    "issues": []
  }
}
```

## Mandatory Fix

出现以下问题必须返修：

- 主证据对象不明显。
- 页面只有图表，没有读法或管理含义。
- 页面像附录密表却放在正文核心章节。
- 深色页承载密集正文。
- 颜色语义跨页不一致。
- 客户关键内容不可编辑。
