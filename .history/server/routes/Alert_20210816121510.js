const express = require('express');
const Router = express.Router();

Router.post('/post', async (req, res) => {    
    const {PostId, userId} = req.body;

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
});


module.exports = Router

