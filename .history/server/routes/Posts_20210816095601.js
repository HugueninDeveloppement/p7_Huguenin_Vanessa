const express = require('express');
const Router = express.Router();
const {Posts, Likes} = require('../models');
const {validateToken} = require('../middlewares/authMiddleware')


Router.get("/",validateToken,async (req, res) => {
   const listOfPosts =await Posts.findAll({order:['id','ASC'],include: [Likes]});
   const listOfLikeInPost = await Likes.findAll({where:{UserId:req.user.id}});
   res.json({listOfPosts: listOfPosts, listOfLikeInPost:listOfLikeInPost})
});

Router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id);
    res.json(post)
})

Router.get('/byUserId/:id', async (req, res) => {
    const id = req.params.id
    const userPosts = await Posts.findAll({where:{UserId:id},include:[Likes]});
    res.json(userPosts)
})

Router.post("/",validateToken, async (req, res) => {
    const post = req.body;
    const userPseudo = req.user.userPseudo;
    const userId = req.user.id
    post.userPseudo = userPseudo;
    post.UserId = userId;

    await Posts.create(post);
    res.json(post)
});

Router.put("/postTitle",validateToken, async (req, res) => {
    const {newTitle,id} = req.body;
   
    await Posts.update({title:newTitle}, {where:{id:id}});
    res.json(newTitle)
});

Router.put("/postText",validateToken, async (req, res) => {
    const {newPostText,id} = req.body;
   
    await Posts.update({postText:newPostText}, {where:{id:id}});
    res.json(newPostText)
});


Router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId;

    await Posts.destroy({where:{id:postId}})

    res.json("post deleted")
});






module.exports = Router