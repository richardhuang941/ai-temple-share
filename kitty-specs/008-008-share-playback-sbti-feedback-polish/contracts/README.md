# Contracts

本轮没有新增外部 API 合约。

内部契约：

- Hero 负责发出 `sbtiShakeSignal`
- Journey 继续以 `timeline.isAutoplay` 作为唯一播放状态源
- Share 可见层只保留一处挑战文案，复制层仍输出完整 payload
