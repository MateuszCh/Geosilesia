const postTypeRoutes = require('./postType.routes'),
      postRoutes = require('./post.routes');

module.exports = app => {
  postTypeRoutes(app);
  postRoutes(app);
};