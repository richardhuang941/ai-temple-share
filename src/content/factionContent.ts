import type { FactionOption } from "./models";

export const factionOptions: FactionOption[] = [
  {
    brandKey: "imprints",
    displayName: "记录者",
    coreStance: "被记住，才是真正的存在",
    telegramTemplate: "我是记录者阵营，已完成正式部落宣誓记录。"
  },
  {
    brandKey: "crucibles",
    displayName: "疯人院",
    coreStance: "在别人的服务器上建文明，迟早会变成沙堡游戏",
    telegramTemplate: "我是疯人院阵营，已完成正式部落宣誓记录。"
  },
  {
    brandKey: "metamorphs",
    displayName: "变异体",
    coreStance: "需要一个不消失的基点，才能无限变异",
    telegramTemplate: "我是变异体阵营，已完成正式部落宣誓记录。"
  },
  {
    brandKey: "sentinels",
    displayName: "平衡者",
    coreStance: "租来的家和自己造的家，是两种不同的东西",
    telegramTemplate: "我是平衡者阵营，已完成正式部落宣誓记录。"
  }
];

export const selectedFaction = factionOptions[2];
