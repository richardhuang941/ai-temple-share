---
work_package_id: WP01
title: Kitty Specs Path Cleanup
dependencies: []
requirement_refs:
- FR-001
- FR-002
- FR-003
- FR-004
- FR-005
- NFR-002
- NFR-003
- C-001
- C-002
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
authoritative_surface: kitty-specs/
execution_mode: code_change
owned_files:
- kitty-specs/**
---

# WP01 - Kitty Specs Path Cleanup

## Objective

把 `kitty-specs` 中暴露本机目录结构的绝对路径改成相对路径或通用描述，为仓库开源做净化。
