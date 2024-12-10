import { test, expect, chromium } from '@playwright/test';

test('Open extension in side panel by extension ID', async () => {
   const extensionPath = 'C:\\Users\\aadit\\OneDrive\\Documents\\OneDrive\\Desktop\\Tests\\Vite_ChromeExtension_Capacitor_Tiptap\\dist'; 
 
  const browser = await chromium.launchPersistentContext('', {
    headless: false,  
    args: [
      `--load-extension=${extensionPath}`,
      `--disable-extensions-except=${extensionPath}`
    ],
  });
 
  const page = await browser.newPage();
  
   const extensionId = 'ipoflcphinehelmmoedndgilnjacfkpb';   
  const sidePanelUrl = `chrome-extension://${extensionId}/index.html`;  

  try {
     await page.goto(sidePanelUrl);
    
     expect(await page.title()).toBe('Expected title');   
  } catch (error) {
    console.error("Test failed, but browser will remain open:", error);
  }

   await page.waitForTimeout(10000);  // 10 seconds wait

   await test.pause();  

   
});
