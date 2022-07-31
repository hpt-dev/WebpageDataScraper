const puppeteer = require('puppeteer');
const chalk = require('chalk');

/**
 * Scrape data from an array of pages with the same structure
 *
 * @param {array} urls The URLs of the pages data will be scraped from.
 * @param {object} selectors The css selectors corresponding to the text/images/tables you want to scrape from each page.
 * @param {bool} isHeadlesss Set this value to default to launch the browser that will do the scraping. Useful for debugging as some websites will redirect to a login page when they know it is being launched in a pupeteer instance.
 * @return {array} data the scraped data with the same format as the input object.
 */
async function scrape(urls, selectors, isHeadless) {

    const error = chalk.bold.red;
    const success = chalk.keyword("green");

    var data = [];
    var browser, page;

    try {
        browser = await puppeteer.launch({headless: isHeadless});
        page = await browser.newPage();

        for (let i = 0; i < urls.length; i++) {
            await page.goto(urls[i], { waitUntil: 'load', timeout: 600000 });
            await page.addScriptTag({ content: `${copyObj} ${isObject} ${getInnerText} ${getImageURL} ${getTableArray}`});

            let pageData = await page.evaluate((selectors) => {
                let data = {};
                copyObj(selectors.Text, data, getInnerText);
                copyObj(selectors.Images, data, getImageURL);
                copyObj(selectors.Tables, data, getTableArray);
                return data;
            }, selectors);

            data.push(pageData);
        }
        return data;
    }
    catch (err) {
        console.log(error(err));
        console.log("Error occured make sure you are using chrome and selecting the css selector option. The Selectors should have the > symbol in.");
    }
    finally {
        await browser.close();
    }
}

function copyObj(obj, copyToObj, func) {
    Object.keys(obj).forEach(itm => {
        if (isObject(obj[itm])) {
            copyToObj[itm] = {};
            copyObj(obj[itm], copyToObj[itm], func);
        } else {
            copyToObj[itm] = func(obj[itm]);
        }
    });
}

function isObject(obj) {
    return obj !== undefined && obj !== null && obj.constructor == Object;
}

function getInnerText(selector) {
    var el = document.querySelector(selector);

    if(el){
        return el.innerText;
    }
    return "Text element not found.";
}

function getImageURL(selector) {
    var el = document.querySelector(selector);

    if(el){
        if(el.getAttribute('src')){
            return el.getAttribute('src').replace('/', '');
        }
        return "Image src not found.";
    }
    return "Image element not found.";
}

function getTableArray(selector) {
    var rows = document.querySelectorAll(selector);
  
    if(rows.length > 0){
        return Array.from(rows, row => {
            const columns = row.querySelectorAll('td');
            if(columns.length > 0){
                return Array.from(columns, column => column.innerText);
            }
            return "Table element/rows not found.";
        });
    }
    return "Table element/rows not found.";
}

module.exports = { scrape, copyObj, isObject, getInnerText, getImageURL, getTableArray };