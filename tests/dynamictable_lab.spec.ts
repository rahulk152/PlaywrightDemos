import{test,expect,Locator} from '@playwright/test'

test("Scenario 1: CPU load of Chrome should match",async({page})=>{
    
    //Approch 1: 
   /* page.goto("https://testautomationpractice.blogspot.com/");

    //Get the Table
    const table:Locator=page.locator("#taskTable>tbody");
    await page.waitForTimeout(5000);
    await expect(table).toBeVisible();

    //Select all the rows, then find number of rows
    const rows:Locator[]=await table.locator("tr").all();
    console.log("Number of rows in table :",rows.length);
    expect(rows).toHaveLength(4);

    //Step 1: For Chrome process get value of CPU load.
    // Read each row to check Chrome presence
    let cpuLoad = '';
    for(const row of rows){
        const processName:string=await row.locator("td").nth(0).innerText();
        if(processName==="chrome"){
            cpuLoad=await row.locator('td:has-text("%")').innerText();
            console.log("CPU Load of Chrome:",cpuLoad ); //2.9%
            break;
        }

    }

    //Step2: Compare it with value in the yellow label.
    let cpuloadtext: string=await page.locator("strong.chrome-cpu").innerText();
    console.log("Chrome CPU load from yellow box:",cpuloadtext );
    if(cpuloadtext.includes(cpuLoad)){
        
    console.log("CPU load of Chrome is equal.");
    }else{
    console.log("CPU load of Chrome is Not equal.");
    }
    expect(cpuloadtext).toContain(cpuLoad);*/

   //Approach 2:
     await page.goto('https://testautomationpractice.blogspot.com/');
   
     const rows: Locator[] = await page.locator("table#taskTable tbody tr").all();
   
     for (const row of rows) {
       const processName = await row.locator('td').nth(0).innerText();
       if (processName === 'Chrome') {
         const cpuLoad = await row.locator("td",{hasText : '%'}).innerText();
         const expectedCpu = await page.locator('strong.chrome-cpu').innerText();
         expect(cpuLoad).toBe(expectedCpu);
         break;
       }
     }

})

test("Scenario 2: Memory usage of Firefox should match blue label",async({page})=>{
     await page.goto('https://testautomationpractice.blogspot.com/');
   
     const rows: Locator[] = await page.locator("table#taskTable tbody tr").all();
   
     for (const row of rows) {
       const processName = await row.locator('td').nth(0).innerText();
       if (processName === 'Firefox') {
        //const memoryUsage = await row.locator("td", {hasText: 'MB' }).innerText();//Here MB is matching with 3 elements. so use regex like below
              const memoryUsage = await row.locator("td", { hasText: /MB$/ }).innerText();
              const expectedMemory = await page.locator('strong.firefox-memory').innerText();
              expect(memoryUsage).toBe(expectedMemory);
              break;
       }
     }
})

test('Scenario 3: Network speed of Chrome should match orange label', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

  const rows: Locator[] = await page.locator("table#taskTable tbody tr").all();

  for (const row of rows) {
    const processName = await row.locator('td').nth(0).innerText();
    if (processName === 'Chrome') {
      const networkSpeed = await row.locator("td",{hasText : 'Mbps'}).innerText();
      const expectedNetwork = await page.locator('strong.chrome-network').innerText();
      expect(networkSpeed).toBe(expectedNetwork);
      break;
    }
  }
});

test('Scenario 4: Disk space of Firefox should match violet label', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

  const rows: Locator[] = await page.locator("table#taskTable tbody tr").all();

  for (const row of rows) {
    const processName = await row.locator('td').nth(0).innerText();
    if (processName === 'Firefox') {
      const diskSpace = await row.locator("td", {hasText : 'MB/s'}).innerText();
      const expectedDisk = await page.locator('strong.firefox-disk').innerText();
      expect(diskSpace).toBe(expectedDisk);
      break;
    }
  }
});

