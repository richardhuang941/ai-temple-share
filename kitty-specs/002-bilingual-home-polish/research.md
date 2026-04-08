# Research: Claws Temple 首页双语与转化收口

## Decision 1: Keep the existing React + Vite app and layer localization on top

### Decision

在现有 `React + Vite + TypeScript` 单页工程上新增本地 `zh/en` locale 层，不重建页面框架。

### Rationale

- 本轮是 polish，不是重做
- 现有 section、content、timeline 结构已经足够承接双语和 CTA 重排
- 本地 locale 更适合静态页，无需引入远端翻译平台

### Alternatives Considered

- `直接把英文写进组件判断里`: 起步快，但后续维护成本高
- `接入 i18next 或重型 i18n 框架`: 功能更强，但对当前规模过重

## Decision 2: Reposition the hero as a challenge card, not a narrative billboard

### Decision

首页改为轻量 challenge card，只承载四个核心状态和三条 CTA，把完整叙事下沉到后续区块。

### Rationale

- 用户明确指出首屏信息过密
- 参考截图的核心是“成绩 + 按钮”，不是长摘要
- 首屏应该承担转化，不该承担全量解释

### Alternatives Considered

- `保留原大段叙事，只调小字号`: 无法真正降低认知负担

## Decision 3: Use a two-mode share surface instead of a single summary card

### Decision

分享区采用 `分享图片` 和 `分享文字` 两种模式。

### Rationale

- 用户给出的第二张截图已经明确展示了这种切换方式
- 截图传播和复制文字的使用场景不同
- 在不接入真实分享 SDK 的前提下，这种切换已经足够有用

### Alternatives Considered

- `只保留一张结果卡`: 传播形式单一
- `做真实图片导出`: 可以做，但会引入额外实现复杂度，不是当前最小可交付

## Decision 4: Journey starts only on intent

### Decision

Journey 从默认 autoplay 改为“用户显式点击后开始”。

### Rationale

- 用户明确指出当前一进页面就自动执行，节奏过快
- 演示逻辑属于解释区，不应抢占首屏注意力
- 由用户触发更符合“我现在要看流程”的心理模型

### Alternatives Considered

- `只放慢节奏但保留自动开始`: 仍然会在用户尚未准备好时播放

## Decision 5: Use Ant Design typography as the primary baseline

### Decision

采用 `Ant Design` 的 typography 分层思路作为本地字号系统基线，并用 `MUI` 的 responsive type scale 作为响应式补充参考。

### Rationale

- 截至 `2026-04-08`，`Ant Design` GitHub 仓库约 `97.8k` stars，`MUI` 约 `98.1k` stars，二者都属于社区最广泛使用的 React UI 体系之一
- `Ant Design` 的设计规范更强调减少字体层级、优先正文可读性，适合当前 landing page 减密度目标
- `shadcn/ui` 虽然约 `112k` stars，但更偏组件集合与视觉模式，不是最适合直接拿来当 typography 规范源头

### Alternatives Considered

- `MUI` 作为唯一基线: 类型层级丰富但对当前页面来说略重
- `shadcn/ui` 作为唯一基线: 视觉参考很强，但不是 typography 规则最明确的方案

