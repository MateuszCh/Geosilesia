const express = require('express'),
      apiController = require('./server/apiController');

const port = process.env.PORT || 3000;

const app = express();

app.use('/', express.static(`${__dirname}/public`));

apiController(app);

app.get(['*'], function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port);