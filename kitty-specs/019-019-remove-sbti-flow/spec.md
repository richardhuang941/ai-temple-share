# Feature Specification: Remove SBTI Flow

## Background

当前首页已经把 `SBTI` 站内测试、本地题库、人格图、Hero gate、Journey 启动限制和 `Task 6` 串成了一整条链路。但这条内容线已经没有流量价值，继续保留只会占首页空间、拉长流程，并让代码里多出一整套与当前主链路无关的内容和测试负担。

## Goal

- 下掉首页和 Journey 中所有用户可见的 `SBTI` 入口、文案和 gate。
- 把模拟流程从 `Task 1-6` 收回到 `Task 1-5`。
- 移除站内 `SBTI` 测试面板、本地题库、图片资源和相关测试。
- 保持首页主链路仍然成立，用户可以直接观看 `Task 1-5` 模拟。

## Non-goal

- 不新增新的测试体系来替代 `SBTI`。
- 不重写 `Task 1-5` 的主叙事。
- 不处理历史 Kitty mission 的归档清理，本轮只处理运行中的产品代码和新 mission 文档。

## Functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| FR-001 | 首页 Hero 不再展示 `SBTI` 输入框、去测入口或相关错误提示。 | confirmed | 直接让 Hero 更轻。 |
| FR-002 | “观看模拟” CTA 不再依赖 `SBTI` 前置输入，点击即可启动流程。 | confirmed | Journey 也要同步去 gate。 |
| FR-003 | 页面流程从 `Task 1-6` 改回 `Task 1-5`，不再展示 `Task 6 / Agent SBTI`。 | confirmed | 文案、标题、timeline 全同步。 |
| FR-004 | 站内 `SBTI` assessment 组件、题库、算分逻辑和人格海报不再参与页面运行。 | confirmed | 允许物理删除。 |
| FR-005 | 分享区、Journey 区和测试用例中不再出现 `SBTI` 相关可见文案。 | confirmed | 避免残留。 |

## Non-functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| NFR-001 | `npm run test` 与 `npm run build` 必须通过。 | confirmed | 删链路后要补回归。 |
| NFR-002 | 删除后的页面不能出现死引用、无用 import 或失效资源。 | confirmed | 需要顺手扫 unused 代码。 |
| NFR-003 | 继续按 Kitty mission 流程收口。 | confirmed | 新建 `019` mission。 |

## Constraints

| ID | Constraint | Status | Notes |
| --- | --- | --- | --- |
| C-001 | landing branch 继续是 `codex/oss-sanitize-pages-rename`。 | confirmed | 不直接落 `main`。 |
| C-002 | 这轮允许直接删除 `SBTI` 相关代码和静态资源。 | confirmed | 不需要再走 deprecated 过渡。 |
| C-003 | 不影响首页分享和 Journey 自动播放的现有交互。 | confirmed | 只去 gate，不伤主链路。 |
