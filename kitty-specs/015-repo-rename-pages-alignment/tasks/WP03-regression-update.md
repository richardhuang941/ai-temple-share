---
work_package_id: WP03
title: Regression Update
dependencies:
- WP02
requirement_refs:
- FR-003
- NFR-001
- C-001
planning_base_branch: feature/004-header-density-interaction-share-polish
merge_target_branch: feature/004-header-density-interaction-share-polish
branch_strategy: Planning artifacts for this feature were generated on feature/004-header-density-interaction-share-polish. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feature/004-header-density-interaction-share-polish unless the human explicitly redirects the landing branch.
subtasks:
- T003
assignee: codex
agent: codex
shell_pid: main-shell
authoritative_surface: tests/
execution_mode: code_change
owned_files:
- tests/integration/longpage.spec.tsx
---

# WP03 - Regression Update

## Objective

更新与公开挑战链接相关的集成测试，确保分享 payload 断言与当前地址一致。
