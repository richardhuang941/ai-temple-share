# Quickstart: 010-journey-sbti-scrollback-focus

```bash
npm run test
npx tsc -b --clean && npm run build
```

手工检查：

1. 不填 `SBTI`，直接滑到 Journey
2. 点击“填好 SBTI 后开始模拟”
3. 页面滚回 Hero，输入框获得焦点并出现 shake/error
4. 填好 `SBTI` 后再点 Journey 按钮，可以正常启动模拟
