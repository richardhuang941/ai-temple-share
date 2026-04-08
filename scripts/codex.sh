#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Spec Kitty expects CODEX_HOME to point at the project-local Codex prompts.
export CODEX_HOME="${CODEX_HOME:-${PROJECT_ROOT}/.codex}"

cd "${PROJECT_ROOT}"
exec codex "$@"
