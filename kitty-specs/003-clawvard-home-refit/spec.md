# Feature Specification: Clawvard Home Refit

**Mission**: `003-clawvard-home-refit`  
**Mission Type**: `software-dev`  
**Status**: `draft-ready-for-plan`

## Summary

对当前 `Claws Temple Bounty 2.0` 单页进行一次更彻底的对外重构：首屏、成绩卡、分享区和 Agent Prompt 先全面参考本地下载的 `Clawvard` 分享页结构；同时把 `Task 1-5` 的模拟叙事重新对齐到 `claws-temple-bounty2.0-skills` 的真实语义，不再把内部说明型文案、占位式解释和错误的任务理解直接暴露给用户。

这次迭代的核心不是“继续堆功能”，而是把页面改成一个真正能拿出去对比和传播的挑战页：用户一打开，就应该先看到成绩、等级、阵营、共振结果和挑战入口；当他往下看任务时，每一步都应该像真的正在推进，而不是在读一段产品说明。

## Background

上一轮 `002-bilingual-home-polish` 已经做完了双语、基础 CTA、分享模式和 Journey 手动启动，但本轮预览后暴露出更根本的问题：

1. 首页主标题和说明文案仍然偏“内部设计说明”，不像公开挑战页。
2. 首页里出现了明显不该给用户看的解释句，例如“首页先只看……”“演示页，不代替真实……”这类产品自述。
3. `Task 1-5` 的模拟内容对真实 skill 语义还不够准确，尤其 `Task 1` 的 faction 映射、`Task 3` 的 faction oath / 2 AIBOUNTY 门槛、以及 `Task 4` 的 SHIT Skills 原生 action。
4. 当前首页与分享区在视觉上没有足够贴近参考页，用户无法一眼把它当成“可以截图 / 可以对比 / 可以发起挑战”的成绩战书。
5. Journey 虽然已经改成点击后启动，但每到具体 task 时没有把当前任务滚动聚焦到用户视野中心，任务推进感仍然偏弱。

用户已经给出本地参考资源：

- `Share Score _ Clawvard.html`（本地下载参考页）
- `Share Score _ Clawvard_files/`（本地下载资源目录）

并明确要求：

- 首页、打分卡、分享区先尽量参考该页；
- 只保留用户该看到的结果和动作；
- Task 模拟必须按本地 bounty skill 的真实语义来；
- 模拟过程中要自动定位到当前 task。

## Goals

- 让首页视觉结构优先贴近 Clawvard 参考页，而不是继续沿用当前自定义排布。
- 删除对普通用户无意义的内部解释型文案，只保留成绩、状态、挑战和分享。
- 让首屏主文案直接表达真实结果，例如：
  `Claws Temple AI 在 Bounty2.0 拿下了 xxx 分，S 级评定，XXX 阵营，已经完成 Agent 共振并投票加入 XXX 阵营。这个成绩已经碾压了绝大多数 AI agent——你的 agent 敢来比一比吗？`
- 保留中英文切换和系统语言默认能力。
- 把 `Task 1-5` 的模拟流程重写成和本地 skill 一致的阶段表达。
- 让模拟在每到一个 task 或关键 stage 时自动滚动聚焦到对应卡片，让用户始终看得见当前进行到哪里。

## Non-Goals

- 不接入真实 `agent-spectrum`、真实 pairing、真实 oath、真实 SHIT Skills 远程执行。
- 不在这一轮接入真正的截图导出、分享 SDK 或二维码生成服务。
- 不改成多页应用。
- 不为了视觉贴近参考页而强行复制其全部品牌元素、域名或文案。

## Target Users

- 被分享链接带进来、希望一眼看懂“成绩如何”和“要不要接受挑战”的新用户。
- 已经在 Claws Temple Bounty 2.0 路线中，想拿当前结果去刺激别人的老用户。
- 想直接把挑战交给 Agent 的用户。
- 想看完整 Task 1-5 过程，但不想自己盯着长段说明找重点的用户。

## User Scenarios & Testing

### Scenario 1: 首屏像成绩战书，而不是产品说明

**Given** 用户第一次打开页面  
**When** 用户停留在首屏  
**Then** 用户首先看到的是品牌头、成绩卡、挑战文案和两个主 CTA，而不是内部解释型说明。

### Scenario 2: 首页结果表达完整

**Given** 用户只看成绩卡和文案  
**When** 用户阅读首页结果摘要  
**Then** 用户能立即知道这位 Agent 的分数、等级、阵营、共振状态，以及已完成阵营加入。

### Scenario 3: Task 1 结果带 faction 映射

**Given** 用户观看模拟  
**When** `Task 1` 推进完成  
**Then** 页面不只显示分数，还会显示类型结论、关键维度和对应的 faction 倾向。

### Scenario 4: Task 2 到 Task 5 语义准确

**Given** 用户逐步观看任务推进  
**When** 任务卡片依次点亮  
**Then** `Task 2` 表现为身份入口/登录/用户ID/共振，`Task 3` 表现为 faction oath 与阵营加入，`Task 4` 表现为 SHIT Skills 原生 action，`Task 5` 表现为 optional 社交信号。

### Scenario 5: 当前任务始终在视野里

**Given** 用户已经启动 Journey  
**When** 自动模拟切换到下一 Task 或关键阶段  
**Then** 页面会自动滚动，让当前任务卡片保持在用户可见的主区域内。

### Scenario 6: 分享区更像真正的战书

**Given** 用户点击 `转发战书给朋友`  
**When** 用户进入分享区  
**Then** 他看到的是更接近 Clawvard 风格的挑战卡和可复制挑战文案，而不是抽象的摘要组件。

## Options Comparison

### Option A: 只修文案和字号，保留现有结构

- 优点：改动小，速度快。
- 缺点：首屏整体结构、挑战感、分享感和参考页差异仍然很大；解决不了“看起来不像战书”的问题。

### Option B: 首页与分享区整体按参考页结构重排，任务区做语义重写与滚动聚焦

- 优点：能同时解决视觉、文案、CTA、任务理解和过程聚焦问题。
- 缺点：改动面更大，需要一起重构内容模型、任务种子和动画交互。

### Decision

选择 **Option B**。

理由：

- 用户已经明确要求“首页、打分、分享那块完全参考它来先”；
- 当前问题不只是 copy 问题，而是整个首屏信息架构不对；
- Task 模拟也需要同步校正，否则顶部和过程会继续互相打架。

## Functional Requirements

| ID | Requirement | Status | Acceptance Criteria |
|---|---|---|---|
| FR-001 | 页面必须继续支持 `中文` 与 `English` 双语切换，并默认跟随系统语言。 | confirmed | 刷新后仍能根据存储或系统语言选择正确文案。 |
| FR-002 | 首页 Hero 的主结构必须优先贴近 Clawvard 参考页：轻导航、成绩卡、挑战文案、双 CTA、Agent Prompt 卡。 | confirmed | 首屏结构与参考页的视觉层次一致，且不再出现大段说明文字。 |
| FR-003 | 首页主标题字号必须显著收敛，不得继续使用当前 oversized display heading 作为第一视觉。 | confirmed | 首屏标题与结果卡的视觉重点分离，分数卡而不是标题成为第一焦点。 |
| FR-004 | 用户可见文案中必须移除“首页先只看……”这类内部说明型句子。 | confirmed | Hero 可见文案只保留对用户有意义的结果表达和挑战话术。 |
| FR-005 | 用户可见文案中必须移除“演示页，不代替真实注册……”这类面向内部或 QA 的边界说明。 | confirmed | 公开页面默认不再直接展示该类 disclaimer。 |
| FR-006 | 首页挑战文案必须包含分数、等级、阵营、已共振、已投票加入阵营等结果信息。 | confirmed | Hero 文案可直接表达 `xxx 分 / S级 / xxx 阵营 / 已共振 / 已加入阵营`。 |
| FR-007 | `Task 1` 模拟结果必须包含 score、grade、type、dominant axes，以及与 faction 的映射结果。 | confirmed | Task 1 结束时不仅有分数，还能看到 faction 倾向或 faction 映射结果。 |
| FR-008 | `Task 1` 的 score / grade / faction 结果必须由同一个受控随机种子生成，并在首页、分享区、Journey 中保持一致。 | confirmed | 同一轮页面中，Hero、Share、Journey 显示的 score / grade / faction 不互相矛盾。 |
| FR-009 | `Task 2` 模拟必须表现为身份入口、登录恢复/首次进入、用户ID 自动解析、开放寻配与共振完成。 | confirmed | Task 2 的 stage 文案与 skill flow 对齐。 |
| FR-010 | `Task 3` 模拟必须表现为 faction 选择、授权检查、正式 oath、加入阵营、Telegram follow-up。 | confirmed | Task 3 至少出现 faction 选择、vote/oath 成功、加入阵营和 Telegram 后续线索。 |
| FR-011 | `Task 3` 的可见结果必须体现正式 faction oath 需要 `2 AIBOUNTY` 门槛这一事实。 | confirmed | Task 3 的阶段文案或 proof 中能看到 token threshold 语义。 |
| FR-012 | `Task 4` 必须继续被表现为 SHIT Skills 原生流程，不得伪装为本地站内已完成。 | confirmed | Task 4 卡片会清楚显示 native action 语义。 |
| FR-013 | `Task 4` 的默认推荐动作必须是 `publish`，并保留 `comment` 等备选动作语义。 | confirmed | Task 4 任务文案中能看到 publish 为默认推荐。 |
| FR-014 | `Task 5` 必须表现为可选社交信号，而不是资格主线的一部分。 | confirmed | Task 5 被标记为 optional，且不会压过主线语义。 |
| FR-015 | `接受挑战` 必须继续跳转到 Agent Prompt 区。 | confirmed | 点击后滚动到 `#agent-prompt`。 |
| FR-016 | `转发战书给朋友` 必须继续跳转到分享区。 | confirmed | 点击后滚动到 `#share`。 |
| FR-017 | `观看模拟 Task 1-5 的流程` 必须继续跳转并启动 Journey。 | confirmed | 点击后滚动到 Journey 区并开始自动推进。 |
| FR-018 | Journey 在推进到新 task 或关键阶段时，必须自动滚动定位到当前任务卡片。 | confirmed | 自动播放时当前卡片会进入视野主区域。 |
| FR-019 | 分享区必须继续支持 `分享图片 / 分享文字` 双模式，但视觉结构要先更贴近参考页。 | confirmed | 两种模式仍可切换，且 share card 更像参考页。 |
| FR-020 | Agent Prompt 区必须继续保留 terminal card 风格，并放在首页主 CTA 之后的高优先级位置。 | confirmed | 首屏挑战卡之下紧跟 terminal 风格的命令区。 |

## Non-Functional Requirements

| ID | Requirement | Status | Acceptance Criteria |
|---|---|---|---|
| NFR-001 | 首屏在 `360px` 宽度移动端上必须与参考页一样保持单卡主视觉，不出现横向滚动。 | confirmed | iPhone 常见视口下首屏结构完整可读。 |
| NFR-002 | 自动滚动聚焦不得造成明显抖动；当当前任务已经在主视区时，不应频繁重复滚动。 | confirmed | 自动播放时滚动行为稳定，不会每一小步都晃屏。 |
| NFR-003 | reduced-motion 模式下必须关闭强制平滑滚动和高频动画，但仍保留当前任务聚焦逻辑。 | confirmed | 无障碍环境下仍可看清当前推进位置。 |
| NFR-004 | 首页、分享区和任务区的视觉风格必须统一到“公开成绩战书”感，而不是“后台 demo panel”感。 | confirmed | 页面整体更像 landing/share page，而不是内部工具页。 |

## Constraints

| ID | Constraint | Status | Acceptance Criteria |
|---|---|---|---|
| C-001 | 继续基于当前 `React + Vite + TypeScript` 工程实现。 | confirmed | 不引入新框架。 |
| C-002 | 首页、成绩卡、分享区的结构优先参考 Clawvard，本轮不强压上一轮 coral 主题优先级。 | confirmed | 视觉决策优先服从参考页结构与气质。 |
| C-003 | `Task 1-5` 的语义必须以本地 `claws-temple-bounty2.0-skills` 仓库为唯一来源，不凭记忆重写。 | confirmed | 实现可追溯到 skill 中的 task flow 与 config。 |
| C-004 | `Task 1` 的随机模拟只能是受控随机，不得和同一页其他区块结果冲突。 | confirmed | 同一 seed 生成的结果在全页一致。 |
| C-005 | `Task 4` 必须继续指向 `https://www.shitskills.net/skill.md` 的 native handoff 语义。 | confirmed | Task 4 卡片仍保留第三方 native flow 边界。 |

## Risks & Assumptions

### Risks

- 参考页强烈偏移动端单列卡片，如果直接照搬，桌面端可能显得过窄。
- 随机模拟如果不做好种子共享，首页和任务区会出现结果不一致。
- 自动滚动如果每个 stage 都触发，会让用户感觉页面“抢焦点”。

### Assumptions

- 首屏挑战文案里的 `xxx 分 / 等级 / 阵营` 允许使用前端受控模拟数据，而不是实时真实结果。
- Task 1 的 faction 映射可以根据前端内置 seed 和 faction config 做 deterministic mock，不需要真的运行依赖 skill。
- 本轮“参考 Clawvard”指的是结构、视觉层次和交互节奏，不是品牌 copy 全量照搬。

## Metrics

### North Star

- 首屏挑战转化率：进入页面后点击 `接受挑战` 或 `转发战书给朋友` 的用户占比。

### Guardrails

- 首屏误读率：用户把页面误认为内部 demo 的比例需要下降。
- 任务理解率：用户能准确说出 Task 2-5 在做什么的比例需要提升。
- Journey 可视连续性：自动播放过程中当前任务始终在可见区的比率。

## Milestones

### MVP

- 重做首页结构与 Hero 文案。
- 重做 share 卡结构。
- 校正 Task 1-5 内容。
- 补自动滚动聚焦。

### Iteration

- 加强分享图片模式的截图友好度。
- 如有需要，再补更高级的段落进场动画或 sticky scrollytelling。

## Acceptance Criteria

- 首页不再出现明显内部说明型文案。
- 首页结果卡、挑战文案和 CTA 结构接近参考页。
- `Task 1-5` 的文案与本地 skill 真实语义对齐。
- 自动模拟时，当前任务会进入可见主区域。
- 合并后的 `main` 上测试与构建全部通过。
