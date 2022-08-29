import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweet = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    users.push(req.body);
    res.send('OK');
})

app.post('/tweets', (req, res) => {
    const thistweet = req.body;
    tweet.push(thistweet);
    const userAvatar = users.find((users) => users.username === thistweet.username);
    tweets.push({
        username: thistweet.username,
        avatar: userAvatar.avatar,
        tweet: thistweet.tweet
    });
    res.send('OK');
})

app.get('/tweets', (req, res) => {
    const tweetsOrdered = [];
    for (let i = 0; i < tweets.length; i++) {
        tweetsOrdered.push(tweets[tweets.length - i]);
    }
    const lastTweets = tweetsOrdered.splice(0, 10);
    res.send(lastTweets);
})

app.listen(5000);