---
work_package_id: WP01
title: Analytics and SBTI Input Compatibility
dependencies: []
requirement_refs:
- FR-001
- FR-002
- FR-003
- FR-004
- NFR-001
- NFR-002
- C-001
- C-002
planning_base_branch: codex/oss-sanitize-pages-rename
merge_target_branch: codex/oss-sanitize-pages-rename
branch_strategy: Planning artifacts for this feature were generated on codex/oss-sanitize-pages-rename. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into codex/oss-sanitize-pages-rename unless the human explicitly redirects the landing branch.
subtasks:
- T001
- T002
- T003
assignee: codex
agent: codex
shell_pid: main-shell
authoritative_surface: src/
execution_mode: code_change
owned_files:
- index.html
- src/App.tsx
- src/components/sections/HeroSection.tsx
- tests/integration/longpage.spec.tsx
---

# WP01 - Analytics and SBTI Input Compatibility

## Objective

补百度统计，并修复 Hero 区 `SBTI` 输入对中文输入法和小写输入的兼容性。
