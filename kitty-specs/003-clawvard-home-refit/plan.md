# Implementation Plan: Clawvard 风格首页重构与任务语义校正
*Path: `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/003-clawvard-home-refit/plan.md`*

**Branch**: `main` | **Date**: `2026-04-08` | **Spec**: `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/003-clawvard-home-refit/spec.md`  
**Input**: Feature specification from `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/003-clawvard-home-refit/spec.md`

## Summary

本轮不是在现有页面上继续“打补丁”，而是做一次公开挑战页导向的重构：

1. 首页、成绩卡、分享区优先贴近本地 Clawvard 分享页的结构和节奏。
2. 去掉所有不该给终端用户看的内部说明型文案。
3. 把 `Task 1-5` 全部改成与本地 bounty skill 一致的语义。
4. 用同一个前端受控随机种子同时驱动 Hero、Share 和 Journey，保证 score / grade / faction 一致。
5. 为 Journey 增加自动滚动聚焦，让当前任务始终落在用户视野中心区域。

## Engineering Alignment

- 保持现有 `React + Vite + TypeScript` 技术栈。
- 保持单页应用，不新增路由。
- 继续使用 `Vitest + React Testing Library` 做单测与集成测试。
- 本轮优先调整内容模型、布局和交互，不引入真实后端或远程执行。

## Technical Context

**Language/Version**: `TypeScript 5.9`, `React 19`, `Node.js 20 LTS+`  
**Primary Dependencies**: `react`, `react-dom`, `vite`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`  
**Storage**: `localStorage` 用于语言选择；`sessionStorage` 用于固定当前页面的模拟结果种子  
**Testing**: `Vitest`, `React Testing Library`, `npm run build`，必要时补本地截图验证  
**Target Platform**: 现代桌面浏览器与移动浏览器  
**Project Type**: 单页静态 web application  
**Performance Goals**: 首屏清晰渲染；Journey 自动聚焦不引起明显抖动；交互动画保持接近 `60fps` 观感  
**Constraints**: 单页、无后端、Task 4 必须保持 native handoff、首页文案不得出现内部说明口吻  
**Scale/Scope**: 一次单页 refit，涉及 `src/content/**`、`src/components/sections/**`、Journey 交互、测试与文档

## Charter Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|---|---|---|
| Spec fidelity | pass | 全部工作围绕首页 refit、Task 语义校正和交互聚焦，不扩展真实业务能力。 |
| Single-page discipline | pass | 不新增路由或页面形态，仍然在现有 landing page 内完成。 |
| Testing gate | pass-with-justified-variance | 继续使用前端现有 `Vitest` 体系，而不是 charter 默认后端测试栈。 |
| External flow boundary | pass | Task 4 继续保持 SHIT Skills 原生 handoff，不在本地伪造完成态。 |
| Accessibility & motion | pass | reduced-motion 和键盘访问仍作为设计约束保留。 |

**Post-Design Re-check**: 通过。Phase 1 设计未引入新的重型 runtime 或不可控外部依赖。

## Project Structure

### Documentation (this mission)

```text
/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/003-clawvard-home-refit/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── README.md
│   ├── simulation-seed.schema.json
│   └── challenge-surface.schema.json
└── tasks/
```

### Source Code

```text
/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/
├── src/
│   ├── App.tsx
│   ├── content/
│   │   ├── agentProfile.ts
│   │   ├── factionContent.ts
│   │   ├── heroContent.ts
│   │   ├── shareSummary.ts
│   │   ├── taskMilestones.ts
│   │   ├── models.ts
│   │   └── index.ts
│   ├── components/
│   │   ├── common/
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AgentPromptSection.tsx
│   │   │   ├── ShareSection.tsx
│   │   │   └── JourneySection.tsx
│   │   ├── share/
│   │   └── journey/
│   ├── hooks/
│   │   ├── useLocale.ts
│   │   ├── useJourneyTimeline.ts
│   │   └── useReducedMotion.ts
│   ├── lib/
│   │   ├── contentMappers.ts
│   │   ├── timeline.ts
│   │   └── locale.ts
│   └── styles/
│       ├── globals.css
│       └── tokens.css
└── tests/
    ├── integration/
    └── unit/
```

**Structure Decision**: 沿用现有前端结构，不新增页面层；新逻辑优先放入 `content`、`lib` 和 `hooks`，保证结果数据、任务语义和 UI 展示解耦。

## Phase 0: Research Decisions

详细结论见 `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/003-clawvard-home-refit/research.md`。

本轮先锁定这几个决策：

1. Hero / Share 结构以本地 Clawvard HTML 为主参考。
2. Task 语义以 `claws-temple-bounty2.0-skills` 为唯一来源。
3. 用受控随机种子统一首页、分享区和 Journey。
4. Journey 聚焦采用原生 `scrollIntoView` + CSS 过渡实现，动画库思路只做参考，不急着引入新依赖。

## Phase 1: Design

### Architecture Overview

- **Seed Layer**: 新增 `BountySimulationSeed`，固定 score、grade、type、faction、task4 action、task5 platform。
- **Hero Surface Layer**: 参考页风格的 challenge card，用户先看到结果，再决定是否接受挑战。
- **Share Surface Layer**: 延续 image/text 双模式，但结构、按钮与节奏优先向参考页对齐。
- **Journey Layer**: 任务内容完全重写，并在 task 切换时自动滚动聚焦。
- **Copy Governance Layer**: 把内部解释型文案从用户可见层移除，只在测试或文档中保留。

### Result Seed Strategy

- 页面首次进入时生成一个会话级 seed。
- seed 存入 `sessionStorage`，保证同一次会话内：
  - Hero 分数
  - Hero 等级
  - 首页 faction
  - 分享区结果
  - Journey 中 Task 1 与 Task 3 的 faction
  保持一致。
- 语言切换只改变 copy，不改变当前 seed 结果。

### Information Architecture

目标顺序保持为：

1. `Hero Challenge Card`
2. `Agent Prompt`
3. `Share Challenge`
4. `Journey Simulation`

但是视觉上会调整为更接近参考页：

- 轻 header
- 成绩卡
- 挑战文案
- 双主 CTA
- terminal prompt card

Journey 仍然在下方，承担“完整过程演示”角色，而不是首屏主叙事角色。

### Hero Refactor

- 缩小主标题权重，不让 `h1` 压过分数卡。
- 删除“首页先只看……”和“演示页……”等用户无价值文案。
- 用结果式 copy 替代说明式 copy。
- 分数、等级、阵营、共振、加入阵营整合成一段挑战话术。

### Task Semantics Refactor

- `Task 1`: score + grade + type + dominant axes + faction mapping
- `Task 2`: identity entry + sign-in + user ID parse + open pairing + resonance stable
- `Task 3`: faction choice + 2 AIBOUNTY threshold + approval + vote/oath + joined + Telegram follow-up
- `Task 4`: native SHIT Skills action, `publish` 为默认推荐
- `Task 5`: optional social signal

### Journey Focus Strategy

- Journey 启动后仅在“当前 task 变化”时自动滚动。
- 同一个 task 内的小 stage 推进主要靠卡片高亮、进度条和 proof 点亮，不每一小步都滚动。
- reduced-motion 下关闭平滑滚动与显著位移动画，只做轻量聚焦。

### Motion Strategy

社区参考：

- `react-spring` GitHub 仓库约 `29.1k` stars，适合作为 React 动画交互参考。
- `GSAP ScrollTrigger` 官方文档适合复杂滚动编排参考。

本轮落地策略：

- **不新增动画依赖**。
- 用原生 `scrollIntoView`、CSS transitions 和现有组件结构完成 MVP。
- 若后续滚动叙事要升级成 pinned scrollytelling，再考虑引入 `GSAP ScrollTrigger`。

## Verification Strategy

### Automated

- unit: seed 生成一致性、locale 保持、task content mapping
- integration:
  - Hero CTA 锚点
  - Share mode 切换
  - Journey 点击后启动
  - Journey task 自动聚焦行为
  - Hero / Share / Journey 结果一致性

### Manual

1. 对照本地 Clawvard 参考页，检查首页结构与视觉节奏。
2. 检查 Hero 不再显示内部解释型文案。
3. 检查 Task 1 的 faction 与 share/hero 保持一致。
4. 启动 Journey，确认切到下一个 task 时任务卡片会进入主视区。
5. 在移动端宽度下检查首屏卡片和按钮布局。

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 会话级模拟 seed | 要保证首页、分享和 Journey 结果一致 | 直接把随机写在各组件里会造成结果冲突 |
| 自动滚动聚焦 | 用户要求在每个 task 直接看到当前进展 | 仅靠颜色高亮不足以保证用户看见当前 task |
