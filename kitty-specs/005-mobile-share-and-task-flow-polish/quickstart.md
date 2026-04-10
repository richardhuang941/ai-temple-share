# Quickstart: 005-mobile-share-and-task-flow-polish

## Local Verification

```bash
npm run test
npx tsc -b --clean && npm run build
```

## Manual Checks

1. Desktop:
   - 分享区只显示 `X`
   - 无 fallback 说明文案
   - 分享卡只保留文字战书
2. Mobile:
   - 分享区显示 `X / 微信 / 小红书 / 抖音`
   - 点击移动端平台后出现复制 + 倒计时弹窗
3. Journey:
   - active stage 可见 loading
   - completed task 可展开/收起
   - upcoming task 仍可切到当前焦点

## Current Implementation Baseline

当前仓库已经存在与本 mission 对应的未提交代码改动。  
`005` 的 planning artifacts 目的是把这轮改动正式挂到 Kitty 流程中，供后续继续实现、review 和 accept 使用。
