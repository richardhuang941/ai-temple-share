# Quickstart: 006-sbti-lbti-launch-polish

## Local Validation

```bash
npm run test
npx tsc -b --clean && npm run build
```

## Manual Smoke Check

1. 打开首页，确认 Hero 第一按钮为 `4月13日 晚上8点！`
2. 确认页面中不再出现 `让你的 AI Agent 执行以下命令`
3. 点击“观看模拟 Task 1-6 的流程”跳到 Journey
4. 不填写 `SBTI` 直接尝试开始，确认出现错误提示与 [SBTI 人格测试](https://sbti.unun.dev/) 引导
5. 填入任意 `SBTI` 后开始模拟，确认 timeline 正常推进
6. 推进到最后，确认 `Task 6 / LBTI` 出现
7. 移动端查看分享区，确认平台 icon 保持正圆
