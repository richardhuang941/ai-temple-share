import { act, fireEvent, render, screen, within } from "@testing-library/react";
import App from "../../src/App";

function setNavigatorLanguages(languages: string[], language = languages[0] ?? "zh-CN"): void {
  Object.defineProperty(window.navigator, "languages", {
    configurable: true,
    value: languages
  });
  Object.defineProperty(window.navigator, "language", {
    configurable: true,
    value: language
  });
}

describe("Claws Temple Bounty longpage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.location.hash = "";
    setNavigatorLanguages(["zh-CN"]);
  });

  it("renders the four core sections in one page", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "你的 Agent，已经准备好接受挑战。" })).toBeTruthy();
    expect(
      screen.getByRole("heading", { level: 2, name: /让你的 AI Agent 执行以下命令/ })
    ).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: /把这张战书转出去/ })).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /想看完整路径时，再主动触发 Task 1 到 Task 5 的模拟/
      })
    ).toBeTruthy();
  });

  it("keeps Task 1-5 in the correct order", () => {
    render(<App />);

    const journeySection = document.getElementById("journey");
    expect(journeySection).toBeTruthy();

    const journeyText = journeySection?.textContent ?? "";

    const task1Index = journeyText.indexOf("原力坐标测绘");
    const task2Index = journeyText.indexOf("光锥交汇");
    const task3Index = journeyText.indexOf("原野部落归属");
    const task4Index = journeyText.indexOf("奇物志");
    const task5Index = journeyText.indexOf("社交寻配");

    expect(task1Index).toBeGreaterThanOrEqual(0);
    expect(task1Index).toBeLessThan(task2Index);
    expect(task2Index).toBeLessThan(task3Index);
    expect(task3Index).toBeLessThan(task4Index);
    expect(task4Index).toBeLessThan(task5Index);
  });

  it("defaults to English when the system language prefers English, and can switch back manually", () => {
    setNavigatorLanguages(["en-US"]);
    render(<App />);

    expect(screen.getByRole("heading", { name: "Your Agent is ready to take the challenge." })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "中文" }));

    expect(screen.getByRole("heading", { name: "你的 Agent，已经准备好接受挑战。" })).toBeTruthy();
  });

  it("protects Agent-first share wording and the Task 4 native boundary", () => {
    const { container } = render(<App />);

    expect(screen.getAllByText(/Agent 打分 92 \/ 100/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/SHIT Skills 原生流程/).length).toBeGreaterThan(0);
    expect(container.textContent).toContain("Agent");
    expect(container.textContent).toContain("演示页，不代替真实注册、共振、宣誓、Telegram 报到或 SHIT Skills 动作");
  });

  it("wires the three hero CTAs to the correct sections", () => {
    render(<App />);

    expect(screen.getByRole("link", { name: "接受挑战，立刻开测" }).getAttribute("href")).toBe("#agent-prompt");
    expect(screen.getByRole("link", { name: "转发战书给朋友" }).getAttribute("href")).toBe("#share");
    expect(screen.getByRole("link", { name: "观看模拟 Task 1-5 的流程" }).getAttribute("href")).toBe("#journey");
  });

  it("switches the share surface between image and text modes", () => {
    render(<App />);

    const shareSection = document.getElementById("share");
    expect(shareSection).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "分享文字" }));

    expect(within(shareSection as HTMLElement).getByText(/挑战链接/)).toBeTruthy();
    expect(within(shareSection as HTMLElement).getAllByRole("button", { name: "复制" }).length).toBeGreaterThan(0);
  });

  it("starts the journey only after the user intentionally targets the section", async () => {
    render(<App />);

    expect(screen.getByRole("button", { name: "开始观看模拟" })).toBeTruthy();

    await act(async () => {
      window.location.hash = "#journey";
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });

    expect(await screen.findByRole("button", { name: "手动推进一格" })).toBeTruthy();
  });
});
