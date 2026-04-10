# Feature Specification: Desktop Share QR

## Background

当前分享区已经支持文字战书和社媒入口，但桌面端还缺一个像参考页那样的二维码入口。用户希望在 PC 上直接看到二维码，手机扫码后就能继续把当前页面分享给朋友。同时，挑战链接不应继续写死为某一个域名，而应根据当前访问页面动态生成。

## Goal

- 在分享区为桌面端增加二维码块。
- 二维码与挑战链接统一使用当前访问页面的公开链接。
- 保持移动端现有分享入口与弹层行为不变。

## Non-goal

- 不接后端生成动态短链。
- 不重做分享区整体结构。
- 不改移动端社媒 handoff 流程。

## Functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| FR-001 | 桌面端分享区必须新增二维码分享块。 | confirmed | 参考 Clawvard 的扫码分享区。 |
| FR-002 | 二维码编码内容必须使用当前访问页面的公开链接。 | confirmed | 不再写死单个域名。 |
| FR-003 | 文本战书中的挑战链接也必须切到当前访问页面的公开链接。 | confirmed | 与二维码保持同一来源。 |
| FR-004 | 移动端继续优先保留现有社媒 handoff，不强制显示二维码。 | confirmed | 只做桌面增强。 |

## Non-functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| NFR-001 | 不额外依赖远程二维码服务。 | confirmed | 优先本地生成。 |
| NFR-002 | 不影响现有 `npm run test` 与 `npm run build`。 | confirmed | 分享区增强需回归。 |
| NFR-003 | 继续按 Kitty mission 流程收口。 | confirmed | 新建 `017` mission。 |

## Constraints

| ID | Constraint | Status | Notes |
| --- | --- | --- | --- |
| C-001 | 继续在 `codex/oss-sanitize-pages-rename` 收口。 | confirmed | 不切 landing branch。 |
| C-002 | 多域名场景下不得再写死 `challengeLink` 常量。 | confirmed | 统一走运行时解析。 |
