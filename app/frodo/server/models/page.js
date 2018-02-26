const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const PageSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title of page is required']
    },
    url: {
        type: String,
        required: [true, 'Url of page is required'],
        index: true
    },
    rows: {
        type: [Object]
    },
    id: {
        type: Number
    }
});

const Page = mongoose.model('page', PageSchema);

module.exports = Page;