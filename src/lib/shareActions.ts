import type { SharePlatformKey } from "../content";

export type ShareActionResult = "opened" | "shared" | "copied";

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
    await navigator.clipboard.writeText(value);
    return;
  }

  fallbackCopy(value);
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

  await copyText(`${text}\n\n${url}`);
  return "copied";
}
