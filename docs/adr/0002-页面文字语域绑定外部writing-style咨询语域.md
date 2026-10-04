# ADR-0002：页面文字语域绑定外部 writing-style 咨询语域，不在本 skill 内新建

- **状态**：已采纳
- **日期**：2026-10-03

## 背景

用户要求"文字部分需要按照 writing-style 的 consulting 体裁来进行修改"。

现状核查发现两处与用户表述不符：

| 用户表述 | 磁盘现实 |
|---|---|
| writing-style 有 consulting 体裁 | 本机 `~/.workbuddy-ai/skills/writing-style/` 是**旧版**：4 个子 skill 分目录（oil-tone / lieflat-less-ai-tone / humanizer / human-writing），**无 consulting**；其 SKILL.md 反而明确写「银行／证券／保险／财报类报告审校 → `finance-report-review`，本目录不覆盖金融专业审校」 |
| — | 用户随后提供 `writing-style-skill.zip`，内含 **v1.2.0**：已按 ADR-0001 合并为单一 skill，并已按 ADR-0002 新增**咨询语域叠加层**（`DISTILLATION/麦肯锡咨询文风.md`），语料为 8 份麦肯锡中文报告、329 页、131,096 汉字 |

本 skill 侧的现状：已有 `consulting-language-playbook.md`（标题公式库、断言强度表、压缩规则、会议纪要测试）、`language-discipline.md`、`language-style-library.md`、`language-calibration-standard.md`、`language-rewrite-pass.md`。**缺的不是规则，而是**：① 规则的**语域判据**（何时放宽破折号/引号/段首衔接词）；② **可执行的验收脚本**；③ 与写标题/写结论条动作的**强制绑定**。

关键事实：v1.2.0 的 `check_prose.py` 已实现 `--register {strict,rewrite,consulting,finance}`。实测同一段麦肯锡体文字：`--register strict` 判破折号为「需要修改」，`--register consulting` 降为「需要人工判断」并注明"咨询语域放宽"。**语域判错等于规则方向判错。**

## 决策

1. **安装 v1.2.0 到 `~/.workbuddy-ai/skills/writing-style/`**，替换旧版（旧版完整备份）。排除 zip 内的 `.workbuddy-ai/` 目录——那是该 skill 作者的工作记录（darwin 优化记录、memory），不属于 skill 本体。
2. **本 skill 不新建 consulting register**，改为**引用 + 强制绑定**：
   - 写标题、副标题、结论条、建议语时，除本 skill 的 `consulting-language-playbook.md` 外，读 writing-style 的 `DISTILLATION/麦肯锡咨询文风.md`（放宽边界、不放宽项、10 条验收判据）。
   - 交付前跑 `python3 <writing-style>/scripts/check_prose.py --register consulting <稿件>`。
3. **两套语言资产分工明确**：
   - `consulting-language-playbook.md` 管**页面级语言**——标题公式、断言强度、压缩长度（主标题 24-36 字等）、行动语言规则、会议纪要测试。
   - writing-style 咨询语域管**语域级规则**——哪些通用"AI 痕迹"规则在本语域放宽、哪些绝对不放宽、程序化检查。
4. **不放宽项在本 skill 内同样有效**：不编造数据与来源、口径声明、假设显式化、空泛重要性（"彰显/凸显/标志着重要一步"）、模糊归因（"业内普遍认为"）。这与本 skill 既有的证据纪律一致，不构成冲突。

## 被否决的方案

- **在本 skill 内新建一份 consulting register 规则**：否决理由：与 writing-style 的咨询语域重复；且本 skill 已有 94 个 reference，再加一份语言规则会加剧 sprawl。规则应由写作类 skill 统一持有，本 skill 只做引用与绑定。
- **在 writing-style 内新建第五个子 skill**：否决理由：writing-style 的 ADR-0001 已明确"四支子 skill 合并为单一 skill"，且其自身警告"四个子 skill 规则在场景层面存在直接冲突"；再造第五个会把已收敛的结构重新打散。用户提供的 v1.2.0 采用的正是"语域叠加层"而非"新子 skill"，方向一致。
- **改用 `consulting-report-writing` skill**：否决理由：该 skill 面向**长文报告**（章节骨架、摘要、结语、脚注），不是 PPT 页语言；且其 `references/`、`assets/`、`scripts/` 三个目录为空。
- **改用 `finance-report-review` skill**：否决理由：它是**审校**工具（review-first），定位是"严格资深编辑挑毛病"，不提供写作时的语域规则；本 skill 的审校环节已有 `review-loop`、`auto-fix-playbook`，引入会职责重叠。
- **不装新版，继续用旧版 writing-style**：否决理由：旧版无 consulting 语域、无 `--register` 参数、无 `delivery-gates.md`；用户明确要求用 zip 版本。

## 后果

### 需要接受

- **跨 skill 依赖**：本 skill 的文字验收依赖 `~/.workbuddy-ai/skills/writing-style/` 存在且为 v1.2.0+。若该 skill 被移动、删除或降级，`--register consulting` 不可用。降级路径：脚本不可用时按 `麦肯锡咨询文风.md` 的 10 条验收判据手工核（**降级只能降执行工具，不能降判断标准**）。
- **两份语言文件需同时读**：PPT 页面语言现在有本 skill playbook + writing-style 咨询语域两个来源。已通过分工条款划定边界，但使用者需知道"页面级"与"语域级"的分工。
- **语域误判风险**：把 PPT 文字当 `strict` 跑会把咨询体应有的破折号/引号判成 FAIL。缓解：本 skill 的绑定条款明确指定 `--register consulting`。

### 得到的

- 页面文字第一次有了**可执行**的验收手段（此前只有人工判据）。
- 语域冲突从"临场判断"变为"显式裁决表"。
- 频率实证基于 131,096 汉字全量统计，非抽样印象。

## 相关

- `DISTILLATION/麦肯锡咨询文风.md`（writing-style）— 频率实证、五个签名写法、冲突裁决表、10 条验收判据。
- `docs/adr/0002-新增咨询语域作为第二种语域叠加层.md`（writing-style）— 上游决策依据。
- `references/consulting-language-playbook.md`（本 skill）— 页面级语言规则。
- `docs/DEBT.md` — 本轮未处理的结构债务。
