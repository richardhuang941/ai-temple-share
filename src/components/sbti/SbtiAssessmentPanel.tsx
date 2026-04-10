import { useEffect, useMemo, useState } from "react";
import type { LocaleCode, SbtiAssessmentCopy } from "../../content";
import {
  computeSbtiAssessmentResult,
  createSbtiQuestionSession,
  deriveSbtiDimensionSummaries,
  getSbtiQuestionMetaLabel,
  getVisibleSbtiQuestions,
  type SbtiAnswerMap,
  type SbtiAssessmentResult,
  type SbtiRenderableQuestion
} from "../../lib/sbti/engine";
import "../../styles/sbti-assessment.css";

interface SbtiAssessmentPanelProps {
  isOpen: boolean;
  locale: LocaleCode;
  copy: SbtiAssessmentCopy;
  onClose: () => void;
  onComplete: (sbtiCode: string) => void;
}

function buildQuestionLabel(copy: SbtiAssessmentCopy, index: number): string {
  return copy.questionLabel.replace("{index}", String(index));
}

function getModeLabel(locale: LocaleCode): string {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return locale === "zh" ? "桌面测试层" : "Desktop assessment";
  }

  return window.matchMedia("(max-width: 768px)").matches
    ? locale === "zh"
      ? "移动端全屏测试"
      : "Mobile full-screen assessment"
    : locale === "zh"
      ? "桌面测试层"
      : "Desktop assessment";
}

export function SbtiAssessmentPanel({
  isOpen,
  locale,
  copy,
  onClose,
  onComplete
}: SbtiAssessmentPanelProps) {
  const [sessionQuestions, setSessionQuestions] = useState<SbtiRenderableQuestion[]>([]);
  const [answers, setAnswers] = useState<SbtiAnswerMap>({});
  const [result, setResult] = useState<SbtiAssessmentResult | null>(null);
  const [modeLabel, setModeLabel] = useState(() => getModeLabel(locale));

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setSessionQuestions(createSbtiQuestionSession());
    setAnswers({});
    setResult(null);
    setModeLabel(getModeLabel(locale));
  }, [isOpen, locale]);

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const visibleQuestions = useMemo(
    () => getVisibleSbtiQuestions(sessionQuestions, answers),
    [answers, sessionQuestions]
  );
  const answeredCount = visibleQuestions.filter((question) => answers[question.id] !== undefined).length;
  const isReadyToSubmit = visibleQuestions.length > 0 && answeredCount === visibleQuestions.length;
  const dimensionSummaries = useMemo(
    () => (result ? deriveSbtiDimensionSummaries(result) : []),
    [result]
  );

  if (!isOpen) {
    return null;
  }

  const handleAnswerChange = (questionId: string, value: number): void => {
    setAnswers((previous) => {
      const next = {
        ...previous,
        [questionId]: value
      };

      if (questionId === "drink_gate_q1" && value !== 3) {
        delete next.drink_gate_q2;
      }

      return next;
    });
  };

  const handleSubmit = (): void => {
    if (!isReadyToSubmit) {
      return;
    }

    setResult(computeSbtiAssessmentResult(answers));
  };

  const handleRestart = (): void => {
    setSessionQuestions(createSbtiQuestionSession());
    setAnswers({});
    setResult(null);
  };

  const handleUseResult = (): void => {
    if (!result) {
      return;
    }

    onComplete(result.finalType.code);
  };

  return (
    <div className="sbti-assessment-backdrop" role="presentation">
      <section
        className="sbti-assessment-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sbti-assessment-title"
      >
        <header className="sbti-assessment-header">
          <div className="sbti-assessment-header__copy">
            <span className="eyebrow">{modeLabel}</span>
            <h2 id="sbti-assessment-title">{result ? copy.resultTitle : copy.title}</h2>
            <p>{result ? copy.resultSummary : copy.summary}</p>
          </div>

          <button
            type="button"
            className="sbti-assessment-close"
            onClick={onClose}
            aria-label={copy.closeLabel}
          >
            ×
          </button>
        </header>

        {result ? (
          <div className="sbti-assessment-result">
            <div className="sbti-result-hero">
              {result.finalType.imageSrc ? (
                <img
                  className="sbti-result-image"
                  src={result.finalType.imageSrc}
                  alt={`${result.finalType.code} ${result.finalType.cn}`}
                />
              ) : null}

              <div className="sbti-result-copy">
                <span className="eyebrow">{result.modeKicker}</span>
                <h3>{`${result.finalType.code} · ${result.finalType.cn}`}</h3>
                <strong>{result.badge}</strong>
                <p>{result.finalType.intro}</p>
              </div>
            </div>

            <div className="sbti-result-body">
              <p className="sbti-result-sub">{result.sub}</p>
              <p>{result.finalType.desc}</p>
              {result.secondaryType ? (
                <p className="sbti-result-secondary">
                  {locale === "zh"
                    ? `常规人格最高匹配仍然是 ${result.secondaryType.code}（${result.secondaryType.cn}）。`
                    : `The strongest regular match is still ${result.secondaryType.code} (${result.secondaryType.cn}).`}
                </p>
              ) : null}
            </div>

            <div className="sbti-dimension-grid">
              {dimensionSummaries.map((summary) => (
                <article key={summary.key} className="sbti-dimension-card">
                  <div className="sbti-dimension-card__top">
                    <strong>{summary.name}</strong>
                    <span>{`${summary.level} / ${summary.rawScore}`}</span>
                  </div>
                  <p>{summary.explanation}</p>
                </article>
              ))}
            </div>

            <p className="sbti-result-footnote">{result.funNote}</p>

            <div className="sbti-assessment-actions">
              <button
                type="button"
                className="journey-button journey-button--secondary"
                onClick={handleRestart}
              >
                {copy.retakeLabel}
              </button>
              <button
                type="button"
                className="journey-button journey-button--primary"
                onClick={handleUseResult}
              >
                {copy.resultUseLabel}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="sbti-assessment-progress">
              <div className="sbti-assessment-progress__top">
                <span>{copy.progressLabel}</span>
                <strong>{`${answeredCount} / ${visibleQuestions.length}`}</strong>
              </div>
              <div className="sbti-assessment-progress__track" aria-hidden="true">
                <span
                  className="sbti-assessment-progress__fill"
                  style={{
                    width: visibleQuestions.length
                      ? `${(answeredCount / visibleQuestions.length) * 100}%`
                      : "0%"
                  }}
                />
              </div>
              <p>{isReadyToSubmit ? copy.readyHint : copy.pendingHint}</p>
            </div>

            <div className="sbti-question-list">
              {visibleQuestions.map((question, index) => (
                <article key={question.id} className="sbti-question-card">
                  <div className="sbti-question-card__meta">
                    <span className="sbti-question-card__badge">
                      {buildQuestionLabel(copy, index + 1)}
                    </span>
                    <span>{getSbtiQuestionMetaLabel(question, locale)}</span>
                  </div>
                  <h3>{question.text}</h3>
                  <div className="sbti-question-options" role="radiogroup" aria-label={question.text}>
                    {question.options.map((option, optionIndex) => {
                      const code = ["A", "B", "C", "D"][optionIndex] ?? String(optionIndex + 1);
                      const checked = answers[question.id] === option.value;

                      return (
                        <label
                          key={`${question.id}-${option.value}`}
                          className="sbti-question-option"
                          data-checked={checked ? "true" : "false"}
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={option.value}
                            checked={checked}
                            onChange={() => handleAnswerChange(question.id, option.value)}
                          />
                          <span className="sbti-question-option__code">{code}</span>
                          <span>{option.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>

            <div className="sbti-assessment-actions">
              <button
                type="button"
                className="journey-button journey-button--secondary"
                onClick={onClose}
              >
                {copy.closeLabel}
              </button>
              <button
                type="button"
                className="journey-button journey-button--primary"
                onClick={handleSubmit}
                disabled={!isReadyToSubmit}
              >
                {copy.submitLabel}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default SbtiAssessmentPanel;
