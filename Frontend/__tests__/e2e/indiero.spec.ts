import { expect, test } from '@playwright/test';

test('has wordCloud keyword', async ({ page }) => {
  await page.goto('https://indiero.com/home');

  await page.getByText('자립', { exact: true }).click();

  const inputElement = await page.locator('input[placeholder="자립"]');

  await expect(inputElement).toBeVisible();
});
