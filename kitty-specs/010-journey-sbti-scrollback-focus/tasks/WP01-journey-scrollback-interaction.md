---
work_package_id: WP01
title: Journey Scrollback Interaction
dependencies: []
requirement_refs:
- FR-001
- FR-002
- FR-003
- FR-004
- FR-005
- NFR-001
- NFR-002
- C-001
planning_base_branch: feature/004-header-density-interaction-share-polish
merge_target_branch: feature/004-header-density-interaction-share-polish
branch_strategy: Planning artifacts for this feature were generated on feature/004-header-density-interaction-share-polish. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feature/004-header-density-interaction-share-polish unless the human explicitly redirects the landing branch.
subtasks:
- T001
- T002
- T003
assignee: "codex"
agent: "codex"
shell_pid: "31646"
authoritative_surface: src/components/sections/
execution_mode: code_change
owned_files:
- src/App.tsx
- src/components/sections/HeroSection.tsx
- src/components/sections/JourneySection.tsx
---

# WP01 - Journey Scrollback Interaction

## Objective

让 Journey 区的开始按钮在空 `SBTI` 时把用户带回 Hero 输入框，而不是只停留在 disabled 状态。

## Activity Log

- 2026-04-10T08:36:26Z – codex – shell_pid=31113 – Direct-repo implementation started for Journey SBTI scrollback
- 2026-04-10T08:36:46Z – codex – shell_pid=31646 – Scrollback interaction implemented and verified locally
