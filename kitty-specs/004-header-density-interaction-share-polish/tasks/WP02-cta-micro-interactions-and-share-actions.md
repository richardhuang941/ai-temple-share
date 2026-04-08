---
work_package_id: WP02
title: CTA Micro Interactions and Share Actions
dependencies:
- WP01
requirement_refs:
- FR-004
- FR-005
- FR-006
- FR-007
- NFR-002
- NFR-004
- C-002
- C-003
planning_base_branch: main
merge_target_branch: main
branch_strategy: Planning artifacts for this feature were generated on main. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into main unless the human explicitly redirects the landing branch.
subtasks:
- T004
- T005
- T006
- T007
assignee: codex
agent: codex
authoritative_surface: src/components/share/
execution_mode: code_change
owned_files:
- src/components/common/CopyButton.tsx
- src/components/share/**
- src/components/sections/ShareSection.tsx
- src/lib/shareActions.ts
- src/content/models.ts
- src/content/sharePlatformCopy.ts
- src/styles/share-actions.css
---

# WP02 - CTA Micro Interactions and Share Actions

## Objective

补上 CTA 的 hover / tap / shake 反馈，并让分享区具备社媒入口和稳定 fallback。
