# Global Policy Comparison Template

基于参考文件 `global_loan_writeoff_policy_comparison_20260121015942.pdf` 抽象，用于跨国家、跨司法辖区、跨监管制度或跨政策框架的比较研究型 PPT。

## Use When

- 主题是监管制度、会计准则、税务政策、风险处置、金融市场规则或合规框架的跨区域比较。
- 需要同时回答“各地区怎么规定”“背后的监管哲学是什么”“对机构行为有什么影响”“对中国/客户有什么启示”。
- 样本数量通常为 4-10 个国家、司法辖区、机构或政策体系。

## Narrative Pattern: policy-taxonomy-to-implication

叙事弧线：

1. **研究框架**：说明样本、维度、政策问题和阅读路径。
2. **全景分类**：用二维定位图或类型卡，把复杂制度先归类。
3. **横向矩阵**：用一个大矩阵对所有样本进行统一维度比较。
4. **单元深挖**：每个国家/地区/制度按固定 4-5 页结构展开。
5. **行为影响**：从监管、会计、税务、资本、市场处置角度解释行为后果。
6. **总结启示**：提炼制度趋势、可借鉴做法和未来演进方向。

## Standard Deck Flow

适合 30-55 页：

1. Cover：题目、副标题、样本范围、日期、机构。
2. Research Frame：章节目录 + 核心维度 + 研究口径。
3. Executive Summary：核心启示 + 未来展望 + 关键数字。
4. Policy Philosophy Map：二维坐标定位各司法辖区。
5. Taxonomy Cards：8 个左右制度类型卡。
6. Accounting/Standard Comparison：关键准则或基础规则双列比较。
7. Scoring / Ranking View：按 4-6 个维度给制度成熟度或协同性评分。
8. Jurisdiction Matrix：所有样本 × 所有比较维度的大矩阵。
9. Repeated Jurisdiction Chapters：每个样本一组固定页面。
10. Cross-Jurisdiction Synthesis：共同趋势、差异来源、可迁移机制。
11. Outlook / Implications：对监管者、银行、投资者或客户的行动启示。

## Repeated Jurisdiction Chapter

每个司法辖区或政策体系固定使用以下页序，便于读者横向扫描：

1. `jurisdiction_chapter_cover`
   - 背景图或渐变底。
   - 大标题为“[地区]制度：[一句话定位]”。
   - 副标题为核心特征。
   - 4 个指标卡：规则、准则、税务、行为/数据。

2. `policy_framework_cards`
   - 2x2 卡片解释监管框架。
   - 每张卡包含：图标 + 小标题 + 一句话说明 + 浅蓝规则框。
   - 适合“会计框架 / 税务规则 / 核销触发 / 监管协同”。

3. `policy_timeline`
   - 年份竖排或横排。
   - 每个节点：年份 + 政策名称 + 一句话影响。
   - 适合制度沿革、改革进程和监管迭代。

4. `behavior_impact_triad`
   - 三栏高卡片。
   - 解释政策对资本利润、拨备行为、不良处置、行业策略的影响。
   - 底部放“核心效应 / 关键数据 / 市场循环”等证据条。

5. `industry_response_grid`
   - 2x2 策略卡。
   - 每张卡给“策略名称、核心动作、量化指标或控制要求”。
   - 适合银行应对策略、最佳实践和落地建议。

## Core Layout Patterns

### policy_philosophy_map

二维坐标图，用于把多个制度放入监管哲学坐标。

- X 轴：税务协同、市场化程度、法律依赖度、财政支持度等。
- Y 轴：监管刚性、资本约束、处置速度、审慎程度等。
- 每个样本用白色标签卡 + 小圆点定位。
- 下方用 6-8 个小卡解释每个类型。

### jurisdiction_matrix

大矩阵，用于统一维度比较。

- 列：国家/地区/制度类型。
- 行：监管哲学、会计准则、触发条件、税务协同、逆周期工具、时限、拨备、处置模式等。
- 左侧维度列用深蓝底，表头用亮蓝底。
- 各样本列使用低饱和浅色区分，不用强烈彩虹色。
- 适合 HTML/Playwright 渲染主体区，并保留标题、来源、页码可编辑。

### standard_dual_compare

双体系对比页，用于 IFRS 9 vs CECL、监管 vs 会计、税务 vs 资本。

- 左右两栏。
- 每栏：图标 + 标题 + 3-5 条要点。
- 底部或右侧给“关键差异”。

### scoring_ladder

评分型比较页，用于制度成熟度、税务协同度、处置效率。

- 每个样本一行。
- 左侧样本名称，中间维度评分条，右侧总分。
- 用同一套维度，不在页内变更评分口径。

## Visual DNA

- 画布：16:9，参考尺寸 960x540 pt / 1920x1080 px。
- 背景：正文页白底；卡片用极浅灰；少量建筑/城市纹理只用于封面或章节页背景。
- 主色：亮蓝 `#0099D8` 用于标题、线条、图标和重点标签；深蓝 `#061B3A` 用于正文强调、章节压线和页码。
- 辅色：绿、金、紫、粉、灰用于区分不同国家或政策类型，但饱和度要低。
- 标题：大号亮蓝，左对齐，右侧长横线延展。
- 正文页：卡片浅灰底，左侧亮蓝竖线，内嵌浅蓝规则框。
- 页脚：左侧版权/来源，右下页码，灰色小字。
- 图标：每张卡片最多一个图标，用于快速识别维度；不要让图标抢主信息。

## Data Model

建议在 `data_pool.json` 中使用：

```json
{
  "comparison_subject": "全球贷款核销制度",
  "jurisdictions": [
    {
      "name": "美国",
      "type_label": "市场清洁型",
      "accounting_standard": "CECL",
      "writeoff_trigger": "120/180天",
      "tax_alignment": "高度协同",
      "countercyclical_tool": "无，CECL本身顺周期",
      "resolution_mode": "二级市场出清",
      "key_implication": "快速暴露风险并形成高流动性NPL市场"
    }
  ],
  "comparison_dimensions": [
    "监管哲学",
    "会计准则",
    "核销触发",
    "税务协同",
    "逆周期工具",
    "核销时限",
    "拨备特征",
    "处置模式"
  ]
}
```

## Quality Rules

- 横向矩阵页必须保持同一维度口径，不要对不同国家使用不同问题。
- 每个国家章节的页序和栏目名称应尽量一致，方便读者比较。
- 制度判断要区分事实、解释和启示：事实写来源，解释写逻辑，启示写适用边界。
- 不把“政策优势”写成绝对优劣；要说明适用条件、代价和行为激励。
- 如果使用公开政策、法规或监管数据，必须进入 `references/context-enrichment.md` 和 `references/review-loop.md` 的事实校验。
