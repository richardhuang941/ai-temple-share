import type { ChromeCopy, LocaleCode } from "../../content";
import LocaleSwitcher from "./LocaleSwitcher";

interface SiteHeaderProps {
  locale: LocaleCode;
  copy: ChromeCopy;
  onLocaleChange: (locale: LocaleCode) => void;
}

export function SiteHeader({
  locale,
  copy,
  onLocaleChange
}: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="site-header__brand" href="#top" aria-label="Claws Temple">
        <svg
          aria-hidden="true"
          width="28"
          height="28"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="site-header__brand-icon"
        >
          <path d="M8 6H56V36Q56 56 32 62Q8 56 8 36Z" fill="#111827" />
          <path d="M13 11H51V35Q51 51 32 57Q13 51 13 35Z" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
          <path d="M32 30Q26 26 20 28Q16 30 18 24Q20 18 26 20" fill="#ffffff" opacity="0.95" />
          <path d="M32 30Q26 34 20 32Q16 30 18 36Q20 42 26 40" fill="#ffffff" opacity="0.85" />
          <path d="M32 30Q38 26 44 28Q48 30 46 24Q44 18 38 20" fill="#ffffff" opacity="0.95" />
          <path d="M32 30Q38 34 44 32Q48 30 46 36Q44 42 38 40" fill="#ffffff" opacity="0.85" />
          <circle cx="32" cy="30" r="3" fill="#111827" />
          <circle cx="32" cy="30" r="1.5" fill="#ffffff" />
        </svg>
        <span className="site-header__brand-copy">
          <span className="site-header__brand-name">Claws Temple</span>
          <span className="site-header__brand-subtitle">Bounty 2.0 Challenge</span>
        </span>
      </a>

      <LocaleSwitcher
        currentLocale={locale}
        copy={copy}
        onLocaleChange={onLocaleChange}
      />
    </header>
  );
}

export default SiteHeader;
