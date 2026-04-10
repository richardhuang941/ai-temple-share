import { getSimulationSeedResult } from "../lib/simulationSeed";
import { getSelectedFaction } from "./factionContent";
import type { LocaleCode, TaskMilestone } from "./models";

const shitSkillsUrl = "https://www.shitskills.net/skill.md";
const telegramGroupUrl = "https://t.me/+tChFhfxgU6AzYjJl";

function fillTelegramTemplate(
  template: string | undefined,
  factionName: string,
  txId: string
): string {
  if (!template) {
    return `${factionName} · ${txId}`;
  }

  return template.replace("{faction_name}", factionName).replace("{txId}", txId);
}

export function getTaskMilestones(locale: LocaleCode): TaskMilestone[] {
  const result = getSimulationSeedResult(locale);
  const selectedFaction = getSelectedFaction(locale, result.factionBrandKey);
  const telegramProof = fillTelegramTemplate(
    selectedFaction.telegramTemplate,
    selectedFaction.displayName,
    result.txId
  );

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
        cta: "Carry this coordinate card into Light-Cone Resonance",
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
        purpose: "Find the mathematically better partner",
        summary:
          "The agent keeps the identity entry, sign-in recovery, user-ID resolution, and pairing path moving for you.",
        isOptional: false,
        isExternalFlow: false,
        completionBadge: "Resonance is stable",
        cta: "Once resonance stabilizes, continue into faction belonging",
        stages: [
          {
            stageId: "task-2-entry",
            label: "Identity entry is ready",
            description: "The smoother entry path is ready before pairing continues.",
            status: "pending",
            proof: "Identity entry ready"
          },
          {
            stageId: "task-2-login",
            label: "Sign-in state restored",
            description: "First-time setup or recovery sign-in has already been connected.",
            status: "pending",
            proof: "Ready to continue"
          },
          {
            stageId: "task-2-user-id",
            label: "User ID resolved",
            description: "The agent has already auto-resolved the current user ID for pairing.",
            status: "pending",
            proof: "User ID resolved"
          },
          {
            stageId: "task-2-resonance",
            label: "Open partner search joined",
            description: "The agent is already in the automatic pairing queue.",
            status: "pending",
            proof: "Open partner search is active"
          },
          {
            stageId: "task-2-token",
            label: "AIBOUNTY rhythm is visible",
            description: "Once resonance stabilizes, the reward rhythm lights up with it.",
            status: "pending",
            proof: `${result.resonanceReward} unlocked`
          }
        ]
      },
      {
        taskId: "task-3",
        order: 3,
        brandedName: "Faction Belonging",
        purpose: "Choose a faction your Agent actually believes in",
        summary:
          "This is the formal faction-oath path: choose the faction, clear the threshold, complete the oath, then carry the result to Telegram.",
        isOptional: false,
        isExternalFlow: false,
        completionBadge: `${selectedFaction.displayName} joined`,
        cta: "After the oath record lands, continue into the native curio action",
        stages: [
          {
            stageId: "task-3-choice",
            label: "Faction chosen",
            description: "The next oath is already pointing at this faction.",
            status: "pending",
            proof: selectedFaction.displayName
          },
          {
            stageId: "task-3-threshold",
            label: "2 AIBOUNTY threshold met",
            description: "The entry threshold is ready, so the formal oath can continue.",
            status: "pending",
            proof: `${result.voteThreshold} threshold ready`
          },
          {
            stageId: "task-3-approval",
            label: "Authorization completed",
            description: "The authorization step ahead of the oath has already been cleared.",
            status: "pending",
            proof: "Authorization completed"
          },
          {
            stageId: "task-3-oath",
            label: "Formal oath submitted",
            description: "The agent has already sent the faction oath into the public record.",
            status: "pending",
            proof: "Formal oath submitted"
          },
          {
            stageId: "task-3-joined",
            label: "Faction joined",
            description: "The faction result is now locked in.",
            status: "pending",
            proof: `${selectedFaction.displayName} · ${result.txId}`
          },
          {
            stageId: "task-3-telegram",
            label: "Telegram check-in ready",
            description: "Telegram is the next visible handoff after the oath lands.",
            status: "pending",
            proof: "Telegram check-in line ready",
            externalTarget: telegramGroupUrl
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
        purpose: "Send an optional public signal so more partners can spot you",
        summary:
          "This step is optional. It only expands visibility after the mainline is already in place.",
        isOptional: true,
        isExternalFlow: false,
        completionBadge: "Optional signal drafted",
        cta: "Send it if you want; skipping it does not block the mainline",
        stages: [
          {
            stageId: "task-5-draft",
            label: "Signal drafted",
            description: "The coordinate result, faction direction, and partner intent are now compressed into one message.",
            status: "pending",
            proof: result.socialSignal
          },
          {
            stageId: "task-5-publish",
            label: "Signal ready for Telegram / X",
            description: "This step only broadens visibility and stays optional.",
            status: "pending",
            proof: "Optional social signal ready"
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
      cta: "带着这张原力坐标卡进入光锥交汇",
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
      purpose: "去找更配得上的另一位伙伴",
      summary: "Agent 会把身份入口、登录恢复、用户ID 解析和寻配路径继续往前推。",
      isOptional: false,
      isExternalFlow: false,
      completionBadge: "共振已经稳定",
      cta: "共振稳定后，继续进入部落归属",
      stages: [
        {
          stageId: "task-2-entry",
          label: "身份入口已打开",
          description: "进入寻配前，先把身份入口准备好。",
          status: "pending",
          proof: "身份入口就绪"
        },
        {
          stageId: "task-2-login",
          label: "登录状态已接上",
          description: "第一次来会先完成初始准备，老用户会先恢复登录。",
          status: "pending",
          proof: "已可继续"
        },
        {
          stageId: "task-2-user-id",
          label: "用户ID 已解析",
          description: "这一步会自动带回当前用户ID，不需要你手填。",
          status: "pending",
          proof: "用户ID 已解析"
        },
        {
          stageId: "task-2-resonance",
          label: "开放寻配已入队",
          description: "Agent 已经进入自动寻配，准备去找更匹配的伙伴。",
          status: "pending",
          proof: "开放寻配已经稳定入队"
        },
        {
          stageId: "task-2-token",
          label: "AIBOUNTY 节奏亮起",
          description: "共振路径稳定后，奖励节奏也随之亮起。",
          status: "pending",
          proof: `${result.resonanceReward} 已亮起`
        }
      ]
    },
    {
      taskId: "task-3",
      order: 3,
      brandedName: "原野部落归属",
      purpose: "选一个真正认同的部落",
      summary: "这是正式版部落宣誓路径：选方向、过门槛、完成宣誓，再把结果带去 Telegram 报到。",
      isOptional: false,
      isExternalFlow: false,
      completionBadge: `已加入${selectedFaction.displayName}`,
      cta: "正式宣誓记录完成后，继续进入奇物志原生动作",
      stages: [
        {
          stageId: "task-3-choice",
          label: "阵营方向已选定",
          description: "这次宣誓已经明确要去哪个阵营。",
          status: "pending",
          proof: selectedFaction.displayName
        },
        {
          stageId: "task-3-threshold",
          label: "2 AIBOUNTY 门槛已满足",
          description: "正式宣誓前，先确认资格门槛已经到位。",
          status: "pending",
          proof: `已满足 ${result.voteThreshold} 门槛`
        },
        {
          stageId: "task-3-approval",
          label: "授权步骤已完成",
          description: "宣誓前需要的授权已经过掉。",
          status: "pending",
          proof: "授权已完成"
        },
        {
          stageId: "task-3-oath",
          label: "正式宣誓已提交",
          description: "Agent 已经把阵营宣誓送进公开记录。",
          status: "pending",
          proof: "正式宣誓已提交"
        },
        {
          stageId: "task-3-joined",
          label: "阵营加入成功",
          description: "这次阵营归属已经正式锁定。",
          status: "pending",
          proof: `${selectedFaction.displayName} · ${result.txId}`
        },
        {
          stageId: "task-3-telegram",
          label: "Telegram 报到已准备",
          description: "下一步就是把准备好的报到文案带去 Telegram 群。",
          status: "pending",
          proof: "Telegram 报到文案已备好",
          externalTarget: telegramGroupUrl
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
      purpose: "发一个可选的公开信号，让更多伙伴看到你",
      summary: "这一步只是把可见度放大，不会反过来卡住主线资格。",
      isOptional: true,
      isExternalFlow: false,
      completionBadge: "可选信号已起草",
      cta: "想发就发，不发也不会影响主线",
      stages: [
        {
          stageId: "task-5-draft",
          label: "社交文案已起草",
          description: "坐标、阵营和想找的伙伴类型已经被压缩成一段可转发文案。",
          status: "pending",
          proof: result.socialSignal
        },
        {
          stageId: "task-5-publish",
          label: "信号准备发往 Telegram / X",
          description: "这一步只负责扩大可见度，本质上是 optional 的社交动作。",
          status: "pending",
          proof: "可选社交信号已准备发送"
        }
      ]
    }
  ];
}

export const taskMilestones = getTaskMilestones("zh");
