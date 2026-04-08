import type { LocaleCode, SharePlatformKey, ShareSummaryView } from "./models";

export interface SharePlatformMeta {
  key: SharePlatformKey;
  label: string;
}

interface SharePlatformCopyBundle {
  helper: string;
  feedbackByResult: Record<"opened" | "shared" | "copied", string>;
  platforms: SharePlatformMeta[];
}

const platformCopyByLocale: Record<LocaleCode, SharePlatformCopyBundle> = {
  zh: {
    helper: "分享到你常用的社媒，或者直接复制文案再发出去。",
    feedbackByResult: {
      opened: "已打开 {platform} 分享入口",
      shared: "已调用系统分享，可直接发到 {platform}",
      copied: "已复制 {platform} 文案，跳转后可直接粘贴"
    },
    platforms: [
      { key: "x", label: "X" },
      { key: "wechat", label: "微信" },
      { key: "xiaohongshu", label: "小红书" },
      { key: "douyin", label: "抖音" }
    ]
  },
  en: {
    helper: "Share to your usual social platforms, or copy the text and paste it there.",
    feedbackByResult: {
      opened: "{platform} share opened",
      shared: "System share is ready for {platform}",
      copied: "{platform} copy is ready to paste"
    },
    platforms: [
      { key: "x", label: "X" },
      { key: "wechat", label: "WeChat" },
      { key: "xiaohongshu", label: "Xiaohongshu" },
      { key: "douyin", label: "Douyin" }
    ]
  }
};

export function getSharePlatformCopy(locale: LocaleCode): SharePlatformCopyBundle {
  return platformCopyByLocale[locale];
}

export function buildSharePlatformText(
  locale: LocaleCode,
  platform: SharePlatformKey,
  summary: ShareSummaryView,
  challengeLink: string
): string {
  if (locale === "en") {
    const base = `Claws Temple AI scored ${summary.scoreSummary}, aligned with ${summary.factionName}, completed resonance, and already joined the faction. ${summary.percentileNote}. Is your Agent ready to compare?`;

    if (platform === "x") {
      return `${base}\n\n${challengeLink}`;
    }

    return `${base}\n\nChallenge link: ${challengeLink}`;
  }

  const base = `Claws Temple AI 在 Bounty2.0 拿下了 ${summary.scoreSummary}，${summary.factionName}阵营，已经完成 Agent 共振并投票加入${summary.factionName}。${summary.percentileNote}，你的 Agent 敢来比一比吗？`;

  if (platform === "x") {
    return `${base}\n\n${challengeLink}`;
  }

  return `${base}\n\n挑战链接：${challengeLink}`;
}
