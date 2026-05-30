# Review Loop

用于 PPT 生成后的六维审校：故事线、数据血缘、专业判断、视觉质量、事实校验、可编辑性，并输出交付质量评分。

## Inputs

- Final PPTX
- Preview images/contact sheet
- `data_pool.json` if available
- `lineage_map.json` if available
- `outline.json` if available
- `storyline_map.json` if available
- `preset_map.json` if available
- `design_system.json` if available
- `visual_intent/` if available
- `conclusion_evidence_matrix.json` if available
- `image_assets.json` if available
- `context_enrichment.json` if available
- `chart_data/` if available

For PRD V2 client-ready or partner-ready checks, also read as needed:

- `references/v2-capability-router.md`
- `references/content-freshness-and-evidence.md`
- `references/quality-dashboard-standard.md`
- `references/visual-rhythm-orchestrator.md`
- `references/language-calibration-standard.md`

## Dimension 1: Storyline Coherence

读取 `references/client-delivery-standard.md`、`references/consulting-storyline-standard.md`、`references/decision-path-standard.md` 和 `references/storyline-page-planning.md`。

检查：

- 是否存在 `executive_question`、`deck_answer` 和 `chapter_answer`。
- 是否存在 `client_question` 和 `client_answer`，且执行摘要直接回答客户问题。
- 每页 claim 是否能回链到一个章节答案。
- 执行摘要是否只压缩正文已证明的章节答案。
- 主标题连读是否形成完整故事线。
- 副标题是否为主标题提供细节，并连接上一页、下一页和页面主体。
- 每页是否只承担故事线中的一个环节。
- 页面主体是否支撑本页主标题和副标题。
- 核心分析页是否写清 `finding` 和 `implication`；决策页是否写清 `recommended_action`。
- 含建议、路径或行动计划的材料，是否比较可选路径、推荐路径和不行动后果。
- 推荐路径是否回链到证据页、风险页和行动计划页。
- 强结论是否做过替代解释或边界检查。
- `storyline_map.json`、`outline.json`、`preset_map.json` 是否一致。

## Dimension 2: Data Lineage And Consistency

读取 `references/data-lineage-protocol.md`、`references/conclusion-evidence-matrix.md` 和 `references/professional-chart-rulebook.md`。

检查：

- 每个核心结论是否能回链到 `conclusion_evidence_matrix.json`。
- 结论措辞强度是否匹配证据强度。
- 数据是否有 `as_of_date`、`freshness_tier` 和 `evidence_credibility`；`stale` 或 `unknown` 是否被降级或补充说明。
- 替代解释和口径限制是否被记录。
- 每个数字能否追到 `lineage_map.json`、`data_pool.json`、`chart_data/` 或原始材料。
- 排名是否跨页一致。
- 年度、单位、百分比、bp、倍数是否混用。
- 衍生指标计算是否与公式一致。
- 摘要页和模块小结是否与正文页一致。
- 图片化图表是否有对应 `chart_data/Pxx.json`。
- 核心图表是否有 `chart_point_of_view`、基准、单位、样本、期间、来源和 lineage。

### Orphan Evidence Scan

`client-ready` 或 `pipeline` 且同时存在 `data_pool.json` 和 `conclusion_evidence_matrix.json` 时，执行反向推理验证：

- 遍历 `data_pool.json` 中 `confidence=high`、`evidence_credibility=L1/L2` 或 `evidence_strength=high` 的事实。
- 检查是否被 `conclusion_evidence_matrix`、`storyline_map` 或 `chart_data/` 引用。
- 未引用的高价值事实输出为 `orphan_evidence_scan`，作为潜在遗漏洞察，不自动写入正文结论。

## Dimension 3: Professional Judgment

读取 `references/client-delivery-standard.md`、`references/professional-consulting-standard.md`、`references/conclusion-evidence-matrix.md`、`references/consulting-language-playbook.md` 和 `references/client-meeting-minutes-test.md`。

检查：

- 每页是否回答了一个管理层/董事会/投委会问题。
- 每页是否有管理含义。
- 执行摘要是否准确压缩全文。
- 每个模块小结是否只总结本模块已证明内容。
- 行动建议是否能追溯到前文问题或机会。
- 是否存在没有证据支撑的“孤立结论”。
- 法律/财务/估值结论是否保留必要前提。
- 判断强度是否匹配证据强度。
- 判断强度是否匹配 `language-calibration-standard.md` 的 assertion strength matrix。
- 标题、结论条和建议措辞是否符合证据强度；情景测算是否被写成事实。
- 是否存在“建议关注”但没有指标、阈值、动作或责任边界。
- 客户是否能基于建议安排下一步会议、数据补充、责任人或监控指标。
- 标题、结论和建议是否通过会议纪要测试。

## Dimension 4: Visual Quality

复杂项目必须读取 `references/client-delivery-standard.md`、`references/consulting-page-archetypes.md`、`references/exhibit-composition-standard.md`、`references/visual-executive-rhythm.md`、`references/visual-fullness-standard.md`、`references/professional-chart-rulebook.md`、`references/professional-image-rulebook.md`、`references/presentation-polish-checklist.md` 和 `references/visual-qa-protocol.md`，用导出的预览图或 contact sheet 做截图级审查。

检查：

- 页面节奏是否单调：连续同一 page family 不宜超过 4 页。
- 封面、目录、章节页、正文页、小结页、附录页是否属于同一视觉系统。
- 正文页有效内容占用面积是否达到 70%-82% 目标；低于 65% 必须修复。
- 页面是否具备主结论层、主证据层和辅助证据层。
- 图表数据较少时是否补充洞察卡、指标 strip、基准线或口径卡，而不是留下大片空白。
- 主图卡内部是否充实：图表区域、图内 callout、底部指标/说明是否形成完整证据。
- 核心正文页是否具备 exhibit structure：scope、主证据、标注计划、辅助读法、来源边界。
- 是否通过 presentation polish：网格对齐、视觉重量、标签图例、留白、thumbnail test、print test、partner flip test。
- 客户交付样张是否覆盖高频咨询页型：方法限制、执行摘要、议题树、方案比较、风险缓释、行动计划。
- 每 6-8 页是否有 synthesis、transition、executive takeaways 或章节转折页。
- `preset_map.json` 是否记录 `rhythm_score`；连续页面认知负荷是否超过 `visual-rhythm-orchestrator.md` 阈值。
- 每页是否标注 `density_level`，正文页是否误用了附录密表密度。
- 主图是否满足 Chart As Proof Rule：焦点主体、参照基准、单位口径、图内结论和来源。
- 图表是否满足 Professional Chart Rulebook：观点、基准、比较口径、标注、色板和禁用场景。
- 图片是否满足 Professional Image Rulebook：图片角色、来源/prompt、使用边界、版权和 visual profile。
- 截图 3 秒阅读顺序是否成立：先标题，再结论/焦点，再图表口径。
- 标题是否是结论而不是主题词。
- 每页是否只有一个主阅读路径。
- 文本是否溢出、贴边、拥挤。
- 卡片、表格、流程节点是否对齐。
- 图表是否在缩略图下仍能辨认。
- 颜色语义是否一致。
- HTML/图片渲染区域是否与原生标题、页脚、来源条对齐。
- 图片图表是否有对应的 `chart_data/Pxx.json` 可追溯输入。
- `visual_intent` 是否与所选 page family 和实际版式一致。
- page family 是否满足 `references/page-family-contracts.md`。

## Dimension 5: Fact Check

如项目使用公开资料、近期政策、市场数据或外部事实，读取 `references/context-enrichment.md` 的 Fact Check Loop。

检查：

- 同一个数据点跨页是否一致。
- 每个数字能否追到 `data_pool.json`、`chart_data/`、原始文件或公开链接。
- 指标是否落在合理区间；异常值必须标记为需用户确认。
- 外部政策、公告、利率、监管数据是否有来源和日期。
- 自动生成的判断是否越过数据能支持的范围。

## Dimension 7: V2 Capability Checks

在 `partner-ready` 以上检查：

- `phase_lock`：已确认的 brief/storyline/preset 是否被锁定；锁定后是否被无说明改写。
- `logic_health_dashboard`：是否输出章节 × 逻辑门矩阵。
- `visual_rhythm_audit`：是否识别连续高负荷页面和缓冲页需求。
- `language_calibration_review`：是否记录受众专业程度、判断强度匹配和 tone arc。

在 `client-ready` 检查：

- `content_freshness_audit`：是否存在 stale/unknown 核心证据。
- `evidence_credibility_audit`：是否存在仅由 L3/L4 支撑的强结论。
- `public_citation_risk`：上市公司、金融机构或监管敏感主体的核心结论是否存在公开引用误读风险。
- `deck_quality_radar`：是否输出逻辑、内容、呈现、语言四维评分。

## Dimension 6: Editability

读取 `references/editability-check.md`。

检查：

- 是否存在整页截图。
- 标题、副标题、来源、页码、结论条是否可编辑。
- 客户最可能修改的文字、表格和关键数字是否可编辑。
- 图片化图表是否有源数据和渲染来源。
- `preset_map.json` 是否记录 `editable_elements`、`rasterized_elements` 和 `source_files`。

## Quality Score

读取 `references/deck-quality-scorecard.md`，输出 `quality_scorecard`。若存在 mandatory fail，不得标记为 `client-ready`。

## Final Review Gate

每次草稿完成后必须读取 `references/final-review-checklist.md`，按合伙人视角和客户视角分别审查，并输出 `final_review`。

检查维度：

- 合伙人视角：内容、逻辑、证据、呈现、语言。
- 客户视角：内容、逻辑、呈现、语言。
- 任一视角出现 `critical`，不得交付。
- 任一视角出现 `major`，必须修复或在交付说明中列为残余风险。

## Output: review_report.json

```json
{
  "summary": {"critical": 0, "warning": 3, "suggestion": 5},
  "client_delivery_review": {
    "status": "partner-ready",
    "content_gate": "pass",
    "visual_gate": "warning",
    "language_gate": "pass",
    "final_three_angle_audit": {
      "content": "pass",
      "visual": "warning",
      "language": "pass"
    },
    "client_ready_blockers": [
      "P08 图表缺少基准线和图内结论"
    ]
  },
  "storyline_review": {
    "title_spine": "pass",
    "subtitle_bridge": "warning",
    "single_page_role": "pass",
    "decision_path": "pass"
  },
  "data_lineage_audit": {
    "total_numbers": 84,
    "verified": 80,
    "pending_confirmation": 4
  },
  "conclusion_evidence_audit": {
    "status": "pass",
    "unsupported_conclusions": [],
    "wording_downgrades": []
  },
  "chart_professionalism_audit": {
    "status": "warning",
    "issues": ["P08 缺少明确 benchmark_type"]
  },
  "image_asset_audit": {
    "status": "pass",
    "ai_images_used_as_evidence": []
  },
  "meeting_minutes_test": {
    "status": "pass",
    "failed_items": []
  },
  "partner_review": {
    "decision_usefulness": "pass",
    "analytical_rigor": "warning",
    "traceability": "pass",
    "executive_readability": "pass"
  },
  "editability_check": {
    "status": "pass",
    "pages_with_full_page_images": [],
    "rasterized_elements_without_source": []
  },
  "quality_scorecard": {
    "total_score": 86,
    "rating": "partner-ready"
  },
  "logic_health_dashboard": {
    "status": "yellow",
    "chapters": []
  },
  "content_freshness_audit": {
    "status": "pass",
    "stale_core_evidence": []
  },
  "orphan_evidence_scan": {
    "high_value_unreferenced_facts": []
  },
  "visual_rhythm_audit": {
    "status": "pass",
    "high_load_runs": []
  },
  "language_calibration_review": {
    "status": "pass",
    "audience_expertise_level": "informed",
    "assertion_strength_alignment": "pass"
  },
  "deck_quality_radar": {
    "logic": 86,
    "content": 82,
    "presentation": 78,
    "language": 88
  },
  "final_review": {
    "status_before_fix": "partner-ready",
    "partner_review": {
      "content": "pass",
      "logic": "pass",
      "evidence": "pass",
      "presentation": "warning",
      "language": "pass"
    },
    "client_review": {
      "content": "pass",
      "logic": "pass",
      "presentation": "warning",
      "language": "pass"
    },
    "status_after_fix_target": "client-ready"
  },
  "issues": [
    {
      "page": "P08",
      "severity": "warning",
      "dimension": "visual",
      "issue": "风险矩阵文字偏密",
      "fix": "拆成两张卡或降低每卡文字量"
    },
    {
      "page": "P15",
      "severity": "critical",
      "dimension": "fact_check",
      "issue": "ROA 排名与 P04 摘要页不一致",
      "fix": "回到 data_pool.json 和 chart_data/P15.json 校准排名"
    }
  ]
}
```

## Fix Rule

先修 `critical`，再修 `warning`。不要为了视觉微调改动未经用户确认的法律、财务或估值结论。事实或数据问题优先于视觉问题；视觉问题修复后必须重新渲染预览。
