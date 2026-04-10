import {
  computeSbtiAssessmentResult,
  type SbtiAnswerMap,
  type SbtiDimensionKey,
  type SbtiLevel
} from "../../src/lib/sbti/engine";
import { sbtiDimensionOrder, sbtiNormalTypes, sbtiQuestions } from "../../src/content/sbti";

const scorePairByLevel: Record<SbtiLevel, [number, number]> = {
  L: [1, 2],
  M: [2, 2],
  H: [3, 2]
};

const questionIdsByDimension = Object.fromEntries(
  sbtiDimensionOrder.map((dimensionKey) => [
    dimensionKey,
    sbtiQuestions.filter((question) => question.dim === dimensionKey).map((question) => question.id)
  ])
) as Record<SbtiDimensionKey, string[]>;

function buildAnswersForPattern(pattern: string): SbtiAnswerMap {
  const levels = pattern.replace(/-/g, "").split("") as SbtiLevel[];
  const answers: SbtiAnswerMap = {
    drink_gate_q1: 1
  };

  sbtiDimensionOrder.forEach((dimensionKey, index) => {
    const [firstQuestionId, secondQuestionId] = questionIdsByDimension[dimensionKey];
    const [firstScore, secondScore] = scorePairByLevel[levels[index]];

    answers[firstQuestionId] = firstScore;
    answers[secondQuestionId] = secondScore;
  });

  return answers;
}

describe("sbti engine", () => {
  it("matches a perfect pattern back to the corresponding normal type", () => {
    const ctrlPattern = sbtiNormalTypes.find((type) => type.code === "CTRL")?.pattern;
    expect(ctrlPattern).toBeTruthy();

    const result = computeSbtiAssessmentResult(buildAnswersForPattern(ctrlPattern as string));

    expect(result.finalType.code).toBe("CTRL");
    expect(result.bestNormal.code).toBe("CTRL");
    expect(result.special).toBe(false);
    expect(result.badge).toContain("15/15");
  });

  it("lets the drunk trigger override the best normal match while keeping the secondary type", () => {
    const ctrlPattern = sbtiNormalTypes.find((type) => type.code === "CTRL")?.pattern;
    const answers = buildAnswersForPattern(ctrlPattern as string);
    answers.drink_gate_q1 = 3;
    answers.drink_gate_q2 = 2;

    const result = computeSbtiAssessmentResult(answers);

    expect(result.finalType.code).toBe("DRUNK");
    expect(result.special).toBe(true);
    expect(result.secondaryType?.code).toBe("CTRL");
    expect(result.badge).toContain("100%");
  });
});
