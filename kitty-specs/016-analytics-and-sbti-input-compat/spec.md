# Feature Specification: Analytics and SBTI Input Compatibility

## Background

当前入口页已经接了 Google Analytics，但中国大陆场景下需要补一份百度统计兜底。同时，首页 `SBTI` 输入框在中文输入法和小写输入时存在兼容性问题：输入中的内容会被过早 uppercase，打断 IME composition，也让小写输入体验不稳定。

## Goal

- 在入口页补充百度统计脚本。
- 修复 `SBTI` 输入框对中文输入法和小写输入的兼容性。
- 保持现有启动 Journey 的校验与结果归一化逻辑。

## Non-goal

- 不改页面视觉结构。
- 不调整 Journey 业务流程。
- 不引入新的 analytics SDK 封装层。

## Functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| FR-001 | 入口页必须新增百度统计脚本，使用提供的 `hm.js?4f7cb09f19d389a7a95ac40e0a488963`。 | confirmed | 与现有 Google Analytics 并存。 |
| FR-002 | `SBTI` 输入过程中不得再因为即时 uppercase 打断中文输入法 composition。 | confirmed | 输入阶段应保留用户原始输入。 |
| FR-003 | 小写 `SBTI` 输入必须仍然能被接受，并在真正启动模拟时正确归一化。 | confirmed | 例如 `ctrl` 仍能正常开始流程。 |
| FR-004 | 现有“未填 SBTI 时 shake + focus + error”交互必须保持不变。 | confirmed | 只修兼容性，不改 gate 语义。 |

## Non-functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| NFR-001 | 不影响现有 `npm run test` 与 `npm run build`。 | confirmed | 修改后需回归。 |
| NFR-002 | 继续按 Kitty mission 流程收口。 | confirmed | 新建 `016` mission。 |

## Constraints

| ID | Constraint | Status | Notes |
| --- | --- | --- | --- |
| C-001 | 继续在 `codex/oss-sanitize-pages-rename` 收口。 | confirmed | 不切 landing branch。 |
| C-002 | 优先用原生 DOM 事件修复输入兼容，不为单输入框引入重量依赖。 | confirmed | 保持实现轻量。 |
