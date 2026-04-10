import type { LocaleCode, SharePlatformKey, ShareSummaryView } from "./models";

export interface SharePlatformMeta {
  key: SharePlatformKey;
  label: string;
}

interface SharePlatformCopyBundle {
  feedbackByResult: Record<"opened" | "shared" | "copied", string>;
  countdownTitle: string;
  countdownBody: string;
  countdownLabel: string;
  openNowLabel: string;
  cancelLabel: string;
  platforms: SharePlatformMeta[];
}

const platformCopyByLocale: Record<LocaleCode, SharePlatformCopyBundle> = {
  zh: {
    feedbackByResult: {
      opened: "已打开 {platform} 分享入口",
      shared: "已调用系统分享，可直接发到 {platform}",
      copied: "已复制 {platform} 文案，跳转后可直接粘贴"
    },
    countdownTitle: "分享文案已复制",
    countdownBody: "{platform} 即将被唤起，跳转后按 App 内流程完成分享。",
    countdownLabel: "{seconds}s 后打开 {platform}",
    openNowLabel: "立即打开",
    cancelLabel: "稍后再说",
    platforms: [
      { key: "x", label: "X" },
      { key: "wechat", label: "微信" },
      { key: "xiaohongshu", label: "小红书" },
      { key: "douyin", label: "抖音" }
    ]
  },
  en: {
    feedbackByResult: {
      opened: "{platform} share opened",
      shared: "System share is ready for {platform}",
      copied: "{platform} copy is ready to paste"
    },
    countdownTitle: "Share copy is ready",
    countdownBody: "{platform} will open next. Finish the share inside the app.",
    countdownLabel: "Opening {platform} in {seconds}s",
    openNowLabel: "Open now",
    cancelLabel: "Not now",
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
