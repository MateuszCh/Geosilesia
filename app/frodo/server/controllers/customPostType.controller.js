const CustomPostType = require('../models/customPostType'),
      mongoose = require('mongoose'),
      Counter = require('../models/counter');

function validateCustomPostTypesFieldsIds(customPostType) {
    const ids = [];

    if(!customPostType.fields.length){
        return true;
    }

    customPostType.fields.forEach((field) => {
        ids.push(field.id);
    });

    return (new Set(ids)).size === ids.length;
}

module.exports = {
  create(req, res, next){
      const customPostTypeProps = req.body;

      if(!validateCustomPostTypesFieldsIds(customPostTypeProps)){
          res.status(422).send({error: 'Each field should have a different id'});
          return;
      }

      // CustomPostType.findOne({type: customPostTypeProps.type})
      //     .then((existingType) => {
      //         if(existingType === null){
      //             CustomPostType.create(customPostTypeProps)
      //                 .then(() => {
      //                     res.send("Custom post type created successfully");
      //                 })
      //                 .catch(function(err){
      //                     const firstError = Object.keys(err.errors)[0];
      //                     res.status(422).send({error: err.errors[firstError].message});
      //                 });
      //         } else {
      //             res.status(422).send({error: `There already is "${customPostTypeProps.type}" type`})
      //         }
      //
      //     })
      //     .catch(next);


          CustomPostType.findOne({type: customPostTypeProps.type})
              .then((existingType) => {
                  if(existingType === null){
                      Counter.findOne({})
                          .then((counter) => {
                              const count = counter.counter;
                              customPostTypeProps.id = count;
                              CustomPostType.create(customPostTypeProps)
                                  .then(() => {
                                      res.send("Custom post type created successfully");
                                      Counter.update(counter, { $inc: {counter: 1}})
                                          .then(() => {
                                              console.log("Counter incremented");
                                          })
                                          .catch(function(err){
                                              console.log(err);
                                          })
                                  })
                                  .catch(function(err){
                                      const firstError = Object.keys(err.errors)[0];
                                      res.status(422).send({error: err.errors[firstError].message});
                                  });
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
  delete(req, res, next){
      const customPostTypeId = req.params.id;

      CustomPostType.findByIdAndRemove(customPostTypeId)
          .then(() => {
              res.status(204).send("Custom post type removed successfully");
          })
          .catch(next);
  },
  edit(req, res, next){
      const customPostTypeId = req.params.id;
      const customPostTypeProps = req.body;

      if(!validateCustomPostTypesFieldsIds(customPostTypeProps)){
          res.status(422).send({error: 'Each field should have a different id'});
          return;
      }

      var id = mongoose.Types.ObjectId(customPostTypeProps._id);

      CustomPostType.findOne({type: customPostTypeProps.type, _id : {$ne: id}})
          .then((existingType) => {
              if(existingType === null){

                  CustomPostType.findById(customPostTypeId)
                      .then((post) => {

                          post.type = customPostTypeProps.type;
                          post.title = customPostTypeProps.title;
                          post.fields = customPostTypeProps.fields;

                          post.save()
                              .then((post) => {
                                  res.send(post);
                              })
                              .catch(function(err){
                                  const firstError = Object.keys(err.errors)[0];
                                  res.status(422).send({error: err.errors[firstError].message});
                              })
                      })
                      .catch(next);
              } else {
                  res.status(422).send({error: `There already is "${customPostTypeProps.type}" type`});
              }
          })
          .catch(next)
  }
};