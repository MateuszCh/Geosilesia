const PageController = require('../controllers/page.controller');

module.exports = app => {
    app.post('/frodo/page', PageController.create);

    app.put('/frodo/page/edit', PageController.edit);

    app.get('/frodo/page', PageController.getAll);

    app.get('/frodo/page/:id', PageController.getById);

    app.delete('/frodo/page/:id', PageController.delete);
};