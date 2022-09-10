const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    url:{
        type: String,
        required: true,
        unique: true
    },
    img:{
        type: String,
        default: ''
    },
    source:{
        type: String,
        required: true
    },
    author:{
        type: String,
        default: ''
    },
    date:{
        type: Date,
        required: true
    },
    categories:[String]
},{
    timestamps: true
});

articleSchema.plugin(mongoosePaginate)

var Articles = mongoose.model('Article', articleSchema);


module.exports = Articles;
