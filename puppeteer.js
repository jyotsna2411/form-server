const chromium = require("@sparticuz/chromium-min");
const puppeteer = require("puppeteer-core");

const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;

const handlePuppeteerTask = async (formdata, callback) => {
  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(
        "https://realestatenewbucket.s3.amazonaws.com/chromium-v126.0.0-pack.tar"
      ),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    //const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto("https://gupland.com/submit-deal");

    await page.type("#form1_name", "Charlie Steele");
    await page.type("#form1_email", "closing@cashlandbuyerusa.com");
    // //property address
    await page.type("#form1_textarea8", `${formdata.Address}`);
    await page.type("#form1_text9", `${formdata.APN}`);
    await page.type("#form1_text9copy60ye", `${formdata.County}`);
    await page.type("#form1_text9copy60yecopyezy5", `${formdata.State}`);
    await page.type("#form1_url10", `${formdata.PropertyWebLink}`);
    //property under contract
    await page.click('input[type="radio"][value="Yes"]');
    let fileElement = await page.waitForSelector('input[type="file"]');
    await fileElement.uploadFile(`${formdata.File}`);
    await page.type("#form1_text12", `${formdata.ContractPrice}`);
    await page.type("#form1_text7", `${formdata.ClosingDate}`);
    await page.type("#form1_text16", `${formdata.AcquisitionCost}`);
    await page.type("#form1_text16copy6wwz", `${formdata.AdditionalCost}`);
    await page.type("#form1_text16copy6wwzcopysinb", `${formdata.SalePrice}`);
    await page.type("#form1_textarea19", `${formdata.SolcComps}`);
    await page.type("#form1_textarea19copyo9k3", `${formdata.SaleComps}`);
    await page.type("#form1_text21", `${formdata.ClosingCost}`);
    await page.type("#form1_text21copyp86e", `${formdata.Profit}`);
    //disposition:other
    await page.click('input[type="radio"][value="Other"]');
    await page.type("#form1_textarea30", `${formdata.SaleTimeline}`);
    await page.type("#form1_textarea26", `${formdata.RealtorName}`);
    await page.type("#form1_textarea26copyl2wp", `${formdata.RealtorContact}`);
    //residential zoning
    await page.click(`input[type="radio"][value=${formdata.Zoning}]`);
    // lot buildable yes
    await page.click(`input[type="radio"][value=${formdata.Buildable}]`);
    // land topography flat

    await page.click(`input[type="radio"][value="${formdata.Topography}"]`);
    await page.type("#form1_text32", `${formdata.LotSize}`);
    await page.type("#form1_textarea35", `${formdata.Electric}`);
    await page.type("#form1_textarea35copyslw4copyxdn0", `${formdata.Water}`);
    await page.type("#form1_textarea35copyslw4", `${formdata.Sewer}`);

    // property access legal
    await page.click(`input[type="radio"][value="${formdata.Access}"]`);
    await page.type("#form1_textarea39", `${formdata.AdditionalInfo}`);
    //submit button for gupland form
    // await page.click('button[type="submit"]');

    // //US LAND FUNDERS FORM
    await page.goto(
      "https://servantventures.involve.me/new-project-0563?embed=1&transparent-embed=true&loadcolor=transparent&src=https%3A%2F%2Fuslandfunders.com%2F",
      { waitUntil: "networkidle2" }
    );
    //Do you have a signed agreement

    // // Click the element
    await page.click(
      "body > div.v-app-main > div.standalone-project-main.iv-body.vcentered.center-center > div > div.c-question-container.content-item.is-snappable.content-item-shown-first.content-item-shown > div > div.c-answers-container.v-grid-1 > div:nth-child(1) > button"
    );
    await page.waitForNetworkIdle();

    let inputElement = await page.$(
      "body > div.v-app-main > div.standalone-project-main.iv-body.vcentered.center-center > div > div.c-data-collection-container.content-item.is-snappable.has-datacollection.c-data-collection-container-0cykqof.content-item-shown-first.content-item-shown > div > form > div:nth-child(1) > label > input"
    );
    await inputElement.type("John", { delay: 100 });
    inputElement = await page.$('input[placeholder="Last Name"]');
    await inputElement.type("Doe", { delay: 100 });
    inputElement = await page.$('input[placeholder="Email*"]');
    await inputElement.type("johndoe@gmail.com", { delay: 100 });
    inputElement = await page.$('input[placeholder="Phone*"]');
    await inputElement.type("1234567890");
    inputElement = await page.$(
      'textarea[placeholder="Additional partner emails (please put one per line)"]'
    );
    await inputElement.type("North Carolina");
    inputElement = await page.$(
      "body > div.v-app-main > div.standalone-project-main.iv-body.vcentered.center-center > div > div.c-button-container.content-item.has-button.content-item-shown > div > button"
    );
    await inputElement.click();
    await page.waitForNetworkIdle();
    inputElement = await page.$('input[placeholder="Property State*"]');
    await inputElement.type(`${formdata.State}`);
    inputElement = await page.$('input[placeholder="Property County*"]');
    await inputElement.type(`${formdata.County}`);
    inputElement = await page.$(
      'input[placeholder="Property Address (If Available)"]'
    );
    await inputElement.type(`${formdata.Address}`);
    inputElement = await page.$('input[placeholder="APN*"]');
    await inputElement.type(`${formdata.APN}`);
    inputElement = await page.$('input[placeholder="Lot Size (in Acres)*"]');
    await inputElement.type(`${formdata.LotSize}`);
    inputElement = await page.$('input[placeholder="Purchase Price*"]');
    await inputElement.type(`${formdata.ContractPrice}`);
    inputElement = await page.$('input[placeholder="Predicted Sales Price*"]');
    await inputElement.type(`${formdata.SalePrice}`);
    await page.focus('input[placeholder="Select date"]');
    inputElement = await page.$('input[placeholder="Select date"]');
    await page.$eval('input[placeholder="Select date"]', (e) =>
      e.removeAttribute("readonly")
    );
    await inputElement.type(`${formdata.ClosingDate}`);
    inputElement = await page.$(
      "body > div.v-app-main > div.standalone-project-main.iv-body.vcentered.center-center > div > div:nth-child(11) > div > div.c-input-container > textarea.e-freetxt-answer"
    );
    await inputElement.type(`${formdata.SaleTimeline}`);
    inputElement = await page.$(
      "body > div.v-app-main > div.standalone-project-main.iv-body.vcentered.center-center > div > div:nth-child(12) > div > div.c-input-container > textarea.e-freetxt-answer"
    );
    await inputElement.type(`${formdata.SolcComps}`);
    inputElement = await page.$(
      "body > div.v-app-main > div.standalone-project-main.iv-body.vcentered.center-center > div > div:nth-child(13) > div > div.c-input-container > textarea.e-freetxt-answer"
    );
    await inputElement.type(`${formdata.SaleComps}`);
    inputElement = await page.$(
      "body > div.v-app-main > div.standalone-project-main.iv-body.vcentered.center-center > div > div:nth-child(14) > div > div.c-input-container > textarea.e-freetxt-answer"
    );
    await inputElement.type(`${formdata.AdditionalInfo}`);
    inputElement = await page.$(
      "body > div.v-app-main > div.standalone-project-main.iv-body.vcentered.center-center > div > div.c-button-container.content-item.has-button.content-item-shown > div > button"
    );

    // //Submit button for us land funders
    // await inputElement.click();

    //Pete form
    await page.goto("https://partnerwithpete.com/", {
      waitUntil: "networkidle2",
    });

    inputElement = await page.$('input[placeholder="Investor First Name"]');
    await inputElement.type(" Charlie", { delay: 180 });
    inputElement = await page.$('input[placeholder="Investor Last Name"]');
    await inputElement.type(" Steele", { delay: 250 });
    inputElement = await page.$('input[placeholder="Investor Company Name"]');
    await inputElement.type("closing@cashlandbuyerusa");

    inputElement = await page.$(
      'input[placeholder="Select country to left (flag) and enter number"]'
    );
    await inputElement.type("(647)685-2107");
    inputElement = await page.$('input[placeholder="Investor Email"]');
    await inputElement.type("closing@cashlandbuyerusa.com");

    inputElement = await page.$(
      ".hl_form-builder--main > div > div > div > div.ghl-btn.ghl-footer-next"
    );
    await inputElement.click({ delay: 300 });
    await page.waitForSelector('input[placeholder="First Name"]');
    //seller data
    inputElement = await page.$('input[placeholder="First Name"]');
    await inputElement.type(`${formdata.SellerFirstName}`);
    inputElement = await page.$('input[placeholder="Last Name"]');
    await inputElement.type(`${formdata.SellerLastName}`);
    inputElement = await page.$(
      'input[placeholder="Select country to left (flag) and enter number"]'
    );
    await inputElement.type(`${formdata.SellerPhone}`);
    inputElement = await page.$('input[placeholder="County"]');
    await inputElement.type(`${formdata.County}`);
    inputElement = await page.$('input[placeholder="State"]');
    await inputElement.type(`${formdata.State}`);

    inputElement = await page.$('input[placeholder="Acres"]');
    await inputElement.type(`${formdata.LotSize}`);
    inputElement = await page.$('input[placeholder="APN"]');
    await inputElement.type(`${formdata.APN}`);
    inputElement = await page.$('input[placeholder="Purchase Price"]');
    await inputElement.type(`${formdata.ContractPrice}`);
    inputElement = await page.$('textarea[placeholder="Notes"]');
    await inputElement.type(`${formdata.AdditionalInfo}`);
    inputElement = await page.$('input[type="radio"][value="Yes"]');
    await inputElement.click();
    fileElement = await page.waitForSelector('input[type="file"]');
    await fileElement.uploadFile(`${formdata.File}`);
    // //submit button
    // // inputElement = await page.$(
    // //   ".hl_form-builder--main > div > div > div > div.ghl-btn.ghl-submit-btn"
    // // );
    // // await inputElement.click();

    // //Land Investing Form
    await page.goto(
      "https://airtable.com/appuRPLCWRRUtEZij/pag7LHKR1LEeWnSTh/form",
      {
        waitUntil: "networkidle2",
      }
    );
    await page.waitForSelector(
      "#reactViewRoot > div > div > div > div > div.flex.flex-auto > main > div > div > div > div > div > div.width-full > div.grid.gap3.colors-background-default.rounded-big.relative.mr-auto.ml-auto.css-1na73vl > div.mn2.p2.rounded-big > div > div > div > div.flex.mt2-and-half.owl-gapx2-and-half > div > div:nth-child(1) > div:nth-child(1) > div > div > div > div:nth-child(2) > div > div > div > textarea",
      { visible: true }
    );

    //name
    inputElement = await page.$(
      "#reactViewRoot > div > div > div > div > div.flex.flex-auto > main > div > div > div > div > div > div.width-full > div.grid.gap3.colors-background-default.rounded-big.relative.mr-auto.ml-auto.css-1na73vl > div.mn2.p2.rounded-big > div > div > div > div.flex.mt2-and-half.owl-gapx2-and-half > div > div:nth-child(1) > div:nth-child(1) > div > div > div > div:nth-child(2) > div > div > div > textarea"
    );
    await inputElement.type("Charlie Steele", { delay: 200 });

    //email
    inputElement = await page.$(
      "#reactViewRoot > div > div > div > div > div.flex.flex-auto > main > div > div > div > div > div > div.width-full > div.grid.gap3.colors-background-default.rounded-big.relative.mr-auto.ml-auto.css-1na73vl > div.mn2.p2.rounded-big > div > div > div > div.flex.mt2-and-half.owl-gapx2-and-half > div > div:nth-child(1) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div > div > textarea"
    );
    await inputElement.type("closing@cashlandbuyerusa.com");
    //ph no.
    inputElement = await page.$(
      "#reactViewRoot > div > div > div > div > div.flex.flex-auto > main > div > div > div > div > div > div.width-full > div.grid.gap3.colors-background-default.rounded-big.relative.mr-auto.ml-auto.css-1na73vl > div.mn2.p2.rounded-big > div > div > div > div.flex.mt2-and-half.owl-gapx2-and-half > div > div:nth-child(1) > div:nth-child(3) > div > div > div > div:nth-child(2) > div > div > div > input"
    );
    await inputElement.type("6476852107");
    //county, state
    inputElement = await page.$(
      "#reactViewRoot > div > div > div > div > div.flex.flex-auto > main > div > div > div > div > div > div.width-full > div.grid.gap3.colors-background-default.rounded-big.relative.mr-auto.ml-auto.css-1na73vl > div.mn2.p2.rounded-big > div > div > div > div.flex.mt2-and-half.owl-gapx2-and-half > div > div:nth-child(2) > div:nth-child(1) > div > div > div > div:nth-child(2) > div > div > div > textarea"
    );
    await inputElement.type(`${formdata.County},${formdata.State}`);
    //apn
    inputElement = await page.$(
      "#reactViewRoot > div > div > div > div > div.flex.flex-auto > main > div > div > div > div > div > div.width-full > div.grid.gap3.colors-background-default.rounded-big.relative.mr-auto.ml-auto.css-1na73vl > div.mn2.p2.rounded-big > div > div > div > div.flex.mt2-and-half.owl-gapx2-and-half > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div > div > textarea"
    );
    await inputElement.type(`${formdata.APN}`);
    //acreage
    inputElement = await page.$(
      "#reactViewRoot > div > div > div > div > div.flex.flex-auto > main > div > div > div > div > div > div.width-full > div.grid.gap3.colors-background-default.rounded-big.relative.mr-auto.ml-auto.css-1na73vl > div.mn2.p2.rounded-big > div > div > div > div.flex.mt2-and-half.owl-gapx2-and-half > div > div:nth-child(2) > div:nth-child(3) > div > div > div > div:nth-child(2) > div > div > div > input"
    );
    await inputElement.type(`${formdata.LotSize}`);
    //purchase price
    inputElement = await page.$(
      "#reactViewRoot > div > div > div > div > div.flex.flex-auto > main > div > div > div > div > div > div.width-full > div.grid.gap3.colors-background-default.rounded-big.relative.mr-auto.ml-auto.css-1na73vl > div.mn2.p2.rounded-big > div > div > div > div.flex.mt2-and-half.owl-gapx2-and-half > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div:nth-child(2) > div > div > div > input"
    );
    await inputElement.type(`${formdata.ContractPrice}`);
    //manager expected sale price
    inputElement = await page.$(
      "#reactViewRoot > div > div > div > div > div.flex.flex-auto > main > div > div > div > div > div > div.width-full > div.grid.gap3.colors-background-default.rounded-big.relative.mr-auto.ml-auto.css-1na73vl > div.mn2.p2.rounded-big > div > div > div > div.flex.mt2-and-half.owl-gapx2-and-half > div > div:nth-child(3) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div > div > input"
    );
    await inputElement.type(`${formdata.SalePrice}`);
    //expected date of funds needed
    inputElement = await page.$('input[placeholder="mm/dd/yyyy"]');
    await page.$eval('input[placeholder="mm/dd/yyyy"]', (e) =>
      e.removeAttribute("readonly")
    );
    await inputElement.type(`${formdata.ClosingDate}`, { delay: 200 });
    // // //pa
    // fileElement = await page.waitForSelector(
    //   "#reactViewRoot > div > div > div > div > div.flex.flex-auto > main > div > div > div > div > div > div.width-full > div.grid.gap3.colors-background-default.rounded-big.relative.mr-auto.ml-auto.css-1na73vl > div.mn2.p2.rounded-big > div > div > div > div.flex.mt2-and-half.flex-column.owl-gapy2-and-half > div > div:nth-child(4) > div:nth-child(1) > div > div > div > div:nth-child(2) > div > div.col-12 > div > div > div"
    // );
    // await fileElement.click();
    // fileElement = await page.$(
    //   "#uppy-local-files-container > div > div > div.uppy-Dashboard-inner > div > div.uppy-Dashboard-AddFiles > div.uppy-Dashboard-AddFiles-title > button"
    // );
    // await fileElement.click();
    // //screenshot property
    // await fileElement.uploadFile(`${formdata.File}`);
    // fileElement = await page.waitForSelector(
    //   "#reactViewRoot > div > div > div > div > div.flex.flex-auto > main > div > div > div > div > div > div.width-full > div.grid.gap3.colors-background-default.rounded-big.relative.mr-auto.ml-auto.css-1na73vl > div.mn2.p2.rounded-big > div > div > div > div.flex.mt2-and-half.flex-column.owl-gapy2-and-half > div > div:nth-child(4) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div.col-12 > div > div > div"
    // );
    // //notes
    // await fileElement.uploadFile(`${formdata.File}`);
    inputElement = await page.$(
      "#reactViewRoot > div > div > div > div > div.flex.flex-auto > main > div > div > div > div > div > div.width-full > div.grid.gap3.colors-background-default.rounded-big.relative.mr-auto.ml-auto.css-1na73vl > div.mn2.p2.rounded-big > div > div > div > div.flex.mt2-and-half.owl-gapx2-and-half > div > div:nth-child(4) > div:nth-child(3) > div > div > div > div:nth-child(2) > div > div > div > div > div.contentEditableTextbox.light-scrollbar.ignore-baymax-defaults.pb3"
    );
    await inputElement.type(`${formdata.AdditionalInfo}`, { delay: 200 });
    //submit button
    // inputElement = await page.$(
    //   "  #reactViewRoot > div > div > div > div > div.flex.flex-auto > main > div > div > div > div > div > div.css-jcpkb3 > div > div.flex.items-center.height-full > div > div.flex-none.flex > button"
    // );
    // await inputElement.click();

    // Serious Land Capital
    // await page.goto(
    //   "https://seriousland.capital/?fbclid=IwZXh0bgNhZW0CMTAAAR0myXwb3Il8HwGFFkBBPvr7MKEdwEE6fat7VdBl_pxUAsJHRKfC7QD5T_k_aem_wv4sCKJj4fc_bA54_wwz8g",
    //   {
    //     waitUntil: "networkidle2",
    //   }
    // );
    // inputElement = await page.$(
    //   +"#content > div > div.elementor.elementor-8.elementor-motion-effects-parent > div.elementor-element.elementor-element-b10453f.e-flex.e-con-boxed.e-con.e-parent.e-lazyloaded > div.e-con-inner > div.elementor-element.elementor-element-ff708bc.elementor-align-center.elementor-widget.elementor-widget-button > div > div > a"
    // );
    // await inputElement.click();

    await browser.close();
  } catch (err) {
    callback(err); // Failure
  }
};

module.exports = handlePuppeteerTask;
