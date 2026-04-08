import {
  getLocalizedLongpageContent,
  type LocalizedContentBundle,
  type ShareMode
} from "../../content";
import { useState } from "react";
import { deriveShareSummaryView } from "../../lib/contentMappers";
import SectionHeading from "../common/SectionHeading";
import ShareSummaryCard from "../share/ShareSummaryCard";

const challengeLink = "https://clawvard.school/share?id=eval-a2af68e5";

interface ShareSectionProps {
  bundle?: LocalizedContentBundle;
}

export function ShareSection({
  bundle = getLocalizedLongpageContent("zh")
}: ShareSectionProps) {
  const [shareMode, setShareMode] = useState<ShareMode>("image");
  const shareView = deriveShareSummaryView(
    bundle.agentProfile,
    bundle.shareSummary,
    bundle.tasks,
    bundle.selectedFaction
  );

  return (
    <section id="share" aria-labelledby="share-heading">
      <div style={{ display: "grid", gap: "1.5rem" }}>
        <SectionHeading
          eyebrow={bundle.shareSection.eyebrow}
          title={bundle.shareSection.title}
          summary={bundle.shareSection.summary}
          id="share-heading"
        />

        <div
          className="shell-panel"
          style={{
            display: "grid",
            gap: "1.25rem",
            padding: "clamp(1.25rem, 3vw, 2rem)"
          }}
        >
          <div
            style={{
              display: "inline-grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "0.45rem",
              padding: "0.4rem",
              borderRadius: "var(--radius-pill)",
              background: "rgba(255, 255, 255, 0.04)"
            }}
          >
            {([
              { mode: "image", label: bundle.chrome.shareImageLabel },
              { mode: "text", label: bundle.chrome.shareTextLabel }
            ] as const).map((item) => {
              const isActive = shareMode === item.mode;

              return (
                <button
                  key={item.mode}
                  type="button"
                  onClick={() => setShareMode(item.mode)}
                  style={{
                    border: "none",
                    minHeight: "3.35rem",
                    borderRadius: "var(--radius-pill)",
                    background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                    color: "var(--color-ink)",
                    cursor: "pointer",
                    fontWeight: 700
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <ShareSummaryCard
            summary={shareView}
            mode={shareMode}
            shareCopy={bundle.shareSection}
            chromeCopy={bundle.chrome}
            challengeLink={challengeLink}
            locale={bundle.locale}
          />
        </div>
      </div>
    </section>
  );
}

export default ShareSection;
