import { useEffect, useState } from "react";
import { getLocalizedLongpageContent } from "./content";
import SiteHeader from "./components/common/SiteHeader";
import HeroSection from "./components/sections/HeroSection";
import JourneySection from "./components/sections/JourneySection";
import ShareSection from "./components/sections/ShareSection";
import { useLocale } from "./hooks/useLocale";

export function App() {
  const { locale, setLocale } = useLocale();
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

  return (
    <main aria-label="Agent Temple Bounty Journey Longpage" data-locale={locale}>
      <SiteHeader locale={locale} copy={bundle.chrome} onLocaleChange={setLocale} />
      <HeroSection bundle={bundle} onWatchSimulation={handleWatchSimulation} />
      <ShareSection bundle={bundle} />
      <JourneySection bundle={bundle} startSignal={journeyStartSignal} />
    </main>
  );
}

export default App;
