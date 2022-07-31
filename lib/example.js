const webpagedatascraper = require('./webpagedatascraper');

(async () => {
    let urls = [
        'https://www.sherdog.com/fighter/Tony-Ferguson-31239',
        'https://www.sherdog.com/fighter/Michael-Chandler-50829'
    ];
    
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
              Picture: 'body > div.container > div.col-left > div > section:nth-child(3) > div > div.fighter-info > div:nth-child(1) > img',
        },
    };
  
    let actual = await webpagedatascraper.scrape(urls, selectors);
    
    console.log(actual);                
    console.log(JSON.stringify(actual));

})()

