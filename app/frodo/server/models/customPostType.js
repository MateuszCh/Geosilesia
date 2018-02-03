const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      uniqueValidator = require('mongoose-unique-validator');

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
});

const CustomPostTypeSchema = new Schema({
   title: {
      type: String,
      required: [true, 'title of custom post type is required']
   },
   type: {
      type: String,
      unique: true,
      required: [true, 'type of custom post type is required'],
      index: true
   },
   fields : [FieldSchema]
});

CustomPostTypeSchema.plugin(uniqueValidator);

const CustomPostType = mongoose.model('custom_post_type', CustomPostTypeSchema);

module.exports = CustomPostType;