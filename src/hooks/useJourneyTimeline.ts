import { startTransition, useEffect, useEffectEvent, useState } from "react";
import type { SimulationTimelineState, TaskMilestone } from "../content";
import { deriveCurrentTaskHint, deriveJourneyMilestones } from "../lib/contentMappers";
import {
  advanceTimeline,
  createInitialTimelineState,
  getTimelineProgress,
  jumpToTask,
  restartTimeline
} from "../lib/timeline";
import { useReducedMotion } from "./useReducedMotion";

interface UseJourneyTimelineOptions {
  cycleDurationMs?: number;
  isAutoplay?: boolean;
}

interface UseJourneyTimelineResult {
  timeline: SimulationTimelineState;
  progress: number;
  derivedTasks: ReturnType<typeof deriveJourneyMilestones>;
  currentHint: ReturnType<typeof deriveCurrentTaskHint>;
  advance: () => void;
  restart: () => void;
  goToTask: (taskIndex: number) => void;
  setAutoplay: (isAutoplay: boolean) => void;
}

export function useJourneyTimeline(
  tasks: TaskMilestone[],
  options?: UseJourneyTimelineOptions
): UseJourneyTimelineResult {
  const isReducedMotion = useReducedMotion();
  const [timeline, setTimeline] = useState<SimulationTimelineState>(() =>
    createInitialTimelineState(tasks, {
      cycleDurationMs: options?.cycleDurationMs,
      isAutoplay: options?.isAutoplay,
      isReducedMotion
    })
  );

  useEffect(() => {
    setTimeline((previousTimeline) => ({
      ...previousTimeline,
      isReducedMotion,
      isAutoplay: isReducedMotion ? false : previousTimeline.isAutoplay,
      cycleDurationMs: options?.cycleDurationMs ?? previousTimeline.cycleDurationMs
    }));
  }, [isReducedMotion, options?.cycleDurationMs]);

  const applyAdvance = useEffectEvent(() => {
    startTransition(() => {
      setTimeline((previousTimeline) => advanceTimeline(previousTimeline, tasks));
    });
  });

  useEffect(() => {
    if (!timeline.isAutoplay || timeline.isReducedMotion || timeline.isComplete) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      applyAdvance();
    }, timeline.cycleDurationMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    applyAdvance,
    timeline.cycleDurationMs,
    timeline.currentStageIndex,
    timeline.currentTaskIndex,
    timeline.isAutoplay,
    timeline.isComplete,
    timeline.isReducedMotion
  ]);

  const advance = (): void => {
    startTransition(() => {
      setTimeline((previousTimeline) => advanceTimeline(previousTimeline, tasks));
    });
  };

  const restart = (): void => {
    startTransition(() => {
      setTimeline((previousTimeline) => restartTimeline(previousTimeline, tasks));
    });
  };

  const goToTask = (taskIndex: number): void => {
    startTransition(() => {
      setTimeline((previousTimeline) => jumpToTask(previousTimeline, tasks, taskIndex));
    });
  };

  const setAutoplay = (isAutoplay: boolean): void => {
    startTransition(() => {
      setTimeline((previousTimeline) => ({
        ...previousTimeline,
        isAutoplay: previousTimeline.isReducedMotion ? false : isAutoplay
      }));
    });
  };

  const derivedTasks = deriveJourneyMilestones(tasks, timeline);
  const currentHint = deriveCurrentTaskHint(tasks, timeline);
  const progress = getTimelineProgress(timeline, tasks);

  return {
    timeline,
    progress,
    derivedTasks,
    currentHint,
    advance,
    restart,
    goToTask,
    setAutoplay
  };
}
