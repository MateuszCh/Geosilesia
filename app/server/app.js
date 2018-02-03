const express = require('express'),
      vhost = require('vhost'),
      routes = require('./routes/routes'),
      bodyParser = require('body-parser'),
      frodo = require('../frodo/server/app'),
      frodoRoutes = require('../frodo/server/routes');;

const mainApp = express();
const app = express();

app.use(bodyParser.json());

routes(mainApp);

frodoRoutes(app);

app.set('port', process.env.PORT || 3000);
app.use(vhost('frodo.*', frodo));
app.use(vhost('*', mainApp));

app.use((err, req, res, next) => {
    console.log(err);
    console.log(err.message);
    res.status(422).send({error: err});
});

module.exports = app;