# Feature Specification: Mobile Share and Task Flow Polish

**Mission**: `005-mobile-share-and-task-flow-polish`  
**Mission Type**: `software-dev`  
**Status**: `draft-ready-for-plan`

## Summary

这一轮不是新开大方向，而是把最近几次裸改收回到正式流程里，重点补齐两块体验：

1. 分享区要回到更接近 Clawvard 参考页的逻辑：PC 只保留 `X`，移动端提供 `微信 / 小红书 / 抖音` 入口，并采用“先复制文案，再倒计时唤起 App”的节奏。
2. `Task 1-5` 的模拟过程要更容易看懂：推进中的阶段需要明确 loading 感，已完成 task 需要能直接展开回看，而不是强制跳回去重播。

## Background

前一轮 `004-header-density-interaction-share-polish` 已经把 header、首屏密度、CTA 微交互和纵向 Journey 做出来了，但在继续本地迭代后，用户指出还有几处明显不顺：

1. 分享区对 PC 和移动端没有区分，导致桌面端社媒入口太多，移动端又不够像真实 App handoff。
2. 用户不希望页面再展示“系统分享 / 复制 fallback”这类内部说明文案。
3. 分享卡只需要保留文字分享，不需要“分享图片 / 分享文字”双模式。
4. 中文页面里仍残留部分英文 section eyebrow，如 `Share Challenge`、`Agent Handoff`、`Journey Simulation`。
5. Journey 在当前推进阶段缺少明确 loading 提示。
6. 已完成 Task 只能通过“切回这个 Task”重新聚焦，不能直接展开回看阶段明细。

这轮同时参考了用户提供的 Clawvard 下载源码：

- [Share Score _ Clawvard.html](/Users/huangzongzhe/Downloads/Share%20Score%20_%20Clawvard.html)
- [Share Score _ Clawvard_files](/Users/huangzongzhe/Downloads/Share%20Score%20_%20Clawvard_files)

本地源码里可以确认它们对移动端社媒采用了 URI scheme 唤起思路，例如 `weixin://`、`xhsdiscover://`、`snssdk1128://`，并在跳转前先复制分享文案、显示倒计时提示。

## Goals

- PC 端分享区只展示 `X`，移动端才展示 `微信 / 小红书 / 抖音`。
- 去掉分享区面向用户的 fallback 解释文案。
- 分享区只保留文字分享，不再保留图片模式和重复标题。
- 中文 locale 下的非关键 chrome 用中文，英文 locale 下继续用英文。
- 推进中的 task stage 要有清晰 loading 感。
- 已完成 task 可以直接展开/收起阶段明细，而不是强制跳回去重播。
- 把这轮变更正式落到 Kitty 的 `005` mission 里，避免后续需求继续散落在 `004` 之后的临时改动上。

## Non-Goals

- 不接真实平台 SDK 或开放平台审核链路。
- 不把静态页改成多页应用。
- 不重做 `Task 1-5` 的业务流程定义。
- 不伪造这轮已经完整跑过一遍 Kitty 的 implement/review 历史；本轮先把 planning artifacts 补齐。

## User Scenarios & Testing

### Scenario 1: 桌面端分享区更干净

**Given** 用户在 PC 端查看分享区  
**When** 用户准备转发战书  
**Then** 页面只出现 `X` 分享入口，不再出现面向移动端的 `微信 / 小红书 / 抖音` 按钮，也不再展示 fallback 说明文案。

### Scenario 2: 移动端点击社媒按钮时能进入 App handoff

**Given** 用户在手机端点击 `微信 / 小红书 / 抖音`  
**When** 用户触发分享动作  
**Then** 页面先复制战书文案，再显示倒计时提示，并尝试唤起对应 App，让后续分享动作在 App 内完成。

### Scenario 3: 分享区只保留文字战书

**Given** 用户进入分享区  
**When** 用户查看分享卡  
**Then** 页面只展示文字版战书，不再出现图片/文字模式切换，也不再重复显示“分享你的成绩”类双重标题。

### Scenario 4: 已完成任务可以展开回看

**Given** 某个 task 已完成  
**When** 用户点击该 task 的尾部动作  
**Then** 页面直接展开或收起该 task 的阶段明细，不改变当前 live run，也不强制重播。

### Scenario 5: 推进中的阶段有明确反馈

**Given** Journey 正在自动推进  
**When** 某个 stage 处于 active  
**Then** stage 状态标签要带有清晰的 loading / spinning 提示，帮助用户感知“这一步正在推进”。

## Options Comparison

### Option A: 继续在现有 `004` 之上做临时裸改

- 优点：最快。
- 缺点：后续需求、验证和回滚边界会越来越乱，也无法清楚区分 `004` 和 `005` 的责任面。

### Option B: 为这轮补一个正式 `005` mission，并把当前改动映射到新 mission

- 优点：后续迭代有正式 spec/plan/tasks 落点，状态和验证路径更清晰。
- 缺点：需要补文档与任务拆分，短期会多一些过程工作。

### Decision

选择 **Option B**。

## Functional Requirements

| ID | Requirement | Status | Acceptance Criteria |
|---|---|---|---|
| FR-001 | PC 端分享区只展示 `X` 分享入口。 | confirmed | 桌面端渲染时 `微信 / 小红书 / 抖音` 按钮不出现。 |
| FR-002 | 移动端分享区展示 `X / 微信 / 小红书 / 抖音` 四个入口。 | confirmed | 移动 UA 下四个入口都可见。 |
| FR-003 | 移动端 `微信 / 小红书 / 抖音` 点击后必须先复制文案，再显示倒计时提示，并尝试唤起对应 App。 | confirmed | 点击后出现 countdown dialog，并触发 URI scheme 跳转。 |
| FR-004 | 页面不得向用户展示 fallback 机制说明文案。 | confirmed | 分享区无“系统分享 / 复制 fallback”说明文本。 |
| FR-005 | 分享区必须只保留文字战书，不再出现图片/文字切换。 | confirmed | 页面中不存在 image/text mode switch。 |
| FR-006 | 分享区不得重复展示“分享你的成绩”类双重标题。 | confirmed | section title 与卡片内标题不重复。 |
| FR-007 | 中文 locale 中，section eyebrow 与辅助 copy 必须使用中文，不再混用 `Share Challenge`、`Agent Handoff`、`Journey Simulation`。 | confirmed | 中文页面 chrome 为中文；英文页面继续为英文。 |
| FR-008 | 推进中的 task stage 必须有 loading/spinner 视觉反馈。 | confirmed | active stage 状态标签可见 spinner。 |
| FR-009 | 已完成 task 必须支持本地展开/收起阶段明细。 | confirmed | completed task 可直接 toggle 详情，而不触发重播。 |
| FR-010 | 未完成 task 继续保留“切到当前焦点”的聚焦能力。 | confirmed | upcoming task 仍可切换 live focus。 |
| FR-011 | 当前代码变更需要被正式挂到 `005` mission 产物中。 | confirmed | `005` 下存在 spec/plan/tasks/WP docs，可作为后续实现依据。 |

## Non-Functional Requirements

| ID | Requirement | Status | Acceptance Criteria |
|---|---|---|---|
| NFR-001 | 移动端倒计时弹窗不能阻断复制与唤起主路径。 | confirmed | 弹窗只提示，不引入额外后端依赖。 |
| NFR-002 | loading 动效必须兼容 `prefers-reduced-motion`。 | confirmed | reduced-motion 下动画可被关闭。 |
| NFR-003 | 分享区和 Journey 的视觉风格必须继续保持当前公开挑战页的统一感。 | confirmed | 颜色、圆角、间距与现有表面一致。 |
| NFR-004 | 这轮补流程不能破坏当前可运行代码和本地验证能力。 | confirmed | `npm run test` 与 `npm run build` 可继续通过。 |

## Constraints

| ID | Constraint | Status | Acceptance Criteria |
|---|---|---|---|
| C-001 | 继续使用 `React + Vite + TypeScript`。 | confirmed | 不引入新框架。 |
| C-002 | 继续使用静态页能力，不接真实第三方分享 SDK。 | confirmed | URI scheme + copy + client-side UI 即可运行。 |
| C-003 | 本轮以当前分支 `feature/004-header-density-interaction-share-polish` 作为 planning/base/merge target。 | confirmed | mission meta 的 target branch 对齐当前分支。 |

## Risks & Assumptions

### Risks

- URI scheme 在不同浏览器内的可用性不完全一致，个别环境可能只完成复制、无法成功唤起 App。
- 分享区结构收缩后，测试用例需要同步调整，不然会继续按旧结构报错。
- completed task 展开态如果不收口好，容易让 card 高度重新变得失控。

### Assumptions

- “唤起 App” 的目标是把用户送进对应 App，之后是否发成功由用户在 App 内完成，不在静态页里闭环。
- `X` 继续采用 intent 打开分享入口即可。
- 这一轮优先补齐 planning artifacts，不回写一段并未真实发生的 implement/review 历史。

## Acceptance Criteria

- `005` mission 目录下已具备完整 spec/plan/tasks/WP planning artifacts。
- 分享区只保留文字战书。
- PC/移动端的社媒入口差异化已在 spec 与 tasks 中明确定义。
- Journey 的 active/loading 与 completed/expand 行为已在 spec 与 tasks 中明确定义。
- 当前代码状态仍可通过 `npm run test` 与 `npm run build`。
