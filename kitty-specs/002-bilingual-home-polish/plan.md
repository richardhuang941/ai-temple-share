# Implementation Plan: [FEATURE]
*Path: [templates/plan-template.md](templates/plan-template.md)*


**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/kitty-specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/spec-kitty.plan` command. See `src/specify_cli/missions/software-dev/command-templates/plan.md` for the execution workflow.

The planner will not begin until all planning questions have been answered—capture those answers in this document before progressing to later phases.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]  
**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]  
**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]  
**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]  
**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]
**Project Type**: [single/web/mobile - determines source structure]  
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Charter Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Gates determined based on charter file]

## Project Structure

### Documentation (this feature)

```
kitty-specs/[###-feature]/
├── plan.md              # This file (/spec-kitty.plan command output)
├── research.md          # Phase 0 output (/spec-kitty.plan command)
├── data-model.md        # Phase 1 output (/spec-kitty.plan command)
├── quickstart.md        # Phase 1 output (/spec-kitty.plan command)
├── contracts/           # Phase 1 output (/spec-kitty.plan command)
└── tasks.md             # Phase 2 output (/spec-kitty.tasks command - NOT created by /spec-kitty.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

*Fill ONLY if Charter Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
# Implementation Plan: Claws Temple 首页双语与转化收口
*Path: `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/002-bilingual-home-polish/plan.md`*

**Branch**: `main` | **Date**: `2026-04-08` | **Spec**: `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/002-bilingual-home-polish/spec.md`  
**Input**: Feature specification from `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/002-bilingual-home-polish/spec.md`

## Summary

本轮不重新发明页面，而是在现有 `001-bounty-journey-longpage` 的代码基础上做一次“传播优先”的收口：

1. 引入本地 `zh/en` 双语字典与 locale 解析。
2. 把首页重构成轻量挑战卡，突出分数、共振、阵营和分享状态。
3. 把行动路径重排为 `接受挑战 -> Agent Prompt`、`转发战书 -> Share`、`观看模拟 -> Journey`。
4. 把 Journey 改成“点击后才启动”的显式演示，并放慢节奏。
5. 用 coral token 和明确的 typography scale 收口视觉层级。

## Engineering Alignment

- 保持现有 `React + Vite + TypeScript` 技术栈。
- 继续使用 `Vitest + React Testing Library` 作为测试基线。
- 内容仍然采用本地结构化配置，而不是引入远端 i18n 服务。
- 默认在单页中完成所有改造，不增加路由。

## Technical Context

**Language/Version**: `TypeScript 5.x`, `Node.js 20 LTS+`  
**Primary Dependencies**: `react`, `react-dom`, `vite`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`  
**Storage**: `localStorage` 仅用于保存用户显式语言选择；其余内容为本地静态数据  
**Testing**: `Vitest`, `React Testing Library`, 构建验证，必要时本地 Playwright 截图验证  
**Target Platform**: 现代桌面与移动浏览器  
**Project Type**: 单页面静态 web application  
**Performance Goals**: 首屏 2 秒内可读；Hero CTA 与语言切换无需额外请求；Journey 单步停留时间提升到可读节奏  
**Constraints**: 单页、无后端、无真实分享 SDK、Task 4 保持外部流、保留 Agent-first 文案  
**Scale/Scope**: 现有单页上的信息架构重排、视觉系统更新、状态机调整和双语内容扩展

## Charter Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|---|---|---|
| Specification fidelity | pass | 范围严格围绕现有 landing page polish，不扩展真实执行能力。 |
| Decision documentation | pass | locale、share mode、CTA 重排、typography 基线都在 supporting docs 中落文档。 |
| Testing gate | pass-with-justified-variance | 仍使用前端等价测试栈而非 charter 默认 `pytest`，原因与 001 相同。 |
| Environment compatibility | pass | 继续使用现有 Vite 工程，不新增复杂运行时依赖。 |
| Performance & accessibility | pass | 双语切换本地完成，CTA 可键盘访问，Journey 支持 reduced-motion 降级。 |

**Post-Design Re-check**: 通过。Phase 1 设计没有引入新的服务端或路由复杂度。

## Project Structure

### Documentation (this mission)

```text
/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/002-bilingual-home-polish/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── README.md
│   ├── localized-content.schema.json
│   └── share-challenge.schema.json
└── tasks/
```

### Source Code

```text
/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/
├── src/
│   ├── App.tsx
│   ├── content/
│   │   ├── heroContent.ts
│   │   ├── shareSummary.ts
│   │   ├── agentPromptCards.ts
│   │   ├── taskMilestones.ts
│   │   ├── models.ts
│   │   └── index.ts
│   ├── components/
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AgentPromptSection.tsx
│   │   │   ├── ShareSection.tsx
│   │   │   └── JourneySection.tsx
│   │   ├── common/
│   │   ├── share/
│   │   └── journey/
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
    └── integration/
```

**Structure Decision**: 继续沿用现有目录，但新增 locale/content bundle 层和 share mode 状态，避免把 `zh/en` 文案散落在组件里。

## Phase 0: Research Decisions

Phase 0 结论记录在 `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/002-bilingual-home-polish/research.md`：

1. 双语能力采用本地字典 + locale 检测 + 显式覆盖记忆。
2. 首页改为 challenge card 式信息架构，减少摘要段落密度。
3. 分享区采用 `image/text` 双模式，不要求真实导出图片文件。
4. Journey 改为 `idle -> started -> complete` 的显式触发状态机。
5. typography 采用基于 `Ant Design` 的少层级规则，本地映射到当前单页。

## Phase 1: Design

### Architecture Overview

- **Locale Layer**: 新增 `LocalizedContentBundle` 和 `LocaleState`，负责文案切换与默认语言判定。
- **Hero Challenge Layer**: 首页只展示四个状态与三个 CTA，不再承担完整路线说明。
- **Share Layer**: 采用分段切换，提供 `share image` 和 `share text` 两种展示。
- **Journey Layer**: 保留完整 Task 1-5 说明，但启动权交给用户。
- **Visual System**: 统一 coral token、surface token 和 typography token，避免 section 各自定义字号。

### Locale Strategy

- 支持 `zh` 与 `en` 两个 locale。
- 默认顺序：
  1. `localStorage` 中的手动选择
  2. `navigator.languages`
  3. `navigator.language`
  4. fallback 到 `zh`
- `zh-*` 统一归类到 `zh`；`en-*` 统一归类到 `en`。
- 所有主区块文案由 locale bundle 派发，避免组件内分散判断。

### Information Architecture

新顺序调整为：

1. `Hero Challenge Card`
2. `Agent Prompt`
3. `Share Challenge`
4. `Journey Simulation`

原因：
- 用户明确希望“接受挑战”先把人带到 Agent 命令区。
- “转发战书”在参考截图中比 Journey 更靠前，更接近首屏传播路径。
- Journey 变成补充解释，不再承担首屏转化职责。

### CTA Behavior

- `接受挑战` -> `#agent-prompt`
- `转发战书` -> `#share`
- `观看模拟 Task 1-5 的流程` -> `#journey` 并触发 `startAutoplay()`

为避免滚动和状态更新抢序，Journey 触发逻辑拆成两步：

1. 先修改 timeline 为 `started`
2. 再滚动至 Journey 容器

或在实现中使用受控 trigger callback，确保两者顺序稳定。

### Share Challenge Design

- 顶部显示 `分享图片 / 分享文字` 切换。
- `分享图片` 模式展示适合截图传播的卡片，重点保留 Agent 分数、等级、状态与挑战召唤。
- `分享文字` 模式展示可复制文本块。
- `CopyButton` 复用现有基础组件，但需要适配 locale 文案。

### Journey Design

- 初始态：不自动播放，显示“点击开始观看模拟”的提示。
- 触发后：按更慢的周期自动推进，建议 `3000ms - 3600ms` 每步。
- 控件保留：
  - `开始 / 重新播放`
  - `暂停 / 继续`
  - 手动推进
- 对 reduced-motion：禁用自动脉冲类动画，但保留状态文本变化。

### Visual & Typography Strategy

- 色彩：
  - `--coral-bright: #ff4d4d`
  - `--coral-mid: #e63946`
  - `--coral-dark: #991b1b`
- 背景从当前深蓝夜色调整为更暖的浅色/暖白基底加 coral 高亮，接近用户给出的截图方向。
- typography 基线：
  - 采用 `Ant Design` 的“控制层级数量、以正文可读性为先”的方式
  - 在实现上保留 5 档以内的主文字级：display, h1/h2, body, small, eyebrow
  - 响应式收口参考 `MUI` 的 responsive type scale 思路，但不引入库本身

### Testing Strategy

- **Unit**
  - locale 解析与持久化
  - share mode 切换
  - Journey 只有在显式触发后才开始 autoplay
- **Integration**
  - 默认语言渲染
  - 三条 CTA 的锚点与行为
  - 首屏四个核心状态存在
  - `Agent` 主语在分享文案中保持一致
- **Build Validation**
  - `npm run test`
  - `npm run build`

### Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| 双语改造导致文案长度撑破首屏卡片 | 首屏重新变密集 | 设计上优先短句，必要时为英文单独写更短版本 |
| Journey 滚动与 start 触发不同步 | 用户点按钮后误以为未生效 | 使用受控启动状态，并在进入 Journey 后显示启动反馈 |
| 分享图片模式被误解为真实导出 | 需求理解偏差 | 规格中明确本轮以可截图视觉卡为主，不承诺图片文件生成 |
| 主题改成浅底后局部对比度不足 | 可读性下降 | 用 token 统一检查按钮、正文、弱文案的对比度 |

### Agent Context Update

- 当前 `spec-kitty-cli 3.1.0` 仍未提供可用 `agent context update` 命令。
- 本轮沿用现有 repo-local prompts，不新增额外 agent context 文件。

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 在现有内容层上追加 locale bundle，而不是只用条件渲染拼接几个字符串 | 这次几乎所有核心区块都需要双语切换 | 直接在 JSX 中写 `zh/en` ternary 会迅速失控且不利于后续维护 |
| 保留 Journey 状态机而不是退回纯静态长图 | 用户明确要求“点击后自动执行”的演示感 | 纯静态说明无法满足“开始后自动推进”的体验目标 |
