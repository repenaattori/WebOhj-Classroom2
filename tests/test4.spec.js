import { test, expect } from '@playwright/test';
import exp from 'constants';

test('Button styling', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    
    const button = page.locator('button');

    await page.setViewportSize({width: 500, height: 1000});
    await expect(button).toHaveCSS('grid-column', 'auto');

    await page.setViewportSize({width: 1000, height: 1000});

    await expect(button).toHaveCSS('grid-column', new RegExp('1 / 3|1 / span 2|1 / -1'));
    await expect(button).toHaveCSS('justify-self', 'center');
    
    let bw = await page.evaluate(()=> 
        window.getComputedStyle(document.querySelector('button')).getPropertyValue('width')
    );
    let pw = await page.evaluate(()=> 
        window.getComputedStyle(document.querySelector('button').parentElement).getPropertyValue('width')
    );

    let x = Number( bw.replace('px', '') );
    let y = Number( pw.replace('px', '') );

    expect(x/y).toBeGreaterThan(0.69);
    expect(x/y).toBeLessThan(0.71);

});