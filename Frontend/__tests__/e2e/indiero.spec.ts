import { expect, test } from '@playwright/test';

test('should display input with correct placeholder after clicking keyword', async ({ page }) => {
  await page.goto('https://indie-ro.github.io/INDIE-RO/home');

  await page.getByText('자립', { exact: true }).click();

  const inputElement = await page.locator('input[placeholder="자립"]');

  await expect(inputElement).toBeVisible();
});

test('should display custom information box after survey completion', async ({ page }) => {
  await page.goto('https://indie-ro.github.io/INDIE-RO');

  await page.getByRole('button', { name: '설문 시작하기' }).click();
  await page.locator('input[type="checkbox"][value="교육"]').check();
  await page.getByRole('button', { name: '다음' }).click();
  await page.locator('input[type="checkbox"][value="서울"]').check();
  await page.getByRole('button', { name: '다음' }).click();
  await page.locator('input[type="checkbox"][value="25~29세"]').check();
  await page.getByRole('button', { name: '완료' }).click();

  await page.waitForTimeout(2000);

  const customInfoBox = page.locator('[data-testid="custom-info-box"]');

  await expect(customInfoBox).toBeVisible();

  await expect(customInfoBox).toContainText(['25~29세 • 교육 • 서울']);
});
