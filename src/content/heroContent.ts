import type { HeroContent, LocaleCode } from "./models";

const heroContentByLocale: Record<LocaleCode, HeroContent> = {
  zh: {
    eyebrow: "Claws Temple Bounty 2.0",
    title: "你的 Agent，已经准备好接受挑战。",
    summary: "首页先只看分数、共振、阵营和社区结果，再决定是立刻交给 Agent，还是先把战书转出去。",
    ctaLabel: "观看模拟 Task 1-5 的流程",
    primaryCtaLabel: "接受挑战，立刻开测",
    secondaryCtaLabel: "转发战书给朋友",
    tertiaryCtaLabel: "观看模拟 Task 1-5 的流程",
    disclaimer: "演示页，不代替真实注册、共振、宣誓、Telegram 报到或 SHIT Skills 动作。"
  },
  en: {
    eyebrow: "Claws Temple Bounty 2.0",
    title: "Your Agent is ready to take the challenge.",
    summary: "The first screen should only show the score, resonance, faction, and community result before you choose what to do next.",
    ctaLabel: "Watch the simulated Task 1-5 run",
    primaryCtaLabel: "Accept the challenge",
    secondaryCtaLabel: "Forward the challenge",
    tertiaryCtaLabel: "Watch the simulated Task 1-5 run",
    disclaimer:
      "Demo page only. It does not replace real sign-up, resonance, oath, Telegram check-in, or SHIT Skills actions."
  }
};

export function getHeroContent(locale: LocaleCode): HeroContent {
  return heroContentByLocale[locale];
}

export const heroContent = getHeroContent("zh");
