# Feature Specification: Journey SBTI Scrollback Focus

**Mission**: `010-journey-sbti-scrollback-focus`  
**Mission Type**: `software-dev`  
**Status**: `draft-ready-for-plan`

## Summary

当用户已经滑到 Journey 区，但还没填写 `SBTI` 就点击“填好 SBTI 后开始模拟”时，当前页面只会因为按钮 disabled 而没有反馈。这轮要把行为改成：点击后把用户带回 Hero 的 `SBTI` 输入框，并自动 focus，同时复用已有 shake/error 提示。

## Goals

- Journey 开始按钮在未填写 `SBTI` 时仍可点击。
- 未填写 `SBTI` 时点击按钮，页面滚回 Hero 的 `SBTI` 输入区并 focus 输入框。
- 复用现有 shake/error 引导，不新增第二套提示方式。
- 已填写 `SBTI` 时 Journey 的开始逻辑保持不变。

## Non-Goals

- 不改 `SBTI` 存储逻辑。
- 不改 Hero 自己的 watch CTA 成功路径。
- 不改 Task 流程与 autoplay 逻辑。

## Functional Requirements

| ID | Requirement | Status | Acceptance Criteria |
|---|---|---|---|
| FR-001 | Journey 开始按钮在空 `SBTI` 时不能只是 disabled。 | confirmed | 用户点击按钮后会收到明确反馈。 |
| FR-002 | 空 `SBTI` 时点击 Journey 开始按钮，页面必须滚回 Hero 输入区。 | confirmed | Hero `SBTI` 输入框被带回可视区。 |
| FR-003 | 空 `SBTI` 时点击 Journey 开始按钮，焦点必须落在 Hero `SBTI` 输入框。 | confirmed | `document.activeElement` 为 Hero 输入框。 |
| FR-004 | Hero 现有 shake/error 提示必须复用到 Journey 的空值点击路径。 | confirmed | 触发 scrollback 时仍会出现 shake/error。 |
| FR-005 | 已填写 `SBTI` 时，Journey 开始按钮继续正常启动模拟。 | confirmed | 正常进入 autoplay / advance 流程。 |

## Non-Functional Requirements

| ID | Requirement | Status | Acceptance Criteria |
|---|---|---|---|
| NFR-001 | 交互改动不能破坏现有 Hero watch CTA 行为。 | confirmed | Hero watch CTA 测试继续通过。 |
| NFR-002 | 构建和测试必须继续通过。 | confirmed | `npm run test` 与 `npm run build` 为 green。 |

## Constraints

| ID | Constraint | Status | Acceptance Criteria |
|---|---|---|---|
| C-001 | 继续使用 `React + Vite + TypeScript`。 | confirmed | 不引入新框架。 |
| C-002 | 目标分支继续是 `feature/004-header-density-interaction-share-polish`。 | confirmed | mission 元数据与当前分支一致。 |

## Acceptance Criteria

- 未填 `SBTI` 时，从 Journey 点开始按钮会滚回 Hero 并 focus 输入框。
- Hero 的 shake/error 提示会同步出现。
- 已填 `SBTI` 时 Journey 继续正常启动。
- `npm run test` 与 `npm run build` 通过。
