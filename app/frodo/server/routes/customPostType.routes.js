const CustomPostTypeController = require('../controllers/customPostType.controller');

module.exports = (app) => {

    app.post('/frodo/customPostType', CustomPostTypeController.create);

    app.get('/frodo/customPostType', CustomPostTypeController.getAll);

    app.get('/frodo/customPostType/:type', CustomPostTypeController.getByType);

    app.delete('/frodo/customPostType/:id', CustomPostTypeController.delete);

};
