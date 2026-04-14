# Implementation Plan: In-App SBTI Assessment

**Branch**: `codex/oss-sanitize-pages-rename`  
**Date**: 2026-04-10  
**Spec**: [spec.md](./spec.md)

## Summary

把当前依赖外部站的 `SBTI` gate 改成站内能力：复用 `sbti.unun.dev` 的前端题库、人格库、算分逻辑和人格海报，在我们自己的 `React + Vite` 单页中提供响应式测试体验。桌面端使用 modal / overlay，移动端使用全屏页面式交互；测试完成后把结果自动回填到 Hero 的 `SBTI` 输入框，并继续沿用现有 Journey gate。

## Technical Context

**Language/Version**: TypeScript 5.x / React 19 / Vite 7  
**Primary Dependencies**: React, Vitest, Testing Library, existing CSS stack  
**Storage**: `localStorage`（持久化 Hero `SBTI` 值）+ React local state（测试流程）  
**Testing**: `vitest --run`  
**Target Platform**: Modern desktop + mobile browsers  
**Project Type**: Single-page web app  
**Performance Goals**: 首次进入测试层不出现明显卡顿；题库和图片本地加载  
**Constraints**: 不引入后端；保留手填 `SBTI`；不回归 Hero/Journey 现有交互  
**Scale/Scope**: 约 30 道常规题 + 2 道特殊题 + 25+ 人格结果卡

## Charter Check

- 保持当前单页架构，不引入不必要的新框架
- 业务配置和内容数据拆分到独立 content/lib 层
- 所有公开交互继续补测试覆盖，避免回归现有 Hero / Journey / Share

## Project Structure

### Documentation

```text
kitty-specs/018-018-in-app-sbti-assessment/
├── plan.md
├── research.md
├── quickstart.md
├── tasks.md
└── tasks/
```

### Source Code

```text
src/
├── components/
│   ├── sbti/
│   └── sections/
├── content/
│   └── sbti/
├── lib/
│   └── sbti/
└── styles/

public/
└── sbti/
    └── images/

tests/
├── integration/
└── unit/
```

**Structure Decision**: 保持单页 React 应用结构；新增 `content/sbti` 管理题库与人格数据，新增 `lib/sbti` 管理算分与流程状态，新增 `components/sbti` 管理测试 UI，海报放在 `public/sbti/images`。

## Approach

### 1. Localize source data and images

- 从 `sbti.unun.dev` 提取：
  - 维度定义
  - 题库
  - 特殊题
  - 人格库
  - 正常人格 pattern
  - 维度解释
  - 海报图片映射
- 把数据固化到本地 TS 模块
- 把人格图拉到 `public/sbti/images`

### 2. Build responsive assessment surface

- `Desktop`：Hero 中点击测试入口时打开大尺寸 modal
- `Mobile`：打开全屏测试层，视觉上更像独立页面
- 共用同一套答题状态、进度、结果渲染和回填逻辑

### 3. Integrate with Hero gate and Journey

- Hero 继续允许手填 `SBTI`
- 新增“去测 SBTI”站内入口，替换外部链接
- 测试完成后自动把 `SBTI` code 写回 Hero 输入框
- 结果关闭后可以直接点“观看模拟 Task 1-6 的流程”

### 4. Regression and acceptance

- 增加 unit tests：
  - 算分逻辑
  - 结果匹配 / 兜底
- 增加 integration tests：
  - Hero 打开测试层
  - 完成测试后自动回填
  - 移动端/桌面端容器行为
- 继续跑 `npm run test` / `npm run build`

## Risks

- 题库和图片量较大，导入方式不当会让 bundle 明显膨胀
- 移动端全屏测试层如果处理不好，会和当前单页滚动产生冲突
- 完成测试后的回填与现有 `SBTI` shake/focus 逻辑需要谨慎协调

## Verification

- `npm run test`
- `npm run build`
- 桌面端：打开测试层 -> 做题 -> 出结果 -> 自动回填 Hero
- 移动端：全屏测试层 -> 做题 -> 返回 Hero -> 自动填值
