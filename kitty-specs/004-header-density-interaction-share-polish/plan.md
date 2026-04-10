# Implementation Plan: Header / Density / Interaction / Share Polish
*Path: `../../kitty-specs/004-header-density-interaction-share-polish/plan.md`*

**Branch**: `main` | **Date**: `2026-04-08` | **Spec**: `../../kitty-specs/004-header-density-interaction-share-polish/spec.md`

## Summary

本轮是一次前端表层微重构：

1. 把顶部 chrome 重构为正式 `header`。
2. 压缩 Hero / Prompt 的总高度，让首屏更接近 Clawvard 分享页。
3. 为 CTA 增加 hover / tap / shake 微交互。
4. 扩展分享区，加入社媒按钮与 fallback 行为。
5. 把桌面端 Journey 重新排成纵向单列流程。

## Technical Context

**Language/Version**: `TypeScript 5.9`, `React 19`, `Vite 7`  
**Dependencies**: 继续使用现有 `react`, `react-dom`；不新增动画库  
**Testing**: `Vitest`, `React Testing Library`, `npm run build`  
**Platform**: 现代桌面浏览器与移动浏览器  
**Constraints**: 静态页、无真实 SDK、reduced-motion 兼容、继续保留现有 locale 逻辑

## Architecture Overview

- **Header Surface**: 新增专门的顶部模块，承接品牌与语言切换。
- **Hero Density Layer**: 缩小 type scale、压缩 spacing，并把 Prompt 卡抬到首屏附近。
- **Attention Feedback Layer**: 通过 CSS transitions + keyframes 处理 hover / tap / shake。
- **Share Action Layer**: 用统一的分享 action config 驱动四个社媒按钮和 fallback。
- **Journey Layout Layer**: 用 CSS 重排为单列流程，并统一状态 badge 样式。

## Key Decisions

### 1. 不新增动画库

- hover 放大、tap 压缩、目标模块 shake 都可以用 CSS / DOM class 轻量实现。
- 这样能保持依赖稳定，也避免为了几个 micro interactions 引入新的 runtime。

### 2. Header 独立成组件

- 不再把品牌和语言切换塞进 HeroSection 内部的散装 topbar。
- 让 header 能独立控制间距、sticky 语义和后续扩展空间。

### 3. Prompt 保持独立模块，但缩短与 Hero 的物理距离

- 仍然保留 `Hero -> Agent Prompt -> Share -> Journey` 的主叙事顺序。
- 通过 section padding 和卡片高度优化，让 Hero 与 Prompt 在视觉上更像同一屏里的上下两个模块。

### 4. 分享平台用 action config + fallback

- `X`: 直接用分享 intent。
- `微信 / 小红书 / 抖音`: 优先 `navigator.share`，否则复制平台文案到剪贴板并给出反馈。

### 5. Journey 桌面端强制单列

- 这一轮优先强调流程感而不是看板感。
- 纵向单列也更有利于自动滚动时保持当前位置可感知。

## Verification Strategy

### Automated

- integration:
  - header 与 `查看完整成绩单` 移除断言
  - `接受挑战` 触发 Prompt emphasis
  - share 社媒按钮渲染
  - Journey 桌面结构回归
- build:
  - `npm run build`

### Manual

1. 桌面端检查首屏是否能更快同时看到成绩卡和 Prompt 卡。
2. 鼠标 hover CTA，确认 scale / shadow 生效。
3. 移动端点击 CTA，确认 press 感存在。
4. 点击 `接受挑战`，确认 Prompt 卡有一次 shake/highlight。
5. 检查分享区按钮与文案 fallback。
6. 桌面端启动 Journey，确认为纵向 `Task 1-5`。

## Phases

### Phase 1: Header + Hero + Prompt Density

- 新增 header 组件
- 移除完整成绩单入口
- 调整 hero / prompt 样式与布局密度

### Phase 2: Micro Interactions + Share Actions

- CTA hover / tap / shake
- 社媒 action row
- 复制 / web share / X intent fallback

### Phase 3: Journey Vertical Flow + Regression

- Journey 桌面单列
- 统一 badge 样式
- 补测试与 build 验证
