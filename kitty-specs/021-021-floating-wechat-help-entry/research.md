# Research: Floating Wechat Help Entry

## Findings

1. 仓库里已经有两套非常接近这轮需求的实现表面：
   - Journey 的 floating button：适合复用 fixed 入口的摆放和视觉密度
   - Share 区的 dialog 遮罩：适合复用弹窗层级、遮罩和轻量 modal 语义

2. 现有移动端 floating autoplay 控件固定在左下角，因此新的帮助入口放右下角可以天然避让，不需要改 Journey 的交互。

3. 现有内容层已经把双语 UI copy 都集中在 `src/content/uiCopy.ts`，因此帮助入口 copy 最稳妥的接法是：
   - 新增 `CommunityHelpCopy`
   - 挂到 `LocalizedContentBundle`
   - 由 `App` 传给新的浮层组件

4. 当前仓库没有 `public/` 静态图片资源依赖，因此把二维码固定放在 `public/community/wechat-group.jpg` 是最直接的部署契约。

## Decision

- 新增一个全局 `FloatingCommunityHelp` 组件，由 `App` 顶层渲染。
- 入口固定右下角，使用常驻 pill，不做自动展开提示气泡。
- 弹窗用本地 `useState` + `useEffect` 处理显隐、`Esc` 关闭和 `body` 滚动锁定。
- 图片引用固定路径 `/community/wechat-group.jpg`，后续只替换图片文件。
- 回归覆盖分成两类：bundle copy 暴露、帮助入口/弹窗交互。
