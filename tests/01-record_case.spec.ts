import { test, expect } from '@playwright/test';
import axios from 'axios';

import { LoginPage } from '../pageobjects/login/LoginPage';
//import { preregistered_user } from '../db/db_users_data';
import { getTwo_Factor } from '../db/db_users_data';

//import { preregistered_user } from '../db/db_users_data';
import { getUsers, borra_terms_and_conditions_agreements, borra_de_email_validation, borra_de_user } from '../db/db_users_delete';
import { borra_de_case, borra_de_preregistered_case, borra_de_preregistered_user } from '../db/db_delete_case';

// 1) REGISTRO

test('01_record_case Record Case to get Funding', async ({ page }) => {
  test.setTimeout(170000)

/*
// Configurar user-agent si deseas
  await page.context().setExtraHTTPHeaders({
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
*/

  const url = 'https://rider-litigation-staging.uc.r.appspot.com/preregistro-cliente-step0';
  await page.goto(url);

  // Pagina de Preregistro
  await page.locator('input#preregistered_user-email').fill('rider.tester23+E2ECaso0Jul7@gmail.com');
  await page.waitForTimeout(4_000);
  await page.locator('input#preregistered_user-password').fill('caso0cero');

  // Obtener sitekey desde el HTML
  const captchaKey = await page.getAttribute('#captcha', 'data-sitekey');
  if (!captchaKey) throw new Error('No se encontró la sitekey del captcha');

  // Armar solicitud a 2captcha
  const apiKey = '7af20b4a2ab20af55da00a929ac3d988'; // <-- reemplaza con tu API KEY válida
  const inUrl = `https://2captcha.com/in.php?key=${apiKey}&method=userrecaptcha&googlekey=${captchaKey}&pageurl=${url}&json=0`;

  const inResponse = await axios.get(inUrl);
  let captchaServiceKey = inResponse.data;
  //  console.log(captchaServiceKey);

  // Parseo para obtener el ID
  if (!captchaServiceKey.includes('|')) throw new Error('Error en respuesta de 2captcha: ' + captchaServiceKey);
   
  captchaServiceKey = captchaServiceKey.split('|').pop();

  const resUrl = `https://2captcha.com/res.php?key=${apiKey}&action=get&id=${captchaServiceKey}&json=0`;

  //console.log(resUrl);

  // Esperar según documentación de 2captcha
  await page.waitForTimeout(3_000);

  let captchaSolution: string | null = null;
  for (let i = 0; i < 55; i++) {
    const resResponse = await axios.get(resUrl);
    const resText = resResponse.data;
    console.log(`Intento ${i + 1}: ${resText}`);
    if (resText === 'CAPCHA_NOT_READY') {
      await page.waitForTimeout(6_000);
    } else if (resText.includes('|')) {
      captchaSolution = resText.split('|').pop();
      console.log(`Ya paso con: ${resText}`);
      break;
    } else {
      throw new Error('Error al obtener la solución del captcha: ' + resText);
    }
  }

  if (!captchaSolution) throw new Error('No se pudo obtener la solución del captcha');

  // Insertar la solución en el DOM
  await page.evaluate((token: string) => {
    const textarea = document.getElementById('g-recaptcha-response') as HTMLTextAreaElement;
    if (textarea) textarea.innerHTML = token;
  }, captchaSolution);

  await page.getByRole('checkbox', { name: 'I agree with Terms and Conditions' }).check();
    
  await page.locator('button#unete-btn').click();
  
  await page.waitForTimeout(3_000);
  
  // Step 1
  await page.locator('select[id="case_country"]').selectOption('US')
  await page.locator('input[name=case_damage_expected]').fill('9988000');
    
  await page.waitForTimeout(4_000);
  
  await page.locator('input[name=case_funding_goal]').fill('683000');
  await page.locator('select[id="case_country"]').selectOption('MX')
  await page.locator('select[id="case_has_attorney"]').selectOption('no')
  await page.locator('select[id="case_case_type_id"]').selectOption('Trade')
  await page.waitForTimeout(5_000);
  await page.getByRole('checkbox', { name: 'I agree with Terms and Conditions' }).check();
  
  await page.locator('button#unete-btn').click();
  // Step 1 FIN

  await page.waitForTimeout(2_000);

  // Step 2
  await page.locator('input[id="user_first_name"]').fill('Martin E2ECaso0Jul7');
  await page.locator('input[id="user_last_name"]').fill('Dorantes Testcaso0');
  
  await page.locator('select[id="user_lang"]').selectOption('English')
  await page.waitForTimeout(4_000);
  
  await page.locator('select[id="user_country_id"]').selectOption('United States')
  await page.locator('select[id="user_state_id"]').selectOption('California')
  await page.locator('select[id="user_city_id"]').selectOption('Los Angeles')
  await page.locator('input[id="user_postal_code"]').fill('06000')
  await page.locator('select[id="user_phone-prefix"]').selectOption('52')
  await page.locator('input[id="user_phone"]').fill('(722) 294-0235')

  await page.waitForTimeout(5_000);

  // Se deja vacio sitio Web
  // Step 2 FIN

  await page.locator('//button[contains(text(), \'Continue\')]').click()

  // Step 3  
  await page.locator('input[id="case_case_type_detail"]').fill('Incumplimito e2e1 de Contrato')
  await page.locator('select[id="case_court_stage_id"]').selectOption('2')
  await page.locator('input[id="case_accused_full_name"]').fill('Demandado e2e3 Test')
  await page.locator('textarea[id="case_abstract"]').fill('The review only for English. RESUMEN e2efondos1 ok')

  // Solo para Español,  await page.locator('textarea[id="case_abstract_en"]').fill('RESUMEN ENGLISH bbbbbbbbbbbbbbbbb, en casa 4 abril, 7,30pm')

  await page.waitForTimeout(3_000);
  await page.locator('button[class="btn btn-info btn-sm"]').last().click();
  
  // Step 5 The review and SEND data
  //await page.pause();
  await page.locator('input[class="btn btn-info btn-sm text-light js-submit-btn"]').click()
  await page.close();

});

