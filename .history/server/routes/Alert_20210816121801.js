const express = require('express');
const Router = express.Router();

Router.post('/post', async (req, res) => {    
    const {PostId, userId} = req.body;

    const alreadySignalled = await PostsSignalled.findOne({
        where:{PostId: PostId, userId:userId}
    });

    if(!alreadySignalled) {
        await PostsSignalled.create({PostId: PostId, UserId:userId});
        res.json("alerte enregistrée")
    }else{
        
        res.json({"Vous avez déjà signallé le probleme")
    }      
});


module.exports = Router

