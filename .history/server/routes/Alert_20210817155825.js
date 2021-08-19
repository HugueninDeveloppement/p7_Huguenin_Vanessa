const express = require('express');
const Router = express.Router();
const {validateToken} = require('../middlewares/authMiddleware');
const {PostsSignalled} = require('../models');
const {Posts} = require('../models');
const {CommentsSignalled} = require('../models');

Router.post('/post', validateToken, async (req, res) => {    
    const {PostId, UserId} = req.body;

    const alreadySignalled = await PostsSignalled.findOne({
        where:{PostId: PostId, UserId:UserId}
    });

    if(!alreadySignalled) {
        await PostsSignalled.create({PostId: PostId, UserId:UserId});
        res.json("alerte enregistrée")
    }else{
        
        res.json("Vous avez déjà signallé le probleme")
    }      
});

Router.get("/post", validateToken ,async (req, res)=> {
    const listOfPosts =await Posts.findAll({order:[['id','DESC']],include: [PostsSignalled],where :{PostsSignalled: !null}});

    const listOfPostsSignalled = await PostsSignalled.findAll({order:[['id','DESC']]});

    res.json({listOfPostsSignalled:listOfPostsSignalled, listOfPosts:listOfPosts})
});

Router.get("/comment", validateToken ,async (req, res)=> {

    const listOfCommentsSignalled = await CommentsSignalled.findAll({order:[['id','DESC']]});

    res.json({listOfCommentsSignalled:listOfCommentsSignalled})
});

Router.post('/comment', validateToken, async (req, res) => {    
    const {commentId, userId} = req.body;

    const alreadySignalled = await CommentsSignalled.findOne({
        where:{CommentId: commentId, UserId:userId}
    });

    if(!alreadySignalled) {
        await CommentsSignalled.create({CommentId: commentId, UserId:userId});
        res.json("alerte enregistrée")
    }else{
        
        res.json("Vous avez déjà signallé le probleme")
    }      
});


module.exports = Router
