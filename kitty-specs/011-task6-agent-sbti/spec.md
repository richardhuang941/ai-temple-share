# Feature Specification: Task 6 Agent SBTI

## Background

当前 `Task 6` 仍然在用 `LBTI` 小龙虾人格收尾，但这轮需求已经明确改成 `SBTI`，并且要体现成 Agent 自己的 `SBTI`，不再混用另一套人格体系。

## Goal

- 把 `Task 6` 从 `LBTI` 收尾改成 `Agent SBTI` 收尾。
- 页面内所有用户可见的 `Task 6` 相关文案统一回到 `SBTI` 语义。
- 允许 `Task 6` 根据当前输入的 `SBTI` 展示 Agent 的人格结果；若输入未命中内置库，也要优雅降级。

## Non-goal

- 不接 `sbti.unun.dev` 的运行时接口。
- 不在项目里复刻完整 SBTI 问卷。
- 不改 `Task 1-5` 的主流程结构。

## Functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| FR-001 | `Task 6` 的名称、目的、摘要、阶段文案必须从 `LBTI` 改为 `Agent SBTI`。 | confirmed | 页面不再出现 `LBTI`。 |
| FR-002 | `Task 6` 必须展示一个 Agent 的 `SBTI` 结果，而不是随机小龙虾人格。 | confirmed | 结果来自当前输入的 `SBTI` 或其 graceful fallback。 |
| FR-003 | 对已知 `SBTI` 代码，`Task 6` 需要展示对应的 SBTI 名称和一句简短说明。 | confirmed | 使用本地内置 profile 库。 |
| FR-004 | 对未知 `SBTI` 代码，`Task 6` 需要优雅降级，而不是显示空白或报错。 | confirmed | 显示输入代码和通用说明。 |
| FR-005 | `Journey` 辅助文案和测试断言必须同步更新，不再残留 `LBTI`。 | confirmed | 文案、单测、mission 文档一起更新。 |

## Non-functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| NFR-001 | 继续保持静态页实现，不增加后端依赖。 | confirmed | 所有 SBTI 资料本地化。 |
| NFR-002 | `Task 6` 变化不能破坏现有 autoplay / focus / playback 行为。 | confirmed | timeline 结构和 stage 数量保持稳定。 |
| NFR-003 | 中英文页面都必须保持可读，不出现一半 `SBTI` 一半 `LBTI` 的混杂。 | confirmed | copy source 和任务内容同步更新。 |

## Constraints

| ID | Constraint | Status | Notes |
| --- | --- | --- | --- |
| C-001 | 继续落到 `feature/004-header-density-interaction-share-polish`。 | confirmed | 这轮仍在当前 feature branch 收口。 |
| C-002 | 继续沿用 Kitty mission 流程，不走裸改无记录。 | confirmed | 为这轮新建 `011` mission。 |

## Acceptance Signals

- `Task 6` 的用户可见文案全部切成 `Agent SBTI`。
- 输入常见 `SBTI`（如 `CTRL`）后，`Task 6` 能显示对应人格结果。
- 输入未知 `SBTI` 时，`Task 6` 仍能正常展示 fallback。
- `npm run test` 和 `npm run build` 通过。
