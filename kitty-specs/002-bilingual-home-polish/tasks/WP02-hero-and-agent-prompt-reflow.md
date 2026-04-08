---
work_package_id: WP02
title: Hero and Agent Prompt Reflow
dependencies:
- WP01
requirement_refs:
- FR-004
- FR-005
- FR-014
- FR-015
planning_base_branch: main
merge_target_branch: main
branch_strategy: Planning artifacts for this feature were generated on main. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into main unless the human explicitly redirects the landing branch.
subtasks:
- T006
- T007
- T008
- T009
phase: Phase 2 - Primary Conversion Path
assignee: ''
agent: ''
shell_pid: '16680'
history:
- timestamp: '2026-04-08T10:00:00Z'
  agent: codex
  action: Prompt generated via /spec-kitty.tasks
authoritative_surface: src/components/sections/
execution_mode: code_change
owned_files:
- src/App.tsx
- src/components/common/**
- src/components/sections/HeroSection.tsx
- src/components/sections/AgentPromptSection.tsx
---

# WP02 - Hero and Agent Prompt Reflow

## Objective

把首屏改成更轻量的 challenge card，并让 `接受挑战` 更自然地承接到 Agent Prompt 区。

## Context

- 本 WP 负责首页转化路径，不负责分享模式和 Journey 播放逻辑。
- 首页只保留必要状态，不再承担完整长文叙事。
- 你只能修改 frontmatter 中声明的 `owned_files`。

## Branch Strategy

- Planning branch: `main`
- Final merge target: `main`
- Implementation command: `spec-kitty implement WP02`

## Owned Files

- `src/App.tsx`
- `src/components/common/**`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/AgentPromptSection.tsx`

Do not modify files outside this list.

## Included Subtasks

- T006 Rebuild the hero as a compact challenge card
- T007 Add language toggle and primary CTA behaviors
- T008 Reorder page sections to Hero -> Agent Prompt -> Share -> Journey
- T009 Tighten Agent Prompt copy and landing flow

## Definition of Done

- 首屏信息密度明显下降
- `接受挑战` 可跳到 Agent Prompt
- 语言切换入口在首屏可见
- App 主区块顺序已调整

