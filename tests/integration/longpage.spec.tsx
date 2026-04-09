import { act, fireEvent, render, screen, within } from "@testing-library/react";
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

function primeSeed(seed = "seed-1"): void {
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, seed);
}

async function triggerHashNavigation(hash: string): Promise<void> {
  await act(async () => {
    window.location.hash = hash;
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
}

describe("Claws Temple Bounty longpage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.hash = "";
    setNavigatorLanguages(["zh-CN"]);
    primeSeed();
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: vi.fn()
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the four core sections in the intended longpage order", () => {
    const bundle = getLocalizedLongpageContent("zh");
    render(<App />);

    expect(screen.getByRole("heading", { name: bundle.hero.title })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: bundle.agentPromptSection.title })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: bundle.shareSection.title })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: bundle.journey.title })).toBeTruthy();

    const hero = document.getElementById("top");
    const prompt = document.getElementById("agent-prompt");
    const share = document.getElementById("share");
    const journey = document.getElementById("journey");

    expect(hero).toBeTruthy();
    expect(prompt).toBeTruthy();
    expect(share).toBeTruthy();
    expect(journey).toBeTruthy();
    expect(hero!.compareDocumentPosition(prompt!) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
    expect(prompt!.compareDocumentPosition(share!) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
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
    expect(within(shareSection as HTMLElement).getByText(shareView.title)).toBeTruthy();
    expect(container.textContent).not.toContain("首页先只看");
    expect(container.textContent).not.toContain("演示页，不代替真实注册、共振、宣誓、Telegram 报到或 SHIT Skills 动作");
  });

  it("wires the three hero CTAs to the correct sections", () => {
    const bundle = getLocalizedLongpageContent("zh");
    render(<App />);

    expect(screen.queryByRole("link", { name: "查看完整成绩单" })).toBeNull();
    expect(screen.getByRole("link", { name: bundle.chrome.acceptChallengeLabel }).getAttribute("href")).toBe("#agent-prompt");
    expect(screen.getByRole("link", { name: bundle.chrome.shareChallengeLabel }).getAttribute("href")).toBe("#share");
    expect(screen.getByRole("link", { name: bundle.chrome.watchSimulationLabel }).getAttribute("href")).toBe("#journey");
  });

  it("switches the share surface between image and text modes", () => {
    const bundle = getLocalizedLongpageContent("zh");
    render(<App />);

    const shareSection = document.getElementById("share");
    expect(shareSection).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: bundle.chrome.shareTextLabel }));

    expect(within(shareSection as HTMLElement).getByText(new RegExp(bundle.shareSection.challengeLinkLabel))).toBeTruthy();
    expect(within(shareSection as HTMLElement).getAllByRole("button", { name: bundle.chrome.copyLabel }).length).toBeGreaterThan(0);
  });

  it("only starts the journey from the watch-simulation CTA and emphasizes the prompt on accept", async () => {
    const bundle = getLocalizedLongpageContent("zh");
    const scrollIntoViewMock = vi.fn();

    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: scrollIntoViewMock
    });

    render(<App />);

    fireEvent.click(screen.getByRole("link", { name: bundle.chrome.acceptChallengeLabel }));
    const promptCard = document.querySelector(".prompt-card");

    expect(promptCard?.getAttribute("data-emphasized")).toBe("true");
    expect(scrollIntoViewMock).not.toHaveBeenCalled();

    window.location.hash = "";

    fireEvent.click(screen.getByRole("link", { name: bundle.chrome.watchSimulationLabel }));
    await triggerHashNavigation("#journey");

    expect(await screen.findByRole("button", { name: bundle.journey.advanceLabel })).toBeTruthy();
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });
});
