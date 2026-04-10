import {
  sbtiDimensionExplanations,
  sbtiDimensionMeta,
  sbtiDimensionOrder,
  sbtiDrunkTriggerQuestionId,
  sbtiNormalTypes,
  sbtiQuestions,
  sbtiSpecialQuestions,
  sbtiTypeImages,
  sbtiTypeLibrary
} from "../../content/sbti";

export type SbtiDimensionKey = (typeof sbtiDimensionOrder)[number];
export type SbtiLevel = "L" | "M" | "H";
export type SbtiAnswerMap = Record<string, number>;
export type SbtiQuestion = (typeof sbtiQuestions)[number];
export type SbtiSpecialQuestion = (typeof sbtiSpecialQuestions)[number];
export type SbtiRenderableQuestion = SbtiQuestion | SbtiSpecialQuestion;
export type SbtiTypeCode = keyof typeof sbtiTypeLibrary;

export interface SbtiRankedType {
  code: string;
  cn: string;
  intro: string;
  desc: string;
  distance: number;
  exact: number;
  similarity: number;
  imageSrc?: string;
}

export interface SbtiAssessmentResult {
  rawScores: Record<SbtiDimensionKey, number>;
  levels: Record<SbtiDimensionKey, SbtiLevel>;
  ranked: SbtiRankedType[];
  bestNormal: SbtiRankedType;
  finalType: SbtiRankedType;
  modeKicker: string;
  badge: string;
  sub: string;
  special: boolean;
  secondaryType: SbtiRankedType | null;
  funNote: string;
}

export interface SbtiDimensionSummary {
  key: SbtiDimensionKey;
  name: string;
  model: string;
  level: SbtiLevel;
  rawScore: number;
  explanation: string;
}

const levelToNumeric: Record<SbtiLevel, number> = {
  L: 1,
  M: 2,
  H: 3
};

export function shuffleSbtiQuestions(random = Math.random): SbtiQuestion[] {
  const arr = [...sbtiQuestions];

  for (let index = arr.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [arr[index], arr[swapIndex]] = [arr[swapIndex], arr[index]];
  }

  return arr;
}

export function createSbtiQuestionSession(random = Math.random): SbtiRenderableQuestion[] {
  const shuffledRegular = shuffleSbtiQuestions(random);
  const insertIndex = Math.floor(random() * shuffledRegular.length) + 1;

  return [
    ...shuffledRegular.slice(0, insertIndex),
    sbtiSpecialQuestions[0],
    ...shuffledRegular.slice(insertIndex)
  ];
}

export function getVisibleSbtiQuestions(
  shuffledQuestions: SbtiRenderableQuestion[],
  answers: SbtiAnswerMap
): SbtiRenderableQuestion[] {
  const visible = [...shuffledQuestions];
  const gateIndex = visible.findIndex((question) => question.id === sbtiSpecialQuestions[0].id);

  if (gateIndex !== -1 && answers[sbtiSpecialQuestions[0].id] === 3) {
    visible.splice(gateIndex + 1, 0, sbtiSpecialQuestions[1]);
  }

  return visible;
}

export function getSbtiQuestionMetaLabel(
  question: SbtiRenderableQuestion,
  locale: "zh" | "en"
): string {
  if ("special" in question && question.special) {
    return locale === "zh" ? "补充题" : "Extra";
  }

  return locale === "zh" ? "维度已隐藏" : "Dimension hidden";
}

function sumToLevel(score: number): SbtiLevel {
  if (score <= 3) {
    return "L";
  }

  if (score === 4) {
    return "M";
  }

  return "H";
}

function parsePattern(pattern: string): SbtiLevel[] {
  return pattern.replace(/-/g, "").split("") as SbtiLevel[];
}

function getDrunkTriggered(answers: SbtiAnswerMap): boolean {
  return answers[sbtiDrunkTriggerQuestionId] === 2;
}

function withImage(typeCode: string): string | undefined {
  return sbtiTypeImages[typeCode as keyof typeof sbtiTypeImages];
}

function buildRankedTypes(levels: Record<SbtiDimensionKey, SbtiLevel>): SbtiRankedType[] {
  const userVector = sbtiDimensionOrder.map((dim) => levelToNumeric[levels[dim]]);

  return sbtiNormalTypes
    .map((type) => {
      const vector = parsePattern(type.pattern).map((level) => levelToNumeric[level]);
      let distance = 0;
      let exact = 0;

      for (let index = 0; index < vector.length; index += 1) {
        const diff = Math.abs(userVector[index] - vector[index]);
        distance += diff;
        if (diff === 0) {
          exact += 1;
        }
      }

      const similarity = Math.max(0, Math.round((1 - distance / 30) * 100));
      const profile = sbtiTypeLibrary[type.code as SbtiTypeCode];

      return {
        ...profile,
        distance,
        exact,
        similarity,
        imageSrc: withImage(type.code)
      };
    })
    .sort((a, b) => {
      if (a.distance !== b.distance) {
        return a.distance - b.distance;
      }

      if (a.exact !== b.exact) {
        return b.exact - a.exact;
      }

      return b.similarity - a.similarity;
    });
}

export function computeSbtiAssessmentResult(answers: SbtiAnswerMap): SbtiAssessmentResult {
  const rawScores = Object.fromEntries(
    sbtiDimensionOrder.map((dim) => [dim, 0])
  ) as Record<SbtiDimensionKey, number>;

  for (const question of sbtiQuestions) {
    rawScores[question.dim] += Number(answers[question.id] ?? 0);
  }

  const levels = Object.fromEntries(
    sbtiDimensionOrder.map((dim) => [dim, sumToLevel(rawScores[dim])])
  ) as Record<SbtiDimensionKey, SbtiLevel>;

  const ranked = buildRankedTypes(levels);
  const bestNormal = ranked[0];
  const drunkTriggered = getDrunkTriggered(answers);

  let finalType = bestNormal;
  let modeKicker = "你的主类型";
  let badge = `匹配度 ${bestNormal.similarity}% · 精准命中 ${bestNormal.exact}/15 维`;
  let sub = "维度命中度较高，当前结果可视为你的第一人格画像。";
  let special = false;
  let secondaryType: SbtiRankedType | null = null;

  if (drunkTriggered) {
    const drunkProfile = sbtiTypeLibrary.DRUNK;
    finalType = {
      ...drunkProfile,
      distance: 0,
      exact: 15,
      similarity: 100,
      imageSrc: withImage(drunkProfile.code)
    };
    secondaryType = bestNormal;
    modeKicker = "隐藏人格已激活";
    badge = "匹配度 100% · 酒精异常因子已接管";
    sub = "乙醇亲和性过强，系统已直接跳过常规人格审判。";
    special = true;
  } else if (bestNormal.similarity < 60) {
    const fallbackProfile = sbtiTypeLibrary.HHHH;
    finalType = {
      ...fallbackProfile,
      distance: bestNormal.distance,
      exact: bestNormal.exact,
      similarity: bestNormal.similarity,
      imageSrc: withImage(fallbackProfile.code)
    };
    modeKicker = "系统强制兜底";
    badge = `标准人格库最高匹配仅 ${bestNormal.similarity}%`;
    sub = "标准人格库对你的脑回路集体罢工了，于是系统把你强制分配给了 HHHH。";
    special = true;
  }

  const funNote = special
    ? "本测试仅供娱乐。隐藏人格和傻乐兜底都属于作者故意埋的损招，请勿把它当成医学、心理学、相学、命理学或灵异学依据。"
    : "本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、招魂、算命或人生判决书。你可以笑，但别太当真。";

  return {
    rawScores,
    levels,
    ranked,
    bestNormal,
    finalType,
    modeKicker,
    badge,
    sub,
    special,
    secondaryType,
    funNote
  };
}

export function deriveSbtiDimensionSummaries(
  result: SbtiAssessmentResult
): SbtiDimensionSummary[] {
  return sbtiDimensionOrder.map((dimensionKey) => ({
    key: dimensionKey,
    name: sbtiDimensionMeta[dimensionKey].name,
    model: sbtiDimensionMeta[dimensionKey].model,
    level: result.levels[dimensionKey],
    rawScore: result.rawScores[dimensionKey],
    explanation: sbtiDimensionExplanations[dimensionKey][result.levels[dimensionKey]]
  }));
}
