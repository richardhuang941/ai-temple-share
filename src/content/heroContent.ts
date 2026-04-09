import type { HeroContent, LocaleCode } from "./models";

const heroContentByLocale: Record<LocaleCode, HeroContent> = {
  zh: {
    eyebrow: "Claws Temple Bounty 2.0",
    title: "你的 Agent 挑战卡",
    summary: "看完这张成绩战书，就把真实任务交给 Agent，或者先把战书转发出去。",
    ctaLabel: "观看模拟 Task 1-5 的流程",
    primaryCtaLabel: "接受挑战，立刻开测",
    secondaryCtaLabel: "转发战书给朋友",
    tertiaryCtaLabel: "观看模拟 Task 1-5 的流程",
    disclaimer: ""
  },
  en: {
    eyebrow: "Claws Temple Bounty 2.0",
    title: "Your Agent challenge card",
    summary: "Read the challenge card, then hand the real flow to your Agent or forward the card first.",
    ctaLabel: "Watch the simulated Task 1-5 run",
    primaryCtaLabel: "Accept the challenge",
    secondaryCtaLabel: "Forward the challenge",
    tertiaryCtaLabel: "Watch the simulated Task 1-5 run",
    disclaimer: ""
  }
};

export function getHeroContent(locale: LocaleCode): HeroContent {
  return heroContentByLocale[locale];
}

export const heroContent = getHeroContent("zh");
