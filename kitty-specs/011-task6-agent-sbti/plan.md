# Implementation Plan: 011 Task 6 Agent SBTI

## Goal

把 `Task 6` 从 `LBTI` 小龙虾人格改成 `Agent SBTI`，并让它使用当前页面里已经输入的 `SBTI` 作为结果来源。

## Scope

- 新增本地 `Agent SBTI` profile resolver
- 更新 `Task 6` 的内容与 Journey 辅助 copy
- 移除 `LBTI` 数据模型和 seed 依赖
- 更新单测与 acceptance

## Key Decisions

1. `Task 6` 不再随机，而是优先消费当前输入的 `SBTI`。
2. 对已知 code，展示内置 profile 名称与简短说明。
3. 对未知 code，保留 code 本身并给出通用 fallback 文案，避免流程断掉。
4. 不运行时请求 `sbti.unun.dev`；仅参考其前端类型库做本地 profile 数据。

## Data Flow

1. `App` 已持有 `sbtiValue`
2. `getLocalizedLongpageContent(locale, sbtiValue)` 接收当前输入
3. `getTaskMilestones(locale, sbtiValue)` 解析 `Task 6`
4. `Task 6` 渲染对应的 `Agent SBTI` badge / summary / stage proof

## Risks

- 如果 `Task 6` 内容绑定 `SBTI` 后没有保持 fallback，初始渲染会出现空值。
- 如果只改中文文案，英文页会残留 `LBTI`。
- 移除 `lbtiProfile` 时要同步更新模型和测试，否则 build 会挂。

## Validation

- `npm run test`
- `npm run build`
- 手测 `CTRL` / `SHIT` / 未知输入 三种情况
