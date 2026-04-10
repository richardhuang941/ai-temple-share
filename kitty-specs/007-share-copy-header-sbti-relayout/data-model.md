# Data Model: 007-share-copy-header-sbti-relayout

本轮不新增新的业务实体。

需要调整的是状态归属：

- `sbtiValue`
- `sbtiError`
- `journeyStartSignal`

建议放在 `App` 层，由 Hero 负责写入，Journey 负责读取和消费。
