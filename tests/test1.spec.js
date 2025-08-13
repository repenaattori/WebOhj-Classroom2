import { test, expect } from '@playwright/test';

test('Image and header', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    const image = page.locator('img');
    const h1 = page.locator('h1');
    await page.setViewportSize({width: 500, height: 1000});
    await expect(image).not.toBeInViewport();
    await expect(h1).not.toHaveCSS('font-size', '48px')

    await page.setViewportSize({width: 1000, height: 1000});
    await expect(image).toBeInViewport();
    await expect(h1).toHaveCSS('font-size', '48px')
});