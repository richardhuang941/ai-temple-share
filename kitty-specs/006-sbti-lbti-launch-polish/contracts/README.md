# Contracts

本轮没有新增外部 API 或 JSON schema 合约。

需要保持的内部契约有：

1. `TaskMilestone[]` 现在必须能承载 `task-6`
2. `getSimulationSeedResult()` 必须为同一 session 输出稳定的 `lbtiProfile`
3. Journey 启动逻辑必须先经过 `SBTI` gate
