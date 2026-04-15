import {
  getAgentProfileSnapshot,
  getAgentPromptCards,
  getLocalizedLongpageContent,
  getSelectedFaction,
  getShareSummary,
  getTaskMilestones
} from "../../src/content";
import { clearSimulationSeedForTesting, setSimulationSeedForTesting } from "../../src/lib/simulationSeed";
import { deriveJourneyMilestones, deriveShareSummaryView } from "../../src/lib/contentMappers";
import { createInitialTimelineState } from "../../src/lib/timeline";

describe("content mappers", () => {
  beforeEach(() => {
    clearSimulationSeedForTesting();
    setSimulationSeedForTesting("seed-1");
  });

  afterEach(() => {
    clearSimulationSeedForTesting();
  });

  it("derives a public share summary with a deterministic score and faction result", () => {
    const agentProfile = getAgentProfileSnapshot("zh");
    const tasks = getTaskMilestones("zh");
    const selectedFaction = getSelectedFaction("zh");
    const view = deriveShareSummaryView(
      agentProfile,
      getShareSummary("zh"),
      tasks,
      selectedFaction
    );

    expect(view.title).toContain("Agent Temple AI");
    expect(view.scoreSummary).toContain(`${agentProfile.scoreValue} / 100`);
    expect(view.scoreSummary).toContain(agentProfile.scoreGrade);
    expect(view.factionStatus).toContain(selectedFaction.displayName);
    expect(view.supportingFacts).toEqual(
      expect.arrayContaining([
        "方向：变异体",
        "共振结果：成功",
        "已加入变异体 · 剩余 4 AIBOUNTY"
      ])
    );
  });

  it("keeps the five tasks in the intended branded order without the SBTI finale", () => {
    const tasks = getTaskMilestones("zh");
    const repeatedTasks = getTaskMilestones("zh");

    expect(tasks.map((task) => task.taskId)).toEqual([
      "task-1",
      "task-2",
      "task-3",
      "task-4",
      "task-5"
    ]);
    expect(tasks.map((task) => task.brandedName)).toEqual([
      "原力坐标测绘",
      "光锥交汇",
      "原野部落归属",
      "奇物志",
      "社交寻配"
    ]);
    expect(tasks[2].stages.map((stage) => stage.stageId)).toContain("task-3-leaderboard");
    expect(tasks[3].isExternalFlow).toBe(true);
    expect(tasks[4].isOptional).toBe(true);
    expect(tasks[4].completionBadge).toBe(repeatedTasks[4].completionBadge);
    expect(tasks.some((task) => task.brandedName.includes("SBTI"))).toBe(false);
  });

  it("maps the initial journey state into one active task and pending future tasks", () => {
    const tasks = getTaskMilestones("zh");
    const timeline = createInitialTimelineState(tasks);
    const derivedTasks = deriveJourneyMilestones(tasks, timeline);

    expect(derivedTasks[0].state).toBe("active");
    expect(derivedTasks[0].stages[0].status).toBe("active");
    expect(derivedTasks[0].stages[1].status).toBe("pending");
    expect(derivedTasks[1].state).toBe("upcoming");
    expect(derivedTasks[1].stages.every((stage) => stage.status === "pending")).toBe(true);
  });

  it("ships copy-ready Agent prompt cards that point to the real skill repo", () => {
    const agentPromptCards = getAgentPromptCards("zh");
    const tasks = getTaskMilestones("zh");

    expect(agentPromptCards).toHaveLength(2);
    expect(agentPromptCards[0].referenceRepo).toContain("Claws-Temple/ai-temple-bounty2.0-lite-skills");
    expect(agentPromptCards[0].promptBody).toContain("Read GitHub - Claws-Temple/ai-temple-bounty2.0-lite-skills");
    expect(agentPromptCards[0].expectedOutput).toContain("Agent 会按 Skill 路径继续推进");
    expect(agentPromptCards[0].promptBody).not.toContain("API-light");
    expect(tasks[1].summary).not.toContain("lite");
    expect(tasks[2].summary).not.toContain("旧版");
  });

  it("can derive an English share summary from the localized content bundle", () => {
    const localized = getLocalizedLongpageContent("en");
    const view = deriveShareSummaryView(
      localized.agentProfile,
      localized.shareSummary,
      localized.tasks,
      localized.selectedFaction
    );

    expect(localized.hero.title).toContain("Agent");
    expect(view.scoreSummary).toContain(`${localized.agentProfile.scoreValue} / 100`);
    expect(view.scoreSummary).toContain(localized.agentProfile.scoreGrade);
    expect(view.resonanceStatus).toBe("Resonance completed");
    expect(view.factionStatus).toContain("The Mutant");
    expect(view.supportingFacts).toEqual(
      expect.arrayContaining([
        "Direction: The Mutant",
        "Resonance outcome: success",
        "Joined The Mutant · 4 AIBOUNTY left"
      ])
    );
  });
});
