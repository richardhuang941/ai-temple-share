---
work_package_id: WP01
title: Community Help Content Contract
dependencies: []
requirement_refs:
- FR-001
- FR-006
- NFR-002
- C-003
planning_base_branch: codex/lite-skill-copy-cleanup
merge_target_branch: codex/lite-skill-copy-cleanup
branch_strategy: Planning artifacts for this feature were generated on codex/lite-skill-copy-cleanup. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into codex/lite-skill-copy-cleanup unless the human explicitly redirects the landing branch.
subtasks:
- T001
- T002
- T003
assignee: "codex"
agent: "codex"
shell_pid: "main-shell"
authoritative_surface: src/content/
execution_mode: code_change
owned_files:
- src/content/models.ts
- src/content/uiCopy.ts
- src/content/index.ts
- tests/unit/contentMappers.test.ts
---

# WP01 - Community Help Content Contract

## Objective

把帮助入口的双语 copy、bundle 契约和 unit 覆盖接进现有内容层。

## Activity Log

- 2026-04-16T11:18:11+08:00 – codex – shell_pid=main-shell – Prompt generated for mission 021
- 2026-04-16T11:20:30+08:00 – codex – shell_pid=main-shell – Added CommunityHelpCopy, localized bundle wiring, and unit coverage in the current branch
- 2026-04-16T11:21:10+08:00 – codex – shell_pid=main-shell – Community help content contract is ready for local review
- 2026-04-16T11:23:45+08:00 – codex – shell_pid=main-shell – WP01 verified directly on codex/lite-skill-copy-cleanup after unit and integration regression passed
