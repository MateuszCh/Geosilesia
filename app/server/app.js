const express = require('express'),
      vhost = require('vhost'),
      routes = require('./routes/routes'),
      frodo = require('../frodo/server/app');

const mainApp = express();
const app = express();

mainApp.use('/', express.static(`${__dirname}/../front/public`));
routes(mainApp);

app.set('port', process.env.PORT || 3000);
app.use(vhost('frodo.*', frodo));
app.use(vhost('*', mainApp));

module.exports = app;