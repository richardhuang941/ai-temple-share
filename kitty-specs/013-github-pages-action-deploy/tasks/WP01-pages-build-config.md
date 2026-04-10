---
work_package_id: WP01
title: Pages Build Config
dependencies: []
requirement_refs:
- FR-002
- FR-005
- NFR-001
- NFR-003
- C-001
- C-003
planning_base_branch: feature/004-header-density-interaction-share-polish
merge_target_branch: feature/004-header-density-interaction-share-polish
branch_strategy: Planning artifacts for this feature were generated on feature/004-header-density-interaction-share-polish. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feature/004-header-density-interaction-share-polish unless the human explicitly redirects the landing branch.
subtasks:
- T001
- T002
assignee: codex
agent: codex
shell_pid: main-shell
authoritative_surface: vite.config.ts
execution_mode: code_change
owned_files:
- vite.config.ts
- package.json
---

# WP01 - Pages Build Config

## Objective

让 `Vite` 在 `GitHub Pages` 构建时自动使用 repo 子路径 `base`，但默认构建继续兼容 `Vercel` 的根路径。
