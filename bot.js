const twit = require('twit');
const fetch = require('node-fetch');
const config = require('./config.js');
const unirest = require('unirest');

const T = new twit(config);

//let messageNumber = 200;


//setInterval(getWord, 28800000);

const getWord = () => {
    return fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true", {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "60558e45bemsh0732116a6a48f93p170a98jsn8353a8fccdf1"
        }
    })
        .then(response => response.json())
        .then(json => json.word)
}

const getDefinition = async () => {

    let word = await getWord()

    return fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`, {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "60558e45bemsh0732116a6a48f93p170a98jsn8353a8fccdf1"
        }
    })
        .then(response => response.json())
        .then(json => {
            let word = json.word;
            let definition = json.definitions[0].definition;
            return word + ': ' + definition;
        })
}

const log = async () => { 
    console.log(await getDefinition());
}

log();

// T.post('statuses/update', {
//     status:
//         `${getWord()}`
// },
//     (err, data, response) => {
//         console.log(data)
//     })