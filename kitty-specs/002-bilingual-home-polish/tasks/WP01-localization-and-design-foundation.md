---
work_package_id: WP01
title: Localization and Design Foundation
dependencies: []
requirement_refs:
- FR-001
- FR-002
- FR-003
- FR-012
- FR-013
planning_base_branch: main
merge_target_branch: main
branch_strategy: Planning artifacts for this feature were generated on main. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into main unless the human explicitly redirects the landing branch.
base_branch: kitty/mission-002-bilingual-home-polish
base_commit: 9d87f7d6ee82d2f25caa45ad22dfe8feb02b422f
created_at: '2026-04-08T10:06:40.923796+00:00'
subtasks:
- T001
- T002
- T003
- T004
- T005
phase: Phase 1 - Foundation
assignee: ''
agent: "codex"
shell_pid: "16680"
history:
- timestamp: '2026-04-08T10:00:00Z'
  agent: codex
  action: Prompt generated via /spec-kitty.tasks
authoritative_surface: src/content/
execution_mode: code_change
owned_files:
- src/content/**
- src/hooks/useLocale.ts
- src/lib/contentMappers.ts
- src/lib/locale.ts
- src/styles/**
- tests/unit/contentMappers.test.ts
- tests/unit/locale.test.ts
---

# WP01 - Localization and Design Foundation

## Objective

建立本轮 polish 的公共底座：locale 检测与本地记忆、中英文内容 bundle、coral 设计 token 和明确的 typography scale。

## Context

- 这是后续所有 UI 区块改造的前置条件。
- 本 WP 不负责完整 section 结构重排，只负责可复用底层。
- 你只能修改 frontmatter 中声明的 `owned_files`。

## Branch Strategy

- Planning branch: `main`
- Final merge target: `main`
- Implementation command: `spec-kitty implement WP01`

## Owned Files

- `src/content/**`
- `src/hooks/**`
- `src/lib/contentMappers.ts`
- `src/styles/**`
- `tests/unit/**`

Do not modify files outside this list.

## Included Subtasks

- T001 Extend content models for locale bundle, share mode, and journey start state
- T002 Implement system locale detection, manual override, and persistence
- T003 Create zh/en content dictionaries and migrate key copy
- T004 Replace global tokens with coral theme and typography scale
- T005 Add unit coverage for locale and content mapping behavior

## Definition of Done

- locale 状态可用
- 中英文内容已结构化
- global token 已切换到 coral 方向
- unit tests 能覆盖 locale 与内容派生

## Activity Log

- 2026-04-08T10:06:57Z – codex – shell_pid=16680 – Started implementation via action command
