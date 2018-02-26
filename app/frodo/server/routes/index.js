const postTypeRoutes = require('./postType.routes'),
      postRoutes = require('./post.routes'),
      componentRoutes = require('./component.routes');

module.exports = app => {
  postTypeRoutes(app);
  postRoutes(app);
  componentRoutes(app);
};