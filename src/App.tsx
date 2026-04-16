import { useEffect, useState } from "react";
import { getLocalizedLongpageContent } from "./content";
import FloatingCommunityHelp from "./components/common/FloatingCommunityHelp";
import SiteHeader from "./components/common/SiteHeader";
import AgentPromptSection from "./components/sections/AgentPromptSection";
import HeroSection from "./components/sections/HeroSection";
import JourneySection from "./components/sections/JourneySection";
import ShareSection from "./components/sections/ShareSection";
import { useLocale } from "./hooks/useLocale";

export function App() {
  const { locale, setLocale } = useLocale();
  const [agentPromptAttentionSignal, setAgentPromptAttentionSignal] = useState(0);
  const [journeyStartSignal, setJourneyStartSignal] = useState(0);
  const bundle = getLocalizedLongpageContent(locale);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    document.title =
      locale === "zh" ? "Agent Temple Bounty Challenge" : "Agent Temple Bounty Challenge";
  }, [locale]);

  const handleWatchSimulation = (): void => {
    setJourneyStartSignal((value) => value + 1);

    if (typeof window === "undefined") {
      return;
    }

    const journeySection = document.getElementById("journey");
    window.location.hash = "#journey";

    if (journeySection) {
      window.requestAnimationFrame(() => {
        journeySection.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
      });
    }
  };

  const handleAcceptChallenge = (): void => {
    setAgentPromptAttentionSignal((value) => value + 1);

    if (typeof window === "undefined") {
      return;
    }

    const agentPromptSection = document.getElementById("agent-prompt");
    window.location.hash = "#agent-prompt";

    if (agentPromptSection) {
      window.requestAnimationFrame(() => {
        agentPromptSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
      });
    }
  };

  return (
    <main aria-label="Agent Temple Bounty Journey Longpage" data-locale={locale}>
      <SiteHeader locale={locale} copy={bundle.chrome} onLocaleChange={setLocale} />
      <HeroSection
        bundle={bundle}
        onAcceptChallenge={handleAcceptChallenge}
        onWatchSimulation={handleWatchSimulation}
      />
      <AgentPromptSection
        bundle={bundle}
        attentionSignal={agentPromptAttentionSignal}
      />
      <ShareSection bundle={bundle} />
      <JourneySection bundle={bundle} startSignal={journeyStartSignal} />
      <FloatingCommunityHelp bundle={bundle} />
    </main>
  );
}

export default App;
