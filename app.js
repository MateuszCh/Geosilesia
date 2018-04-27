const express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/uploads', express.static(`${__dirname}/uploads`));
app.use('/', express.static(`${__dirname}/front/public`));
app.get(['*'], (req, res) => res.sendFile(path.resolve(`${__dirname}/front/public/index.html`)));

app.set('port', process.env.PORT || 3001);

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

app.listen(app.get('port'), () => console.log("Running on port 3001"));
