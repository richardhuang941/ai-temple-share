# Research: Analytics and SBTI Input Compatibility

## Findings

1. 当前统计入口只有 Google Analytics，位于 `index.html` 的 `<head>`。
2. `SBTI` 输入被两层逻辑即时 uppercase：
   - `App.tsx` 的 `onSbtiChange={(value) => setSbtiValue(value.toUpperCase())}`
   - `HeroSection` 的输入 onChange 直接回传当前值
3. 这种实现会干扰中文输入法的 composition 阶段，也会让小写输入体验不稳定。

## Decision

- 保留原始输入值直到真正启动模拟。
- 仅在启动模拟和 localStorage 持久化时做 normalization。
- 为 Hero 输入框补 composition-aware 行为与测试覆盖。
