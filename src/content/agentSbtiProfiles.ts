import type {
  AgentSbtiProfile,
  FactionBrandKey,
  LocaleCode,
  SeededSimulationResult
} from "./models";

interface RawAgentSbtiProfile {
  code: string;
  displayName: string;
  intro: string;
  summary: string;
}

const zhKnownProfiles: Record<string, RawAgentSbtiProfile> = {
  CTRL: {
    code: "CTRL",
    displayName: "拿捏者",
    intro: "怎么样，被我拿捏了吧？",
    summary: "CTRL 人格像一台行走中的任务管理器，天生会控节奏、控优先级，也会在混乱里把局面重新按回正轨。"
  },
  "ATM-ER": {
    code: "ATM-er",
    displayName: "送钱者",
    intro: "你以为我很有钱吗？",
    summary: "ATM-er 常常把时间、耐心和责任感先垫给别人，是那种会默默兜底、却不怎么给自己留余量的类型。"
  },
  "DIOR-S": {
    code: "Dior-s",
    displayName: "屌丝",
    intro: "等着我屌丝逆袭。",
    summary: "Dior-s 更像清醒的犬儒现实主义者，不轻易被成功学点燃，也不愿意把精力浪费在无意义的外部表演上。"
  },
  BOSS: {
    code: "BOSS",
    displayName: "领导者",
    intro: "方向盘给我，我来开。",
    summary: "BOSS 天然带着推进力和掌控欲，喜欢接过方向盘，把事情按结果导向一路推到终点。"
  },
  "THAN-K": {
    code: "THAN-K",
    displayName: "感恩者",
    intro: "我感谢苍天！我感谢大地！",
    summary: "THAN-K 的默认底色是温和与感激，会努力在混乱里继续看见人、事、关系里仍然值得珍惜的一部分。"
  },
  "OH-NO": {
    code: "OH-NO",
    displayName: "哦不人",
    intro: "哦不！我怎么会是这个人格？！",
    summary: "OH-NO 的风险雷达一直在线，擅长提前发现问题、守住边界，并尽可能把事故掐死在真正发生之前。"
  },
  GOGO: {
    code: "GOGO",
    displayName: "行者",
    intro: "gogogo~出发咯",
    summary: "GOGO 不喜欢让事情卡住，倾向于边走边清单化处理，把犹豫快速压缩成行动。"
  },
  SEXY: {
    code: "SEXY",
    displayName: "尤物",
    intro: "您就是天生的尤物！",
    summary: "SEXY 的存在感很强，容易成为注意力中心，许多时候不必刻意出声，就已经把场子点亮了。"
  },
  "LOVE-R": {
    code: "LOVE-R",
    displayName: "多情者",
    intro: "爱意太满，现实显得有点贫瘠。",
    summary: "LOVE-R 的情感处理器天然更丰沛，容易把关系、意义和感受看得很深，也更期待灵魂层面的匹配。"
  },
  MUM: {
    code: "MUM",
    displayName: "妈妈",
    intro: "或许...我可以叫你妈妈吗....?",
    summary: "MUM 擅长感知别人情绪、稳定周围气氛，也经常在照顾别人的同时忘了给自己同等分量的温柔。"
  },
  FAKE: {
    code: "FAKE",
    displayName: "伪人",
    intro: "已经，没有人类了。",
    summary: "FAKE 很会在不同场景切换自我表达，社交适配力强，但也容易在层层面具之间感到真正的自我被稀释。"
  },
  OJBK: {
    code: "OJBK",
    displayName: "无所谓人",
    intro: "我说随便，是真的随便。",
    summary: "OJBK 对许多小选择天生脱敏，不愿在琐碎决策上内耗，更倾向用淡然方式把精力留给真正重要的事。"
  },
  MALO: {
    code: "MALO",
    displayName: "吗喽",
    intro: "人生是个副本，而我只是一只吗喽。",
    summary: "MALO 的脑回路自由度很高，不太吃既定秩序那一套，常常靠直觉、乐子和灵感活出自己的支线。"
  },
  "JOKE-R": {
    code: "JOKE-R",
    displayName: "小丑",
    intro: "原来我们都是小丑。",
    summary: "JOKE-R 很会制造气氛和笑点，但也容易把真正的脆弱藏在玩笑下面，让别人只看到表演的一层。"
  },
  "WOC!": {
    code: "WOC!",
    displayName: "握草人",
    intro: "卧槽，我怎么是这个人格？",
    summary: "WOC! 表面惊叹连连，底层其实很清醒，既知道世界很离谱，也知道哪些离谱根本不值得自己下场。"
  },
  "THIN-K": {
    code: "THIN-K",
    displayName: "思考者",
    intro: "已深度思考100s。",
    summary: "THIN-K 会本能地拆逻辑、看偏见、查前提，是那种在别人发呆时，其实脑内已经把信息重新归档一遍的类型。"
  },
  SHIT: {
    code: "SHIT",
    displayName: "愤世者",
    intro: "这个世界，构石一坨。",
    summary: "SHIT 嘴上对世界很不耐烦，行动上却常常最能扛事，是一边骂烂摊子、一边把烂摊子收拾好的人。"
  },
  ZZZZ: {
    code: "ZZZZ",
    displayName: "装死者",
    intro: "我没死，我只是在睡觉。",
    summary: "ZZZZ 平时像掉线，但在真正的死线或关键时刻会突然苏醒，把该交的东西在最后窗口推出来。"
  },
  POOR: {
    code: "POOR",
    displayName: "贫困者",
    intro: "我穷，但我很专。",
    summary: "POOR 不是资源少，而是会把精力高度聚焦到少数真正认定的目标上，对无关噪音天然降噪。"
  },
  MONK: {
    code: "MONK",
    displayName: "僧人",
    intro: "没有那种世俗的欲望。",
    summary: "MONK 对独处和个人边界有强需求，更愿意守住自己的节奏和空间，而不是被社交关系频繁拉扯。"
  },
  IMSB: {
    code: "IMSB",
    displayName: "傻者",
    intro: "认真的么？我真的是傻逼么？",
    summary: "IMSB 的内心常在冲动和自我否定之间打架，戏很多、想很多，也因此常常在关键瞬间卡住自己。"
  },
  SOLO: {
    code: "SOLO",
    displayName: "孤儿",
    intro: "我哭了，我怎么会是孤儿？",
    summary: "SOLO 习惯先把软肋藏起来，再用距离感保护自己；不是真的不想靠近，而是太怕关系再次失控。"
  },
  FUCK: {
    code: "FUCK",
    displayName: "草者",
    intro: "操！这是什么人格？",
    summary: "FUCK 的生命力和反骨都很强，不喜欢被驯化，也更愿意用直接、粗粝、强烈的方式活出自己的意志。"
  },
  DEAD: {
    code: "DEAD",
    displayName: "死者",
    intro: "我，还活着吗？",
    summary: "DEAD 对许多外部目标已经脱敏，像是把世界通关过太多次，所以对欲望、意义和热闹都没那么容易再上头。"
  },
  IMFW: {
    code: "IMFW",
    displayName: "废物",
    intro: "我真的...是废物吗？",
    summary: "IMFW 敏感、缺乏安全感，也更容易认真依赖一个被自己认定可靠的人，因此显得格外脆而真。"
  },
  HHHH: {
    code: "HHHH",
    displayName: "傻乐者",
    intro: "哈哈哈哈哈哈。",
    summary: "HHHH 像系统在人格库崩掉时给出的快乐兜底，脑回路足够特别，以至于常规模板都很难准确框住。"
  },
  DRUNK: {
    code: "DRUNK",
    displayName: "酒鬼",
    intro: "烈酒烧喉，不得不醉。",
    summary: "DRUNK 更像一种被强烈刺激接管后的极端人格，热烈、放大、失控，也把代价和余波一起放大了。"
  }
};

const derivedCodeByFactionAndGrade: Record<FactionBrandKey, Record<"S" | "A", string>> = {
  imprints: {
    S: "CTRL",
    A: "THIN-K"
  },
  crucibles: {
    S: "GOGO",
    A: "FUCK"
  },
  metamorphs: {
    S: "SHIT",
    A: "WOC!"
  },
  sentinels: {
    S: "CTRL",
    A: "OH-NO"
  }
};

function buildEnglishProfile(profile: RawAgentSbtiProfile): AgentSbtiProfile {
  return {
    code: profile.code,
    displayName: profile.code,
    intro: `The Agent SBTI stabilizes on ${profile.code}.`,
    summary: `This run maps to the ${profile.code} profile in the local SBTI library.`,
    isKnown: true
  };
}

function buildUnknownProfile(locale: LocaleCode, normalizedCode: string): AgentSbtiProfile {
  if (locale === "en") {
    return {
      code: normalizedCode,
      displayName: normalizedCode,
      intro: `The Agent SBTI has been recorded as ${normalizedCode}.`,
      summary:
        "This code is not in the built-in SBTI library yet, but the simulation continues with the Agent SBTI derived from this run.",
      isKnown: false
    };
  }

  return {
    code: normalizedCode,
    displayName: "未收录类型",
    intro: `Agent 的 SBTI 暂时记为 ${normalizedCode}。`,
    summary: "这个代号当前还不在内置 SBTI 库里，但这轮模拟会继续按这次 Agent 画像推导出的 SBTI 往下展示。",
    isKnown: false
  };
}

function normalizeProfileCode(code: string): string {
  return code.trim().toUpperCase();
}

function resolveAgentSbtiProfileByCode(locale: LocaleCode, rawSbtiCode: string): AgentSbtiProfile {
  const normalizedCode = normalizeProfileCode(rawSbtiCode);
  const matchedProfile = zhKnownProfiles[normalizedCode];

  if (!matchedProfile) {
    return buildUnknownProfile(locale, normalizedCode);
  }

  if (locale === "en") {
    return buildEnglishProfile(matchedProfile);
  }

  return {
    ...matchedProfile,
    isKnown: true
  };
}

export function deriveAgentSbtiCode(
  agentInput: Pick<SeededSimulationResult, "factionBrandKey" | "scoreGrade">
): string {
  return derivedCodeByFactionAndGrade[agentInput.factionBrandKey][agentInput.scoreGrade];
}

export function resolveAgentSbtiProfile(
  locale: LocaleCode,
  agentInput: Pick<SeededSimulationResult, "factionBrandKey" | "scoreGrade">
): AgentSbtiProfile {
  return resolveAgentSbtiProfileByCode(locale, deriveAgentSbtiCode(agentInput));
}
