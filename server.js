const express = require("express");
const request = require("request");

const BASE_URL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
const app = express();
app.use(express.urlencoded({extended: true}));


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

    let crypto = req.body.crypto;
    let fiat = req.body.fiat;

    let url = BASE_URL + crypto + fiat;


    /*
        if we want to use queryParameter in our url we can use options instead of url
        options is an js-object

        var options = {
            url: BASE_URL,
            method: "GET",
            qs: { // qs is queryString to be appended to the url
                from: crypto,
                to: fiat,
                amount: req.body.amount
                .
                .
                .
            }
        };

    */

    request(url, function(err, response, body) {
        
        console.log(response.statusCode);
        if(response.statusCode == 200) {

            let data = JSON.parse(body); // parse JSON to js Object
            let price = data.last.toString();
            let currentDate = data.display_timestamp.toString();

            res.write("<h1> The current date is <em>" + currentDate + "</em> </h1>");
            res.write("<h2>The current price of " + crypto + " is <em>" + price + "</em> " + fiat + "</h2>");

            // for multiple messages we use write so use write everywhere and use empty send to not be confused.
            res.send();
            // res.send("<h3>The current price of " + crypto + " is <em>" + price + "</em> " + fiat + "</h3>");
        }
        else {            
            res.send("Sorry, this api is no longer free. So you have to refresh this page, maybe few times.");
        }
    });
});



app.listen(3000, function() {
    console.log("server is live at port 3000...");
});