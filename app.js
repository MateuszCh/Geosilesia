const express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path'),
      MongoClient = require('mongodb').MongoClient,
      config = require('./config');

const app = express();
app.set('port', process.env.PORT || 3005);

let db;
const collections = {};

MongoClient.connect(config.mongoUrl)
    .then(client => {
        db = client.db(config.dbName);
        collections.posts = db.collection('posts');
        collections.pages = db.collection('pages');
        app.listen(app.get('port'), () => console.log("Running on port 3001"));

    })
    .catch(err => {
        throw err;
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/api/posts/:type', (req, res, next) => {
    collections.posts.find({type: req.params.type}).toArray()
        .then(posts => res.send(posts))
        .catch(next);
});

app.get('/api/page/', (req, res, next) => {
    collections.pages.find({pageUrl: '/'}).toArray()
        .then(page => res.send(page))
        .catch(next);
});

app.get('/api/page/:pageUrl', (req, res, next) => {
   collections.pages.find({pageUrl: req.params.pageUrl}).toArray()
       .then(page => res.send(page))
       .catch(next);
});

app.use('/uploads', express.static(`${__dirname}/uploads`));
app.use('/', express.static(`${__dirname}/front/public`));
app.get(['*'], (req, res) => res.sendFile(path.resolve(`${__dirname}/front/public/index.html`)));

app.use((err, req, res, next) => {
    console.log(err);
    console.log(err.message);
    if(typeof  err === 'string') {
        res.status(422).send({error: err});
    } else if (typeof  err.message === 'string') {
        res.status(422).send({error: err.message});
    } else if (err.errors) {
        const firstError = Object.keys(err.errors)[0];
        res.status(422).send({error: err.errors[firstError].message});
    } else {
        res.status(422).send(err.message);
    }
});

