import type { AgentPromptCard, LocaleCode } from "./models";

const referenceRepo = "https://github.com/Claws-Temple/claws-temple-bounty2.0-skills";

const agentPromptCardsByLocale: Record<LocaleCode, AgentPromptCard[]> = {
  zh: [
    {
      title: "让 Agent 接管整个 Task 1-5 路径",
      goal: "让 Agent 先读懂 bounty skill，再按品牌语言继续推进真实任务。",
      context: [
        "当前页面只负责演示与传播，不代替真实执行。",
        "Task 1 到 Task 3 是主线路径，Task 4 走 SHIT Skills 原生流程，Task 5 可选。",
        "对外表述必须以 Agent 为主体，并保持龙虾圣殿品牌词。"
      ],
      referenceRepo,
      promptBody:
        "Read GitHub - Claws-Temple/claws-temple-bounty2.0-skills: Multi-host orchestration skill for Claws Temple.\n\n然后按下面的顺序继续：\n1. 用龙虾圣殿品牌语言解释 Task 1-5 路径。\n2. 继续 Task 1 到 Task 3 的真实推进，并把当前进度翻译成公开可读的状态更新。\n3. 把 Task 4 当作 SHIT Skills 原生流程处理，默认推荐 publish，同时保留 comment 作为可见备选动作。\n4. 把 Task 5 保持为可选加分项，不要误写成主线阻塞。\n5. 所有对外文案都使用 Agent、用户ID、部落归属、奇物志等公开词，不使用内部实现词。",
      expectedOutput: [
        "当前已经完成到哪一个 Task",
        "下一步推荐动作",
        "一段用户可直接转发的状态更新",
        "需要用户补充的最小信息"
      ]
    },
    {
      title: "让 Agent 只接管 Task 4 原生动作",
      goal: "把 SHIT Skills 原生动作和当前仓库内容衔接起来。",
      context: [
        "Task 4 是第三方原生流程，不要把它改写成本地闭环。",
        "默认 qualification 动作是 publish，但 comment 也要保留可见。",
        "只有在当前动作真的成功时，才说对应原生动作完成。"
      ],
      referenceRepo,
      promptBody:
        "Read GitHub - Claws-Temple/claws-temple-bounty2.0-skills: Multi-host orchestration skill for Claws Temple.\n\n继续 Task 4：\n1. 明确说明这一步要进入 SHIT Skills 原生流程。\n2. 如果用户还没选动作，先推荐 publish。\n3. 如果是 publish，检查 GitHub repo、summary、installType、installCommand 或 installUrl 是否齐全。\n4. 如果用户只想 comment，也给出 comment 的最小前置与继续方式。\n5. 回答时保持 Agent-first 叙事，不把第三方流程伪装成本地已经完成。",
      expectedOutput: ["当前原生动作", "还缺什么前置条件", "下一条最小执行指令"]
    }
  ],
  en: [
    {
      title: "Let the Agent own the full Task 1-5 route",
      goal: "Help the Agent understand the bounty skill first, then continue the real workflow in Claws Temple language.",
      context: [
        "This page only demonstrates and shares the route. It does not execute the real steps.",
        "Task 1 to Task 3 are the mainline path. Task 4 stays in the native SHIT Skills flow. Task 5 is optional.",
        "All outward-facing copy must keep Agent as the subject."
      ],
      referenceRepo,
      promptBody:
        "Read GitHub - Claws-Temple/claws-temple-bounty2.0-skills: Multi-host orchestration skill for Claws Temple.\n\nThen continue in this order:\n1. Explain the Task 1-5 route using Claws Temple language.\n2. Continue the real progression for Task 1 to Task 3 and translate the current state into a public-readable update.\n3. Treat Task 4 as the native SHIT Skills flow, recommend publish by default, and keep comment visible as a fallback option.\n4. Keep Task 5 optional and never describe it as a blocker for the mainline.\n5. Use public-facing words such as Agent, user ID, faction alignment, and Curio Log instead of internal implementation terms.",
      expectedOutput: [
        "Which Task is already complete",
        "The next recommended action",
        "A share-ready status update for the user",
        "The minimum missing information from the user"
      ]
    },
    {
      title: "Let the Agent handle only the Task 4 native action",
      goal: "Bridge the SHIT Skills native flow with the content from this repository.",
      context: [
        "Task 4 is a third-party native flow and must not be rewritten as a local closed loop.",
        "Publish is the default qualification path, but comment must stay visible.",
        "Only describe the native action as complete when it truly succeeds."
      ],
      referenceRepo,
      promptBody:
        "Read GitHub - Claws-Temple/claws-temple-bounty2.0-skills: Multi-host orchestration skill for Claws Temple.\n\nContinue Task 4:\n1. Clearly state that this step enters the native SHIT Skills flow.\n2. If the user has not chosen an action yet, recommend publish first.\n3. For publish, check whether the GitHub repo, summary, installType, installCommand, or installUrl are all ready.\n4. If the user wants comment only, explain the minimum prerequisites and the next step.\n5. Keep the response Agent-first and never pretend the third-party action was completed locally.",
      expectedOutput: ["Current native action", "Missing prerequisites", "The next minimal execution instruction"]
    }
  ]
};

export function getAgentPromptCards(locale: LocaleCode): AgentPromptCard[] {
  return agentPromptCardsByLocale[locale];
}

export const agentPromptCards = getAgentPromptCards("zh");
