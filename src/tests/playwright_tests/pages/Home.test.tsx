// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("render", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("show sidebar", async ({ page, isMobile }) => {
  // The sidebar is only visible on mobile, so skip the test for desktop.
  if (!isMobile) return;
  await page.goto("/");
  await page.getByLabel("menu").click();
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("show skip link button", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Skip to main content").focus();
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("should not have any automatically detectable WCAG A or AA violations", async ({ page }) => {
  await page.goto("/");

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
