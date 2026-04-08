import {
  agentProfileSnapshot,
  agentPromptCards,
  selectedFaction,
  shareSummary,
  taskMilestones
} from "../../src/content";
import { deriveJourneyMilestones, deriveShareSummaryView } from "../../src/lib/contentMappers";
import { createInitialTimelineState } from "../../src/lib/timeline";

describe("content mappers", () => {
  it("derives a public share summary with Agent as the subject", () => {
    const view = deriveShareSummaryView(
      agentProfileSnapshot,
      shareSummary,
      taskMilestones,
      selectedFaction
    );

    expect(view.title).toContain("Agent");
    expect(view.scoreSummary).toContain("Agent 打分 92 / 100");
    expect(view.resonanceStatus).toBe("已共振");
    expect(view.factionStatus).toContain(selectedFaction.displayName);
    expect(view.supportingFacts).toEqual(
      expect.arrayContaining(["20+ AIBOUNTY 节奏已亮起", "Telegram 报到文案已准备"])
    );
  });

  it("keeps the five tasks in the exact branded order", () => {
    expect(taskMilestones.map((task) => task.taskId)).toEqual([
      "task-1",
      "task-2",
      "task-3",
      "task-4",
      "task-5"
    ]);
    expect(taskMilestones.map((task) => task.brandedName)).toEqual([
      "原力坐标测绘",
      "光锥交汇",
      "原野部落归属",
      "奇物志",
      "社交寻配"
    ]);
  });

  it("preserves Task 4 as external flow and Task 5 as optional", () => {
    expect(taskMilestones[3].isExternalFlow).toBe(true);
    expect(taskMilestones[4].isOptional).toBe(true);
  });

  it("maps the initial journey state into one active task and pending future tasks", () => {
    const timeline = createInitialTimelineState(taskMilestones);
    const derivedTasks = deriveJourneyMilestones(taskMilestones, timeline);

    expect(derivedTasks[0].state).toBe("active");
    expect(derivedTasks[0].stages[0].status).toBe("active");
    expect(derivedTasks[1].state).toBe("upcoming");
    expect(derivedTasks[1].stages.every((stage) => stage.status === "pending")).toBe(true);
  });

  it("ships copy-ready Agent prompt cards that point to the real skill repo", () => {
    expect(agentPromptCards).toHaveLength(2);
    expect(agentPromptCards[0].referenceRepo).toContain("Claws-Temple/claws-temple-bounty2.0-skills");
    expect(agentPromptCards[0].promptBody).toContain("Read GitHub - Claws-Temple/claws-temple-bounty2.0-skills");
  });
});
