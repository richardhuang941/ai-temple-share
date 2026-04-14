# Research: Remove SBTI Flow

## Findings

1. `SBTI` 当前影响了四层：
   - 页面入口：`src/App.tsx`、`src/components/sections/HeroSection.tsx`、`src/components/sections/JourneySection.tsx`
   - 内容模型：`src/content/models.ts`、`src/content/uiCopy.ts`、`src/content/taskMilestones.ts`
   - 本地能力：`src/components/sbti/**`、`src/content/sbti/**`、`src/lib/sbti/**`
   - 测试与静态资源：`tests/integration/longpage.spec.tsx`、`tests/unit/sbtiEngine.test.ts`、`public/sbti/images/**`

2. `JourneySection` 当前真正卡流程的是 `sbtiValue` 判断；去掉 gate 后主时间线本身仍然可以直接工作，不需要重写 timeline hook。

3. `Task 6` 完全是 `Agent SBTI` 收尾，不参与前五个任务的主线资格，因此可以独立删除，不会影响 `Task 1-5` 的核心叙事。

4. 当前 share / hero / timeline 的主体验都不依赖 `SBTI` 数据本身，只依赖 seeded agent result，所以删除 `SBTI` 不会影响分数、阵营、共振和分享卡主内容。

## Decision

- 直接删除 `SBTI` gate，不用保留任何替代输入。
- 直接删除 `Task 6`，把页面文案统一收回 `Task 1-5`。
- 物理删除 `SBTI` 题库、算分、图片和 assessment 组件，而不是只做 unused 保留。
