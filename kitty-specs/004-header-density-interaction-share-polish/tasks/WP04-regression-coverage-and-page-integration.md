---
work_package_id: WP04
title: Regression Coverage and Page Integration
dependencies:
- WP02
- WP03
requirement_refs:
- FR-001
- FR-002
- FR-003
- FR-004
- FR-006
- FR-008
- FR-010
- FR-011
- NFR-001
- NFR-002
- NFR-003
planning_base_branch: main
merge_target_branch: main
branch_strategy: Planning artifacts for this feature were generated on main. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into main unless the human explicitly redirects the landing branch.
subtasks:
- T011
- T012
- T013
assignee: codex
agent: codex
authoritative_surface: tests/
execution_mode: code_change
owned_files:
- src/App.tsx
- src/content/index.ts
- tests/integration/longpage.spec.tsx
- tests/unit/locale.test.ts
- tests/unit/contentMappers.test.ts
---

# WP04 - Regression Coverage and Page Integration

## Objective

把前面几步的布局和交互整合回主页面，并补齐这轮 refit 的回归测试。
