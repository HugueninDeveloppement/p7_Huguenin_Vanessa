const express = require('express');
const Router = express.Router();
const {PostsSignalled, CommentsSignalled} = require('../models');
const {validateToken} = require('../middlewares/authMiddleware');

Router.post("/", validateToken,async(req, res)=>{
    const {PostId} = req.body;
    const userId = req.user.id;

    const alreadyLiked = await Likes.findOne({
        where:{PostId: PostId, userId:userId}
    });

    if(!alreadyLiked) {
        await Likes.create({PostId: PostId, UserId:userId});
        res.json({liked:true})
    }else{
        await Likes.destroy({
            where:{PostId: PostId, UserId:userId}
        })
        res.json({liked:false})
    }      
})