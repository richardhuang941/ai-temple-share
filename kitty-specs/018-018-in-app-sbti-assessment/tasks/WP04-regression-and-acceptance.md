---
work_package_id: WP04
title: Regression And Acceptance
dependencies:
- WP03
requirement_refs:
- NFR-001
- NFR-003
- C-003
planning_base_branch: codex/oss-sanitize-pages-rename
merge_target_branch: codex/oss-sanitize-pages-rename
branch_strategy: Planning artifacts for this feature were generated on codex/oss-sanitize-pages-rename. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into codex/oss-sanitize-pages-rename unless the human explicitly redirects the landing branch.
subtasks:
- T010
- T011
assignee: codex
agent: codex
shell_pid: main-shell
authoritative_surface: tests/
execution_mode: code_change
owned_files:
- tests/unit/**
- tests/integration/**
- kitty-specs/018-018-in-app-sbti-assessment/acceptance-matrix.json
- kitty-specs/018-018-in-app-sbti-assessment/status.json
- kitty-specs/018-018-in-app-sbti-assessment/status.events.jsonl
---

# WP04 - Regression And Acceptance

## Objective

补齐 `SBTI` 站内测试链路的 unit / integration 回归，并完成 Kitty 验收资产。
