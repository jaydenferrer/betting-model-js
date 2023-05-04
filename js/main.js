// hello

const url = 'https://www.scrapingbee.com/blog/web-scraping-javascript/#prerequisites'
const axios = require('axios');

/*
const http = require('https');

const req = http.request(url, (res) => {

    // defining the array that will store all data 
    const data = [];

    // push the info from the response into the data array
    res.on('data', (info) => {
        data.push(info)
        // console.log(info);
    });
    
      res.on('data', (info) => {
        data += info
    });
    
    // once all data has been recieved, we then join all the data together
    res.on('end', () => {
        console.log(data.join())
    });
});

req.end(() => {
    console.log("The request has fully been recieved, ending the request");
});
*/

const websiteData = [];
// a function that returns a promise
async function getWebsite() {
    // use a try and catch to try out an async operation, if it fails then it is caught by the catch
    try {
        // async operation, get response from the url
        const response = await axios.get(url)
        // print out the response
        //console.log(response);
        websiteData.push(response);
    }
    // pass the error object
    catch(error) {
        console.log('Could not request that URL, the following error occured ${error}');
    }
}

const website = getWebsite();
//const websiteHTML = website.data;
console.log('hi' + websiteData);

