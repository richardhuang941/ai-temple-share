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
        padding: "0.3rem 0.35rem",
        borderRadius: "var(--radius-pill)",
        background: "rgba(255, 255, 255, 0.88)",
        border: "1px solid rgba(24, 34, 54, 0.08)",
        boxShadow: "0 10px 28px rgba(17, 24, 39, 0.08)"
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
                ? "linear-gradient(135deg, var(--coral-bright), #ff8f6b)"
                : "transparent",
              color: isActive ? "#fff" : "var(--color-ink)",
              padding: "0.45rem 0.85rem",
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
