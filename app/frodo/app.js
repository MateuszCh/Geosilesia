const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      routes = require('./server/routes'),
      config = require('../config'),
      Counter = require('./server/models/counter');

mongoose.connect(config.mongoUrl).then(
    () => {console.log("Connected to mongoDb")},
    (err) => {throw err});
mongoose.Promise = global.Promise;

mongoose.connection.on('open', () => {
   console.log("Connected");
   Counter.findOne({})
       .then((counter) => {
          if(counter === null){
            Counter.create({counter: 1})
                .then((counter) => {
                   console.log("Newly created:");
                   console.log(counter);
                })
                .catch((err) => {
                   console.log(err);
                })
          } else {
             console.log("Exists:");
             console.log(counter);
          }
       })
       .catch((err) => {
          console.log(err);
       });
});

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

routes(app);

app.use('/uploads', express.static(`${__dirname}/uploads`));

app.use('/export', express.static(__dirname));

app.use('/', express.static(`${__dirname}/front/public`));

app.get(['*'], function(req, res){
   res.sendFile(path.resolve(`${__dirname}/front/public/index.html`));
});

app.set('port', process.env.PORT || 3000);

app.use((err, req, res, next) => {
    console.log(err);
    console.log(1);
    console.log(err.message);
    if(typeof  err === 'string') {
        console.log(2);
        res.status(422).send({error: err});
    } else if (typeof  err.message === 'string') {
        res.status(422).send({error: err.message});
    } else if (err.errors) {
        console.log(3);
        const firstError = Object.keys(err.errors)[0];
        res.status(422).send({error: err.errors[firstError].message});
    } else {
        res.status(422).send(err.message);
    }
});

app.listen(app.get('port'), () => console.log("Frodo running on port 3000"));
