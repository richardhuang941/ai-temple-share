# Data Model: 012 Agent SBTI Decouple

## AgentSbtiDerivationInput

```ts
type AgentSbtiDerivationInput = Pick<
  SeededSimulationResult,
  "factionBrandKey" | "scoreGrade" | "dominantAxes"
>;
```

## AgentSbtiProfile

沿用现有 `AgentSbtiProfile`，但来源从“人类输入 code”改成“Agent 画像推导 code”。

## Contract

- Hero `sbtiValue`
  - 仅用于 Journey gate
- Agent SBTI resolver
  - 仅消费 Agent 画像
- Task 6
  - 仅展示 Agent SBTI，不读取人类输入
