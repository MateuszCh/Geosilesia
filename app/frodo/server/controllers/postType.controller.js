const PostType = require('../models/postType'),
      mongoose = require('mongoose'),
      Counter = require('../models/counter');

module.exports = {
  create(req, res, next){
      const postTypeProps = req.body;

      PostType.findOne({type: postTypeProps.type})
          .then((existingType) => {
              if(existingType === null){
                  Counter.findOne({})
                      .then((counter) => {
                          postTypeProps.id = counter.counter;
                          PostType.create(postTypeProps)
                              .then(() => {
                                  res.send("Post type created successfully");
                                  Counter.update(counter, { $inc: {counter: 1}})
                                      .then(() => {
                                          console.log("Counter incremented");
                                      })
                                      .catch(next)
                              })
                              .catch(next);
                      })
                      .catch(next);
              } else {
                  res.status(422).send({error: `There already is "${postTypeProps.type}" type`})
              }

          })
          .catch(next);

  },
  getAll(req, res, next){
      PostType.find({})
          .then((postTypes) => {
              res.send(postTypes);
          })
          .catch(next);
  },
  getById(req, res, next){
    const postTypeId = req.params.id;

    PostType.findOne({id: postTypeId})
        .then((postType) => {
            res.send(postType)
        })
        .catch(next);
  },
  getByType(req, res, next){
    const postTypeType = req.params.type;

    PostType.findOne({type: postTypeType})
        .then((postType) => {
            res.send(postType);
        })
        .catch(next);
  },
  getByTypeWithPosts(req, res, next){
      const postTypeType = req.params.type;

      PostType.findOne({type: postTypeType})
          .populate('posts')
          .then((postType) => {
              res.send(postType);
          })
          .catch(next);
  },
  getWithPosts(req, res, next){
    const postTypeId = req.params.id;
    PostType.findOne({id: postTypeId})
        .populate('posts')
        .then((postType) => {
            res.send(postType);
        })
        .catch(next);
  },
  delete(req, res, next){
      const postTypeId = req.params.id;

      PostType.findById(postTypeId)
          .then((postToRemove) => {
              postToRemove.remove()
                  .then((post) => {
                      res.status(204).send("Post type removed successfully")
                  })
                  .catch(next);
          })
          .catch(next);

  },
  edit(req, res, next){
      const postTypeId = req.params.id;
      const postTypeProps = req.body;

      let id = mongoose.Types.ObjectId(postTypeProps._id);

      PostType.findOne({type: postTypeProps.type, _id : {$ne: id}})
          .then((existingType) => {
              if(existingType === null){

                  PostType.findById(postTypeId)
                      .then((post) => {

                          post.type = postTypeProps.type;
                          post.title = postTypeProps.title;
                          post.fields = postTypeProps.fields;
                          post.pluralTitle = postTypeProps.pluralTitle;

                          post.save()
                              .then((post) => {
                                  res.send(post);
                              })
                              .catch(next)
                      })
                      .catch(next);
              } else {
                  res.status(422).send({error: `There already is "${postTypeProps.type}" type`});
              }
          })
          .catch(next)
  }
};