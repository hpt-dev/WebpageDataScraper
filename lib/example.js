const webpagedatascraper = require('./webpagedatascraper');

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
  
    let actual = await webpagedatascraper.scrape(urls, selectors);
                       
    console.log(actual);
})()

