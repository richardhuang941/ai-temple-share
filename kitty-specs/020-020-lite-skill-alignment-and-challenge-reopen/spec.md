# Feature Specification: Lite Skill Alignment And Challenge Reopen

## Background

当前首页的 `Task 1-5` 叙事仍然沿用较重的 full 版语义：`Task 2` 还在讲身份入口、登录恢复、用户 ID 和开放寻配，`Task 3` 还在讲正式宣誓、授权和 Telegram 报到。同时首屏主 CTA 仍停留在 `4月13日 晚上8点！` 的发布时间占位，`AgentPromptSection` 也没有重新挂回页面，导致“接受挑战”虽然可见，但实际上没有参与落点。

现在活动要切到 `ai-temple-bounty2.0-lite-skills` 这条更轻量的 skill 路径，因此首页需要同时完成两件事：

1. 把 `Task 2/3` 的页面叙事改成 lite 的 API-light 主线。
2. 把首屏主 CTA 恢复为真正可点击的挑战入口，并重新承接到 Agent handoff。

## Goal

- 对齐首页 `Task 1-5` 到 `ai-temple-bounty2.0-lite-skills` 的任务语义。
- 把 `Task 2` 改成 lite 的单次 resonance / points 路径。
- 把 `Task 3` 改成 lite 的 faction list / choose / joined / leaderboard 路径。
- 恢复 `AgentPromptSection`，让首屏主 CTA 可以滚动到真实 handoff 区。
- 用新的 lite repo 和提示词替换现有 Agent prompt 卡片。

## Non-goal

- 不改首页整体品牌命名。
- 不接真实后端 API，也不把页面改成 live runtime。
- 不重做 `Task 4` 的第三方原生 handoff。
- 不把 `Task 5` 从 optional 改成主线任务。

## Functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| FR-001 | `Task 2` 必须改成 lite 的 API-light 共振路径：凭证/注册确认、当前状态读取、单次共振、本步积分、当前积分。 | confirmed | 不再出现旧版登录恢复、用户 ID、开放寻配叙事。 |
| FR-002 | `Task 3` 必须改成 lite 的 faction API 路径：积分状态、阵营列表、选择阵营、加入结果、leaderboard follow-up。 | confirmed | 不再出现宣誓、授权、Telegram 报到语义。 |
| FR-003 | 分享摘要与 supporting facts 必须改成依赖 lite Task 2/3 的 proof，而不是旧 full 版 proof。 | confirmed | 避免分享卡继续泄漏旧语义。 |
| FR-004 | 首屏主 CTA 必须从发布时间占位恢复为公开挑战入口，并滚动到 `#agent-prompt`。 | confirmed | 不改成跳 Share/Journey。 |
| FR-005 | `AgentPromptSection` 必须重新挂回页面，页面顺序恢复为 `Hero -> AgentPrompt -> Share -> Journey`。 | confirmed | 保留原有 emphasis 体验。 |
| FR-006 | `agentPromptCards` 必须切换到 lite repo，并把提示词改成 lite Task 1-5 handoff。 | confirmed | 第一张卡负责全链路，第二张卡保留 Task 4 原生 handoff。 |

## Non-functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| NFR-001 | 首页可见层不再出现旧 full 版的 `开放寻配 / 宣誓 / 授权 / Telegram 报到` 表达。 | confirmed | 包括 CTA、timeline、integration coverage。 |
| NFR-002 | `npm run test` 与 `npm run build` 必须通过。 | confirmed | 需要补 unit + integration 回归。 |
| NFR-003 | 继续按 Kitty mission 流程收口，并新建 `020` mission 资产。 | confirmed | 产出 spec/research/plan/tasks/acceptance。 |

## Constraints

| ID | Constraint | Status | Notes |
| --- | --- | --- | --- |
| C-001 | landing branch 继续是 `codex/oss-sanitize-pages-rename`。 | confirmed | 不直接落 `main`。 |
| C-002 | 页面仍然只做 seeded demo，不引入真实 API 调用。 | confirmed | lite 语义只体现在 copy / proof / handoff。 |
| C-003 | `Task 4` 继续保持 SHIT Skills 原生远端 handoff，`Task 5` 继续保持 optional 且 draft-first。 | confirmed | 不重写现有边界。 |
