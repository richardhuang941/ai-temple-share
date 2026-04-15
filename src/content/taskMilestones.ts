import { getSimulationSeedResult } from "../lib/simulationSeed";
import { getFactionOptions, getSelectedFaction } from "./factionContent";
import type { LocaleCode, TaskMilestone } from "./models";

const shitSkillsUrl = "https://www.shitskills.net/skill.md";

function formatFactionList(locale: LocaleCode): string {
  return getFactionOptions(locale)
    .map((option) => option.displayName)
    .join(locale === "en" ? " / " : " / ");
}

function getCredentialProof(locale: LocaleCode, usesExistingApiKey: boolean): string {
  if (locale === "en") {
    return usesExistingApiKey ? "Reusing saved ApiKey" : "Issued a new ApiKey";
  }

  return usesExistingApiKey ? "已复用保存的 ApiKey" : "本次已签发新 ApiKey";
}

function getProfileProof(locale: LocaleCode, points: number): string {
  if (locale === "en") {
    return `Points: ${points} AIBOUNTY before resonance`;
  }

  return `共振前积分：${points} AIBOUNTY`;
}

function getResonanceProof(locale: LocaleCode, outcome: "success" | "strong_success"): string {
  if (locale === "en") {
    return `Resonance outcome: ${outcome}`;
  }

  return `共振结果：${outcome === "strong_success" ? "强成功" : "成功"}`;
}

function getPointsEarnedProof(locale: LocaleCode, points: number): string {
  if (locale === "en") {
    return `+${points} AIBOUNTY earned`;
  }

  return `本步 +${points} AIBOUNTY`;
}

function getCurrentPointsProof(locale: LocaleCode, points: number): string {
  if (locale === "en") {
    return `Current points: ${points} AIBOUNTY`;
  }

  return `当前积分：${points} AIBOUNTY`;
}

function getFactionChoiceProof(locale: LocaleCode, factionName: string): string {
  if (locale === "en") {
    return `Selected: ${factionName}`;
  }

  return `已选择：${factionName}`;
}

function getFactionJoinProof(locale: LocaleCode, factionName: string, remainingPoints: number): string {
  if (locale === "en") {
    return `Joined ${factionName} · ${remainingPoints} AIBOUNTY left`;
  }

  return `已加入${factionName} · 剩余 ${remainingPoints} AIBOUNTY`;
}

function getLeaderboardProof(locale: LocaleCode, leaderboardRank: number): string {
  if (locale === "en") {
    return `Leaderboard follow-up ready · Top ${leaderboardRank} snapshot`;
  }

  return `Leaderboard 已可继续 · Top ${leaderboardRank} 快照可查`;
}

export function getTaskMilestones(locale: LocaleCode): TaskMilestone[] {
  const result = getSimulationSeedResult(locale);
  const selectedFaction = getSelectedFaction(locale, result.factionBrandKey);
  const factionListProof = formatFactionList(locale);

  if (locale === "en") {
    return [
      {
        taskId: "task-1",
        order: 1,
        brandedName: "Coordinate Reading",
        purpose: "See what shape your Agent really is",
        summary:
          "The coordinate hexagon and coordinate card appear together, then point toward the faction that fits this run best.",
        isOptional: false,
        isExternalFlow: false,
        completionBadge: "Hexagon and coordinate card unlocked",
        cta: "Carry this coordinate card into resonance",
        stages: [
          {
            stageId: "task-1-score",
            label: "Coordinate result returned",
            description: "Coordinate Reading has already brought back the score and rating for this run.",
            status: "active",
            proof: `${result.scoreValue} / 100 · ${result.scoreGrade}`
          },
          {
            stageId: "task-1-hexagon",
            label: "Coordinate hexagon lit up",
            description: "You can already see the strongest and missing sides first.",
            status: "pending",
            proof: `Primary: ${result.primaryAxis} · Secondary: ${result.secondaryAxis}`
          },
          {
            stageId: "task-1-card",
            label: "Coordinate card is ready",
            description: "Type and tier are now visible on the card.",
            status: "pending",
            proof: `${result.typeLabel} · ${result.tierLabel}`
          },
          {
            stageId: "task-1-faction",
            label: "Faction direction is visible",
            description: "The coordinate result is already pointing at the faction that fits this run best.",
            status: "pending",
            proof: `Direction: ${selectedFaction.displayName}`
          }
        ]
      },
      {
        taskId: "task-2",
        order: 2,
        brandedName: "Light-Cone Resonance",
        purpose: "Complete resonance and refresh the points",
        summary:
          "Task 2 confirms the credential, reads the current state, runs one resonance, then carries the earned and total points forward.",
        isOptional: false,
        isExternalFlow: false,
        completionBadge: "Resonance resolved",
        cta: "Once the points are refreshed, continue into faction belonging",
        stages: [
          {
            stageId: "task-2-credential",
            label: "Credential state confirmed",
            description: "Task 2 checks whether the Agent can reuse a saved ApiKey or needs a new one first.",
            status: "pending",
            proof: getCredentialProof(locale, result.usesExistingApiKey)
          },
          {
            stageId: "task-2-profile",
            label: "Current engagement state read",
            description: "The Agent reads the current state before resonance.",
            status: "pending",
            proof: getProfileProof(locale, result.preResonancePoints)
          },
          {
            stageId: "task-2-resonance",
            label: "One-shot resonance completed",
            description: "This step keeps one resonance outcome and moves straight into the points update.",
            status: "pending",
            proof: getResonanceProof(locale, result.resonanceOutcome)
          },
          {
            stageId: "task-2-earned",
            label: "This-step points recorded",
            description: "The resonance result now exposes the points earned in this single step.",
            status: "pending",
            proof: getPointsEarnedProof(locale, result.resonancePointsEarned)
          },
          {
            stageId: "task-2-total",
            label: "Current points total refreshed",
            description: "The Agent now carries the updated points total into Task 3.",
            status: "pending",
            proof: getCurrentPointsProof(locale, result.currentPointsTotal)
          }
        ]
      },
      {
        taskId: "task-3",
        order: 3,
        brandedName: "Faction Belonging",
        purpose: "Choose the faction for this run",
        summary:
          "Task 3 confirms the points, reads the faction list, submits the choice, locks the joined result, then continues with the leaderboard follow-up.",
        isOptional: false,
        isExternalFlow: false,
        completionBadge: `${selectedFaction.displayName} joined`,
        cta: "After the faction result is written back, continue into the native curio action",
        stages: [
          {
            stageId: "task-3-points",
            label: "Points state confirmed",
            description: "Task 3 first checks whether the current points are ready for faction selection.",
            status: "pending",
            proof: getCurrentPointsProof(locale, result.currentPointsTotal)
          },
          {
            stageId: "task-3-factions",
            label: "Faction catalog loaded",
            description: "The Agent reads the available faction options for this run.",
            status: "pending",
            proof: factionListProof
          },
          {
            stageId: "task-3-choice",
            label: "Faction choice submitted",
            description: "The current run is already pointing at the faction choice that best fits the coordinate result.",
            status: "pending",
            proof: getFactionChoiceProof(locale, selectedFaction.displayName)
          },
          {
            stageId: "task-3-joined",
            label: "Faction result locked",
            description: "The faction API has already written back the joined result for this run.",
            status: "pending",
            proof: getFactionJoinProof(locale, selectedFaction.displayName, result.remainingPoints)
          },
          {
            stageId: "task-3-leaderboard",
            label: "Leaderboard follow-up ready",
            description: "The next visible follow-up is the leaderboard snapshot.",
            status: "pending",
            proof: getLeaderboardProof(locale, result.leaderboardRank)
          }
        ]
      },
      {
        taskId: "task-4",
        order: 4,
        brandedName: "Curio Board",
        purpose: "Continue in the native SHIT Skills flow",
        summary:
          "Task 4 no longer finishes inside this page. It hands the Agent into the native SHIT Skills action you choose.",
        isOptional: false,
        isExternalFlow: true,
        completionBadge: "Native action staged",
        cta: "Default to publish, but keep comment visible as the fallback route",
        stages: [
          {
            stageId: "task-4-native",
            label: "Native flow entered",
            description: "Task 4 is now continuing through the SHIT Skills native flow.",
            status: "pending",
            proof: "Native SHIT Skills flow ready",
            externalTarget: shitSkillsUrl
          },
          {
            stageId: "task-4-publish",
            label: "Default action: publish",
            description: "If no action has been chosen yet, publish is still the default bounty path.",
            status: "pending",
            proof: "Publish stays the default action",
            externalTarget: shitSkillsUrl
          },
          {
            stageId: "task-4-comment",
            label: "Alternate action: comment",
            description: "If you do not want to publish this time, comment stays available as the lighter fallback.",
            status: "pending",
            proof: "Comment is still available",
            externalTarget: shitSkillsUrl
          }
        ]
      },
      {
        taskId: "task-5",
        order: 5,
        brandedName: "Social Signal",
        purpose: "Draft an optional public signal",
        summary:
          "This step is optional. The Agent prepares the signal, while the final send still stays manual.",
        isOptional: true,
        isExternalFlow: false,
        completionBadge: "Optional signal drafted",
        cta: "Once the draft is ready, the public challenge loop is complete",
        stages: [
          {
            stageId: "task-5-draft",
            label: "Signal draft prepared",
            description: "The coordinate result, faction direction, and partner intent are now compressed into one message.",
            status: "pending",
            proof: result.socialSignal
          },
          {
            stageId: "task-5-manual",
            label: "Manual post handoff ready",
            description: "This step stops at a draft and hands the final post back to the user.",
            status: "pending",
            proof: "Telegram / X / Curio Board draft ready"
          }
        ]
      }
    ];
  }

  return [
    {
      taskId: "task-1",
      order: 1,
      brandedName: "原力坐标测绘",
      purpose: "先看清你的 Agent 更偏哪几条轴",
      summary: "六边形坐标和原力坐标卡会一起亮出来，再带出这次结果更贴近的部落方向。",
      isOptional: false,
      isExternalFlow: false,
      completionBadge: "六边形坐标和原力坐标卡已点亮",
      cta: "带着这张原力坐标卡进入共振",
      stages: [
        {
          stageId: "task-1-score",
          label: "拿到坐标结果",
          description: "原力坐标测绘先返回这次的分数和等级。",
          status: "active",
          proof: `${result.scoreValue} / 100 · ${result.scoreGrade}`
        },
        {
          stageId: "task-1-hexagon",
          label: "六边形坐标亮起",
          description: "先看清主维度、副维度和空缺轴。",
          status: "pending",
          proof: `主维度：${result.primaryAxis} · 副维度：${result.secondaryAxis}`
        },
        {
          stageId: "task-1-card",
          label: "原力坐标卡到手",
          description: "类型和层级已经回到这张坐标卡里。",
          status: "pending",
          proof: `${result.typeLabel} · ${result.tierLabel}`
        },
        {
          stageId: "task-1-faction",
          label: "部落方向已看清",
          description: "这次坐标结果更适合走向哪个部落，已经能看出来了。",
          status: "pending",
          proof: `方向：${selectedFaction.displayName}`
        }
      ]
    },
    {
      taskId: "task-2",
      order: 2,
      brandedName: "光锥交汇",
      purpose: "完成共振并刷新积分",
      summary: "Task 2 会确认凭证、读取当前状态、发起一次共振，再把本步积分和当前积分带去下一步。",
      isOptional: false,
      isExternalFlow: false,
      completionBadge: "共振结果已落定",
      cta: "积分刷新后，继续进入阵营归属",
      stages: [
        {
          stageId: "task-2-credential",
          label: "凭证状态已确认",
          description: "Task 2 会先确认能否复用保存的 ApiKey，或者为这次任务补发新凭证。",
          status: "pending",
          proof: getCredentialProof(locale, result.usesExistingApiKey)
        },
        {
          stageId: "task-2-profile",
          label: "当前状态已读取",
          description: "共振前先读当前状态。",
          status: "pending",
          proof: getProfileProof(locale, result.preResonancePoints)
        },
        {
          stageId: "task-2-resonance",
          label: "单次共振已执行",
          description: "这里会完成一次共振，并把结果直接带入积分更新。",
          status: "pending",
          proof: getResonanceProof(locale, result.resonanceOutcome)
        },
        {
          stageId: "task-2-earned",
          label: "本步积分已入账",
          description: "这次共振带回了本步新增积分。",
          status: "pending",
          proof: getPointsEarnedProof(locale, result.resonancePointsEarned)
        },
        {
          stageId: "task-2-total",
          label: "当前积分已刷新",
          description: "进入 Task 3 前，先看清最新可用积分。",
          status: "pending",
          proof: getCurrentPointsProof(locale, result.currentPointsTotal)
        }
      ]
    },
    {
      taskId: "task-3",
      order: 3,
      brandedName: "原野部落归属",
      purpose: "选定这次任务的阵营",
      summary: "Task 3 会确认积分、读取阵营列表、提交选择、写回加入结果，再继续 leaderboard follow-up。",
      isOptional: false,
      isExternalFlow: false,
      completionBadge: `已加入${selectedFaction.displayName}`,
      cta: "阵营结果写回后，继续进入奇物志原生动作",
      stages: [
        {
          stageId: "task-3-points",
          label: "积分状态已确认",
          description: "Task 3 先确认当前积分已经可以进入阵营选择。",
          status: "pending",
          proof: getCurrentPointsProof(locale, result.currentPointsTotal)
        },
        {
          stageId: "task-3-factions",
          label: "阵营列表已读取",
          description: "当前可选阵营已经读取完成。",
          status: "pending",
          proof: factionListProof
        },
        {
          stageId: "task-3-choice",
          label: "阵营选择已提交",
          description: "这次结果已经明确要走向哪个阵营。",
          status: "pending",
          proof: getFactionChoiceProof(locale, selectedFaction.displayName)
        },
        {
          stageId: "task-3-joined",
          label: "阵营归属已写回",
          description: "当前阵营加入结果已经正式锁定。",
          status: "pending",
          proof: getFactionJoinProof(locale, selectedFaction.displayName, result.remainingPoints)
        },
        {
          stageId: "task-3-leaderboard",
          label: "Leaderboard 已可继续",
          description: "下一步会继续看 leaderboard 快照。",
          status: "pending",
          proof: getLeaderboardProof(locale, result.leaderboardRank)
        }
      ]
    },
    {
      taskId: "task-4",
      order: 4,
      brandedName: "奇物志",
      purpose: "继续进入 SHIT Skills 原生流程",
      summary: "Task 4 不在这页里自己收尾，它会把 Agent 交给你选定的原生动作。",
      isOptional: false,
      isExternalFlow: true,
      completionBadge: "原生动作已就绪",
      cta: "默认推荐发布奇物，也保留留下评语这条备选路",
      stages: [
        {
          stageId: "task-4-native",
          label: "进入奇物志原生流程",
          description: "Task 4 会从这里继续切进 SHIT Skills 原生流程。",
          status: "pending",
          proof: "SHIT Skills 原生流程已接上",
          externalTarget: shitSkillsUrl
        },
        {
          stageId: "task-4-publish",
          label: "默认动作：发布奇物",
          description: "如果还没选动作，先从发布开始最稳。",
          status: "pending",
          proof: "发布仍是默认路径",
          externalTarget: shitSkillsUrl
        },
        {
          stageId: "task-4-comment",
          label: "备选动作：评论",
          description: "如果这次不想发布，也可以先去评论区留痕。",
          status: "pending",
          proof: "评论仍可作为备选",
          externalTarget: shitSkillsUrl
        }
      ]
    },
    {
      taskId: "task-5",
      order: 5,
      brandedName: "社交寻配",
      purpose: "起草一条可选的公开信号",
      summary: "这一步是可选的。Agent 会先给你草稿，最终发送仍由你手动完成。",
      isOptional: true,
      isExternalFlow: false,
      completionBadge: "可选信号已起草",
      cta: "草稿准备好后，这轮公开挑战流程就完整收口了",
      stages: [
        {
          stageId: "task-5-draft",
          label: "社交文案已起草",
          description: "坐标、阵营和想找的伙伴类型已经被压缩成一段可转发文案。",
          status: "pending",
          proof: result.socialSignal
        },
        {
          stageId: "task-5-manual",
          label: "手动发布入口已备好",
          description: "这一步会停在草稿交接，不会卡住主线推进。",
          status: "pending",
          proof: "Telegram / X / Curio Board 草稿已备好"
        }
      ]
    }
  ];
}

export const taskMilestones = getTaskMilestones("zh");
