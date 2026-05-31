# Page Family Contracts

用于把 template catalog 中的页面类型变成可执行契约。进入 `preset_map.json` 前必须检查本文件。

## Contract Schema

每个 page family 都应定义：

- `required_fields`：必须输入的字段。
- `max_text`：建议最大文字量。
- `primary_visual`：唯一主证明对象。
- `allowed_emphasis`：允许的视觉强调。
- `forbidden`：禁止用法。
- `editability`：必须保持可编辑的对象。
- `qa_focus`：截图审查重点。

## Common Contract

所有页面家族共同要求：

- 必须有 `claim_title`。
- 必须有 `story_subtitle`，封面和章节页除外。
- 必须有 `source_note`，封面可例外。
- 必须有 `page_role` 和 `logic_relationship`。
- 正文页只能有一个主证明对象。
- 所有关键数字必须有 `lineage_ids`。

## rsm-insurance-results Families

### insurance_photo_cover

- `required_fields`：`title`、`subtitle`、`team_or_org`、`date`、`logo`、`hero_image`
- `max_text`：主标题 1 行，副标题 1 行，团队/日期各 1 行。
- `primary_visual`：横向金融数据/报表/分析场景照片。
- `allowed_emphasis`：深蓝主标题、右侧 RSM 三色竖条、白色点阵/线图低透明装饰。
- `forbidden`：营销风大渐变；无照片；把正文信息塞到封面。
- `editability`：标题、副标题、团队、日期必须可编辑；照片可图片化。
- `qa_focus`：标题不压照片、右上 logo、右侧三色条、照片比例接近参考 PDF。

### insurance_section_divider

- `required_fields`：`section_number`、`section_title`、`hero_image`、`logo`、`copyright`
- `optional_fields`：`chapter_question`、`chapter_answer`、`image_prompt`、`image_asset_id`
- `max_text`：章节标题不超过 14 个中文字符；章节问题/答案不超过 24 个中文字符；必要时换行。
- `primary_visual`：蓝色玻璃建筑照片 + 横向标题带。
- `allowed_emphasis`：深蓝编号块、浅灰标题带、右侧亮蓝竖条。
- `forbidden`：普通白底标题页；无照片；使用书法标题；在章节页塞正文 bullet。
- `editability`：章节编号、章节标题、版权必须可编辑。
- `qa_focus`：编号块比例、标题带高度、建筑照片透明度、logo 位置。

### insurance_agenda

- `required_fields`：`agenda_items`、`page_ranges`、`logo`
- `max_text`：3-6 个章节，每行不超过 18 个中文字符。
- `primary_visual`：目录列表。
- `allowed_emphasis`：亮蓝编号、浅灰分隔线、右对齐页码。
- `forbidden`：密集小字目录；无页码；章节名过长不换行。
- `editability`：全部目录文字和页码必须可编辑。
- `qa_focus`：行高一致、页码右对齐、与保险视觉系统一致。

### insurance_results_chart_card

- `required_fields`：`claim_title`、`story_subtitle`、`takeaway_text`、`chart_data`、`source_note`、`lineage_ids`、`supporting_evidence`
- `max_text`：结论条不超过 3 行；脚注不超过 3 行。
- `primary_visual`：白色阴影图表卡中的大尺度单一图表。
- `allowed_emphasis`：亮蓝左竖线、深蓝焦点系列、加粗关键分项、最多 2 个 callout。
- `fullness_requirement`：主图卡 + 2 个图内 callout，或主图卡 + 3 个底部指标块；主图不能小于正文可用宽度的 78%。
- `forbidden`：同页放两个无关图表；结论条超过 3 行；图表无单位；单个小图漂浮在大面积空白中。
- `editability`：标题、副标题、结论条、来源、页码、图例应可编辑；复杂主图可图片化但必须保留 `chart_data/Pxx.json`。
- `qa_focus`：模块胶囊对齐、图表卡留白不过度、标签不重叠、来源可读、页面有效占用面积达标。

### paired_period_comparison

- `required_fields`：`claim_title`、`story_subtitle`、`period_a`、`period_b`、`chart_data`、`source_note`、`difference_labels`
- `max_text`：解释文字不超过 2 条，每条不超过 45 中文字。
- `primary_visual`：双期间并列图或左右对比图。
- `allowed_emphasis`：差异标签、焦点主体高亮、可比性注释框。
- `fullness_requirement`：左右双卡或双图卡 + 差异标签 + 口径注释；避免两个小图居中造成空白。
- `forbidden`：样本不一致但不注明；两个期间使用不同颜色语法；把口径变化写成经营变化。
- `editability`：期间标签、差异标签、口径注释、来源必须可编辑。
- `qa_focus`：两侧坐标一致、样本顺序一致、差异标签清楚。

### stacked_contribution_split

- `required_fields`：`claim_title`、`story_subtitle`、`components`、`chart_data`、`source_note`、`contribution_readout`
- `max_text`：每个分项标签不超过 10 个中文字符；脚注解释长口径。
- `primary_visual`：100% 堆叠条或金额构成堆叠条。
- `allowed_emphasis`：焦点分项深蓝、负项灰色反向条、局部 callout。
- `fullness_requirement`：构成图 + 分项贡献读法，必要时增加底部贡献排序或指标 strip。
- `forbidden`：正负项混堆；图例顺序与堆叠顺序不一致；小段标签挤在图内。
- `editability`：标题、图例、来源、关键 callout 可编辑；主图可 ECharts/SVG。
- `qa_focus`：颜色顺序、标签可读、负值处理、总和口径。

## Practice Sharing Families

### practice_section_divider

- `required_fields`：`section_number`、`section_title`、`hero_image`、`chapter_question`
- `optional_fields`：`chapter_answer`、`logo`、`copyright`、`image_prompt`、`image_asset_id`
- `max_text`：章节标题不超过 18 个中文字符；章节问题/答案不超过 32 个中文字符。
- `primary_visual`：蓝色调建筑/金融场景照片 + 右侧章节编号和章节名。
- `allowed_emphasis`：大号浅灰章节编号、亮蓝竖条、白色几何方块、楷体/书法感章节标题。
- `forbidden`：无照片；暖色地产广告图；正文 bullet；真实品牌 logo；图片中出现可读文字。
- `editability`：章节编号、章节名、章节问题、页脚必须可编辑；背景图可图片化。
- `qa_focus`：照片裁切、右侧留白、章节标题可读、蓝色竖条、几何白块不遮挡文字。

### case_evidence_panel

- `required_fields`：`claim_title`、`story_subtitle`、`case_fact`、`basis`、`finding`、`recommendation`、`source_note`
- `max_text`：案例事实 160-220 中文字；依据 1 段；建议 2 条以内。
- `primary_visual`：案例证据框 + 建议块。
- `allowed_emphasis`：蓝色图标、加粗政策/流程关键词、灰底引用框。
- `forbidden`：案例未脱敏；政策依据无文号/日期；建议与案例无关。
- `editability`：案例文本、依据、建议必须可编辑。
- `qa_focus`：文字不拥挤、案例与建议对应、依据来源完整。

### practice_quote_evidence

- `required_fields`：`claim_title`、`story_subtitle`、`basis_quote`、`case_finding`、`recommendations`、`side_image`、`source_note`
- `max_text`：引用/依据不超过 170 中文字；案例发现不超过 120 中文字；建议 2 条以内。
- `primary_visual`：大浅灰引用框 + 右侧淡化照片 + 底部建议块。
- `allowed_emphasis`：规则名称/文号加粗、右侧亮蓝竖条、蓝色图标建议块。
- `forbidden`：政策依据无文件名/文号/日期；右侧照片过深影响正文；建议超过 2 条。
- `editability`：引用、案例发现、建议、来源必须可编辑；照片可图片化。
- `qa_focus`：引用框灰底比例、右侧照片透明度、底部建议块对齐、标题三段线。

### three_recommendation_cards

- `required_fields`：`claim_title`、`story_subtitle`、`recommendations[3]`、`source_note`
- `max_text`：每张卡 60-90 中文字。
- `primary_visual`：三张编号建议卡。
- `allowed_emphasis`：蓝色编号圆章、建议标题加粗。
- `forbidden`：超过 3 张卡；每卡塞多段正文；编号顺序无逻辑。
- `editability`：卡片文字、编号、标题必须可编辑。
- `qa_focus`：三卡同高同宽、编号对齐、卡内文字不溢出。

### risk_network_diagram

- `required_fields`：`claim_title`、`story_subtitle`、`nodes`、`edges`、`risk_points`、`source_note`
- `max_text`：节点 3-6 个；风险解释 2-3 条。
- `primary_visual`：角色/资产/资金/风险传导网络。
- `allowed_emphasis`：关系箭头分色、风险节点高亮、底部风险解释。
- `forbidden`：节点超过 8 个；箭头无含义；把全部合同细节塞进图。
- `editability`：节点、箭头标签、风险解释优先原生可编辑。
- `qa_focus`：箭头方向、节点层级、风险传导是否清楚。

## Contract Failure Rule

如果某页不满足 page family contract：

1. 优先删减文字。
2. 调整 page family。
3. 拆页。
4. 最后才微调字号，但不得低于最低字号。

## Comparison Table Interpretation Rule

适用于 `option_comparison`、`standard_dual_compare`、`jurisdiction_matrix`、`paired_period_comparison`、同城对照表、同业对比表和任何带“解读/含义/判断”列的表格。

`interpretation_column_minimum`：

- 解读列每行不少于 15 个中文字符，除非该行仅为“无可比数据/不适用”。
- 解读必须包含决策含义、管理含义或与其他指标的联动关系，不得只写“较高/较低/差距较小/领先/落后”。
- 优先句式：
  - `[指标差异] 不构成重大区分因子，后续判断应转向 [更关键指标]。`
  - `[表层优势] 仍需结合 [穿透指标] 验证，不能单独作为结论。`
  - `[差距] 指向 [根因/管理动作]，应在 [后续页面/行动项] 中展开。`
- 若解读列无法写出管理含义，说明该行不应作为正文核心表格，可移入附录或删除。

Fail examples:

- `差距较小`
- `账面层领先`
- `规模差距 3.1 倍`

Pass examples:

- `不良差距有限，不构成主要区分因子；后续应转向风险成本和迁徙率验证。`
- `ROA 领先但需结合 RAROC 验证，避免仅以账面收益判断价值质量。`
- `规模差距主要影响资源投入能力，不直接等同于资产质量优势。`

## Global Policy Families

### global_policy_cover

- `required_fields`：`title`、`subtitle`、`jurisdiction_scope`、`team_or_org`、`date`
- `optional_fields`：`hero_image`、`study_purpose`、`logo`
- `max_text`：主标题不超过 2 行；副标题不超过 2 行；说明段不超过 90 中文字。
- `primary_visual`：浅色金融建筑/玻璃幕墙背景 + 左侧品牌 rail。
- `allowed_emphasis`：亮蓝主标题、深蓝短块、右下 RSM logo。
- `forbidden`：暖色城市宣传图；深色照片遮挡标题；把目录或正文结论塞进封面。
- `editability`：标题、副标题、范围、团队、日期、logo 文字必须可编辑。
- `qa_focus`：标题对比度、建筑图透明度、左侧 rail、右下 logo、元数据可读性。

### global_policy_agenda

- `required_fields`：`research_framework`、`core_dimensions`、`scope_note`、`source_note`
- `optional_fields`：`agenda_items`、`page_ranges`
- `max_text`：左侧 6-10 行目录；右侧 2 个维度组、每组 2-5 条；底部说明不超过 80 中文字。
- `primary_visual`：左右两栏研究框架。
- `allowed_emphasis`：三段横线、亮蓝编号、浅灰底部说明框。
- `forbidden`：目录无页码或无研究范围；右侧维度写成大段正文。
- `editability`：目录、页码、维度、范围说明和来源必须可编辑。
- `qa_focus`：两栏平衡、编号对齐、底部说明可读、三段横线比例。

### global_policy_dark_summary

- `required_fields`：`claim_title`、`left_findings`、`right_outlook`、`metric_strip`
- `optional_fields`：`source_note`、`footer_labels`
- `max_text`：左右卡各 3-4 条 bullet；每条不超过 34 中文字；底部 3-4 个数字。
- `primary_visual`：深色双卡总结页。
- `allowed_emphasis`：白色标题、半透明卡片、绿色/黄色 bullet、大数字。
- `forbidden`：正文低对比；一页超过 10 条 bullet；把具体法规长条文放入总结页。
- `editability`：标题、卡片文字、数字标签、来源优先可编辑。
- `qa_focus`：深色对比、卡片可读性、底部数字对齐、bullet 密度。

### policy_framework_cards

- `required_fields`：`claim_title`、`framework_cards[4]`、`source_note`
- `optional_fields`：`subtitle`、`icons`、`rule_boxes`
- `max_text`：每卡正文 70-110 中文字；规则框 3 条以内。
- `primary_visual`：2x2 政策机制卡。
- `allowed_emphasis`：亮蓝竖线、浅蓝规则框、简洁图标。
- `forbidden`：每卡多段长文；图标颜色无语义；规则框没有制度含义。
- `editability`：卡片标题、正文、规则框、来源必须可编辑；复杂卡片可 HTML 渲染但保留文本源。
- `qa_focus`：卡片同高、规则框可读、图标一致、文字不溢出。

### policy_philosophy_map

- `required_fields`：`claim_title`、`axis_x`、`axis_y`、`policy_positions`、`type_cards`、`source_note`
- `max_text`：点位标签不超过 8 个；类型卡不超过 8 张，每张 1 个标题 + 1 行说明。
- `primary_visual`：2x2 监管哲学坐标图。
- `allowed_emphasis`：低饱和象限底色、白色标签卡、底部类型卡。
- `forbidden`：点位重叠；没有坐标轴含义；只放点位不解释类型。
- `editability`：标题、轴标签、来源必须可编辑；坐标主体可 HTML/SVG。
- `qa_focus`：点位标签重叠、轴标签可读、颜色语义、底部卡片对齐。

## Sunong Value Creation Families

### sunong_dark_cover

- `required_fields`：`client_name`、`ticker`、`title`、`subtitle`、`meta_items`、`date`
- `optional_fields`：`reading_path`、`logo`、`cover_note`
- `max_text`：主标题最多 3 行；说明段不超过 150 中文字；元数据 5-7 行。
- `primary_visual`：深蓝渐变封面 + 右侧元数据栏。
- `allowed_emphasis`：白色大标题、浅蓝灰副标题、黄色关键字、右上白底 logo。
- `forbidden`：大面积照片；花哨渐变；元数据缺失；阅读路径过长超过一行。
- `editability`：标题、副标题、说明、元数据、阅读路径必须可编辑。
- `qa_focus`：标题换行、元数据栏对齐、logo 位置、底部阅读路径和页码。

### kpi_dashboard

- `required_fields`：`claim_title`、`story_subtitle`、`kpis[4]`、`source_note`
- `optional_fields`：`industry_anchor`、`conclusion_blocks`、`reading_path`
- `max_text`：每张 KPI 卡 1 个大数字 + 2-3 条解释；结论块各不超过 120 中文字。
- `primary_visual`：4 KPI 卡 + 双结论块。
- `allowed_emphasis`：指标编号、排名 badge、亮蓝/红/金状态色。
- `forbidden`：超过 4 个核心 KPI；没有排名/中位数/阈值；只有数字没有解释。
- `editability`：标题、副标题、来源、页码和关键数字优先可编辑；卡片主体可 HTML 渲染但保留数据源。
- `qa_focus`：大数字可读、卡片同高、排名 badge、经营/资本市场结论是否具体。

### sunong_chart_diagnostic

- `required_fields`：`claim_title`、`story_subtitle`、`chart_data`、`chart_readout`、`diagnostic_readout`、`source_note`
- `optional_fields`：`module_name`、`benchmark_note`、`method_note`、`metric_strip`
- `max_text`：右侧两张诊断卡各不超过 90 中文字；指标 strip 2-4 个。
- `primary_visual`：左侧大主图 + 右侧诊断读法。
- `allowed_emphasis`：短亮蓝标题线、焦点主体亮蓝、风险/约束用红或金。
- `forbidden`：主图无 benchmark；右侧读法重复标题；图表没有排名方向或口径说明。
- `editability`：标题、副标题、来源、页码可编辑；主图可 ECharts/SVG 但必须保留 `chart_data/Pxx.json`。
- `qa_focus`：主图占比、右侧诊断具体性、来源血缘、图表标签不重叠。
