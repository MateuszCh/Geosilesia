const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const CustomPostSchema = new Schema({
   title: {
       type: String,
       required: [true, 'Title of custom post is required']
   },
   type: {
       type: String,
       required: [true, 'Type of custom post is required']
   },
   data: {
       type: Object
   },
   id: {
       type: Number
   }
});

const CustomPost = mongoose.model('custom_post', CustomPostSchema);

module.exports = CustomPost;