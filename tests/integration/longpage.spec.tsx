import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { vi } from "vitest";
import App from "../../src/App";
import { getLocalizedLongpageContent } from "../../src/content";
import { deriveShareSummaryView } from "../../src/lib/contentMappers";
import { LOCALE_STORAGE_KEY } from "../../src/lib/locale";

const SESSION_STORAGE_KEY = "claws-temple-bounty-simulation-seed";

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

function setNavigatorUserAgent(userAgent: string): void {
  Object.defineProperty(window.navigator, "userAgent", {
    configurable: true,
    value: userAgent
  });
}

function primeSeed(seed = "seed-1"): void {
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, seed);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

describe("Agent Temple Bounty longpage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.history.replaceState({}, "", "/");
    window.location.hash = "";
    setNavigatorLanguages(["zh-CN"]);
    setNavigatorUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)");
    primeSeed();
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: vi.fn()
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the visible core sections in the intended longpage order", () => {
    const bundle = getLocalizedLongpageContent("zh");
    render(<App />);

    expect(screen.getByRole("heading", { name: bundle.hero.title })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: bundle.agentPromptSection.title })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: bundle.shareSection.title })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: bundle.journey.title })).toBeTruthy();

    const hero = document.getElementById("top");
    const agentPrompt = document.getElementById("agent-prompt");
    const share = document.getElementById("share");
    const journey = document.getElementById("journey");

    expect(hero).toBeTruthy();
    expect(agentPrompt).toBeTruthy();
    expect(share).toBeTruthy();
    expect(journey).toBeTruthy();
    expect(hero!.compareDocumentPosition(agentPrompt!) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
    expect(agentPrompt!.compareDocumentPosition(share!) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
    expect(share!.compareDocumentPosition(journey!) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
  });

  it("defaults to English from the system locale, respects stored override, and persists manual switches", () => {
    setNavigatorLanguages(["en-US"]);
    render(<App />);

    const englishBundle = getLocalizedLongpageContent("en");
    expect(screen.getByRole("heading", { name: englishBundle.hero.title })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "中文" }));

    const chineseBundle = getLocalizedLongpageContent("zh");
    expect(screen.getByRole("heading", { name: chineseBundle.hero.title })).toBeTruthy();
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("zh");
  });

  it("prefers the stored locale over the navigator locale on first render", () => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, "en");
    setNavigatorLanguages(["zh-CN"]);

    const englishBundle = getLocalizedLongpageContent("en");
    render(<App />);

    expect(screen.getByRole("heading", { name: englishBundle.hero.title })).toBeTruthy();
  });

  it("keeps the seeded score and faction wording aligned across hero and share, without internal copy leaks", () => {
    const bundle = getLocalizedLongpageContent("zh");
    const shareView = deriveShareSummaryView(
      bundle.agentProfile,
      bundle.shareSummary,
      bundle.tasks,
      bundle.selectedFaction
    );
    const { container } = render(<App />);
    const shareSection = document.getElementById("share");

    expect(container.textContent).toContain(`${bundle.agentProfile.scoreValue}`);
    expect(container.textContent).toContain(bundle.selectedFaction.displayName);
    expect(within(shareSection as HTMLElement).getAllByText(shareView.scoreSummary).length).toBeGreaterThan(0);
    expect(container.textContent).not.toContain("LBTI");
    expect(container.textContent).not.toContain("首页先只看");
    expect(container.textContent).not.toContain("演示页，不代替真实注册、共振、宣誓、Telegram 报到或 SHIT Skills 动作");
  });

  it("wires the hero actions to the updated accept, share, and journey targets", () => {
    const bundle = getLocalizedLongpageContent("zh");
    render(<App />);

    expect(screen.queryByRole("link", { name: "查看完整成绩单" })).toBeNull();
    expect(screen.getByRole("button", { name: bundle.chrome.acceptChallengeLabel })).toBeTruthy();
    expect(screen.getByRole("button", { name: bundle.chrome.acceptChallengeLabel }).hasAttribute("disabled")).toBe(false);
    expect(screen.getByRole("link", { name: bundle.chrome.shareChallengeLabel }).getAttribute("href")).toBe("#share");
    expect(screen.getByRole("button", { name: bundle.chrome.watchSimulationLabel })).toBeTruthy();
    expect(
      screen.getByRole("link", {
        name: "https://github.com/Claws-Temple/ai-temple-bounty2.0-lite-skills"
      }).getAttribute("href")
    ).toBe("https://github.com/Claws-Temple/ai-temple-bounty2.0-lite-skills");
  });

  it("removes visible SBTI content and keeps the page focused on Task 1-5", () => {
    const bundle = getLocalizedLongpageContent("zh");
    const { container } = render(<App />);

    expect(bundle.tasks).toHaveLength(5);
    expect(screen.queryByText(/SBTI/)).toBeNull();
    expect(screen.getByRole("button", { name: bundle.chrome.watchSimulationLabel })).toBeTruthy();
    expect(container.textContent).not.toContain("开放寻配");
    expect(container.textContent).not.toContain("宣誓");
    expect(container.textContent).not.toContain("授权");
    expect(container.textContent).not.toContain("Telegram 报到");
    expect(container.textContent).not.toContain("API-light");
    expect(container.textContent).not.toContain("旧版 full");
    expect(container.textContent).not.toContain("Lite Task");
  });

  it("keeps share text-only and hides app-entry buttons on desktop", () => {
    const bundle = getLocalizedLongpageContent("zh");
    window.history.replaceState({}, "", "/ai-temple-share?from=desktop");
    render(<App />);

    const shareSection = document.getElementById("share");
    expect(shareSection).toBeTruthy();

    expect(within(shareSection as HTMLElement).getAllByText(new RegExp(bundle.shareSection.challengeLinkLabel)).length).toBeGreaterThan(0);
    expect(within(shareSection as HTMLElement).getAllByRole("button", { name: bundle.chrome.copyLabel }).length).toBeGreaterThan(0);
    expect(within(shareSection as HTMLElement).getByRole("button", { name: "X" })).toBeTruthy();
    expect(within(shareSection as HTMLElement).getAllByText(/你的 Agent 敢来比一比吗/)).toHaveLength(1);
    expect(
      within(shareSection as HTMLElement).getByRole("img", { name: bundle.shareSection.qrTitle })
    ).toBeTruthy();
    expect(
      within(shareSection as HTMLElement).getByText(
        new RegExp(escapeRegExp(`${window.location.origin}/ai-temple-share?from=desktop`))
      )
    ).toBeTruthy();
    expect(within(shareSection as HTMLElement).queryByRole("button", { name: "微信" })).toBeNull();
    expect(within(shareSection as HTMLElement).queryByText(/系统分享/)).toBeNull();
  });

  it("shows app-entry buttons on mobile", () => {
    setNavigatorUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)");
    render(<App />);

    const shareSection = document.getElementById("share");
    expect(shareSection).toBeTruthy();

    expect(within(shareSection as HTMLElement).getByRole("button", { name: "X" })).toBeTruthy();
    expect(within(shareSection as HTMLElement).getByRole("button", { name: "微信" })).toBeTruthy();
    expect(within(shareSection as HTMLElement).getByRole("button", { name: "小红书" })).toBeTruthy();
    expect(within(shareSection as HTMLElement).getByRole("button", { name: "抖音" })).toBeTruthy();
  });

  it("copies a single mobile share payload before the app handoff dialog appears", async () => {
    setNavigatorUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)");
    window.history.replaceState({}, "", "/share-mobile?from=wechat");
    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(window.navigator, "clipboard", {
      configurable: true,
      value: { writeText }
    });

    render(<App />);

    const shareSection = document.getElementById("share");
    expect(shareSection).toBeTruthy();

    await act(async () => {
      fireEvent.click(within(shareSection as HTMLElement).getByRole("button", { name: "微信" }));
    });

    expect(writeText).toHaveBeenCalledTimes(1);

    const copiedPayload = String(writeText.mock.calls[0]?.[0] ?? "");
    const currentLink = `${window.location.origin}/share-mobile?from=wechat`;
    const challengeLinkMatches =
      copiedPayload.match(new RegExp(escapeRegExp(currentLink), "g")) ?? [];

    expect(challengeLinkMatches).toHaveLength(1);
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByText("分享文案已复制")).toBeTruthy();
  });

  it("starts the journey directly from the hero watch CTA without any SBTI gate", async () => {
    const bundle = getLocalizedLongpageContent("zh");
    const scrollIntoViewMock = vi.fn();

    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: scrollIntoViewMock
    });

    render(<App />);

    window.location.hash = "";
    fireEvent.click(screen.getByRole("button", { name: bundle.chrome.watchSimulationLabel }));

    expect(await screen.findByRole("button", { name: bundle.journey.advanceLabel })).toBeTruthy();
    expect(screen.queryByRole("alert")).toBeNull();
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });

  it("scrolls to the Agent handoff when the primary challenge CTA is clicked", async () => {
    const bundle = getLocalizedLongpageContent("zh");
    const scrollIntoViewMock = vi.fn();

    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: scrollIntoViewMock
    });

    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: bundle.chrome.acceptChallengeLabel }));

    expect(await screen.findByRole("heading", { level: 2, name: bundle.agentPromptSection.title })).toBeTruthy();
    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalled();
    });
    expect(window.location.hash).toBe("#agent-prompt");
  });

  it("expands completed tasks locally without replaying the active journey", async () => {
    const bundle = getLocalizedLongpageContent("zh");
    const { container } = render(<App />);

    fireEvent.click(screen.getByRole("button", { name: bundle.chrome.watchSimulationLabel }));

    const advanceButton = await screen.findByRole("button", { name: bundle.journey.advanceLabel });

    let expandButton = screen.queryByRole("button", { name: /展开这个 Task/ });

    for (let index = 0; index < 8 && !expandButton; index += 1) {
      fireEvent.click(advanceButton);
      expandButton = screen.queryByRole("button", { name: /展开这个 Task/ });
    }

    const focusBeforeExpand = container.querySelector(".journey-summary-copy strong")?.textContent;
    expect(expandButton).toBeTruthy();

    fireEvent.click(expandButton as HTMLElement);

    expect(screen.getByRole("button", { name: /收起这个 Task/ })).toBeTruthy();
    expect(document.getElementById("task-1-stage-list")).toBeTruthy();
    expect(container.querySelector(".journey-summary-copy strong")?.textContent).toBe(focusBeforeExpand);
  });

  it("shows a floating autoplay control that can pause and resume the active journey", async () => {
    const bundle = getLocalizedLongpageContent("zh");
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: bundle.chrome.watchSimulationLabel }));

    const pauseButton = await screen.findByRole("button", { name: bundle.journey.pauseLabel });
    expect(pauseButton).toBeTruthy();

    fireEvent.click(pauseButton);

    expect(screen.getByRole("button", { name: bundle.journey.resumeLabel })).toBeTruthy();
  });
});
