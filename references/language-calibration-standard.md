# Language Calibration Standard

用于把受众专业程度、证据强度、判断力度和整份 deck 的语气弧线统一起来。写标题、结论条、执行摘要、建议和会议纪要口径时读取本文件。

## Audience Expertise Level

在 `brief.json` 中记录：

```json
{
  "audience_expertise_level": "generalist"
}
```

| Level | Use when | Language rule |
|---|---|---|
| `expert` | CFO、投委会、专业金融/风控/财务团队 | 可使用专业术语，但首次出现仍需中文全称 |
| `informed` | 管理层、董事会中有金融背景成员 | 控制术语密度，核心指标附短解释 |
| `generalist` | 非金融背景董事、高管、跨部门读者 | 首次出现专业术语必须加通俗解释，标题避免缩写 |

示例：

- `拨备覆盖率（即银行为不良贷款预留的缓冲资金占比）`
- `市净率（PB，反映市场对账面净资产的定价倍数）`

## Assertion Strength Matrix

| Evidence credibility | Recommended wording | Avoid |
|---|---|---|
| `L1-audited` | `经审计确认...为/达到/录得` | 无需额外降级，但仍避免预测性绝对措辞 |
| `L2-official` | `根据披露数据...呈现/达到/录得` | `必然`、`一定` |
| `L3-estimated` | `据行业估算/项目组测算...约为/预计在` | 把估算写成事实：`是`、`已经` |
| `L4-anecdotal` | `基于管理层反馈/初步观察...可能/有待验证` | 所有确定性表达 |

若 `freshness_tier` 为 `stale` 或 `unknown`，再降一级判断强度。

## Tone Arc

`partner-ready` 以上建议在 `storyline_map.json` 或 `language_rewrite_review` 中记录 `tone_arc`：

1. `opening`：紧迫 + 权威。说明客户面临的问题和决策窗口。
2. `diagnosis`：冷静 + 精确。用数据和对标解释事实。
3. `analysis`：深度 + 客观。拆解驱动、机制和替代解释。
4. `recommendation`：果断 + 建设性。给出路径、前提和下一步。
5. `closing`：信心 + 行动。明确授权事项、复盘节奏或落地路径。

不要让每页都使用同一种“强结论”语气；语气应服务章节角色。

## Output

在 `review_report.json` 中增加：

```json
{
  "language_calibration_review": {
    "audience_expertise_level": "generalist",
    "assertion_strength_alignment": "pass",
    "tone_arc": "warning",
    "issues": [
      {
        "page": "P04",
        "issue": "标题使用 NPL 缩写但未解释",
        "fix": "首次出现改为 不良贷款率（NPL）"
      }
    ]
  }
}
```
