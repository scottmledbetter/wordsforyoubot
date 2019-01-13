const twit = require('twit');
const fetch = require('node-fetch');
const config = require('./config.js');

const T = new twit(config);

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
            if (json.definitions.length === 0) {
                //console.log('no def!');
                return getDefinition();
            } else {
                return json.word + ': ' + json.definitions[0].definition;
            }
        })
}

const tweetTweet = async () => {
    const evaluatePost = await getDefinition();

    T.post('statuses/update', {
        status:
            evaluatePost
    },
        (err, data, response) => {
            console.log(data)
        })

}

tweetTweet();
setInterval(tweetTweet, 3600000);