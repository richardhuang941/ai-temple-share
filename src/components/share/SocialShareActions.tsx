import { useMemo, useState } from "react";
import type { LocaleCode, ShareSummaryView, SharePlatformKey } from "../../content";
import { buildSharePlatformText, getSharePlatformCopy } from "../../content/sharePlatformCopy";
import { shareToPlatform } from "../../lib/shareActions";

interface SocialShareActionsProps {
  locale: LocaleCode;
  summary: ShareSummaryView;
  challengeLink: string;
}

function getPlatformGlyph(platform: SharePlatformKey): string {
  switch (platform) {
    case "x":
      return "X";
    case "wechat":
      return "微";
    case "xiaohongshu":
      return "红";
    case "douyin":
      return "抖";
    default:
      return "";
  }
}

export function SocialShareActions({
  locale,
  summary,
  challengeLink
}: SocialShareActionsProps) {
  const copy = getSharePlatformCopy(locale);
  const [feedback, setFeedback] = useState<string | null>(null);
  const platformPayloads = useMemo(() => {
    return copy.platforms.map((platform) => ({
      ...platform,
      text: buildSharePlatformText(locale, platform.key, summary, challengeLink)
    }));
  }, [challengeLink, copy.platforms, locale, summary]);

  const handleShare = async (
    platform: SharePlatformKey,
    label: string,
    text: string
  ): Promise<void> => {
    const result = await shareToPlatform({
      platform,
      title: summary.title,
      text,
      url: challengeLink
    });

    setFeedback(copy.feedbackByResult[result].replace("{platform}", label));
  };

  return (
    <div className="share-social-panel">
      <p className="share-social-helper">{copy.helper}</p>
      <div className="share-social-row" role="list" aria-label="Share actions">
        {platformPayloads.map((platform) => (
          <button
            key={platform.key}
            type="button"
            className="challenge-social-action"
            data-platform={platform.key}
            onClick={() => handleShare(platform.key, platform.label, platform.text)}
          >
            <span className="challenge-social-action__icon" aria-hidden="true">
              {getPlatformGlyph(platform.key)}
            </span>
            <span className="challenge-social-action__label">{platform.label}</span>
          </button>
        ))}
      </div>
      {feedback ? <p className="share-social-feedback">{feedback}</p> : null}
    </div>
  );
}

export default SocialShareActions;
