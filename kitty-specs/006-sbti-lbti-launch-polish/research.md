# Research Notes: 006-sbti-lbti-launch-polish

## External References

### 1. SBTI 测试入口

- URL: [https://sbti.unun.dev/](https://sbti.unun.dev/)
- 观察结果：页面是一个公开可访问的娱乐向人格测试入口，首屏可直接开始测试。
- 结论：适合在 Journey 区作为“如果还没有 SBTI，先去测一个”的外部引导链接。

### 2. 现有分享唤起链路

- 当前实现已经具备 `copy + countdown + URI scheme` handoff。
- 这一轮不需要更换唤起模型，只需要解决 icon 尺寸和视觉比例问题。

## Product / UX Decisions

### Hero 主 CTA 暂时不承担跳转职能

- 用户要求把“接受挑战，立即开测”改成上线提示。
- 因此 Hero 第一按钮应该更像 launch pill / notice，而不是流程入口。

### SBTI gate 放在 Journey 区更顺手

- 用户的真实动作顺序是：先被首页吸引，再决定要不要看完整模拟。
- 因此 `SBTI` gate 最合适的位置是 Journey 入口，而不是首屏。

### LBTI 不做真实映射

- 当前用户只要求“从列表中随机展示一个”。
- 因此实现重点应该放在“稳定随机、文案清楚、测试可控”，而不是建立虚假的人格算法。

## Technical Decisions

### Session-stable random 优先

- 现有代码已经有 `simulationSeed` 与 hash 逻辑。
- 复用这套 seed 最利于：
  - 同一 session 内保持一致
  - 测试可通过固定 seed 断言
  - 避免 render 时抖动

### 任务扩展优先走现有内容模型

- `TaskMilestone[]` 已经是单一事实来源。
- 新增 `Task 6` 时，应继续由内容层定义，再让 timeline / card / hint 自然消费。

### 隐藏 Agent 模块优先走条件渲染

- 物理删除会扩大 diff，也不利于后续恢复。
- 条件渲染能把当前需求和后续回滚成本都控制在最小范围。
