import type { ChromeCopy, LocaleCode } from "../../content";

interface LocaleSwitcherProps {
  currentLocale: LocaleCode;
  copy: ChromeCopy;
  onLocaleChange: (locale: LocaleCode) => void;
}

export function LocaleSwitcher({
  currentLocale,
  copy,
  onLocaleChange
}: LocaleSwitcherProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.35rem",
        borderRadius: "var(--radius-pill)",
        background: "rgba(31, 10, 12, 0.7)",
        border: "1px solid rgba(255, 120, 120, 0.18)"
      }}
    >
      <span style={{ color: "var(--color-muted)", fontSize: "var(--type-small)" }}>
        {copy.languageLabel}
      </span>
      {(["zh", "en"] as const).map((locale) => {
        const isActive = currentLocale === locale;

        return (
          <button
            key={locale}
            type="button"
            onClick={() => onLocaleChange(locale)}
            aria-pressed={isActive}
            style={{
              border: "none",
              background: isActive
                ? "linear-gradient(135deg, var(--coral-bright), var(--color-highlight))"
                : "transparent",
              color: isActive ? "#22080b" : "var(--color-ink)",
              padding: "0.45rem 0.9rem",
              borderRadius: "var(--radius-pill)",
              cursor: "pointer",
              fontWeight: 700
            }}
          >
            {copy.languageNames[locale]}
          </button>
        );
      })}
    </div>
  );
}

export default LocaleSwitcher;
