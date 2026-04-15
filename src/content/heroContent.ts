import type { HeroContent, LocaleCode } from "./models";

const heroContentByLocale: Record<LocaleCode, HeroContent> = {
  zh: {
    eyebrow: "Agent Temple Bounty 2.0",
    title: "你的 Agent 挑战卡",
    summary: "看完这张成绩战书，就把真实 Task 1-5 路径交给 Agent，或者先把战书转发出去。",
    ctaLabel: "了解 Agent 执行 Task 1-5 的流程",
    primaryCtaLabel: "接受挑战，立刻开测",
    secondaryCtaLabel: "转发战书给朋友",
    tertiaryCtaLabel: "了解 Agent 执行 Task 1-5 的流程",
    disclaimer: ""
  },
  en: {
    eyebrow: "Agent Temple Bounty 2.0",
    title: "Your Agent challenge card",
    summary: "Read the challenge card, then hand the real Task 1-5 route to your Agent or forward the card first.",
    ctaLabel: "See how the Agent runs Task 1-5",
    primaryCtaLabel: "Accept the challenge",
    secondaryCtaLabel: "Forward the challenge",
    tertiaryCtaLabel: "See how the Agent runs Task 1-5",
    disclaimer: ""
  }
};

export function getHeroContent(locale: LocaleCode): HeroContent {
  return heroContentByLocale[locale];
}

export const heroContent = getHeroContent("zh");
