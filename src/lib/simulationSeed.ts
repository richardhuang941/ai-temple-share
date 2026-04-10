import type {
  FactionBrandKey,
  LbtiProfile,
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

const lbtiProfilesByLocale: Record<LocaleCode, LbtiProfile[]> = {
  zh: [
    {
      code: "DEAD-SHELL",
      displayName: "壳死人",
      summary: "精神已蜕壳，肉体还在泥里爬。",
      bullets: ["白天钻洞装死，晚上也不想动。", "世界像锅沸水，这只虾只想放弃挣扎。"]
    },
    {
      code: "CLAW-MALO",
      displayName: "钳吗喽",
      summary: "底层小透明虾，钳子再大也只敢夹水草。",
      bullets: ["拒绝内卷、拒绝抢食、拒绝打洞竞赛。", "选择在锅底安静变红。"]
    },
    {
      code: "SHIT-MUD",
      displayName: "烂泥愤虾",
      summary: "嘴上骂水质烂，身体却还在默默抢食挖洞。",
      bullets: ["表面愤世嫉俗，行动上却顽强得很。", "骂着世界烂，活得比谁都硬。"]
    },
    {
      code: "IMSB-LOBE",
      displayName: "断钳自虐虾",
      summary: "一点风吹草动就先怪自己。",
      bullets: ["食物先让、洞穴先让、打架先怕。", "再生钳会变小，内耗永远更大。"]
    },
    {
      code: "SOLO-CAVE",
      displayName: "孤洞虾",
      summary: "一个洞、一把泥、一辈子不想社交。",
      bullets: ["拒绝同类入侵，也拒绝组队觅食。", "洞小，容不下第二只虾。"]
    },
    {
      code: "FUCK-CLAW",
      displayName: "暴钳草虾",
      summary: "见谁夹谁，石头都要夹两爪。",
      bullets: ["泥里没有规则，掀翻才是秩序。", "就算软壳期也要装出硬壳气场。"]
    },
    {
      code: "SEXY-RED",
      displayName: "迷之自信红虾",
      summary: "锅没沸，我先红；人没吃，我先火。",
      bullets: ["走路横着晃，钳子甩成 T 台步。", "还没下锅，就觉得自己已经全网爆红。"]
    },
    {
      code: "RUN-LOB",
      displayName: "逃狱疯虾",
      summary: "一辈子都在翻墙、越狱、爬岸、逃离池塘。",
      bullets: ["水流一动就想跑，灯光一亮就想躲。", "去哪都是自由的泥。"]
    },
    {
      code: "ATM-SOFT",
      displayName: "软壳冤种虾",
      summary: "永远在蜕壳，永远在被欺负，永远在付出。",
      bullets: ["钳子让给别人，洞穴让给强者。", "我软，但我善良；我烂，但我纯粹。"]
    },
    {
      code: "NIGHT-EMPTY",
      displayName: "夜行空壳虾",
      summary: "白天死睡，夜里瞎爬，像只没装灵魂的壳。",
      bullets: ["看似在觅食，其实只是在游荡。", "昼伏夜出，心里一直空着。"]
    }
  ],
  en: [
    {
      code: "DEAD-SHELL",
      displayName: "Dead Shell",
      summary: "The spirit has already molted away while the body still drags through the mud.",
      bullets: ["Plays dead in the daytime and still does not want to move at night.", "Treats the world like boiling water and gives up early."]
    },
    {
      code: "CLAW-MALO",
      displayName: "Claw Malo",
      summary: "A tiny background lobster that still only dares to pinch seaweed.",
      bullets: ["Rejects grinding, grabbing, and tunnel competition.", "Quietly reddens at the bottom of the pot."]
    },
    {
      code: "SHIT-MUD",
      displayName: "Shit Mud",
      summary: "Complains about the mud and still keeps digging, eating, and hardening up.",
      bullets: ["Curses the world while surviving harder than everyone else.", "Angry on the surface, resilient underneath."]
    },
    {
      code: "IMSB-LOBE",
      displayName: "IMSB Lobe",
      summary: "Blames itself first whenever anything moves.",
      bullets: ["Yields food, space, and conflict before anyone asks.", "The regrown claw gets smaller while the self-doubt gets bigger."]
    },
    {
      code: "SOLO-CAVE",
      displayName: "Solo Cave",
      summary: "One cave, one pile of mud, zero interest in social life.",
      bullets: ["Rejects intrusion, romance, and group foraging.", "The cave is too small for a second lobster."]
    },
    {
      code: "FUCK-CLAW",
      displayName: "Fuck Claw",
      summary: "Maximum rebellion, pinches everyone, and would claw a rock twice.",
      bullets: ["There are no rules in the mud.", "Acts hard even during the soft-shell phase."]
    },
    {
      code: "SEXY-RED",
      displayName: "Sexy Red",
      summary: "Believes it will go viral before the pot even boils.",
      bullets: ["Walks sideways like a runway show.", "Assumes fame arrives before anyone takes a bite."]
    },
    {
      code: "RUN-LOB",
      displayName: "Run Lob",
      summary: "Always trying to climb out, escape, and leave the pond behind.",
      bullets: ["Any current or light becomes a reason to flee.", "Every patch of mud beyond the pond feels like freedom."]
    },
    {
      code: "ATM-SOFT",
      displayName: "ATM Soft",
      summary: "Always molting, always bullied, always giving more than it keeps.",
      bullets: ["Hands over claws, caves, and food to stronger creatures.", "Soft but sincere, ruined but still kind."]
    },
    {
      code: "NIGHT-EMPTY",
      displayName: "Night Empty",
      summary: "Sleeps through the day and wanders at night without a clear reason.",
      bullets: ["Looks like foraging, feels like drifting.", "A shell moving around with the spirit still missing."]
    }
  ]
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
  const lbtiProfile = lbtiProfilesByLocale[locale][(hash >>> 4) % lbtiProfilesByLocale[locale].length];
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
    socialSignal: template.socialSignal,
    lbtiProfile
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
