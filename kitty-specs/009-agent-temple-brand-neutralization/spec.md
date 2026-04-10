# Feature Specification: Agent Temple Brand Neutralization

**Mission**: `009-agent-temple-brand-neutralization`  
**Mission Type**: `software-dev`  
**Status**: `draft-ready-for-plan`

## Summary

这一轮只做品牌展示收口：把页面和默认内容里的 `Claws Temple` 系品牌文案统一替换成 `Agent Temple`，减少过强的 Claws 指向，但不去改真实 repo、分支、域名或历史任务记录。

## Goals

- 所有用户可见的 `Claws Temple` / `Claws Temple AI` 品牌文案统一改为 `Agent Temple` / `Agent Temple AI`。
- 普通文本里的 `for Claws Temple`、`Claws Temple Task 3` 这类品牌句式也同步替换。
- 页面标题、meta description、header、hero、share、默认内容模型与相关测试同步更新。

## Non-Goals

- 不改真实仓库路径、GitHub org、域名、branch、mission slug。
- 不改 `https://richardhuang941.github.io/ai-temple-share` 这种真实可访问地址。
- 不改 Task 语义与页面交互。

## Functional Requirements

| ID | Requirement | Status | Acceptance Criteria |
|---|---|---|---|
| FR-001 | Header、Hero、Share 等用户可见品牌词必须从 `Claws Temple` 改为 `Agent Temple`。 | confirmed | 页面不再显示 `Claws Temple` 品牌词。 |
| FR-002 | `Claws Temple AI` 默认展示文案必须改为 `Agent Temple AI`。 | confirmed | 分享卡、首页挑战文案、默认 profile headline 均替换完成。 |
| FR-003 | 普通文本里的 `Claws Temple` 品牌句式也要替换，但真实 repo/path 不可改坏。 | confirmed | `Read GitHub - Claws-Temple/...` 这类真实引用保留，尾部说明文字改成 `Agent Temple`。 |
| FR-004 | 页面 title、meta description、noscript 与 aria label 同步使用 `Agent Temple`。 | confirmed | 页面入口相关文案完成统一替换。 |

## Non-Functional Requirements

| ID | Requirement | Status | Acceptance Criteria |
|---|---|---|---|
| NFR-001 | 替换范围必须限定在展示词和普通文本，不得破坏真实链接与外部引用。 | confirmed | repo URL、domain、branch 等功能性字符串保持可用。 |
| NFR-002 | 构建和测试必须继续通过。 | confirmed | `npm run test` 与 `npm run build` 为 green。 |

## Constraints

| ID | Constraint | Status | Acceptance Criteria |
|---|---|---|---|
| C-001 | 继续使用 `React + Vite + TypeScript`。 | confirmed | 不引入新框架。 |
| C-002 | 目标分支继续是 `feature/004-header-density-interaction-share-polish`。 | confirmed | mission 元数据与当前分支一致。 |

## Acceptance Criteria

- 页面与默认内容里不再出现 `Claws Temple` / `Claws Temple AI` 品牌词。
- 真实仓库引用如 `https://github.com/Claws-Temple/...` 与 `https://richardhuang941.github.io/ai-temple-share` 不被误改。
- `npm run test` 与 `npm run build` 通过。
