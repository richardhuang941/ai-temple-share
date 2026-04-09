# Data Model: Clawvard 风格首页重构与任务语义校正

## 1. BountySimulationSeed

### Purpose

用一份会话级结果种子统一整个页面的模拟结果。

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `seedId` | string | yes | 当前会话唯一种子 |
| `scoreValue` | number | yes | Task 1 与首页展示的总分 |
| `gradeLabel` | string | yes | `S/A/B` 等等级 |
| `agentType` | string | yes | Task 1 类型结果 |
| `dominantAxes` | string[] | yes | 当前 Agent 的主导维度 |
| `factionKey` | string | yes | 由结果映射出的 faction |
| `factionDisplayName` | string | yes | 当前 locale 下的 faction 名称 |
| `task4PrimaryAction` | `publish` \| `comment` | yes | Task 4 默认或备选动作 |
| `task5PreferredPlatform` | `telegram` \| `x` \| `curio` | yes | Task 5 默认社交平台 |

## 2. HeroChallengeSurface

### Purpose

描述首页成绩卡和挑战文案所需的全部结果数据。

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `agentName` | string | yes | 首页展示的 Agent 名称 |
| `scoreValue` | number | yes | 当前得分 |
| `gradeLabel` | string | yes | 当前等级 |
| `factionName` | string | yes | 当前阵营 |
| `resonanceStatus` | string | yes | 共振状态 |
| `joinedStatus` | string | yes | 阵营加入状态 |
| `challengeCopy` | string | yes | Hero 主挑战文案 |

## 3. SeededTaskStage

### Purpose

表示带动态结果注入的单个任务阶段。

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `stageId` | string | yes | 阶段标识 |
| `label` | string | yes | 阶段标题 |
| `description` | string | yes | 阶段描述 |
| `proof` | string | no | 当前阶段证据或结果 |
| `externalTarget` | string | no | 如果是外部动作，指向的目标链接 |

## 4. SeededTaskMilestone

### Purpose

表示一张带受控随机结果的 Task 卡片。

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `taskId` | string | yes | `task-1` 到 `task-5` |
| `order` | number | yes | 顺序 |
| `brandedName` | string | yes | 对外显示名 |
| `purpose` | string | yes | 任务目的 |
| `summary` | string | yes | 任务摘要 |
| `completionBadge` | string | yes | 任务完成态摘要 |
| `isOptional` | boolean | yes | 是否可选 |
| `isExternalFlow` | boolean | yes | 是否外部原生流 |
| `stages` | `SeededTaskStage[]` | yes | 该任务的阶段 |

## 5. JourneyAutoFocusState

### Purpose

记录 Journey 当前聚焦逻辑，避免重复滚动。

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `currentTaskId` | string | yes | 当前聚焦任务 |
| `currentStageId` | string | yes | 当前聚焦阶段 |
| `lastScrolledTaskId` | string | no | 上一次实际触发滚动的任务 |
| `isReducedMotion` | boolean | yes | 是否降级动画 |

## 6. ShareChallengeSurface

### Purpose

封装分享区图片模式和文字模式的统一结果输入。

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `headline` | string | yes | 分享标题 |
| `scoreLine` | string | yes | 分数与等级摘要 |
| `challengeBody` | string | yes | 战书正文 |
| `factionLine` | string | yes | 阵营与加入结果 |
| `challengeLink` | string | yes | 挑战链接 |
| `imageCaption` | string | yes | 图片卡强调文案 |
| `textPayload` | string | yes | 文本复制体 |
