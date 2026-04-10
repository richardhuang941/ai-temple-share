# Research: Repo Rename Pages Alignment

## Findings

1. `vite.config.ts` 已经通过 `GITHUB_REPOSITORY` 动态推导 GitHub Pages 的 repo base，因此 workflow 本身不需要为 repo rename 再写死一次。
2. 当前真正需要对齐的是仓库里残留的旧 repo 名和旧公开地址：
   - `package.json` / `package-lock.json`
   - `src/lib/locale.ts`
   - `src/components/sections/ShareSection.tsx`
   - `tests/integration/longpage.spec.tsx`
   - `kitty-specs/013-github-pages-action-deploy/acceptance-matrix.json`
3. 旧的 `claws-temple-home.vercel.app` 公开挑战链接已不适合作为当前对外主链接，应替换为新的 GitHub Pages 地址。

## Decision

- 保留 GitHub Pages workflow 逻辑不变。
- 对齐项目名、本地 storage key、分享链接和相关说明文档。
