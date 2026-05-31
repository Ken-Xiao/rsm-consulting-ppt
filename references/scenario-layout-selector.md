# Scenario Layout Selector

用于根据项目场景选择默认 RSM visual profile 或 `assets/reference-layouts/` 中的备选版式。进入 `layout_analysis_report.json` 前必须读取本文件。

## Core Principle

先按业务场景选版式，再按页面角色选 page family。不要因为某张图好看就全 deck 套用不匹配的参考风格。

## Selection Matrix

| Scene | Default choice | Backup layouts | Use when |
|---|---|---|---|
| 保险财务结果、银行/保险财报、新准则分析 | `rsm-insurance-results` | `equity-research-earnings-deck`, `consulting-final-deck` | 需要更像投研/业绩快评时用 earnings；需要董事会综合汇报时用 final deck |
| 银行价值创造、经营诊断、VQA/PB/RAROC | `sunong-value-creation` | `consulting-diagnostic-audit-deck`, `consulting-final-deck` | 需要机会排序、2x2、roadmap 时用 diagnostic；需要最终上会建议时用 final |
| 不良处置、行业实践分享、培训/研讨 | `rsm-practice-sharing` | `consulting-final-deck`, `sbir-rd-grant-deck` | 需要章节照片和案例页时用 practice；需要政策/评审式结构时借用 SBIR rubric |
| 尽调、交易建议、投委会材料 | `rsm-insurance-results` or `sunong-value-creation` | `consulting-final-deck`, `consulting-diagnostic-audit-deck` | 最终建议用 final；问题诊断和机会池用 diagnostic |
| 咨询服务方案、能力介绍、RFP | `rsm-practice-sharing` | `consulting-capability-pitch` | 竞争性 pitch、为什么选我们、案例证明、团队和商务 |
| 股研、投研、业绩点评、估值更新 | `rsm-insurance-results` | `equity-research-earnings-deck` | 评级/PT、bridge、estimate revision、risk catalyst |
| 销售、渠道、经营 QBR、CRM 数据 | `rsm-insurance-results` | `crm-funnel-qbr-deck` | stage conversion、pipeline waterfall、forecast accuracy、rep performance |
| 政府项目、研发路线、项目申报、政策评审 | `rsm-global-policy` | `sbir-rd-grant-deck` | rubric mapping、TRL、Gantt、risk register、budget |

## Selection Algorithm

1. 判断项目受众：董事会/管理层/投委会/客户采购/研究投资者/评审专家。
2. 判断页面任务：最终建议、诊断机会、能力 pitch、业绩快评、经营 QBR、项目申请。
3. 选择主视觉：优先 RSM 默认 profile，除非参考版式更贴合页面任务。
4. 选择备选版式：每个 deck 最多混用 2 套参考，避免视觉碎片化。
5. 在 `layout_analysis_report.json` 中记录 `reference_layout_choice`。

## Required Schema

```json
{
  "reference_layout_choice": {
    "primary_visual_profile": "rsm-insurance-results",
    "backup_layouts": ["consulting-final-deck", "equity-research-earnings-deck"],
    "selection_reason": "客户正式交付以 RSM 保险财务报告风为主，业绩桥接页借用 sell-side earnings bridge 结构",
    "pages_using_reference": [
      {
        "page_id": "P06",
        "reference_profile": "equity-research-earnings-deck",
        "reference_page_family": "revenue_bridge",
        "source_preview": "assets/reference-layouts/equity-research-earnings-deck/previews/04-04-revenue-bridge.png",
        "reason": "本页任务是拆解收入 beat/miss，sell-side bridge 结构更清晰"
      }
    ]
  }
}
```

## Mixing Rules

- 同一章节尽量使用同一套参考风格。
- 章节页、封面和页脚 chrome 优先保持 RSM 默认，避免品牌感被冲淡。
- 图表主体可以借用参考版式，但标题、来源、页码应符合当前 RSM profile。
- 若参考版式与 RSM 默认冲突，优先保留 RSM 字体、页脚、来源和品牌元素。

