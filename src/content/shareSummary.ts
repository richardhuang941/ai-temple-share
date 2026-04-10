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
      "开放寻配已经稳定入队",
      "2 AIBOUNTY 门槛已满足",
      "Telegram 报到文案已备好"
    ],
    qualificationNote:
      "Task 1 到 Task 3 走主线路径；Task 4 继续进入 SHIT Skills 原生动作；Task 5 只是可选扩散动作。"
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
      "Open partner search is already active",
      "The 2 AIBOUNTY threshold is ready",
      "The Telegram check-in line is ready"
    ],
    qualificationNote:
      "Task 1 to Task 3 stay on the mainline. Task 4 continues in the native SHIT Skills flow. Task 5 is optional amplification only."
  }
};

export function getShareSummary(locale: LocaleCode): ShareSummary {
  return shareSummaryByLocale[locale];
}

export const shareSummary = getShareSummary("zh");
