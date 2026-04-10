# Feature Specification: Repo Rename Pages Alignment

## Background

仓库已改名为 `ai-temple-share`，对应的 GitHub Pages 地址也切到了 `https://richardhuang941.github.io/ai-temple-share`。当前发布配置本身已经通过 `GITHUB_REPOSITORY` 动态推导 Pages base，但仓库内仍残留旧 repo 名、旧本地存储 key、旧分享链接和旧验收文档描述，容易让对外地址与项目内部配置不一致。

## Goal

- 对齐 repo rename 带来的项目名、持久化 key 与公开分享链接。
- 保持 GitHub Pages workflow 与 Vercel 默认构建都可用。
- 更新相关 mission 文档中的旧 repo 名和旧 Pages base 说明。

## Non-goal

- 不重做部署流程。
- 不改现有页面交互与视觉。
- 不处理与 repo rename 无关的文案润色。

## Functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| FR-001 | 项目 package name 应从旧 repo 名对齐为 `ai-temple-share`。 | confirmed | 包括 `package.json` 与 `package-lock.json`。 |
| FR-002 | locale 持久化 key 应改成新的 repo 名空间。 | confirmed | 避免继续写入旧 `claws-temple-home` key。 |
| FR-003 | 页面内公开挑战链接应改成 `https://richardhuang941.github.io/ai-temple-share`。 | confirmed | 分享 payload 与可见链接保持一致。 |
| FR-004 | 与 GitHub Pages 相关的验收/说明文档应改成新的 repo 名和 base。 | confirmed | 重点覆盖 mission `013`。 |
| FR-005 | 仓库内不应继续残留 `richardhuang941/claws-temple-home` 或 `/claws-temple-home/` 这类旧 Pages 标识。 | confirmed | 历史文档中如属当前公开地址描述，也要一起对齐。 |

## Non-functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| NFR-001 | 不影响现有 `npm run test` 与 `npm run build`。 | confirmed | 变更应保持静态站可构建。 |
| NFR-002 | GitHub Pages 动态 base 逻辑继续兼容不同 repo 名。 | confirmed | 不回退为写死仓库名。 |
| NFR-003 | 继续按 Kitty mission 流程收口。 | confirmed | 新建 `015` mission。 |

## Constraints

| ID | Constraint | Status | Notes |
| --- | --- | --- | --- |
| C-001 | 继续在 `feature/004-header-density-interaction-share-polish` 收口。 | confirmed | 不切 landing branch。 |
| C-002 | 不破坏 Vercel 作为默认发布平台的构建兼容性。 | confirmed | 只做对齐，不做平台切换。 |
