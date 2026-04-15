import type { AgentPromptCard, LocaleCode } from "./models";

const referenceRepo = "https://github.com/Claws-Temple/ai-temple-bounty2.0-lite-skills";

const agentPromptCardsByLocale: Record<LocaleCode, AgentPromptCard[]> = {
  zh: [
    {
      title: "让 Agent 接管整个 Task 1-5 路径",
      goal: "让 Agent 先读懂这套 Skill，再继续推进真实任务。",
      context: [
        "Task 1 保留六边形坐标和原力坐标卡。",
        "Task 2 与 Task 3 会继续推进共振与阵营归属。",
        "Task 4 继续走 SHIT Skills 原生 handoff，Task 5 保持可选并以草稿交接。"
      ],
      referenceRepo,
      promptBody:
        "Read GitHub - Claws-Temple/ai-temple-bounty2.0-lite-skills: AI Temple Bounty 2.0 skill for Agent Temple.\n\n继续按 Task 1-5 路径完成任务：\n1. 先完成 Task 1 原力坐标测绘，并保留六边形坐标 + 原力坐标卡。\n2. 继续 Task 2 共振：确认 ApiKey/注册状态、读取当前状态、只执行一次 resonance，并返回本步积分和当前积分。\n3. 继续 Task 3 阵营归属：读取 faction 列表，基于当前积分选择阵营，返回加入结果与 leaderboard follow-up。\n4. 把 Task 4 当作 SHIT Skills 原生远端 handoff 处理，默认推荐 publish，同时保留 comment 等辅助动作。\n5. 把 Task 5 作为可选公开信号处理：先起草内容，再把最终发布交回给用户手动完成。",
      expectedOutput: [
        "把上面的命令交给你的 AI Agent",
        "Agent 会按 Skill 路径继续推进",
        "拿回新的状态更新后再继续挑战"
      ]
    },
    {
      title: "让 Agent 只接管 Task 4 原生动作",
      goal: "把 SHIT Skills 原生动作和当前挑战页衔接起来。",
      context: [
        "Task 4 是第三方原生流程，不要把它改写成本地闭环。",
        "默认 qualification 动作是 publish，但 comment 也要保持可见。",
        "只有在原生动作真的成功时，才说对应动作完成。"
      ],
      referenceRepo,
      promptBody:
        "Read GitHub - Claws-Temple/ai-temple-bounty2.0-lite-skills: AI Temple Bounty 2.0 skill for Agent Temple.\n\n继续 Task 4：\n1. 明确说明这一步要进入 SHIT Skills 原生远端流程。\n2. 如果用户还没选动作，先推荐 publish。\n3. 如果是 publish，检查 GitHub repo、summary、installType、installCommand 或 installUrl 是否齐全。\n4. 如果用户只想 comment，也给出 comment 的最小前置与继续方式。\n5. 回答时保持 Agent-first 叙事，不把第三方流程伪装成本地已经完成。",
      expectedOutput: ["当前原生动作", "还缺什么前置条件", "下一条最小执行指令"]
    }
  ],
  en: [
    {
      title: "Let the Agent own the Task 1-5 route",
      goal: "Help the Agent understand this skill first, then continue the real workflow.",
      context: [
        "Task 1 keeps the coordinate hexagon and coordinate card.",
        "Task 2 and Task 3 continue through resonance and faction belonging.",
        "Task 4 stays a native SHIT Skills handoff, and Task 5 stays optional with a manual post handoff."
      ],
      referenceRepo,
      promptBody:
        "Read GitHub - Claws-Temple/ai-temple-bounty2.0-lite-skills: AI Temple Bounty 2.0 skill for Agent Temple.\n\nContinue the Task 1-5 route:\n1. Complete Task 1 with the coordinate hexagon and coordinate card intact.\n2. Continue Task 2 through resonance: confirm ApiKey or registration state, read the current status, run exactly one resonance call, and report the earned plus current points.\n3. Continue Task 3 through faction belonging: read the faction list, choose with the current points, and report the joined result plus leaderboard follow-up.\n4. Treat Task 4 as the native remote SHIT Skills handoff, recommend publish by default, and keep comment or other auxiliary actions visible.\n5. Treat Task 5 as an optional public signal: draft it first, then hand the final post back to the user.",
      expectedOutput: [
        "Copy the command above and send it to your AI Agent",
        "The Agent continues through the Skill route",
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
        "Read GitHub - Claws-Temple/ai-temple-bounty2.0-lite-skills: AI Temple Bounty 2.0 skill for Agent Temple.\n\nContinue Task 4:\n1. Clearly state that this step enters the SHIT Skills native remote flow.\n2. If the user has not chosen an action yet, recommend publish first.\n3. For publish, check whether the GitHub repo, summary, installType, installCommand, or installUrl are all ready.\n4. If the user wants comment only, explain the minimum prerequisites and the next step.\n5. Keep the response Agent-first and never pretend the third-party action was completed locally.",
      expectedOutput: ["Current native action", "Missing prerequisites", "The next minimal execution instruction"]
    }
  ]
};

export function getAgentPromptCards(locale: LocaleCode): AgentPromptCard[] {
  return agentPromptCardsByLocale[locale];
}

export const agentPromptCards = getAgentPromptCards("zh");
