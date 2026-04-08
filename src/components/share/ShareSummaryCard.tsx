import type { ShareSummaryView } from "../../content";
import ShareStatPill from "./ShareStatPill";

interface ShareSummaryCardProps {
  summary: ShareSummaryView;
}

export function ShareSummaryCard({ summary }: ShareSummaryCardProps) {
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
        <span className="eyebrow">Share Snapshot</span>
        <h3 style={{ margin: 0, fontSize: "clamp(1.6rem, 3vw, 2.5rem)", lineHeight: 1.08 }}>{summary.title}</h3>
        <p style={{ margin: 0, color: "var(--color-muted)", lineHeight: 1.7 }}>{summary.qualificationNote}</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "0.9rem"
        }}
      >
        <ShareStatPill label="Agent 打分多少" value={summary.scoreSummary} tone="accent" />
        <ShareStatPill label="共振状态" value={summary.resonanceStatus} tone="success" />
        <ShareStatPill label="阵营状态" value={summary.factionStatus} tone="warning" />
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
          <span style={{ display: "block", marginBottom: "0.5rem", color: "var(--color-muted)" }}>当前 Agent</span>
          <strong style={{ display: "block", marginBottom: "0.35rem" }}>{summary.agentHeadline}</strong>
          <span style={{ color: "var(--color-muted)" }}>类型：{summary.agentType}</span>
        </div>

        <div
          style={{
            padding: "1rem",
            borderRadius: "var(--radius-md)",
            background: "rgba(255, 255, 255, 0.04)"
          }}
        >
          <span style={{ display: "block", marginBottom: "0.5rem", color: "var(--color-muted)" }}>主导维度</span>
          <strong>{summary.dominantAxes.join(" / ")}</strong>
        </div>
      </div>

      <div style={{ display: "grid", gap: "0.65rem" }}>
        <strong>补充事实</strong>
        <ul style={{ margin: 0, paddingLeft: "1.15rem", color: "var(--color-muted)", display: "grid", gap: "0.45rem" }}>
          {summary.supportingFacts?.map((fact) => <li key={fact}>{fact}</li>)}
        </ul>
      </div>

      <div
        style={{
          padding: "0.95rem 1rem",
          borderRadius: "var(--radius-md)",
          background: "rgba(142, 228, 255, 0.08)",
          border: "1px solid rgba(142, 228, 255, 0.2)"
        }}
      >
        <strong style={{ display: "block", marginBottom: "0.3rem" }}>下一步提示</strong>
        <span style={{ color: "var(--color-muted)" }}>{summary.nextHint}</span>
      </div>
    </article>
  );
}

export default ShareSummaryCard;
