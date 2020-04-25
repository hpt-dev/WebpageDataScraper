var assert = require('assert');
var { quickscrape, copyObj, isObject, getInnerText, getImageURL, getTableArray } = require('../lib/quickscrape');

describe('quickscrape', function() {
  it('should return [] when sent an empty list of urls and selectors', async function(){
    let output = await quickscrape([], {});
    let expected = [];
    assert.deepEqual(expected, output);
  });

  it('should return the premade outut when loading 1.html using the provided selectors', async function(){
    let expected =
    [{
      "Name":"Tony Ferguson",
      "NickName":"El Cucuy",
      "DOB":"1984-02-12",
      "Age":"AGE: 36",
      "Weight":"155 lbs",
      "Height":"6'0\"",
      "Association":"Team Death Clutch",
      "WeightClass":"Lightweight",
      "Nationality":"United States",
      "Address":"Oxnard, California",
      "Wins":{"KOTKO":"12 KO/TKO (48%)","Submissions":"8 SUBMISSIONS (32%)","Decisions":"5 DECISIONS (20%)","Total":"25"},
      "Losses":{"KOTKO":"0 KO/TKO (0%)","Submissions":"1 SUBMISSIONS (33%)","Decisions":"2 DECISIONS (67%)","Total":"3"},
      "Picture":".Tony _El Cucuy_ Ferguson MMA Stats, Pictures, News, Videos, Biography - Sherdog.com_files/20140513010550_1MG_4155.JPG",
      "FightHistory":[["Result","Fighter","Event","Method/Referee","R","Time"],["win","Donald Cerrone","UFC 238 - Cejudo vs. Moraes\nJun / 08 / 2019","TKO (Doctor Stoppage)\nDan Miragliotta","2","5:00"],["win","Anthony Pettis","UFC 229 - Nurmagomedov vs. McGregor\nOct / 06 / 2018","TKO (Corner Stoppage)\nJason Herzog","2","5:00"],["win","Kevin Lee","UFC 216 - Ferguson vs. Lee\nOct / 07 / 2017","Submission (Triangle Choke)\nHerb Dean","3","4:02"],["win","Rafael dos Anjos","UFC Fight Night 98 - Dos Anjos vs. Ferguson\nNov / 05 / 2016","Decision (Unanimous)\nHerb Dean","5","5:00"],["win","Lando Vannata","UFC Fight Night 91 - McDonald vs. Lineker\nJul / 13 / 2016","Submission (Brabo Choke)\nJohn McCarthy","2","2:22"],["win","Edson Barboza","UFC - The Ultimate Fighter 22 Finale\nDec / 11 / 2015","Submission (Brabo Choke)\nJohn McCarthy","2","2:54"],["win","Josh Thomson","UFC Fight Night 71 - Mir vs. Duffee\nJul / 15 / 2015","Decision (Unanimous)\nHerb Dean","3","5:00"],["win","Gleison Tibau","UFC 184 - Rousey vs. Zingano\nFeb / 28 / 2015","Submission (Rear-Naked Choke)\nHerb Dean","1","2:37"],["win","Abel Trujillo","UFC 181 - Hendricks vs. Lawler 2\nDec / 06 / 2014","Submission (Rear-Naked Choke)\nJohn McCarthy","2","4:19"],["win","Danny Castillo","UFC 177 - Dillashaw vs. Soto\nAug / 30 / 2014","Decision (Split)\nHerb Dean","3","5:00"],["win","Katsunori Kikuno","UFC 173 - Barao vs. Dillashaw\nMay / 24 / 2014","KO (Punch)\nYves Lavigne","1","4:06"],["win","Mike Rio","UFC 166 - Velasquez vs. Dos Santos 3\nOct / 19 / 2013","Submission (Brabo Choke)\nKerry Hatley","1","1:52"],["loss","Michael Johnson","UFC on Fox 3 - Diaz vs. Miller\nMay / 05 / 2012","Decision (Unanimous)\nDan Miragliotta","3","5:00"],["win","Yves Edwards","UFC - The Ultimate Fighter 14 Finale\nDec / 03 / 2011","Decision (Unanimous)\nChris Tognoni","3","5:00"],["win","Aaron Riley","UFC 135 - Jones vs. Rampage\nSep / 24 / 2011","TKO (Jaw Injury)\nTom Johnson","1","5:00"],["win","Ramsey Nijem","UFC - The Ultimate Fighter 13 Finale\nJun / 04 / 2011","KO (Punches)\nJosh Rosenthal","1","3:54"],["win","Brock Jardine","PureCombat 12 - Champions for Children\nSep / 25 / 2010","TKO (Punches)\nMarcos Rosales","4","2:35"],["win","David Gardner","CA Fight Syndicate - Battle of the 805\nMar / 26 / 2010","TKO (Punches)\nN/A","2","1:52"],["win","Chris Kennedy","NFAMMA - Resurrection\nDec / 18 / 2009","TKO (Doctor Stoppage)\nN/A","1","2:29"],["loss","Jamie Toney","NFAMMA - MMA at the Hyatt 3: Redemption\nOct / 16 / 2009","Submission (Triangle Choke)\nN/A","1","2:15"],["win","James Fanshier","RF - Rebel Fighter\nJul / 17 / 2009","Decision (Unanimous)\nN/A","3","5:00"],["win","Devin Benjamin","NFAMMA - MMA at the Hyatt 2\nMay / 28 / 2009","TKO (Punches and Elbows)\nN/A","1","1:08"],["win","Daniel Hernandez","NFAMMA - MMA at the Hyatt\nMar / 05 / 2009","TKO (Punches)\nMike Beltran","1","2:22"],["loss","Karen Darabedyan","All Star Boxing - Caged in the Cannon\nFeb / 06 / 2009","Decision (Unanimous)\nHerb Dean","3","3:00"],["win","Frank Park","LBFN 3 - Long Beach Fight Night 3\nJan / 04 / 2009","Submission (Neck Crank)\nN/A","1","2:43"],["win","Joe Schilling","TFA 12 - Total Fighting Alliance 12\nSep / 13 / 2008","Submission (Rear-Naked Choke)\nCecil Peoples","2","2:12"],["win","Brandon Adams","TFA 11 - Pounding at the Pyramid\nJul / 12 / 2008","TKO (Punches)\nN/A","2","2:18"],["win","Steve Avalos","CXF - Anarchy at the Arena\nApr / 12 / 2008","TKO (Submission to Punches)\nN/A","2","1:25"]],
      "ExhibitionHistory":[["Result","Fighter","Event","Method/Referee","R","Time"],["win","Chuck O'Neil","UFC - The Ultimate Fighter Season 13 Semifinals\nMar / 01 / 2011","TKO (Punches)\nHerb Dean","3","3:10"],["win","Ryan McGillivray","UFC - The Ultimate Fighter Season 13 Quarterfinals, Day 2\nFeb / 23 / 2011","TKO (Punches)\nJosh Rosenthal","1","0:44"],["win","Justin Edwards","UFC - The Ultimate Fighter Season 13 Opening Round, Day 6\nFeb / 12 / 2011","KO (Upkick)\nJosh Rosenthal","1","3:57"]]
    }];

    let localFile =  `file://${__dirname}/testpages/1.html`;

    let urls = [
      localFile
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
  
    let actual = await quickscrape(urls, selectors);

    assert.equal(actual[0].Address, expected[0].Address);
    assert.equal(actual[0].DOB, expected[0].DOB);
    assert.equal(actual[0].ExhibitionHistory.length, expected[0].ExhibitionHistory.length);

  }).timeout(600000);
});


describe('isObject', function() {

  it('should return true for objects', async function(){
    let output = isObject({});
    let expected = true;
    assert.equal(expected, output);
  });

  it('should return false for arrays', async function(){
    let output = isObject([]);
    let expected = false;
    assert.equal(expected, output);
  });

});
