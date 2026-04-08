import { taskMilestones } from "../../content";
import JourneyTimeline from "../journey/JourneyTimeline";
import { useJourneyTimeline } from "../../hooks/useJourneyTimeline";

const helperCards = [
  {
    title: "Task 1-3",
    body: "这是主线路径，会把坐标、共振和部落归属一路推进到可公开展示的完成态。"
  },
  {
    title: "Task 4",
    body: "这一段必须切到 SHIT Skills 原生流程，本页只负责把默认 publish 与 comment 备选路线说明白。"
  },
  {
    title: "Task 5",
    body: "这一步只负责扩大可见度，不会反过来卡住主线资格。"
  }
];

export function JourneySection() {
  const { advance, currentHint, derivedTasks, goToTask, progress, restart, setAutoplay, timeline } =
    useJourneyTimeline(taskMilestones, {
      cycleDurationMs: 2200,
      isAutoplay: true
    });

  return (
    <section id="journey" aria-labelledby="journey-heading">
      <div style={{ display: "grid", gap: "1.5rem" }}>
        <div style={{ display: "grid", gap: "0.85rem", maxWidth: "48rem" }}>
          <span className="eyebrow">Journey Simulation</span>
          <h2 id="journey-heading" style={{ margin: 0, fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1 }}>
            从 Task 1 到 Task 5，duangduangduang 地把整条路径走一遍。
          </h2>
          <p style={{ margin: 0, color: "var(--color-muted)", lineHeight: 1.7 }}>
            这里不是把指令堆成一张表，而是把五个 Task 真正串成旅程。你可以顺着自动推进往下看，也可以手动切到任意一步，确认每个阶段到底亮起了什么。
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem"
          }}
        >
          {helperCards.map((card) => (
            <article
              key={card.title}
              className="shell-panel"
              style={{ padding: "1rem 1.1rem", display: "grid", gap: "0.55rem" }}
            >
              <strong>{card.title}</strong>
              <span style={{ color: "var(--color-muted)", lineHeight: 1.6 }}>{card.body}</span>
            </article>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem"
          }}
        >
          <button
            type="button"
            onClick={advance}
            style={{
              border: "1px solid rgba(142, 228, 255, 0.24)",
              background: "rgba(12, 18, 29, 0.9)",
              color: "var(--color-ink)",
              padding: "0.85rem 1.05rem",
              borderRadius: "var(--radius-md)",
              cursor: "pointer"
            }}
          >
            手动推进一格
          </button>
          <button
            type="button"
            onClick={restart}
            style={{
              border: "1px solid rgba(255, 255, 255, 0.12)",
              background: "rgba(255, 255, 255, 0.03)",
              color: "var(--color-ink)",
              padding: "0.85rem 1.05rem",
              borderRadius: "var(--radius-md)",
              cursor: "pointer"
            }}
          >
            从 Task 1 重新演示
          </button>
          <button
            type="button"
            onClick={() => setAutoplay(!timeline.isAutoplay)}
            style={{
              border: "1px solid rgba(255, 211, 107, 0.24)",
              background: "rgba(255, 211, 107, 0.08)",
              color: "var(--color-ink)",
              padding: "0.85rem 1.05rem",
              borderRadius: "var(--radius-md)",
              cursor: timeline.isReducedMotion ? "not-allowed" : "pointer",
              opacity: timeline.isReducedMotion ? 0.5 : 1
            }}
            disabled={timeline.isReducedMotion}
          >
            {timeline.isAutoplay ? "暂停自动推进" : "恢复自动推进"}
          </button>
        </div>

        <JourneyTimeline
          tasks={derivedTasks}
          progress={progress}
          currentHint={currentHint}
          isReducedMotion={timeline.isReducedMotion}
          onTaskSelect={goToTask}
        />
      </div>
    </section>
  );
}

export default JourneySection;
