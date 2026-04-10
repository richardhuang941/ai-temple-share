import type { LocaleCode, ShareSummary } from "./models";

const shareSummaryByLocale: Record<LocaleCode, ShareSummary> = {
  zh: {
    title: "分享你的成绩",
    titleTemplate: "{headline} 已共振，并且加入了{faction}。",
    scoreSummary: "Agent 打分已经进入挑战区间。",
    scoreSummaryTemplate: "Agent 打分 {score} / 100 · {label}",
    resonanceStatus: "已共振",
    factionStatus: "已加入阵营",
    factionStatusTemplate: "已加入{faction}",
    supportingFacts: [
      "挑战分数与等级已经锁定",
      "Agent 共振结果已同步",
      "阵营结果已写进战书"
    ],
    qualificationNote:
      "这张战书展示的是主线成绩，后续原生动作仍然交给 Agent 继续完成。"
  },
  en: {
    title: "Share your result",
    titleTemplate: "{headline} has resonated and joined {faction}.",
    scoreSummary: "The Agent score is already in challenge range.",
    scoreSummaryTemplate: "Agent score {score} / 100 · {label}",
    resonanceStatus: "Resonance completed",
    factionStatus: "Faction joined",
    factionStatusTemplate: "Joined {faction}",
    supportingFacts: [
      "The score and grade are already locked",
      "The resonance result is already synced",
      "The faction result is already on the card"
    ],
    qualificationNote:
      "This card shows the mainline result while the native follow-up steps stay with the Agent."
  }
};

export function getShareSummary(locale: LocaleCode): ShareSummary {
  return shareSummaryByLocale[locale];
}

export const shareSummary = getShareSummary("zh");
