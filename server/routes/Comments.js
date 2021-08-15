const express = require('express');
const Router = express.Router();
const {Comments} = require('../models');
const {validateToken} = require('../middlewares/authMiddleware')

Router.get('/:postId', async (req, res) => {
    const postId = req.params.postId
    const comments = await Comments.findAll({where : {PostId : postId}});
    res.json(comments)
});


Router.post("/",validateToken, async (req, res) => {
    const comment  = req.body;
    const userPseudo = req.user.userPseudo;
    comment.userPseudo = userPseudo;

    Comments.create(comment)
        .then((result) =>{
            res.json(result.dataValues);
        })
    
});

Router.delete("/:commentId", validateToken, async (req, res)=>{
    const commentId =  req.params.commentId;

    await Comments.destroy({where:{id:commentId}});
    
    res.json("deleted")
})







module.exports = Router