const puppeteer = require('puppeteer');
require('dotenv').config()
  ; (async () => {

    const { URL, EMAIL, PASSWORD } = process.env

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(URL)

    await page.waitForNetworkIdle()

    console.log('LOGGING IN...');
    await page.type('[formcontrolname=email]', EMAIL)
    await page.type('[formcontrolname=password]', PASSWORD)

    await page.click('[role=img]');

    await page.waitForNetworkIdle()

    const isLoginPage = await page.evaluate(() => {
      const search = document.querySelectorAll('.mat-form-field-infix .ng-tns-c91-1');
      const html = Array.from(search).map(tag => tag.innerHTML)
      return html
    })

    if (isLoginPage.length === 0) {
      console.log('LOGIN SUCCESSFUL')
    } else {
      console.log('******* ERROR WITH LOGIN *******')
      console.log(isLoginPage.length)
    }

    console.log('SELECTING SPOT CHECK FORM...');
    const spotLink = await page.$x('/html/body/app-root/app-layout/div/div/div/app-home/div[2]/mat-card/mat-card-header/div[2]/mat-card-title');

    await spotLink[0].click();

    await page.waitForNetworkIdle();

    const mstLink = await page.$x('/html/body/app-root/app-layout/div/div/div/app-home/div[1]/mat-card/mat-card-header/div[2]/mat-card-title');

    if (typeof (await mstLink[0]?.getProperty('innerText'))?.jsonValue() !== 'object') {
      console.log('SUCESSFUL ACCESS TO SPOT CHECK INSPECTION FORM')
    } else {
      console.log('******* ERROR WITH ACCESSING SPOT CHECK INSPECTION FORM *******')
    }



    await page.type('[formcontrolname=CompanyName]', '***COMPANY TEST NAME***');
    await page.type('[formcontrolname=EmployeeName]', '***TEST EMPLOYEE NAME***');
    await page.type('[formcontrolname=JobDescription]', '***TEST JOB DESCRIPTION***');
    await page.type('[formcontrolname=Location]', '***LOCATION TEST***');

    const evaluatorList = await page.$x('//*[@id="mat-input-6"]');
    await evaluatorList[0].click();

    await page.waitForXPath('//*[@id="mat-option-87"]/span');

    const evaluator = await page.$x('//*[@id="mat-option-87"]/span');
    await evaluator[0].click();


    const supervisorList = await page.$x('//*[@id="mat-input-7"]');
    await supervisorList[0].click();

    await page.waitForXPath('//*[@id="mat-option-137"]/span');

    const supervisor = await page.$x('//*[@id="mat-option-137"]/span');
    await supervisor[0].click();

    const wsmrNextButton = await page.$x('//*[@id="cdk-accordion-child-0"]/div/div/button');
    await wsmrNextButton[0].click();

    await page.waitForNetworkIdle();

    console.log('WORKSITE SAFETY MANAGEMENT REVIEW PAGE COMPLETE')

    // HAZARD IDENTIFICATION & CONTROL

    const satHazard = await page.$x('//*[@id="mat-radio-2"]/label/span[1]');
    await satHazard[0].click();
    await page.waitForNetworkIdle();
    await page.type('[formcontrolname=comment]', "***SATISFACTORY COMMENT HAZARD***");
    const commentSave1 = await page.$x('//*[@id="mat-dialog-0"]/app-comment/div[2]/div/button[3]');
    await commentSave1[0].click();
    await page.waitForNetworkIdle();
    
    const unsatHazard = await page.$x('//*[@id="mat-radio-7"]/label/span[1]');
    await unsatHazard[0].click();
    await page.waitForNetworkIdle();
    await page.type('[formcontrolname=comment]', "***UNSATISFACTORY DISCREPANCY HAZARD***");
    
    const hazardCorActButton = await page.$x('//*[@id="mat-dialog-1"]/app-comment/div[2]/form/div[2]/div/button');
    await hazardCorActButton[0].click();
    await page.waitForXPath('//*[@id="mat-dialog-2"]/app-corrective-action/form/ion-datetime[1]');
    await page.waitForNetworkIdle();
    
    await page.click('[formcontrolname=DateCorrectiveActionToBeCompleted]');
    await page.waitForNetworkIdle();

    const corActDateDone1 = await page.$x('/html/body/ion-picker/div[2]/div[1]/div[2]/button');
    await corActDateDone1[0].click();
    await page.waitForNetworkIdle();
    
    await page.type('[formcontrolname=CorrectiveActionRequired]', '***HAZARD CORRECTIVE ACTION TEST***')
    
    const corActSave1 = await page.$x('//*[@id="mat-dialog-2"]/app-corrective-action/form/div[3]/mat-icon');
    await corActSave1[0].click();
    await page.waitForNetworkIdle();
    
    const discrepancySave1 = await page.$x('//*[@id="mat-dialog-1"]/app-comment/div[2]/div/button[3]');
    await discrepancySave1[0].click();
    await page.waitForNetworkIdle();
    
    console.log('HAZARD COMMENT & DISCREPANCY COMPLETE')

    // page.close()
  })()