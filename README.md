# Claws Temple Home

This repository has been initialized with `spec-kitty` for a `Codex`-first workflow.

## Current Setup

- `spec-kitty-cli`: `3.1.0`
- AI workflow prompts: generated under local agent directories such as `.codex/`
- Project runtime/config: generated under `.kittify/`
- Verification: `spec-kitty verify-setup`

## Codex Usage

`spec-kitty` expects `CODEX_HOME` to point to the project-local `.codex/` directory.

Use the wrapper below from the repo root:

```bash
./scripts/codex.sh
```

If we need to invoke Codex manually in the current shell, use:

```bash
export CODEX_HOME="$PWD/.codex"
codex
```

## Recommended Spec Kitty Flow

```bash
spec-kitty verify-setup
spec-kitty dashboard
```

Then use the prompt flow in Codex:

1. `/spec-kitty.charter`
2. `/spec-kitty.specify`
3. `/spec-kitty.plan`
4. `/spec-kitty.research`
5. `/spec-kitty.tasks`
6. `/spec-kitty.implement`
7. `/spec-kitty.review`
8. `/spec-kitty.accept`
9. `/spec-kitty.merge`

## Notes

- `.codex/`, `.claude/`, `.cursor/` and similar agent folders are intentionally ignored.
- `.agents/` is also ignored because `spec-kitty` installs local skill symlinks there that point to user-specific absolute paths.
- Before real feature work, prefer starting from a feature branch or the Spec Kitty worktree flow instead of working directly on `main`.
