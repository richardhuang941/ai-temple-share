---
work_package_id: WP05
title: Integration and Validation
dependencies:
- WP02
- WP03
- WP04
requirement_refs:
- FR-001
- FR-002
- FR-005
- FR-006
- FR-007
- FR-010
- FR-014
- FR-015
planning_base_branch: main
merge_target_branch: main
branch_strategy: Planning artifacts for this feature were generated on main. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into main unless the human explicitly redirects the landing branch.
subtasks:
- T016
- T017
- T018
phase: Phase 5 - Integration
assignee: "codex"
agent: "codex"
shell_pid: '16680'
history:
- timestamp: '2026-04-08T10:00:00Z'
  agent: codex
  action: Prompt generated via /spec-kitty.tasks
authoritative_surface: tests/integration/
execution_mode: code_change
owned_files:
- src/main.tsx
- tests/integration/**
---

# WP05 - Integration and Validation

## Objective

把前四个 WP 的结果整合成可交付长单页，并通过测试和本地预览验证收尾。

## Context

- 本 WP 是整页集成，不重新发明具体区块。
- 重点是 CTA 动线、双语切换、分享模式和 Journey 触发一起成立。
- 你只能修改 frontmatter 中声明的 `owned_files`。

## Branch Strategy

- Planning branch: `main`
- Final merge target: `main`
- Implementation command: `spec-kitty implement WP05`

## Owned Files

- `src/App.tsx`
- `src/main.tsx`
- `tests/integration/**`

Do not modify files outside this list.

## Included Subtasks

- T016 Integrate the three CTA routes and final anchor wiring
- T017 Add integration coverage for locale, CTA, share modes, and journey start
- T018 Run build, tests, and local preview validation

## Definition of Done

- 整页顺序正确
- CTA 全部打通
- integration tests 覆盖关键路径
- 本地预览验证通过

## Activity Log

- 2026-04-08T10:35:21Z – codex – shell_pid=16680 – Implementation completed in lane worktree and ready for workflow tracking.
