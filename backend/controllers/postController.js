const postService = require('../services/postService');

const jwt = require('jsonwebtoken');

const { promisify } = require('util');

const jwtVerify = promisify(jwt.verify);

const secret = 'hdasuidhasuia';

exports.getPosts = async (req, res) => {
    try {
        const posts = await postService.getAll();
        res.status(200).json( posts );
    } catch (error) {
        res.status(404);
        res.send(error);
    }
};

exports.createPost = async (req, res) => {
    const data = req.body;


    data.owner = token._id;

    try {
        let createdPost = await postService.create(data);
        res.status(200).json( createdPost )
        res.end();
    } catch (error) {
        res.status(400);
        res.end();
    };
};

exports.editPost = async (req, res) => {
    const data = req.body;
    const postId = req.params.id;

    try {
        const editedPost = await postService.edit(postId, data);
        res.status(200).json( editedPost );
    } catch (error) {
        res.status(400);
        res.send(error);
    }
};

exports.deletePost = async(req, res) => {
    const postId = req.params.id;

    try{
        const deletedPost = await postService.delete(postId);
        res.status(200).json( deletedPost );
    }catch(error){
        res.status(400);
        res.send(error);
    }
};

exports.getOnePost = async(req, res) => {
    const postId = req.params.id;

    try{
        const post = await postService.getOne(postId);
        res.status(200).json({ post });
    }catch(error) {
        res.status(404);
        res.send(error);
    };
};

exports.likePost = async(req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;

    try{
        const like = await postService.likePost(userId, postId);
        res.status(200).json( like )
    }catch (error){
        res.status(400);
        res.send(error);
    };
};