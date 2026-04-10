---
work_package_id: WP02
title: Runtime Link and Storage Alignment
dependencies:
- WP01
requirement_refs:
- FR-002
- FR-003
- NFR-001
- C-001
- C-002
planning_base_branch: feature/004-header-density-interaction-share-polish
merge_target_branch: feature/004-header-density-interaction-share-polish
branch_strategy: Planning artifacts for this feature were generated on feature/004-header-density-interaction-share-polish. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feature/004-header-density-interaction-share-polish unless the human explicitly redirects the landing branch.
subtasks:
- T002
assignee: codex
agent: codex
shell_pid: main-shell
authoritative_surface: src/
execution_mode: code_change
owned_files:
- src/lib/locale.ts
- src/components/sections/ShareSection.tsx
---

# WP02 - Runtime Link and Storage Alignment

## Objective

把 locale storage key 与公开挑战链接同步到新的 repo / GitHub Pages 地址。
