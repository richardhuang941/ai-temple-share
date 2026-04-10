# Research Notes

- `GitHub Pages` 官方支持通过自定义 `GitHub Actions` workflow 部署静态站。
- `Vite` 官方文档要求在部署到 repo 子路径时显式设置 `base`。
- 本项目当前没有 `React Router` deep-link 问题，因此不需要额外 rewrite 逻辑。

## Chosen approach

- 使用官方 Pages actions
- 在 `vite.config.ts` 里根据环境变量切换 `base`
