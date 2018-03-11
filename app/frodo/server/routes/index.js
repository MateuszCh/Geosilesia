const postTypeRoutes = require('./postType.routes'),
      postRoutes = require('./post.routes'),
      componentRoutes = require('./component.routes'),
      pageRoutes = require('./page.routes'),
      fileRoutes = require('./file.routes');

module.exports = app => {

      postTypeRoutes(app);
      postRoutes(app);
      componentRoutes(app);
      pageRoutes(app);
      fileRoutes(app);
};