# Research: Mobile Share and Task Flow Polish

## Inputs Reviewed

- [Share Score _ Clawvard.html](/Users/huangzongzhe/Downloads/Share%20Score%20_%20Clawvard.html)
- [Share Score _ Clawvard_files](/Users/huangzongzhe/Downloads/Share%20Score%20_%20Clawvard_files)
- 当前实现代码：
  - [SocialShareActions.tsx](/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/src/components/share/SocialShareActions.tsx)
  - [shareActions.ts](/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/src/lib/shareActions.ts)
  - [TaskMilestoneCard.tsx](/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/src/components/journey/TaskMilestoneCard.tsx)
  - [StagePulse.tsx](/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/src/components/journey/StagePulse.tsx)

## Findings

### 1. Clawvard 移动端分享不是纯 web share

本地下载源码里可以确认它们对移动端社媒采用了 URI scheme：

- `weixin://`
- `xhsdiscover://`
- `snssdk1128://`

同时存在“先复制文案，再进入倒计时，再尝试唤起 App”的交互节奏。  
这说明我们不需要在静态页里伪装成“完成平台内分享”，而是应该把目标明确成 handoff。

### 2. PC 与移动端分享入口应该分流

用户明确指出 PC 端不需要显示 `微信 / 小红书 / 抖音`。  
因此分享区需要按 surface 分流：

- desktop: 仅 `X`
- mobile: `X + 微信 + 小红书 + 抖音`

### 3. 分享图片不是当前必要能力

用户已经明确不要分享图片。  
现阶段保留文字战书即可，也更符合当前没有图片导出链路的现实。

### 4. Journey 的“重播”与“回看”要区分

用户的反馈说明当前交互把两个意图混在了一起：

- replay: 把 live focus 切到某个 task 并重新推进
- inspect: 展开已完成 task 看细节

后续需要把这两个意图拆开，completed task 默认走 inspect。

## Decisions

1. 采用 client-side copy + countdown + URI scheme handoff。
2. 不在页面上展示 fallback 说明文本。
3. 分享区切换成 text-only。
4. completed task 改成本地展开/收起。
5. active stage 增加 spinner，并支持 reduced-motion 降级。
