const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    image: String,
    caption: {
        type: String,
        maxlength:20
    },
    hashtags:{
        type: String
    },
    author:{
        type: Schema.ObjectId,
        ref: 'User'

    },
    likes:[{ author: { type: Schema.ObjectId, ref: 'User' } }],
    comments:[
        {
           author:{
            type: Schema.ObjectId,
            ref:'User'
           } ,
           comment:{
            type: String,
            maxlength:50
           },
           date: {
            type: Date,
            default: Date.now()
           }
        }
    ]
},{timestamps:true})

const Post = mongoose.model('Post',postSchema);
module.exports = Post;