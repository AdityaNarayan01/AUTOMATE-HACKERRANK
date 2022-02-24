const loginLink = "https://www.hackerrank.com/auth/login";

 let email = 'sexod45066@plexfirm.com'
 let password = 'pepcoding@123'


let puppeteer = require("puppeteer");

console.log("before");

 let page //coz we will open multiple page in site and different page will have different html
 

let browserWillBeLaunchedPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args:['--start-maximized' ]
});

browserWillBeLaunchedPromise.then(function (browserInstance) {
    let newTabPromise = browserInstance.newPage()
    return newTabPromise;
}).then(function(newTab){
    console.log('New tab')
    page = newTab
    let pageWillBeOpened = newTab.goto(loginLink)
    return pageWillBeOpened
}).then(function(){
    
    let typeEmailPromise = page.type("input[id='input-1']" , email,{delay:130})
    return typeEmailPromise
}).then(function(){
    let typePasswordPromise = page.type("input[id='input-2']",password,{delay:129})
    return typePasswordPromise
}).then(function() {
    let loginPromise = page.click('button[data-analytics="LoginPassword"]')
    return loginPromise
}).then(function (){
    let algoWillBeClickedPromise = waitAndClick('.topic-card a[ data-attr1="algorithms"]',page)
    return algoWillBeClickedPromise;
}).then(function(){
    let getToWarmUpPromise = waitAndClick('input[value="warmup"]',page)
    return getToWarmUpPromise;
}).then(function(){
    let ChallangesArr = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay :105})
    return ChallangesArr
}).then(function(questionsArr){
    console.log("No of questions " + questionsArr.length)
})

//we are waiting and thenn clicking as 1st page has login page then after clicking loader will load and befor it we try to find any slector then itwill
//will not found since page is not loaded
function waitAndClick(selector, currentPage){
    return new Promise(function(resolve, reject){
        let waitForModelPromise = currentPage.waitForSelector(selector);
        waitForModelPromise.then(function(){
            let clickModel = currentPage.click(selector , {delay: 120})
            return clickModel
        }).then(function(){
            resolve()
        }).catch(function(){
            reject()
        })
    })
}
