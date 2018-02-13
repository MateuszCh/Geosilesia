const CustomPostType = require('../models/customPostType'),
      mongoose = require('mongoose'),
      Counter = require('../models/counter');

module.exports = {
  create(req, res, next){
      const customPostTypeProps = req.body;

      CustomPostType.findOne({type: customPostTypeProps.type})
          .then((existingType) => {
              if(existingType === null){
                  Counter.findOne({})
                      .then((counter) => {
                          customPostTypeProps.id = counter.counter;
                          CustomPostType.create(customPostTypeProps)
                              .then(() => {
                                  res.send("Custom post type created successfully");
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
                  res.status(422).send({error: `There already is "${customPostTypeProps.type}" type`})
              }

          })
          .catch(next);

  },
  getAll(req, res, next){
      CustomPostType.find({})
          .then((customPostTypes) => {
              res.send(customPostTypes);
          })
          .catch(next);
  },
  getById(req, res, next){
    const customPostTypeId = req.params.id;

    CustomPostType.findOne({id: customPostTypeId})
        .then((customPostType) => {
            res.send(customPostType)
        })
        .catch(next);
  },
  getByType(req, res, next){
    const customPostTypeType = req.params.type;

    CustomPostType.findOne({type: customPostTypeType})
        .then((customPostType) => {
            res.send(customPostType);
        })
        .catch(next);
  },
  getByTypeWithPosts(req, res, next){
      const customPostTypeType = req.params.type;

      CustomPostType.findOne({type: customPostTypeType})
          .populate('posts')
          .then((customPostType) => {
              res.send(customPostType);
          })
          .catch(next);
  },
  getWithPosts(req, res, next){
    const customPostTypeId = req.params.id;
    CustomPostType.findOne({id: customPostTypeId})
        .populate('posts')
        .then((customPostType) => {
            res.send(customPostType);
        })
        .catch(next);
  },
  delete(req, res, next){
      const customPostTypeId = req.params.id;

      CustomPostType.findById(customPostTypeId)
          .then((postToRemove) => {
              postToRemove.remove()
                  .then((post) => {
                      res.status(204).send("Custom post type removed successfully")
                  })
                  .catch(next);
          })
          .catch(next);

  },
  edit(req, res, next){
      const customPostTypeId = req.params.id;
      const customPostTypeProps = req.body;

      let id = mongoose.Types.ObjectId(customPostTypeProps._id);

      CustomPostType.findOne({type: customPostTypeProps.type, _id : {$ne: id}})
          .then((existingType) => {
              if(existingType === null){

                  CustomPostType.findById(customPostTypeId)
                      .then((post) => {

                          post.type = customPostTypeProps.type;
                          post.title = customPostTypeProps.title;
                          post.fields = customPostTypeProps.fields;
                          post.pluralTitle = customPostTypeProps.pluralTitle;

                          post.save()
                              .then((post) => {
                                  res.send(post);
                              })
                              .catch(next)
                      })
                      .catch(next);
              } else {
                  res.status(422).send({error: `There already is "${customPostTypeProps.type}" type`});
              }
          })
          .catch(next)
  }
};