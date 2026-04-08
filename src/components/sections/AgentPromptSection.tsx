import { type LocalizedContentBundle } from "../../content";
import CopyButton from "../common/CopyButton";
import SectionHeading from "../common/SectionHeading";

interface AgentPromptSectionProps {
  bundle: LocalizedContentBundle;
}

export function AgentPromptSection({
  bundle
}: AgentPromptSectionProps) {
  const featuredCard = bundle.agentPromptCards[0];
  const secondaryCard = bundle.agentPromptCards[1];

  return (
    <section id="agent-prompt" aria-labelledby="agent-prompt-heading">
      <div className="challenge-shell">
        <SectionHeading
          eyebrow={bundle.agentPromptSection.eyebrow}
          title={bundle.agentPromptSection.title}
          summary={bundle.agentPromptSection.summary}
          id="agent-prompt-heading"
        />

        <article className="challenge-section-card" style={{ width: "min(100%, 38rem)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.9rem", alignItems: "center" }}>
            <span className="eyebrow">{featuredCard.title}</span>
            <CopyButton
              value={featuredCard.promptBody}
              label={bundle.chrome.copyLabel}
              copiedLabel={bundle.chrome.copiedLabel}
            />
          </div>

          <div className="prompt-terminal">
            <div className="prompt-terminal-bar">
              <div style={{ display: "inline-flex", gap: "0.45rem", alignItems: "center" }}>
                <span style={{ width: "0.8rem", height: "0.8rem", borderRadius: "999px", background: "#fb7185" }} />
                <span style={{ width: "0.8rem", height: "0.8rem", borderRadius: "999px", background: "#fbbf24" }} />
                <span style={{ width: "0.8rem", height: "0.8rem", borderRadius: "999px", background: "#34d399" }} />
                <span style={{ marginLeft: "0.4rem", opacity: 0.72 }}>terminal</span>
              </div>

              <span style={{ fontSize: "0.82rem", opacity: 0.75 }}>{featuredCard.referenceRepo}</span>
            </div>

            <pre className="prompt-terminal-body">{featuredCard.promptBody}</pre>
          </div>

          <ol
            style={{
              margin: 0,
              paddingLeft: "1.2rem",
              display: "grid",
              gap: "0.5rem",
              color: "var(--color-muted)",
              lineHeight: "var(--line-body)"
            }}
          >
            {featuredCard.expectedOutput.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>

          <div
            style={{
              display: "grid",
              gap: "0.65rem",
              padding: "1rem 1.05rem",
              borderRadius: "1.2rem",
              background: "#f6f8fb",
              border: "1px solid rgba(24, 34, 54, 0.06)"
            }}
          >
            <strong>{secondaryCard.title}</strong>
            <p style={{ margin: 0, color: "var(--color-muted)", lineHeight: "var(--line-body)" }}>
              {secondaryCard.goal}
            </p>
            <CopyButton
              value={secondaryCard.promptBody}
              label={bundle.chrome.copyLabel}
              copiedLabel={bundle.chrome.copiedLabel}
            />
          </div>
        </article>
      </div>
    </section>
  );
}

export default AgentPromptSection;
