# Implementation Plan: 010 Journey SBTI Scrollback Focus

**Branch**: `feature/004-header-density-interaction-share-polish`  
**Date**: `2026-04-10`  
**Spec**: [spec.md](./spec.md)

## Summary

这轮把 Journey 的“开始模拟”按钮从被动 disabled 改成主动引导：

1. 当 `SBTI` 为空时，Journey 按钮触发统一的 `requestSbtiInput` 路径。
2. 由 `App` 层统一处理 Hero `SBTI` gate 的滚动、focus、error 和 shake。
3. 更新集成测试，覆盖从 Journey 区回到 Hero 输入框的路径。

## Technical Context

- **Language/Version**: TypeScript + React 19
- **Primary Dependencies**: React, Vite, Vitest
- **Storage**: `localStorage`（现有 `SBTI` 持久化）
- **Testing**: Vitest + Testing Library
- **Target Platform**: Vercel-hosted static web app
- **Project Type**: 单页 web application
- **Constraints**: 不新增后端、不改任务状态机结构

## Key Decisions

- `App` 作为 Hero / Journey 的共同上层，负责统一 `requestSbtiInput`。
- Journey 按钮空值时不再 disabled，而是触发引导回 Hero。
- Hero 继续保留现有 shake/focus 逻辑，避免复制一套新的输入提示状态。

## Risks

- 需要避免和现有 Hero watch CTA 的 scroll-to-journey 行为互相覆盖。
- 如果 Journey 和 Hero 都触发滚动，可能造成多次 `scrollIntoView`，测试里要明确断言路径。

## Verification

- `npm run test`
- `npm run build`
- 手测：从 Journey 点击开始按钮，未填 `SBTI` 时滚回 Hero 并 focus
