# Contracts

本轮没有新增外部 API 合约。

内部契约：

- `App` 暴露统一的 `requestSbtiInput`
- `JourneySection` 在空 `SBTI` 时调用该动作
- `HeroSection` 继续消费 `sbtiShakeSignal` 与 `sbtiError`
