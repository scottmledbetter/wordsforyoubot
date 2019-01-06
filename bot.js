const twit = require('twit');
const fetch = require('node-fetch');
const config = require('./config.js');

const T = new twit(config);

const words = "https://raw.githubusercontent.com/adambom/dictionary/master/dictionary.json";
let messageNumber = 200;

const getWord = () => {
    fetch(words)
        .then(response => {
            return response.json();
        })
        .then(myJson => {
            T.post('statuses/update', {
                status:
                    Object.keys(myJson)[messageNumber].replace(/^\s+|\s+$/g, '') + ':' + '\n' + Object.values(myJson)[messageNumber].replace(/^\s+|\s+$/g, '')
            },
                (err, data, response) => {
                    console.log(data)
                })
        })
        .then(() => {
            messageNumber++;
        })
}

setInterval(getWord, 28800000);