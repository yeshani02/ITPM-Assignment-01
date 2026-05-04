import { test, expect } from '@playwright/test';

test('chat translator page loads', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/chat-translator');
  await expect(page).toHaveURL(/chat-translator/);
  await expect(page.locator('textarea').first()).toBeVisible();
});

