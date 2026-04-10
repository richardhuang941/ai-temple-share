---
work_package_id: WP03
title: Journey Loading and Expandable History
dependencies: []
requirement_refs:
- FR-007
- FR-008
- FR-009
- FR-010
- NFR-002
- NFR-003
- NFR-004
planning_base_branch: feature/004-header-density-interaction-share-polish
merge_target_branch: feature/004-header-density-interaction-share-polish
branch_strategy: Planning artifacts for this feature were generated on feature/004-header-density-interaction-share-polish. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feature/004-header-density-interaction-share-polish unless the human explicitly redirects the landing branch.
subtasks:
- T007
- T008
- T009
assignee: "codex"
agent: "codex:gpt-5.4:reviewer:reviewer"
authoritative_surface: src/components/journey/
execution_mode: code_change
owned_files:
- src/components/journey/**
- src/components/sections/JourneySection.tsx
- src/lib/timeline.ts
- src/content/uiCopy.ts
- src/styles/journey.css
shell_pid: "4218"
---

# WP03 - Journey Loading and Expandable History

## Objective

让 Journey 更像“可观察的推进过程”，并允许用户直接回看已经完成的 task。

## Included Subtasks

- T007 Add visible loading feedback to active stages
- T008 Let completed tasks expand and collapse locally
- T009 Keep upcoming tasks on the existing focus-switch path

## Notes

- completed task 的默认动作是 inspect，不是 replay。
- active/loading 需要兼容 reduced-motion。

## Activity Log
- 2026-04-10T04:02:18Z – codex:gpt-5.4:implementer:implementer – shell_pid=4218 – Started implementation via action command
- 2026-04-10T04:03:25Z – codex:gpt-5.4:implementer:implementer – shell_pid=4218 – Ready for review: journey summary stays visible and completed tasks expose accessible detail toggles.
- 2026-04-10T04:03:42Z – codex:gpt-5.4:reviewer:reviewer – shell_pid=4218 – Started review via action command
