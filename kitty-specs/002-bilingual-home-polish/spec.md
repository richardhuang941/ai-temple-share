# Feature Specification: Bilingual Home Polish

**Mission**: `002-bilingual-home-polish`  
**Mission Type**: `software-dev`  
**Status**: `draft-ready-for-plan`

## Summary

对现有 `Claws Temple Bounty 2.0` 长单页做一次面向传播和转化的二次收口：增加中英文双语切换，按用户系统语言默认展示；把首屏改成更接近“挑战卡 / 成绩卡”的轻量结构；把 CTA 重新组织为 `接受挑战`、`转发战书`、`观看模拟 Task 1-5` 三条清晰路径；同时把视觉主题调整为 coral 系，并用成熟社区 typography 规则重新梳理标题和正文层级。

这次迭代的目标不是扩展业务范围，而是让页面更容易理解、更容易传播、更符合参考截图里的行为节奏。

## Background

上一轮 `001-bounty-journey-longpage` 已经完成了长单页的主功能：Hero、Journey、Share、Agent Prompt 四个区块都能工作，`Task 1-5` 的模拟链路也已经打通。

但在本地预览后，有几处明显问题：

1. 首屏信息过密，第一次进入页面时难以快速抓住“现在的结果”和“下一步该点什么”。
2. 当前默认自动播放 Journey，用户还没准备好就已经开始跑，节奏也偏快。
3. 传播路径不够集中，`Agent Prompt` 和 `Share` 没有成为真正意义上的首屏主行动区。
4. 页面只有单语版本，不利于按系统语言默认适配不同访客。
5. 当前 typography 更像一次性定制样式，没有严格基于成熟社区 token 做层级收口。

用户已经明确给出两个参考截图，希望首页更接近“成绩卡 + 挑战卡 + 转发战书”的信息架构，同时保留下面的任务模拟流程作为补充说明区。

## Goals

- 增加 `中文 / English` 双语能力，并默认跟随用户当前系统语言。
- 把首页压缩成更轻量的成绩卡表达，只突出 `Agent 打分`、`已共振`、`已加入阵营`、`已在社区分享结果`。
- 让 `接受挑战` 直接把用户带到 `让你的 AI Agent 执行以下命令` 区域。
- 让 `转发战书` 使用更接近参考截图的战书分享卡样式，并支持 `分享图片 / 分享文字` 两种形式。
- 保留 `Task 1-5` 模拟流程，但默认不自动执行；只有点击按钮后才开始，并且整体节奏更从容。
- 使用 coral 主题色和更成熟的 typography 体系，让整页视觉更统一、更像正式对外页面。

## Non-Goals

- 不接入真实多语言服务端、翻译平台或 CMS。
- 不接入真实分享 SDK、真实二维码短链服务或真实社交登录。
- 不改变 `Task 1-5` 的业务含义和真实流程归属。
- 不新增第二个页面；仍然保持单个长单页结构。
- 不把当前静态页升级成需要后端参与的动态产品。

## Target Users

- 从中文或英文环境进入页面、希望一眼理解结果和挑战入口的潜在参与者。
- 已经知道 `Claws Temple Bounty 2.0`，但只想快速截图分享结果的人。
- 希望直接把任务交给 AI Agent，而不想先读完整长文说明的人。
- 想看完整 `Task 1-5` 说明，但更希望自己触发演示节奏的用户。

## User Scenarios & Testing

### Scenario 1: 系统语言默认匹配

**Given** 用户设备首选语言为英文  
**When** 用户首次访问页面  
**Then** 页面默认以 English 文案展示，并保留显式语言切换入口。

### Scenario 2: 首屏快速理解成绩与状态

**Given** 用户第一次打开首页  
**When** 用户只看第一屏  
**Then** 用户能够在几秒内看懂 `Agent 打分`、`已共振`、`已加入阵营`、`已在社区分享结果` 四类核心状态。

### Scenario 3: 接受挑战后直达 Agent 命令区

**Given** 用户想立即开始  
**When** 用户点击 `接受挑战`  
**Then** 页面滚动到 `让你的 AI Agent 执行以下命令` 区域，用户不需要先经过 Journey 模拟区。

### Scenario 4: 转发战书时可切换分享形式

**Given** 用户想把结果发给朋友  
**When** 用户点击 `转发战书` 并进入分享区  
**Then** 用户可以看到接近参考截图的分享卡，并在 `分享图片` 与 `分享文字` 之间切换。

### Scenario 5: 用户主动观看模拟流程

**Given** 用户想了解 `Task 1-5` 细节  
**When** 用户点击 `观看模拟 Task 1-5 的流程`  
**Then** 页面跳到 Journey 区并开始自动推进；在点击之前 Journey 不会自行播放。

### Edge Cases

- 浏览器语言可能是 `en-US`、`en-GB`、`zh-CN`、`zh-HK` 等地区型标识，页面需要做基础归类，而不是只识别精确值。
- 用户手动切换语言后，本次会话里不应被自动检测立即覆盖。
- 用户可能只想复制分享文字，不关心图片模式；切换逻辑必须简洁明确。
- 用户可能在 reduced-motion 环境下触发模拟；页面需要降级到可读而不过度动画。
- 用户可能从锚点或分享链接直接落到中段区块；各区块都要能独立成立。

## Functional Requirements

| ID | Requirement | Status | Acceptance Criteria |
|---|---|---|---|
| FR-001 | 页面必须支持 `中文` 与 `English` 两种文案版本。 | confirmed | 页面中存在语言切换控件，切换后 Hero、Share、Journey、Agent Prompt 等主要文案发生一致切换。 |
| FR-002 | 页面首次加载时必须根据用户系统语言或浏览器首选语言决定默认语言。 | confirmed | 英文系统首次进入默认显示英文；中文系统首次进入默认显示中文。 |
| FR-003 | 用户手动切换语言后，页面必须在当前会话或本地存储中记住该选择。 | assumed | 用户刷新页面后仍保持手动选定语言，而不是再次回退到系统语言。 |
| FR-004 | 首屏 Hero 必须精简为成绩卡式信息结构，只保留 `Agent 打分`、`已共振`、`已加入阵营`、`已在社区分享结果` 四类核心状态。 | confirmed | 用户在第一屏不需要滚动即可识别这四类信息。 |
| FR-005 | 首屏必须包含 `接受挑战` 主按钮，并在点击后跳转到 `让你的 AI Agent 执行以下命令` 区块。 | confirmed | 点击后视口滚动到 Agent Prompt 区域，锚点行为可见且稳定。 |
| FR-006 | 首屏必须包含 `转发战书` 次按钮，并在点击后跳转到分享区。 | confirmed | 点击后视口滚动到 Share 区域，用户可直接看到战书卡。 |
| FR-007 | 分享区必须支持 `分享图片` 与 `分享文字` 两种切换视图。 | confirmed | 页面中存在明确的分段切换控件，切换后展示内容显著不同。 |
| FR-008 | 分享文字内容必须继续使用 `Agent` 作为主体，不得回退到 `龙虾` 作为主表达。 | confirmed | 分享区主文案中使用 `Agent` 作为执行主体。 |
| FR-009 | 页面必须保留 `Task 1-5` 的完整模拟区，但默认不自动开始播放。 | confirmed | 首次进入页面时 Journey 保持静止；只有用户点击观看模拟按钮后才开始推进。 |
| FR-010 | 页面必须提供一个独立按钮用于 `观看模拟 Task 1-5 的流程`，并在点击后滚动至 Journey 区再自动开始。 | confirmed | 点击后滚动到 Journey 区，时间轴开始推进。 |
| FR-011 | 任务模拟推进节奏必须比当前版本更慢，以保证用户能读清每一步。 | confirmed | 自动推进的单步停留时间明显长于当前 `2200ms`，且整体体验不再显得仓促。 |
| FR-012 | 全局视觉主题必须切换为 coral 系，并采用用户指定的三组主题色：`#ff4d4d`、`#e63946`、`#991b1b`。 | confirmed | 页面主按钮、强调色、背景氛围和高亮边框已围绕 coral token 调整。 |
| FR-013 | 页面必须重新建立清晰的 typography 层级，且该层级应明确参考成熟社区方案，而不是继续使用临时自定义字号。 | confirmed | 设计说明与实现 token 中能看出明确的标题、正文、caption、eyebrow 层级规则。 |
| FR-014 | `接受挑战 -> Agent Prompt`、`转发战书 -> Share`、`观看模拟 -> Journey` 三条 CTA 路径必须同时存在且不互相混淆。 | confirmed | QA 能逐个点击并验证三条 CTA 均跳到正确区块。 |
| FR-015 | 页面仍必须保留“这是模拟/演示，不代替真实任务执行”的边界说明。 | confirmed | 页面可见模拟边界提示，用户不会误把静态页当作真实执行凭证。 |

## Non-Functional Requirements

| ID | Requirement | Status | Acceptance Criteria |
|---|---|---|---|
| NFR-001 | 首页首屏在桌面与移动端都必须保持低信息密度，不出现需要阅读大段正文才能理解主价值的情况。 | confirmed | QA 在首屏只读标题、分数区和按钮区域时即可理解页面用途。 |
| NFR-002 | 页面在 `360px` 到 `1440px` 宽度区间内必须保持可读，不出现横向滚动。 | confirmed | 手机和桌面常见视口下，按钮、语言切换、分享卡和时间轴不发生横向溢出。 |
| NFR-003 | 所有关键交互都必须支持键盘访问。 | assumed | 语言切换、CTA、分享模式切换、复制按钮和 Journey 控件都可通过 Tab 聚焦。 |
| NFR-004 | 双语切换必须在前端本地完成，不依赖网络请求。 | confirmed | 页面离线或无额外请求时仍能正确切换中英文。 |
| NFR-005 | 自动模拟在 reduced-motion 模式下必须优雅降级。 | confirmed | reduced-motion 环境下，页面不强制播放高频动画，仍保留清晰的文本状态。 |

## Constraints

| ID | Constraint | Status | Acceptance Criteria |
|---|---|---|---|
| C-001 | 本次改造必须基于现有 `React + Vite + TypeScript` 项目结构完成。 | confirmed | 实现保持在现有前端工程内，不新建其他框架。 |
| C-002 | 页面仍然是单个长单页，不能拆成独立详情页或分享页。 | confirmed | 所有主区块仍在同一页面内。 |
| C-003 | `Task 1-5` 的业务叙事必须继续以本地 `claws-temple-bounty2.0-skills` 为语义来源。 | confirmed | 页面中的任务顺序与关键动作语义不偏离现有 skill 约束。 |
| C-004 | `Task 4` 仍必须明确是外部原生流程，不能因为首屏简化而被误写为站内已完成动作。 | confirmed | 页面中可见对外部流程属性的说明。 |
| C-005 | 视觉主题调整必须使用用户给定的 coral token 作为核心主题色，而不是继续沿用当前蓝色主基调。 | confirmed | QA 可从按钮、边框、背景高亮中识别 coral 主题。 |
| C-006 | typography 参考必须来自成熟社区方案；若做推导，必须在 plan 中注明是基于该方案的本地化实现。 | confirmed | `plan.md` 中可追溯 typography 基线来源。 |

## Success Criteria

- 至少 `80%` 的首轮评审者在首屏 `5` 秒内能说出该页面的 4 个关键状态：`打分`、`已共振`、`已加入阵营`、`已在社区分享结果`。
- 至少 `90%` 的评审者能成功完成三条 CTA 路径中的任意一条，而不需要额外口头说明。
- 至少 `80%` 的评审者认为新的模拟节奏“可读”或“更自然”，而不是“过快”。
- 中英文切换在桌面 Chrome 与移动端 Safari 模拟环境下均能正确展示。

## Key Entities

### Localized Content Bundle

- locale_code
- hero_copy
- share_copy
- prompt_copy
- journey_copy

### Hero Challenge Card

- score_value
- grade_label
- resonance_status
- faction_status
- community_share_status

### Share Challenge Payload

- image_caption
- text_caption
- callout
- challenge_link

### Journey Trigger State

- has_started
- autoplay_enabled
- cycle_duration_ms
- selected_task

## Dependencies

- 已完成的 `001-bounty-journey-longpage` 页面实现：作为本轮 polish 的代码基础。
- 用户提供的两张参考截图：作为首页信息架构和分享区形式参考。
- `claws-temple-bounty2.0-skills` 本地仓库：作为任务语义来源。
- 社区 typography 方案参考：优先参考 `Ant Design` 的字体分层方法，并保留 `MUI` 作为响应式排版对照。

## Assumptions

- 我们默认只支持 `zh` 与 `en` 两类主语言，不扩展到更多 locale。
- 默认语言检测优先读取本地记忆值，其次读取浏览器或系统语言。
- `分享图片` 在本轮可以先实现为视觉卡片模式，不强制要求真实导出 PNG 文件，只要该卡片具备截图传播价值即可。
- `分享文字` 模式以可复制文本为核心，不强制接入原生分享接口。
- typography 将采用“少层级、高可读”的落地方式，而不是完整照搬任一 UI 库全部 token。
