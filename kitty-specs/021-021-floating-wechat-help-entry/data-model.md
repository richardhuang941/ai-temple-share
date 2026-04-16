# Data Model: Floating Wechat Help Entry

## New UI Copy Surface

```ts
interface CommunityHelpCopy {
  buttonLabel: string;
  dialogTitle: string;
  dialogSummary: string;
  closeLabel: string;
  imageAlt: string;
}
```

## Bundle Extension

`LocalizedContentBundle` 新增：

```ts
communityHelp: CommunityHelpCopy;
```

## Runtime Contract

- 二维码图片固定引用 `/community/wechat-group.jpg`
- 该路径不做 locale 区分
- 弹窗状态只存在于组件本地，不持久化到 storage
- dialog 不写入 URL hash，不改现有页面导航
