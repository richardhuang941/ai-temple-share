# Work Packages: Claws Temple 首页双语与转化收口

**Mission**: `002-bilingual-home-polish`  
**Feature Dir**: `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/002-bilingual-home-polish`  
**Planning Base Branch**: `main`  
**Merge Target Branch**: `main`

## Delivery Strategy

先建立双语内容层和新的设计 token，再分别重构 `Hero + Agent Prompt`、`Share`、`Journey` 三块交互区，最后做整页集成、回归测试和本地预览验证。

## Work Package Index

| WP | Title | Goal | Priority | Dependencies | Prompt | Est. Prompt Size |
|---|---|---|---|---|---|---|
| WP01 | Localization and Design Foundation | 建立双语字典、locale 检测、coral token 与 typography 基线 | P0 | None | `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/002-bilingual-home-polish/tasks/WP01-localization-and-design-foundation.md` | ~260 lines |
| WP02 | Hero and Agent Prompt Reflow | 重构首屏 challenge card 和 Agent Prompt 的首要动线 | P0 | WP01 | `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/002-bilingual-home-polish/tasks/WP02-hero-and-agent-prompt-reflow.md` | ~280 lines |
| WP03 | Share Challenge Modes | 实现战书分享区的图片/文字双模式和跳转动线 | P1 | WP01 | `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/002-bilingual-home-polish/tasks/WP03-share-challenge-modes.md` | ~280 lines |
| WP04 | Journey Trigger and Playback | 将 Journey 改为用户触发启动，并优化节奏与控件 | P1 | WP01 | `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/002-bilingual-home-polish/tasks/WP04-journey-trigger-and-playback.md` | ~280 lines |
| WP05 | Integration and Validation | 串联新信息架构，补齐测试并验证桌面/移动端效果 | P0 | WP02, WP03, WP04 | `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/002-bilingual-home-polish/tasks/WP05-integration-and-validation.md` | ~260 lines |

## Subtask Index

| ID | Description | WP | Parallel |
|---|---|---|---|
| T001 | 扩展内容模型以支持 locale bundle、share mode 和 Journey 启动态 | WP01 |  | [D] |
| T002 | 实现系统语言检测、手动覆盖与本地记忆逻辑 | WP01 |  | [D] |
| T003 | 新建中英文内容字典并迁移现有关键文案 | WP01 |  | [D] |
| T004 | 重构全局 token 为 coral 主题并建立 typography scale | WP01 |  | [D] |
| T005 | 为 locale 与内容映射补齐单元测试 | WP01 |  | [D] |
| T006 | 重构首屏 Hero 为 challenge card 信息架构 | WP02 |  | [D] |
| T007 | 增加语言切换控件和首屏 CTA 行为 | WP02 |  | [D] |
| T008 | 调整 App 区块顺序为 Hero -> Agent Prompt -> Share -> Journey | WP02 |  | [D] |
| T009 | 精简 Agent Prompt 区文案与首屏跳转承接 | WP02 |  | [D] |
| T010 | 构建 Share 区的 `分享图片 / 分享文字` 模式切换 | WP03 |  | [D] |
| T011 | 设计接近参考截图的战书分享卡和文字复制区 | WP03 |  | [D] |
| T012 | 保持分享文案的 Agent-first 主语和 challenge link 展示 | WP03 |  | [D] |
| T013 | 将 Journey 改为默认静止、点击后启动 | WP04 |  | [D] |
| T014 | 放慢 Journey 自动播放节奏并补充开始/暂停/重播控件语义 | WP04 |  | [D] |
| T015 | 让 Journey 在 reduced-motion 下优雅降级 | WP04 |  | [D] |
| T016 | 串联三条 CTA 动线并补整页锚点逻辑 | WP05 |  | [D] |
| T017 | 新增集成测试覆盖双语、CTA、分享模式和 Journey 启动逻辑 | WP05 |  | [D] |
| T018 | 运行构建、测试和本地预览回归 | WP05 |  | [D] |

## Work Packages

## WP01 - Localization and Design Foundation

- Goal: 为后续所有 UI 改造建立本地双语基础、主题 token 和 typography 基线。
- Priority: P0
- Independent Test: 系统语言可被解析，locale 可记忆，内容映射和 token 文件已更新。
- Prompt: `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/002-bilingual-home-polish/tasks/WP01-localization-and-design-foundation.md`
- Estimated Prompt Size: ~260 lines
- Dependencies: None

Included subtasks:
- [x] T001 扩展内容模型以支持 locale bundle、share mode 和 Journey 启动态 (WP01)
- [x] T002 实现系统语言检测、手动覆盖与本地记忆逻辑 (WP01)
- [x] T003 新建中英文内容字典并迁移现有关键文案 (WP01)
- [x] T004 重构全局 token 为 coral 主题并建立 typography scale (WP01)
- [x] T005 为 locale 与内容映射补齐单元测试 (WP01)

Implementation sketch:
1. 先整理内容模型和 locale hook。
2. 再迁移现有文案到中英文 bundle。
3. 收口全局 token 和 typography。
4. 最后补足 locale/content 相关测试。

Parallel opportunities:
- 无。该 WP 是后续所有 UI 工作的前置。

Dependencies:
- None

Risks:
- 如果 locale 和 token 基线不稳，后续所有区块都会出现返工。

## WP02 - Hero and Agent Prompt Reflow

- Goal: 把首页改成更轻量的 challenge card，并让 Agent Prompt 成为首要行动目标。
- Priority: P0
- Independent Test: 用户进入页面后不滚动也能看懂四个状态，并可通过 `接受挑战` 跳到 Agent Prompt。
- Prompt: `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/002-bilingual-home-polish/tasks/WP02-hero-and-agent-prompt-reflow.md`
- Estimated Prompt Size: ~280 lines
- Dependencies: Depends on WP01

Included subtasks:
- [x] T006 重构首屏 Hero 为 challenge card 信息架构 (WP02)
- [x] T007 增加语言切换控件和首屏 CTA 行为 (WP02)
- [x] T008 调整 App 区块顺序为 Hero -> Agent Prompt -> Share -> Journey (WP02)
- [x] T009 精简 Agent Prompt 区文案与首屏跳转承接 (WP02)

Implementation sketch:
1. 先确定新 Hero 的结构和状态卡布局。
2. 再加入语言切换与 CTA。
3. 调整 App 顺序和 Agent Prompt 区标题、说明文案。

Parallel opportunities:
- 无显著并行机会。Hero 与 App 顺序改动耦合较强。

Dependencies:
- WP01

Risks:
- 如果首屏还残留过多叙事文字，就会偏离“成绩卡 + 挑战卡”目标。

## WP03 - Share Challenge Modes

- Goal: 让分享区真正承担“战书转发”职责，而不是普通摘要卡。
- Priority: P1
- Independent Test: 用户可在分享区切换 `分享图片` 和 `分享文字`，并看到明显不同的输出形态。
- Prompt: `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/002-bilingual-home-polish/tasks/WP03-share-challenge-modes.md`
- Estimated Prompt Size: ~280 lines
- Dependencies: Depends on WP01

Included subtasks:
- [x] T010 构建 Share 区的 `分享图片 / 分享文字` 模式切换 (WP03)
- [x] T011 设计接近参考截图的战书分享卡和文字复制区 (WP03)
- [x] T012 保持分享文案的 Agent-first 主语和 challenge link 展示 (WP03)

Implementation sketch:
1. 先建立 share mode 状态。
2. 再实现 image/text 两种容器。
3. 最后校正文案与复制行为。

Parallel opportunities:
- 无显著并行机会。模式切换与布局结构紧密相关。

Dependencies:
- WP01

Risks:
- 如果图片模式和文字模式差异不明显，用户会看不出切换价值。

## WP04 - Journey Trigger and Playback

- Goal: 保留 Task 1-5 模拟，但把启动权交给用户，并优化节奏与可读性。
- Priority: P1
- Independent Test: Journey 首次加载不自动播放；点击后才启动，且每一步停留时间明显变长。
- Prompt: `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/002-bilingual-home-polish/tasks/WP04-journey-trigger-and-playback.md`
- Estimated Prompt Size: ~280 lines
- Dependencies: Depends on WP01

Included subtasks:
- [x] T013 将 Journey 改为默认静止、点击后启动 (WP04)
- [x] T014 放慢 Journey 自动播放节奏并补充开始/暂停/重播控件语义 (WP04)
- [x] T015 让 Journey 在 reduced-motion 下优雅降级 (WP04)

Implementation sketch:
1. 先扩展 timeline state 支持 `hasStarted`。
2. 再把按钮和播放逻辑改成显式触发。
3. 最后调整节奏和动画降级。

Parallel opportunities:
- 无显著并行机会。timeline hook 与 section UI 联动很强。

Dependencies:
- WP01

Risks:
- 如果滚动到 Journey 与启动逻辑不同步，体验会显得“按钮失效”。

## WP05 - Integration and Validation

- Goal: 收口所有区块，保证三条 CTA、双语、分享模式和 Journey 触发在整页中一起成立。
- Priority: P0
- Independent Test: `npm run test`、`npm run build` 通过，本地预览在桌面和移动端都可读。
- Prompt: `/Users/huangzongzhe/workspace/vibeCoding/claws-temple/claws-temple-home/kitty-specs/002-bilingual-home-polish/tasks/WP05-integration-and-validation.md`
- Estimated Prompt Size: ~260 lines
- Dependencies: Depends on WP02, Depends on WP03, Depends on WP04

Included subtasks:
- [ ] T016 串联三条 CTA 动线并补整页锚点逻辑 (WP05)
- [ ] T017 新增集成测试覆盖双语、CTA、分享模式和 Journey 启动逻辑 (WP05)
- [ ] T018 运行构建、测试和本地预览回归 (WP05)

Implementation sketch:
1. 用最终 App 结构串联各区块。
2. 补整页级测试。
3. 跑构建和本地预览，修复最后的集成问题。

Parallel opportunities:
- 无。该 WP 是统一收口工作。

Dependencies:
- WP02
- WP03
- WP04

Risks:
- 如果等到这一阶段才发现 CTA 锚点和区块顺序冲突，会拖慢验收。
