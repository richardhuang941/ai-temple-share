# Feature Specification: Claws Temple Bounty 长单页

**Mission**: `001-bounty-journey-longpage`  
**Mission Type**: `software-dev`  
**Status**: `draft-ready-for-plan`

## Summary

为 `龙虾圣殿 Bounty 2.0` 创建一个公开可访问的单个长单页，用一个连续的、带节奏感的模拟过程，把 `Task 1` 到 `Task 5` 的完整路径讲清楚，同时提供一块适合转发的结果分享区，以及一块适合复制给 AI Agent 的执行提示区。

页面的核心目标不是代替真实任务执行，而是把原本分散在 skill、流程说明和第三方步骤里的叙事，压缩成一个一眼能懂、一路能看完、截图也能传播的公共页面。

## Background

当前 `Claws Temple Bounty 2.0` 的真实流程主要存在于 skill 仓库和依赖 skill 协作里。对第一次接触这条路径的人来说，最难的不是理解单个 Task，而是理解整条路径为什么存在、五个 Task 如何衔接、哪些步骤是本路径内完成、哪些步骤需要进入第三方原生流程，以及完成后该如何向别人展示结果。

我们需要一个面向外部传播和内部引导都成立的单页资产，去完成三件事：

1. 把 `Task 1-5` 讲成一个完整旅程，而不是一组割裂指令。
2. 把“Agent 已完成到哪一步”做成像成绩单/战报一样的公开分享态。
3. 把“让 AI Agent 执行什么”这件事，做成可以直接复制使用的明确提示。

## Goals

- 让用户在一次滚动中理解 `Task 1-5` 的完整路径和下一步该做什么。
- 用逐步推进的模拟过程表现 `Task 1-5` 的完成感，而不是静态罗列说明。
- 提供一个适合截图、传播、分享的结果态，突出 `Agent 打分`、`已共振`、`已加入阵营`。
- 提供一块适合给 AI Agent 直接使用的提示区，帮助用户把仓库和 skill 路线交给 Agent 继续推进。

## Non-Goals

- 不在本页面内直接执行真实的注册、共振、授权、投票、Telegram 入群或 SHIT Skills 发布动作。
- 不构建多页信息架构；本需求不包含独立详情页、独立分享页或独立文档页。
- 不接入真实用户态、真实积分、真实链上数据或真实第三方登录态。
- 不重写 `claws-temple-bounty2.0-skills` 的业务逻辑；本页只负责按其现有定义进行可视化表达和演示。

## Target Users

- 第一次了解 `龙虾圣殿 Bounty 2.0` 的潜在参与者。
- 已经知道 bounty 名称，但还不理解完整路径的用户。
- 已完成部分任务、需要一个对外展示结果的用户。
- 希望把真实 skill 仓库交给 AI Agent 执行的用户。

## User Scenarios & Testing

### Scenario 1: 首次访问者理解主线

**Given** 用户第一次打开页面  
**When** 用户从头开始浏览单页  
**Then** 用户可以看懂五个 Task 的顺序、每一步的目的，以及哪些步骤属于主线、哪些是可选扩展。

### Scenario 2: 用户观看完整模拟过程

**Given** 用户进入任务模拟区  
**When** 页面按顺序展示 `Task 1` 到 `Task 5` 的推进状态  
**Then** 用户可以看到从 `Agent 打分`、`开通身份入口/登录/解析用户ID`、`共振成功`、`拿到 Token`、`部落宣誓`、`加入 Telegram`、`发布或评论 Skill` 到 `社交寻配` 的完整演示路径。

### Scenario 3: 用户只想获取分享结果

**Given** 用户主要目的是展示结果  
**When** 用户进入分享结果区  
**Then** 用户可以在不阅读全部正文的前提下理解该 Agent 的分数、共振状态、阵营归属和当前路径完成情况。

### Scenario 4: 用户想把后续动作交给 AI Agent

**Given** 用户希望继续真实推进 bounty  
**When** 用户查看 AI Agent 指令区  
**Then** 用户可以获得至少一段可直接复制的提示语，让 Agent 读取 `Claws-Temple/claws-temple-bounty2.0-skills` 并按我们的品牌语言与任务逻辑继续执行。

### Scenario 5: 移动端快速扫读

**Given** 用户在移动端打开页面  
**When** 用户快速上下滚动  
**Then** 用户仍能读清主要标题、任务状态、分享结论和下一步提示，且不出现横向滚动。

### Edge Cases

- 用户直接落在分享区时，仍应能看懂这是 `Bounty 2.0` 的模拟完成结果，而不是孤立海报。
- 用户可能把模拟结果误解为真实执行结果，页面需要有清晰的“演示/模拟”语义边界。
- 用户可能不了解 `Task 4` 为何是第三方流程，页面需要明确这是原生 SHIT Skills 步骤，而不是本页内部流程缺失。
- 用户可能只关心 `评论` 而不是 `发布`，页面需要保留 `评论` 作为可见的 Task 4 备选动作，但默认叙事仍推荐 `发布`。

## Functional Requirements

| ID | Requirement | Status | Acceptance Criteria |
|---|---|---|---|
| FR-001 | 产品必须以单个公开长单页的形式呈现完整内容。 | confirmed | 页面只包含一个连续滚动的主页面，用户无需跳转到第二个内容页即可看完核心叙事。 |
| FR-002 | 页面必须包含至少四个主内容区：总览 Hero、Task 1-5 过程模拟区、分享结果区、AI Agent 指令区。 | confirmed | 评审者能在页面中识别出这四类区块，并分别理解它们的用途。 |
| FR-003 | Task 模拟区必须按 `Task 1` 到 `Task 5` 的真实顺序展示，且使用 `龙虾圣殿` 品牌词典中的中文任务名称。 | confirmed | 页面可见 `原力坐标测绘`、`光锥交汇`、`原野部落归属`、`奇物志`、`社交寻配` 五个任务名，顺序正确。 |
| FR-004 | Task 1 模拟必须展示一个 `Agent 打分` 结果，并体现坐标/维度/类型判断的完成感。 | confirmed | 用户能看见一个明确的分数或等级结果，并理解这是 Agent 的测绘结果而非抽象说明。 |
| FR-005 | Task 2 模拟必须体现 `开通身份入口`、`登录恢复或首次进入`、`用户ID 解析`、`共振成功` 与 `获得 Token` 的连续过程。 | confirmed | 页面中可见这些关键阶段，且用户能判断 Task 2 的结果已经从准备阶段推进到成功阶段。 |
| FR-006 | Task 3 模拟必须体现 `选择部落方向`、`部落宣誓`、`授权或提交过程`、`已加入阵营`，并在成功态中包含 `加入 Telegram` 的后续动作。 | confirmed | 用户能从页面中看到 Task 3 成功后需要去 Telegram 报到，且这一步是后续动作而不是本页内真实执行。 |
| FR-007 | Task 4 模拟必须体现进入 `SHIT Skills` 原生流程，并以 `发布` 作为默认叙事动作，同时保留 `评论` 作为可见备选动作。 | confirmed | 页面中明确说明 Task 4 是原生流程，且至少展示 `发布` 默认路线与 `评论` 备选路线。 |
| FR-008 | Task 5 模拟必须作为可选加分步骤呈现，并明确它不会阻塞主线资格。 | confirmed | 页面中可见 Task 5 的可选性质，且不会与 Task 1-4 的主线资格步骤混淆。 |
| FR-009 | 过程模拟必须以逐步推进的方式表达完成过程，体现用户所说的 `duangduangduang` 或阶段推进感。 | confirmed | 用户进入任务模拟区后，可以明显感知状态是分步推进的，而不是一张静态总表。 |
| FR-010 | 分享结果区必须展示一个可直接传播的完成态，至少包含 `Agent 打分多少`、`已共振`、`已加入阵营` 三类核心结果。 | confirmed | 评审者在分享区中能一眼识别这三类结果，并理解该区块可用于截图传播。 |
| FR-011 | 分享结果区的对外文案必须使用 `Agent 打分多少、已共振、已加入阵营` 语义，不得使用 `龙虾打分多少` 作为同类主表达。 | confirmed | 页面主分享文案中不出现 `龙虾打分多少`，而是使用 `Agent` 作为主体。 |
| FR-012 | AI Agent 指令区必须提供适合本项目的可复制提示语，帮助用户让 Agent 读取并执行 `Claws-Temple/claws-temple-bounty2.0-skills` 的任务路径。 | confirmed | 页面中存在至少一段可复制的 Agent 提示语，且其内容显式指向该 skill 仓库或等价仓库说明。 |
| FR-013 | AI Agent 指令区必须提供“适配我们项目”的表述，而不是照搬参考站的泛化句式。 | confirmed | 评审者可看出提示语提到了 `Claws Temple`、`Task 1-5`、品牌语言或真实 skill 路径，而不是无上下文的通用命令。 |
| FR-014 | 页面可视层的任务解释和术语必须与本地 skill 仓库中的品牌词和任务逻辑保持一致。 | confirmed | 页面不使用被禁止的内部术语替代公开表达，任务名称和关键名词与品牌词典一致。 |
| FR-015 | 页面必须明确告诉用户：`Task 1` 到 `Task 3` 可在本路径中完成，`Task 4` 是完成资格所需的第三方原生步骤，`Task 5` 是可选扩展。 | confirmed | 用户读完页面后能正确回答哪几步是本路径主线、哪一步是第三方原生流、哪一步是可选项。 |
| FR-016 | 页面必须把模拟与真实执行区分开来，避免用户误以为页面已经代替他们完成了真实操作。 | assumed | 页面中存在清晰的 `模拟`、`示意`、`演示` 或等价提示，使用户不会把单页内容误读为真实执行凭证。 |

## Non-Functional Requirements

| ID | Requirement | Status | Acceptance Criteria |
|---|---|---|---|
| NFR-001 | 页面首屏的核心价值和第一屏主要内容必须在标准宽带网络下于 2 秒内可读。 | assumed | 在标准桌面或移动网络环境下，用户在 2 秒内可以读到 Hero 标题与主叙事。 |
| NFR-002 | 页面在 `360px` 到 `1440px` 视口宽度之间必须保持可读，不出现横向滚动。 | assumed | QA 在常见手机与桌面宽度下查看页面时，不出现横向滚动，主要文案不被裁切。 |
| NFR-003 | 自动或半自动的阶段推进序列必须在 20 秒内完整覆盖五个 Task，且每个阶段至少有 2 秒可被阅读。 | assumed | QA 观察完整模拟节奏时，能在 20 秒内看完五步，并有足够时间读到当前阶段关键信息。 |
| NFR-004 | 分享结果区的核心结论必须在桌面一个视口内、移动端 1.5 个视口内被读完。 | assumed | 用户无需长距离滚动，即可在分享区读完分数、共振状态、阵营状态和一句总结。 |
| NFR-005 | 所有关键视觉状态都必须有文本对应，且所有可复制或可点击元素都可通过键盘访问。 | assumed | QA 可在关闭动画理解的情况下，仍通过文字读懂状态；键盘用户可访问主要互动点。 |
| NFR-006 | 页面中的任务名称、品牌主语和关键名词必须保持 `100%` 术语一致性。 | confirmed | 全页抽查核心术语时，不出现同一对象被多种未批准表述混用的情况。 |

## Constraints

| ID | Constraint | Status | Acceptance Criteria |
|---|---|---|---|
| C-001 | 需求范围限定为一个长单页，不拆成多页或独立分享页。 | confirmed | 最终范围不包含单独的二级页面结构。 |
| C-002 | 页面只做演示与传播，不依赖真实账号、真实链上数据、真实 Telegram/SHIT Skills 连接。 | confirmed | 验收时页面可以在无真实第三方连接的情况下独立展示完整内容。 |
| C-003 | 任务内容必须以本地参考仓库 `/Users/huangzongzhe/workspace/vibeCoding/claws-temple-bounty2.0-skills` 为业务语义来源。 | confirmed | 评审对照参考仓库时，能看出任务顺序、品牌词和关键动作与来源一致。 |
| C-004 | 页面必须保留 `Task 4` 的第三方原生流程属性，不把它改写成本地闭环完成状态机。 | confirmed | 页面仍明确说明 `Task 4` 是 SHIT Skills 原生动作，而非页面内部自建完成流程。 |
| C-005 | Task 4 的主叙事默认使用 `发布`，但页面也必须让用户知道 `评论` 是允许的动作。 | confirmed | 页面中默认路线是发布，但评论路径也被明确看见。 |
| C-006 | 分享态的主体措辞必须使用 `Agent` 作为默认执行主体。 | confirmed | 分享区主标题或主状态中使用 `Agent` 作为主体。 |
| C-007 | 页面对外术语应优先使用品牌可见词，不使用 `链上`、`钱包`、`ca_hash`、内部部落名等禁用词。 | confirmed | 页面抽查时不出现这些禁用词作为面向用户的主表达。 |
| C-008 | 页面可引用 Telegram 或 SHIT Skills 作为下一步去向，但不能误导用户认为这些动作已由页面自动完成。 | confirmed | 页面中的外部动作表述为下一步或后续动作，而不是已在本页完成。 |

## Success Criteria

- 至少 `90%` 的内测评审在浏览页面 `3` 分钟内能正确复述五个 Task 的顺序和目的。
- 至少 `80%` 的内测评审在浏览分享区 `5` 秒内能说出该 Agent 的三个关键信号：`打分结果`、`已共振`、`已加入阵营`。
- 至少 `80%` 的内测评审在浏览任务模拟区后，能明确指出 `Task 4` 是第三方原生流程，`Task 5` 是可选项。
- 至少 `70%` 的内测评审在不接受额外口头说明的情况下，能从 AI Agent 指令区直接复制并理解下一步如何把任务交给 Agent。

## Key Entities

### Agent Profile Snapshot

- score_or_grade
- six_dimension_summary
- agent_type
- missing_strengths
- next_task_hint

### Task Milestone

- task_id
- branded_name
- one_line_purpose
- current_stage
- proof_of_progress
- next_action

### Share Summary

- headline
- score_summary
- resonance_status
- faction_status
- qualification_note

### Agent Prompt Card

- prompt_title
- prompt_body
- reference_repo
- expected_outcome

### Faction Record

- faction_name
- stance_copy
- oath_stage
- telegram_follow_up

## Dependencies

- `Clawvard` 公开分享页：作为分享态版式和传播导向的参考来源。
- `claws-temple-bounty2.0-skills` 本地仓库：作为 Task 1-5 真实顺序、品牌词、关键状态和对外说法的来源。
- `SHIT Skills` 原生流程说明：作为 Task 4 的第三方原生步骤来源。

## Assumptions

- 页面将使用代表性的模拟数据和示意结果，而不是读取真实用户任务进度。
- Task 2 的主叙事默认采用 `开放寻配` 成功后的完成态，因为它更能体现“已共振”和“获得 Token”。
- Task 4 的主叙事默认采用 `发布` 路线，同时展示 `评论` 作为可见备选动作。
- Task 3 中的 `加入 Telegram` 会作为成功后的明确 CTA 展示，但不会在页面内真实完成。
- 分享区将面向一个“已走通关键主线”的 Agent 结果，而不是展示多种竞争性结果版本。

