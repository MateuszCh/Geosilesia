const express = require('express'),
      vhost = require('vhost'),
      bodyParser = require('body-parser'),
      path = require('path'),
      frodo = require('./frodo/server/app'),
      frodoRoutes = require('./frodo/server/routes');;

const mainApp = express();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mainApp.use('/uploads', express.static(`${__dirname}/uploads`));
mainApp.use('/', express.static(`${__dirname}/front/public`));
mainApp.get(['*'], (req, res) => res.sendFile(path.resolve(`${__dirname}/front/public/index.html`)));

frodoRoutes(app);

app.set('port', process.env.PORT || 3000);
app.use(vhost('frodo.*', frodo));
app.use(vhost('*', mainApp));

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

app.listen(app.get('port'), () => console.log("Running on port 3000"));
