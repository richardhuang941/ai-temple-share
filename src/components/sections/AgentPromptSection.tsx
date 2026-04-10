import { useEffect, useState, type CSSProperties } from "react";
import { type LocalizedContentBundle } from "../../content";
import CopyButton from "../common/CopyButton";

interface AgentPromptSectionProps {
  bundle: LocalizedContentBundle;
  attentionSignal: number;
}

export function AgentPromptSection({
  bundle,
  attentionSignal
}: AgentPromptSectionProps) {
  const featuredCard = bundle.agentPromptCards[0];
  const [isEmphasized, setIsEmphasized] = useState(false);

  useEffect(() => {
    if (attentionSignal === 0) {
      return;
    }

    setIsEmphasized(true);
    const timeoutId = window.setTimeout(() => {
      setIsEmphasized(false);
    }, 900);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [attentionSignal]);

  const displayCommand = featuredCard.promptBody.split("\n")[0] ?? featuredCard.promptBody;
  const promptComment =
    bundle.locale === "zh"
      ? "继续按真实 Bounty 2.0 路径完成任务 1-5，并返回分数、共振、阵营和社区结果"
      : "Continue the real Bounty 2.0 route and bring back the score, resonance, faction, and community result";
  const listStyle: CSSProperties = {
    margin: 0,
    paddingLeft: "1.15rem",
    display: "grid",
    gap: "0.42rem",
    color: "var(--color-muted)",
    lineHeight: 1.55,
    fontSize: "0.88rem"
  };

  return (
    <section id="agent-prompt" aria-labelledby="agent-prompt-heading" className="challenge-stage challenge-stage--prompt">
      <div className="challenge-shell challenge-shell--compact">
        <article
          className="challenge-section-card prompt-card"
          style={{ width: "min(100%, var(--max-panel-width))" }}
          data-emphasized={isEmphasized ? "true" : undefined}
        >
          <div className="prompt-card-header">
            <div style={{ display: "grid", gap: "0.35rem" }}>
              <p className="prompt-card-kicker">{bundle.agentPromptSection.eyebrow}</p>
              <h2 id="agent-prompt-heading" className="prompt-card-title">
                {bundle.agentPromptSection.title}
              </h2>
              <p className="prompt-card-subtitle">{bundle.agentPromptSection.summary}</p>
            </div>
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
                <span className="prompt-terminal-label">terminal</span>
              </div>
            </div>

            <p className="prompt-terminal-command">
              <span className="prompt-terminal-prefix">$</span>
              <span className="prompt-terminal-read">Read</span>
              <span className="prompt-terminal-link">{displayCommand.replace(/^Read\s+/i, "")}</span>
            </p>
            <p className="prompt-terminal-comment">
              <span className="prompt-terminal-prefix">#</span>
              {promptComment}
            </p>
          </div>

          <ol style={listStyle}>
            {featuredCard.expectedOutput.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>
      </div>
    </section>
  );
}

export default AgentPromptSection;
