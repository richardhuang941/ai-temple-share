---
work_package_id: WP01
title: Brand Copy Replacement
dependencies: []
requirement_refs:
- FR-001
- FR-002
- FR-003
- FR-004
- NFR-001
- NFR-002
- C-001
planning_base_branch: feature/004-header-density-interaction-share-polish
merge_target_branch: feature/004-header-density-interaction-share-polish
branch_strategy: Planning artifacts for this feature were generated on feature/004-header-density-interaction-share-polish. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feature/004-header-density-interaction-share-polish unless the human explicitly redirects the landing branch.
subtasks:
- T001
- T002
- T003
assignee: "codex"
agent: "codex"
shell_pid: "99143"
authoritative_surface: src/content/
execution_mode: code_change
owned_files:
- index.html
- src/App.tsx
- src/components/common/SiteHeader.tsx
- src/components/sections/HeroSection.tsx
- src/components/share/ShareSummaryCard.tsx
- src/content/heroContent.ts
- src/content/agentProfile.ts
- src/content/sharePlatformCopy.ts
- src/content/uiCopy.ts
- src/content/factionContent.ts
- src/content/agentPromptCards.ts
---

# WP01 - Brand Copy Replacement

## Objective

把展示层与普通文本里的 `Claws Temple` 品牌文案统一替换为 `Agent Temple`，但保留真实 repo/path/domain。

## Activity Log

- 2026-04-10T08:25:40Z – codex – shell_pid=99143 – Implementation completed on feature branch
- 2026-04-10T08:25:41Z – codex – shell_pid=99143 – Ready for review after test/build validation
