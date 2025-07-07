import { test, expect } from '@playwright/test';
/*
import { getTwo_Factor } from '../db/db_users_data';
*/
import { LoginPage } from '../pageobjects/login/LoginPage';

import { sequelize } from '../dbz/db';

import { User } from '../models/User';

test.beforeAll(async () => {
  await sequelize.authenticate();
  await sequelize.sync(); // opcional: asegura sincronización con la BD
});

const testData = [
 {
   mail: 'rider.tester23+E2ECaso2@gmail.com',
   password: 'caso0cero'
 }
]

test('03-login_case Julio7 fondos con sequelize', async ({ page }) => {
    test.setTimeout(99000)

    //await page.goto('https://www.riderlitigationfinance.com/')
    await page.goto('https://rider-litigation-staging.uc.r.appspot.com/')
   
    await page.waitForTimeout(6_000)

    await page.locator('//button[@class="btn btn-outline-light btn-sm"]').click()

    await page.waitForTimeout(4_000);

    const loginPage = new LoginPage(page);

    await loginPage.doLogin(testData[0].mail, testData[0].password);

    await page.waitForTimeout(7_000);

    //await page.locator('button#send-login').click();

    const users = await User.findAll({raw: true, where: {email: testData[0].mail}})

    const codigo = users[0].sms_code.toString();

    await page.waitForTimeout(7_000);

    await page.locator('input#form-two-factor-code').fill(codigo);

    await page.waitForTimeout(4_000);

    //await page.locator('//button[contains(text(), \'Continue\')]').click()
    await page.locator('button#send-two-factor').click()

    //await page.pause();
    await page.close();

});
