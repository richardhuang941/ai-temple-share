# Research: Desktop Share QR

## Findings

1. 参考页确实在分享区提供了二维码入口，桌面端用户可以直接用手机扫码继续传播。
2. 当前项目分享区仍把挑战链接写死在 `ShareSection.tsx`，这不适合多域名场景。
3. 当前代码已经有 `isMobileShareSurface()`，可以直接用来决定二维码是否只在桌面端显示。

## Decision

- 采用本地二维码渲染库，不依赖第三方二维码服务。
- 二维码和分享文本统一使用当前运行时公开链接。
