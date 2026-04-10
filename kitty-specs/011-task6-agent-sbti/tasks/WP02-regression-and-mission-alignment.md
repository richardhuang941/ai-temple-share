---
work_package_id: WP02
title: Regression and Mission Alignment
dependencies:
- WP01
requirement_refs:
- FR-005
- NFR-001
- NFR-002
- NFR-003
- C-002
planning_base_branch: feature/004-header-density-interaction-share-polish
merge_target_branch: feature/004-header-density-interaction-share-polish
branch_strategy: Planning artifacts for this feature were generated on feature/004-header-density-interaction-share-polish. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feature/004-header-density-interaction-share-polish unless the human explicitly redirects the landing branch.
subtasks:
- T004
- T005
- T006
assignee: codex
agent: codex
shell_pid: main-shell
authoritative_surface: tests/
execution_mode: code_change
owned_files:
- tests/unit/contentMappers.test.ts
- tests/integration/longpage.spec.tsx
- kitty-specs/011-task6-agent-sbti/**
---

# WP02 - Regression and Mission Alignment

## Objective

补齐 `Task 6 Agent SBTI` 的测试和 acceptance 资产，让 011 mission 可以完整收口。
