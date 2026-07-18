import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("converts, filters, saves, and copies text", async ({ page }) => {
  await page.goto("/");

  const input = page.getByLabel("Your text");
  await input.fill("Hello 2");

  const smallCapsCard = page.locator(".result-card").filter({ hasText: "Small caps" }).first();
  await expect(smallCapsCard.locator(".result-value > span").first()).toHaveText("ʜᴇʟʟᴏ 2");

  await smallCapsCard.locator(".result-value").click();
  await expect(smallCapsCard.locator(".copy-pill")).toHaveText("Copied");

  await page.getByPlaceholder("Find a style").fill("Bubble");
  await expect(page.locator(".result-card")).toHaveCount(1);
  await page.locator(".favorite-button").click();
  await page.getByRole("button", { name: /Saved 1/ }).click();
  await expect(page.locator(".result-card")).toHaveCount(1);
});

test("shows a clear setup message when AI is not configured", async ({ page }) => {
  await page.goto("/#generator");
  await page.getByRole("button", { name: "AI caption starter" }).click();
  await page.getByPlaceholder("e.g. a quiet Sunday coffee").fill("A rainy bookshop");
  await page.getByRole("button", { name: "Generate caption" }).click();
  await expect(page.locator(".ai-error")).toContainText("HF_TOKEN");
});

test("renders focused tool pages and stays within the mobile viewport", async ({ page }, testInfo) => {
  await page.goto("/tools/superscript");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Superscript");
  await expect(page.locator(".featured-result")).toContainText("Superscript");

  if (testInfo.project.name === "mobile") {
    const widths = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    expect(widths.scroll).toBeLessThanOrEqual(widths.client);
  }
});

test("has no automatically detectable serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical",
  );
  expect(
    serious,
    serious.map((violation) => `${violation.id}: ${violation.help}`).join("\n"),
  ).toEqual([]);
});
