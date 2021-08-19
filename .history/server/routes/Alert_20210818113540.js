const express = require('express');
const Router = express.Router();
const {validateToken} = require('../middlewares/authMiddleware');
const {PostsSignalled} = require('../models');
const {Posts} = require('../models');
const {Comments} = require('../models');
const {CommentsSignalled} = require('../models');

Router.post('/post', validateToken, async (req, res) => {    
    const {PostId, UserId} = req.body;

    const alreadySignalled = await PostsSignalled.findOne({
        where:{PostId: PostId, UserId:UserId}
    });

    if(!alreadySignalled) {
        await PostsSignalled.create({PostId: PostId, UserId:UserId});
        res.json({alerted:true})
    }else{
        await PostsSignalled.destroy({
            where:{PostId: PostId, UserId:UserId}
        })
        res.json({alerted:false})
    }      
});

Router.get("/post", validateToken ,async (req, res)=> {
    const listOfPostsSignalled =await Posts.findAll({order:[['id','DESC']],
        include: [{model:PostsSignalled, required:true, attribut:['id']}]});

    res.json({listOfPostsSignalled:listOfPostsSignalled})
});

Router.get("/comment", validateToken ,async (req, res)=> {
    
    const listOfCommentsSignalled =await Comments.findAll({order:[['id','DESC']],
        include: [{model:CommentsSignalled, required:true, attribut:['id']}]});

    res.json({listOfCommentsSignalled:listOfCommentsSignalled})
});

Router.post('/comment', validateToken, async (req, res) => {    
    const {CommentId, UserId} = req.body;

    const alreadySignalled = await CommentsSignalled.findOne({
        where:{CommentId: CommentId, UserId:UserId}
    });

    if(!alreadySignalled) {
        await CommentsSignalled.create({CommentId: CommentId, UserId:UserId});
        res.json({alerted:true})
    }else{
        await CommentsSignalled.destroy({
            where:{CommentId: CommentId, UserId:UserId}
        })
        res.json({alerted:false})
    }      
});


Router.delete('/comment', validateToken, async (req, res)=>{
    const commentId =  req.body.commentId;
    const commentSignalledId = req.body.alertId;

    await Comments.destroy({where:{id:commentId}});
    await CommentsSignalled.destroy({where:{id:commentSignalledId}});
    
    res.json("deleted")
});

Router.delete('/post/:id', validateToken, async (req, res)=>{
    console.log(req.body);
    const postSignalledId = req.params.id;

    await PostsSignalled.destroy({where:{id:postSignalledId}});
    
    res.json("deleted")
});


module.exports = Router

