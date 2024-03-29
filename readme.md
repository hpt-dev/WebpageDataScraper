[![img](./badgegithubactions.svg)](https://github.com/hpt-dev/WebpageDataScraper/actions)

# WebpageDataScraper
Quickly scrape data from a collection of html pages that have the same format. Simply supply css selectors and an array of urls (can be local html files or web address). Will also return tables and images as well as text fields. Data returned in JSON format. See below for two examples, one using a local html file and one using a web address.

How to get the css selectors using google chrome (don't use firefox as the options are different):
1)  Hover the cursor over the image, text, or table you wish to scrape and right click mouse.
2)  Select Inspect which will bring up the chrome developer tools.
3)  Right click on the highlighted image tag, tag that contains the text (e.g. span, p, b) or the table tag.
5)  **Select Copy > CSS selector (this is important! The path should most likely have '>' symbols in like the examples below).**
6)  Paste the css selector in the Text/Tables/Image object like in the examples below, with whatever name you want to give that field.

![How to find CSS selectors with chrome and chrome dev tools](./HowToFindSelectors.png)

**PRO TIP**: If the css selector isn't returning a value try running the command `document.querySelector('selector goes here')` in the chrome developer console. 
If it returns null then the selector is not correct.

**PRO TIP 2**: Sometimes when scraping, the provided web addresses may redirect to a login page and so the scraping will fail even though everything looks correct. Try running with headless mode disabled by setting the bool in the scrape function to false e.g. `await webpagedatascraper.scrape(obj, arr, false)`. This will launch the browser
that is doing the scraping and you can watch to see if any redirects or other issues that would cause the scrape to fail are happening.

## Installation
Use the package manager [npm](https://www.npmjs.com/) to install. 

```bash
npm install webpagedatascraper
```

## Usage with a web address
```javascript

const webpagedatascraper = require('./webpagedatascraper');

(async () => {
    let urls = [
        'https://www.sherdog.com/fighter/Tony-Ferguson-31239',
        'https://www.sherdog.com/fighter/Beneil-Dariush-56583'
    ];
    
    // make sure you use chrome when grabbing the css selectors and that they are in a format that contains '>' symbols like below.
    // the Text,Tables, Images objects are mandatory but the structure inside can be whatever you want.
    let selectors =
    {
        Text: {
              Name: 'body > div.container > div.col-left > div > section:nth-child(3) > div > div.fighter-info > div.fighter-right > div.fighter-title > div.fighter-line1 > h1 > span',
              Age: 'body > div.container > div.col-left > div > section:nth-child(3) > div > div.fighter-info > div.fighter-right > div.fighter-data > div.bio-holder > table > tbody > tr:nth-child(1) > td:nth-child(2) > b',
              Wins:
              {
                  KOTKO: 'body > div.container > div.col-left > div > section:nth-child(3) > div > div.fighter-info > div.fighter-right > div.fighter-data > div.winsloses-holder > div.wins > div:nth-child(3) > div.pl',
              },
        },
        Tables: {
              FightHistory: 'body > div.container > div.col-left > div > section:nth-child(4) > div.module.fight_history > div > table',
        },
        Images: {
              Picture: 'body > div.container > div.col-left > div > section:nth-child(3) > div > div.fighter-info > div:nth-child(1) > img'
        },
    };
    
    // the bool is for headless mode. Set to false to see the chromnium browser as it is doing the scraping
    // this is useful for debugging as some pages may redirect to login and the scraping will fail.
    let actual = await webpagedatascraper.scrape(urls, selectors, false);
                       
    console.log(actual);                
    console.log(JSON.stringify(actual));

    //OUTPUT of actual[0]:
    //{
    //    "Name":"TONY FERGUSON",
    //    "Age":"38",
    //    "Wins":{"KOTKO":"12"},
    //    "Picture":"image_crop/200/300/_images/fighter/20220331085823_Tony_Ferguson_ff.JPG",
    //    "FightHistory":[["RESULT","FIGHTER",    "EVENT","METHOD/REFEREE","R","TIME","LOSS","Michael Chandler","UFC 274 - Oliveira vs. Gaethje\nMay / 07 / 2022","KO (Front Kick)  //nJason Herzog\nVIEW PLAY-BY-PLAY","2","0:17","LOSS",   "Beneil Dariush","UFC 262 - Oliveira vs. Chandler\nMay / 15 / 2021","Decision (Unanimous)\nMike Beltran\nVIEW PLAY-BY-PLAY","3","5:00","LOSS","Charles Oliveira","UFC 256 - Figueiredo     vs. Moreno\nDec / 12 / 2020","Decision (Unanimous)\nMark Smith\nVIEW PLAY-BY-PLAY","3","5:00","LOSS","Justin Gaethje","UFC 249 - Ferguson vs. Gaethje\nMay / 09 / 2020","TKO (Punch)    \nHerb Dean\nVIEW PLAY-BY-PLAY","5","3:39","WIN","Donald Cerrone","UFC 238 - Cejudo vs. Moraes\nJun / 08 / 2019","TKO (Doctor Stoppage)\nDan Miragliotta\nVIEW PLAY-BY-PLAY","2",   "5:00"]]
    //}

})()

```

## Usage with a html file
```javascript

const webpagedatascraper = require('./webpagedatascraper');

(async () => {
    let urls = [
      `file://${__dirname}/testpages/1.html`,
      `file://${__dirname}/testpages/2.html`
    ];
    
    // make sure you use chrome when grabbing the css selectors and that they are in a format that contains '>' synmbols like below.
    // the Text,Tables, Images objects are mandatory but the structure inside can be whatever you want.
    let selectors =
    {
        Text: {
              Name: 'body > div.container > div.col-left > div > section:nth-child(3) > div > div.fighter-info > div.fighter-right > div.fighter-title > div.fighter-line1 > h1 > span',
              Age: 'body > div.container > div.col-left > div > section:nth-child(3) > div > div.fighter-info > div.fighter-right > div.fighter-data > div.bio-holder > table > tbody > tr:nth-child(1) > td:nth-child(2) > b',
              Wins:
              {
                  KOTKO: 'body > div.container > div.col-left > div > section:nth-child(3) > div > div.fighter-info > div.fighter-right > div.fighter-data > div.winsloses-holder > div.wins > div:nth-child(3) > div.pl',
              },
        },
        Tables: {
              FightHistory: 'body > div.container > div.col-left > div > section:nth-child(4) > div.module.fight_history > div > table',
        },
        Images: {
              Picture: 'body > div.container > div.col-left > div > section:nth-child(3) > div > div.fighter-info > div:nth-child(1) > img'
        },
    };

    // the bool is for headless mode. Set to false to see the chromnium browser as it is doing the scraping
    // this is useful for debugging as some pages may redirect to login and the scraping will fail.
    let actual = await webpagedatascraper.scrape(urls, selectors, true);
           
    console.log(actual);                
    console.log(JSON.stringify(actual));

    //OUTPUT of actual[0]:
    //{
    //    "Name":"TONY FERGUSON",
    //    "Age":"38",
    //    "Wins":{"KOTKO":"12"},
    //    "Picture":"image_crop/200/300/_images/fighter/20220331085823_Tony_Ferguson_ff.JPG",
    //    "FightHistory":[["RESULT","FIGHTER",    "EVENT","METHOD/REFEREE","R","TIME","LOSS","Michael Chandler","UFC 274 - Oliveira vs. Gaethje\nMay / 07 / 2022","KO (Front Kick)  //nJason Herzog\nVIEW PLAY-BY-PLAY","2","0:17","LOSS",   "Beneil Dariush","UFC 262 - Oliveira vs. Chandler\nMay / 15 / 2021","Decision (Unanimous)\nMike Beltran\nVIEW PLAY-BY-PLAY","3","5:00","LOSS","Charles Oliveira","UFC 256 - Figueiredo     vs. Moreno\nDec / 12 / 2020","Decision (Unanimous)\nMark Smith\nVIEW PLAY-BY-PLAY","3","5:00","LOSS","Justin Gaethje","UFC 249 - Ferguson vs. Gaethje\nMay / 09 / 2020","TKO (Punch)    \nHerb Dean\nVIEW PLAY-BY-PLAY","5","3:39","WIN","Donald Cerrone","UFC 238 - Cejudo vs. Moraes\nJun / 08 / 2019","TKO (Doctor Stoppage)\nDan Miragliotta\nVIEW PLAY-BY-PLAY","2",   "5:00"]]
    //}

})()

```
## Documentation

### `scrape(url, selectors, isHeadless)`

#### Params
-  **Array**  `url`: The collections of URLS you wish to scrape from. Pages must have a common format e.g. two twitter profiles.

-  **Object**  `selectors`: An object containing the CSS selectors in string format. Please use chrome when finding the selectors and make sure they are in a format that contains '>' symbols like the examples above.

-  **Bool**  `isHeadless`:  Set to false to see the Chromium instance that is doing the scraping. This is useful for debugging as some pages might redirect to a login page and so the scraping will fail.

#### Return
-  **Array** `data`: The scraped data.

## Issues and Contributing
Please [open an issue](https://github.com/hpt-dev/WebpageDataScraper/issues) if you find a bug or need help. If you would like to help me improve this package feel free to open a [pull request](https://github.com/hpt-dev/WebpageDataScraper/pulls) with your changes.

## Donate 
Any donations are appreciated! :)

Bitcoin: 3MtYLNwK4VHZCsx8m8vMH7osScoucVX4pM

Eth: 0xC2594e60A1d27eb7Dad1828DB2dDc44C4D0040c5

## Notes
UPDATE - 30/07/22 - Tests fixed. Dependency NPM packages updated. Readme Updated. [NPM repository address for WebpageDataScraper](https://www.npmjs.com/package/webpagedatascraper).
