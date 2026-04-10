# Implementation Plan: Desktop Share QR

## Goal

- 为桌面端分享区补二维码入口。
- 分享区链接统一切到当前访问链接。

## Non-goal

- 不改移动端分享主流程。
- 不引入后端短链服务。

## Approach

### 1. Runtime link resolution

- 把分享链接从写死常量改成运行时解析
- 取当前 `origin + pathname + search`，忽略临时 hash

### 2. Desktop QR enhancement

- 使用本地二维码组件渲染二维码
- 只在 desktop share surface 渲染二维码块

### 3. Regression

- 增加桌面端二维码与动态链接断言
- 保持移动端社媒入口测试通过

## Risks

- 如果把 hash 也带进链接，可能把临时锚点分享出去。
- 分享区内容变多后需要注意桌面端留白平衡。

## Verification

- `npm run test`
- `npm run build`
