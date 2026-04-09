# Research: Clawvard 风格首页重构与任务语义校正

## Decision 1: 首页与分享区结构优先参考本地 Clawvard 分享页

### Decision

首页和分享区优先参考本地下载的 Clawvard 分享页结构：

- 轻 header
- 主成绩卡
- 一段挑战话术
- 双主 CTA
- terminal 风格 Agent Prompt 卡

### Rationale

- 用户已经明确要求“首页、打分、分享那块完全参考它来先”。
- 当前页面的问题不是单个 copy，而是整个结构不像公开挑战页。
- 本地参考资源可直接用于对照：
  - `/Users/huangzongzhe/Downloads/Share Score _ Clawvard.html`
  - `/Users/huangzongzhe/Downloads/Share Score _ Clawvard_files/0kxvj-jdkelvt.css`

### Alternatives Considered

- 只调字号和文案：不能解决结构问题。
- 继续沿用 coral 主题优先：会让页面与参考页气质继续偏离。

## Decision 2: 删除所有面向内部的说明型文案

### Decision

Hero 和首屏结果区不再直接展示“首页先只看……”“演示页，不代替真实……”这类说明。

### Rationale

- 这些文案不是用户任务的一部分。
- 用户已经明确指出这类话是“我们内部用的”。
- 对外页面应让用户先看到结果和动作，而不是先解释页面设计意图。

### Alternatives Considered

- 把这些文案缩小放到底部：本质上还是把内部视角放给用户看。

## Decision 3: 用受控随机种子统一 Task 1 结果与整页结果

### Decision

引入会话级 `BountySimulationSeed`，统一生成并固定：

- score
- grade
- agent type
- dominant axes
- mapped faction
- task4 default action
- task5 preferred platform

### Rationale

- 用户明确要求 `Task 1` 的打分与 faction “随机模拟一下”。
- 如果不做统一种子，Hero、Share 和 Journey 会互相打架。
- 受控随机比静态常量更像真实挑战页，但又不会失去可测试性。

### Alternatives Considered

- 全静态常量：缺少挑战页的变化感。
- 每块单独随机：结果会互相冲突。

## Decision 4: Task 语义完全回归本地 bounty skill

### Decision

任务阶段文案与 proof 必须严格回到本地 `claws-temple-bounty2.0-skills`：

- `Task 1`: coordinate reading + type + faction mapping
- `Task 2`: identity entry + sign-in + user ID + open pairing
- `Task 3`: faction oath + `2 AIBOUNTY` threshold + Telegram follow-up
- `Task 4`: SHIT Skills native action
- `Task 5`: optional social signal

### Rationale

- 当前任务区有被“产品化简化”过头的痕迹。
- 用户已明确要求“你都看看 skill 里面到底在干嘛”。
- 本地 skill 已经是唯一可信语义源。

### Alternatives Considered

- 继续沿用当前简化内容：会继续误导用户。

## Decision 5: Journey 聚焦滚动先用原生实现，参考社区动画方案

### Decision

Journey 自动聚焦采用：

- 原生 `scrollIntoView`
- CSS transitions
- 当前 task 高亮和 proof 点亮

并参考社区常用滚动动画方案，而非立刻引入新依赖。

### Rationale

- `react-spring` GitHub 仓库当前约 `29.1k` stars，说明 React 社区对其动画建模足够成熟。
- `GSAP ScrollTrigger` 官方文档非常适合复杂滚动叙事，但对当前单页 refit 来说偏重。
- 当前需求核心是“滚到正在进行的 task”，不是做整页电影式叙事。

### Alternatives Considered

- 直接引入 GSAP：能力强，但当前阶段实现成本偏高。
- 完全不滚动：无法满足用户“保证用户直接看到进行到哪一步”的要求。
