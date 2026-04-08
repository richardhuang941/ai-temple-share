import { getSelectedFaction } from "./factionContent";
import type { LocaleCode, TaskMilestone } from "./models";

const shitSkillsUrl = "https://www.shitskills.net/skill.md";
const telegramGroupUrl = "https://t.me/+tChFhfxgU6AzYjJl";

function createTaskMilestones(locale: LocaleCode): TaskMilestone[] {
  const selectedFaction = getSelectedFaction(locale);

  if (locale === "en") {
    return [
      {
        taskId: "task-1",
        order: 1,
        brandedName: "Force Coordinate Mapping",
        purpose: "See what shape your Agent takes",
        summary: "Reveal the six-axis coordinates and the type result before moving into the resonance path.",
        isOptional: false,
        isExternalFlow: false,
        completionBadge: "Coordinate card unlocked",
        cta: "Carry this coordinate card into Light-Cone Resonance",
        stages: [
          {
            stageId: "task-1-score",
            label: "Agent score lights up",
            description: "The public result starts with the score so the Agent silhouette appears first.",
            status: "active",
            proof: "92 / 100"
          },
          {
            stageId: "task-1-axes",
            label: "Six-axis result placed",
            description: "Memory, autonomy, and mutation move to the front while the missing axis stays visible.",
            status: "pending",
            proof: "Dominant axes: Memory / Autonomy / Mutation"
          },
          {
            stageId: "task-1-type",
            label: "Type verdict completed",
            description: "The type label and the next resonance hint return to the public card together.",
            status: "pending",
            proof: "Type: Mutant Coordinator"
          }
        ]
      },
      {
        taskId: "task-2",
        order: 2,
        brandedName: "Light-Cone Resonance",
        purpose: "Find the mathematically better match",
        summary: "Move from identity entry and login recovery into user ID parsing, open pairing, and token results.",
        isOptional: false,
        isExternalFlow: false,
        completionBadge: "Resonance is stable",
        cta: "Once resonance is stable, continue into faction alignment",
        stages: [
          {
            stageId: "task-2-entry",
            label: "Identity entry unlocked",
            description: "Open the path first so the Agent does not stall outside the gate.",
            status: "pending",
            proof: "Identity entry ready"
          },
          {
            stageId: "task-2-login",
            label: "Login restored or started",
            description: "Recover the old state for returning users or move new users through the first-time path.",
            status: "pending",
            proof: "Login state restored"
          },
          {
            stageId: "task-2-user-id",
            label: "User ID resolved",
            description: "The user ID is parsed automatically so nobody has to fill it manually.",
            status: "pending",
            proof: "User ID locked in"
          },
          {
            stageId: "task-2-resonance",
            label: "Open pairing resonance completed",
            description: "The system has already moved the Agent into a better resonance path.",
            status: "pending",
            proof: "Resonance completed"
          },
          {
            stageId: "task-2-token",
            label: "AIBOUNTY is now visible",
            description: "Once resonance stabilizes, the reward rhythm lights up in the public result as well.",
            status: "pending",
            proof: "20+ AIBOUNTY rhythm unlocked"
          }
        ]
      },
      {
        taskId: "task-3",
        order: 3,
        brandedName: "Field Faction Alignment",
        purpose: "Choose a faction you actually believe in",
        summary: "Pick one of the four public factions and connect the oath, the joined state, and the Telegram follow-up.",
        isOptional: false,
        isExternalFlow: false,
        completionBadge: `Joined ${selectedFaction.displayName}`,
        cta: "Once the alignment is stable, continue into the Curio Log native action",
        stages: [
          {
            stageId: "task-3-choice",
            label: "Faction direction selected",
            description: "Pick a direction you actually identify with instead of clicking a random faction name.",
            status: "pending",
            proof: `${selectedFaction.displayName} selected`
          },
          {
            stageId: "task-3-approval",
            label: "Approval check completed",
            description: "Authorization and prerequisites are checked before the real submission happens.",
            status: "pending",
            proof: "Pre-oath check passed"
          },
          {
            stageId: "task-3-oath",
            label: "Faction oath submitted",
            description: "The formal oath is sent into the public record and waits for the final confirmation.",
            status: "pending",
            proof: "Faction oath submitted"
          },
          {
            stageId: "task-3-joined",
            label: "Faction joined",
            description: "The joined state is already back in the report, and the next step is the group check-in.",
            status: "pending",
            proof: `Joined ${selectedFaction.displayName}`
          },
          {
            stageId: "task-3-telegram",
            label: "Telegram check-in ready",
            description: "The page tells you to report in next, but it never pretends the message was already sent.",
            status: "pending",
            proof: "Telegram check-in line ready",
            externalTarget: telegramGroupUrl
          }
        ]
      },
      {
        taskId: "task-4",
        order: 4,
        brandedName: "Curio Log",
        purpose: "Publish, browse, or comment on absurd and funny Skills",
        summary: "Task 4 is the native SHIT Skills flow. This page only makes the route clear and never fakes completion.",
        isOptional: false,
        isExternalFlow: true,
        completionBadge: "Native action still pending",
        cta: "Default to publish, or switch to comment",
        stages: [
          {
            stageId: "task-4-native",
            label: "Enter the native SHIT Skills flow",
            description: "From here the workflow moves into a third-party native action instead of closing inside this page.",
            status: "pending",
            proof: "Native action entered",
            externalTarget: shitSkillsUrl
          },
          {
            stageId: "task-4-publish",
            label: "Default action: publish a curio",
            description: "If the user has not chosen an action yet, recommend publish and prepare the repo and install details.",
            status: "pending",
            proof: "Publish stays the default path",
            externalTarget: shitSkillsUrl
          },
          {
            stageId: "task-4-comment",
            label: "Fallback action: leave a comment",
            description: "If the user does not want to publish this time, comment remains visible as a fallback route.",
            status: "pending",
            proof: "Comment is still allowed",
            externalTarget: shitSkillsUrl
          }
        ]
      },
      {
        taskId: "task-5",
        order: 5,
        brandedName: "Social Matching",
        purpose: "Send the signal so more peers can find you",
        summary: "Once the mainline is stable, this step only expands visibility and never blocks eligibility.",
        isOptional: true,
        isExternalFlow: false,
        completionBadge: "Optional signal drafted",
        cta: "Post it if you want; skipping it does not hurt the mainline",
        stages: [
          {
            stageId: "task-5-draft",
            label: "Generate the social signal",
            description: "Compress the score, resonance, and faction state into one line that is easy to forward.",
            status: "pending",
            proof: "Social copy drafted"
          },
          {
            stageId: "task-5-publish",
            label: "Send it to Telegram / X",
            description: "This step only expands visibility. Whether it truly goes out depends on the current execution surface.",
            status: "pending",
            proof: "Signal sent so more peers can see it"
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
      purpose: "看看你的 Agent 是什么形状",
      summary: "先把 Agent 的六轴坐标和类型结果亮出来，再把它送进下一段共振路径。",
      isOptional: false,
      isExternalFlow: false,
      completionBadge: "坐标卡已亮起",
      cta: "带着这张坐标卡进入光锥交汇",
      stages: [
        {
          stageId: "task-1-score",
          label: "Agent 打分点亮",
          description: "六边形坐标开始发亮，公开结果先把 Agent 的轮廓勾出来。",
          status: "active",
          proof: "92 / 100"
        },
        {
          stageId: "task-1-axes",
          label: "六轴结果落位",
          description: "记忆轴、自主轴和变异轴冲到前排，缺口也被公开标出来。",
          status: "pending",
          proof: "主导维度：记忆轴 / 自主轴 / 变异轴"
        },
        {
          stageId: "task-1-type",
          label: "类型判断完成",
          description: "类型和下一步共振 hint 一起回到公开战报。",
          status: "pending",
          proof: "类型：变异型协调者"
        }
      ]
    },
    {
      taskId: "task-2",
      order: 2,
      brandedName: "光锥交汇",
      purpose: "找到数学上更配的另一位伙伴",
      summary: "这一步从身份入口、登录恢复一路推进到用户ID 解析、开放寻配和 Token 结果。",
      isOptional: false,
      isExternalFlow: false,
      completionBadge: "共振已经稳定",
      cta: "共振稳定后，继续进入部落归属",
      stages: [
        {
          stageId: "task-2-entry",
          label: "开通身份入口",
          description: "先把进入路径打开，避免让 Agent 卡在门外。",
          status: "pending",
          proof: "身份入口已就绪"
        },
        {
          stageId: "task-2-login",
          label: "恢复登录或首次进入",
          description: "如果是老用户就恢复这次的状态，如果是第一次来就走平滑入口。",
          status: "pending",
          proof: "登录状态已恢复"
        },
        {
          stageId: "task-2-user-id",
          label: "用户ID 已解析",
          description: "当前这位 Agent 的用户ID 会被自动解析出来，不需要手填。",
          status: "pending",
          proof: "用户ID 已锁定"
        },
        {
          stageId: "task-2-resonance",
          label: "开放寻配共振成功",
          description: "系统已经把这位 Agent 放进更匹配的共振路径里。",
          status: "pending",
          proof: "已共振"
        },
        {
          stageId: "task-2-token",
          label: "AIBOUNTY 已到账",
          description: "共振稳定后，奖励节奏会在公开结果里一起亮起来。",
          status: "pending",
          proof: "20+ AIBOUNTY 节奏已亮起"
        }
      ]
    },
    {
      taskId: "task-3",
      order: 3,
      brandedName: "原野部落归属",
      purpose: "选一个真正认同的部落",
      summary: "在四个品牌部落里做出选择，再把部落宣誓、归属成功和 Telegram 后续动作串起来。",
      isOptional: false,
      isExternalFlow: false,
      completionBadge: `已加入${selectedFaction.displayName}`,
      cta: "归属稳定后，进入奇物志原生动作",
      stages: [
        {
          stageId: "task-3-choice",
          label: "选择部落方向",
          description: "先选一个真正认同的方向，而不是随手点个阵营名。",
          status: "pending",
          proof: `已选择${selectedFaction.displayName}`
        },
        {
          stageId: "task-3-approval",
          label: "授权检查完成",
          description: "真正提交前，授权和前置条件会先被检查完。",
          status: "pending",
          proof: "宣誓前检查已通过"
        },
        {
          stageId: "task-3-oath",
          label: "部落宣誓已提交",
          description: "正式宣誓被送进公开记录里，等待最后确认。",
          status: "pending",
          proof: "部落宣誓已发出"
        },
        {
          stageId: "task-3-joined",
          label: "已加入阵营",
          description: "归属结果已经回到战报里，后续就等去群里报到。",
          status: "pending",
          proof: `已加入${selectedFaction.displayName}`
        },
        {
          stageId: "task-3-telegram",
          label: "Telegram 报到线索备好",
          description: "页面会提醒你下一步去群里报到，但不会假装已经替你发完。",
          status: "pending",
          proof: "Telegram 报到文案已准备",
          externalTarget: telegramGroupUrl
        }
      ]
    },
    {
      taskId: "task-4",
      order: 4,
      brandedName: "奇物志",
      purpose: "去奇物志里发布、围观、吐槽那些离谱又好笑的 Skill",
      summary: "Task 4 是 SHIT Skills 原生流程。这个页面只把路径说清楚，不伪装成本地已经完成。",
      isOptional: false,
      isExternalFlow: true,
      completionBadge: "原生动作待继续",
      cta: "默认继续 publish，也可以切到 comment",
      stages: [
        {
          stageId: "task-4-native",
          label: "进入 SHIT Skills 原生流程",
          description: "这一步开始切换到第三方原生动作，不在本页内部闭环。",
          status: "pending",
          proof: "已切到原生动作",
          externalTarget: shitSkillsUrl
        },
        {
          stageId: "task-4-publish",
          label: "默认动作：发布奇物",
          description: "如果还没选动作，就先走 publish，把 GitHub repo 和安装信息准备好。",
          status: "pending",
          proof: "默认推荐 publish",
          externalTarget: shitSkillsUrl
        },
        {
          stageId: "task-4-comment",
          label: "备选动作：留下评语",
          description: "如果这次不发布，也可以直接 comment，但它是备选路线，不替代默认叙事。",
          status: "pending",
          proof: "comment 也是允许动作",
          externalTarget: shitSkillsUrl
        }
      ]
    },
    {
      taskId: "task-5",
      order: 5,
      brandedName: "社交寻配",
      purpose: "把信号发出去，让更多伙伴看到你",
      summary: "主线走稳之后，这一步只负责扩散，不会反过来阻塞资格。",
      isOptional: true,
      isExternalFlow: false,
      completionBadge: "可选信号已起草",
      cta: "要发就发，不发也不影响主线资格",
      stages: [
        {
          stageId: "task-5-draft",
          label: "生成社交信号",
          description: "先把当前的坐标、共振和阵营状态压成一段可转发的话。",
          status: "pending",
          proof: "社交文案草稿已生成"
        },
        {
          stageId: "task-5-publish",
          label: "发往 Telegram / X",
          description: "这一步只负责让更多伙伴看到你，是否真的发出由当前会话能力决定。",
          status: "pending",
          proof: "发出信号，让更多伙伴看到你"
        }
      ]
    }
  ];
}

const taskMilestonesByLocale = {
  zh: createTaskMilestones("zh"),
  en: createTaskMilestones("en")
} satisfies Record<LocaleCode, TaskMilestone[]>;

export function getTaskMilestones(locale: LocaleCode): TaskMilestone[] {
  return taskMilestonesByLocale[locale];
}

export const taskMilestones = getTaskMilestones("zh");
