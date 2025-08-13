import { test, expect } from '@playwright/test';
import exp from 'constants';

test('Form styling', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    
    const form = page.locator('form');

    await page.setViewportSize({width: 500, height: 1000});
    await expect(form).not.toHaveCSS('display','grid');

    await page.setViewportSize({width: 1000, height: 1000});
    await expect(form).toHaveCSS('display', 'grid');

    let width = await page.evaluate(()=> 
        window.getComputedStyle(document.querySelector('label')).getPropertyValue('width')
    );
    let width2 = await page.evaluate(()=> 
        window.getComputedStyle(document.querySelector('input')).getPropertyValue('width')
    );

    let x = Number( width.replace('px', '') );
    let y = Number( width2.replace('px', '') );

    expect(y/x).toBeGreaterThan(2);
    expect(y/x).toBeLessThan(4);

    await expect(form).toHaveCSS('width', '600px');
});