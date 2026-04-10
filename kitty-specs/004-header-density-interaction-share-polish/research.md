# Research Notes: 004 Header Density Interaction Share Polish

## Inputs

- 本地下载参考页：
  - ``Share Score _ Clawvard.html`（本地下载参考页）`
  - ``Share Score _ Clawvard_files/`（本地下载资源目录）`
- 当前实现：
  - `../../src/components/sections/HeroSection.tsx`
  - `../../src/components/sections/AgentPromptSection.tsx`
  - `../../src/components/sections/ShareSection.tsx`
  - `../../src/components/sections/JourneySection.tsx`

## Findings

1. 参考页的 header 非常轻，只承接品牌和语言切换；主视觉的注意力集中在 score card。
2. 参考页的 score card 与 terminal prompt card 在移动端和中小桌面上距离很近，因此更像一屏内容。
3. 参考页 CTA 已经包含明显的 hover / active scale 反馈。
4. 参考页分享区在移动端有 `X / 微信 / 小红书 / 抖音` 的社媒入口。
5. 我们当前 PC Journey 使用多列 grid，流程感弱，不适合作为“自动推进”的主阅读路径。

## Decisions

- 继续保留现有 React 组件结构，但抽出专门的 header 组件。
- 动效采用 CSS keyframes + DOM class，不新增外部动画依赖。
- 分享平台采用 web-safe fallback，不承诺真实平台 SDK 能力。
- Journey 桌面端改为单列。
