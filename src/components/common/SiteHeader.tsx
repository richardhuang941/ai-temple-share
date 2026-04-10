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
