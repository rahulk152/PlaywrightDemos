import {test, expect, Locator} from '@playwright/test'

test('Product sort and print lowest/highest price with names',async({page})=>{
    // Navigatge to URL
    await page.goto('https://www.bstackdemo.com/')

    //Locate the "Order by" dropdown element.
    const orderByDropdown:Locator=page.locator('.sort>select');
    await expect(orderByDropdown).toBeVisible(); // Assert dropdown is visible
    await expect(orderByDropdown).toBeEnabled(); // Assert dropdown is enabled
    
    //Select the option "Lowest to highest" from the dropdown.
    await orderByDropdown.selectOption('lowestprice')

    //Retrieve the list of product price elements.
    const productPrice:Locator=page.locator('.val')

    //Retrieve the list of product name elements.
    const productTitle:Locator=page.locator('p.shelf-item__title')

    const prices:string[] = await productPrice.allTextContents();
    const names:string[] = await productTitle.allTextContents();
    
    expect(prices.length).toBe(names.length); // Assert that prices and names count are equal
    console.log('Printing Product Names along with their Prices.......');
    for (let i = 0; i < names.length; i++) {
        console.log(`${names[i]} : ${prices[i]}`);
    }

    console.log(`Lowest Priced Product: ${names[0]} : ${prices[0]}`);
    console.log(`Highest Priced Product: ${names[names.length - 1]} : ${prices[prices.length - 1]}`);
})