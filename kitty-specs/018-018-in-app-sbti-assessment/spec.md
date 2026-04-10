# Feature Specification: In-App SBTI Assessment

## Background

当前首页的 `SBTI` gate 仍然依赖跳转到外部站点测试，再把结果手动带回输入框。这条链路在移动端尤其割裂，而且外部测试站本身已经把题库、人格库、算分逻辑和人格海报都放在前端静态资源里，具备本地化到我们项目内的条件。

## Goal

- 在站内完成 `SBTI` 测试，不再依赖外跳。
- 桌面端用弹层完成测试，移动端用全屏页面式体验完成测试。
- 用户完成测试后，结果自动回填首页 Hero 的 `SBTI` 输入位，并可立即继续 Journey。
- 把外部站的人格图和结果描述一起本地化到项目中。

## Non-goal

- 不做账号体系或云端保存历史测试记录。
- 不改当前 `Task 1-6` 的主叙事和模拟状态机。
- 不把整个外部站的营销文案和独立首页完整复刻进来。

## Functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| FR-001 | 首页 `SBTI` 获取方式必须支持站内测试入口，不再强依赖跳转外站。 | confirmed | 手填入口仍保留。 |
| FR-002 | 桌面端点击测试入口时，应以 modal / overlay 形式展示答题流程。 | confirmed | 保持首页上下文连续性。 |
| FR-003 | 移动端点击测试入口时，应以全屏页面式体验展示答题流程。 | confirmed | 不强行塞进小弹窗。 |
| FR-004 | 站内测试必须复用外部站同一套题库、人格映射和算分逻辑。 | confirmed | 避免产生另一套结果体系。 |
| FR-005 | 站内测试结果页必须能展示对应 `SBTI` 人格形象、人格名和简介。 | confirmed | 形象资源需本地化。 |
| FR-006 | 测试完成后，结果必须自动回填 Hero 的 `SBTI` 输入框。 | confirmed | 无需手工复制。 |
| FR-007 | 回填完成后，用户应能直接继续当前页的 Journey 流程。 | confirmed | 不重置现有页面状态。 |

## Non-functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| NFR-001 | `npm run test` 与 `npm run build` 必须持续通过。 | confirmed | 新增 UI 和内容后需补回归。 |
| NFR-002 | `SBTI` 题库和人格海报不得继续依赖运行时第三方资源。 | confirmed | 需要本地静态化。 |
| NFR-003 | 继续按 Kitty mission 流程收口。 | confirmed | 新建 `018` mission。 |

## Constraints

| ID | Constraint | Status | Notes |
| --- | --- | --- | --- |
| C-001 | 当前 landing branch 仍为 `codex/oss-sanitize-pages-rename`。 | confirmed | 不直接落 `main`。 |
| C-002 | 手填 `SBTI` 能力要保留，不得被测试入口完全替换。 | confirmed | 用户可跳过测试手动输入。 |
| C-003 | 现有 Hero / Journey gate 的 error、shake、focus 交互不能回归。 | confirmed | 新测试流只增强，不破坏。 |
