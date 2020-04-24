const puppeteer = require('puppeteer');
const chalk = require('chalk');
const fs = require('fs');
//const Utils = require('./utils');

const error = chalk.bold.red;
const success = chalk.keyword("green");

global.fighterArray = [
    'https://www.sherdog.com/fighter/Tony-Ferguson-31239'
];

global.sherdogSelectors =
{
    Text: {
        Name: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > h1 > span.fn',
        NickName: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > h1 > span.nickname > em',
        DOB: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > div > div.bio > div.birth_info > span.item.birthday > span',
        Age: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > div > div.bio > div.birth_info > span.item.birthday > strong',
        Weight: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > div > div.bio > div.size_info > span.item.weight > strong',
        Height: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > div > div.bio > div.size_info > span.item.height > strong',
        Association: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > div > div.bio > div.size_info > h5 > strong > span > a > span',
        WeightClass: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > div > div.bio > div.size_info > h6 > strong > a',
        Nationality: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > div > div.bio > div.birth_info > span.item.birthplace > strong',
        Address: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > div > div.bio > div.birth_info > span.item.birthplace > span > span',
        Wins:
        {
            KOTKO: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > div > div.record > div > div > div:nth-child(1) > span:nth-child(3)',
            Submissions: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > div > div.record > div > div > div:nth-child(1) > span:nth-child(5)',
            Decisions: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > div > div.record > div > div > div:nth-child(1) > span:nth-child(7)',
            Total: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > div > div.record > div > div > div:nth-child(1) > span.card > span.counter'
        },
        Losses:
        {
            KOTKO: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > div > div.record > div > div > div.bio_graph.loser > span:nth-child(3)',
            Submissions: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > div > div.record > div > div > div.bio_graph.loser > span:nth-child(5)',
            Decisions: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > div > div.record > div > div > div.bio_graph.loser > span:nth-child(7)',
            Total: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > div > div.record > div > div > div.bio_graph.loser > span.card > span.counter'
        },
    },
    Tables: {
        FightHistory: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(5) > div > div.content.table > table tr',
        ExhibitionHistory: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(6) > div > div.content.table > table tr'
    },
    Images: {
        Picture: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > img'
    },
};


downloadData();

async function downloadData() {
    const browser = await puppeteer.launch();

    try {

        console.log(success("Starting"));

        const page = await browser.newPage();

        await page.goto('https://www.sherdog.com/fighter/Tony-Ferguson-31239',
        {
            waitUntil: 'load',
            timeout: 0
        });

        // data to pass to browser
        var passToBrowser = {
            sherdogSelectors: this.sherdogSelectors,
        };


        await page.addScriptTag({path: "./utils.js"}); // pass util functions to chromium
        page.on('console', msg => console.log('PAGE LOG:', msg.text())); // allow logging from chromium to node
        
        var result = await page.evaluate((passToBrowser) => {
            let currFighter = {};

            console.log(window.copyObj);

            copyObj(passToBrowser.sherdogSelectors.Text, currFighter, getInnerText);
            copyObj(passToBrowser.sherdogSelectors.Images, currFighter, getImageURL);
            copyObj(passToBrowser.sherdogSelectors.Tables, currFighter, getTableArray);

            return currFighter;

        },  passToBrowser);

        /*
            Save Photo
            var viewSource = await page.goto("https://www.google.com/" + imageHref);
            fs (err) {
                return console.log(err);
            }.writeFile(".googles-20th-birthday-us-5142672481189888-s.png", await viewSource.buffer(), function (err) {
            if
        */

        console.log(result);

        await browser.close();

        console.log(success("Complete"));

    }
    catch (err) {
        console.log(error(err));
        await browser.close();
    }
}