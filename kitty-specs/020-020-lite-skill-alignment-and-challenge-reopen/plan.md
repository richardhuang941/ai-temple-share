# Implementation Plan: Lite Skill Alignment And Challenge Reopen

## Summary

这轮把首页任务叙事从旧 full 版语义切到 `ai-temple-bounty2.0-lite-skills`，并把首屏主 CTA 从发布时间占位恢复为可参与入口。技术上分三层同步推进：

1. seeded demo 数据与 `Task 2/3` stage 语义一起切到 lite。
2. Hero 主 CTA 与 `AgentPromptSection` 一起恢复。
3. unit / integration / mission 资产一起收口，避免文案与派生逻辑再次分叉。

## Technical Context

- **Language/Version**: TypeScript 5.9 + React 19 + Vite 7
- **Primary Dependencies**: React, React DOM, Vitest, Testing Library
- **Storage**: N/A（纯前端 seeded demo）
- **Testing**: `vitest --run`
- **Target Platform**: 浏览器静态单页
- **Project Type**: 单页前端应用
- **Performance Goals**: 保持现有静态页体验，无额外运行时 API 请求
- **Constraints**: 继续使用 seeded result；Task 4/5 边界不变；target branch 固定为 `codex/oss-sanitize-pages-rename`
- **Scale/Scope**: 单页挑战站 + 一套 integration/unit 回归

## Charter Check

- 本轮仍然符合当前仓库的单页前端 + mission 文档收口方式。
- 不新增后端、数据库或新的 runtime surface。
- 复杂度提升仅限于内容契约与 CTA 承接恢复，没有引入新的架构层级。

## Project Structure

### Documentation

```
kitty-specs/020-020-lite-skill-alignment-and-challenge-reopen/
├── spec.md
├── research.md
├── data-model.md
├── plan.md
├── quickstart.md
├── acceptance-matrix.json
├── tasks.md
├── wps.yaml
└── tasks/
```

### Source Code

```
src/
├── App.tsx
├── components/sections/
├── content/
└── lib/

tests/
├── integration/
└── unit/
```

**Structure Decision**: 继续沿用现有前端单页结构，不拆新目录；只在 `content / lib / sections / tests` 内收口。

## Approach

### 1. Lite 语义对齐

- 更新 `SeededSimulationResult` 和 `simulationSeed`，补出 lite 需要的积分与 leaderboard proof。
- 重写 `taskMilestones` 的 `Task 2/3` stage 设计。
- 同步更新 `contentMappers` 的 supporting facts 选择。

### 2. 挑战入口恢复

- 在 `App.tsx` 重新挂回 `AgentPromptSection`。
- Hero 主 CTA 改回 enabled，并滚动到 `#agent-prompt`。
- `AgentPromptSection` 与 `agentPromptCards` 一起切到 lite repo 和 lite handoff 文案。

### 3. Regression + Mission

- 更新 `tests/unit/contentMappers.test.ts`
- 更新 `tests/integration/longpage.spec.tsx`
- 补齐 `020` mission 的 WPs、quickstart、acceptance，并记录本轮验证结果
