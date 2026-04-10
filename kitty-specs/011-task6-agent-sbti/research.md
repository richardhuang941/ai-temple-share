# Research Notes: 011 Task 6 Agent SBTI

## Findings

- 当前 `Task 6` 的内容全部来自 `lbtiProfile`，定义在 `src/lib/simulationSeed.ts` 和 `src/content/taskMilestones.ts`。
- 页面里的 `SBTI` 已经由 `App` 管理，并持久化到 `localStorage`，所以当前项目已经有稳定输入源。
- `sbti.unun.dev` 当前是前端本地算分页面：题库、人格库、匹配逻辑都写在页面脚本里，没有公开结果 API 依赖。

## Decision

- 把 `Task 6` 从 session-stable random `LBTI` 改成 local `Agent SBTI` resolver 更符合当前需求，也更符合页面现有数据流。
