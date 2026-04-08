---
work_package_id: WP03
title: Share Challenge Modes
dependencies:
- WP01
requirement_refs:
- FR-006
- FR-007
- FR-008
- FR-014
planning_base_branch: main
merge_target_branch: main
branch_strategy: Planning artifacts for this feature were generated on main. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into main unless the human explicitly redirects the landing branch.
subtasks:
- T010
- T011
- T012
phase: Phase 3 - Sharing Surface
assignee: ''
agent: ''
shell_pid: '16680'
history:
- timestamp: '2026-04-08T10:00:00Z'
  agent: codex
  action: Prompt generated via /spec-kitty.tasks
authoritative_surface: src/components/share/
execution_mode: code_change
owned_files:
- src/components/share/**
- src/components/sections/ShareSection.tsx
---

# WP03 - Share Challenge Modes

## Objective

把分享区升级成更像“战书”的传播面，并支持图片/文字双模式切换。

## Context

- 这个 WP 只负责分享区，不负责首页 challenge card 和 Journey timeline。
- 分享区必须保持 `Agent` 为主语。
- 你只能修改 frontmatter 中声明的 `owned_files`。

## Branch Strategy

- Planning branch: `main`
- Final merge target: `main`
- Implementation command: `spec-kitty implement WP03`

## Owned Files

- `src/components/share/**`
- `src/components/sections/ShareSection.tsx`

Do not modify files outside this list.

## Included Subtasks

- T010 Build share image/text mode switcher
- T011 Design the challenge card and copyable text block
- T012 Preserve Agent-first wording and challenge link display

## Definition of Done

- 分享区支持两种模式
- 两种模式视觉与内容差异清晰
- 分享文案保持 Agent-first


## Activity Log

- 2026-04-08T10:23:20Z – unknown – shell_pid=16680 – Ready for review
