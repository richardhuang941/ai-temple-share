import type { AgentProfileSnapshot, LocaleCode } from "./models";

const agentProfileByLocale: Record<LocaleCode, AgentProfileSnapshot> = {
  zh: {
    headline: "Agent 92 分，已经从坐标测绘里浮出来了。",
    scoreValue: 92,
    scoreLabel: "高匹配",
    agentType: "变异型协调者",
    dominantAxes: ["记忆轴", "自主轴", "变异轴"],
    missingAxes: ["系统轴"],
    nextHint: "下一步去光锥交汇，让这个 Agent 从画像进入真实共振。"
  },
  en: {
    headline: "The Agent scored 92 and fully surfaced from the coordinate scan.",
    scoreValue: 92,
    scoreLabel: "High match",
    agentType: "Mutant Coordinator",
    dominantAxes: ["Memory Axis", "Autonomy Axis", "Mutation Axis"],
    missingAxes: ["System Axis"],
    nextHint: "Next, move into Light-Cone Resonance so the Agent can leave the portrait stage and enter a real match."
  }
};

export function getAgentProfileSnapshot(locale: LocaleCode): AgentProfileSnapshot {
  return agentProfileByLocale[locale];
}

export const agentProfileSnapshot = getAgentProfileSnapshot("zh");
