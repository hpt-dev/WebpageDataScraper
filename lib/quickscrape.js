const puppeteer = require('puppeteer');
const chalk = require('chalk');

/**
 * Scrape data from an array of pages with the same structure
 *
 * @param {array} urls The URLs of the pages data will be scraped from.
 * @param {object} selectors The css selectors corresponding to the text/images/tables you want to scrape from each page.
 * @return {array} Array containing objects corresponding to the data from each page.
 */
async function quickscrape(urls, selectors) {

    const error = chalk.bold.red;
    const success = chalk.keyword("green");

    var data = [];
    var browser, page;

    try {
        browser = await puppeteer.launch();
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
    return document.querySelector(selector).innerText
}

function getImageURL(selector) {
    return document.querySelector(selector).getAttribute('src').replace('/', '');
}

function getTableArray(selector) {
    var rows = document.querySelectorAll(selector);
    return Array.from(rows, row => {
        const columns = row.querySelectorAll('td');
        return Array.from(columns, column => column.innerText);
    });
}

module.exports = { quickscrape, copyObj, isObject, getInnerText, getImageURL, getTableArray };