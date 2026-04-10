# Research Notes: 008-008-share-playback-sbti-feedback-polish

- 当前分享卡同时渲染 `share-summary-note-block` 和 `share-text-block`，两块都带有几乎相同的挑战句，因此视觉上像重复播报同一句话。
- Journey 已经有 sticky 的“当前聚焦”摘要卡和 `timeline.isAutoplay` 状态，所以新增悬浮播放/暂停更适合复用现有状态，而不是另起一套播放器。
- Hero 的 `SBTI` gate 目前只做了 error text，没有针对空点击的视觉反馈；一次性 shake + focus 会比单纯报错更贴近用户预期。
