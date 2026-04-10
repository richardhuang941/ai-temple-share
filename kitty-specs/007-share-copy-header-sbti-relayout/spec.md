# Feature Specification: Share Copy, Header, and SBTI Relayout

**Mission**: `007-share-copy-header-sbti-relayout`  
**Mission Type**: `software-dev`  
**Status**: `draft-ready-for-plan`

## Summary

这一轮是对 `006` 的上线前收口：

1. 战书分享区继续简化，尽量贴近 Clawvard 参考页的“单卡 + 少量信息”节奏。
2. 挑战链接改成正式部署地址 `https://claws-temple-home.vercel.app`。
3. 战书文案去掉重复分数表达，不再在同一段里把分数和等级说两三遍。
4. Header 左侧不再使用借用 logo，只保留文字品牌。
5. `SBTI` 输入不再放在 Journey 区，而是成为“观看模拟 Task1-6 的流程”按钮的前置输入。

## Goals

- 分享区去掉外层可见大小标题，视觉更接近参考页。
- 分享区挑战链接统一为 `https://claws-temple-home.vercel.app`。
- 战书可见文案和复制文案都要去掉重复分数表达。
- Header 只保留文字品牌，不再显示当前 shield logo。
- `SBTI` 输入迁移到 Hero 区，并作为观看模拟按钮的前置条件。
- Hero 触发观看模拟时，在 `SBTI` 合法的前提下滚动到 Journey 并启动流程。

## Non-Goals

- 不改 `Task 1-6` 的业务语义。
- 不恢复 `AgentPromptSection`。
- 不接新后端或新分享 SDK。

## Functional Requirements

| ID | Requirement | Status | Acceptance Criteria |
|---|---|---|---|
| FR-001 | 分享区不再显示可见的外层小标题和大标题。 | confirmed | share section 内无可见 `SectionHeading`。 |
| FR-002 | 挑战链接必须替换为 `https://claws-temple-home.vercel.app`。 | confirmed | share UI 与 copy payload 都使用新链接。 |
| FR-003 | 战书文案不能重复表达同一份分数/等级信息。 | confirmed | 复制文案与卡片主文案中不再同时出现多次分数描述。 |
| FR-004 | Header 左侧不再显示当前 logo SVG。 | confirmed | 只保留文字品牌。 |
| FR-005 | `SBTI` 输入必须从 Journey 区迁移到 Hero 区。 | confirmed | Journey 区不再出现 `SBTI` 输入框。 |
| FR-006 | `SBTI` 输入必须成为“观看模拟 Task1-6 的流程”按钮的前置条件。 | confirmed | Hero 中未填写 SBTI 时点击观看按钮不启动模拟。 |
| FR-007 | 填写 SBTI 后点击观看按钮，页面必须滚动到 Journey 并开始模拟。 | confirmed | Hero watch action 成功触发 hash/scroll + Journey start。 |

## Non-Functional Requirements

| ID | Requirement | Status | Acceptance Criteria |
|---|---|---|---|
| NFR-001 | 分享区精简后仍要保持可复制、可分享。 | confirmed | CopyButton 和社媒入口继续可用。 |
| NFR-002 | `SBTI` 状态迁移后不能破坏现有 autoplay / focus 逻辑。 | confirmed | start 后焦点推进仍正常。 |
| NFR-003 | 构建和测试必须继续通过。 | confirmed | `npm run test` 与 `npm run build` 为 green。 |

## Constraints

| ID | Constraint | Status | Acceptance Criteria |
|---|---|---|---|
| C-001 | 继续使用 `React + Vite + TypeScript`。 | confirmed | 不引入新框架。 |
| C-002 | 目标分支继续是 `feature/004-header-density-interaction-share-polish`。 | confirmed | mission 元数据与当前分支一致。 |

## Acceptance Criteria

- Share card 简化完成，且 challenge link 改为 `https://claws-temple-home.vercel.app`。
- Header 去掉 logo，只保留文字品牌。
- `SBTI` 输入迁移到 Hero，Journey 中不再有输入框。
- Hero watch action 在 SBTI 已填写时滚动到 Journey 并启动流程。
- `npm run test` 与 `npm run build` 均通过。
