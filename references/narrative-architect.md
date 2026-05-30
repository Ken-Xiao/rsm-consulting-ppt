# Narrative Architect

用于在数据/事实池之后，和用户一起确认“怎么讲”。复杂项目不要一次性生成完整大纲，必须设置确认点。

专业金融咨询项目先读取 `references/professional-consulting-standard.md`、`references/storyline-page-planning.md` 和 `references/methodology-packs.md`。先完成主标题故事线和副标题承接，再进入页面版式与视觉设计。

## Insight Discovery First

如果存在 `data_pool.json`，在提出叙事原型前先读取 `references/insight-discovery.md`，扫描数据中的模式，输出或等价整理 `insights.json`。

重点寻找：

- 排名跳变：同一主体在两个指标中的排名差距明显。
- 趋势背离：利润、收入、风险、资本、估值等指标出现方向不一致。
- 极值标记：排名第一、末位或显著偏离中位数。
- 聚类分离：对标组形成梯队或显著分群。
- 回归/归因信号：PB、估值、IRR、风险折价等驱动因子显著。

先把发现呈现给用户，询问哪些发现应成为主叙事线，再进入 Checkpoint 1。

## Checkpoints

0. **数据驱动发现确认**：哪些 insight 进入主线。
1. **叙事原型与模块序列确认**
2. **主标题故事线确认**：只读主标题，是否能看清整份报告的逻辑链条。
3. **逐页副标题和页面角色确认**：副标题是否承上启下，每页是否只证明一个环节。
4. **每个模块的页级结构确认**
5. **完整大纲最终确认**

## Narrative Archetypes

| ID | 名称 | Use when | Arc |
|---|---|---|---|
| `contradiction-action` | 矛盾→证据→行动 | 银行经营对标、经营复盘 | 账面表现 → 穿透证据 → 结构性矛盾 → 行动方案 |
| `gap-diagnosis-leap` | 反差→诊断→跃迁 | 价值创造、估值修复 | 市场不认可/价值折价 → 原因诊断 → 能力跃迁 |
| `waterline-defense` | 水位线→传导→安全边界 | 资产收储、估值谈判 | 三条水位线 → 现金流传导 → 估值安全边界 |
| `risk-flag-decision` | 风险标记→穿透→建议 | 尽调、风险审查 | 红旗风险 → 证据穿透 → 交易影响 → 建议 |
| `market-map-opportunity` | 市场结构→竞争格局→机会 | 行业研究 | 市场定义 → 增长与结构 → 竞争地图 → 机会与风险 |
| `policy-taxonomy-to-implication` | 分类→矩阵→深挖→启示 | 跨司法辖区、跨监管制度、政策比较研究 | 研究框架 → 全景分类 → 横向矩阵 → 单元深挖 → 行为影响 → 启示 |
| `constraint-structure-control` | 约束→结构→风控→落地 | 交易结构、融资方案 | 约束条件 → 推荐结构 → 风控闭环 → 实施路径 |

## Module Library

可按场景组装：

- `metadata`：报告口径、样本、指标定义、阅读路径。
- `executive_summary`：核心结论、关键数字、建议。
- `framework_intro`：分析框架和方法论。
- `benchmark`：同业/交易/案例对标。
- `policy_taxonomy`：政策类型划分、监管哲学定位、制度坐标。
- `jurisdiction_deep_dive`：单个国家/司法辖区/制度体系深挖。
- `deep_dive`：专题穿透。
- `valuation`：估值方法、区间、敏感性。
- `risk_control`：风险矩阵、缓释措施、证据链。
- `transaction_structure`：主体、合同、资金、票据、信息流。
- `action_plan`：时间表、责任方、KPI、文件清单。
- `appendix`：数据、免责声明、团队、补充证据。

## Page-Level Spec

每页写成：

```json
{
  "page_id": "P08",
  "module": "risk_control",
  "page_role": "diagnosis",
  "logic_relationship": "causal_chain",
  "claim_title": "四类控制点决定服务合同架构能否经受合规审查",
  "story_subtitle": "在确认交易结构可行性的基础上，本页进一步拆解合同、资金、票据和证据链四类审查控制点",
  "previous_link": "上一页确认交易结构的核心约束",
  "next_link": "下一页转入实施路径和责任分工",
  "layout_pattern": "risk_control_matrix",
  "support_object": "2x2 risk-control matrix",
  "data_keys": ["invoice_rule", "evidence_chain", "repurchase_clause"],
  "source_note": "原始PPT；项目组整理"
}
```

## User Confirmation Prompts

### Checkpoint 0

```text
数据扫描发现了 [N] 个值得进入叙事的模式：
1. [发现] — [叙事含义] — [建议模块/页面]
2. ...

你希望哪些发现作为主线？有没有需要压低或不能写的发现？
```

### Checkpoint 1

```text
基于材料，我建议使用 [叙事原型]：
[一句话解释]

模块建议：
1. [模块] — [作用] — [预估页数]
...

这个结构是否符合你的汇报意图？要不要增删模块？
```

### Checkpoint 2

主标题故事线确认：

```text
以下是只读主标题形成的故事线：
P01 · [主标题]
P02 · [主标题]
...

请确认：这条标题链是否清晰表达了报告的逻辑推进？是否有跳跃、重复或需要压低的判断？
```

### Checkpoint 3

逐页副标题和页面角色确认：

```text
P08 · [主标题]
副标题：[副标题]
页面角色：[diagnosis/evidence/...]
逻辑关系：[递进/并列/对比/因果/下钻/综合]
上一页连接：[...]
下一页连接：[...]

这一页是否准确承担故事线中的一个环节？
```

### Checkpoint 4

逐模块确认：

```text
模块 [X] 我建议分 [N] 页：
P01 · [结论标题] · [版式] · [数据/证据]
P02 · ...

这个模块是否可以进入下一模块？
```

### Checkpoint 5

```text
完整大纲共 [N] 页。我检查了结论来源、行动追溯和页序逻辑。
请确认是否进入视觉设计和构建阶段。
```

## Coherence Rules

- 摘要页只能压缩后文已有结论。
- 小结页不能首次出现新数据。
- 行动建议必须能追溯到风险、矛盾或机会。
- 法律/财务结论必须带前提，不写成无条件断言。
- 全部主标题连读必须形成完整故事线。
- 副标题必须为主标题提供细节，并连接上一页、下一页和页面主体。
- 每页只能证明故事线中的一个环节；若一页承担多个环节，应拆页。
