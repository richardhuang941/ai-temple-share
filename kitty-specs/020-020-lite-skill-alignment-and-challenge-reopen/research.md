# Research: Lite Skill Alignment And Challenge Reopen

## Findings

1. 当前 lite/full 语义错位主要集中在 4 层：
   - 内容模型：`src/content/taskMilestones.ts`
   - 演示数据：`src/lib/simulationSeed.ts`
   - 分享派生：`src/lib/contentMappers.ts`
   - Agent handoff：`src/content/agentPromptCards.ts` 与 `src/components/sections/AgentPromptSection.tsx`

2. `ai-temple-bounty2.0-lite-skills` 已经明确了新的边界：
   - lite 不再意味着路线停在 `Task 3`
   - `Task 2` 变成 `register/me/resonance` 的单次 API-light 共振
   - `Task 3` 变成 `me/factions/faction` 的阵营选择
   - `Task 4` 继续远端 SHIT Skills handoff
   - `Task 5` 继续 optional 且 draft-first

3. 首页主 CTA 之所以不可用，并不是只差一行文案，而是因为 `HeroSection` 当前仍把主按钮写成 disabled，同时 `App.tsx` 已经不再渲染 `AgentPromptSection`，导致按钮没有真实落点。

4. 当前分享 supporting facts 仍从旧版 `task-2-user-id`、`task-2-token`、`task-3-threshold`、`task-3-telegram` 取值；如果只改页面文案不改派生逻辑，分享区会继续漏出 full 版语义。

## Decision

- 用 seeded demo 数据补出 lite 所需的新 proof 字段：ApiKey 状态、共振结果、本步积分、当前积分、剩余积分、leaderboard rank。
- 直接删除 `Task 3 -> telegramTemplate` 的 UI 依赖，避免 full 版文案继续回流。
- 恢复 `AgentPromptSection`，并把 Hero 主 CTA 直接承接到 `#agent-prompt`。
- 任务回归分成三块：内容契约、Hero/Prompt 交互、mission 收口。
