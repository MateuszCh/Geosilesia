const express = require('express'),
      path = require('path'),
      mongoose = require('mongoose'),
      config = require('../../config');

mongoose.connect(config.mongoUrl);
mongoose.Promise = global.Promise;

const frodo = express();

frodo.use('/', express.static(`${__dirname}/../front/public`));

frodo.get(['*'], function(req, res){
   res.sendFile(path.resolve(`${__dirname}/../front/public/index.html`));
});

module.exports = frodo;