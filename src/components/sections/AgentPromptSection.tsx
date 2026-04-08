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
      <div style={{ display: "grid", gap: "1.5rem" }}>
        <SectionHeading
          eyebrow={bundle.agentPromptSection.eyebrow}
          title={bundle.agentPromptSection.title}
          summary={bundle.agentPromptSection.summary}
          id="agent-prompt-heading"
        />

        <article
          className="shell-panel"
          style={{
            display: "grid",
            gap: "1rem",
            padding: "1.3rem"
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "0.9rem",
              alignItems: "center"
            }}
          >
            <span className="eyebrow">{featuredCard.title}</span>
            <CopyButton
              value={featuredCard.promptBody}
              label={bundle.chrome.copyLabel}
              copiedLabel={bundle.chrome.copiedLabel}
            />
          </div>

          <div
            style={{
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              border: "1px solid rgba(255, 120, 120, 0.14)"
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.9rem 1rem",
                background: "rgba(25, 10, 13, 0.92)"
              }}
            >
              <strong>terminal</strong>
              <span style={{ color: "var(--color-muted)", fontSize: "var(--type-small)" }}>
                {featuredCard.referenceRepo}
              </span>
            </div>
            <pre
              style={{
                margin: 0,
                padding: "1.15rem",
                background: "rgba(13, 7, 10, 0.96)",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                lineHeight: 1.7,
                fontFamily: "var(--font-display)",
                fontSize: "0.88rem"
              }}
            >
              {featuredCard.promptBody}
            </pre>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem"
            }}
          >
            <div style={{ display: "grid", gap: "0.55rem" }}>
              <strong>{bundle.locale === "zh" ? "目标" : "Goal"}</strong>
              <p style={{ margin: 0, color: "var(--color-muted)", lineHeight: "var(--line-body)" }}>
                {featuredCard.goal}
              </p>
            </div>

            <div style={{ display: "grid", gap: "0.55rem" }}>
              <strong>{bundle.locale === "zh" ? "怎么用" : "How to use it"}</strong>
              <ol
                style={{
                  margin: 0,
                  paddingLeft: "1.1rem",
                  display: "grid",
                  gap: "0.45rem",
                  color: "var(--color-muted)"
                }}
              >
                {featuredCard.expectedOutput.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: "0.7rem",
              padding: "1rem",
              borderRadius: "var(--radius-md)",
              background: "rgba(255, 255, 255, 0.03)"
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
