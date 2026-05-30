# Scene Library Updater

用于在用户明确要求“保存为模板”“以后复用”“把这个项目经验沉淀下来”时，从完成项目中提取可复用模式。不要自动修改场景库，除非用户要求。

## What To Extract

- 新场景或场景变体。
- 叙事原型。
- 模块序列。
- 指标定义或计算口径。
- 页面版式。
- 视觉系统调整。
- 审校规则。

## Learning Protocol

1. 读取最终 PPT、`brief.json`、`outline.json`、`design_system.json`、`review_report.json`。
2. 提取与当前场景不同的复用点。
3. 询问用户是否保存。
4. 写入对应参考文件或新增场景配置。

## Suggested Scene Variant Format

```yaml
scene_id: asset-valuation-rental-housing
base_scene: asset-valuation
scene_name: 租赁住房资产收储估值
narrative_archetype: waterline-defense
module_sequence:
  - transaction_context
  - valuation_methods
  - cashflow_waterfall
  - sensitivity
  - negotiation_boundary
visual_profile: pitchbook
notes:
  - 适用于收储对价谈判
```

## User Confirmation

```text
我可以把本项目沉淀为一个可复用场景：
- 场景名称：[名称]
- 可复用模块：[列表]
- 新增指标/图表：[列表]

是否保存到 skill 目录？
```
