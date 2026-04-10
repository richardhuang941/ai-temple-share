# Quickstart: 008-008-share-playback-sbti-feedback-polish

```bash
npm run test
npm run build
```

手工检查：

1. 分享卡里同一句挑战话术只出现一次
2. 复制按钮仍能复制完整挑战文本与正式链接
3. 空 `SBTI` 时点击“观看模拟 Task 1-6 的流程”，输入框会 shake/focus，Journey 不启动
4. 填写 `SBTI` 后点击按钮，页面滚到 Journey 并开始自动演示
5. 自动演示开始后，桌面端和移动端都能用悬浮按钮暂停/恢复
