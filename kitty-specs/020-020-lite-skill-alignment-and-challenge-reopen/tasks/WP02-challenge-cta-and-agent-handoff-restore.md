---
work_package_id: WP02
title: Challenge CTA And Agent Handoff Restore
dependencies:
- WP01
requirement_refs:
- FR-004
- FR-005
- FR-006
- NFR-001
- C-001
planning_base_branch: codex/oss-sanitize-pages-rename
merge_target_branch: codex/oss-sanitize-pages-rename
branch_strategy: Planning artifacts for this feature were generated on codex/oss-sanitize-pages-rename. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into codex/oss-sanitize-pages-rename unless the human explicitly redirects the landing branch.
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
- src/components/sections/HeroSection.tsx
- src/components/sections/AgentPromptSection.tsx
- src/content/agentPromptCards.ts
- src/content/uiCopy.ts
- src/content/heroContent.ts
- tests/integration/longpage.spec.tsx
---

# WP02 - Challenge CTA And Agent Handoff Restore

## Objective

恢复首页主 CTA 的真实参与路径，把页面重新接回 `AgentPromptSection`，并把 handoff 卡切到 lite repo。

## Activity Log

- 2026-04-15T10:10:00Z – codex – shell_pid=main-shell – Prompt generated for mission 020
- 2026-04-15T10:08:03Z – codex – shell_pid=main-shell – Restored the Hero accept CTA, re-mounted AgentPromptSection, and switched Agent handoff copy to the lite repo
- 2026-04-15T10:08:04Z – codex – shell_pid=main-shell – Hero CTA and Agent handoff restore are ready for local review after integration regression updates
- 2026-04-15T10:08:04Z – codex – shell_pid=main-shell – WP02 landed directly on codex/oss-sanitize-pages-rename after local verification | Done override: Implemented and verified directly on codex/oss-sanitize-pages-rename without a separate lane branch
- 2026-04-15T10:08:04Z – codex – shell_pid=main-shell – Local review passed for Hero CTA and Agent handoff restore
- 2026-04-15T10:08:36Z – codex – shell_pid=main-shell – WP02 status reconciled to done after the direct-branch local verification path | Done override: Implemented and verified directly on codex/oss-sanitize-pages-rename without a separate lane branch
