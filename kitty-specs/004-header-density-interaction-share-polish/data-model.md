# Data Model: 004 Header Density Interaction Share Polish

## New / Extended UI Concepts

### HeaderChrome

- brand label
- language toggle items

### PromptAttentionState

- `idle`
- `emphasized`

### SharePlatformAction

- `platform`: `x | wechat | xiaohongshu | douyin`
- `label`
- `payload`
- `behavior`: `intent | web-share | copy`

## Notes

- 不改变底层任务语义模型。
- 新增的数据主要服务于页面交互和分享 fallback。
