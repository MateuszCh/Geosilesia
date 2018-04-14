const express = require('express'),
      path = require('path'),
      mongoose = require('mongoose'),
      config = require('../../config'),
      Counter = require('./models/counter');

mongoose.connect(config.mongoUrl);
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

const frodo = express();

frodo.use('/uploads', express.static(`${__dirname}/../../uploads`));

frodo.use('/export', express.static(__dirname));

frodo.use('/', express.static(`${__dirname}/../front/public`));

frodo.get(['*'], function(req, res){
   res.sendFile(path.resolve(`${__dirname}/../front/public/index.html`));
});

module.exports = frodo;