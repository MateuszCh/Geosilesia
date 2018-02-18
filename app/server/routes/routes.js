const path = require('path'),
      express = require('express');

module.exports = app => {
    app.use('/', express.static(`${__dirname}/../../front/public`));
    app.get(['*'], (req, res) => res.sendFile(path.resolve(`${__dirname}/../../front/public/index.html`)));
};