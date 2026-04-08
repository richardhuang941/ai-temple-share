import type {
  ChromeCopy,
  LocaleCode,
  ShareMode,
  ShareSectionCopy,
  ShareSummaryView
} from "../../content";
import CopyButton from "../common/CopyButton";
import ShareStatPill from "./ShareStatPill";

interface ShareSummaryCardProps {
  summary: ShareSummaryView;
  mode: ShareMode;
  shareCopy: ShareSectionCopy;
  chromeCopy: ChromeCopy;
  challengeLink: string;
  locale: LocaleCode;
}

export function ShareSummaryCard({
  summary,
  mode,
  shareCopy,
  chromeCopy,
  challengeLink,
  locale
}: ShareSummaryCardProps) {
  if (mode === "text") {
    const textPayload = `${shareCopy.textBody}\n\n${shareCopy.challengeLinkLabel}: ${challengeLink}`;

    return (
      <article
        className="shell-panel"
        style={{
          display: "grid",
          gap: "1rem",
          padding: "clamp(1.25rem, 3vw, 2rem)"
        }}
      >
        <div style={{ display: "grid", gap: "0.5rem" }}>
          <span className="eyebrow">{shareCopy.title}</span>
          <h3 style={{ margin: 0, fontSize: "var(--type-heading-md)", lineHeight: "var(--line-heading)" }}>
            {summary.scoreSummary}
          </h3>
          <p style={{ margin: 0, color: "var(--color-muted)", lineHeight: "var(--line-body)" }}>
            {summary.title}
          </p>
        </div>

        <div
          style={{
            padding: "1rem",
            borderRadius: "var(--radius-md)",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 120, 120, 0.12)",
            color: "var(--color-muted)",
            lineHeight: "var(--line-body)",
            whiteSpace: "pre-wrap"
          }}
        >
          {textPayload}
        </div>

        <CopyButton
          value={textPayload}
          label={chromeCopy.copyLabel}
          copiedLabel={chromeCopy.copiedLabel}
        />
      </article>
    );
  }

  return (
    <article
      className="shell-panel"
      style={{
        display: "grid",
        gap: "1.25rem",
        padding: "clamp(1.25rem, 3vw, 2rem)"
      }}
    >
      <div style={{ display: "grid", gap: "0.55rem" }}>
        <span className="eyebrow">{shareCopy.eyebrow}</span>
        <h3 style={{ margin: 0, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.08 }}>{shareCopy.title}</h3>
        <p style={{ margin: 0, color: "var(--color-muted)", lineHeight: 1.7 }}>{shareCopy.summary}</p>
      </div>

      <div
        style={{
          padding: "1.2rem",
          borderRadius: "var(--radius-lg)",
          background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255, 120, 120, 0.14)",
          display: "grid",
          gap: "1rem"
        }}
      >
        <div style={{ display: "grid", gap: "0.35rem", justifyItems: "center", textAlign: "center" }}>
          <strong style={{ fontSize: "clamp(2.8rem, 8vw, 4rem)", lineHeight: 0.95 }}>
            {summary.scoreSummary}
          </strong>
          <span style={{ color: "var(--color-highlight)", fontWeight: 700 }}>{shareCopy.imageCaption}</span>
          <span style={{ color: "var(--color-muted)" }}>{summary.title}</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "0.9rem"
          }}
        >
          <ShareStatPill
            label={locale === "zh" ? "Agent 打分" : "Score"}
            value={summary.scoreSummary}
            tone="accent"
          />
          <ShareStatPill
            label={locale === "zh" ? "共振状态" : "Resonance"}
            value={summary.resonanceStatus}
            tone="success"
          />
          <ShareStatPill
            label={locale === "zh" ? "阵营状态" : "Faction"}
            value={summary.factionStatus}
            tone="warning"
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "0.9rem"
        }}
      >
        <div
          style={{
            padding: "1rem",
            borderRadius: "var(--radius-md)",
            background: "rgba(255, 255, 255, 0.04)"
          }}
        >
          <span style={{ display: "block", marginBottom: "0.5rem", color: "var(--color-muted)" }}>
            {locale === "zh" ? "当前 Agent" : "Current Agent"}
          </span>
          <strong style={{ display: "block", marginBottom: "0.35rem" }}>{summary.agentHeadline}</strong>
          <span style={{ color: "var(--color-muted)" }}>
            {locale === "zh" ? "类型" : "Type"}: {summary.agentType}
          </span>
        </div>

        <div
          style={{
            padding: "1rem",
            borderRadius: "var(--radius-md)",
            background: "rgba(255, 255, 255, 0.04)"
          }}
        >
          <span style={{ display: "block", marginBottom: "0.5rem", color: "var(--color-muted)" }}>
            {locale === "zh" ? "主导维度" : "Dominant axes"}
          </span>
          <strong>{summary.dominantAxes.join(" / ")}</strong>
        </div>
      </div>

      <div style={{ display: "grid", gap: "0.65rem" }}>
        <strong>{summary.supportingFacts?.length ? (locale === "zh" ? "补充事实" : "Facts") : ""}</strong>
        <ul style={{ margin: 0, paddingLeft: "1.15rem", color: "var(--color-muted)", display: "grid", gap: "0.45rem" }}>
          {summary.supportingFacts?.map((fact) => <li key={fact}>{fact}</li>)}
        </ul>
      </div>

      <div
        style={{
          padding: "0.95rem 1rem",
          borderRadius: "var(--radius-md)",
          background: "rgba(255, 120, 120, 0.08)",
          border: "1px solid rgba(255, 120, 120, 0.2)"
        }}
      >
        <strong style={{ display: "block", marginBottom: "0.3rem" }}>{shareCopy.challengeLinkLabel}</strong>
        <span style={{ color: "var(--color-muted)" }}>{challengeLink}</span>
      </div>
    </article>
  );
}

export default ShareSummaryCard;
