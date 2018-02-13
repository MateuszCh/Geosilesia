const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const validateRepeater = function validate(fields, prop){
  return fields.some((field) => {
     if(!field[prop]){
        return true;
     }
     if(field.repeaterFields && field.repeaterFields.length){
        return validate(field.repeaterFields, prop);
     }
     return false;
  })
};

const validateRepeaterIds = function validate(fields) {
   if(!(fields || fields.length)){
      return false;
   }

   const ids = [];
   const repeaterFields = [];
   fields.forEach((field) => {
      ids.push(field.id);
       repeaterFields.push(field.repeaterFields);
   });

   if((new Set(ids)).size !== ids.length){
      return true;
   }

   if(repeaterFields && repeaterFields.length){
      return repeaterFields.some((fields) => {
         return validate(fields);
      })
   }
   return false;
};

const formatFieldsIds = function format(fields){
    if(!(fields || fields.length)){
        return true;
    }
    fields.forEach((field) => {
        field.id = formatString(field.id);

        if(field.repeaterFields || field.repeaterFields.length){
            format(field.repeaterFields);
        }
    })
};

const formatString = function(str){
    return str.replace(/\s+/g, "_").toLowerCase();
};

const FieldSchema = new Schema ({
   title: {
      type: String,
      required: [true, 'title of field is required']
   },
   type: {
      type: String,
      required: [true, 'type of field is required']
   },
   id: {
      type: String,
      required: [true, 'id is required']
   },
   selectOptions: {
      type: String
   },
   repeaterFields: {
      type: [this],
      validate: [
          {
             validator: (repeaterFields) => !validateRepeater(repeaterFields, 'title'),
             message: "title of field is required"
          },
          {
              validator: (repeaterFields) => !validateRepeater(repeaterFields, 'type'),
              message: "type of field is required"
          },
          {
              validator: (repeaterFields) => !validateRepeater(repeaterFields, 'id'),
              message: "id of field is required"
          },
          {
              validator: (repeaterFields) => !validateRepeaterIds(repeaterFields),
              message: "Each field in the same level should have a different id"
          }
      ]
   }
}, {
    toJSON: {
        virtuals: true
    }
});


FieldSchema.virtual('options')
    .get(function(){
        if(!this.selectOptions){
            return null;
        }
        let selectOptions = this.selectOptions.replace(/\s*;\s*/g, ";").split(";");
        let options = [];
        selectOptions.forEach((option) => {
           if(option) options.push(option.replace(/;/g, ""));
        });
        return options
    });

const CustomPostTypeSchema = new Schema({
   title: {
      type: String,
      required: [true, 'title of custom post type is required']
   },
   pluralTitle: {
     type: String,
     required: [true, 'plural title of custom post type is required']
   },
   type: {
      type: String,
      required: [true, 'type of custom post type is required'],
      index: true
   },
   fields : {
      type: [FieldSchema],
      validate: {
         validator: (fields) => {
            if(!(fields || fields.length)){
               return true;
            }

            const ids = [];
            fields.forEach((field) => {
               ids.push(field.id);
            });
            return (new Set(ids)).size === ids.length;
         },
         message: 'Each field should have a different id'
      }
   },
   posts : [{
       type: Schema.Types.ObjectId,
       ref: 'custom_post'
   }],
   id: Number
},{
    toJSON: {
        virtuals: true
    }
});

CustomPostTypeSchema.pre('save', function(next){
   let customPostType = this;
   customPostType.type = formatString(customPostType.type);
   formatFieldsIds(customPostType.fields);

   next();
});

CustomPostTypeSchema.pre('remove', function(next){
   const CustomPost = mongoose.model('custom_post');
   CustomPost.remove({_id: {$in: this.posts}})
       .then(() => next());
});

CustomPostTypeSchema.virtual('url')
    .get(function(){
       return `/custom-post-types/edit/${this.id}`;
    });

const CustomPostType = mongoose.model('custom_post_type', CustomPostTypeSchema);

module.exports = CustomPostType;