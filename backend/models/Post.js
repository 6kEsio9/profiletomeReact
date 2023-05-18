const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    caption: {
        type: String,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    // comments: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Comment'
    // }]
    likedUsers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User' 
    }]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;