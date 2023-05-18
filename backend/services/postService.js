const Post = require('../models/Post');
const User = require('../models/User');

exports.getAll = () => Post.find();

exports.create = (data) => Post.create(data);

exports.edit = (postId, data) => Post.findByIdAndUpdate(postId, data);

exports.delete = (postId) => Post.findByIdAndDelete(postId);

exports.getOne = (postId) => Post.findById(postId);

exports.likePost = async (userId, postId) => {
    const post = await Post.findById(postId);

    post.likedUsers.push(userId);

    return post.save();
};