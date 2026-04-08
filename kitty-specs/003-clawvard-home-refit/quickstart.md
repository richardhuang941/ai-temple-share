# Quickstart: Clawvard 风格首页重构与任务语义校正

## Local Development

```bash
npm install
npm run dev
```

## Test

```bash
npm run test
```

## Build

```bash
npm run build
```

## Manual QA Checklist

1. 打开首页，确认首屏结构更接近 Clawvard 参考页。
2. 确认首页不再出现内部说明型文案。
3. 确认 Hero、Share、Journey 中的分数 / 等级 / 阵营一致。
4. 点击 `接受挑战`，确认滚动到 Agent Prompt。
5. 点击 `转发战书给朋友`，确认滚动到 Share。
6. 点击 `观看模拟 Task 1-5 的流程`，确认 Journey 启动。
7. 观看 Journey，确认切换到新 task 时卡片会自动进入视野中心。
8. 验证 `Task 4` 仍然明确为 SHIT Skills 原生流程。
9. 在移动端宽度下检查成绩卡、CTA 和 terminal 卡布局。
