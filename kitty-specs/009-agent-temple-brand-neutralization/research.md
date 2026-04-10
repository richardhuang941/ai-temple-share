# Research Notes: 009-agent-temple-brand-neutralization

- 当前 `Claws Temple` 品牌词分散在页面入口、Hero、Share、默认 Agent profile、隐藏 prompt 文案和部分默认模板里。
- 其中一部分属于真实引用，例如 `https://github.com/Claws-Temple/...` 和 `claws-temple-home.vercel.app`，这些不能直接替换。
- 单纯替换展示词即可满足这轮需求，不需要修改数据结构或交互逻辑。
