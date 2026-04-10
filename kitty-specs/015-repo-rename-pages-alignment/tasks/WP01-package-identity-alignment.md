---
work_package_id: WP01
title: Package Identity Alignment
dependencies: []
requirement_refs:
- FR-001
- NFR-001
- C-001
- C-002
planning_base_branch: feature/004-header-density-interaction-share-polish
merge_target_branch: feature/004-header-density-interaction-share-polish
branch_strategy: Planning artifacts for this feature were generated on feature/004-header-density-interaction-share-polish. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feature/004-header-density-interaction-share-polish unless the human explicitly redirects the landing branch.
subtasks:
- T001
assignee: codex
agent: codex
shell_pid: main-shell
authoritative_surface: package
execution_mode: code_change
owned_files:
- package.json
- package-lock.json
---

# WP01 - Package Identity Alignment

## Objective

把项目 package name 从旧 repo 名对齐到 `ai-temple-share`。
