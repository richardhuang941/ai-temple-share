# Feature Specification: SBTI Gate, LBTI Task, and Launch Polish

**Mission**: `006-sbti-lbti-launch-polish`  
**Mission Type**: `software-dev`  
**Status**: `draft-ready-for-plan`

## Summary

这一轮的目标不是再扩一个新页面，而是把当前公开挑战页进一步收成“更接近上线前状态”的版本：

1. 分享入口的圆形按钮要重新收口，尤其是移动端不能再出现圆被挤成椭圆的情况。
2. 首屏主 CTA 先切成固定开闸信息 `4月13日 晚上8点！`，并把 `交给 Agent` 模块暂时隐藏。
3. 用户想看模拟流程前，必须先输入自己的 `SBTI`；如果还没有结果，需要明确引导到 [SBTI 人格测试](https://sbti.unun.dev/)。
4. Journey 从原来的 `Task 1-5` 扩成 `Task 1-6`，新增一个 `LBTI` 收尾任务，并从 10 个小龙虾人格里做 session-stable 的随机展示。

## Background

`005-mobile-share-and-task-flow-polish` 已经把分享 handoff、desktop/mobile 平台分流、Journey loading 和 completed-task inspection 补到位了，但继续本地验收时又出现了四类很明确的问题：

1. 移动端分享平台按钮尺寸收口不够稳定，圆形 icon 会因为布局和文案长度被挤压出椭圆感。
2. 当前首屏主 CTA 仍然是“接受挑战，立刻开测”，但产品希望上线前先改成明确的发布时间提示。
3. `AgentPromptSection` 目前不适合继续公开展示，需要先在页面里隐藏。
4. 用户希望在观看流程模拟前先输入 `SBTI`，并且让旅程最终多一个更娱乐化的 `Task 6 / LBTI` 展示。

用户明确给了新的 `LBTI` 属性池，包含以下 10 个 persona：

- `DEAD-SHELL`
- `CLAW-MALO`
- `SHIT-MUD`
- `IMSB-LOBE`
- `SOLO-CAVE`
- `FUCK-CLAW`
- `SEXY-RED`
- `RUN-LOB`
- `ATM-SOFT`
- `NIGHT-EMPTY`

另外，这一轮依赖的外部测试入口是：

- [SBTI 人格测试](https://sbti.unun.dev/)

## Goals

- 修正分享区社媒按钮的尺寸和比例，移动端保持正圆感。
- 将首页主 CTA 暂时改为上线提示 `4月13日 晚上8点！`。
- 暂时隐藏 `交给 Agent / AgentPromptSection`。
- 用户在启动 Journey 模拟前必须先填写 `SBTI`。
- 若用户没有 `SBTI`，页面需要明确提供跳转到 [SBTI 人格测试](https://sbti.unun.dev/) 的路径。
- 新增 `Task 6 / LBTI`，并为每个 session 稳定随机出一个小龙虾人格。
- 所有 Task 文案和 chrome 文案在中英文下都要同步更新为 `Task 1-6` 语境。

## Non-Goals

- 不做真实的 `SBTI -> LBTI` 算法映射。
- 不实现完整的 `LBTI` 问卷，只需要从给定 persona 池中随机选择一个展示。
- 不恢复 `AgentPromptSection` 的公开引导链路。
- 不新增后端接口或远程存储。

## User Scenarios & Testing

### Scenario 1: 移动端社媒按钮保持圆形

**Given** 用户在移动端打开分享区  
**When** 页面渲染 `X / 微信 / 小红书 / 抖音` 社媒入口  
**Then** icon 需要保持统一圆形视觉，不被标签或容器挤压成椭圆。

### Scenario 2: 首屏显示发布时间而不是开测 CTA

**Given** 用户进入首页  
**When** 用户看到首屏主 CTA  
**Then** 页面显示 `4月13日 晚上8点！`，且不再跳到 `AgentPromptSection`。

### Scenario 3: 用户未填写 SBTI 时不能直接启动模拟

**Given** 用户跳到 Journey 区  
**When** 用户尝试开始观看 Task 流程  
**Then** 页面要求先填写 `SBTI`，并在为空时展示去 [SBTI 人格测试](https://sbti.unun.dev/) 的引导链接。

### Scenario 4: 用户填写 SBTI 后可正常开始 Journey

**Given** 用户已经输入自己的 `SBTI`  
**When** 用户点击开始按钮  
**Then** Journey 正常从 `Task 1` 开始推进，并继续遵守当前 autoplay / focus 机制。

### Scenario 5: Journey 有新的 Task 6 / LBTI 收尾

**Given** 用户进入 `Task 6`  
**When** 模拟推进到最后一个任务  
**Then** 页面展示一个从小龙虾人格池里随机得出的 `LBTI` 结果，并对当前 session 保持稳定。

## Options Comparison

### Option A: 只做 UI 层改动，不正式扩展任务模型

- 优点：改得快。
- 缺点：`Task 6` 无法真正进入 timeline，`Task 1-5` 和 `Task 1-6` 的 copy 会继续错位。

### Option B: 正式扩展内容模型、timeline 与 Journey copy

- 优点：`SBTI`、`Task 6 / LBTI` 和 CTA 变化可以一起进入 mission 资产与测试边界。
- 缺点：需要同步改模型、内容和测试。

### Decision

选择 **Option B**。

## Functional Requirements

| ID | Requirement | Status | Acceptance Criteria |
|---|---|---|---|
| FR-001 | 移动端社媒按钮 icon 必须保持统一圆形比例。 | confirmed | 在移动端渲染时，社媒 icon 宽高一致，不出现椭圆。 |
| FR-002 | 首页主 CTA 必须改成 `4月13日 晚上8点！`。 | confirmed | Hero 主 CTA 显示发布时间文案，不再使用“接受挑战，立刻开测”。 |
| FR-003 | `AgentPromptSection` 必须暂时隐藏。 | confirmed | 页面渲染顺序中不再展示 `agent-prompt` 模块。 |
| FR-004 | 用户在启动 Journey 前必须先输入 `SBTI`。 | confirmed | 未填写 `SBTI` 时，开始按钮不可直接推进模拟。 |
| FR-005 | Journey 区必须提供去 [SBTI 人格测试](https://sbti.unun.dev/) 的引导链接。 | confirmed | 输入区附近存在外链引导，指向 `https://sbti.unun.dev/`。 |
| FR-006 | `观看模拟` 入口与 Journey 文案必须更新为 `Task 1-6` 语境。 | confirmed | Hero CTA、Journey 标题与按钮文案同步体现 `Task 1-6`。 |
| FR-007 | 旅程必须新增 `Task 6 / LBTI`。 | confirmed | timeline 中出现第 6 个 task，并参与 progress 与 completion。 |
| FR-008 | `Task 6 / LBTI` 必须从给定 10 个 persona 中随机展示一个结果。 | confirmed | 结果来自已定义 persona 池，不是手写固定一项。 |
| FR-009 | `LBTI` 结果在同一 session 中应保持稳定。 | confirmed | 同一 session 内重新渲染不改变 persona；清空 seed 后可变化。 |

## Non-Functional Requirements

| ID | Requirement | Status | Acceptance Criteria |
|---|---|---|---|
| NFR-001 | `SBTI` 输入与引导必须适配桌面端和移动端。 | confirmed | 输入框、提示和外链在两端都可读可点。 |
| NFR-002 | 隐藏 `AgentPromptSection` 后，首屏与下方模块的宽度和节奏仍需稳定。 | confirmed | 页面结构不出现明显空洞或跳跃。 |
| NFR-003 | `Task 6` 接入不能破坏现有 autoplay、focus 和 reduced-motion 行为。 | confirmed | timeline 的自动推进和焦点策略继续工作。 |
| NFR-004 | 当前代码变更必须继续通过 `npm run test` 与 `npm run build`。 | confirmed | 本地自动化和 build 均为 green。 |

## Constraints

| ID | Constraint | Status | Acceptance Criteria |
|---|---|---|---|
| C-001 | 继续使用 `React + Vite + TypeScript`。 | confirmed | 不引入新框架。 |
| C-002 | 继续维持静态页，不接后端存储。 | confirmed | `SBTI` 与 `LBTI` 在 client side 处理。 |
| C-003 | 以当前分支 `feature/004-header-density-interaction-share-polish` 作为 planning/base/merge target。 | confirmed | mission meta 和 WP frontmatter 与当前分支对齐。 |

## Risks & Assumptions

### Risks

- `SBTI` 输入是新 gate，如果交互太重会拖慢用户进入 Journey 的速度。
- `Task 6` 加入后，测试里对任务数、CTA 文案和 timeline 完成态的断言都要同步更新。
- 隐藏 `AgentPromptSection` 后，首屏以下的模块顺序变化可能影响已有 section-order 用例。

### Assumptions

- `4月13日 晚上8点！` 是当前阶段的展示文案，不需要额外点击跳转行为。
- `SBTI` 只作为进入模拟前的必填输入，不参与严格的人格算法计算。
- `LBTI` 目前只需要“随机且 session-stable”，不需要和 `SBTI` 做真实映射。

## Acceptance Criteria

- Hero 主 CTA 已变为发布时间文案，`AgentPromptSection` 已隐藏。
- Journey 启动前存在 `SBTI` 输入 gate 和外部测试引导。
- timeline 已扩展到 `Task 1-6`，且 `Task 6` 展示 session-stable 的 `LBTI` persona。
- 社媒入口按钮在移动端保持统一圆形视觉。
- `npm run test` 与 `npm run build` 均通过。
