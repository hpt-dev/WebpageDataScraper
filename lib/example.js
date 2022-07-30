const webpagedatascraper = require('./webpagedatascraper');

(async () => {
    let urls = [
        'https://www.sherdog.com/fighter/Tony-Ferguson-31239'
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

})()

