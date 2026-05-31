# Title Fit Standard

用于控制中文咨询 PPT 的标题、副标题和结论条在版面内可读、专业、不溢出。生成 `title_spine.md`、`storyline_map.json`、`preset_map.json` 和 HTML/PPTX 前必须读取本文件。

## Core Principle

标题太长时先改写，不先缩小字号。咨询标题要自成故事线，但不能变成一整段话。

## Chinese Title Fit Rules

以 16:9、RSM 默认正文页标题区域为基准：

| 主标题中文长度 | 推荐处理 | 字号建议 |
|---:|---|---:|
| ≤14 字 | 单行强标题 | 46-50pt |
| 15-22 字 | 单行或自然两行 | 40-44pt |
| 23-30 字 | 必须断成两行，删除冗词 | 36-40pt |
| >30 字 | 必须改写，不得继续缩小字号 | 重写后再定 |

英文、数字、括号和标点按视觉宽度折算；长公司名或专业术语优先放到副标题或图表标签。

## Subtitle Fit Rules

副标题应为 1-2 行：

- 建议 24-34 个中文字符。
- 最长不超过 48 个中文字符。
- 只承担口径、承接和引导功能，不重复主标题。
- 不使用 hero-scale 字号；正文页副标题通常 16-20pt。

## Rewrite Patterns

| Problem | Before | After |
|---|---|---|
| 主题词 | `2025年上市险企净利润分析` | `投资端回暖推高净利润，但承保贡献仍需单独验证` |
| 太长 | `在新准则口径下上市保险公司净利润表现改善但不同公司之间的承保和投资贡献差异较大` | `新准则下利润改善更依赖投资端，承保贡献分化仍是核心差异` |
| 两个结论挤一页 | `净利润改善且综合收益波动下降，同时费用分摊口径影响可比性` | 拆成两页：`利润改善主要来自投资端` / `费用分摊口径差异削弱公司间可比性` |
| 判断过弱 | `部分指标有所变化` | `核心指标改善尚未完全转化为稳定经营质量` |

## Required Schema

每页在 `storyline_map.json` 或 `outline.json` 中补充：

```json
{
  "title_fit": {
    "char_count": 24,
    "line_count_target": 2,
    "font_size_pt": 38,
    "rewrite_required": false,
    "rewrite_suggestion": null,
    "fit_status": "pass"
  },
  "subtitle_fit": {
    "char_count": 36,
    "line_count_target": 2,
    "font_size_pt": 18,
    "fit_status": "pass"
  }
}
```

`fit_status` 可取：

- `pass`
- `rewrite_recommended`
- `rewrite_required`
- `split_page_required`

## Build Gate

进入 HTML preview 或 PPTX build 前必须满足：

- 正文页没有 `title_fit.fit_status = rewrite_required`。
- 没有主标题超过 30 个中文字符且未给出改写。
- 副标题不超过 2 行。
- 章节页标题可以更短更大，但总字数仍应控制在 14 字以内。

如果标题无法同时满足“结论性”和“可放置”，优先保留结论，把口径和限定条件移到副标题或图表注释。
