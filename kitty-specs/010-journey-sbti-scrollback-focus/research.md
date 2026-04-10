# Research Notes: 010-journey-sbti-scrollback-focus

- 当前 Journey 的主按钮在空 `SBTI` 时直接 `disabled`，所以用户滑到下方后无法通过点击得到任何引导。
- Hero 已经有一套 `SBTI` shake + focus + error 反馈逻辑，因此最稳妥的做法是让 Journey 复用这条路径，而不是重新发明一套局部 gate。
- `App` 已经持有 `sbtiError` 与 `sbtiShakeSignal`，天然适合作为 Hero/Journey 的桥接层。
