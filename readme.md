![Node.js CI](https://travis-ci.org/hpt-dev/WebpageDataScraper.svg?branch=master)

https://travis-ci.org/github/hpt-dev/WebpageDataScraper

# WebpageDataScraper
Web scraping extension for puppeteer. Quickly scrape html page data to JSON object.

## Installation
Use the package manager [npm](https://www.npmjs.com/) to install quickscrape.

```bash
npm install webpagedatascraper
```

## Usage
```javascript
const webpagedatascraper = require('webpagedatascraper');

(async () => {
    let urls = [
        'https://www.sherdog.com/fighter/Tony-Ferguson-31239'
    ];
    
    let selectors =
    {
        Text: {
              Name: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > h1 > span.fn',
              NickName: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > h1 > span.nickname > em',
              DOB: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > div > div.bio > div.birth_info > span.item.birthday > span',
              Age: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > div > div.bio > div.birth_info > span.item.birthday > strong',
              Wins:
              {
                  Total: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > div > div.record > div > div > div:nth-child(1) > span.card > span.counter'
              },
        },
        Tables: {
              FightHistory: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(5) > div > div.content.table > table tr',
        },
        Images: {
              Picture: 'body > div.container > div:nth-child(3) > div.col_left > section:nth-child(3) > div > div.content > div:nth-child(1) > img'
        },
    };
  
    let actual = await webpagedatascraper.scrape(urls, selectors);
    
    console.log(actual);
})()
```
