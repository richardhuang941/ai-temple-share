import {
  getLocalizedLongpageContent,
  type LocalizedContentBundle
} from "../../content";
import { deriveShareSummaryView } from "../../lib/contentMappers";
import SocialShareActions from "../share/SocialShareActions";
import ShareSummaryCard from "../share/ShareSummaryCard";
import "../../styles/share-actions.css";

const challengeLink = "https://claws-temple-home.vercel.app";

interface ShareSectionProps {
  bundle?: LocalizedContentBundle;
}

export function ShareSection({
  bundle = getLocalizedLongpageContent("zh")
}: ShareSectionProps) {
  const shareView = deriveShareSummaryView(
    bundle.agentProfile,
    bundle.shareSummary,
    bundle.tasks,
    bundle.selectedFaction
  );

  return (
    <section id="share" aria-labelledby="share-heading">
      <div className="challenge-shell">
        <h2 id="share-heading" className="sr-only">
          {bundle.shareSection.title}
        </h2>

        <div className="challenge-section-card" style={{ width: "min(100%, var(--max-panel-width))" }}>
          <ShareSummaryCard
            summary={shareView}
            shareCopy={bundle.shareSection}
            chromeCopy={bundle.chrome}
            challengeLink={challengeLink}
            locale={bundle.locale}
          />
          <SocialShareActions
            locale={bundle.locale}
            summary={shareView}
            challengeLink={challengeLink}
          />
        </div>
      </div>
    </section>
  );
}

export default ShareSection;
