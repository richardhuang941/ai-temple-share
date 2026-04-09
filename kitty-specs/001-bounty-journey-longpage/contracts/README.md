# Contracts: Claws Temple Bounty 长单页

本需求不规划运行时 HTTP API，也不引入后端服务。

因此 `contracts/` 目录中的“契约”定义为前端本地内容契约，用来约束：

- 长单页内容配置的数据结构
- AI Agent 提示卡的数据结构

这些契约会在实现阶段映射到 `src/content/` 的 TypeScript 对象。
