const CustomPostTypeController = require('../controllers/customPostType.controller');

module.exports = (app) => {

    app.post('/frodo/customPostType', CustomPostTypeController.create);

    app.get('/frodo/customPostType', CustomPostTypeController.getAll);

    app.get('/frodo/customPostType/:id', CustomPostTypeController.getById);

    app.get('/frodo/customPostTypeByType/:type', CustomPostTypeController.getByType);

    app.get('/frodo/customPostTypeByTypePosts/:type', CustomPostTypeController.getByTypeWithPosts);

    app.delete('/frodo/customPostType/:id', CustomPostTypeController.delete);

    app.put('/frodo/customPostType/edit/:id', CustomPostTypeController.edit);

    app.get('/frodo/customPostTypePosts/:id', CustomPostTypeController.getWithPosts);

};