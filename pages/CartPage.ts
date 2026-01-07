import {Page, Locator} from '@playwright/test'

export class CartPage{
    //define the variables - private and read only
    private page: Page;
    private productNameInCart:Promise<Locator[]>;

     //constructor
    constructor(page: Page){
        this.page = page;

        //Css selector to select all product name from cells in the cart table
        this.productNameInCart = this.page.locator('#tbodyid td:nth-child(2)').all();
    }
    //method to check if specfic product is present in the cart
    async checkProductInCart(productName:string): Promise<boolean> {
        const products = this.productNameInCart;
        for(const product of await products){
            const name = (await product.textContent())?.trim();
            console.log(name);
            if(name === productName){
                return true;
            }
        }
        return false;
    }
}
