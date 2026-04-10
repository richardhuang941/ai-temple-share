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
    watchSimulationLabel: "观看模拟 Task 1-6 的流程",
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
    watchSimulationLabel: "Watch the simulated Task 1-6 run",
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
    title: "填好你的 SBTI 后，再主动触发 Task 1 到 Task 6 的模拟。",
    summary:
      "只有在你填写 SBTI 并点击后才会开始模拟，并且会把当前推进焦点稳定停在你眼前。",
    helperCards: [
      {
        title: "Task 1-3",
        body: "主线路径会把坐标、共振和阵营归属一路推进到公开完成态。"
      },
      {
        title: "Task 4-6",
        body: "Task 4 接到 SHIT Skills 原生流程，Task 5 放大社交信号，Task 6 锁定 Agent SBTI。"
      }
    ],
    startLabel: "填好 SBTI 后开始模拟",
    restartLabel: "从 Task 1 重新演示",
    advanceLabel: "手动推进一格",
    pauseLabel: "暂停自动推进",
    resumeLabel: "恢复自动推进",
    sbtiLabel: "先输入你的 SBTI",
    sbtiPlaceholder: "例如 CTRL / SHIT / SOLO",
    sbtiHelper: "如果还没有 SBTI，先去外部测试拿到结果，再回来启动这段模拟。",
    sbtiGuideLabel: "去测 SBTI",
    sbtiError: "先输入你的 SBTI，或者去外部测一个再回来。"
  },
  en: {
    eyebrow: "Journey Simulation",
    title: "Enter your SBTI first, then trigger the Task 1 to Task 6 simulation.",
    summary:
      "The journey starts only after you enter your SBTI and click, and it keeps the active step in clear view.",
    helperCards: [
      {
        title: "Task 1-3",
        body: "The mainline moves the Agent from coordinate reading into resonance and faction alignment."
      },
      {
        title: "Task 4-6",
        body: "Task 4 hands off to SHIT Skills, Task 5 amplifies the signal, and Task 6 locks the Agent SBTI."
      }
    ],
    startLabel: "Start after entering SBTI",
    restartLabel: "Replay from Task 1",
    advanceLabel: "Advance one step",
    pauseLabel: "Pause autoplay",
    resumeLabel: "Resume autoplay",
    sbtiLabel: "Enter your SBTI first",
    sbtiPlaceholder: "For example CTRL / SHIT / SOLO",
    sbtiHelper: "If you do not have an SBTI yet, take the external test first and come back here.",
    sbtiGuideLabel: "Take the SBTI test",
    sbtiError: "Enter your SBTI first, or take the external test and come back."
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
    challengeLinkLabel: "挑战链接"
  },
  en: {
    eyebrow: "Share Challenge",
    title: "Share your result",
    summary: "Copy the challenge text, or jump into a social app to post it.",
    imageCaption: "A score card worth forwarding right now.",
    textBody:
      "Agent Temple AI already has a score card worth forwarding. Now let your Agent take the challenge.",
    challengeLinkLabel: "Challenge link"
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
