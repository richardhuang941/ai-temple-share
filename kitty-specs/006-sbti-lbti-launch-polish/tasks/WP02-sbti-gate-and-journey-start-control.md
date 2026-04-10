---
work_package_id: WP02
title: SBTI Gate and Journey Start Control
dependencies:
- WP01
requirement_refs:
- FR-004
- FR-005
- FR-006
- NFR-001
- NFR-003
- NFR-004
- C-001
- C-002
planning_base_branch: feature/004-header-density-interaction-share-polish
merge_target_branch: feature/004-header-density-interaction-share-polish
branch_strategy: Planning artifacts for this feature were generated on feature/004-header-density-interaction-share-polish. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feature/004-header-density-interaction-share-polish unless the human explicitly redirects the landing branch.
subtasks:
- T004
- T005
- T006
assignee: "codex"
agent: "codex"
shell_pid: "main-shell"
authoritative_surface: src/components/sections/JourneySection.tsx
execution_mode: code_change
owned_files:
- src/components/sections/JourneySection.tsx
- src/content/uiCopy.ts
- src/hooks/useJourneyTimeline.ts
- src/lib/timeline.ts
- src/styles/journey.css
---

# WP02 - SBTI Gate and Journey Start Control

## Objective

让 Journey 在真正开始前先收集 `SBTI`，为空时给出错误提示和外部测试引导。

## Included Subtasks

- T004 Add a visible SBTI input gate ahead of the Journey start controls
- T005 Prevent simulation start until the SBTI gate is satisfied
- T006 Update Journey copy from Task 1-5 to Task 1-6

## Notes

- `SBTI` 仅用于进入 gate，不做真实人格计算。

## Activity Log

- 2026-04-10T15:10:00+08:00 – codex – shell_pid=main-shell – Planned on feature/004-header-density-interaction-share-polish
