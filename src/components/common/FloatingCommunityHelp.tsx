import { useEffect, useState } from "react";
import { type LocalizedContentBundle } from "../../content";
import "../../styles/community-help.css";

const COMMUNITY_HELP_IMAGE_SRC = `${import.meta.env.BASE_URL}community/wechat-group.jpg`;

interface FloatingCommunityHelpProps {
  bundle: LocalizedContentBundle;
}

export function FloatingCommunityHelp({ bundle }: FloatingCommunityHelpProps) {
  const [isOpen, setIsOpen] = useState(false);
  const copy = bundle.communityHelp;

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="community-help-trigger"
        aria-haspopup="dialog"
        aria-controls="community-help-dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <span className="community-help-trigger__icon" aria-hidden="true">
          群
        </span>
        <span className="community-help-trigger__label">{copy.buttonLabel}</span>
      </button>

      {isOpen ? (
        <div className="community-help-mask" role="presentation" onClick={() => setIsOpen(false)}>
          <div
            id="community-help-dialog"
            className="community-help-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="community-help-title"
            aria-describedby="community-help-summary"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="community-help-dialog__copy">
              <h2 id="community-help-title" className="community-help-dialog__title">
                {copy.dialogTitle}
              </h2>
              <p id="community-help-summary" className="community-help-dialog__summary">
                {copy.dialogSummary}
              </p>
            </div>

            <div className="community-help-dialog__image-shell">
              <img
                className="community-help-dialog__image"
                src={COMMUNITY_HELP_IMAGE_SRC}
                alt={copy.imageAlt}
              />
            </div>

            <div className="community-help-dialog__actions">
              <button
                type="button"
                className="challenge-link-button challenge-link-button--primary"
                onClick={() => setIsOpen(false)}
              >
                {copy.closeLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default FloatingCommunityHelp;
