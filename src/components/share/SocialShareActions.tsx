import { useEffect, useMemo, useState } from "react";
import type { LocaleCode, ShareSummaryView, SharePlatformKey } from "../../content";
import { buildSharePlatformText, getSharePlatformCopy } from "../../content/sharePlatformCopy";
import {
  copySharePayload,
  isMobileShareSurface,
  launchShareApp,
  shareToPlatform
} from "../../lib/shareActions";

interface SocialShareActionsProps {
  locale: LocaleCode;
  summary: ShareSummaryView;
  challengeLink: string;
}

interface AppWakeupState {
  platform: SharePlatformKey;
  label: string;
  remainingSeconds: number;
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
  const [appWakeup, setAppWakeup] = useState<AppWakeupState | null>(null);
  const isMobile = useMemo(() => isMobileShareSurface(), []);
  const platformPayloads = useMemo(() => {
    return copy.platforms.map((platform) => ({
      ...platform,
      text: buildSharePlatformText(locale, platform.key, summary, challengeLink)
    }));
  }, [challengeLink, copy.platforms, locale, summary]);
  const visiblePlatforms = useMemo(
    () => platformPayloads.filter((platform) => isMobile || platform.key === "x"),
    [isMobile, platformPayloads]
  );

  useEffect(() => {
    if (!appWakeup) {
      return undefined;
    }

    if (appWakeup.remainingSeconds <= 0) {
      launchShareApp(appWakeup.platform);
      setFeedback(copy.feedbackByResult.opened.replace("{platform}", appWakeup.label));

      const closeTimeout = window.setTimeout(() => {
        setAppWakeup(null);
      }, 360);

      return () => {
        window.clearTimeout(closeTimeout);
      };
    }

    const countdownTimeout = window.setTimeout(() => {
      setAppWakeup((previousState) =>
        previousState
          ? { ...previousState, remainingSeconds: previousState.remainingSeconds - 1 }
          : previousState
      );
    }, 1000);

    return () => {
      window.clearTimeout(countdownTimeout);
    };
  }, [appWakeup, copy.feedbackByResult.opened]);

  const handleShare = async (
    platform: SharePlatformKey,
    label: string,
    text: string
  ): Promise<void> => {
    if (isMobile && platform !== "x") {
      await copySharePayload(text, challengeLink);
      setFeedback(copy.feedbackByResult.copied.replace("{platform}", label));
      setAppWakeup({
        platform,
        label,
        remainingSeconds: 3
      });
      return;
    }

    const result = await shareToPlatform({
      platform,
      title: summary.title,
      text,
      url: challengeLink
    });

    setFeedback(copy.feedbackByResult[result].replace("{platform}", label));
  };

  const handleOpenNow = (): void => {
    if (!appWakeup) {
      return;
    }

    launchShareApp(appWakeup.platform);
    setFeedback(copy.feedbackByResult.opened.replace("{platform}", appWakeup.label));
    setAppWakeup(null);
  };

  return (
    <>
      <div className="share-social-panel">
        <div
          className="share-social-row"
          role="list"
          aria-label="Share actions"
          data-mobile={isMobile ? "true" : undefined}
          style={isMobile ? undefined : { gridTemplateColumns: "minmax(0, 5rem)", justifyContent: "center" }}
        >
          {visiblePlatforms.map((platform) => (
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
        {feedback ? <p className="share-social-feedback" role="status">{feedback}</p> : null}
      </div>

      {appWakeup ? (
        <div className="share-app-launch-mask" role="presentation">
          <div
            className="share-app-launch-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-app-launch-title"
          >
            <strong id="share-app-launch-title">{copy.countdownTitle}</strong>
            <p>{copy.countdownBody.replace("{platform}", appWakeup.label)}</p>
            <span className="share-app-launch-countdown">
              {copy.countdownLabel
                .replace("{seconds}", String(appWakeup.remainingSeconds))
                .replace("{platform}", appWakeup.label)}
            </span>
            <div className="share-app-launch-actions">
              <button
                type="button"
                className="challenge-link-button"
                onClick={() => setAppWakeup(null)}
              >
                {copy.cancelLabel}
              </button>
              <button
                type="button"
                className="challenge-link-button challenge-link-button--primary"
                onClick={handleOpenNow}
              >
                {copy.openNowLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default SocialShareActions;
