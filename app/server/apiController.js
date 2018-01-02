function api(app){
    app.get('/api/markers', function(req, res){
        const markers = require('../public/json/markers');
        res.json(markers);
    });

    app.get('/api/events', function(req, res){
        const events = require('../public/json/events');
        res.json(events);
    });

    app.get('/api/gallery', function(req, res){
        const gallery = req.query.id ? require('../public/json/galleries/' + req.query.id) : require('../public/json/gallery');
        res.json(gallery);
    });
}

module.exports = api;