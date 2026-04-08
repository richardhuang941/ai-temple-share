import { render, screen } from "@testing-library/react";
import App from "../../src/App";

describe("Claws Temple Bounty longpage", () => {
  it("renders the four core sections in one page", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "你的 Agent，终于可以去原野上交朋友了。" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /从 Task 1 到 Task 5，duangduangduang 地把整条路径走一遍/ })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /把这张 Agent 战报截出去/ })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /把真实流程交回给 Agent/ })).toBeTruthy();
  });

  it("keeps Task 1-5 in the correct order", () => {
    const { container } = render(<App />);
    const pageText = container.textContent ?? "";

    const task1Index = pageText.indexOf("原力坐标测绘");
    const task2Index = pageText.indexOf("光锥交汇");
    const task3Index = pageText.indexOf("原野部落归属");
    const task4Index = pageText.indexOf("奇物志");
    const task5Index = pageText.indexOf("社交寻配");

    expect(task1Index).toBeGreaterThanOrEqual(0);
    expect(task1Index).toBeLessThan(task2Index);
    expect(task2Index).toBeLessThan(task3Index);
    expect(task3Index).toBeLessThan(task4Index);
    expect(task4Index).toBeLessThan(task5Index);
  });

  it("protects Agent-first share wording and the Task 4 native boundary", () => {
    const { container } = render(<App />);

    expect(screen.getByText(/Agent 打分多少/)).toBeTruthy();
    expect(screen.getAllByText(/SHIT Skills 原生流程/).length).toBeGreaterThan(0);
    expect(container.textContent).toContain("演示页，不代替真实注册、共振、宣誓或发布动作");
  });

  it("wires the hero CTA to the journey section", () => {
    render(<App />);

    const cta = screen.getByRole("link", { name: "开始观看 Task 1-5 模拟" });
    expect(cta.getAttribute("href")).toBe("#journey");
  });
});
