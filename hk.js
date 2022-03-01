const loginLink = "https://www.hackerrank.com/auth/login";

let email = "sexod45066@plexfirm.com";
let password = "pepcoding@123";

const codeFile = require("./codesans");

let puppeteer = require("puppeteer");

console.log("before");

let page; //coz we will open multiple page in site and different page will have different html

let browserWillBeLaunchedPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
});

browserWillBeLaunchedPromise
  .then(function (browserInstance) {
    let newTabPromise = browserInstance.newPage();
    return newTabPromise;
  })
  .then(function (newTab) {
    console.log("New tab");
    page = newTab;
    let pageWillBeOpened = newTab.goto(loginLink);
    return pageWillBeOpened;
  })
  .then(function () {
    let typeEmailPromise = page.type("input[id='input-1']", email, {
      delay: 130,
    });
    return typeEmailPromise;
  })
  .then(function () {
    let typePasswordPromise = page.type("input[id='input-2']", password, {
      delay: 129,
    });
    return typePasswordPromise;
  })
  .then(function () {
    let loginPromise = page.click('button[data-analytics="LoginPassword"]');
    return loginPromise;
  })
  .then(function () {
    let algoWillBeClickedPromise = waitAndClick(
      '.topic-card a[ data-attr1="algorithms"]',
      page
    );
    return algoWillBeClickedPromise;
  })
  .then(function () {
    let getToWarmUpPromise = waitAndClick('input[value="warmup"]', page);
    return getToWarmUpPromise;
  })
  .then(function () {
    let ChallangesArr = page.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",
      { delay: 105 }
    );
    return ChallangesArr;
  })
  .then(function (questionsArr) {
    console.log("No of questions " + questionsArr.length);

    let questionWillBeSolved = questionSolver(
      page,
      questionsArr[0],
      codeFile.answers[0]
    );
  });

//we are waiting and thenn clicking as 1st page has login page then after clicking loader will load and befor it we try to find any slector then itwill
//will not found since page is not loaded
function waitAndClick(selector, currentPage) {
  return new Promise(function (resolve, reject) {
    let waitForModelPromise = currentPage.waitForSelector(selector);
    waitForModelPromise
      .then(function () {
        let clickModel = currentPage.click(selector, { delay: 120 });
        return clickModel;
      })
      .then(function () {
        resolve();
      })
      .catch(function () {
        reject();
      });
  });
}

function questionSolver(page, question, answer) {
  return new Promise(function (resolve, reject) {
    let questionWillBeClickedPromise = question.click();
    questionWillBeClickedPromise
      .then(function () {
        let waitForEditorPromise = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return waitForEditorPromise;
      })
      .then(function () {
        return waitAndClick(".checkbox-input", page);
      })
      .then(function () {
        return page.waitForSelector(".text-area.custominput");
      })
      .then(function () {
        return page.type(".text-area.custominput", answer, { delay: 20 });
      })
      .then(function () {
        let ctrlonHoldPromise = page.keyboard.down("Control");
        return ctrlonHoldPromise;
      })
      .then(function () {
        let AisPressedPromise = page.keyboard.press("A", { delay: 20 });
        return AisPressedPromise;
      })
      .then(function () {
        let XisPressedPromise = page.keyboard.press("X", { delay: 20 });
        return XisPressedPromise;
      })
      .then(function () {
        let ctrlIsReleasedPromise = page.keyboard.up("Control");
        return ctrlIsReleasedPromise;
      })
      .then(function () {
        let waitForEditorPromise = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return waitForEditorPromise;
      })
      .then(function () {
        let ctrlonHoldPromise = page.keyboard.down("Control");
        return ctrlonHoldPromise;
      })
      .then(function () {
        let AisPressedPromise = page.keyboard.press("A", { delay: 20 });
        return AisPressedPromise;
      })
      .then(function () {
        let VisPressedPromise = page.keyboard.press("V", { delay: 20 });
        return VisPressedPromise;
      })
      .then(function () {
        let ctrlIsReleasedPromise = page.keyboard.up("Control");
        return ctrlIsReleasedPromise;
      })
      .then(function () {
        return page.click(".hr-monaco__run-code", { delay: 20 });
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        console.log(err);
      });
  });
}
