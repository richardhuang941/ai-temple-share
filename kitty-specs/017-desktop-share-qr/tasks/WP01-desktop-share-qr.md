---
work_package_id: WP01
title: Desktop Share QR
dependencies: []
requirement_refs:
- FR-001
- FR-002
- FR-003
- FR-004
- NFR-001
- NFR-002
- NFR-003
- C-001
- C-002
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
authoritative_surface: src/
execution_mode: code_change
owned_files:
- package.json
- package-lock.json
- src/content/models.ts
- src/content/uiCopy.ts
- src/lib/shareActions.ts
- src/lib/shareLink.ts
- src/components/sections/ShareSection.tsx
- src/components/share/ShareSummaryCard.tsx
- src/components/share/DesktopShareQr.tsx
- src/styles/share-actions.css
- tests/integration/longpage.spec.tsx
---

# WP01 - Desktop Share QR

## Objective

为桌面端分享区增加二维码，并把挑战链接统一改成当前访问页面的公开链接。

## Activity Log

- 2026-04-10T10:51:57Z – codex – shell_pid=main-shell – Implemented desktop QR and dynamic current-link sharing in direct repo mode
- 2026-04-10T10:51:57Z – codex – shell_pid=main-shell – Implementation complete; npm run test and npm run build passed
