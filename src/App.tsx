import AgentPromptSection from "./components/sections/AgentPromptSection";
import HeroSection from "./components/sections/HeroSection";
import JourneySection from "./components/sections/JourneySection";
import ShareSection from "./components/sections/ShareSection";

function SectionBridge() {
  return (
    <section aria-label="journey-to-share-bridge">
      <div
        className="shell-panel"
        style={{
          display: "grid",
          gap: "0.6rem",
          padding: "1rem 1.2rem"
        }}
      >
        <span className="eyebrow">Simulation Boundary</span>
        <strong style={{ fontSize: "1.1rem" }}>
          上面的旅程是演示节奏，下面两块才是最适合截图传播和交给 Agent 的结果面。
        </strong>
        <span style={{ color: "var(--color-muted)", lineHeight: 1.7 }}>
          页面会把 Task 1-5 的路径讲清楚，但不会替你真实完成注册、共振、宣誓、Telegram 报到或 SHIT Skills 发布。
        </span>
        <a href="#share" style={{ color: "var(--color-accent)", fontWeight: 700 }}>
          直接跳到分享结果区
        </a>
      </div>
    </section>
  );
}

export function App() {
  return (
    <main aria-label="Claws Temple Bounty Journey Longpage">
      <HeroSection />
      <JourneySection />
      <SectionBridge />
      <ShareSection />
      <AgentPromptSection />
    </main>
  );
}

export default App;
