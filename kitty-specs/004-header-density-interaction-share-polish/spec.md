# Feature Specification: Header Density Interaction Share Polish

**Mission**: `004-header-density-interaction-share-polish`  
**Mission Type**: `software-dev`  
**Status**: `draft-ready-for-plan`

## Summary

这一轮继续沿着 Clawvard 分享页的公开挑战感往前走，但重点从“像不像”切到“密不密、顺不顺、动得够不够细”。页面需要把 `Logo + Claws Temple + 语言` 提升成正式 header，把首屏高度压缩到更接近参考页的一屏感，让用户在常见桌面和移动视口里都能更快同时看到成绩卡和 Agent Prompt 卡。

同时补齐公开分享页应有的微交互：按钮 hover / tap 反馈、`接受挑战` 时对目标命令卡的 attention shake、分享区的社媒入口，以及 PC 端更直观的单列 `Task 1-5` 流程。

## Background

`003-clawvard-home-refit` 已经解决了大方向问题，但新一轮本地预览后仍有几处明显落差：

1. 顶部 `Logo + Claws Temple + 语言` 还只是塞在 Hero 里的零散 chrome，不像真正的 header。
2. `查看完整成绩单` 仍然占用首屏注意力，但这轮公开挑战页不需要这个入口。
3. 首屏字体、模块和留白仍偏大，导致桌面端常见视口下分数卡和 Agent Prompt 不能稳定同时进入第一屏。
4. 参考页的 CTA 有更明确的 hover scale / tap feedback / 目标模块震动提示，我们当前还不够细。
5. 分享区缺少参考页里移动端常见的 `X / 微信 / 小红书 / 抖音` 社媒入口。
6. Journey 在移动端已经能跟着当前任务走，但 PC 端依旧是多列卡片，阅读顺序不直观；badge 尺寸也不统一。

本轮直接以用户提供的本地 Clawvard 下载页作为结构和微交互参考：

- `Share Score _ Clawvard.html`（本地下载参考页）
- `Share Score _ Clawvard_files/`（本地下载资源目录）

## Goals

- 把品牌、语言切换收敛成正式 header 模块。
- 移除 `查看完整成绩单`。
- 把首屏压缩到更接近参考页的一屏感，让分数卡和 Agent Prompt 都尽量在首屏可见。
- 给主要 CTA 补上 hover / tap / shake 等微交互。
- 在分享区加入 `X / 微信 / 小红书 / 抖音` 四个社媒入口。
- 把 PC 端 Journey 改成从上到下的单列 `Task 1-5` 流程，并统一 badge 层级尺寸。

## Non-Goals

- 不接入真实社媒 SDK。
- 不把页面拆成多页。
- 不改变 `Task 1-5` 的业务语义，只优化其展示密度和交互。
- 不引入新的前端框架。

## User Scenarios & Testing

### Scenario 1: 首屏一眼看到挑战卡和命令卡

**Given** 用户在桌面端或移动端打开页面  
**When** 用户停在第一屏  
**Then** 用户能看到正式 header、成绩卡和 Agent Prompt 卡，而不是被大字号和空白切成两屏。

### Scenario 2: 接受挑战时目标模块有明确反馈

**Given** 用户点击 `接受挑战`  
**When** 页面滚动到 Agent Prompt  
**Then** Prompt 卡会有一次轻量 shake / highlight，明确告诉用户“就是这里”。

### Scenario 3: 分享区有社媒入口

**Given** 用户进入分享区  
**When** 用户看向分享动作  
**Then** 用户能看到 `X / 微信 / 小红书 / 抖音` 四个社媒按钮，并获得跳转或复制 fallback。

### Scenario 4: PC 端 Journey 更像流程

**Given** 用户在桌面端启动 Task 模拟  
**When** 页面自动推进  
**Then** `Task 1-5` 以单列纵向顺序呈现，用户能直观看清当前进行到哪一步。

## Options Comparison

### Option A: 只调字号与间距

- 优点：改动最小。
- 缺点：仍然解决不了 header 不成型、Prompt 不够靠前、CTA 细节不足和 PC Journey 不直观的问题。

### Option B: 做一次密度与交互微重构

- 优点：能一起解决信息密度、微交互、分享入口和 Journey 阅读顺序。
- 缺点：需要同步修改组件结构、样式 token 和测试。

### Decision

选择 **Option B**。

## Functional Requirements

| ID | Requirement | Status | Acceptance Criteria |
|---|---|---|---|
| FR-001 | 页面顶部必须提供正式 header，包含品牌 logo、`Claws Temple` 文案和语言切换。 | confirmed | Hero 上方出现独立 header 结构，不再是零散 topbar。 |
| FR-002 | `查看完整成绩单` 入口必须从页面中移除。 | confirmed | 页面渲染后不再存在该按钮或链接。 |
| FR-003 | 首屏密度必须优化，使常见桌面与移动视口下尽量同时看到分数卡和 Agent Prompt。 | confirmed | 首屏垂直留白与模块高度显著收敛。 |
| FR-004 | `接受挑战` 点击后必须滚动到 Agent Prompt，并触发一次目标模块 shake / emphasis。 | confirmed | 点击后命令卡出现一次明显但轻量的 attention 动效。 |
| FR-005 | 主要 CTA 在桌面端 hover 时必须有 scale / shadow 反馈，在移动端 tap 时必须有 press 感。 | confirmed | 交互按钮 hover / active 状态可见。 |
| FR-006 | 分享区必须新增 `X / 微信 / 小红书 / 抖音` 四个社媒入口。 | confirmed | 分享卡底部有四个按钮。 |
| FR-007 | 社媒入口在无法做真实 SDK 集成时，必须提供稳定 fallback，如复制文案、调用系统分享或打开 X intent。 | confirmed | 非 X 平台也有可执行 fallback，不是纯装饰按钮。 |
| FR-008 | Journey 在桌面端必须改为 `Task 1-5` 自上而下单列布局。 | confirmed | 桌面端不再出现三列 task grid。 |
| FR-009 | Journey 的状态 badge 必须统一尺寸与层级，不再出现“当前主舞台”和“已走完”明显大小不一致。 | confirmed | 各 badge 视觉基线一致。 |
| FR-010 | 自动模拟时，页面仍需把当前 task 保持在可视主区域。 | confirmed | task 切换时页面会滚动到当前任务附近。 |
| FR-011 | 中英文切换与系统语言默认行为必须继续保留。 | confirmed | locale 行为与当前实现兼容。 |

## Non-Functional Requirements

| ID | Requirement | Status | Acceptance Criteria |
|---|---|---|---|
| NFR-001 | 不得出现横向滚动。 | confirmed | `360px` 宽视口下页面仍可完整阅读。 |
| NFR-002 | 微交互动效必须支持 `prefers-reduced-motion` 降级。 | confirmed | reduced-motion 下保留功能但弱化动画。 |
| NFR-003 | 首屏视觉焦点必须继续落在分数卡，而不是标题或说明文案。 | confirmed | 用户第一眼优先看到 score card。 |
| NFR-004 | 分享和 Journey 的样式必须与当前 Clawvard-inspired 表面保持统一。 | confirmed | 全页仍像公开挑战页，而不是拼出来的组件集。 |

## Constraints

| ID | Constraint | Status | Acceptance Criteria |
|---|---|---|---|
| C-001 | 继续使用 `React + Vite + TypeScript`。 | confirmed | 不引入新框架。 |
| C-002 | 本轮微交互优先使用现有 CSS / DOM 能力实现，不新增动画依赖。 | confirmed | hover / tap / shake 通过轻量实现完成。 |
| C-003 | 分享平台能力以 web-safe fallback 为准，不依赖私有 app SDK。 | confirmed | 静态页可稳定运行。 |

## Risks & Assumptions

### Risks

- 首屏如果压得过头，会牺牲文案可读性和触控舒适度。
- 社媒按钮如果只做视觉不做 fallback，会变成伪交互。
- PC Journey 改成单列后，如果节奏层级不够，可能显得太长。

### Assumptions

- “尽量一屏看到”是指在常见视口下尽量同时看到两个关键模块，而不是强制每个设备都完全零滚动。
- `X` 可以直接用 tweet intent，其余平台以复制或系统分享 fallback 为主。

## Acceptance Criteria

- 正式 header 已落地，且移除了 `查看完整成绩单`。
- 分数卡与 Agent Prompt 的首屏密度明显更接近参考页。
- CTA 具备 hover / tap / shake 微交互。
- 分享区出现 `X / 微信 / 小红书 / 抖音` 按钮与稳定 fallback。
- PC Journey 改为单列顺序流，并统一 badge 尺寸。
- `npm run test` 与 `npm run build` 通过。
