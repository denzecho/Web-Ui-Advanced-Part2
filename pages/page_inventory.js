import { By } from 'selenium-webdriver';

class pageInventory {
    static button_bag = By.xpath('//*[@id="add-to-cart-sauce-labs-backpack"]');
    static button_onsie = By.xpath('//*[@id="add-to-cart-sauce-labs-onesie"]');
    static buttonCart = By.xpath('//*[@id="shopping_cart_container"]/a');
    static buttonCheckout = By.xpath('//*[@id="checkout"]');
    static inputFirstName = By.xpath('//*[@id="first-name"]');
    static inputLastName = By.xpath('//*[@id="last-name"]');    
    static inputZipCode = By.xpath('//*[@id="postal-code"]');
    static buttonContinue = By.xpath('//*[@id="continue"]');
    static buttonFinish = By.xpath('//*[@id="finish"]');
    
}
export default pageInventory;