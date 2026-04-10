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
        "用户ID 已解析",
        "已满足 2 AIBOUNTY 门槛"
      ])
    );
  });

  it("keeps the six tasks in the exact branded order and appends the stable LBTI finale", () => {
    const tasks = getTaskMilestones("zh");
    const repeatedTasks = getTaskMilestones("zh");

    expect(tasks.map((task) => task.taskId)).toEqual([
      "task-1",
      "task-2",
      "task-3",
      "task-4",
      "task-5",
      "task-6"
    ]);
    expect(tasks.map((task) => task.brandedName)).toEqual([
      "原力坐标测绘",
      "光锥交汇",
      "原野部落归属",
      "奇物志",
      "社交寻配",
      "LBTI 小龙虾人格"
    ]);
    expect(tasks[2].stages.map((stage) => stage.stageId)).toContain("task-3-threshold");
    expect(tasks[3].isExternalFlow).toBe(true);
    expect(tasks[4].isOptional).toBe(true);
    expect(tasks[5].completionBadge).toContain("·");
    expect(tasks[5].completionBadge).toBe(repeatedTasks[5].completionBadge);
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

    expect(agentPromptCards).toHaveLength(2);
    expect(agentPromptCards[0].referenceRepo).toContain("Claws-Temple/claws-temple-bounty2.0-skills");
    expect(agentPromptCards[0].promptBody).toContain("Read GitHub - Claws-Temple/claws-temple-bounty2.0-skills");
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
        "2 AIBOUNTY threshold ready"
      ])
    );
  });
});
