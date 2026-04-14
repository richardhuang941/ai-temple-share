---
work_package_id: WP02
title: Collapse Timeline Back To Task 1-5
dependencies:
- WP01
requirement_refs:
- FR-003
- FR-005
- NFR-002
planning_base_branch: codex/oss-sanitize-pages-rename
merge_target_branch: codex/oss-sanitize-pages-rename
branch_strategy: Planning artifacts for this feature were generated on codex/oss-sanitize-pages-rename. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into codex/oss-sanitize-pages-rename unless the human explicitly redirects the landing branch.
subtasks:
- T003
- T004
assignee: "codex"
agent: "codex"
shell_pid: main-shell
authoritative_surface: src/content/
execution_mode: code_change
owned_files:
- src/content/models.ts
- src/content/index.ts
- src/content/uiCopy.ts
- src/content/taskMilestones.ts
- src/content/agentSbtiProfiles.ts
---

# WP02 - Collapse Timeline Back To Task 1-5

## Objective

把内容层从 `Task 1-6` 收回 `Task 1-5`，删除 `Task 6 / Agent SBTI` 相关模型、文案和推导逻辑。

## Activity Log

- 2026-04-14T02:43:39Z – codex – shell_pid=main-shell – Implemented in current branch
- 2026-04-14T02:43:40Z – codex – shell_pid=main-shell – Ready for local review after collapsing to Task 1-5
- 2026-04-14T02:43:40Z – codex – shell_pid=main-shell – Approved after local review
