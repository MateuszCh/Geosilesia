const PostTypeController = require('../controllers/postType.controller');

module.exports = app => {
    app.post('/frodo/postType', PostTypeController.create);

    app.put('/frodo/postType/edit/:id', PostTypeController.edit);

    app.get('/frodo/postType', PostTypeController.getAll);

    app.get('/frodo/postType/:id', PostTypeController.getById);

    app.get('/frodo/postTypePosts/:id', PostTypeController.getByIdWithPosts);

    app.get('/frodo/postTypeByType/:type', PostTypeController.getByType);

    app.get('/frodo/postTypeByTypePosts/:type', PostTypeController.getByTypeWithPosts);

    app.delete('/frodo/postType/:id', PostTypeController.delete);
};