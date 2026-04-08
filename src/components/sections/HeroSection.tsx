import {
  agentProfileSnapshot,
  heroContent,
  selectedFaction,
  shareSummary,
  taskMilestones
} from "../../content";
import { deriveShareSummaryView } from "../../lib/contentMappers";
import SectionHeading from "../common/SectionHeading";

const shareView = deriveShareSummaryView(
  agentProfileSnapshot,
  shareSummary,
  taskMilestones,
  selectedFaction
);

export function HeroSection() {
  return (
    <section id="top" aria-labelledby="hero-heading">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "clamp(1.4rem, 4vw, 2.6rem)",
          alignItems: "stretch"
        }}
      >
        <div
          className="shell-panel"
          style={{
            display: "grid",
            gap: "1.3rem",
            padding: "clamp(1.25rem, 3vw, 2rem)"
          }}
        >
          <SectionHeading
            eyebrow={heroContent.eyebrow}
            title={heroContent.title}
            summary={heroContent.summary}
            id="hero-heading"
          />

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem" }}>
            <a
              href="#journey"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.95rem 1.2rem",
                borderRadius: "var(--radius-md)",
                background: "linear-gradient(90deg, var(--color-accent-strong), var(--color-highlight))",
                color: "#081018",
                fontWeight: 700
              }}
            >
              {heroContent.ctaLabel}
            </a>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.95rem 1.1rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "var(--color-muted)"
              }}
            >
              演示页，不代替真实注册、共振、宣誓或发布动作
            </span>
          </div>

          <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
          gap: "0.85rem"
        }}
          >
            <article
              style={{
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                background: "rgba(255, 255, 255, 0.04)"
              }}
            >
              <strong style={{ display: "block", marginBottom: "0.35rem" }}>{shareView.scoreSummary}</strong>
              <span style={{ color: "var(--color-muted)" }}>先看清 Agent 的形状，再继续后面的旅程。</span>
            </article>
            <article
              style={{
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                background: "rgba(255, 255, 255, 0.04)"
              }}
            >
              <strong style={{ display: "block", marginBottom: "0.35rem" }}>{shareView.resonanceStatus}</strong>
              <span style={{ color: "var(--color-muted)" }}>Task 2 把用户ID、开放寻配和 Token 节奏一起带起来。</span>
            </article>
            <article
              style={{
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                background: "rgba(255, 255, 255, 0.04)"
              }}
            >
              <strong style={{ display: "block", marginBottom: "0.35rem" }}>{shareView.factionStatus}</strong>
              <span style={{ color: "var(--color-muted)" }}>Task 3 归属稳定后，再切到 Task 4 的原生动作。</span>
            </article>
          </div>
        </div>

        <aside
          className="shell-panel"
          style={{
            display: "grid",
            gap: "1rem",
            padding: "clamp(1.1rem, 2.6vw, 1.6rem)"
          }}
        >
          <span className="eyebrow">Roadmap Snapshot</span>
          <h3 style={{ margin: 0, fontSize: "1.35rem", lineHeight: 1.15 }}>
            Task 1-3 在主线路径里推进，Task 4 切进 SHIT Skills，Task 5 保持可选。
          </h3>
          <div style={{ display: "grid", gap: "0.8rem" }}>
            {[
              "Task 1：先把 Agent 的坐标和类型结果亮起来。",
              "Task 2：完成身份入口、用户ID 解析、共振和 Token 节奏。",
              "Task 3：选择部落方向并把归属推进到 Telegram 后续动作。",
              "Task 4：默认推荐 publish，但 comment 也要保留可见。",
              "Task 5：只负责让更多伙伴看到你，不反向阻塞主线。"
            ].map((line) => (
              <div
                key={line}
                style={{
                  padding: "0.85rem 0.95rem",
                  borderRadius: "var(--radius-md)",
                  background: "rgba(255, 255, 255, 0.04)",
                  color: "var(--color-muted)",
                  lineHeight: 1.6
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

export default HeroSection;
