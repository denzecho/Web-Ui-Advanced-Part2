import { By } from 'selenium-webdriver';

class PageLogin {
    static inputUsername = By.xpath('//*[@id="user-name"]');
    static inputPassword = By.xpath('//*[@id="password"]');
    static buttonLogin = By.xpath('//*[@id="login-button"]');
    static dropdownSort = By.xpath('//*[@id="header_container"]/div[2]/div/span/select');
    static opsiZA = By.xpath('//*[@id="header_container"]/div[2]/div/span/select/option[2]');

}

export default PageLogin;

