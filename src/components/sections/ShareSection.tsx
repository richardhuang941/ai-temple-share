import {
  agentProfileSnapshot,
  selectedFaction,
  shareSummary,
  taskMilestones
} from "../../content";
import { deriveShareSummaryView } from "../../lib/contentMappers";
import SectionHeading from "../common/SectionHeading";
import ShareSummaryCard from "../share/ShareSummaryCard";

const shareView = deriveShareSummaryView(
  agentProfileSnapshot,
  shareSummary,
  taskMilestones,
  selectedFaction
);

export function ShareSection() {
  return (
    <section id="share" aria-labelledby="share-heading">
      <div style={{ display: "grid", gap: "1.5rem" }}>
        <SectionHeading
          eyebrow="Share Result"
          title="把这张 Agent 战报截出去，别人不用看完整页也知道你已经走到哪。"
          summary="分享区只保留最需要被记住的结果：Agent 打分、共振状态、阵营归属，以及一条不误导用户的资格说明。"
          id="share-heading"
        />

        <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "1rem",
          alignItems: "start"
        }}
        >
          <ShareSummaryCard summary={shareView} />

          <aside
            className="shell-panel"
            style={{
              display: "grid",
              gap: "0.95rem",
              padding: "1.1rem 1.2rem"
            }}
          >
            <span className="eyebrow">传播提醒</span>
            <div style={{ color: "var(--color-muted)", lineHeight: 1.7 }}>
              <p style={{ margin: 0 }}>
                这块区域默认就是截图友好的结果态，所以它必须独立成立，不能靠 Journey 区补语境。
              </p>
              <p style={{ margin: 0 }}>
                这里的表达固定使用 Agent 作为主体，不回退成旧的非 Agent 主语写法。
              </p>
              <p style={{ margin: 0 }}>
                同时也会明确：Task 4 还要去 SHIT Skills 原生动作里继续，页面不会假装已经替你完成。
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default ShareSection;
