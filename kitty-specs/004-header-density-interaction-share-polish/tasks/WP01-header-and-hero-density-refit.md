---
work_package_id: WP01
title: Header and Hero Density Refit
dependencies: []
requirement_refs:
- FR-001
- FR-002
- FR-003
- FR-011
- NFR-001
- NFR-003
- NFR-004
- C-001
- C-002
planning_base_branch: main
merge_target_branch: main
branch_strategy: Planning artifacts for this feature were generated on main. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into main unless the human explicitly redirects the landing branch.
base_branch: kitty/mission-004-header-density-interaction-share-polish
base_commit: 3a35875791a6ba9739478a1cdcd34c51de14bf00
created_at: '2026-04-08T15:16:45.934421+00:00'
subtasks:
- T001
- T002
- T003
assignee: "codex"
agent: "codex"
authoritative_surface: src/components/
execution_mode: code_change
owned_files:
- src/components/common/LocaleSwitcher.tsx
- src/components/common/SiteHeader.tsx
- src/components/sections/HeroSection.tsx
- src/components/sections/AgentPromptSection.tsx
- src/content/heroContent.ts
- src/content/uiCopy.ts
- src/styles/challenge-surfaces.css
- src/styles/globals.css
- src/styles/tokens.css
shell_pid: "18359"
---

# WP01 - Header and Hero Density Refit

## Objective

让顶部 chrome 变成正式 header，并把 Hero + Prompt 的第一屏密度收紧到更接近参考页。

## Included Subtasks

- T001 Add a dedicated header component
- T002 Remove the full report entry and tighten hero hierarchy
- T003 Pull the prompt card closer to the score card so the first screen reads faster

## Activity Log

- 2026-04-08T15:29:00Z – codex – shell_pid=14405 – Implementation completed in lane workspace
- 2026-04-08T15:30:05Z – codex – shell_pid=18359 – Ready for review after local test/build validation
- 2026-04-08T15:30:21Z – codex – shell_pid=18359 – Review passed after npm run test and npm run build
