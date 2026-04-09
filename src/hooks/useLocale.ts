import { useState } from "react";
import type { LocaleCode, LocaleState } from "../content";
import { persistLocale, readStoredLocale, resolvePreferredLocale } from "../lib/locale";

function createInitialLocaleState(): LocaleState {
  if (typeof window === "undefined") {
    return {
      locale: "zh",
      source: "system"
    };
  }

  return resolvePreferredLocale({
    storedLocale: readStoredLocale(window.localStorage),
    navigatorLanguages: window.navigator.languages,
    navigatorLanguage: window.navigator.language
  });
}

export function useLocale() {
  const [localeState, setLocaleState] = useState<LocaleState>(createInitialLocaleState);

  const setLocale = (locale: LocaleCode): void => {
    if (typeof window !== "undefined") {
      persistLocale(window.localStorage, locale);
    }

    setLocaleState({
      locale,
      source: "manual"
    });
  };

  return {
    locale: localeState.locale,
    localeSource: localeState.source,
    setLocale
  };
}
