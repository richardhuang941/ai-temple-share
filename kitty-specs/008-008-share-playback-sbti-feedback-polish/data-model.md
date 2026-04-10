# Data Model: 008-008-share-playback-sbti-feedback-polish

本轮不新增业务实体，主要新增两个 UI 级状态信号：

- `sbtiShakeSignal`
  - 所属层：`App`
  - 用途：空 `SBTI` 点击 watch action 时触发一次性 shake/focus 反馈

- `timeline.isAutoplay`
  - 已存在
  - 本轮继续复用，用于驱动 floating 播放/暂停控件的文案与状态

补充说明：

- 分享区不新增字段，只调整可见 copy 的渲染策略
- Journey 的 floating 控件不创建独立状态源，直接调用现有 `setAutoplay`
