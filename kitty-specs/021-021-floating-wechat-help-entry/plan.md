# Implementation Plan: Floating Wechat Help Entry

## Summary

这轮实现分成三块同步推进：

1. 在内容层增加 `communityHelp` copy surface，让中英文 bundle 都能返回帮助入口文案。
2. 新增全局 `FloatingCommunityHelp` 组件和独立样式，在右下角渲染常驻入口，并用轻量 dialog 展示二维码图片。
3. 把固定静态资源契约、integration/unit 回归和 `021` Kitty mission 资产一起收口。

## Technical Context

- **Language/Version**: TypeScript 5.9 + React 19 + Vite 7
- **Primary Dependencies**: React, React DOM, Vitest, Testing Library
- **Storage**: N/A（纯前端本地状态）
- **Testing**: `vitest --run`
- **Target Platform**: 浏览器静态单页
- **Constraints**: target branch 固定 `codex/lite-skill-copy-cleanup`；二维码图片固定落 `public/community/wechat-group.jpg`

## Project Structure

### Documentation

```
kitty-specs/021-021-floating-wechat-help-entry/
├── spec.md
├── research.md
├── data-model.md
├── plan.md
├── quickstart.md
├── tasks.md
└── tasks/
```

### Source Code

```
src/
├── App.tsx
├── components/common/
├── content/
└── styles/

public/
└── community/wechat-group.jpg
```

## Approach

### 1. Content Contract

- 在 `models.ts` 新增 `CommunityHelpCopy`
- 在 `uiCopy.ts` 增加 zh/en 帮助入口文案
- 在 `content/index.ts` 把 `communityHelp` 注入 `LocalizedContentBundle`

### 2. Floating Entry And Dialog

- 新增 `FloatingCommunityHelp.tsx`
- 入口固定右下角，dialog 使用 `role="dialog"` + `aria-modal="true"`
- 关闭路径覆盖按钮、遮罩、`Esc`
- 打开 dialog 时锁定 `body` 滚动，关闭时恢复

### 3. Static Asset, Regression, Mission

- 接入 `public/community/wechat-group.jpg`
- 更新 unit/integration 测试
- 记录 acceptance、status 与 quickstart，完成 `021` mission 收口
