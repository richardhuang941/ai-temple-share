# Data Model: Lite Skill Alignment And Challenge Reopen

## Seeded Simulation Result

| Field | Type | Purpose |
| --- | --- | --- |
| `usesExistingApiKey` | `boolean` | 决定 Task 2 的凭证 proof 是“复用”还是“新签发”。 |
| `preResonancePoints` | `number` | Task 2 在执行 resonance 前展示的积分状态。 |
| `resonanceOutcome` | `"success" \| "strong_success"` | Lite resonance 的单次结果。 |
| `resonancePointsEarned` | `number` | 本步共振新增积分。 |
| `currentPointsTotal` | `number` | Task 2 结束、Task 3 开始时的当前积分。 |
| `remainingPoints` | `number` | Task 3 完成阵营选择后的剩余积分。 |
| `leaderboardRank` | `number` | Task 3 leaderboard follow-up 的演示 proof。 |

## Task Stage Surface

### Task 2

1. `task-2-credential`
2. `task-2-profile`
3. `task-2-resonance`
4. `task-2-earned`
5. `task-2-total`

### Task 3

1. `task-3-points`
2. `task-3-factions`
3. `task-3-choice`
4. `task-3-joined`
5. `task-3-leaderboard`

## Derived Share Facts

分享 supporting facts 改为从以下 stage proof 取值：

1. `task-1-faction`
2. `task-2-resonance`
3. `task-2-total`
4. `task-3-joined`
5. `task-3-leaderboard`

## CTA State

| Surface | Behavior |
| --- | --- |
| Hero primary CTA | 可点击，滚动到 `#agent-prompt` |
| AgentPromptSection | 恢复渲染，并接受 `attentionSignal` 做视觉强调 |
| Share / Journey | 保持现有入口和行为，不承担主 CTA 落点 |
