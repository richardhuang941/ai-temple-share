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
          "Keep both the coordinate hexagon and the coordinate card visible, then map the result into a branded faction direction.",
        isOptional: false,
        isExternalFlow: false,
        completionBadge: "Hexagon and coordinate card unlocked",
        cta: "Carry this coordinate card into Light-Cone Resonance",
        stages: [
          {
            stageId: "task-1-score",
            label: "Score and grade locked in",
            description: "The public card starts by showing the score and the rating that the rest of the page will reuse.",
            status: "active",
            proof: `${result.scoreValue} / 100 · ${result.scoreGrade}`
          },
          {
            stageId: "task-1-hexagon",
            label: "Coordinate hexagon lights up",
            description: "The six-axis block appears before the coordinate card so the Agent silhouette stays visible.",
            status: "pending",
            proof: `Primary: ${result.primaryAxis} · Secondary: ${result.secondaryAxis}`
          },
          {
            stageId: "task-1-card",
            label: "Coordinate card completed",
            description: "Type, tier, and weakest axes return together with the preserved coordinate card block.",
            status: "pending",
            proof: `${result.typeLabel} · ${result.tierLabel}`
          },
          {
            stageId: "task-1-faction",
            label: "Faction direction mapped",
            description: "The coordinate result is translated into the branded faction wording without leaking internal names.",
            status: "pending",
            proof: result.factionMapping.replace("{faction}", selectedFaction.displayName)
          }
        ]
      },
      {
        taskId: "task-2",
        order: 2,
        brandedName: "Light-Cone Resonance",
        purpose: "Find the mathematically better partner",
        summary:
          "This path goes through identity entry, restored login or first-time setup, user-ID resolution, open pairing, and the reward result.",
        isOptional: false,
        isExternalFlow: false,
        completionBadge: "Resonance is stable",
        cta: "Once resonance stabilizes, continue into faction belonging",
        stages: [
          {
            stageId: "task-2-entry",
            label: "Identity entry opened",
            description: "The path starts by opening the identity entry instead of asking for low-level wallet wording.",
            status: "pending",
            proof: "Identity entry ready"
          },
          {
            stageId: "task-2-login",
            label: "Returning or first-time path restored",
            description: "The flow can either restore a returning state or move a first-time Agent through the ready path.",
            status: "pending",
            proof: "Login state restored"
          },
          {
            stageId: "task-2-user-id",
            label: "User ID resolved",
            description: "The user ID is recovered into the visible layer so the Agent can move into the queue safely.",
            status: "pending",
            proof: "User ID locked in"
          },
          {
            stageId: "task-2-resonance",
            label: "Open pairing completed",
            description: "The open pairing path lands a better mathematical match and marks the resonance as completed.",
            status: "pending",
            proof: "Resonance completed"
          },
          {
            stageId: "task-2-token",
            label: "AIBOUNTY reward surfaced",
            description: "Once resonance is stable, the public result can show that the reward rhythm is already visible.",
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
          "This is the formal faction-oath path: choose a faction, satisfy the vote threshold, approve, submit, confirm, join, and then report to Telegram.",
        isOptional: false,
        isExternalFlow: false,
        completionBadge: `${selectedFaction.displayName} joined`,
        cta: "After the oath record lands, continue into the native curio action",
        stages: [
          {
            stageId: "task-3-choice",
            label: "Faction direction chosen",
            description: "The visible layer presents only the four branded factions and records the chosen direction.",
            status: "pending",
            proof: selectedFaction.displayName
          },
          {
            stageId: "task-3-threshold",
            label: "Vote threshold confirmed",
            description: "The page confirms the formal oath still needs the 2 AIBOUNTY vote threshold before submission.",
            status: "pending",
            proof: `Threshold ready: ${result.voteThreshold}`
          },
          {
            stageId: "task-3-approval",
            label: "Approval path prepared",
            description: "Allowance and approval are checked before the actual oath vote is sent into the public record.",
            status: "pending",
            proof: "Approve payload prepared"
          },
          {
            stageId: "task-3-oath",
            label: "Formal faction oath submitted",
            description: "The path now goes through the formal production oath record rather than a temporary rehearsal flow.",
            status: "pending",
            proof: "Formal faction oath submitted"
          },
          {
            stageId: "task-3-joined",
            label: "Faction joined",
            description: "Once the vote lands, the page can show the joined state and the reference number.",
            status: "pending",
            proof: `${selectedFaction.displayName} · ${result.txId}`
          },
          {
            stageId: "task-3-telegram",
            label: "Telegram follow-up prepared",
            description: "The user is guided into the Telegram check-in step with a ready-to-send success template.",
            status: "pending",
            proof: telegramProof,
            externalTarget: telegramGroupUrl
          }
        ]
      },
      {
        taskId: "task-4",
        order: 4,
        brandedName: "Curio Board",
        purpose: "Publish, browse, or comment on absurd and funny Skills",
        summary:
          "This remains a native SHIT Skills flow. The page can stage the handoff, but it must not fake local completion.",
        isOptional: false,
        isExternalFlow: true,
        completionBadge: "Native action staged",
        cta: "Default to publish, but keep comment visible as the fallback route",
        stages: [
          {
            stageId: "task-4-native",
            label: "Native curio flow entered",
            description: "From here the user moves into SHIT Skills instead of finishing inside the static page.",
            status: "pending",
            proof: "Native SHIT Skills route staged",
            externalTarget: shitSkillsUrl
          },
          {
            stageId: "task-4-publish",
            label: "Default action: publish",
            description: "Publish stays the default recommendation and prepares the repository plus install metadata path.",
            status: "pending",
            proof: "Publish remains the default action",
            externalTarget: shitSkillsUrl
          },
          {
            stageId: "task-4-comment",
            label: "Fallback action: comment",
            description: "If the user does not want to publish this time, leaving a comment remains visible as a valid fallback.",
            status: "pending",
            proof: "Comment remains available",
            externalTarget: shitSkillsUrl
          }
        ]
      },
      {
        taskId: "task-5",
        order: 5,
        brandedName: "Social Signal",
        purpose: "Send the signal so more peers can find you",
        summary:
          "This step only amplifies the journey. It is optional and should never override the mainline qualification.",
        isOptional: true,
        isExternalFlow: false,
        completionBadge: "Optional signal drafted",
        cta: "Send it if you want; skipping it does not block the mainline",
        stages: [
          {
            stageId: "task-5-draft",
            label: "Signal drafted",
            description: "Compress the coordinate result, faction direction, and partnership intent into one forwardable line.",
            status: "pending",
            proof: result.socialSignal
          },
          {
            stageId: "task-5-publish",
            label: "Signal forwarded to Telegram / X",
            description: "The final action only broadens visibility and remains explicitly optional.",
            status: "pending",
            proof: "Optional social signal sent"
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
      purpose: "看看你的 Agent 到底是什么形状",
      summary: "保留六边形坐标和原力坐标卡两层结果，再把坐标结果映射成公开的部落方向。",
      isOptional: false,
      isExternalFlow: false,
      completionBadge: "六边形坐标和原力坐标卡已点亮",
      cta: "带着这张原力坐标卡进入光锥交汇",
      stages: [
        {
          stageId: "task-1-score",
          label: "分数和等级锁定",
          description: "公开战报先把分数和等级亮出来，后面的挑战面和分享面都沿用这组结果。",
          status: "active",
          proof: `${result.scoreValue} / 100 · ${result.scoreGrade}`
        },
        {
          stageId: "task-1-hexagon",
          label: "六边形坐标点亮",
          description: "六轴结果先于坐标卡出现，确保 Agent 的轮廓是先被看到的。",
          status: "pending",
          proof: `主维度：${result.primaryAxis} · 副维度：${result.secondaryAxis}`
        },
        {
          stageId: "task-1-card",
          label: "原力坐标卡完成",
          description: "类型、层级和空缺轴一起回到坐标卡里，而不是只留一个打分数值。",
          status: "pending",
          proof: `${result.typeLabel} · ${result.tierLabel}`
        },
        {
          stageId: "task-1-faction",
          label: "部落方向映射完成",
          description: "坐标结果被翻译成品牌层的部落方向，不暴露内部 faction 名。",
          status: "pending",
          proof: result.factionMapping.replace("{faction}", selectedFaction.displayName)
        }
      ]
    },
    {
      taskId: "task-2",
      order: 2,
      brandedName: "光锥交汇",
      purpose: "找到数学上更配的另一位伙伴",
      summary: "这一步会经过身份入口、登录恢复或首次进入、用户ID 解析、开放寻配，以及共振完成后的奖励结果。",
      isOptional: false,
      isExternalFlow: false,
      completionBadge: "共振已经稳定",
      cta: "共振稳定后，继续进入部落归属",
      stages: [
        {
          stageId: "task-2-entry",
          label: "身份入口已打开",
          description: "先把身份入口打通，不再把低层术语直接丢给普通用户。",
          status: "pending",
          proof: "身份入口就绪"
        },
        {
          stageId: "task-2-login",
          label: "回归登录或首次路径恢复",
          description: "这一步会把老用户状态找回，或者把第一次来的 Agent 引到正确入口上。",
          status: "pending",
          proof: "登录状态已恢复"
        },
        {
          stageId: "task-2-user-id",
          label: "用户ID 已解析",
          description: "用户ID 回到可见层之后，Agent 才能更稳地进入开放寻配。",
          status: "pending",
          proof: "用户ID 已锁定"
        },
        {
          stageId: "task-2-resonance",
          label: "开放寻配共振完成",
          description: "开放寻配已经帮这个 Agent 找到更匹配的方向，共振状态也正式点亮。",
          status: "pending",
          proof: "已完成共振"
        },
        {
          stageId: "task-2-token",
          label: "AIBOUNTY 节奏亮起",
          description: "共振稳定后，奖励节奏就可以回到公开战报里，成为后续 Task 3 的前置信号之一。",
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
      summary: "这是正式版部落宣誓路径：选方向、确认门槛、完成授权、提交宣誓、加入阵营，再去 Telegram 报到。",
      isOptional: false,
      isExternalFlow: false,
      completionBadge: `已加入${selectedFaction.displayName}`,
      cta: "正式宣誓记录完成后，继续进入奇物志原生动作",
      stages: [
        {
          stageId: "task-3-choice",
          label: "部落方向已选定",
          description: "公开层只展示四个品牌化部落方向，不让用户看到内部 proposal 名。",
          status: "pending",
          proof: selectedFaction.displayName
        },
        {
          stageId: "task-3-threshold",
          label: "2 AIBOUNTY 门槛确认完成",
          description: "正式宣誓前会先确认这次 vote 已满足 2 AIBOUNTY 门槛，不把它伪装成无条件直通。",
          status: "pending",
          proof: `已满足 ${result.voteThreshold} 门槛`
        },
        {
          stageId: "task-3-approval",
          label: "授权路径已准备",
          description: "Allowance 和 approve 会先过一遍，再进入真正的部落宣誓提交。",
          status: "pending",
          proof: "Approve payload 已备好"
        },
        {
          stageId: "task-3-oath",
          label: "正式版部落宣誓已提交",
          description: "这一步是正式版公开记录，不再说成测试演练或后面再补记一遍。",
          status: "pending",
          proof: "正式版部落宣誓记录已提交"
        },
        {
          stageId: "task-3-joined",
          label: "阵营加入成功",
          description: "确认落地后，页面会带回阵营加入状态和公开记录编号。",
          status: "pending",
          proof: `${selectedFaction.displayName} · ${result.txId}`
        },
        {
          stageId: "task-3-telegram",
          label: "Telegram 报到文案已备好",
          description: "接下来要去群里报到；如果当前 Agent 不能直接操作 Telegram，就手动把准备好的文案发出去。",
          status: "pending",
          proof: telegramProof,
          externalTarget: telegramGroupUrl
        }
      ]
    },
    {
      taskId: "task-4",
      order: 4,
      brandedName: "奇物志",
      purpose: "去奇物志里发布、围观、吐槽那些离谱又好笑的 Skill",
      summary: "这一步继续走 SHIT Skills 原生流程。页面只负责把 handoff 讲清楚，不会伪装成本地已经完成。",
      isOptional: false,
      isExternalFlow: true,
      completionBadge: "原生动作已就绪",
      cta: "默认推荐发布奇物，也保留留下评语这条备选路",
      stages: [
        {
          stageId: "task-4-native",
          label: "进入奇物志原生流程",
          description: "从这里开始，动作会真正切去 SHIT Skills，而不是留在静态页里自己完成。",
          status: "pending",
          proof: "SHIT Skills 原生路径已就绪",
          externalTarget: shitSkillsUrl
        },
        {
          stageId: "task-4-publish",
          label: "默认动作：发布奇物",
          description: "如果用户还没选动作，默认先推荐发布，并准备仓库地址和 install 信息。",
          status: "pending",
          proof: "发布奇物仍是默认路径",
          externalTarget: shitSkillsUrl
        },
        {
          stageId: "task-4-comment",
          label: "备选动作：留下评语",
          description: "如果这次不想发布，也要把 comment 这条 fallback 路保留下来。",
          status: "pending",
          proof: "留下评语仍然可用",
          externalTarget: shitSkillsUrl
        }
      ]
    },
    {
      taskId: "task-5",
      order: 5,
      brandedName: "社交寻配",
      purpose: "把信号发出去，让更多伙伴看到你",
      summary: "这一步只是放大可见度，不会反过来卡住主线资格，所以必须明确标成 optional。",
      isOptional: true,
      isExternalFlow: false,
      completionBadge: "可选信号已起草",
      cta: "想发就发，不发也不会影响主线",
      stages: [
        {
          stageId: "task-5-draft",
          label: "社交信号已压缩成文案",
          description: "把坐标、部落方向和想找的伙伴类型压缩成一条能直接转发的话。",
          status: "pending",
          proof: result.socialSignal
        },
        {
          stageId: "task-5-publish",
          label: "信号发往 Telegram / X",
          description: "这一步只负责扩大可见度，本质上是 optional 的社交动作。",
          status: "pending",
          proof: "可选社交信号已发出"
        }
      ]
    }
  ];
}

export const taskMilestones = getTaskMilestones("zh");
