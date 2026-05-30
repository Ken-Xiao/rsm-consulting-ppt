# Delivery Format Extension

用于 PPTX 之外的可选交付形态。PPTX 仍是主交付物；PDF、HTML preview 和视频旁白只在用户要求或项目需要时启用。

## Channels

| Channel | Purpose | Gate |
|---|---|---|
| `pptx` | 主交付物，可编辑 | 必须输出 |
| `pdf-print` | 打印、归档、无法编辑版本 | 需通过 print test |
| `html-preview` | 远程审校、快速翻阅、浏览器预览 | 不得替代 PPTX |
| `video-narration` | 异步预读、培训讲解 | 远期能力；需用户提供或确认讲稿 |

## Rules

- `pdf-print` 必须高 DPI，标题、图表标签和来源在 A4 横向打印下可读。
- `html-preview` 可复用 `assets/layouts`，但必须标记为预览，不作为客户最终可编辑文件。
- `video-narration` 的旁白不得新增 PPT 正文未证明的结论；旁白稿也需通过语言和合规边界检查。

## Delivery Note Additions

```json
{
  "delivery_formats": {
    "pptx": "final/final_deck.pptx",
    "pdf_print": "final/final_deck.pdf",
    "html_preview": "final/html_preview/index.html",
    "video_narration": null
  }
}
```
