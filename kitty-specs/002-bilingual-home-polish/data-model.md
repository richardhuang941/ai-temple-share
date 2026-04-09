# Data Model: Claws Temple 首页双语与转化收口

## 1. LocaleCode

### Purpose

表示当前页面展示语言。

### Values

- `zh`
- `en`

## 2. LocalizedContentBundle

### Purpose

承载单个 locale 下所有主区块所需文案。

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `locale` | `LocaleCode` | yes | 当前内容语言 |
| `hero` | `HeroContent` | yes | Hero 挑战卡文案 |
| `share` | `ShareBundle` | yes | 分享区文案 |
| `journey` | `JourneyBundle` | yes | Journey 区标题、按钮与辅助说明 |
| `agentPrompt` | `AgentPromptBundle` | yes | Agent Prompt 标题与帮助文案 |
| `chrome` | `ChromeCopy` | yes | 全局按钮、语言切换、通用说明文案 |

## 3. LocaleState

### Purpose

保存当前 locale 选择与来源。

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `locale` | `LocaleCode` | yes | 当前选中的语言 |
| `source` | `system` \| `stored` \| `manual` | yes | 当前语言来源 |

## 4. HeroChallengeCard

### Purpose

描述首页首屏的成绩卡核心状态。

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `scoreValue` | number | yes | Agent 分数 |
| `gradeLabel` | string | yes | 等级或分层标签 |
| `resonanceStatus` | string | yes | 共振完成状态 |
| `factionStatus` | string | yes | 阵营完成状态 |
| `communityShareStatus` | string | yes | 社区分享完成状态 |

## 5. ShareMode

### Purpose

表示分享区当前展示模式。

### Values

- `image`
- `text`

## 6. ShareChallengePayload

### Purpose

封装战书分享区在两种模式下的展示数据。

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `headline` | string | yes | 分享区主标题 |
| `scoreLine` | string | yes | 分数与等级摘要 |
| `callout` | string | yes | 一句话挑战召唤 |
| `challengeLink` | string | yes | 挑战链接展示值 |
| `imageCaption` | string | yes | 图片卡模式说明 |
| `textBody` | string | yes | 文字卡模式正文 |

## 7. JourneyPlaybackState

### Purpose

扩展现有时间轴状态，支持“未开始”和“显式开始后自动播放”。

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `hasStarted` | boolean | yes | 用户是否已经触发模拟 |
| `currentTaskIndex` | number | yes | 当前激活任务索引 |
| `currentStageIndex` | number | yes | 当前激活阶段索引 |
| `isAutoplay` | boolean | yes | 当前是否自动播放 |
| `cycleDurationMs` | number | yes | 单步时长 |
| `isReducedMotion` | boolean | yes | 是否开启降级模式 |

### Transition Rules

- 初始态 `hasStarted=false`
- 点击观看模拟后：`hasStarted=true` 且 `isAutoplay=true`
- reduced-motion 下可允许 `hasStarted=true` 但 `isAutoplay=false`
- 重新播放会回到第一步，同时保持 `hasStarted=true`

## 8. TypographyTokenSet

### Purpose

统一页面字号层级，避免每个 section 单独定义。

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `display` | string | yes | 首屏大标题字号 |
| `headingLg` | string | yes | section 主标题 |
| `headingMd` | string | yes | 卡片标题 |
| `body` | string | yes | 正文基准字号 |
| `small` | string | yes | 辅助说明字号 |
| `eyebrow` | string | yes | 小标签字号 |

