# Research: In-App SBTI Assessment

## Findings

1. `https://sbti.unun.dev` 当前页面是单 HTML + inline CSS + inline JS 的前端应用，没有看到结果依赖后端接口。
2. 页面中直接包含了：
   - `dimensionMeta`
   - `questions`
   - `specialQuestions`
   - `TYPE_LIBRARY`
   - `TYPE_IMAGES`
   - `NORMAL_TYPES`
   - `DIM_EXPLANATIONS`
3. 人格图资源是前端静态相对路径，例如：
   - `./image/CTRL.png`
   - `./image/SHIT.png`
   - `./image/SOLO.png`
4. 算分逻辑也是前端本地逻辑：
   - 每个维度累加分数
   - `<=3 => L`，`=4 => M`，`>=5 => H`
   - 与 `NORMAL_TYPES.pattern` 做距离比较，挑选最接近的人格
   - 特殊分支包括 `DRUNK` 和 `HHHH`

## Decision

- 题库、人格库、算分逻辑和海报全部本地化。
- 不再依赖外部站跳转。
- UI 层不完整照搬原站，而是把其测试和结果能力嵌到我们现有视觉体系中。

## Open Notes

- 海报资源数量较多，优先放入 `public/sbti/images`，避免 import map 过重。
- 如有个别图片后缀为 `.jpg`，保留原始格式映射，不统一转码。
