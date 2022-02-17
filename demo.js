let puppeteer = require("puppeteer");

console.log("before");

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
    let pageWillBeOpened = newTab.goto('https://www.pepcoding.com/')
    return pageWillBeOpened
}).then(function(webPage){
    console.log('Website opened')
})


console.log("after");
