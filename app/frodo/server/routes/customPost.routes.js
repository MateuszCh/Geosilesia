const CustomPostController = require('../controllers/customPost.controller');

module.exports = (app) => {

    app.post('/frodo/customPost', CustomPostController.create);

};