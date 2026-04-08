# Work Packages: Claws Temple Bounty 长单页

**Mission**: `001-bounty-journey-longpage`  
**Feature Dir**: `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/001-bounty-journey-longpage`  
**Planning Base Branch**: `main`  
**Merge Target Branch**: `main`

## Delivery Strategy

先搭起 `React + Vite` 的基础脚手架和样式地基，再落内容模型与时间轴引擎，然后把 `Journey` 与 `Hero/Share/Agent Prompt` 两块 UI 并行推进，最后做整页整合、验证与可访问性收口。

## Work Package Index

| WP | Title | Goal | Priority | Dependencies | Prompt | Est. Prompt Size |
|---|---|---|---|---|---|---|
| WP01 | Foundation and Tooling | 初始化前端脚手架、测试配置和全局样式地基 | P0 | None | `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/001-bounty-journey-longpage/tasks/WP01-foundation-and-tooling.md` | ~260 lines |
| WP02 | Content and Timeline Engine | 建立内容模型、任务数据和前端时间轴引擎 | P0 | WP01 | `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/001-bounty-journey-longpage/tasks/WP02-content-and-timeline-engine.md` | ~360 lines |
| WP03 | Journey Simulation UI | 完成 Task 1-5 过程模拟区的核心 UI | P1 | WP01, WP02 | `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/001-bounty-journey-longpage/tasks/WP03-journey-simulation-ui.md` | ~340 lines |
| WP04 | Hero Share and Prompt UI | 完成 Hero、分享结果区和 Agent 指令区 | P1 | WP01, WP02 | `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/001-bounty-journey-longpage/tasks/WP04-hero-share-and-prompt-ui.md` | ~330 lines |
| WP05 | Page Integration and Validation | 串联整页、补齐测试并完成最终验收 | P0 | WP03, WP04 | `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/001-bounty-journey-longpage/tasks/WP05-page-integration-and-validation.md` | ~300 lines |

## Subtask Index

| ID | Description | WP | Parallel |
|---|---|---|---|
| T001 | 初始化 `React + Vite + TypeScript` 运行时与基础项目文件 | WP01 |  | [D] |
| T002 | 配置 `Vitest + React Testing Library + jsdom` 测试工具链 | WP01 |  | [D] |
| T003 | 建立全局设计 token 与长单页基础样式 | WP01 |  | [D] |
| T004 | 准备 HTML shell 与目录骨架以承接后续页面实现 | WP01 |  | [D] |
| T005 | 定义与 `data-model.md` 对齐的 TypeScript 内容模型与辅助类型 | WP02 |  |
| T006 | 编写 Hero、分享态、阵营与 Agent Prompt 的本地内容模块 | WP02 | `[P]` |
| T007 | 编写 Task 1-5 任务里程碑与阶段数据集 | WP02 | `[P]` |
| T008 | 实现内容派生与显示态映射工具 | WP02 |  |
| T009 | 实现 reduced-motion 与自动播放时间轴 hooks | WP02 |  |
| T010 | 为内容映射和时间轴转换补齐单元测试 | WP02 |  |
| T011 | 构建 Journey 区的阶段脉冲与状态可视化基础组件 | WP03 |  |
| T012 | 构建单任务的里程碑卡片组件 | WP03 |  |
| T013 | 构建多任务时间轴容器并绑定时间轴输出 | WP03 |  |
| T014 | 实现 JourneySection 的整体叙事与任务顺序呈现 | WP03 |  |
| T015 | 让 Journey 区在移动端和 reduced-motion 模式下保持可读 | WP03 |  |
| T016 | 构建 HeroSection 的主叙事与滚动 CTA | WP04 | `[P]` |
| T017 | 构建分享结果区与分享统计组件 | WP04 | `[P]` |
| T018 | 构建 Agent Prompt 区与复制交互 | WP04 | `[P]` |
| T019 | 实现 Hero/Share/Prompt 所需的共享 UI 原子组件 | WP04 |  |
| T020 | 校验非 Journey 区的 Agent-first 文案与禁用词约束 | WP04 |  |
| T021 | 组合 `App` 与入口文件，串联四个主区块 | WP05 |  |
| T022 | 打通整页时间轴、锚点导航与分享态强调逻辑 | WP05 |  |
| T023 | 添加整页集成测试，覆盖主区块、任务顺序与关键文案 | WP05 |  |
| T024 | 运行构建/测试验证并修复最终验收问题 | WP05 |  |

## Work Packages

## WP01 - Foundation and Tooling

- Goal: 初始化 `React + Vite` 单页前端基础设施，为后续内容层和 UI 层提供稳定地基。
- Priority: P0
- Independent Test: `npm install` 成功，测试脚本可执行，样式 token 与基础 HTML shell 已就位。
- Prompt: `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/001-bounty-journey-longpage/tasks/WP01-foundation-and-tooling.md`
- Estimated Prompt Size: ~260 lines
- Dependencies: None

Included subtasks:
- [x] T001 初始化 `React + Vite + TypeScript` 运行时与基础项目文件 (WP01)
- [x] T002 配置 `Vitest + React Testing Library + jsdom` 测试工具链 (WP01)
- [x] T003 建立全局设计 token 与长单页基础样式 (WP01)
- [x] T004 准备 HTML shell 与目录骨架以承接后续页面实现 (WP01)

Implementation sketch:
1. 搭起 `package.json`、Vite 与 TypeScript 基础配置。
2. 接入测试脚本与 jsdom 环境。
3. 定义页面级视觉 token、背景氛围和基础排版。
4. 准备 `index.html` 与目录结构，留出后续 section/component/content 挂点。

Parallel opportunities:
- 无。该 WP 是后续所有代码工作的前置。

Dependencies:
- None

Risks:
- 如果脚手架和测试配置不稳，后续所有 WP 都会在运行和验证阶段反复返工。

## WP02 - Content and Timeline Engine

- Goal: 把真实业务语义转成可维护的本地内容配置，并建立前端时间轴状态机。
- Priority: P0
- Independent Test: 单元测试通过，能从本地内容数据中推导出 Journey 与 Share 所需显示态。
- Prompt: `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/001-bounty-journey-longpage/tasks/WP02-content-and-timeline-engine.md`
- Estimated Prompt Size: ~360 lines
- Dependencies: Depends on WP01

Included subtasks:
- [ ] T005 定义与 `data-model.md` 对齐的 TypeScript 内容模型与辅助类型 (WP02)
- [ ] T006 编写 Hero、分享态、阵营与 Agent Prompt 的本地内容模块 (WP02)
- [ ] T007 编写 Task 1-5 任务里程碑与阶段数据集 (WP02)
- [ ] T008 实现内容派生与显示态映射工具 (WP02)
- [ ] T009 实现 reduced-motion 与自动播放时间轴 hooks (WP02)
- [ ] T010 为内容映射和时间轴转换补齐单元测试 (WP02)

Implementation sketch:
1. 先把计划中的数据模型转成 TS 类型。
2. 再编写基础内容数据，包括分享态与 Agent prompt。
3. 写完任务与阶段数据后，补内容映射函数。
4. 用 hooks 驱动自动播放和 reduced-motion 降级。
5. 最后补足 unit tests，锁住内容与状态转换规则。

Parallel opportunities:
- `T006` 与 `T007` 可在 `T005` 完成后并行推进。

Dependencies:
- WP01

Risks:
- 如果这里的品牌词、阶段顺序或 external-flow 标记有误，UI 会整体偏离 spec。

## WP03 - Journey Simulation UI

- Goal: 把 `Task 1-5` 的完整旅程做成强节奏、可读、可降级的过程模拟区。
- Priority: P1
- Independent Test: 页面可渲染五个任务、各自阶段与状态文本，且能区分当前任务、已完成任务与外部流程任务。
- Prompt: `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/001-bounty-journey-longpage/tasks/WP03-journey-simulation-ui.md`
- Estimated Prompt Size: ~340 lines
- Dependencies: Depends on WP01, WP02

Included subtasks:
- [ ] T011 构建 Journey 区的阶段脉冲与状态可视化基础组件 (WP03)
- [ ] T012 构建单任务的里程碑卡片组件 (WP03)
- [ ] T013 构建多任务时间轴容器并绑定时间轴输出 (WP03)
- [ ] T014 实现 JourneySection 的整体叙事与任务顺序呈现 (WP03)
- [ ] T015 让 Journey 区在移动端和 reduced-motion 模式下保持可读 (WP03)

Implementation sketch:
1. 从最小可复用的视觉 primitive 开始。
2. 组装单张任务卡，再拼成整体时间轴。
3. 引入 JourneySection 的说明文案和任务间关系。
4. 最后收口在移动端和 reduced-motion 降级。

Parallel opportunities:
- 无显著并行机会。该 WP 内的组件关系较强，适合顺序推进。

Dependencies:
- WP01
- WP02

Risks:
- 如果只顾动画感而忽略文本 fallback，会违背 spec 中“模拟但可读”的要求。

## WP04 - Hero Share and Prompt UI

- Goal: 完成首页的第一印象、传播结果卡以及 AI Agent 指令区。
- Priority: P1
- Independent Test: 用户不看 Journey 区也能从这三个区块理解页面用途、传播结果和下一步如何交给 Agent。
- Prompt: `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/001-bounty-journey-longpage/tasks/WP04-hero-share-and-prompt-ui.md`
- Estimated Prompt Size: ~330 lines
- Dependencies: Depends on WP01, WP02

Included subtasks:
- [ ] T016 构建 HeroSection 的主叙事与滚动 CTA (WP04)
- [ ] T017 构建分享结果区与分享统计组件 (WP04)
- [ ] T018 构建 Agent Prompt 区与复制交互 (WP04)
- [ ] T019 实现 Hero/Share/Prompt 所需的共享 UI 原子组件 (WP04)
- [ ] T020 校验非 Journey 区的 Agent-first 文案与禁用词约束 (WP04)

Implementation sketch:
1. 先做 Hero 的主叙事与入口引导。
2. 再完成 Share 卡与关键 stats。
3. 随后完成 Prompt cards 与 copy 行为。
4. 最后统一共享原子组件与文案校验。

Parallel opportunities:
- `T016`、`T017`、`T018` 在共享原子组件接口约定后可并行。

Dependencies:
- WP01
- WP02

Risks:
- 分享区和 Prompt 区承担传播责任，若主语和文案不准，会直接偏离用户确认过的方向。

## WP05 - Page Integration and Validation

- Goal: 把各区块串成一个完整长单页，并以测试和构建验证收尾。
- Priority: P0
- Independent Test: `npm run test` 和 `npm run build` 通过，整页顺序、关键文案和外部流程说明正确。
- Prompt: `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/001-bounty-journey-longpage/tasks/WP05-page-integration-and-validation.md`
- Estimated Prompt Size: ~300 lines
- Dependencies: Depends on WP03, WP04

Included subtasks:
- [ ] T021 组合 `App` 与入口文件，串联四个主区块 (WP05)
- [ ] T022 打通整页时间轴、锚点导航与分享态强调逻辑 (WP05)
- [ ] T023 添加整页集成测试，覆盖主区块、任务顺序与关键文案 (WP05)
- [ ] T024 运行构建/测试验证并修复最终验收问题 (WP05)

Implementation sketch:
1. 用 `App` 和 `main` 串起所有 sections。
2. 把时间轴、滚动锚点和分享区强调逻辑挂进去。
3. 用 integration tests 锁住整页行为。
4. 最后跑 build/test 并修复验收问题。

Parallel opportunities:
- 无。该 WP 是整合收口工作。

Dependencies:
- WP03
- WP04

Risks:
- 如果最后整合阶段才发现 section 接口不匹配，会拖累收尾节奏。
