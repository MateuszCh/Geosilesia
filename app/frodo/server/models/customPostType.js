const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

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
   }
},{
   discriminatorKey: 'type',
   _id: false
});

const CustomPostTypeSchema = new Schema({
   title: {
      type: String,
      required: [true, 'title of custom post type is required']
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
   id: Number
},{
    toJSON: {
        virtuals: true
    }
});

CustomPostTypeSchema.path('fields').required(true);

CustomPostTypeSchema.virtual('url')
    .get(function(){
       return `/custom-post-types/edit/${this.id}`;
    });

CustomPostTypeSchema.path('fields').discriminator('select', new Schema({
   selectOptions: {
      type: String,
      required: [true, 'select options are required'  ]
   }
}, {_id: false}));

CustomPostTypeSchema.path('fields').discriminator('repeater', new Schema({
    repeaterFields: {
       type: [FieldSchema],
       validate: [{
          validator: (repeaterFields) => repeaterFields && repeaterFields.length,
          message: 'repeater fields are required'
       }, {
          validator: (repeaterFields) => {
             if(!(repeaterFields || repeaterFields.length)){
                return true;
             }

             const ids = [];
             repeaterFields.forEach((repeaterField) => {
                ids.push(repeaterField.id);
             });

             return (new Set(ids)).size === ids.length;
          },
          message: 'Each field should have a different id'
       }]
    }
}, {_id: false}));

const CustomPostType = mongoose.model('custom_post_type', CustomPostTypeSchema);

module.exports = CustomPostType;