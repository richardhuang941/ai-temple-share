---
work_package_id: WP02
title: Mobile App Handoff and Feedback
dependencies:
- WP01
requirement_refs:
- FR-002
- FR-003
- FR-004
- NFR-001
- NFR-002
- NFR-003
- C-002
planning_base_branch: feature/004-header-density-interaction-share-polish
merge_target_branch: feature/004-header-density-interaction-share-polish
branch_strategy: Planning artifacts for this feature were generated on feature/004-header-density-interaction-share-polish. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feature/004-header-density-interaction-share-polish unless the human explicitly redirects the landing branch.
subtasks:
- T004
- T005
- T006
assignee: "codex"
agent: "codex"
shell_pid: "4218"
authoritative_surface: src/components/share/
execution_mode: code_change
owned_files:
- src/components/share/SocialShareActions.tsx
- src/lib/shareActions.ts
- src/content/sharePlatformCopy.ts
- src/styles/share-actions.css
---

# WP02 - Mobile App Handoff and Feedback

## Objective

为移动端分享补齐“复制文案 -> 倒计时提示 -> 唤起 App”的 handoff 链路，并保证 PC/移动端入口分流正确。

## Included Subtasks

- T004 Show only X on desktop
- T005 Show WeChat / Xiaohongshu / Douyin entries on mobile
- T006 Add copy + countdown + URI scheme launch flow for mobile app platforms

## Notes

- 不要求在静态页内完成平台原生分享，只需要把用户送入目标 App。
- loading/feedback 要对用户可见，但不要泄漏实现细节说明。

## Activity Log
