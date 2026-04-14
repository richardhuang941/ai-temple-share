---
work_package_id: WP01
title: Remove SBTI Entry And Gate
dependencies: []
requirement_refs:
- FR-001
- FR-002
- C-003
planning_base_branch: codex/oss-sanitize-pages-rename
merge_target_branch: codex/oss-sanitize-pages-rename
branch_strategy: Planning artifacts for this feature were generated on codex/oss-sanitize-pages-rename. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into codex/oss-sanitize-pages-rename unless the human explicitly redirects the landing branch.
subtasks:
- T001
- T002
assignee: "codex"
agent: "codex"
shell_pid: main-shell
authoritative_surface: src/
execution_mode: code_change
owned_files:
- src/App.tsx
- src/components/sections/HeroSection.tsx
- src/components/sections/JourneySection.tsx
- src/styles/challenge-surfaces.css
---

# WP01 - Remove SBTI Entry And Gate

## Objective

拆掉 Hero 和 Journey 启动路径中的 `SBTI` 输入、测试入口和 gate，让模拟可以直接从首页启动。

## Activity Log

- 2026-04-14T02:43:38Z – codex – shell_pid=main-shell – Implemented in current branch
- 2026-04-14T02:43:38Z – codex – shell_pid=main-shell – Ready for local review after removing SBTI entry and gate
- 2026-04-14T02:43:39Z – codex – shell_pid=main-shell – Approved after local review
