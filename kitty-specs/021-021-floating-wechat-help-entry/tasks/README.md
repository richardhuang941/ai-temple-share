# Tasks Directory

This directory contains work package (WP) prompt files.

## Directory Structure (v0.9.0+)

```
tasks/
├── WP01-community-help-content-contract.md
├── WP02-floating-entry-and-dialog-implementation.md
├── WP03-static-asset-wiring-and-mission-closeout.md
└── README.md
```

All WP files are stored flat in `tasks/`. Status is tracked in `status.events.jsonl`, not in WP frontmatter.

## Work Package File Format

Each WP file **MUST** use YAML frontmatter:

```yaml
---
work_package_id: "WP01"
title: "Work Package Title"
dependencies: []
planning_base_branch: "codex/lite-skill-copy-cleanup"
merge_target_branch: "codex/lite-skill-copy-cleanup"
branch_strategy: "Planning artifacts were generated on codex/lite-skill-copy-cleanup; completed changes must merge back into codex/lite-skill-copy-cleanup."
subtasks:
  - "T001"
  - "T002"
assignee: ""
agent: ""
shell_pid: ""
---
```

## Status Tracking

Status is tracked via the canonical event log (`status.events.jsonl`), not in WP frontmatter.

## File Naming

- Format: `WP01-kebab-case-slug.md`
- Examples: `WP01-community-help-content-contract.md`, `WP02-floating-entry-and-dialog-implementation.md`
