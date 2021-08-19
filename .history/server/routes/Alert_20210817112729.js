const express = require('express');
const Router = express.Router();
const {validateToken} = require('../middlewares/authMiddleware');

Router.post('/post', validateToken, async (req, res) => {    
    const {PostId, userId} = req.body;

    const alreadySignalled = await PostsSignalled.findOne({
        where:{PostId: PostId, UserId:userId}
    });

    if(!alreadySignalled) {
        await PostsSignalled.create({PostId: PostId, UserId:userId});
        res.json("alerte enregistrée")
    }else{
        
        res.json("Vous avez déjà signallé le probleme")
    }      
});

Router.get("/post", validateToken ,async (req, res)=> {

    const listOfPostsSignalled = await Users.findAll({order:[['id','DESC']]});

    res.json({listOfPostsSignalled:listOfPostsSignalled})
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

