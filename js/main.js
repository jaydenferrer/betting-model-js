// hello

const http = require('https');
const url = 'https://www.scrapingbee.com/blog/web-scraping-javascript/#prerequisites'
const req = http.request(url, (res) => {

    // defining the array that will store all data 
    const data = [];

    // push the info from the response into the data array
    res.on('data', (info) => {
        data.push(info)
        // console.log(info);
    });
    /*
      res.on('data', (info) => {
        data += info
    });
    */
    // once all data has been recieved, we then join all the data together
    res.on('end', () => {
        console.log(data.join())
    });
});

req.end(() => {
    console.log("The request has fully been recieved, ending the request");
});
