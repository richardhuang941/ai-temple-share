---
work_package_id: WP01
title: Lite Task Content Alignment
dependencies: []
requirement_refs:
- FR-001
- FR-002
- FR-003
- NFR-001
- C-002
- C-003
planning_base_branch: codex/oss-sanitize-pages-rename
merge_target_branch: codex/oss-sanitize-pages-rename
branch_strategy: Planning artifacts for this feature were generated on codex/oss-sanitize-pages-rename. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into codex/oss-sanitize-pages-rename unless the human explicitly redirects the landing branch.
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
- src/lib/simulationSeed.ts
- src/content/taskMilestones.ts
- src/content/factionContent.ts
- src/lib/contentMappers.ts
- tests/unit/contentMappers.test.ts
---

# WP01 - Lite Task Content Alignment

## Objective

把 `Task 2/3` 的内容模型、seeded proof 和分享派生全部切到 lite skill 语义，并清掉旧 full 版泄漏。

## Activity Log

- 2026-04-15T10:10:00Z – codex – shell_pid=main-shell – Prompt generated for mission 020
- 2026-04-15T10:07:39Z – codex – shell_pid=main-shell – Aligned lite Task 2/3 content, seeded proof fields, and share derivation in current branch
- 2026-04-15T10:07:43Z – codex – shell_pid=main-shell – Lite task content alignment is ready for local review after unit regression updates
- 2026-04-15T10:07:47Z – codex – shell_pid=main-shell – Local review passed for lite task content alignment
- 2026-04-15T10:07:54Z – codex – shell_pid=main-shell – WP01 landed directly on codex/oss-sanitize-pages-rename after local verification | Done override: Implemented and verified directly on codex/oss-sanitize-pages-rename without a separate lane branch
