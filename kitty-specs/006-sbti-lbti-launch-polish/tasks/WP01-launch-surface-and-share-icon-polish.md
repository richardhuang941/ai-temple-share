---
work_package_id: WP01
title: Launch Surface and Share Icon Polish
dependencies: []
requirement_refs:
- FR-001
- FR-002
- FR-003
- NFR-001
- NFR-002
- NFR-004
- C-001
- C-003
planning_base_branch: feature/004-header-density-interaction-share-polish
merge_target_branch: feature/004-header-density-interaction-share-polish
branch_strategy: Planning artifacts for this feature were generated on feature/004-header-density-interaction-share-polish. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feature/004-header-density-interaction-share-polish unless the human explicitly redirects the landing branch.
subtasks:
- T001
- T002
- T003
assignee: "codex"
agent: "codex"
shell_pid: "main-shell"
authoritative_surface: src/components/sections/
execution_mode: code_change
owned_files:
- src/App.tsx
- src/components/sections/HeroSection.tsx
- src/components/share/SocialShareActions.tsx
- src/styles/challenge-surfaces.css
- src/styles/share-actions.css
---

# WP01 - Launch Surface and Share Icon Polish

## Objective

把首屏主动作切成发布时间提示，并同步隐藏 Agent 模块，同时修正移动端分享 icon 的比例和布局。

## Included Subtasks

- T001 Replace hero primary CTA copy with the launch-time notice
- T002 Hide AgentPromptSection without deleting the component
- T003 Normalize mobile share icon sizing so the circles stay round

## Notes

- 这一步只处理首屏和分享入口表面，不负责 Journey 的输入 gate。

## Activity Log

- 2026-04-10T15:10:00+08:00 – codex – shell_pid=main-shell – Planned on feature/004-header-density-interaction-share-polish
