---
work_package_id: WP01
title: Share Surface Normalization
dependencies: []
requirement_refs:
- FR-001
- FR-004
- FR-005
- FR-006
- FR-007
- NFR-003
- NFR-004
- C-001
- C-002
planning_base_branch: feature/004-header-density-interaction-share-polish
merge_target_branch: feature/004-header-density-interaction-share-polish
branch_strategy: Planning artifacts for this feature were generated on feature/004-header-density-interaction-share-polish. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feature/004-header-density-interaction-share-polish unless the human explicitly redirects the landing branch.
subtasks:
- T001
- T002
- T003
assignee: "codex"
agent: "codex"
shell_pid: "4218"
authoritative_surface: src/components/share/
execution_mode: code_change
owned_files:
- src/components/sections/ShareSection.tsx
- src/components/share/ShareSummaryCard.tsx
- src/content/shareSummary.ts
- src/styles/challenge-surfaces.css
---

# WP01 - Share Surface Normalization

## Objective

把分享区整理成单一、干净的文字战书表面，去掉重复标题、图片模式和 fallback 解释文案。

## Included Subtasks

- T001 Remove image/text switch and keep text-only share
- T002 Remove redundant title stack inside the share card
- T003 Normalize zh/en section chrome wording

## Notes

- 这一轮优先保证用户看到的是挑战页，不是内部实现说明。
- desktop/mobile 平台分流由 WP02 继续负责。

## Activity Log
- 2026-04-10T04:12:31Z – codex – shell_pid=4218 – Merged into feature/004-header-density-interaction-share-polish | Done override: Manual squash merge landed on feature/004-header-density-interaction-share-polish after mission acceptance.
