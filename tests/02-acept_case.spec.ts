import { test, expect } from '@playwright/test';

import { LoginPage } from '../pageobjects/login/LoginPage';

import { preregistered_user } from '../db/db_users_data';

test('02-acept_case.spec.ts Cases to Review by Admin', async ({ page }) => {
    test.setTimeout(90000)
    await page.goto('https://rider-litigation-staging.uc.r.appspot.com/');
    await page.waitForTimeout(3_000)

    // Seleccionar Login
    await page.locator('//button[@class="btn btn-outline-light btn-sm"]').click()

    await page.waitForTimeout(2_000);

    const loginPage = new LoginPage(page);

    //await loginPage.doLogin('litigationrider@gmail.com', '12345678');
    await loginPage.doLogin('rider.tester23@gmail.com', '23232323');
 
    await page.waitForTimeout(3_000);

    // De la pantalla de tareas pendientes (dashboard), seleccionar Casos por revisar
    await page.locator('//span[@class="counter mb-3 mt-3"]').click();

//    await page.locator('//a[@class="js-click-open-modals"]').first().click();

    //await page.locator('//p[contains(text(),"Cases to review")]').click();
    // Seleccionar del SideBar
    //await page.locator('a[id="tab-cases_to_review"]').click()

    await page.waitForTimeout(4_000);
  
    // Tambien OK: 
    // Actualizar el nombre del Titular   
     
    await page.locator('//table[@class="table table-striped"]//tr[td[contains(text(),"Joao Martin e2eCasos2")]]//td[6]').first().click();
    await page.waitForTimeout(4_000);
    //await page.locator('//button[id="boton-guardar-caso"]').click()
    await page.locator('button#boton-guardar-caso').click();  // # es Short Cut por Id   Y punto . es Short Cut por Clase

    //await page.pause();

    await page.locator('//button[text()="OK"]').click();

    //await page.pause();
    
    await page.close();

});
