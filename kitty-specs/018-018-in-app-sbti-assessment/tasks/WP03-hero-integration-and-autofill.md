---
work_package_id: WP03
title: Hero Integration And Autofill
dependencies:
- WP02
requirement_refs:
- FR-001
- FR-006
- FR-007
- C-002
- C-003
planning_base_branch: codex/oss-sanitize-pages-rename
merge_target_branch: codex/oss-sanitize-pages-rename
branch_strategy: Planning artifacts for this feature were generated on codex/oss-sanitize-pages-rename. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into codex/oss-sanitize-pages-rename unless the human explicitly redirects the landing branch.
subtasks:
- T007
- T008
- T009
assignee: codex
agent: codex
shell_pid: main-shell
authoritative_surface: src/
execution_mode: code_change
owned_files:
- src/App.tsx
- src/components/sections/HeroSection.tsx
- src/components/sections/JourneySection.tsx
- src/styles/challenge-surfaces.css
- src/content/index.ts
- src/content/models.ts
---

# WP03 - Hero Integration And Autofill

## Objective

把站内 `SBTI` 测试接回 Hero 输入 gate，并在完成测试后自动回填、继续 Journey。
