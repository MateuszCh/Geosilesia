const PostTypeController = require('../controllers/postType.controller');

module.exports = app => {
    app.post('/frodo/component', PostTypeController.create);

    app.put('/frodo/component/edit/:id', PostTypeController.edit);

    app.get('/frodo/component', PostTypeController.getAll);

    app.get('/frodo/component/:id', PostTypeController.getById);

    app.delete('/frodo/component/:id', PostTypeController.delete);

    app.get('/frodo/exportComponents', PostTypeController.exportPostTypes);

    app.post('/frodo/importComponents', PostTypeController.importPostTypes);
};