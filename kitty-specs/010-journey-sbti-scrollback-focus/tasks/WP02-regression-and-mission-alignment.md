---
work_package_id: WP02
title: Regression and Mission Alignment
dependencies:
- WP01
requirement_refs:
- FR-002
- FR-003
- FR-004
- FR-005
- NFR-001
- NFR-002
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
- tests/integration/longpage.spec.tsx
- kitty-specs/010-journey-sbti-scrollback-focus/**
---

# WP02 - Regression and Mission Alignment

## Objective

补回 Journey scrollback 路径的测试，并让 `010` mission 的文档、状态和 acceptance 一并落地。
