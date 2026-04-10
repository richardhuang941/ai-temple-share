# Implementation Plan: 008 Share Playback SBTI Feedback Polish

**Branch**: `feature/004-header-density-interaction-share-polish`  
**Date**: `2026-04-10`  
**Spec**: [spec.md](./spec.md)

## Summary

这轮实现拆成三块：

1. 分享卡把重复的用户可见挑战句收成单点表达，保留复制能力但不在页面上重复展示。
2. Journey 自动演示补一个真正可感知的 floating 播放/暂停控件：桌面端贴在当前聚焦区域，移动端固定在安全区边缘。
3. Hero 的 `SBTI` gate 从“报错文本”升级成“报错 + focus + 一次性 shake”，让未输入时的反馈更直接。

## Technical Context

- **Language/Version**: TypeScript + React 19
- **Primary Dependencies**: React, Vite, Vitest
- **Storage**: `localStorage`（仅保存 `SBTI` 输入）
- **Testing**: Vitest + Testing Library
- **Target Platform**: Vercel-hosted static web app
- **Project Type**: 单页 web application
- **Performance Goals**: 继续维持轻量静态首屏与平滑的 timeline 状态切换
- **Constraints**: 不引入后端、不接新 SDK、保持当前功能分支工作流
- **Scale/Scope**: 单页面局部 polish，影响 Hero / Share / Journey 三块

## Charter Check

- 当前变更仍属于单页前端 polish，不触发额外架构层复杂度。
- 保持现有内容模型与 timeline 状态机，不新增跨层依赖。

## Project Structure

### Documentation

```text
kitty-specs/008-008-share-playback-sbti-feedback-polish/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code

```text
src/
├── components/
│   ├── sections/
│   └── share/
├── content/
├── hooks/
└── styles/

tests/
├── integration/
└── unit/
```

**Structure Decision**: 保持现有 Vite 单页结构，只在 Hero / Share / Journey 相关组件、内容映射与样式层做局部调整。

## Key Decisions

- 分享去重优先删掉“第二份可见文案”，而不是再发明一层新容器。
- 悬浮播放/暂停控件复用已有 `timeline.isAutoplay` 状态，不额外创建第二套播放状态。
- Shake 交互采用一次性 signal 触发，而不是把按钮永久 `disabled`，这样仍然允许用户直接点按钮获得引导反馈。

## Risks

- 浮动控件如果定位不稳，容易挡住移动端 Task 内容或分享浮层。
- `SBTI` shake 如果每次 render 都触发，会造成输入体验抖动。
- 分享可见文案删减后，要确保复制 payload 仍保留足够的挑战语义。

## Verification

- `npm run test`
- `npm run build`
- 手测桌面端：Journey 启动后，当前聚焦区域附近可暂停/恢复 autoplay
- 手测移动端：左下或安全区附近可见 floating 控件，不遮挡任务主体
- 手测 Hero：空 `SBTI` 点按钮只 shake/focus，不启动；填值后可正常启动
