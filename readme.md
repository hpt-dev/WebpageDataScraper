[![img](./badgegithubactions.svg)](https://github.com/hpt-dev/WebpageDataScraper/actions)

# WebpageDataScraper
Quickly scrape data from a collection of html pages that have the same format. Simply supply css selectors and an array of urls (can be local html files or web address).
Will also return tables and images as well as text fields. Data returned in JSON format.

See below for two examples, one using a local html file and one using a web address.

How to get the css selectors using google chrome: 
1)  Hover the cursor over the image, text, or table you wish to scrape and right click mouse.
2)  Select Inspect which will bring up the chrome developer tools.
3)  Right click on the highlighted image tag, tag that contains the text (e.g. span, p, b) or the table tag.
5)  Select Copy > Copy selector.
6)  Paste the css selector in the Text/Tables/Image object like in the example below, with whatever name you want to give that field.

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
    
    let selectors =
    {
        Text: {
              Name: 'html body div.container div.col-left div section div.module.bio_fighter.vcard div.fighter-info div.fighter-right div.fighter-title div.fighter-line1 h1 span.fn',
              Age: 'html body div.container div.col-left div section div.module.bio_fighter.vcard div.fighter-info div.fighter-right div.fighter-data div.bio-holder table tbody tr td b',
              Wins:
              {
                  KOTKO: 'html body div.container div.col-left div section div.module.bio_fighter.vcard div.fighter-info div.fighter-right div.fighter-data div.winsloses-holder div.wins div.meter div.pl',
              },
        },
        Tables: {
              FightHistory: 'html body div.container div.col-left div section div.module.fight_history div.new_table_holder table.new_table.fighter',
        },
        Images: {
              Picture: 'html body div.container div.col-left div section div.module.bio_fighter.vcard div.fighter-info div img.profile-image.photo'
        },
    };
  
    let actual = await webpagedatascraper.scrape(urls, selectors);
                       
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
    
    let selectors =
    {
        Text: {
              Name: 'html body div.container div.col-left div section div.module.bio_fighter.vcard div.fighter-info div.fighter-right div.fighter-title div.fighter-line1 h1 span.fn',
              Age: 'html body div.container div.col-left div section div.module.bio_fighter.vcard div.fighter-info div.fighter-right div.fighter-data div.bio-holder table tbody tr td    b',
              Wins:
              {
                  KOTKO: 'html body div.container div.col-left div section div.module.bio_fighter.vcard div.fighter-info div.fighter-right div.fighter-data div.winsloses-holder div. wins div.meter div.pl',
              },
        },
        Tables: {
              FightHistory: '.col-left > div:nth-child(1) > section:nth-child(4) > div:nth-child(2) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2)',
        },
        Images: {
              Picture: 'html body div.container div.col-left div section div.module.bio_fighter.vcard div.fighter-info div img.profile-image.photo'
        },
    };

    let actual = await webpagedatascraper.scrape(urls, selectors);
           
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

## Issues and Contributing
Please [open an issue](https://github.com/hpt-dev/WebpageDataScraper/issues) if you find a bug or need help. If you would like to help me improve this package feel free to open a [pull request](https://github.com/hpt-dev/WebpageDataScraper/pulls) with your changes.

## Donate 
Any donations are appreciated! :)

Bitcoin: 3MtYLNwK4VHZCsx8m8vMH7osScoucVX4pM

Eth: 0xC2594e60A1d27eb7Dad1828DB2dDc44C4D0040c5

## Notes
UPDATE - 30/07/22 - Tests fixed. Dependency NPM packages updated. Readme Updated. [NPM repository address for WebpageDataScraper](https://www.npmjs.com/package/webpagedatascraper).
