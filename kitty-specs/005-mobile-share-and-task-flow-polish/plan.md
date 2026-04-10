# Implementation Plan: Mobile Share and Task Flow Polish
*Path: `../../kitty-specs/005-mobile-share-and-task-flow-polish/plan.md`*

**Branch**: `feature/004-header-density-interaction-share-polish` | **Date**: `2026-04-09` | **Spec**: `../../kitty-specs/005-mobile-share-and-task-flow-polish/spec.md`
**Input**: Feature specification from `../../kitty-specs/005-mobile-share-and-task-flow-polish/spec.md`

## Summary

本轮规划的核心不是新增大模块，而是把最近已经发生的 polish 需求收回到正式 mission，并形成一套可继续推进的实现边界：

1. 分享区收敛为文字战书单模态。
2. 按 desktop / mobile 区分社媒入口。
3. mobile 平台分享采用 copy + countdown + URI scheme handoff。
4. Journey 为 active stage 增加 loading，为 completed task 增加 expand/collapse。
5. 中文 locale 中清理 section eyebrow 的中英混用。

## Technical Context

**Language/Version**: `TypeScript 5.9`, `React 19`, `Vite 7`  
**Primary Dependencies**: `react`, `react-dom`, `vitest`, `@testing-library/react`  
**Storage**: `N/A`  
**Testing**: `Vitest`, `React Testing Library`, `npm run build`  
**Target Platform**: 现代桌面浏览器与移动浏览器  
**Project Type**: `web / static single-page app`  
**Performance Goals**: 保持现有静态页交互即时响应，无新增网络瓶颈  
**Constraints**: 无真实 SDK、无后端 API、reduced-motion 兼容、继续沿用现有视觉 token  
**Scale/Scope**: 仅影响 share + journey + 部分 locale copy 与测试

## Charter Check

本轮仍属于轻量前端表层迭代，没有引入新的服务边界、基础设施或复杂状态容器。  
符合当前 charter 下“小步前进、先验证、保持静态页简单”的约束。

## Project Structure

### Documentation (this feature)

```
kitty-specs/005-mobile-share-and-task-flow-polish/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── README.md
├── tasks.md
├── tasks/
│   ├── WP01-share-surface-normalization.md
│   ├── WP02-mobile-app-handoff-and-feedback.md
│   ├── WP03-journey-loading-and-expandable-history.md
│   └── WP04-regression-and-mission-alignment.md
└── wps.yaml
```

### Source Code (repository root)

```
src/
├── components/
│   ├── common/
│   ├── journey/
│   ├── sections/
│   └── share/
├── content/
├── hooks/
├── lib/
└── styles/

tests/
├── integration/
└── unit/
```

**Structure Decision**: 继续沿用现有前端单项目结构，不拆包，不新增运行时层级。

## Architecture Overview

- **Share Surface Layer**: 统一分享卡为 text-only，去掉 image/text 模式切换。
- **Platform Handoff Layer**: 根据 UA 决定可见平台集合；对 mobile app 平台执行复制、倒计时和 URI scheme 跳转。
- **Journey Inspection Layer**: 让 active stage 带 loading，让 completed task 进入 inspect/toggle 模式。
- **Copy Consistency Layer**: 在 zh locale 中彻底去掉 section chrome 的英文化残留。
- **Mission Alignment Layer**: 将当前已存在的实现状态补挂到 `005` planning artifacts，供后续 review/accept 延续。

## Key Decisions

### 1. 不做真实平台 SDK 集成

- 这轮目标是 handoff，不是平台内闭环发布。
- 因此 `微信 / 小红书 / 抖音` 只做到 `copy + countdown + scheme launch`。

### 2. 分享区只保留 text-only

- 现阶段没有图片导出链路，也没有用户继续要求图片模式。
- 删除双模态可以减少视觉噪音和测试复杂度。

### 3. Completed task 以 inspect 为主，不以 replay 为主

- 这是用户明确表达的需求变化。
- “查看已经完成的阶段明细” 与 “重放 live run” 必须分开。

### 4. 005 先补 planning，不伪造 review 历史

- 当前已有代码修改是真实存在的，但这轮没有完整先跑 mission 再写代码。
- 因此 `005` 先补齐 planning artifacts，后续再沿着它继续 implement/review/accept。

## Verification Strategy

### Automated

- `npm run test`
- `npx tsc -b --clean && npm run build`
- 分享区 desktop/mobile 分流断言
- share text-only 断言
- Journey expandable completed task / active loading 断言

### Manual

1. PC 端打开分享区，只看到 `X`。
2. 移动端打开分享区，看到 `X / 微信 / 小红书 / 抖音`。
3. 点击移动端平台按钮，确认出现复制 + 倒计时弹窗。
4. Journey 自动推进时，active stage 有 spinner。
5. 点击已完成 task，确认能展开和收起，不影响当前 live focus。

## Phases

### Phase 1: Share Surface Normalization

- 去掉图片/文字双模式
- 清理分享区重复标题
- 桌面/移动入口分流

### Phase 2: Mobile App Handoff

- copy payload
- countdown dialog
- scheme launch

### Phase 3: Journey Inspectability

- active stage loading
- completed task expand/collapse
- zh/en chrome copy consistency

### Phase 4: Regression and Mission Alignment

- 更新 integration tests
- 验证 build/test
- 把 planning artifacts 补完整，作为后续 Kitty 流程起点
