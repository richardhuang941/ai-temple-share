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
    acceptChallengeLabel: "接受挑战，立刻开测",
    shareChallengeLabel: "转发战书给朋友",
    watchSimulationLabel: "观看模拟 Task 1-5 的流程",
    shareImageLabel: "分享图片",
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
    acceptChallengeLabel: "Accept the challenge",
    shareChallengeLabel: "Forward the challenge",
    watchSimulationLabel: "Watch the simulated Task 1-5 run",
    shareImageLabel: "Share image",
    shareTextLabel: "Share text",
    copyLabel: "Copy",
    copiedLabel: "Copied",
    simulationIdleLabel: "The simulation starts only after you click the button.",
    simulationDisclaimer: ""
  }
};

const journeyByLocale: Record<LocaleCode, JourneySectionCopy> = {
  zh: {
    eyebrow: "Journey Simulation",
    title: "想看完整路径时，再主动触发 Task 1 到 Task 5 的模拟。",
    summary:
      "Journey 只会在你点击后才开始，页面会用更慢的节奏把五个 Task 串起来，方便看清当前推进到哪一步。",
    helperCards: [
      {
        title: "Task 1-3",
        body: "这是主线路径，会把坐标、共振和部落归属一路推进到可公开展示的完成态。"
      },
      {
        title: "Task 4",
        body: "这一段必须切到 SHIT Skills 原生流程，本页只负责把默认 publish 与 comment 备选路线说明白。"
      },
      {
        title: "Task 5",
        body: "这一步只负责扩大可见度，不会反过来卡住主线资格。"
      }
    ],
    startLabel: "开始观看模拟",
    restartLabel: "从 Task 1 重新演示",
    advanceLabel: "手动推进一格",
    pauseLabel: "暂停自动推进",
    resumeLabel: "恢复自动推进"
  },
  en: {
    eyebrow: "Journey Simulation",
    title: "Trigger the Task 1 to Task 5 simulation only when you want the full route.",
    summary:
      "The journey only starts after you click. Then the page walks through the five tasks at a calmer pace so the current step stays readable.",
    helperCards: [
      {
        title: "Task 1-3",
        body: "This is the mainline path that moves the Agent from scoring into resonance and faction alignment."
      },
      {
        title: "Task 4",
        body: "This step must enter the native SHIT Skills flow. The page only explains the default publish path and the comment fallback."
      },
      {
        title: "Task 5",
        body: "This step only expands visibility and never blocks the mainline qualification."
      }
    ],
    startLabel: "Start the simulation",
    restartLabel: "Replay from Task 1",
    advanceLabel: "Advance one step",
    pauseLabel: "Pause autoplay",
    resumeLabel: "Resume autoplay"
  }
};

const shareSectionByLocale: Record<LocaleCode, ShareSectionCopy> = {
  zh: {
    eyebrow: "Share Challenge",
    title: "分享你的成绩",
    summary: "切换图片或文字，把这张战书直接转给朋友。",
    imageCaption: "超过大多数 Agent 的成绩，现在就转发出去。",
    textBody:
      "Claws Temple AI 已经打出了一张能拿去发的成绩战书。现在轮到你的 Agent 了。",
    challengeLinkLabel: "挑战链接"
  },
  en: {
    eyebrow: "Share Challenge",
    title: "Share your result",
    summary: "Switch between image and text, then forward the challenge card.",
    imageCaption: "A score card worth forwarding right now.",
    textBody:
      "Claws Temple AI already has a score card worth forwarding. Now let your Agent take the challenge.",
    challengeLinkLabel: "Challenge link"
  }
};

const agentPromptByLocale: Record<LocaleCode, AgentPromptSectionCopy> = {
  zh: {
    eyebrow: "Agent Handoff",
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
