# Research Notes: 012 Agent SBTI Decouple

## Findings

- 当前 `Task 6` 的 `Agent SBTI` 是通过 `getLocalizedLongpageContent(locale, sbtiValue)` 把 Hero 输入一路传进内容层后生成的。
- Agent 自己的稳定信息已经存在于 seed 体系里，包括 faction、score、typeLabel、axes 等。
- 因为 `Task 6` 是 Agent 结果面，所以最合适的输入应当是 Agent 画像，而不是用户输入。

## Decision

- 以 Agent 的既有画像数据推导 `Agent SBTI`，让 `Task 6` 重新回到 Agent 侧语义。
