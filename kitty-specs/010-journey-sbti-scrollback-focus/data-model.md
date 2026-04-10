# Data Model: 010-journey-sbti-scrollback-focus

本轮不新增业务实体。

只新增一个 UI 协调动作：

- `requestSbtiInput()`
  - 所属层：`App`
  - 用途：统一触发 Hero `SBTI` gate 的 scroll / focus / shake / error

Journey 只负责在空值时调用该动作，不负责自行管理输入框状态。
