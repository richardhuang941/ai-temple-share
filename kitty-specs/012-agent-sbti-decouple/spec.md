# Feature Specification: Agent SBTI Decouple

## Background

`011` 把 `Task 6` 改成了 `Agent SBTI`，但实现上直接复用了 Hero 里的人类 `SBTI` 输入，语义仍然不对。人的 `SBTI` 只能代表用户自己，不能直接等价成 Agent 的人格结果。

## Goal

- 把人的 `SBTI` 和 `Agent SBTI` 正式解耦。
- 保留人的 `SBTI` 作为 Journey 启动 gate。
- 让 `Task 6` 改为根据 Agent 自己的画像结果推导 `Agent SBTI`。

## Non-goal

- 不改 Hero / Journey 的 `SBTI` gate 交互。
- 不接入 `sbti.unun.dev` 的在线问卷或接口。
- 不修改 `Task 1-5` 主流程。

## Functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| FR-001 | Hero 中的人类 `SBTI` 输入只能作为用户 gate，不得再驱动 `Task 6`。 | confirmed | 需要移除内容层的人类 `SBTI` 透传。 |
| FR-002 | `Task 6` 必须由 Agent 自己的画像结果推导出 `Agent SBTI`。 | confirmed | 基于现有 seed / faction / grade / axes。 |
| FR-003 | `Agent SBTI` 的推导必须稳定且可复现。 | confirmed | 同一 session / seed 下结果一致。 |
| FR-004 | `Task 6` 的文案必须明确区分“用户的 SBTI”和“Agent 的 SBTI”。 | confirmed | 避免再次混淆。 |
| FR-005 | 测试必须覆盖“人类 SBTI 变化不会影响 Agent SBTI”这层解耦。 | confirmed | 至少在 unit / integration 中覆盖。 |

## Non-functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| NFR-001 | 继续保持静态页，不增加后端依赖。 | confirmed | 纯本地推导。 |
| NFR-002 | 不破坏当前 30 个测试的绿灯状态。 | confirmed | 回归必须通过。 |
| NFR-003 | 中英文文案都要同步语义修正。 | confirmed | 不留中英漂移。 |

## Constraints

| ID | Constraint | Status | Notes |
| --- | --- | --- | --- |
| C-001 | 继续在 `feature/004-header-density-interaction-share-polish` 收口。 | confirmed | 不切换 landing branch。 |
| C-002 | 继续走 Kitty mission 流程。 | confirmed | 新建 `012` mission。 |

## Acceptance Signals

- `App` / `content` 不再把人的 `SBTI` 传给 `Task 6`
- `Task 6` 仍然能稳定显示 `Agent SBTI`
- 改变输入框里的人类 `SBTI`，不会改变 `Task 6` 的 `Agent SBTI`
- `npm run test` 和 `npm run build` 通过
