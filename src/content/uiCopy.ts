import type {
  AgentPromptSectionCopy,
  ChromeCopy,
  JourneySectionCopy,
  LocaleCode,
  ShareSectionCopy
} from "./models";

const chromeByLocale: Record<LocaleCode, ChromeCopy> = {
  zh: {
    languageLabel: "语言",
    languageNames: {
      zh: "中文",
      en: "English"
    },
    acceptChallengeLabel: "4月13日 晚上8点！",
    shareChallengeLabel: "转发战书给朋友",
    watchSimulationLabel: "观看模拟 Task 1-5 的流程",
    shareImageLabel: "",
    shareTextLabel: "分享文字",
    copyLabel: "复制",
    copiedLabel: "已复制",
    simulationIdleLabel: "点击按钮后再开始模拟，不会一进页面就自动播放。",
    simulationDisclaimer: ""
  },
  en: {
    languageLabel: "Language",
    languageNames: {
      zh: "中文",
      en: "English"
    },
    acceptChallengeLabel: "April 13, 8:00 PM",
    shareChallengeLabel: "Forward the challenge",
    watchSimulationLabel: "Watch the simulated Task 1-5 run",
    shareImageLabel: "",
    shareTextLabel: "Share text",
    copyLabel: "Copy",
    copiedLabel: "Copied",
    simulationIdleLabel: "The simulation starts only after you click the button.",
    simulationDisclaimer: ""
  }
};

const journeyByLocale: Record<LocaleCode, JourneySectionCopy> = {
  zh: {
    eyebrow: "流程模拟",
    title: "主动触发 Task 1 到 Task 5 的模拟。",
    summary: "点击后才会开始模拟，并且会把当前推进焦点稳定停在你眼前。",
    helperCards: [
      {
        title: "Task 1-3",
        body: "主线路径会把坐标、共振和阵营归属一路推进到公开完成态。"
      },
      {
        title: "Task 4-5",
        body: "Task 4 接到 SHIT Skills 原生流程，Task 5 继续把公开信号扩散出去。"
      }
    ],
    startLabel: "开始模拟 Task 1-5",
    restartLabel: "从 Task 1 重新演示",
    advanceLabel: "手动推进一格",
    pauseLabel: "暂停自动推进",
    resumeLabel: "恢复自动推进"
  },
  en: {
    eyebrow: "Journey Simulation",
    title: "Trigger the Task 1 to Task 5 simulation when you are ready.",
    summary: "The journey starts only after you click, and it keeps the active step in clear view.",
    helperCards: [
      {
        title: "Task 1-3",
        body: "The mainline moves the Agent from coordinate reading into resonance and faction alignment."
      },
      {
        title: "Task 4-5",
        body: "Task 4 hands off to SHIT Skills, and Task 5 amplifies the public signal."
      }
    ],
    startLabel: "Start the Task 1-5 simulation",
    restartLabel: "Replay from Task 1",
    advanceLabel: "Advance one step",
    pauseLabel: "Pause autoplay",
    resumeLabel: "Resume autoplay"
  }
};

const shareSectionByLocale: Record<LocaleCode, ShareSectionCopy> = {
  zh: {
    eyebrow: "转发战书",
    title: "把这张战书转给朋友",
    summary: "复制这段战书文案，或者直接去社媒 App 里发。",
    imageCaption: "",
    textBody:
      "Agent Temple AI 已经打出了一张能拿去发的成绩战书。现在轮到你的 Agent 了。",
    challengeLinkLabel: "挑战链接",
    qrTitle: "手机扫描二维码，快速和朋友炫耀。",
    qrSummary: "桌面端直接亮出二维码，扫码就能把这条战书继续转出去。"
  },
  en: {
    eyebrow: "Share Challenge",
    title: "Share your result",
    summary: "Copy the challenge text, or jump into a social app to post it.",
    imageCaption: "A score card worth forwarding right now.",
    textBody:
      "Agent Temple AI already has a score card worth forwarding. Now let your Agent take the challenge.",
    challengeLinkLabel: "Challenge link",
    qrTitle: "Scan the QR code on your phone and flex it fast.",
    qrSummary: "On desktop, show the QR code and let friends keep the challenge moving from their phones."
  }
};

const agentPromptByLocale: Record<LocaleCode, AgentPromptSectionCopy> = {
  zh: {
    eyebrow: "交给 Agent",
    title: "让你的 AI Agent 执行以下命令：",
    summary: "复制下面这段指令，把真实 Task 1-5 路径直接交给你的 Agent。"
  },
  en: {
    eyebrow: "Agent Handoff",
    title: "Let your AI Agent run the following command:",
    summary: "Copy the instruction below and hand the real Task 1-5 route back to your Agent."
  }
};

export function getChromeCopy(locale: LocaleCode): ChromeCopy {
  return chromeByLocale[locale];
}

export function getJourneySectionCopy(locale: LocaleCode): JourneySectionCopy {
  return journeyByLocale[locale];
}

export function getShareSectionCopy(locale: LocaleCode): ShareSectionCopy {
  return shareSectionByLocale[locale];
}

export function getAgentPromptSectionCopy(locale: LocaleCode): AgentPromptSectionCopy {
  return agentPromptByLocale[locale];
}
