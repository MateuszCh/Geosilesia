const CustomPostType = require('../models/customPostType');

function validateCustomPostTypesFieldsIds(customPostType) {
    const ids = [];

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

      CustomPostType.create(customPostTypeProps)
          .then((customPostType) => {
              res.send(customPostType);
          })
          .catch(function(err){
              const firstError = Object.keys(err.errors)[0];
              res.status(422).send({error: err.errors[firstError].message});
          });

  },
  getAll(req, res, next){
      CustomPostType.find({})
          .then((customPostTypes) => {
              res.send(customPostTypes);
          })
          .catch(next);
  },
  getByType(req, res, next){
    const customPostTypeType = req.params.type;
    CustomPostType.find({type: customPostTypeType})
        .then((customPostType) => {
            res.send(customPostType)
        })
        .catch(next);
  },
  delete(req, res, next){
      const customPostTypeId = req.params.id;
      CustomPostType.findByIdAndRemove(customPostTypeId)
          .then(() => {
              res.status(204).send("Custom post type removed");
          })
          .catch(next);
  }
};