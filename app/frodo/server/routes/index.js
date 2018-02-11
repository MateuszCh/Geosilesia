const customPostTypeRoutes = require('./customPostType.routes'),
      customPostRoutes = require('./customPost.routes');

module.exports = (app) => {
  customPostTypeRoutes(app);
  customPostRoutes(app);
};