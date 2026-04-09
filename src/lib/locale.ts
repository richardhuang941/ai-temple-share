import type { LocaleCode, LocaleState } from "../content";

export const LOCALE_STORAGE_KEY = "claws-temple-home.locale";

function isSupportedLocale(locale: string): locale is LocaleCode {
  return locale === "zh" || locale === "en";
}

export function normalizeLocale(locale?: string | null): LocaleCode | null {
  if (!locale) {
    return null;
  }

  const normalized = locale.toLowerCase();

  if (normalized.startsWith("zh")) {
    return "zh";
  }

  if (normalized.startsWith("en")) {
    return "en";
  }

  return isSupportedLocale(normalized) ? normalized : null;
}

export function readStoredLocale(
  storage?: Pick<Storage, "getItem"> | null
): LocaleCode | null {
  return normalizeLocale(storage?.getItem(LOCALE_STORAGE_KEY));
}

export function persistLocale(
  storage: Pick<Storage, "setItem"> | null | undefined,
  locale: LocaleCode
): void {
  storage?.setItem(LOCALE_STORAGE_KEY, locale);
}

export function resolvePreferredLocale(options?: {
  storedLocale?: string | null;
  navigatorLanguages?: readonly string[];
  navigatorLanguage?: string | null;
  defaultLocale?: LocaleCode;
}): LocaleState {
  const defaultLocale = options?.defaultLocale ?? "zh";
  const storedLocale = normalizeLocale(options?.storedLocale);

  if (storedLocale) {
    return {
      locale: storedLocale,
      source: "stored"
    };
  }

  for (const candidate of options?.navigatorLanguages ?? []) {
    const normalized = normalizeLocale(candidate);

    if (normalized) {
      return {
        locale: normalized,
        source: "system"
      };
    }
  }

  const fallbackLocale = normalizeLocale(options?.navigatorLanguage) ?? defaultLocale;

  return {
    locale: fallbackLocale,
    source: "system"
  };
}
