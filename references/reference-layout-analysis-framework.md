# Reference Layout Analysis Framework

用于把外部 PPT 版式样本拆解成可复用的页面家族、视觉 token 和像素级复刻约束。用户提供 `ppt版式/`、参考 deck、截图、PDF 或 PPTX 时必须读取本文件。

## Core Principle

不要只说“参考这个风格”。必须把参考样本拆成可执行的结构：

```text
reference deck
  -> slide inventory
  -> layout anatomy
  -> design tokens
  -> chart/table grammar
  -> page-family mapping
  -> pixel replication spec
  -> scenario selection rule
```

## Analysis Output

每套参考版式生成或维护一个 `reference_layout_profile.json`：

```json
{
  "profile_id": "consulting-final-deck",
  "source_path": "assets/reference-layouts/consulting-final-deck",
  "preview_count": 20,
  "best_for": ["client_final_readout", "board_strategy_synthesis", "due_diligence_final_report"],
  "visual_positioning": "tier-1 strategy final deliverable",
  "slide_geometry": {
    "canvas": "1920x1080",
    "aspect_ratio": "16:9",
    "safe_margin_px": 72
  },
  "layout_anatomy": {
    "header": "action title + exhibit number",
    "body_grid": "large evidence area + right/bottom implication layer",
    "footer": "source line + page number"
  },
  "typography": {
    "title": {"role": "action-title", "min_pt": 30, "max_pt": 44},
    "subtitle": {"role": "context-bridge", "min_pt": 16, "max_pt": 22},
    "body": {"role": "exhibit-labels", "min_pt": 12, "max_pt": 20}
  },
  "color_system": {
    "background": "light / white",
    "primary": "deep navy or consulting blue",
    "accent": "single strong highlight color",
    "semantic": ["positive", "negative", "neutral"]
  },
  "page_families": [
    {
      "family_id": "governing_thought",
      "source_preview": "previews/02-02-governing-thought.png",
      "use_when": "top-of-pyramid answer or executive governing thought",
      "required_content": ["client_question", "governing_thought", "top_3_arguments"],
      "replication_notes": ["title must be a full-sentence answer", "top-of-pyramid arguments use numbered blocks"]
    }
  ]
}
```

## Pixel Replication Checklist

做像素级复刻时，逐页检查：

- Canvas: 1920×1080 或等比例 16:9。
- Margins: 左、右、上、下安全边距是否一致。
- Header: 标题位置、行高、字号、字重、编号和装饰线。
- Body grid: 主证据区宽高、卡片数量、列宽、行距、对齐基线。
- Typography: 标题、副标题、标签、脚注字号不随意变化。
- Color: 背景、主色、强调色、灰阶和正负语义色一致。
- Chart grammar: 图表是否使用同类轴线、标签、图例、标注和来源条。
- Table grammar: 表头、行高、边框、斑马纹、强调列和注释位置一致。
- Image treatment: 图片裁切、遮罩、透明度、叠加色块和版权说明一致。
- Density: 有效内容占用面积、主证据尺寸和辅助证据数量一致。

## Required Extraction Fields

每个候选页面家族至少提取：

- `source_deck`
- `source_preview`
- `page_family`
- `business_scene`
- `page_role`
- `logic_relationship`
- `layout_grid`
- `required_content_slots`
- `optional_content_slots`
- `typography_rules`
- `color_rules`
- `chart_table_rules`
- `image_rules`
- `replication_risk`
- `best_rsm_profile_match`

## Usage Rule

参考版式是“候选模板”，不是默认替代 RSM 风格。除非用户明确选择某套参考版式，否则：

1. 先按 `scenario-layout-selector.md` 推荐 1-2 套候选。
2. 在 `layout_analysis_report.json` 中说明推荐原因和适用页面。
3. 让用户确认是否采用。
4. 再进入 HTML preview 或 PPTX 构建。

