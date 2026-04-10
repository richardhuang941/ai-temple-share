# Feature Specification: Open Source Path Sanitization

## Background

仓库目前没有发现密钥类 blocker，但 `kitty-specs` 文档里保留了大量本机绝对路径，例如 `/Users/<local-user>/...`。这些路径来自早期本地规划与参考资料追溯，对开源读者没有运行价值，反而会暴露用户名、本地目录结构和失效的本地引用。

## Goal

- 清理 `kitty-specs` 中所有不该公开的本机绝对路径。
- 保留文档语义，让开源读者仍能理解上下文。
- 不改业务代码和运行逻辑。

## Non-goal

- 不重写整套 mission 文档内容。
- 不修改 `src/` 业务实现。
- 不处理非 `kitty-specs` 范围的文案优化。

## Functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| FR-001 | `kitty-specs` 中所有 `/Users/<local-user>/...` 绝对路径都必须被清理。 | confirmed | 包括 plan/spec/research/tasks 等文档。 |
| FR-002 | 指向仓库内文件的引用应改成相对仓库路径。 | confirmed | 例如 `src/...`、`kitty-specs/...`。 |
| FR-003 | 指向本地下载文件的引用应改成通用描述，不再保留本机路径。 | confirmed | 如 Clawvard 本地参考页。 |
| FR-004 | 指向本地私有工作区或外部本地 repo 的引用应改成通用来源描述。 | confirmed | 如本地 skills repo。 |
| FR-005 | 清理后需要重新扫描，确认 `kitty-specs` 中不再残留本机 `Users` 绝对路径。 | confirmed | 作为验收门禁。 |

## Non-functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| NFR-001 | 不影响现有应用 build / test。 | confirmed | 文档层变更不应破坏工程。 |
| NFR-002 | 清理后的文档仍应保留可读性和上下文。 | confirmed | 不能简单删空。 |
| NFR-003 | 继续按 Kitty mission 流程收口。 | confirmed | 新建 `014` mission。 |

## Constraints

| ID | Constraint | Status | Notes |
| --- | --- | --- | --- |
| C-001 | 只修改 `kitty-specs/**`。 | confirmed | 不碰业务代码。 |
| C-002 | 继续在 `feature/004-header-density-interaction-share-polish` 收口。 | confirmed | 不切 landing branch。 |

## Acceptance Signals

- `rg -n "/Users/${USER}/" kitty-specs` 不再返回结果
- 文档中的仓库内路径改成相对路径
- 本地下载参考页改成通用描述
