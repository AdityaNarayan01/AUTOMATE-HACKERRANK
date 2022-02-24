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
    return loginLink
}).then(function (){
    let algoWillBeClickedPromise = waitAndClick('.topic-card a[ data-attr1="algorithms"]',page)
})


function waitAndClick(selector, currentPage){
    return new Promise(function(reolve, reject){
        let waitForModelPromise = currentPage.waitForSelector(selector);
        waitForModelPromise.then(function(){
            let clickModel = currentPage.click(selector , {delay: 100})
            return clickModel
        }).then(function(){
            resolve()
        }).catch(function(){
            reject()
        })
    })
}
