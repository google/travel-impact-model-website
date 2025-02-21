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

import { Page, expect, test } from "@playwright/test";

async function mockCurrentTime(page: Page, datetime: number) {
  await page.addInitScript(`{
    // Extend Date constructor to default to the mocked datetime.
    Date = class extends Date {
      constructor(...args) {
        if (args.length === 0) {
          super(${datetime});
        } else {
          super(...args);
        }
      }
    }
  }`);
}

test("render default", async ({ page }) => {
  await mockCurrentTime(page, new Date("April 2 2032").valueOf());
  await page.goto("/lookup/flight");
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("render single flight", async ({ page }) => {
  await page.goto("/lookup/flight?itinerary=ZRH-BOS-LX-54-20250827");
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("open emissions breakdown", async ({ page }) => {
  await page.goto("/lookup/flight?itinerary=ZRH-BOS-LX-54-20250827");
  await page.getByLabel("Show more rows").click();
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("render single flight with model version", async ({ page }) => {
  await page.goto("/lookup/flight?itinerary=ZRH-BOS-LX-54-20250827&v=1.2.3");
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("render invalid fields", async ({ page }) => {
  await page.goto("/lookup/flight?itinerary=ZR-BO-L-12BA-20200827");
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("transition to invalid state", async ({ page }) => {
  await page.goto("/lookup/flight?itinerary=ZRH-BOS-LX-54-20250827");
  await page.getByLabel("Origin", { exact: true }).fill("INVALID ORIGIN");
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("transition to valid state", async ({ page }) => {
  // Incorrect origin value.
  await page.goto("/lookup/flight?itinerary=Z-BOS-LX-54-20250827");
  await page.getByLabel("Origin", { exact: true }).fill("NEW");
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("show past dates tooltip", async ({ page }) => {
  await page.goto("/lookup/flight?itinerary=ZRH-BOS-LX-54-20250827");
  await page.getByLabel("Click to show tooltip.").click();
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("show 1 plus year future dates tooltip", async ({ page }) => {
  await page.goto("/lookup/flight?itinerary=ZRH-BOS-LX-54-20500827");
  await page.getByLabel("Click to show tooltip.").click();
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("render multiple flights", async ({ page }) => {
  await page.goto("/lookup/flight?itinerary=ZRH-NYC-LH-123-20300827,NYC-MUC-BA-456-20300827");
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("open wtw tooltip", async ({ page }) => {
  await page.goto("/lookup/flight?itinerary=ZRH-BOS-LX-54-20250827");
  await page.getByLabel("The sum of Well-to-Tank (WTT) and Tank-to-Wake (TTW) emissions.").click();
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("open ttw tooltip", async ({ page }) => {
  await page.goto("/lookup/flight?itinerary=ZRH-BOS-LX-54-20250827");
  await page.getByLabel("Show more rows").click();
  await page
    .getByLabel(
      "Emissions produced by burning jet fuel during takeoff, flight, and landing of an aircraft."
    )
    .click();
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("open wtt tooltip", async ({ page }) => {
  await page.goto("/lookup/flight?itinerary=ZRH-BOS-LX-54-20250827");
  await page.getByLabel("Show more rows").click();
  await page
    .getByLabel(
      "Emissions generated during the production, processing, handling, and delivery of jet fuel."
    )
    .click();
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("open typical tooltip", async ({ page }) => {
  await page.goto("/lookup/flight?itinerary=ZRH-BOS-LX-54-20250827");
  await page
    .getByLabel("Typical Well-to-Wake emissions for a flight between this origin and destination.")
    .click();
  await expect(page).toHaveScreenshot({ fullPage: true });
});
