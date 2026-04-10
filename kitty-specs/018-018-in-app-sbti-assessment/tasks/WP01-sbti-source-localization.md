---
work_package_id: WP01
title: SBTI Source Localization
dependencies: []
requirement_refs:
- FR-004
- FR-005
- NFR-002
- NFR-003
- C-001
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
- public/sbti/images/**
- src/content/sbti/**
- src/lib/sbti/**
- kitty-specs/018-018-in-app-sbti-assessment/spec.md
- kitty-specs/018-018-in-app-sbti-assessment/plan.md
- kitty-specs/018-018-in-app-sbti-assessment/research.md
- kitty-specs/018-018-in-app-sbti-assessment/quickstart.md
---

# WP01 - SBTI Source Localization

## Objective

把 `sbti.unun.dev` 的题库、人格库、算分逻辑输入数据和人格海报本地化到我们项目中。
