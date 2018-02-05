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
   },
   selectOptions: {
      type: String
   }
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
   fields : [FieldSchema],
   id: Number
},{
    toJSON: {
        virtuals: true
    }
});

CustomPostTypeSchema.virtual('url')
    .get(function(){
       return `/custom-post-types/edit/${this.id}`;
    });

const CustomPostType = mongoose.model('custom_post_type', CustomPostTypeSchema);

module.exports = CustomPostType;