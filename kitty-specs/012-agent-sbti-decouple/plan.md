# Implementation Plan: 012 Agent SBTI Decouple

## Goal

修正 `011` 的语义耦合：让人的 `SBTI` 继续只做 gate，而 `Task 6` 独立展示 Agent 自己的 `SBTI`。

## Scope

- 新增基于 Agent 画像的 `Agent SBTI` 推导规则
- 回退内容层里“人类 SBTI 透传到 Task 6”的路径
- 更新 `Task 6` copy 和测试

## Key Decisions

1. `Agent SBTI` 不再从 Hero 输入读取。
2. `Agent SBTI` 由现有 Agent 画像推导：
   - `factionBrandKey`
   - `scoreGrade`
   - 必要时补充 `dominantAxes`
3. 映射规则采用 deterministic local mapping，不引入在线计算。

## Risks

- 如果映射规则过于随意，`Task 6` 会像“随机换了另一个名字”。
- 如果只改 resolver，不改测试，后面很容易再次回归到耦合状态。
- 如果保留旧签名，未来维护者可能又会把人类 `SBTI` 传回内容层。

## Validation

- `npm run test`
- `npm run build`
- 单测验证 `Agent SBTI` 由 Agent 画像推导
- 集成验证 Hero 输入变化不会影响 `Task 6` 的 Agent 结果
