# Profile Regression Matrix

用于补足四套视觉 profile 的样张回归覆盖。大改视觉、模板、manifest 或构建逻辑后读取本文件。

## Profile Coverage

每个 visual profile 至少有一组可渲染样张。完整回归时覆盖四组：

| Profile | Minimum pages | Must cover |
|---|---:|---|
| `rsm-insurance-results` | 8 | 封面、目录、章节页、图表卡、双期间对比、构成拆解、执行摘要、行动建议 |
| `rsm-practice-sharing` | 6 | 封面、目录、章节页、案例证据、三建议卡、风险网络/机制图 |
| `rsm-global-policy` | 8 | 政策封面、研究框架、深色总结、监管哲学图、司法辖区矩阵、政策框架卡、双准则比较、政策影响三栏 |
| `sunong-value-creation` | 8 | 深蓝封面、KPI 仪表盘、主图诊断、排名条、趋势图、桥接图、情景测算、模块小结 |

## Regression Manifest

每组样张应有 `sample_manifest.json`：

```json
{
  "profile": "sunong-value-creation",
  "sample_pages": [
    {
      "page_id": "sample_01",
      "preset_family": "sunong_dark_cover",
      "template_file": "assets/layouts/layout-sunong-dark-cover.html",
      "purpose": "验证深蓝封面、元数据栏和阅读路径",
      "required_checks": ["title_wrap", "metadata_column", "logo_position"]
    }
  ]
}
```

本 skill 内置四套 profile 样张定义：

- `assets/regression/rsm-insurance-results.sample-manifest.json`
- `assets/regression/rsm-practice-sharing.sample-manifest.json`
- `assets/regression/rsm-global-policy.sample-manifest.json`
- `assets/regression/sunong-value-creation.sample-manifest.json`

生成样张时优先读取这些 manifest，除非用户提供了新的参考模板。

## Screenshot QA

每张样张截图检查：

- 非空白。
- 无 `{{placeholder}}`。
- 无示例文字残留，除非样张明确标注。
- 标题、来源、页码可见。
- 主体区域有效占用面积达标。
- 文字不溢出、不重叠、不贴边。
- 颜色符合当前 visual profile。
- 缩略图下能看出页面类型。

## Contact Sheet QA

每个 profile 输出 contact sheet，并检查：

- 章节节奏：封面/目录/章节/正文/总结是否可辨。
- 同一 page family 连续不超过 4 页。
- 深色页只用于封面、章节或总结。
- 正文页主图和解读区比例稳定。
- 全球政策矩阵不呈现高饱和彩虹感。
- 苏农价值创造页不退化为普通数据表。

## Output

```text
outputs/skill_regression/
├── rsm_insurance_results/
│   ├── sample_manifest.json
│   ├── contact_sheet.png
│   └── regression_report.json
├── rsm_global_policy/
├── sunong_value_creation/
└── rsm_practice_sharing/
```

`regression_report.json` 必须包含：

```json
{
  "profile": "rsm-global-policy",
  "pages_tested": 8,
  "template_files_missing": [],
  "placeholder_leaks": [],
  "visual_issues": [],
  "profile_specific_checks": {
    "segmented_rule": "pass",
    "jurisdiction_color_consistency": "pass",
    "matrix_readability": "pass",
    "dark_summary_contrast": "pass"
  },
  "status": "pass"
}
```

## Mandatory Fail

出现以下任一情况，样张回归不得通过：

- manifest 中 template file 不存在。
- 任一核心样张为空白。
- 正式样张残留 `{{placeholder}}`。
- 来源或页码缺失。
- 正文页关键文字低于最低字号。
- 关键建议、行动计划或来源被整页图片化且无源文件。

## Scripted Checks

在样张回归前先运行：

```bash
node scripts/validate-layout-manifest.mjs
```

生成样张输出后运行：

```bash
node scripts/validate-rsm-deck.mjs outputs/skill_regression/<profile>
```

如果脚本返回 `critical`，不得继续声明该 profile 回归通过；如果返回 `major`，不得标记为 `client-ready`。
