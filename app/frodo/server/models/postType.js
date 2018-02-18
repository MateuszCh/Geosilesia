const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      FieldSchema = require('./field'),
      format = require('./tools/format'),
      fieldValidation = require('./validation/fieldValidation');

const PostTypeSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title of post type is required']
    },
    pluralTitle: {
        type: String,
        required: [true, 'plural title of post type is required']
    },
    type: {
        type: String,
        required: [true, 'type of post type is required'],
        index: true
    },
    fields : {
        type: [FieldSchema],
        validate: {
            validator: (fields) => fieldValidation.validateFieldsIds(fields),
            message: 'Each field should have a different id'
        }
    },
    posts : [{
        type: Schema.Types.ObjectId,
        ref: 'post'
    }],
    id: Number
},{
    toJSON: {
        virtuals: true
    }
});

PostTypeSchema.pre('save', function(next){
   let PostType = this;
   PostType.type = format.formatId(PostType.type);
   format.formatFieldsIds(PostType.fields);

   next();
});

PostTypeSchema.pre('remove', function(next){
   const Post = mongoose.model('post');
   Post.remove({_id: {$in: this.posts}})
       .then(() => next());
});

PostTypeSchema.virtual('url')
    .get(function(){
       return `/post-types/edit/${this.id}`;
    });

const PostType = mongoose.model('post_type', PostTypeSchema);

module.exports = PostType;