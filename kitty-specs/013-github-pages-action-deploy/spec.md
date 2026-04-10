# Feature Specification: GitHub Pages Action Deploy

## Background

当前默认发布平台仍然是 `Vercel`，但我们希望额外补一条 `GitHub Pages` 的静态站发布路径，作为可用的备用分发面。项目本身是纯静态 `React + Vite` 站点，适合通过 `GitHub Actions` 构建 `dist/` 后发布到 Pages。

## Goal

- 保留 `Vercel` 作为默认发布平台。
- 为仓库增加 `GitHub Pages` 的 `Actions` 部署能力。
- 确保 `GitHub Pages` 构建时自动使用 repo 子路径 `base`，不影响 `Vercel` 默认根路径构建。

## Non-goal

- 不替换或关闭 `Vercel`。
- 不修改页面业务逻辑。
- 这轮不接入自定义域名和 `CNAME`。

## Functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| FR-001 | 仓库必须新增 `GitHub Pages` workflow，并通过 `GitHub Actions` 构建和发布静态产物。 | confirmed | 使用官方 Pages actions。 |
| FR-002 | `Vite` 必须在 `GitHub Pages` 构建时自动切换到 repo 子路径 `base`，默认构建仍保持 `/`。 | confirmed | 不能影响 `Vercel`。 |
| FR-003 | workflow 必须默认监听 `main`，并支持手动触发。 | confirmed | 方便正式发布和手动重放。 |
| FR-004 | Pages workflow 只发布 `dist/` 产物，不引入额外后端依赖。 | confirmed | 纯静态。 |
| FR-005 | 配置完成后，本地 `npm run build` 仍然通过。 | confirmed | 作为回归门禁。 |

## Non-functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| NFR-001 | `Vercel` 默认部署路径不能被破坏。 | confirmed | 默认 `base` 保持 `/`。 |
| NFR-002 | GitHub Pages 配置需要尽量使用官方推荐 actions 组合。 | confirmed | `configure-pages` / `upload-pages-artifact` / `deploy-pages`。 |
| NFR-003 | 方案需要支持后续切换到自定义域名时的低成本调整。 | confirmed | 预留可配置 `DEPLOY_BASE`。 |

## Constraints

| ID | Constraint | Status | Notes |
| --- | --- | --- | --- |
| C-001 | 继续在 `feature/004-header-density-interaction-share-polish` 收口。 | confirmed | 不切 landing branch。 |
| C-002 | 继续按 Kitty mission 流程交付。 | confirmed | 新建 `013` mission。 |
| C-003 | 不把当前未提交的 UI 微调混进 013 的提交范围。 | confirmed | 只提交 workflow / vite / mission files。 |

## Acceptance Signals

- 仓库新增 `.github/workflows/deploy-pages.yml`
- `vite.config.ts` 能根据环境决定 `base`
- `npm run build` 通过
- 013 的 mission 状态、acceptance 资产齐全
