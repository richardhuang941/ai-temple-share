# Data Model: Claws Temple Bounty 长单页

## 1. AgentProfileSnapshot

### Purpose

承载分享态与 Task 1 展示所需的 Agent 核心结果。

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `headline` | string | yes | 分享态主标题 |
| `scoreValue` | number | yes | Agent 分数 |
| `scoreLabel` | string | yes | 分数对应的公开标签，如高匹配、高完成度 |
| `agentType` | string | yes | Task 1 的类型结论 |
| `dominantAxes` | string[] | yes | 主导维度 |
| `missingAxes` | string[] | no | 缺口维度 |
| `nextHint` | string | yes | 指向 Task 2 的下一步提示 |

## 2. TaskMilestone

### Purpose

描述长单页中一个任务块的全部展示内容。

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `taskId` | string | yes | `task-1` 到 `task-5` |
| `order` | number | yes | 页面顺序 |
| `brandedName` | string | yes | 品牌任务名 |
| `purpose` | string | yes | 一句话目标 |
| `summary` | string | yes | 当前任务说明 |
| `isOptional` | boolean | yes | 是否为可选步骤 |
| `isExternalFlow` | boolean | yes | 是否为外部原生流程 |
| `stages` | TaskStage[] | yes | 任务内部阶段 |
| `completionBadge` | string | yes | 完成态标签 |
| `cta` | string | no | 下一步 CTA |

## 3. TaskStage

### Purpose

描述某个 Task 内部的逐步推进状态。

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `stageId` | string | yes | 唯一阶段标识 |
| `label` | string | yes | 阶段标题 |
| `description` | string | yes | 阶段说明 |
| `status` | enum(`pending`,`active`,`done`) | yes | 当前阶段状态 |
| `proof` | string | no | 用户可感知的完成证据 |
| `externalTarget` | string | no | Telegram/SHIT Skills 等外部目标 |

### Transition Rules

- 单个 Task 内的 `TaskStage` 只能按顺序推进
- 同一时刻仅允许一个 `active` 阶段
- 当最后一个阶段 `done` 时，该 `TaskMilestone` 进入完成态

## 4. SimulationTimeline

### Purpose

控制自动播放与手动跳转所需的全局状态。

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `currentTaskIndex` | number | yes | 当前激活任务索引 |
| `currentStageIndex` | number | yes | 当前激活阶段索引 |
| `isAutoplay` | boolean | yes | 是否自动播放 |
| `isReducedMotion` | boolean | yes | 是否启用降级模式 |
| `cycleDurationMs` | number | yes | 单阶段显示时长 |

### Transition Rules

- `isAutoplay=true` 时，定时推进到下一个阶段
- 当前任务最后一个阶段完成后，进入下一个任务的第一个阶段
- 全部任务完成后，自动聚焦到分享区或回到首个完成态

## 5. ShareSummary

### Purpose

封装分享区需要的对外可传播结论。

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | 分享区主标题 |
| `scoreSummary` | string | yes | Agent 打分结果 |
| `resonanceStatus` | string | yes | 已共振状态 |
| `factionStatus` | string | yes | 已加入阵营状态 |
| `supportingFacts` | string[] | no | 补充事实，如获得 Token、加入 Telegram |
| `qualificationNote` | string | yes | 主线/外部流说明 |

## 6. AgentPromptCard

### Purpose

承载给 AI Agent 使用的可复制提示块。

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | Prompt 标题 |
| `goal` | string | yes | 希望 Agent 完成什么 |
| `context` | string[] | yes | 业务背景与约束 |
| `referenceRepo` | string | yes | 目标 skill 仓库 |
| `promptBody` | string | yes | 可复制的完整 Prompt |
| `expectedOutput` | string[] | yes | 预期 Agent 输出 |

## 7. FactionOption

### Purpose

描述 Task 3 阵营展示所需的公开字段。

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `brandKey` | string | yes | 阵营键值 |
| `displayName` | string | yes | 中文阵营名 |
| `coreStance` | string | yes | 阵营一句话立场 |
| `telegramTemplate` | string | no | 成功后的群内报到文案 |

## Derived Views

### Journey Card View

由 `TaskMilestone + SimulationTimeline` 组合得出：

- 当前任务是否高亮
- 当前阶段是否 pulsing
- 历史阶段是否已完成
- CTA 指向当前任务下一步或下一个任务

### Share Card View

由 `AgentProfileSnapshot + ShareSummary + TaskMilestone(task-2, task-3)` 组合得出：

- `Agent 打分多少`
- `已共振`
- `已加入阵营`
- 补充信息如 `已获得 Token`、`已准备加入 Telegram`
