# Data Model: 011 Task 6 Agent SBTI

## AgentSbtiProfile

```ts
interface AgentSbtiProfile {
  code: string;
  displayName: string;
  intro: string;
  summary: string;
  isKnown: boolean;
}
```

## Resolver Contract

- 输入：`locale`, `rawSbtiCode`
- 输出：`AgentSbtiProfile`
- 行为：
  - 空值：返回待解析 placeholder
  - 已知值：返回本地 profile 库中的人格
  - 未知值：返回带原始 code 的 graceful fallback

## Integration Points

- `getLocalizedLongpageContent(locale, sbtiValue?)`
- `getTaskMilestones(locale, sbtiValue?)`
- `Task 6` content / badge / proof
