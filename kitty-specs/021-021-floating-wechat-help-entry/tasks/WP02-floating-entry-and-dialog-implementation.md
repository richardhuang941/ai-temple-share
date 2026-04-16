---
work_package_id: WP02
title: Floating Entry And Dialog Implementation
dependencies:
- WP01
requirement_refs:
- FR-002
- FR-003
- FR-004
- FR-005
- NFR-001
planning_base_branch: codex/lite-skill-copy-cleanup
merge_target_branch: codex/lite-skill-copy-cleanup
branch_strategy: Planning artifacts for this feature were generated on codex/lite-skill-copy-cleanup. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into codex/lite-skill-copy-cleanup unless the human explicitly redirects the landing branch.
subtasks:
- T004
- T005
- T006
assignee: "codex"
agent: "codex"
shell_pid: "main-shell"
authoritative_surface: src/
execution_mode: code_change
owned_files:
- src/App.tsx
- src/components/common/FloatingCommunityHelp.tsx
- src/styles/community-help.css
- tests/integration/longpage.spec.tsx
---

# WP02 - Floating Entry And Dialog Implementation

## Objective

在页面右下角落地常驻帮助入口，并用轻量 dialog 展示微信群二维码。

## Activity Log

- 2026-04-16T11:18:11+08:00 – codex – shell_pid=main-shell – Prompt generated for mission 021
- 2026-04-16T11:21:40+08:00 – codex – shell_pid=main-shell – Implemented the floating community help entry, dialog behavior, and dedicated styles
- 2026-04-16T11:22:30+08:00 – codex – shell_pid=main-shell – Floating help entry is ready for local review after integration coverage updates
- 2026-04-16T11:23:45+08:00 – codex – shell_pid=main-shell – WP02 verified directly on codex/lite-skill-copy-cleanup after dialog interaction coverage and regression passed
