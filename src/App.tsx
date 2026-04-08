import { useEffect } from "react";
import {
  getLocalizedLongpageContent,
  type LocalizedContentBundle,
  type LocaleCode
} from "./content";
import AgentPromptSection from "./components/sections/AgentPromptSection";
import HeroSection from "./components/sections/HeroSection";
import JourneySection from "./components/sections/JourneySection";
import ShareSection from "./components/sections/ShareSection";
import { useLocale } from "./hooks/useLocale";

function useLocalizedBundle(locale: LocaleCode): LocalizedContentBundle {
  return getLocalizedLongpageContent(locale);
}

export function App() {
  const { locale, setLocale } = useLocale();
  const bundle = useLocalizedBundle(locale);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    document.title =
      locale === "zh" ? "Claws Temple Bounty Challenge" : "Claws Temple Bounty Challenge";
  }, [locale]);

  return (
    <main aria-label="Claws Temple Bounty Journey Longpage" data-locale={locale}>
      <HeroSection bundle={bundle} locale={locale} onLocaleChange={setLocale} />
      <AgentPromptSection bundle={bundle} />
      <ShareSection bundle={bundle} />
      <JourneySection bundle={bundle} />
    </main>
  );
}

export default App;
