---
work_package_id: WP03
title: Delete SBTI Assets And Regression Update
dependencies:
- WP02
requirement_refs:
- FR-004
- NFR-001
- NFR-002
planning_base_branch: codex/oss-sanitize-pages-rename
merge_target_branch: codex/oss-sanitize-pages-rename
branch_strategy: Planning artifacts for this feature were generated on codex/oss-sanitize-pages-rename. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into codex/oss-sanitize-pages-rename unless the human explicitly redirects the landing branch.
subtasks:
- T005
- T006
assignee: "codex"
agent: "codex"
shell_pid: main-shell
authoritative_surface: src/
execution_mode: code_change
owned_files:
- src/components/sbti/**
- src/content/sbti/**
- src/lib/sbti/**
- src/styles/sbti-assessment.css
- public/sbti/images/**
- tests/unit/**
- tests/integration/**
---

# WP03 - Delete SBTI Assets And Regression Update

## Objective

物理删除 `SBTI` 题库、assessment 组件、静态图片和对应测试，并把回归覆盖改成 `Task 1-5` 的直启流程。

## Activity Log

- 2026-04-14T02:43:41Z – codex – shell_pid=main-shell – Implemented in current branch
- 2026-04-14T02:43:41Z – codex – shell_pid=main-shell – Ready for local review after deleting SBTI assets and tests
- 2026-04-14T02:43:42Z – codex – shell_pid=main-shell – Approved after local review
