---
work_package_id: WP03
title: Static Asset Wiring And Mission Closeout
dependencies:
- WP02
requirement_refs:
- NFR-002
- NFR-003
- NFR-004
- C-001
- C-002
planning_base_branch: codex/lite-skill-copy-cleanup
merge_target_branch: codex/lite-skill-copy-cleanup
branch_strategy: Planning artifacts for this feature were generated on codex/lite-skill-copy-cleanup. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into codex/lite-skill-copy-cleanup unless the human explicitly redirects the landing branch.
subtasks:
- T007
- T008
assignee: "codex"
agent: "codex"
shell_pid: "main-shell"
authoritative_surface: public/ + kitty-specs/021-021-floating-wechat-help-entry/
execution_mode: code_change
owned_files:
- public/community/wechat-group.jpg
- kitty-specs/021-021-floating-wechat-help-entry/acceptance-matrix.json
- kitty-specs/021-021-floating-wechat-help-entry/lanes.json
- kitty-specs/021-021-floating-wechat-help-entry/status.events.jsonl
- kitty-specs/021-021-floating-wechat-help-entry/status.json
- kitty-specs/021-021-floating-wechat-help-entry/tasks.md
- kitty-specs/021-021-floating-wechat-help-entry/tasks/WP03-static-asset-wiring-and-mission-closeout.md
---

# WP03 - Static Asset Wiring And Mission Closeout

## Objective

接入固定二维码图片路径，记录 regression/build 结果，并把 `021` mission 资产收口。

## Activity Log

- 2026-04-16T11:18:11+08:00 – codex – shell_pid=main-shell – Prompt generated for mission 021
- 2026-04-16T11:22:50+08:00 – codex – shell_pid=main-shell – Wired the fixed QR image path and prepared mission closeout artifacts
- 2026-04-16T11:23:30+08:00 – codex – shell_pid=main-shell – Regression and mission closeout are ready for local review after npm test and npm run build
- 2026-04-16T11:23:45+08:00 – codex – shell_pid=main-shell – WP03 verified directly on codex/lite-skill-copy-cleanup with passing regression and build evidence
