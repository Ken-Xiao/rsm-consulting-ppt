# ADR-0011 · 档位下限件的 stage 归属：Layer 1b 排期表

- 状态：已采纳
- 日期：2026-10-04
- 关联：ADR-0010（Layer 0 权威清单与并集语义）、DEBT「D10」节、经验 D5

## 背景

A 轮（ADR-0010）确立：本轮加载计划 = Layer 0 清单 ∪ Decision Router 下限列 ∪ 触发件，且**下限件必须逐件列入计划、按 stage 排期**。但该义务没有对应的排期权威：Layer 1 stage 表只覆盖部分下限件。实测把五个档位下限件取并集共 **29 件**，Layer 0 覆盖 6 件、Layer 1 覆盖 10 件，**19 件无 stage 归属**。

后果（配对验证实证）：执行者只能从散落表述自行推断 stage，产生与真实归属冲突的排期（`client-delivery-standard` 被排到「S2 前」而非 S6；`editability-check` 排到 S2 而非 S5），并使「逐件列明」的校验无从下手。

## 决策

1. `progressive-loading-protocol` 新增 **Layer 1b「档位下限件的 stage 归属」表**：19 件逐件给出 stage 归属与适用档位，是下限件排期的**唯一权威**。
2. Layer 0 裁决段补一句：**Layer 1 与 Layer 1b 都查不到的档位下限件属本文件缺陷，应补入而非由执行者自行推断**（把「查不到」从执行者自由裁量改为文件缺陷信号）。
3. Execution Rule 第 3 步：加载 Layer 1 本 stage 件 + Layer 1b 为该 stage 排期的下限件。
4. 已在 Layer 1 各 stage 行的下限件沿用 Layer 1 排期，不在 Layer 1b 重复（避免双口径）。

## 被否决的方案

- **把下限件并入 Layer 1 各行**：Layer 1 的语义是「进入 stage 才读」，下限件的语义是「必须列入计划、按 stage 排期」，两者轴不同；混表会让「下限件是否必须在计划中列明」这一区别消失。
- **在 INDEX 的「何时读」列补 stage**：INDEX 的「何时读」是条件触发式描述（面向定位），不是 stage 排期表；且 A 轮已确立 INDEX 不做必读性裁决，把排期放进去会重新制造双口径。

## 验证

2 prompt × 2 spec × 3 盲评 judge（位置交换）：P1（client-ready 加载计划）3-0 clear×3；P2（审计违规草案）3-0 clear×3。合计 6-0 keep。judge 一致以「是否援引 Layer 1b 且排期与之一致」作为判据 2 的落点。

## 教训

登记「缺口」类债务时，口径必须取到**全量**（全部档位、全部成员）。D10 初次登记只查了 client-ready 档、写为 5 件，实施时实测为 19 件——低估 3 倍以上。缺口的边界应在登记时就用脚本穷举，而不是抽查一个切片。
