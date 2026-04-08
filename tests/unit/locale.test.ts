import {
  LOCALE_STORAGE_KEY,
  normalizeLocale,
  persistLocale,
  readStoredLocale,
  resolvePreferredLocale
} from "../../src/lib/locale";

describe("locale helpers", () => {
  it("normalizes locale families into supported locales", () => {
    expect(normalizeLocale("zh-CN")).toBe("zh");
    expect(normalizeLocale("en-US")).toBe("en");
    expect(normalizeLocale("fr-FR")).toBeNull();
  });

  it("prefers stored locale over navigator languages", () => {
    const state = resolvePreferredLocale({
      storedLocale: "en",
      navigatorLanguages: ["zh-CN", "en-US"],
      navigatorLanguage: "zh-CN"
    });

    expect(state).toEqual({
      locale: "en",
      source: "stored"
    });
  });

  it("falls back to navigator languages when no stored locale exists", () => {
    const state = resolvePreferredLocale({
      navigatorLanguages: ["en-GB"],
      navigatorLanguage: "zh-CN"
    });

    expect(state).toEqual({
      locale: "en",
      source: "system"
    });
  });

  it("reads and writes locale choice from storage", () => {
    const storage = new Map<string, string>();
    const mockStorage = {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => {
        storage.set(key, value);
      }
    };

    persistLocale(mockStorage, "en");

    expect(readStoredLocale(mockStorage)).toBe("en");
    expect(storage.get(LOCALE_STORAGE_KEY)).toBe("en");
  });

  it("falls back to the configured default locale when nothing supported is present", () => {
    const state = resolvePreferredLocale({
      storedLocale: "fr",
      navigatorLanguages: ["fr-FR"],
      navigatorLanguage: "de-DE",
      defaultLocale: "en"
    });

    expect(state).toEqual({
      locale: "en",
      source: "system"
    });
  });
});
