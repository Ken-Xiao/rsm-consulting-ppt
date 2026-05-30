# Quality Dashboard Standard

用于把逻辑、内容、呈现和语言审校结果转成合伙人可快速读取的仪表盘。完整 review、合伙人审稿、客户交付前读取本文件。

## Logic Health Dashboard

将 7 道逻辑门按章节输出为 2x4 或表格热力图。状态使用：

- `green`：通过。
- `yellow`：有 warning，不阻塞 partner-ready。
- `red`：critical 或 major，阻塞 client-ready。
- `gray`：不适用或缺少 artifact。

```json
{
  "logic_health_dashboard": {
    "status": "yellow",
    "gates": [
      "client_question",
      "deck_answer",
      "chapter_answer",
      "page_claim",
      "evidence_match",
      "management_implication",
      "decision_path"
    ],
    "chapters": [
      {
        "chapter_id": "C01",
        "chapter_title": "整体结果",
        "scores": {
          "client_question": "green",
          "deck_answer": "green",
          "chapter_answer": "green",
          "page_claim": "yellow",
          "evidence_match": "green",
          "management_implication": "yellow",
          "decision_path": "gray"
        },
        "top_issue": "P06 管理含义不足"
      }
    ]
  }
}
```

## Deck Quality Radar

在 `quality_scorecard` 后增加四维雷达图数据；总分不替代 scorecard，只帮助合伙人定位短板。

| Dimension | Submetrics |
|---|---|
| `logic` | `storyline_coherence`, `evidence_coverage`, `decision_path_clarity` |
| `content` | `data_freshness`, `insight_density`, `source_credibility` |
| `presentation` | `visual_rhythm`, `page_fullness`, `chart_professionalism` |
| `language` | `assertion_evidence_alignment`, `audience_calibration`, `tone_consistency` |

```json
{
  "deck_quality_radar": {
    "logic": 86,
    "content": 82,
    "presentation": 78,
    "language": 88,
    "submetrics": {
      "storyline_coherence": 90,
      "evidence_coverage": 84,
      "decision_path_clarity": 82,
      "data_freshness": 75,
      "insight_density": 85,
      "source_credibility": 86,
      "visual_rhythm": 76,
      "page_fullness": 80,
      "chart_professionalism": 78,
      "assertion_evidence_alignment": 90,
      "audience_calibration": 85,
      "tone_consistency": 88
    },
    "top_strength": "判断-证据匹配",
    "top_gap": "视觉节奏"
  }
}
```

## Rules

- `red` gate 或 radar 任一维度低于 70，不得标记为 `client-ready`。
- `deck_quality_radar` 可用文字表格、JSON 或 PPT 附录页呈现；不要为了仪表盘牺牲正文页。
- 合伙人审稿版优先展示 dashboard 摘要；客户交付版通常不展示内部评分，除非用户要求。
