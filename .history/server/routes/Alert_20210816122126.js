const express = require('express');
const Router = express.Router();

Router.post('/post', async (req, res) => {    
    const {PostId, userId} = req.body;

    const alreadySignalled = await PostsSignalled.findOne({
        where:{PostId: PostId, UserId:userId}
    });

    if(!alreadySignalled) {
        await PostsSignalled.create({PostId: PostId, UserId:userId});
        res.json("alerte enregistrée")
    }else{
        
        res.json({"Vous avez déjà signallé le probleme")
    }      
});

Router.post('/comment', async (req, res) => {    
    const {commentId, userId} = req.body;

    const alreadySignalled = await CommentsSignalled.findOne({
        where:{CommentId: commentId, UserId:userId}
    });

    if(!alreadySignalled) {
        await CommentsSignalled.create({CommentId: commentId, UserId:userId});
        res.json("alerte enregistrée")
    }else{
        
        res.json({"Vous avez déjà signallé le probleme")
    }      
});


module.exports = Router

