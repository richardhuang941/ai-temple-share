---
work_package_id: WP03
title: Task 6 LBTI Model and Content Extension
dependencies:
- WP02
requirement_refs:
- FR-006
- FR-007
- FR-008
- FR-009
- NFR-003
- NFR-004
- C-001
- C-002
planning_base_branch: feature/004-header-density-interaction-share-polish
merge_target_branch: feature/004-header-density-interaction-share-polish
branch_strategy: Planning artifacts for this feature were generated on feature/004-header-density-interaction-share-polish. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feature/004-header-density-interaction-share-polish unless the human explicitly redirects the landing branch.
subtasks:
- T007
- T008
- T009
assignee: "codex"
agent: "codex"
shell_pid: "main-shell"
authoritative_surface: src/content/
execution_mode: code_change
owned_files:
- src/content/index.ts
- src/content/models.ts
- src/content/taskMilestones.ts
- src/lib/contentMappers.ts
- src/lib/simulationSeed.ts
---

# WP03 - Task 6 LBTI Model and Content Extension

## Objective

把 timeline 扩到 `Task 1-6`，并为最后一个任务接入 session-stable 的 `LBTI` persona。

## Included Subtasks

- T007 Extend the task model and copy to support Task 6
- T008 Add a stable LBTI profile to the seeded simulation result
- T009 Render Task 6 as the final Journey milestone

## Notes

- `LBTI` 结果来自固定 persona 池，不需要真实映射算法。

## Activity Log

- 2026-04-10T15:10:00+08:00 – codex – shell_pid=main-shell – Planned on feature/004-header-density-interaction-share-polish
