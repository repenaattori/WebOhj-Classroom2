import { test, expect } from '@playwright/test';

test('Content styling', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    
    const div = page.locator('#content');

    await page.setViewportSize({width: 500, height: 1000});
    await expect(div).toHaveCSS('display', 'block');
    await expect(div).not.toHaveCSS('justify-content', 'center');


    await page.setViewportSize({width: 1000, height: 1000});
    await expect(div).toHaveCSS('display', 'flex');
    await expect(div).toHaveCSS('justify-content', 'center');

   
});