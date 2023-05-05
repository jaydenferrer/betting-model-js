// hello

const url = 'https://www.espn.com/soccer/stats/_/league/eng.1'
const axios = require('axios');
const cheerio = require('cheerio');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;


// check to see if any property in the object contains a null
function checkProperties(obj) {
    // loop through all keys of the object
    for (keys in obj) {
        // if ALL properties in the object are not null, return false
        if (obj[keys] !== null) return false;
    }
    // else means that some element in object was null
    return true;
}

// a function that returns a promise
async function getWebsite() {
    const virtualConsole = new jsdom.VirtualConsole();
    const playerDataArray = [];
    // use a try and catch to try out an async operation, if it fails then it is caught by the catch
    try {
        // async operation, get response from the url
        const response = await axios.get(url)
        // print out the response
        //console.log(response.data);
        // extract the HTML script from the website
        const websiteHTML = response.data;
        
        // using cheerio (a library to parse an HTML string into a DOM object)
        // first load the HTML from response 
        // this is our dom object
        //const $ = cheerio.load(websiteHTML);

        // parse html and make into dom object
        const dom = new JSDOM(websiteHTML, { virtualConsole });
        // extract/select all dom objects with the data-click-id "user"
        // DOM object for each row in top scorers table (i.e this )
        const topScorerTableRow = dom.window.document.querySelectorAll('.top-score-table .Table .Table__TBODY tr');

        // loop through each element of topscrorer table row 
        // loop through each table row
        for (row in topScorerTableRow) {
            const playerData = {
                playerName: null,
                playerTeam: null,
                gamesPlayed: null,
                goalsScored: null,

            };
            // create playerData object to store data
            // loop through each table row's children (spans or links) that are associated with the table row
            for (element in topScorerTableRow[row].children) {
                //console.log(element);
                    // print out all the text content stored in these children
                    // store text content that we are extracting from current child
                    const dataElement = topScorerTableRow[row].children[element].textContent;
                    //console.log(dataElement);
                    //console.log(dataElement);
                    if (element == 1) playerData.playerName = dataElement;
                    else if (element == 2) playerData.playerTeam = dataElement;
                    else if (element == 3) playerData.gamesPlayed = dataElement;
                    else if (element == 4) playerData.goalsScored = dataElement;
                    //console.log(element);
                    //console.log(topScorerTableRow[row].children[element].textContent);
                    //console.log(playerData);
            }
            // if the playerData object is not null, then push it into the playerDataArray
            if (!checkProperties(playerData)) {
                playerDataArray.push(playerData);
            }
            //console.log(playerData);
        }
        //console.log(playerDataArray);
        return playerDataArray;
    }
    // pass the error object
    catch(error) {
        console.log(`Could not request that URL, the following error occured ${error}`);
    }
}

const hi = getWebsite();
console.log(hi);
//const websiteHTML = website.data;
//console.log('hi' + websiteData);

