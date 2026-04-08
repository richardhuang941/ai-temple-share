import { renderHook } from "@testing-library/react";
import { taskMilestones } from "../../src/content";
import { useJourneyTimeline } from "../../src/hooks/useJourneyTimeline";
import {
  advanceTimeline,
  createInitialTimelineState,
  getTimelineProgress,
  jumpToTask,
  startTimeline
} from "../../src/lib/timeline";

function installMatchMediaMock(matches: boolean): void {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false
    })
  });
}

describe("timeline engine", () => {
  it("advances in order until the share focus is reached", () => {
    let state = startTimeline(createInitialTimelineState(taskMilestones, { isAutoplay: false }), taskMilestones);
    const totalStages = taskMilestones.reduce((sum, task) => sum + task.stages.length, 0);

    for (let index = 0; index < totalStages; index += 1) {
      state = advanceTimeline(state, taskMilestones);
    }

    expect(state.isComplete).toBe(true);
    expect(state.focusTarget).toBe("share");
    expect(getTimelineProgress(state, taskMilestones)).toBe(1);
  });

  it("resets the stage index when manually jumping to another task", () => {
    const advanced = advanceTimeline(startTimeline(createInitialTimelineState(taskMilestones), taskMilestones), taskMilestones);
    const jumped = jumpToTask(advanced, taskMilestones, 3);

    expect(jumped.currentTaskIndex).toBe(3);
    expect(jumped.currentStageIndex).toBe(0);
    expect(jumped.isComplete).toBe(false);
  });

  it("turns autoplay off when reduced motion is preferred", () => {
    installMatchMediaMock(true);

    const { result } = renderHook(() =>
      useJourneyTimeline(taskMilestones, {
        cycleDurationMs: 100,
        isAutoplay: true
      })
    );

    expect(result.current.timeline.isReducedMotion).toBe(true);
    expect(result.current.timeline.isAutoplay).toBe(false);
  });

  it("starts in an idle state before the user triggers the simulation", () => {
    const state = createInitialTimelineState(taskMilestones);

    expect(state.hasStarted).toBe(false);
    expect(state.isAutoplay).toBe(false);
    expect(getTimelineProgress(state, taskMilestones)).toBe(0);
  });
});
