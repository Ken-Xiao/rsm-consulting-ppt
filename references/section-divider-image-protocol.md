# Section Divider Image Protocol

用于生成金融咨询 deck 的章节页、目录页和章节转折视觉。章节页应参考 `final-20251031 商业银行及保险公司不良处置行业实践分享-1103.pdf` 的“章节名称 + 专业图片 + 几何白块/蓝色竖条”风格，同时兼容默认的 `rsm-insurance-results` 风格。

所有图片还必须符合 `professional-image-rulebook.md`。本文件只定义章节页图片规则；封面、正文侧图、案例图、证据图和图标由 `professional-image-rulebook.md` 统一约束。

## Role Of Section Pages

章节页不是正文页，不承担复杂论证。它只做四件事：

1. 宣告进入新章节。
2. 给出章节编号和章节名称。
3. 用一句短句说明本章要回答的问题或结论。
4. 用专业图片建立金融、监管、风险、数据或机构场景感。

## When To Insert

- 每个正式章节开始前必须插入 `section_divider`，除非 deck 少于 8 页。
- 每 6-8 页连续分析后，应插入章节页、小结页或桥接页调节节奏。
- 章节页应出现在 `title_spine.md` 和 `storyline_map.json` 中，但它的 `page_role` 为 `section_divider`，不是 `evidence`。

## Visual Variants

### `insurance_section_divider`

用于默认 `rsm-insurance-results`：

- 上半部：蓝色玻璃建筑、金融数据屏、会议室或报表图片。
- 中部：浅灰白横向标题带。
- 左侧：深蓝章节编号块，如 `01`。
- 右侧：亮蓝竖条。
- 字体：深蓝粗黑体，不用书法标题。

### `practice_section_divider`

用于 `rsm-practice-sharing`：

- 左侧或半幅：蓝色调建筑/金融机构照片。
- 右侧白底：大号浅灰章节编号 + 黑/深灰章节名。
- 边缘：亮蓝竖条。
- 叠加：半透明白色几何方块拼贴。
- 字体：章节名可用楷体/书法感字体，保持参考 PDF 的培训分享气质。

## GPT Image Generation Prompt Pattern

当没有用户授权图片或可用素材时，可使用 `gpt-image-generate` 生成章节背景图。生成图片应是照片感或高质量写实风，不要生成抽象插画。

### Prompt Fields

```json
{
  "image_role": "section_background",
  "style_profile": "rsm-practice-sharing",
  "subject": "modern blue glass financial office building",
  "scene_context": "banking and insurance non-performing asset resolution practice sharing",
  "visual_tone": "professional, clean, blue-tinted, corporate consulting",
  "composition": "wide 16:9, left side suitable for cropping, clear negative space for white geometric overlays",
  "avoid": ["people close-up", "warm orange lighting", "cartoon", "abstract gradient", "brand logos", "readable text"]
}
```

可直接复用的场景 prompt 见 `section-image-prompt-library.md`。

### Example Prompt: Practice Sharing Chapter

> Generate a realistic wide 16:9 photograph-style image of a modern blue glass financial office building and subtle city reflection, professional banking and insurance consulting mood, cool blue tone, clean corporate lighting, no people close-up, no brand logos, no readable text, with enough open area for white geometric overlays and a bright blue vertical accent.

### Example Prompt: Insurance Results Chapter

> Generate a realistic wide 16:9 photograph-style image of a modern financial data analysis environment with blue glass architecture, subtle dashboard screens and clean corporate lighting, cool blue palette, professional accounting advisory mood, no logos, no readable text, no warm colors, suitable as a PowerPoint section divider background.

## Required Metadata

For every generated image, record:

```json
{
  "asset_id": "img_section_01",
  "page_id": "P04",
  "image_role": "section_background",
  "style_profile": "rsm-practice-sharing",
  "prompt": "...",
  "generation_tool": "gpt-image-generate",
  "usage_boundary": "decorative section background only; not factual evidence",
  "copyright_note": "AI-generated image for presentation background"
}
```

## QA Rules

- 图片必须偏蓝、干净、专业，不使用暖色商业地产广告风。
- 图片不得出现真实可识别商标、真实可读文字或具体公司 logo。
- 章节名、章节编号和页脚必须可编辑；图片只作为背景。
- 章节页文字总量不超过 40 中文字，避免变成正文页。
- 如果章节页看起来空，可以放一句 `chapter_question` 或 `chapter_answer`，不要加正文 bullet。
