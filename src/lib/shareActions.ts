import type { SharePlatformKey } from "../content";

export type ShareActionResult = "opened" | "shared" | "copied";

const appSchemeByPlatform: Partial<Record<SharePlatformKey, string>> = {
  wechat: "weixin://",
  xiaohongshu: "xhsdiscover://",
  douyin: "snssdk1128://"
};

function fallbackCopy(value: string): void {
  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.setAttribute("readonly", "true");
  textArea.style.position = "absolute";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

async function copyText(value: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Fall back to the legacy copy path when clipboard permissions are unavailable.
    }
  }

  fallbackCopy(value);
}

export async function copySharePayload(text: string, url?: string): Promise<void> {
  const normalizedText = text.trim();
  const normalizedUrl = url?.trim();
  const payload =
    normalizedUrl && !normalizedText.includes(normalizedUrl)
      ? `${normalizedText}\n\n${normalizedUrl}`
      : normalizedText;

  await copyText(payload);
}

export function isMobileShareSurface(): boolean {
  if (typeof navigator === "undefined") {
    return false;
  }

  return /android|iphone|ipad|ipod|mobile|micromessenger|windows phone/i.test(navigator.userAgent);
}

export function launchShareApp(platform: SharePlatformKey): boolean {
  const scheme = appSchemeByPlatform[platform];

  if (!scheme) {
    return false;
  }

  window.location.href = scheme;
  return true;
}

export async function shareToPlatform(options: {
  platform: SharePlatformKey;
  title: string;
  text: string;
  url: string;
}): Promise<ShareActionResult> {
  const {
    platform,
    title,
    text,
    url
  } = options;

  if (platform === "x") {
    const intentUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(intentUrl, "_blank", "noopener,noreferrer");
    return "opened";
  }

  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url
      });
      return "shared";
    } catch {
      // Fall through to copy when the share sheet is cancelled or unavailable.
    }
  }

  await copySharePayload(text, url);
  return "copied";
}
