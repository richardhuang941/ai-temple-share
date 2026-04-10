import { useEffect, useState } from "react";
import {
  getLocalizedLongpageContent,
  type LocalizedContentBundle,
  type LocaleCode
} from "./content";
import SiteHeader from "./components/common/SiteHeader";
import HeroSection from "./components/sections/HeroSection";
import JourneySection from "./components/sections/JourneySection";
import ShareSection from "./components/sections/ShareSection";
import { useLocale } from "./hooks/useLocale";

const SBTI_STORAGE_KEY = "claws-temple-bounty-sbti";

function useLocalizedBundle(locale: LocaleCode): LocalizedContentBundle {
  return getLocalizedLongpageContent(locale);
}

export function App() {
  const { locale, setLocale } = useLocale();
  const bundle = useLocalizedBundle(locale);
  const [sbtiValue, setSbtiValue] = useState<string>(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return window.localStorage.getItem(SBTI_STORAGE_KEY) ?? "";
  });
  const [sbtiError, setSbtiError] = useState<string | null>(null);
  const [journeyStartSignal, setJourneyStartSignal] = useState(0);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    document.title =
      locale === "zh" ? "Claws Temple Bounty Challenge" : "Claws Temple Bounty Challenge";
  }, [locale]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const normalized = sbtiValue.trim().toUpperCase();

    if (normalized) {
      window.localStorage.setItem(SBTI_STORAGE_KEY, normalized);
      return;
    }

    window.localStorage.removeItem(SBTI_STORAGE_KEY);
  }, [sbtiValue]);

  const handleWatchSimulation = (): void => {
    const normalized = sbtiValue.trim().toUpperCase();
    const nextError =
      locale === "zh"
        ? "先输入你的 SBTI，再观看模拟流程。"
        : "Enter your SBTI before starting the simulation.";

    if (!normalized) {
      setSbtiError(nextError);
      return;
    }

    setSbtiValue(normalized);
    setSbtiError(null);
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
    <main aria-label="Claws Temple Bounty Journey Longpage" data-locale={locale}>
      <SiteHeader locale={locale} copy={bundle.chrome} onLocaleChange={setLocale} />
      <HeroSection
        bundle={bundle}
        sbtiValue={sbtiValue}
        sbtiError={sbtiError}
        onSbtiChange={(value) => {
          setSbtiValue(value.toUpperCase());
          setSbtiError(null);
        }}
        onWatchSimulation={handleWatchSimulation}
      />
      <ShareSection bundle={bundle} />
      <JourneySection bundle={bundle} sbtiValue={sbtiValue} startSignal={journeyStartSignal} />
    </main>
  );
}

export default App;
