# Implementation Plan: 009 Agent Temple Brand Neutralization

**Branch**: `feature/004-header-density-interaction-share-polish`  
**Date**: `2026-04-10`  
**Spec**: [spec.md](./spec.md)

## Summary

这轮是品牌展示文案统一：

1. 把页面入口、Header、Hero、Share、默认 Agent profile 等展示词从 `Claws Temple` 改成 `Agent Temple`。
2. 只替换普通品牌文本，不改真实 repo/path/domain。
3. 同步修正相关测试断言。

## Technical Context

- **Language/Version**: TypeScript + React 19
- **Primary Dependencies**: React, Vite, Vitest
- **Storage**: N/A
- **Testing**: Vitest + Testing Library
- **Target Platform**: Vercel-hosted static web app
- **Project Type**: 单页 web application
- **Constraints**: 不改真实外部引用路径，不新增功能依赖
- **Scale/Scope**: 文案与测试层面的轻量替换

## Charter Check

- 属于前端展示收口，不引入额外架构复杂度。
- 保持现有内容模型结构，仅更新品牌词。

## Project Structure

### Documentation

```text
kitty-specs/009-agent-temple-brand-neutralization/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code

```text
src/
├── components/
├── content/
└── styles/

tests/
├── integration/
└── unit/
```

**Structure Decision**: 仅在内容源、页面入口与测试文件做品牌替换，不调整组件结构。

## Key Decisions

- 功能性标识与展示性品牌词分开处理。
- 保留真实 GitHub org `Claws-Temple`、真实 domain `claws-temple-home.vercel.app`。
- 中文侧统一直接使用 `Agent Temple`，不再额外发明新的中文品牌译名。

## Risks

- 简单字符串替换最容易误伤 repo/path，所以必须按文件逐个精确修改。
- 某些 brand 文案是从内容模型拼出来的，需要同时改内容源和测试断言。

## Verification

- `npm run test`
- `npm run build`
- 手工检查页面 title、header、hero、share copy
