# Research: Claws Temple Bounty 长单页

## Decision 1: Use React + Vite + TypeScript

### Decision

使用 `React + Vite + TypeScript` 构建单页静态站。

### Rationale

- 用户已明确指定 `React + Vite`
- 仓库当前还没有前端基础设施，Vite 适合从空仓快速起步
- TypeScript 更适合约束 `TaskMilestone`、`ShareSummary`、`AgentPromptCard` 这类结构化内容

### Alternatives Considered

- `vanilla HTML/CSS/JS`: 更轻，但当任务模拟与分享态都变成结构化内容后，可维护性明显下降
- `Next.js`: 功能更强，但对单页静态演示站来说超出当前需求

## Decision 2: Keep the page content-driven

### Decision

把 Hero、Task 1-5、分享态和 Agent Prompt 全部建模为本地内容配置，而不是散落在 JSX 中直接硬编码。

### Rationale

- 任务顺序、品牌词和外部流边界已经在 skill 仓库中定义清晰，适合映射成内容模型
- 内容驱动更方便后续在 `/spec-kitty.tasks` 阶段把“内容层”和“UI 层”拆成不同工作包
- 分享态和模拟态可以复用同一份基础数据

### Alternatives Considered

- `全部写死在组件里`: 起步快，但后续文案调整、术语统一、测试覆盖都更困难

## Decision 3: Model the journey with a lightweight front-end state machine

### Decision

使用本地时间轴状态机管理五个 Task 的推进顺序与阶段切换，结合 CSS 动画实现逐步完成感。

### Rationale

- 需求强调 `duangduangduang` 和分步模拟
- 页面没有真实后端，也不需要事件总线或复杂状态管理
- 轻量状态机足以表达 `pending -> active -> done` 及任务内阶段变化

### Alternatives Considered

- `纯滚动动画`: 视觉可做，但很难保证状态和文案同步
- `引入重型动画库`: 可行，但对于单页演示站依赖成本偏高

## Decision 4: Preserve Task 4 as a third-party native flow

### Decision

在页面中将 `Task 4` 明确建模为第三方 `SHIT Skills` 原生流程，而不是本地模拟成闭环完成。

### Rationale

- 这是 spec 和 skill 仓库共同强调的业务边界
- 如果把 Task 4 伪装成本地闭环，会误导用户对真实资格路径的理解

### Alternatives Considered

- `把 Task 4 渲染成和 Task 1-3 一样的本地完成卡`: 视觉统一，但会破坏业务真实性

## Decision 5: Treat the share section as a public result card

### Decision

分享区以“可截图传播的公开结果卡”为中心，核心结论固定为 `Agent 打分多少`、`已共振`、`已加入阵营`。

### Rationale

- 用户已经明确修正文案主体必须是 `Agent`
- 这一块承担传播目标，需要在很短阅读时间内完成信息传达

### Alternatives Considered

- `做成文字段落总结`: 信息完整，但传播效率低
- `复制 Clawvard 维度成绩单`: 参考价值高，但不能直接映射 Bounty 2.0 的任务旅程
