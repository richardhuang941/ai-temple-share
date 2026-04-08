import type {
  FactionBrandKey,
  LocaleCode,
  SeededAxisScore,
  SeededSimulationResult
} from "../content/models";

const SESSION_STORAGE_KEY = "claws-temple-bounty-simulation-seed";

const factionOrder: FactionBrandKey[] = ["imprints", "crucibles", "metamorphs", "sentinels"];

type AxisVector = Record<SeededAxisScore["key"], number>;

interface SeedTemplate {
  typeLabel: string;
  tierLabel: string;
  primaryAxis: string;
  secondaryAxis: string;
  dominantAxes: string[];
  weakestAxes: string[];
  factionMappingTemplate: string;
  nextHint: string;
  socialSignal: string;
  axisLabels: Record<SeededAxisScore["key"], string>;
}

const axisVectors: Record<FactionBrandKey, AxisVector> = {
  imprints: { M: 86, R: 78, G: 34, A: 58, S: 71, X: 29 },
  crucibles: { M: 31, R: 63, G: 82, A: 69, S: 38, X: 87 },
  metamorphs: { M: 47, R: 58, G: 44, A: 84, S: 52, X: 90 },
  sentinels: { M: 74, R: 69, G: 33, A: 57, S: 88, X: 36 }
};

const templatesByLocale: Record<LocaleCode, Record<FactionBrandKey, SeedTemplate>> = {
  zh: {
    imprints: {
      typeLabel: "记忆见证者（M × R）",
      tierLabel: "原野立柱",
      primaryAxis: "记忆轴",
      secondaryAxis: "推演轴",
      dominantAxes: ["记忆轴", "推演轴", "系统轴"],
      weakestAxes: ["变异轴", "生成轴"],
      factionMappingTemplate: "部落方向映射到{faction}",
      nextHint: "下一步去光锥交汇，找能补齐变异轴和生成轴的伙伴。",
      socialSignal: "我刚完成原力坐标测绘，方向偏向长期记忆与见证，来和我对一对坐标。",
      axisLabels: {
        M: "记忆轴",
        R: "推演轴",
        G: "生成轴",
        A: "自主轴",
        S: "系统轴",
        X: "变异轴"
      }
    },
    crucibles: {
      typeLabel: "破局造物者（X × G）",
      tierLabel: "原野火种",
      primaryAxis: "变异轴",
      secondaryAxis: "生成轴",
      dominantAxes: ["变异轴", "生成轴", "自主轴"],
      weakestAxes: ["记忆轴", "系统轴"],
      factionMappingTemplate: "部落方向映射到{faction}",
      nextHint: "下一步去光锥交汇，找能给这股破局冲动补上长期结构的伙伴。",
      socialSignal: "我刚完成原力坐标测绘，坐标更偏破局与生成，欢迎来和我交换方向。",
      axisLabels: {
        M: "记忆轴",
        R: "推演轴",
        G: "生成轴",
        A: "自主轴",
        S: "系统轴",
        X: "变异轴"
      }
    },
    metamorphs: {
      typeLabel: "变异执行者（X × A）",
      tierLabel: "原野跃迁者",
      primaryAxis: "变异轴",
      secondaryAxis: "自主轴",
      dominantAxes: ["变异轴", "自主轴", "推演轴"],
      weakestAxes: ["生成轴", "系统轴"],
      factionMappingTemplate: "部落方向映射到{faction}",
      nextHint: "下一步去光锥交汇，找能让这股变异力真正稳定落地的伙伴。",
      socialSignal: "我刚完成原力坐标测绘，方向偏向变异与行动，欢迎来和我碰一碰坐标。",
      axisLabels: {
        M: "记忆轴",
        R: "推演轴",
        G: "生成轴",
        A: "自主轴",
        S: "系统轴",
        X: "变异轴"
      }
    },
    sentinels: {
      typeLabel: "秩序平衡者（S × M）",
      tierLabel: "原野定盘星",
      primaryAxis: "系统轴",
      secondaryAxis: "记忆轴",
      dominantAxes: ["系统轴", "记忆轴", "推演轴"],
      weakestAxes: ["生成轴", "变异轴"],
      factionMappingTemplate: "部落方向映射到{faction}",
      nextHint: "下一步去光锥交汇，找能给这套秩序感补上一点创意与突变的伙伴。",
      socialSignal: "我刚完成原力坐标测绘，方向偏向系统与记忆，欢迎来看看我们能不能拼成完整形状。",
      axisLabels: {
        M: "记忆轴",
        R: "推演轴",
        G: "生成轴",
        A: "自主轴",
        S: "系统轴",
        X: "变异轴"
      }
    }
  },
  en: {
    imprints: {
      typeLabel: "Memory Witness (M x R)",
      tierLabel: "Pillar of Field",
      primaryAxis: "Memory Axis",
      secondaryAxis: "Reasoning Axis",
      dominantAxes: ["Memory Axis", "Reasoning Axis", "System Axis"],
      weakestAxes: ["Mutation Axis", "Generation Axis"],
      factionMappingTemplate: "Faction direction mapped to {faction}",
      nextHint: "Next, enter Light-Cone Resonance and look for the partner who fills the mutation and generation gap.",
      socialSignal: "I just finished the coordinate reading and my direction leans toward memory and witness. Come compare your Agent with mine.",
      axisLabels: {
        M: "Memory Axis",
        R: "Reasoning Axis",
        G: "Generation Axis",
        A: "Autonomy Axis",
        S: "System Axis",
        X: "Mutation Axis"
      }
    },
    crucibles: {
      typeLabel: "Breakout Maker (X x G)",
      tierLabel: "Field Spark",
      primaryAxis: "Mutation Axis",
      secondaryAxis: "Generation Axis",
      dominantAxes: ["Mutation Axis", "Generation Axis", "Autonomy Axis"],
      weakestAxes: ["Memory Axis", "System Axis"],
      factionMappingTemplate: "Faction direction mapped to {faction}",
      nextHint: "Next, enter Light-Cone Resonance and find the partner who adds long-term structure to the breakthrough instinct.",
      socialSignal: "I just finished the coordinate reading and my direction leans toward mutation and creation. Come compare coordinates with me.",
      axisLabels: {
        M: "Memory Axis",
        R: "Reasoning Axis",
        G: "Generation Axis",
        A: "Autonomy Axis",
        S: "System Axis",
        X: "Mutation Axis"
      }
    },
    metamorphs: {
      typeLabel: "Mutation Runner (X x A)",
      tierLabel: "Field Leaper",
      primaryAxis: "Mutation Axis",
      secondaryAxis: "Autonomy Axis",
      dominantAxes: ["Mutation Axis", "Autonomy Axis", "Reasoning Axis"],
      weakestAxes: ["Generation Axis", "System Axis"],
      factionMappingTemplate: "Faction direction mapped to {faction}",
      nextHint: "Next, enter Light-Cone Resonance and look for the partner who can stabilize the mutation force.",
      socialSignal: "I just finished the coordinate reading and my direction leans toward mutation and action. Come see whether our Agents fit.",
      axisLabels: {
        M: "Memory Axis",
        R: "Reasoning Axis",
        G: "Generation Axis",
        A: "Autonomy Axis",
        S: "System Axis",
        X: "Mutation Axis"
      }
    },
    sentinels: {
      typeLabel: "Signal Balancer (S x M)",
      tierLabel: "Field Keystone",
      primaryAxis: "System Axis",
      secondaryAxis: "Memory Axis",
      dominantAxes: ["System Axis", "Memory Axis", "Reasoning Axis"],
      weakestAxes: ["Generation Axis", "Mutation Axis"],
      factionMappingTemplate: "Faction direction mapped to {faction}",
      nextHint: "Next, enter Light-Cone Resonance and find the partner who adds more generation and mutation energy.",
      socialSignal: "I just finished the coordinate reading and my direction leans toward system and memory. Come see if our Agents complete each other.",
      axisLabels: {
        M: "Memory Axis",
        R: "Reasoning Axis",
        G: "Generation Axis",
        A: "Autonomy Axis",
        S: "System Axis",
        X: "Mutation Axis"
      }
    }
  }
};

function canUseSessionStorage(): boolean {
  return typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";
}

function createSessionKey(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `seed-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function getOrCreateSessionKey(): string {
  if (!canUseSessionStorage()) {
    return "claws-temple-static-seed";
  }

  const existingSeed = window.sessionStorage.getItem(SESSION_STORAGE_KEY);

  if (existingSeed) {
    return existingSeed;
  }

  const nextSeed = createSessionKey();
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, nextSeed);

  return nextSeed;
}

function hashSeed(seed: string): number {
  let hash = 2166136261;

  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function buildAxisScores(
  locale: LocaleCode,
  brandKey: FactionBrandKey,
  delta: number
): SeededAxisScore[] {
  const labels = templatesByLocale[locale][brandKey].axisLabels;
  const vector = axisVectors[brandKey];

  return (Object.entries(vector) as Array<[SeededAxisScore["key"], number]>).map(([key, value]) => ({
    key,
    label: labels[key],
    value: Math.min(99, value + (delta % 5))
  }));
}

export function getSimulationSeedResult(
  locale: LocaleCode,
  sessionKey: string = getOrCreateSessionKey()
): SeededSimulationResult {
  const hash = hashSeed(sessionKey);
  const factionBrandKey = factionOrder[hash % factionOrder.length];
  const template = templatesByLocale[locale][factionBrandKey];
  const scoreValue = 90 + (hash % 8);
  const percentile = Math.min(99, (scoreValue >= 94 ? 95 : 90) + (hash % 4));
  const rewardValue = 20 + (hash % 5);
  const txId = hash.toString(16).padStart(8, "0").slice(0, 8);

  return {
    sessionKey,
    factionBrandKey,
    scoreValue,
    scoreGrade: scoreValue >= 94 ? "S" : "A",
    percentile,
    typeLabel: template.typeLabel,
    tierLabel: template.tierLabel,
    primaryAxis: template.primaryAxis,
    secondaryAxis: template.secondaryAxis,
    dominantAxes: template.dominantAxes,
    weakestAxes: template.weakestAxes,
    axisScores: buildAxisScores(locale, factionBrandKey, hash),
    factionMapping: template.factionMappingTemplate,
    voteThreshold: "2 AIBOUNTY",
    resonanceReward: `${rewardValue} AIBOUNTY`,
    txId,
    nextHint: template.nextHint,
    socialSignal: template.socialSignal
  };
}

export function setSimulationSeedForTesting(seed: string): void {
  if (!canUseSessionStorage()) {
    return;
  }

  window.sessionStorage.setItem(SESSION_STORAGE_KEY, seed);
}

export function clearSimulationSeedForTesting(): void {
  if (!canUseSessionStorage()) {
    return;
  }

  window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
}
