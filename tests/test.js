var assert = require('assert');
const webpagedatascraper = require('../lib/webpagedatascraper');

describe('webpagedatascraper', function() {
  
  it('should return [] when sent an empty list of urls and selectors', async function(){
    let output = await webpagedatascraper.scrape([], {});
    let expected = [];
    assert.deepEqual(expected, output);
  });

  it('should return the premade outut when loading 1.html using the provided selectors', async function(){
    let expected = [{"Name":"TONY FERGUSON","Age":"38","Wins":{"KOTKO":"12"},"Picture":"image_crop/200/300/_images/fighter/20220331085823_Tony_Ferguson_ff.JPG","FightHistory":[["LOSS","Michael Chandler","UFC 274 - Oliveira vs. Gaethje\nMay / 07 / 2022","KO (Front Kick)\nJason Herzog\nVIEW PLAY-BY-PLAY","2","0:17"]]}];

    let localFile =  `file://${__dirname}/testpages/1.html`;

    let urls = [
      localFile
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
            FightHistory: '.col-left > div:nth-child(1) > section:nth-child(4) > div:nth-child(2) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2)',
      },
      Images: {
            Picture: 'html body div.container div.col-left div section div.module.bio_fighter.vcard div.fighter-info div img.profile-image.photo'
      },
  };
    let actual = await webpagedatascraper.scrape(urls, selectors);

    assert.equal(actual[0].Name.toLowerCase(), expected[0].Name.toLowerCase());
    assert.equal(actual[0].Age, expected[0].Age);
    assert.equal(actual[0].FightHistory.length, expected[0].FightHistory.length);

  }).timeout(600000);
});


describe('isObject', function() {

  it('should return true for objects', async function(){
    let output = webpagedatascraper.isObject({});
    let expected = true;
    assert.equal(expected, output);
  });

  it('should return false for arrays', async function(){
    let output = webpagedatascraper.isObject([]);
    let expected = false;
    assert.equal(expected, output);
  });

});
