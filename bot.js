var twit = require('twit');
var fetch = require('node-fetch');
var config = require('./config.js');

var Twitter = new twit(config);

var words = "https://raw.githubusercontent.com/adambom/dictionary/master/dictionary.json";
var messageNumber = 0;

function getWord() {

fetch(words)
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        console.log(
            Object.keys(myJson)[ 
                messageNumber
            ]
        );
        console.log(
            Object.values(myJson)[ 
                messageNumber
            ]
        );
    })
    .then(function() {
        messageNumber ++;
    })

}

setInterval(getWord, 1500);

    // Twitter.post('statuses/update', {
    //     status: messages[1]
    // }, function (err, data, response) 
    //     console.log(data);
    // });