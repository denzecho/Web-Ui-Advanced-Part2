
import { Builder,By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import PageLogin from '../../pages/page_login.js'; 
import pageInventory from '../../pages/page_inventory.js';
import assert from 'assert';
import fs from 'fs';
import {PNG} from 'pngjs';
import pixelmatch from 'pixelmatch';   
let driver; 

describe('Pengujian otomatis website saucedemo', function () {

   beforeEach(async function () {
           console.log('ini didalam beforeEach hook');
           const options = new chrome.Options();
           options.addArguments('--incognito');
   
           driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
           await driver.manage().window().maximize();
           console.log('Buka halaman web');
           await driver.get('https://www.saucedemo.com/');
       });
       afterEach(async function () {
           if (driver) {
                await driver.quit();
            }
       });
   
    
    it('Login Berhasil', async function () {
        
        console.log('Masukkan username dan password');
        const masukanUsername = await driver.findElement(PageLogin.inputUsername);
        const masukkanPassword = await driver.findElement(PageLogin.inputPassword);
        const tombolLogin = await driver.findElement(PageLogin.buttonLogin);

        await masukanUsername.sendKeys('standard_user'); 
        await masukkanPassword.sendKeys('secret_sauce');    
        await tombolLogin.click();

        console.log('Validasi Url setelah login');
        const urlSaatini = await driver.getCurrentUrl();
        assert.strictEqual(urlSaatini, 'https://www.saucedemo.com/inventory.html', 'Halaman yang dituju tidak sesuai');
        console.log('Berhasil Masuk ke halaman inventory');

       
    });

    it('Sortir produk Z ke A', async function () {
               
        console.log('Masukkan username dan password');
        const masukanUsername = await driver.findElement(PageLogin.inputUsername);
        const masukkanPassword = await driver.findElement(PageLogin.inputPassword);
        const tombolLogin = await driver.findElement(PageLogin.buttonLogin);

        await masukanUsername.sendKeys('standard_user'); 
        await masukkanPassword.sendKeys('secret_sauce');
        await tombolLogin.click();

        console.log('Validasi Url setelah login');
        const urlSaatini = await driver.getCurrentUrl();
        assert.strictEqual(urlSaatini, 'https://www.saucedemo.com/inventory.html', 'Halaman yang dituju tidak sesuai');
        console.log('Berhasil Masuk ke halaman inventory');

       
        console.log('Sortir produk Z ke A');
        const dropdown = await driver.findElement(PageLogin.dropdownSort);
        await dropdown.click();

        const opsiZA = await driver.findElement(PageLogin.opsiZA);
        await opsiZA.click();
        console.log('Berhasil sortir produk');

        
    });

    
    it('Screenshoot halaman finish', async function () {
        
       
        console.log('Masukkan Username dan Password');
        const masukkanUsername = await driver.findElement(PageLogin.inputUsername);
        const masukkanPassword = await driver.findElement(PageLogin.inputPassword);
        const tombolLogin = await driver.findElement(PageLogin.buttonLogin);
        
        
        await masukkanUsername.sendKeys('standard_user');
        await masukkanPassword.sendKeys('secret_sauce');
        await tombolLogin.click();

        
        console.log('Pilih produk yang akan dibeli');
        const produk1 = await driver.findElement(pageInventory.button_bag);
        const produk2 = await driver.findElement(pageInventory.button_onsie);
        
        await produk1.click();
        await produk2.click();
        console.log('Produk berhasil ditambahkan ke keranjang');
        
        
        console.log('masuk ke keranjang');
        const keranjang = await driver.findElement(pageInventory.buttonCart);
        await keranjang.click();

        
        const checkout = await driver.findElement(pageInventory.buttonCheckout);
        await checkout.click();

        
        console.log('Isi form checkout');
        const inputFirstName = await driver.findElement(pageInventory.inputFirstName);
        const inputLastName = await driver.findElement(pageInventory.inputLastName);
        const inputZipCode = await driver.findElement(pageInventory.inputZipCode);
        await inputFirstName.sendKeys('Denz');       
        await inputLastName.sendKeys('Echo');            
        await inputZipCode.sendKeys('16451');
        

    
        const tombolContinue = await driver.findElement(pageInventory.buttonContinue);
        await tombolContinue.click();

        
        const tombolfinish = await driver.findElement(pageInventory.buttonFinish);
        await tombolfinish.click();

       
        console.log('Screenshoot halaman checkout');
        const screenshoot = await driver.takeScreenshot();
        const imgBuffer = Buffer.from(screenshoot, "base64");
        fs.writeFileSync("Current.png", imgBuffer);


      
        if (!fs.existsSync('baseline.png')) {
            fs.copyFileSync('Current.png', 'baseline.png');
            console.log('Baseline image saved.');
        }

        
        let img1 = PNG.sync.read(fs.readFileSync('baseline.png'));
        let img2 = PNG.sync.read(fs.readFileSync('Current.png'));
        let { width, height } = img1;
        let diff = new PNG({ width, height });

        let numDiffPixel = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

        fs.writeFileSync('diff.png', PNG.sync.write(diff));

        if (numDiffPixel > 0) {
            console.log('Visual berbeda ditemukan! Piksel berbeda:', numDiffPixel);
        } else {
            console.log('Tidak ditemukan perbedaan visual.');
        }

    })

});