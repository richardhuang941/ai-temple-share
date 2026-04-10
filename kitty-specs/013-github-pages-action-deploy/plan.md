# Implementation Plan: GitHub Pages Action Deploy

## Goal

- 增加 `GitHub Pages` 自动部署能力。
- 保留 `Vercel` 的默认构建和发布体验。

## Non-goal

- 不调整现有业务页面。
- 不配置自定义域名。

## Technical Design

### 1. Vite base strategy

- 默认 `base` 继续使用 `/`
- 当检测到 `GitHub Pages` 构建环境时，自动切到 `/<repo-name>/`
- 支持通过环境变量覆盖 `DEPLOY_BASE`，为未来自定义域名保留余地

### 2. GitHub Actions workflow

- `push` 到 `main` 时触发
- 支持 `workflow_dispatch`
- Build job:
  - checkout
  - setup-node
  - `npm ci`
  - `npm run build`
  - upload `dist`
- Deploy job:
  - 使用官方 `deploy-pages`

### 3. Deployment compatibility

- `Vercel` 不会注入 `GITHUB_PAGES` 环境变量，因此仍走默认 `/`
- `GitHub Pages` workflow 中显式注入标识变量，避免本地 / Vercel 误判

## Risks

- `base` 配错会导致 Pages 下静态资源 404
- 未来若 repo rename，Pages 子路径也会随之变化

## Verification

- `npm run build`
- 代码检查 workflow 的 `permissions / artifact / deploy` 链路

## Rollback

- 删除 `.github/workflows/deploy-pages.yml`
- 回退 `vite.config.ts` 中的 `base` 逻辑
