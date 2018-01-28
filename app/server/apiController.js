function api(app){
    app.get('/api/markers', function(req, res){
        const markers = require('../front/public/json/markers');
        res.json(markers);
    });

    app.get('/api/events', function(req, res){
        const events = require('../front/public/json/events');
        res.json(events);
    });

    app.get('/api/gallery', function(req, res){
        const gallery = req.query.id ? require('../front/public/json/galleries/' + req.query.id) : require('../front/public/json/gallery');
        res.json(gallery);
    });
}

module.exports = api;