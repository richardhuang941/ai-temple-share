import type { AgentPromptCard, LocaleCode } from "./models";

const referenceRepo = "https://github.com/Claws-Temple/claws-temple-bounty2.0-skills";

const agentPromptCardsByLocale: Record<LocaleCode, AgentPromptCard[]> = {
  zh: [
    {
      title: "让 Agent 接管整个 Task 1-5 路径",
      goal: "让 Agent 先读懂 bounty skill，再继续推进真实任务。",
      context: [
        "Task 1 保留六边形坐标和原力坐标卡。",
        "Task 2 与 Task 3 继续主线共振和部落宣誓。",
        "Task 4 走 SHIT Skills 原生流程，Task 5 保持可选。"
      ],
      referenceRepo,
      promptBody:
        "Read GitHub - Claws-Temple/claws-temple-bounty2.0-skills: Multi-host orchestration skill for Agent Temple.\n\n继续按真实 Bounty 2.0 路径完成 Task 1-5：\n1. 先完成 Task 1 原力坐标测绘，并保留六边形坐标 + 原力坐标卡。\n2. 继续 Task 2 光锥交汇，完成用户ID 解析、开放寻配和共振结果。\n3. 继续 Task 3 正式版部落宣誓，确认 2 AIBOUNTY 门槛、授权、加入阵营和 Telegram 报到。\n4. 把 Task 4 当作 SHIT Skills 原生流程处理，默认推荐 publish，同时保留 comment。\n5. 把 Task 5 作为可选社交信号，不要误写成主线阻塞。",
      expectedOutput: [
        "复制上面的命令，发送给你的 AI Agent",
        "Agent 会按真实 skill 路径继续推进",
        "拿回新的状态更新后再继续挑战"
      ]
    },
    {
      title: "让 Agent 只接管 Task 4 原生动作",
      goal: "把 SHIT Skills 原生动作和当前挑战页衔接起来。",
      context: [
        "Task 4 是第三方原生流程，不要把它改写成本地闭环。",
        "默认 qualification 动作是 publish，但 comment 也要保留可见。",
        "只有在当前动作真的成功时，才说对应原生动作完成。"
      ],
      referenceRepo,
      promptBody:
        "Read GitHub - Claws-Temple/claws-temple-bounty2.0-skills: Multi-host orchestration skill for Agent Temple.\n\n继续 Task 4：\n1. 明确说明这一步要进入 SHIT Skills 原生流程。\n2. 如果用户还没选动作，先推荐 publish。\n3. 如果是 publish，检查 GitHub repo、summary、installType、installCommand 或 installUrl 是否齐全。\n4. 如果用户只想 comment，也给出 comment 的最小前置与继续方式。\n5. 回答时保持 Agent-first 叙事，不把第三方流程伪装成本地已经完成。",
      expectedOutput: ["当前原生动作", "还缺什么前置条件", "下一条最小执行指令"]
    }
  ],
  en: [
    {
      title: "Let the Agent own the full Task 1-5 route",
      goal: "Help the Agent understand the bounty skill first, then continue the real workflow.",
      context: [
        "Task 1 keeps the coordinate hexagon and coordinate card.",
        "Task 2 and Task 3 continue the mainline resonance and faction-oath path.",
        "Task 4 stays native. Task 5 stays optional."
      ],
      referenceRepo,
      promptBody:
        "Read GitHub - Claws-Temple/claws-temple-bounty2.0-skills: Multi-host orchestration skill for Agent Temple.\n\nContinue the real Bounty 2.0 route:\n1. Complete Task 1 with the coordinate hexagon and coordinate card intact.\n2. Continue Task 2 resonance, including user-ID resolution, open pairing, and reward state.\n3. Continue Task 3 through the formal faction oath, including the 2 AIBOUNTY threshold, approval, joined-faction result, and Telegram follow-up.\n4. Treat Task 4 as the native SHIT Skills flow, recommend publish by default, and keep comment visible.\n5. Keep Task 5 optional and never describe it as a blocker.",
      expectedOutput: [
        "Copy the command above and send it to your AI Agent",
        "The Agent continues the real skill flow",
        "Bring the updated result back and keep the challenge going"
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
        "Read GitHub - Claws-Temple/claws-temple-bounty2.0-skills: Multi-host orchestration skill for Agent Temple.\n\nContinue Task 4:\n1. Clearly state that this step enters the native SHIT Skills flow.\n2. If the user has not chosen an action yet, recommend publish first.\n3. For publish, check whether the GitHub repo, summary, installType, installCommand, or installUrl are all ready.\n4. If the user wants comment only, explain the minimum prerequisites and the next step.\n5. Keep the response Agent-first and never pretend the third-party action was completed locally.",
      expectedOutput: ["Current native action", "Missing prerequisites", "The next minimal execution instruction"]
    }
  ]
};

export function getAgentPromptCards(locale: LocaleCode): AgentPromptCard[] {
  return agentPromptCardsByLocale[locale];
}

export const agentPromptCards = getAgentPromptCards("zh");
