# Professional Image Rulebook

用于规范 PPT 中所有图片、照片、图标、AI 生成图和背景图的使用。图片必须服务叙事和专业感，不得只是装饰。

## Image Roles

每张图片必须标记 `image_role`：

| Role | Use | Can support factual claim? |
|---|---|---|
| `cover_hero` | 封面主视觉 | No |
| `section_background` | 章节页背景 | No |
| `case_context` | 案例页的情境背景 | No, unless sourced |
| `evidence_photo` | 现场、文件、项目照片等事实证据 | Yes, with source |
| `diagram_icon` | 流程、风险、建议图标 | No |
| `decorative_texture` | 低透明背景纹理 | No |

只有 `evidence_photo` 可以作为证据，且必须记录来源、日期、拍摄/披露主体和使用授权或公开来源。

## Image Metadata Schema

```json
{
  "asset_id": "img_001",
  "page_id": "P04",
  "image_role": "section_background",
  "style_profile": "rsm-practice-sharing",
  "source_type": "ai_generated",
  "source_or_prompt": "Generate a realistic wide 16:9 photograph-style image...",
  "usage_boundary": "decorative section background only; not factual evidence",
  "copyright_note": "AI-generated image for presentation background",
  "crop_instruction": "left 55% image area, leave right white panel for title",
  "qa_focus": ["blue_tone", "no_logo", "no_readable_text", "professional_financial_context"]
}
```

## Style Rules By Page Type

### Cover

- 使用金融数据屏、蓝色玻璃建筑、会议/报表/审计场景。
- 图片面积可大，但标题、机构、日期必须清楚可读。
- 不使用抽象渐变、卡通插画、股票 K 线大特写或夸张科技光效。

### Section Divider

- 使用 `section-divider-image-protocol.md`。
- 图片用于建立章节气质，不承载事实。
- 章节编号、章节名和章节问题必须可编辑。

### Body Page Side Image

- 只在案例、实践分享、政策解读或机制解释页使用。
- 透明度或遮罩要保证正文可读。
- 图片不得抢主图表的注意力。
- 正文分析页若已有主图，侧图只能作为弱背景或不要使用。

### Evidence Photo

- 必须有来源和说明，不能用 AI 生成图替代真实证据。
- 不得裁掉影响事实判断的关键区域。
- 涉及客户、合同、人员、地点时必须脱敏。

### Icons

- 图标只用于类别识别，不替代文字。
- 同一页图标风格必须一致：线性或实心二选一。
- 图标颜色使用亮蓝/深蓝/灰，不使用多彩装饰风。
- 一个页面最多 4-6 个图标；超过说明分类过多。

## AI Image Generation Rules

可用场景：

- 封面背景。
- 章节页背景。
- 无事实含义的金融/建筑/数据场景图。

禁止场景：

- 作为真实案例、项目现场、客户资产或监管文件证据。
- 生成具体公司 logo、真实人物、合同文本或可读政策文件。
- 生成可能被误认为真实披露材料的截图。

Prompt 必须包含：

- `realistic photograph-style` 或 `professional corporate photography`
- `cool blue tone`
- `no logos`
- `no readable text`
- `no people close-up`
- `wide 16:9`
- 当前场景：banking、insurance、financial advisory、asset management、regulatory review 等。

## Image Quality QA

- 是否符合当前 visual profile。
- 是否蓝色调、干净、金融专业。
- 是否出现 logo、可读文字、人物特写或暖色广告风。
- 是否与页面主题相关，而不是泛化商务图。
- 是否影响标题或正文可读性。
- 是否记录来源、prompt 和使用边界。
