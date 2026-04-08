import { agentPromptCards } from "../../content";
import CopyButton from "../common/CopyButton";
import SectionHeading from "../common/SectionHeading";

export function AgentPromptSection() {
  return (
    <section id="agent-prompt" aria-labelledby="agent-prompt-heading">
      <div style={{ display: "grid", gap: "1.5rem" }}>
        <SectionHeading
          eyebrow="Agent Handoff"
          title="把真实流程交回给 Agent，而不是把这张演示页当作终点。"
          summary="下面的 Prompt 不是泛化命令，而是专门为 Claws Temple 和 `claws-temple-bounty2.0-skills` 准备的 handoff 卡。复制出去之后，Agent 就该继续真实路径，而不是停在战报层。"
          id="agent-prompt-heading"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem"
          }}
        >
          {agentPromptCards.map((card) => (
            <article
              key={card.title}
              className="shell-panel"
              style={{
                display: "grid",
                gap: "1rem",
                padding: "1.2rem 1.25rem"
              }}
            >
              <div style={{ display: "grid", gap: "0.45rem" }}>
                <span className="eyebrow">Prompt Card</span>
                <h3 style={{ margin: 0, fontSize: "1.3rem", lineHeight: 1.15 }}>{card.title}</h3>
                <p style={{ margin: 0, color: "var(--color-muted)", lineHeight: 1.6 }}>{card.goal}</p>
              </div>

              <div style={{ display: "grid", gap: "0.55rem" }}>
                <strong>上下文</strong>
                <ul style={{ margin: 0, paddingLeft: "1.15rem", color: "var(--color-muted)", display: "grid", gap: "0.45rem" }}>
                  {card.context.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              <div
                style={{
                  padding: "0.95rem 1rem",
                  borderRadius: "var(--radius-md)",
                  background: "rgba(255, 255, 255, 0.04)"
                }}
              >
                <strong style={{ display: "block", marginBottom: "0.35rem" }}>目标仓库</strong>
                <a href={card.referenceRepo} style={{ color: "var(--color-accent)", wordBreak: "break-word" }}>
                  {card.referenceRepo}
                </a>
              </div>

              <div style={{ display: "grid", gap: "0.55rem" }}>
                <strong>Prompt 正文</strong>
                <pre
                  style={{
                    margin: 0,
                    padding: "1rem",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(8, 15, 25, 0.94)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    lineHeight: 1.65,
                    fontFamily: "var(--font-display)",
                    fontSize: "0.86rem"
                  }}
                >
                  {card.promptBody}
                </pre>
              </div>

              <div style={{ display: "grid", gap: "0.55rem" }}>
                <strong>预期输出</strong>
                <ul style={{ margin: 0, paddingLeft: "1.15rem", color: "var(--color-muted)", display: "grid", gap: "0.45rem" }}>
                  {card.expectedOutput.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", alignItems: "center" }}>
                <span style={{ color: "var(--color-muted)", lineHeight: 1.5 }}>
                  复制后就可以把这张演示页交回给 Agent，让它继续真实执行。
                </span>
                <CopyButton value={card.promptBody} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AgentPromptSection;
