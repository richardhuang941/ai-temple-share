# Feature Specification: Floating Wechat Help Entry

## Background

当前首页已经完成 `Task 1-5` 的主线和 Agent handoff，但还缺一个明确的“遇到困难时去哪里”的即时入口。用户如果卡在挑战流程里，或者想和更多伙伴协作，目前只能靠外部沟通，页面本身没有承接帮助需求的入口。

这轮需要在首页加一个常驻的悬浮帮助按钮，让用户可以直接打开微信群二维码弹窗。二维码图片由固定静态路径承接，后续只需要替换图片文件并触发部署，不需要改代码。

## Goal

- 在首页新增一个右下角常驻的悬浮帮助入口。
- 点击入口后打开微信群二维码 dialog。
- 弹窗显示二维码图片、简短说明和关闭按钮。
- 图片固定走 `/community/wechat-group.jpg`，后续替换图片即可更新线上内容。
- 产出完整 `021` Kitty mission 资产，和代码改动一起收口。

## Non-goal

- 不接后端、不加 CMS、不解析二维码有效期。
- 不扩展成通用客服/反馈系统。
- 不增加“复制群号”“下载图片”“跳转微信群链接”等额外动作。
- 不改首页现有 `Hero / AgentPrompt / Share / Journey` 主流程结构。

## Functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| FR-001 | 首页必须出现一个常驻的悬浮帮助入口，文案表达“遇到困难 / 加入微信群”。 | confirmed | 入口固定在右下角。 |
| FR-002 | 点击帮助入口后必须打开一个 dialog，并显示微信群二维码图片。 | confirmed | 图片路径固定为 `/community/wechat-group.jpg`。 |
| FR-003 | dialog 必须包含一段简短说明和一个显式关闭按钮。 | confirmed | 不额外增加其他动作按钮。 |
| FR-004 | dialog 必须支持点击遮罩关闭和 `Esc` 关闭。 | confirmed | 关闭路径要和显式按钮一起覆盖。 |
| FR-005 | 帮助入口必须和现有 Journey autoplay 控件共存，不互相遮挡。 | confirmed | 新入口右下角，Journey mobile floating 保持左下角。 |
| FR-006 | 中英文 bundle 都必须暴露帮助入口 copy。 | confirmed | 文案进 `LocalizedContentBundle`。 |

## Non-functional Requirements

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| NFR-001 | 保持现有页面视觉语言，复用 floating pill 与轻量 dialog 风格。 | confirmed | 不额外引入新的 UI 库。 |
| NFR-002 | 后续替换二维码图片时不需要修改代码。 | confirmed | 静态资源路径固定。 |
| NFR-003 | `npm test` 与 `npm run build` 必须通过。 | confirmed | 包含新的 integration + unit coverage。 |
| NFR-004 | 继续按 Kitty mission 流程收口 `021` 资产。 | confirmed | 包括 spec/research/plan/tasks/acceptance/status。 |

## Constraints

| ID | Constraint | Status | Notes |
| --- | --- | --- | --- |
| C-001 | target branch 固定为 `codex/lite-skill-copy-cleanup`。 | confirmed | 不切回旧分支。 |
| C-002 | 二维码图片首版素材来自 `/Users/huangzongzhe/Downloads/IMG_3786.JPG`。 | confirmed | 仓库内落点是 `public/community/wechat-group.jpg`。 |
| C-003 | 入口不做自动弹出、不做首次访问提醒。 | confirmed | 入口本身承担提示作用。 |
