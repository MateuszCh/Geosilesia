const express = require('express'),
      path  = require('path'),
      apiController = require('./apiController');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use('/', express.static(`${__dirname}/../front/public`));

apiController(app);

app.get(['*'], function(req, res){
    res.sendFile(path.resolve(`${__dirname}/../front/public/index.html`));
});

app.listen(app.get('port'));