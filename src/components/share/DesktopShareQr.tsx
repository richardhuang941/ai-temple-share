import { QRCodeSVG } from "qrcode.react";
import type { ShareSectionCopy } from "../../content";

interface DesktopShareQrProps {
  challengeLink: string;
  shareCopy: ShareSectionCopy;
}

export function DesktopShareQr({
  challengeLink,
  shareCopy
}: DesktopShareQrProps) {
  if (!challengeLink) {
    return null;
  }

  return (
    <aside className="share-desktop-qr" aria-label={shareCopy.qrTitle}>
      <p className="share-desktop-qr__title">{shareCopy.qrTitle}</p>
      <p className="share-desktop-qr__summary">{shareCopy.qrSummary}</p>
      <div className="share-desktop-qr__code">
        <QRCodeSVG
          value={challengeLink}
          size={188}
          marginSize={2}
          bgColor="#ffffff"
          fgColor="#111827"
          title={shareCopy.qrTitle}
          includeMargin
        />
      </div>
    </aside>
  );
}

export default DesktopShareQr;
