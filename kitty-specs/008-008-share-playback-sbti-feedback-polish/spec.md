# Feature Specification: Share Dedupe, Playback Control, and SBTI Feedback

**Mission**: `008-008-share-playback-sbti-feedback-polish`  
**Mission Type**: `software-dev`  
**Status**: `draft-ready-for-plan`

## Summary

这一轮继续做上线前 polish：

1. 分享卡里同一段战书文案当前出现了两次，需要收成一次可见表达。
2. 自动演示已经有“当前聚焦”信息，但缺少更直接的播放/暂停悬浮控制，PC 和移动端都需要补。
3. 首页 `SBTI` 仍然是“先点按钮再报错”的线性反馈，这次要把空值点击改成输入框 shake + focus，引导用户先填再看。

## Goals

- 分享区用户可见层只保留一处战书挑战文案。
- 复制文案继续可用，但不要求和页面逐字重复显示两遍。
- 自动演示启动后，PC 和移动端都提供显眼的悬浮播放/暂停控制。
- 空 `SBTI` 时点击“观看模拟 Task 1-6 的流程”，输入框会有明确的 shake/focus 反馈。
- 已填写 `SBTI` 时，Hero watch action 继续正常滚动到 Journey 并启动模拟。

## Non-Goals

- 不改 Task 1-6 的任务语义与顺序。
- 不改分享平台接入方式。
- 不恢复 Agent handoff 区块。

## Functional Requirements

| ID | Requirement | Status | Acceptance Criteria |
|---|---|---|---|
| FR-001 | 分享卡中重复的战书挑战文案只保留一处用户可见表达。 | confirmed | 分享卡不会在 note block 和 text block 同时重复同一句挑战话术。 |
| FR-002 | 复制按钮仍可复制完整可分享文本。 | confirmed | CopyButton 继续可用，复制内容仍包含挑战文本与正式链接。 |
| FR-003 | 自动演示开始后，PC 端必须提供悬浮播放/暂停控制。 | confirmed | Journey 当前聚焦区域可直接暂停/恢复 autoplay。 |
| FR-004 | 自动演示开始后，移动端必须提供可见的悬浮播放/暂停控制。 | confirmed | 小屏上存在固定悬浮的播放/暂停按钮。 |
| FR-005 | 空 `SBTI` 时点击观看模拟按钮，不启动 Journey，只触发输入框 shake/focus 反馈。 | confirmed | 点击后 Journey 不开始，输入框出现一次短促 shake，并保留错误提示。 |
| FR-006 | 已填写 `SBTI` 时点击观看模拟按钮，仍然会滚动到 Journey 并开始自动演示。 | confirmed | Hero watch action 成功触发 scroll + start。 |

## Non-Functional Requirements

| ID | Requirement | Status | Acceptance Criteria |
|---|---|---|---|
| NFR-001 | Shake 与 autoplay 控件需要兼容 reduced-motion。 | confirmed | reduced-motion 下不出现强烈位移动画，autoplay 控件仍可正常切换。 |
| NFR-002 | 桌面端和移动端悬浮控件都不能遮挡关键 CTA 或当前任务主体。 | confirmed | 常见 viewport 下悬浮按钮位置不会压住主要阅读内容。 |
| NFR-003 | 构建和测试必须继续通过。 | confirmed | `npm run test` 与 `npm run build` 为 green。 |

## Constraints

| ID | Constraint | Status | Acceptance Criteria |
|---|---|---|---|
| C-001 | 继续使用 `React + Vite + TypeScript`。 | confirmed | 不引入新框架。 |
| C-002 | 目标分支继续是 `feature/004-header-density-interaction-share-polish`。 | confirmed | mission 元数据与当前分支一致。 |

## Acceptance Criteria

- 分享卡可见层不再重复出现同一句挑战文案。
- `SBTI` 空值点击时有 shake/focus 反馈，但不会启动 Journey。
- Journey 启动后，PC 和移动端都能用悬浮按钮暂停/恢复 autoplay。
- `npm run test` 与 `npm run build` 均通过。
