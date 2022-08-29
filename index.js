import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    users.push(req.body);
    res.send('OK');
})

app.post('/tweets', (req, res) => {
    const thistweet = req.body;
    const { username, tweet } = thistweet
    const avatar = users.find(user => user.username === username);
    const newTweet = {
        username: username,
        avatar: avatar.avatar,
        tweet: tweet
    }
    tweets.push(newTweet);
    res.send('OK');
})

app.get('/tweets', (req, res) => {
    const lastTweets = ([...tweets].reverse().splice(0, 10));
    res.send(lastTweets);
})

app.listen(5000);