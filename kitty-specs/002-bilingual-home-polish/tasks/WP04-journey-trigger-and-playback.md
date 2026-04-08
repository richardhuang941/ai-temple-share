---
work_package_id: WP04
title: Journey Trigger and Playback
dependencies:
- WP01
requirement_refs:
- FR-009
- FR-010
- FR-011
- FR-015
planning_base_branch: main
merge_target_branch: main
branch_strategy: Planning artifacts for this feature were generated on main. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into main unless the human explicitly redirects the landing branch.
subtasks:
- T013
- T014
- T015
phase: Phase 4 - Journey Behavior
assignee: ''
agent: ''
shell_pid: '16680'
history:
- timestamp: '2026-04-08T10:00:00Z'
  agent: codex
  action: Prompt generated via /spec-kitty.tasks
authoritative_surface: src/lib/timeline.ts
execution_mode: code_change
owned_files:
- src/components/journey/**
- src/components/sections/JourneySection.tsx
- src/hooks/useJourneyTimeline.ts
- src/lib/timeline.ts
- tests/unit/timeline.test.ts
---

# WP04 - Journey Trigger and Playback

## Objective

保留 Task 1-5 的说明价值，但把启动权、节奏和可读性都调整到更合理的状态。

## Context

- 当前线上问题是默认自动播放且过快。
- 本 WP 聚焦时间轴和 Journey UI，不负责首页和分享区结构。
- 你只能修改 frontmatter 中声明的 `owned_files`。

## Branch Strategy

- Planning branch: `main`
- Final merge target: `main`
- Implementation command: `spec-kitty implement WP04`

## Owned Files

- `src/components/journey/**`
- `src/components/sections/JourneySection.tsx`
- `src/hooks/useJourneyTimeline.ts`
- `src/lib/timeline.ts`
- `tests/unit/timeline.test.ts`

Do not modify files outside this list.

## Included Subtasks

- T013 Make Journey idle until the user explicitly starts it
- T014 Slow down playback and refine start/pause/replay controls
- T015 Preserve readable behavior in reduced-motion mode

## Definition of Done

- 首次加载不自动播放
- 点击后才开始
- 节奏更慢、更易读
- reduced-motion 降级仍可用

