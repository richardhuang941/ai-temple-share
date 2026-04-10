---
work_package_id: WP02
title: In-App Assessment UI
dependencies:
- WP01
requirement_refs:
- FR-001
- FR-002
- FR-003
- FR-005
- NFR-001
- C-002
planning_base_branch: codex/oss-sanitize-pages-rename
merge_target_branch: codex/oss-sanitize-pages-rename
branch_strategy: Planning artifacts for this feature were generated on codex/oss-sanitize-pages-rename. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into codex/oss-sanitize-pages-rename unless the human explicitly redirects the landing branch.
subtasks:
- T004
- T005
- T006
assignee: "codex"
agent: "codex"
shell_pid: main-shell
authoritative_surface: src/
execution_mode: code_change
owned_files:
- src/components/sbti/**
- src/styles/sbti-assessment.css
- src/content/uiCopy.ts
---

# WP02 - In-App Assessment UI

## Objective

实现站内 `SBTI` 测试体验：桌面端 modal，移动端全屏页面式测试层。

## Activity Log

- 2026-04-10T11:21:29Z – codex – shell_pid=main-shell – Implemented in current branch
- 2026-04-10T11:21:29Z – codex – shell_pid=main-shell – Ready for local review after in-app assessment UI implementation
- 2026-04-10T11:21:30Z – codex – shell_pid=main-shell – Approved after local review
