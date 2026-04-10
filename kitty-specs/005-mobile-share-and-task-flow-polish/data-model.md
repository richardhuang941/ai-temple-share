# Data Model: Mobile Share and Task Flow Polish

## Share Surface State

### `AppWakeupState`

用于描述移动端倒计时唤起流程：

| Field | Type | Meaning |
|---|---|---|
| `platform` | `SharePlatformKey` | 目标平台，如 `wechat` |
| `label` | `string` | 用户可见平台名称 |
| `remainingSeconds` | `number` | 倒计时剩余秒数 |

### `VisiblePlatformSet`

根据 surface 决定分享入口集合：

- desktop: `["x"]`
- mobile: `["x", "wechat", "xiaohongshu", "douyin"]`

## Journey View State

### `ExpandedTaskMap`

用于记录哪些已完成 task 处于展开态：

| Field | Type | Meaning |
|---|---|---|
| `taskId` | `boolean` | `true` 表示当前 task 详情展开 |

### `Stage Visual State`

沿用已有 `pending / active / done`，但扩展视觉语义：

- `active`: 带 spinner/loading
- `done`: 展示 proof
- `pending`: 不展开细节，除非 completed task 被手动展开

## Copy Surface

### `ShareSectionCopy`

这轮只保留 text share，因此重要字段变为：

- `eyebrow`
- `title`
- `summary`
- `textBody`
- `challengeLinkLabel`

`imageCaption` 继续保留在模型里做兼容，但本轮不再作为 UI 主路径使用。
