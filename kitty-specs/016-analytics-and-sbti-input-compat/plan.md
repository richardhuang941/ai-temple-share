# Implementation Plan: Analytics and SBTI Input Compatibility

## Goal

- 增加百度统计。
- 修复 `SBTI` 输入对 IME 和 lowercase 的兼容性。

## Non-goal

- 不改 Journey 逻辑。
- 不调整 Hero 布局。

## Approach

### 1. Analytics

- 在 `index.html` 头部保留现有 GA
- 追加百度统计脚本片段

### 2. SBTI input compatibility

- 输入阶段保留原始值，不再在 `onChange` 时即时 uppercase
- 只在启动模拟或持久化时做 normalization
- 必要时利用 composition 事件避免输入法过程中触发额外格式化

### 3. Regression

- 补 lower-case 与 composition 相关回归测试
- 运行 test / build

## Risks

- 如果 normalization 时机选错，可能出现输入看起来正常但无法启动的回归。
- 统计脚本需避免影响现有 head 脚本顺序。

## Verification

- `npm run test`
- `npm run build`
