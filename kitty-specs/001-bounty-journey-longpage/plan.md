# Implementation Plan: Claws Temple Bounty 长单页
*Path: `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/001-bounty-journey-longpage/plan.md`*

**Branch**: `main` | **Date**: `2026-04-08` | **Spec**: `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/001-bounty-journey-longpage/spec.md`  
**Input**: Feature specification from `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/001-bounty-journey-longpage/spec.md`

## Summary

实现一个基于 `React + Vite` 的单页静态站，在一个连续滚动页面中完成三件事：

1. 用高完成感的视觉节奏模拟 `Task 1-5` 的完整旅程。
2. 输出可截图传播的 `Agent` 结果分享态。
3. 提供项目化、可复制的 AI Agent 指令块，引导用户把真实流程交回给 `claws-temple-bounty2.0-skills`。

技术上采用“单路由 + 本地内容配置 + 轻量状态机”的方案：页面内容全部来自本地内容模块，不引入后端；任务推进由前端状态机和定时节奏控制；分享结果和 Agent 提示由同一份结构化内容派生，确保品牌词和任务逻辑一致。

## Engineering Alignment

- 已确认技术栈：`React + Vite`
- 采用 `TypeScript` 作为默认实现语言，以降低内容模型和状态机的维护成本
- 采用 `Vitest + React Testing Library` 承接前端测试职责
- 默认实现为一个单页面 SPA，不增加额外路由层

## Technical Context

**Language/Version**: `TypeScript 5.x`, `Node.js 20 LTS+`  
**Primary Dependencies**: `react`, `react-dom`, `vite`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`  
**Storage**: `N/A`，内容全部由仓库内本地静态模块提供  
**Testing**: `Vitest`, `React Testing Library`, 基础构建验证  
**Target Platform**: 现代桌面与移动浏览器（Chrome, Safari, Edge 最新稳定版）  
**Project Type**: 单页面 web application  
**Performance Goals**: 首屏核心信息 2 秒内可读；模拟时间轴流畅运行，目标 60fps；完整任务序列 20 秒内可看完  
**Constraints**: 单页范围、无后端、无真实第三方集成、分享文案使用 `Agent` 主体、Task 4 必须保留第三方原生流属性  
**Scale/Scope**: 1 个公开页面、4 个核心区块、5 个任务阶段、1 组分享摘要、1 组 AI Agent 提示卡

## Charter Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|---|---|---|
| Specification fidelity | pass | 方案保持 spec 中的单页、模拟页、分享页、Agent 指令区范围，不扩展到真实执行。 |
| Decision documentation | pass | 关键技术决策写入 `research.md`，设计拆分写入 `data-model.md` 与 `contracts/`。 |
| Testing gate | pass-with-justified-variance | Charter 默认偏 `pytest`，但本需求是显式确认的 `React + Vite` 前端单页，因此采用前端等价测试栈 `Vitest + RTL` 来满足“可测试与可审查”的原则。 |
| Environment compatibility | pass | 产物面向 macOS/Linux 开发环境，Vite 本地开发与构建均可覆盖。 |
| Performance & accessibility | pass | 设计中要求文本 fallback、reduced motion 兜底、无横向滚动、首屏 2 秒内可读。 |

**Post-Design Re-check**: 通过。Phase 1 设计仍然遵守单页、静态、无真实执行、可测试和跨环境运行的约束。

## Project Structure

### Documentation (this feature)

```text
/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/001-bounty-journey-longpage/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── README.md
│   ├── longpage-content.schema.json
│   └── agent-prompt-card.schema.json
└── tasks/                 # reserved for /spec-kitty.tasks
```

### Source Code (repository root)

```text
/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── JourneySection.tsx
│   │   │   ├── ShareSection.tsx
│   │   │   └── AgentPromptSection.tsx
│   │   ├── journey/
│   │   │   ├── JourneyTimeline.tsx
│   │   │   ├── TaskMilestoneCard.tsx
│   │   │   └── StagePulse.tsx
│   │   ├── share/
│   │   │   ├── ShareSummaryCard.tsx
│   │   │   └── ShareStatPill.tsx
│   │   └── common/
│   │       ├── SectionHeading.tsx
│   │       └── CopyButton.tsx
│   ├── content/
│   │   ├── heroContent.ts
│   │   ├── taskMilestones.ts
│   │   ├── shareSummary.ts
│   │   ├── agentPromptCards.ts
│   │   └── factionContent.ts
│   ├── hooks/
│   │   ├── useJourneyTimeline.ts
│   │   └── useReducedMotion.ts
│   ├── lib/
│   │   ├── timeline.ts
│   │   └── contentMappers.ts
│   └── styles/
│       ├── tokens.css
│       └── globals.css
└── tests/
    ├── unit/
    │   ├── contentMappers.test.ts
    │   └── timeline.test.ts
    └── integration/
        └── longpage.spec.tsx
```

**Structure Decision**: 采用“单项目 web application”结构，所有页面内容在仓库根目录单应用中实现，不拆分 frontend/backend。内容层与组件层分离，方便后续 `tasks` 阶段按“内容建模 / UI section / timeline behavior / validation”拆包。

## Phase 0: Research Decisions

Phase 0 结论记录在 `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/001-bounty-journey-longpage/research.md`，核心决策如下：

1. 使用 `React + Vite + TypeScript` 作为单页承载方式。
2. 使用本地结构化内容模型来映射 `Task 1-5`、分享态和 Agent 提示，不直接把大段文案写死在 JSX 中。
3. 使用前端本地状态机管理任务推进节奏，配合 CSS 动画实现 `duangduangduang` 的逐步完成感。
4. 把 `Task 4` 作为显式外部原生流程表现，而不是本地伪完成流。

## Phase 1: Design

### Architecture Overview

- **App Shell**: 一个根组件负责串联四个主区块，并管理页面级视觉 token 与背景氛围。
- **Content Layer**: `src/content/` 存储所有任务、分享、阵营和 Agent prompt 的结构化数据，保证品牌词和业务顺序统一。
- **Journey Engine**: `useJourneyTimeline` 控制当前激活任务、阶段推进、暂停/重播与 reduced-motion 降级。
- **Presentation Layer**: 每个区块只负责渲染，不自行保存业务真相，显示逻辑来自内容层和 timeline 层。
- **Validation Layer**: 单测验证内容映射与时间轴状态转换；集成测试验证页面关键区块和核心文案存在。

### Section Responsibilities

#### Hero Section

- 快速解释这是什么页面
- 交代 `Task 1-5` 的整体旅程
- 强调 “你的 Agent，终于可以去原野上交朋友了”
- 提供滚动 CTA 到 Journey Section

#### Journey Section

- 用五张主任务卡展示 `Task 1-5`
- 每张卡内部包含多个阶段节点，模拟真实推进顺序
- 高亮当前激活任务，并显示前后任务的已完成/待开始状态
- 显式标注 `Task 4` 为原生第三方流程、`Task 5` 为可选加分项

#### Share Section

- 输出一张“公开战报式”结果卡
- 核心信号固定为：`Agent 打分多少`、`已共振`、`已加入阵营`
- 辅助显示：代表性类型、当前阶段总结、下一步建议
- 提供截图友好的信息密度和视觉中心

#### Agent Prompt Section

- 展示至少一条适配本项目的复制型 Prompt
- 明确告诉 Agent 需要读取哪个仓库/skill
- 提供“目标”“上下文”“期望输出”三段式结构
- 复制按钮只负责复制本地字符串，不触发外部动作

### Journey Timeline Design

- 时间轴使用统一 `TaskMilestone[]` 数据驱动。
- 每个 `TaskMilestone` 拥有多个 `TaskStage`，例如：
  - Task 1: `打分启动` -> `维度结果生成` -> `类型落定`
  - Task 2: `开通身份入口` -> `登录/恢复` -> `解析用户ID` -> `开放寻配成功` -> `领取 Token`
  - Task 3: `选择部落方向` -> `授权检查` -> `部落宣誓提交` -> `已加入阵营` -> `加入 Telegram`
  - Task 4: `进入 SHIT Skills 原生流程` -> `默认推荐发布` -> `评论作为备选动作`
  - Task 5: `生成社交信号` -> `可选发布`
- timeline hook 提供：
  - 当前任务索引
  - 当前阶段索引
  - 自动推进 tick
  - 手动跳转
  - reduced-motion 模式下降级为“点击切换 + 轻量淡入”

### Visual & Motion Strategy

- 视觉方向：公开成绩单 + 奇物旅程海报的混合风格，不走常规 SaaS 面板感。
- 动效实现优先使用 CSS transitions / keyframes 与 React 状态同步，避免为单页过度引入重型动画依赖。
- 当前任务切换需要强节奏感：缩放、亮度、描边、脉冲中的至少两种同时出现。
- 所有关键结论必须同时以文本出现，避免动画消失即信息丢失。

### Testing Strategy

- **Unit**:
  - `timeline.ts` 的阶段推进规则
  - `contentMappers.ts` 的品牌词映射与分享摘要派生逻辑
- **Integration**:
  - 页面渲染四个主区块
  - `Task 1-5` 顺序正确
  - 分享区包含 `Agent` 主体，不包含错误主表达
  - Agent Prompt 区的复制文本包含目标 skill 仓库信息
- **Build Validation**:
  - `vite build`

### Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| 单页叙事过长导致信息疲劳 | 用户无法看完主线 | Hero 与 Share 区做强信息压缩，Journey 区提供明显节奏变化 |
| 任务模拟过花导致误读为真实完成 | 传播时引发理解偏差 | 全页统一使用 `模拟/演示` 语义标签，并在关键节点标明“真实动作需进入对应流程” |
| Task 4 被误写成本地闭环 | 违背业务语义 | 在内容模型和合约中固定 `externalFlow=true`，并在组件层强制外部 CTA 表现 |
| 品牌词和 skill 仓库表达不一致 | 后续审阅返工 | 以本地参考仓库词典为唯一来源，内容模块集中维护 |

### Agent Context Update

- 当前安装的 `spec-kitty-cli 3.1.0` 未提供可用的 `agent context update` 命令。
- 本仓库已有 repo-local prompts，位于 `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/.codex/prompts/`。
- 因此本阶段不新增额外 agent context 文件，继续使用现有 `spec-kitty` prompts 作为代理上下文入口。

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Charter 默认 Python/pytest 栈与本需求前端栈不一致 | 用户已明确要求 `React + Vite`，且需求本质是静态前端单页 | 保持 Python/pytest 将迫使我们先搭一个与需求无关的后端或模板，反而增加实现噪音 |
