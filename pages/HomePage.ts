import {Page, Locator} from '@playwright/test'
import { promises } from 'node:dns';

export class HomePage{

    //define the variables - private and read only
    private readonly page: Page;
    private readonly productList:Promise<Locator[]>;
    //private readonly productListLocator:string;
    private readonly addToCartButton:Locator;
    private readonly CartLink:Locator;

    //constructor
    constructor(page: Page){
        this.page = page;

        //css selector targating all the product linkunder the product card
        this.productList = this.page.locator('div#tbodyid h4.card-title a').all();
        
      
        //Add to cart button(exact match using text)
        this.addToCartButton = this.page.locator('a:has-text("Add to cart")')

        //Cart Link in top menu
        this.CartLink=this.page.locator('#cartur')
      
    }

    //Methods to add a specfice product to cart
   async addProductToCart(productName:string):Promise<void>
    {
        const productElement = this.productList
  
            for(const product of await productElement){

               const name = await product.textContent();
               if(name?.trim() === productName){
                await product.click();
                break;
               }

            }
        //handle alert/dialog after clicking "Add To Cart"    
        this.page.once('dialog',async dialog=>{
            if(dialog.message().includes('added')){
                await dialog.accept();

            }
        });

        await this.addToCartButton.waitFor({ state: 'visible' });
        await this.addToCartButton.click();
    }
    //method to navigate to the cart
    async gotoCart(){
        await this.CartLink.click();
    }

}