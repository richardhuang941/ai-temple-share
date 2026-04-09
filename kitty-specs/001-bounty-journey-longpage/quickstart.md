# Quickstart: Claws Temple Bounty 长单页

## Goal

在仓库根目录快速搭起 `React + Vite` 单页工程，并具备开发、测试、构建和人工验收所需的最小闭环。

## 1. Scaffold App

在 `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home` 初始化 Vite React TypeScript 项目：

```bash
npm create vite@latest . -- --template react-ts
```

## 2. Install Dependencies

```bash
npm install
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

## 3. Create Planned Structure

实现时按 `plan.md` 中定义的结构补齐：

- `src/components/sections/`
- `src/components/journey/`
- `src/components/share/`
- `src/content/`
- `src/hooks/`
- `src/lib/`
- `src/styles/`
- `tests/unit/`
- `tests/integration/`

## 4. Run Dev Server

```bash
npm run dev
```

## 5. Validate Locally

```bash
npm run test
npm run build
```

如果默认脚本中没有 `test`，在实现阶段补充 `package.json` script 后再执行。

## 6. Manual QA Checklist

- 首屏 2 秒内可读
- 单页四个主区块都存在
- `Task 1-5` 顺序正确
- 分享区使用 `Agent` 主体
- `Task 4` 明确显示为第三方原生流程
- 移动端无横向滚动
- reduced motion 模式下仍可读

## 7. Ready for Tasks

完成以上规划后，下一步应由用户显式执行：

```text
/spec-kitty.tasks
```
