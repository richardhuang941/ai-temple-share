# Data Model: 006-sbti-lbti-launch-polish

## Updated Entities

### TaskId

当前：

```ts
type TaskId = "task-1" | "task-2" | "task-3" | "task-4" | "task-5";
```

目标：

```ts
type TaskId = "task-1" | "task-2" | "task-3" | "task-4" | "task-5" | "task-6";
```

### SimulationTimelineState

结构无需新增字段，但要自然支持：

- `tasks.length === 6`
- progress / hint / completion 正确覆盖第 6 个 task

### SBTI Input State

建议由 `JourneySection` 本地维护：

```ts
interface SbtiGateState {
  value: string;
  error: string | null;
}
```

用途：

- 控制 Journey 是否允许启动
- 在用户未填写时展示错误提示与外链引导

### LBTIProfile

新增一个静态 persona 池：

```ts
interface LbtiProfile {
  code: string;
  displayName: string;
  summary: string;
  bullets: string[];
}
```

数据来源：用户给定的 10 个 LBTI 小龙虾人格。

### SeededSimulationResult

建议扩展一项：

```ts
interface SeededSimulationResult {
  ...
  lbtiProfile: LbtiProfile;
}
```

这样 `Task 6` 可以直接从同一份 seed 结果里取值。

## Relationships

- `JourneySection` 使用本地 `SBTI` gate state 控制 `useJourneyTimeline.start()`
- `getSimulationSeedResult()` 负责给当前 session 选出稳定的 `lbtiProfile`
- `getTaskMilestones(locale)` 负责把 `lbtiProfile` 写进 `task-6`

## Derived Behavior

- Hero / Share 不依赖 `SBTI` 输入
- Journey 的开始动作依赖 `SBTI` gate
- Task 6 的 persona 与 `SBTI` 不做算法映射，只与 session seed 绑定
