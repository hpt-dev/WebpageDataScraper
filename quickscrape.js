const puppeteer = require('puppeteer');
const chalk = require('chalk');

/**
 * Scrape data from an array of pages with the same structure
 *
 * @param {array} urls The URLs of the pages data will be scraped from.
 * @param {object} selectors The css selectors corresponding to the text/images/tables you want to scrape from each page.
 * @return {array} Array containing objects corresponding to the data from each page.
 */
async function quickscrape(urls, selectors){

    const error = chalk.bold.red;
    const success = chalk.keyword("green");

    var browser, page;
    
    try {
        browser = await puppeteer.launch();
        page = await browser.newPage();

        //page.on('console', msg => console.log('PAGE LOG:', msg.text())); // get browser debug
        await page.goto(urls[0], { waitUntil: 'load', timeout: 0 });
        await page.addScriptTag({path: "./utils.js"});

        return await page.evaluate((selectors) => {
            let data = {};
            copyObj(selectors.Text, data, getInnerText);
            copyObj(selectors.Images, data, getImageURL);
            copyObj(selectors.Tables, data, getTableArray);
            return data;
        },  selectors);
    }
    catch (err) {
        console.log(error(err));
    }finally{
        await browser.close();
    }

}

module.exports = quickscrape;