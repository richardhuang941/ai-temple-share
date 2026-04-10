---
work_package_id: WP02
title: Header Cleanup and SBTI Relayout
dependencies:
- WP01
requirement_refs:
- FR-004
- FR-005
- FR-006
- FR-007
- NFR-002
- NFR-003
- C-001
- C-002
planning_base_branch: feature/004-header-density-interaction-share-polish
merge_target_branch: feature/004-header-density-interaction-share-polish
branch_strategy: Planning artifacts for this feature were generated on feature/004-header-density-interaction-share-polish. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feature/004-header-density-interaction-share-polish unless the human explicitly redirects the landing branch.
subtasks:
- T004
- T005
- T006
assignee: codex
agent: codex
shell_pid: main-shell
authoritative_surface: src/components/sections/
execution_mode: code_change
owned_files:
- src/App.tsx
- src/components/common/SiteHeader.tsx
- src/components/sections/HeroSection.tsx
- src/components/sections/JourneySection.tsx
- src/styles/globals.css
---

# WP02 - Header Cleanup and SBTI Relayout

## Objective

移除 header 借用 logo，并把 `SBTI` 输入从 Journey 迁到 Hero 的观看模拟动作前。
