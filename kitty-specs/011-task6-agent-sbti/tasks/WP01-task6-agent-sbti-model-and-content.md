---
work_package_id: WP01
title: Task 6 Agent SBTI Model and Content
dependencies: []
requirement_refs:
- FR-001
- FR-002
- FR-003
- FR-004
- NFR-001
- NFR-002
- NFR-003
- C-001
planning_base_branch: feature/004-header-density-interaction-share-polish
merge_target_branch: feature/004-header-density-interaction-share-polish
branch_strategy: Planning artifacts for this feature were generated on feature/004-header-density-interaction-share-polish. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feature/004-header-density-interaction-share-polish unless the human explicitly redirects the landing branch.
subtasks:
- T001
- T002
- T003
assignee: codex
agent: codex
shell_pid: main-shell
authoritative_surface: src/content/
execution_mode: code_change
owned_files:
- src/content/index.ts
- src/content/models.ts
- src/content/taskMilestones.ts
- src/content/uiCopy.ts
- src/lib/simulationSeed.ts
- src/content/agentSbtiProfiles.ts
- src/App.tsx
---

# WP01 - Task 6 Agent SBTI Model and Content

## Objective

把 `Task 6` 的数据源从 `LBTI` 改成 `Agent SBTI`，并让内容层完全消除 `LBTI` 文案。
