# HTML Preview Protocol

用于在正式 PPTX 构建前，先用关键页 HTML 样张确认视觉方向、标题适配、内容密度和页面家族选择。完整项目、客户交付项目和 pipeline 项目必须读取本文件。

## Core Principle

不要等整份 PPTX 做完才看视觉效果。先用 3-5 张关键页预览，确认模板方向后再批量构建。

## Required Position

```text
layout_analysis_report.json
  -> html_preview_report.json
  -> user confirms preview
  -> draft_deck.pptx
```

`partner-ready` 以上项目如果已有 `layout_analysis_report.json`，就必须生成或说明 `html_preview_report.json`。

## Preview Page Selection

默认选择 3-5 张：

1. 封面或开篇页：检查整体风格。
2. 执行摘要页：检查信息密度、结论条和关键数字。
3. 核心分析页：检查图表卡、洞察卡和字号。
4. 章节页或小结页：检查节奏页和专业图片。
5. 行动/建议页：检查决策路径和可读性。

若 deck 少于 12 页，可选择 2-3 张；若超过 40 页，应选择 5-7 张。

## Required Output

`html_preview_report.json`:

```json
{
  "status": "pending_user_confirmation",
  "visual_profile": "rsm-insurance-results",
  "preview_pages": [
    {
      "page_id": "P05",
      "page_family": "stacked_contribution_split",
      "html_path": "preview_html/P05.html",
      "screenshot_path": "preview_pages/P05.png",
      "title_fit_status": "pass",
      "density_status": "balanced",
      "fullness_risk": "low",
      "issues": []
    }
  ],
  "summary": {
    "pages_previewed": 5,
    "blocking_issues": 0,
    "visual_direction": "ready_for_batch_build"
  },
  "user_confirmation_prompt": "请先确认这些关键页的视觉方向、字号和密度。确认后我再进入整份 PPTX 构建。"
}
```

## Preview QA

每张 HTML 样张至少检查：

- 主标题是否按 `title-fit-standard.md` 适配。
- 正文最小字号是否达到当前 page family 要求。
- 内容有效占用面积是否达到 `visual-fullness-standard.md`。
- 主图、表格、洞察卡是否对齐。
- 来源条、页码、模块胶囊、RSM 三色条是否符合 visual profile。
- 截图中是否有溢出、重叠、截断或空白过大。

## User Confirmation Rules

状态定义：

- `pending_user_confirmation`：已生成预览，等待用户确认。
- `confirmed`：用户确认可批量构建。
- `revise_required`：预览有 blocking issue，需要修订后重看。
- `preview_unavailable`：当前环境无法渲染预览，必须说明原因并让用户确认是否继续。
- `assumed_user_requested_direct`：用户明确要求跳过预览直接生成。

`client-ready` 不得在 `pending_user_confirmation` 状态下进入正式构建。

## Fallback When Rendering Is Unavailable

如果当前环境无法运行浏览器、Playwright、Chromium 或截图工具：

1. 输出 `html_preview_report.json`，状态设为 `preview_unavailable`。
2. 列出本应预览的页面、模板和预期风险。
3. 明确请求用户确认是否继续。
4. 交付说明中标记“未完成 HTML 关键页视觉预览”。

不得把“没有预览能力”包装成“预览通过”。
