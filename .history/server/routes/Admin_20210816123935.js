const express = require('express');
const Router = express.Router();
const {Admins, Users, Posts, Comments } = require('../models');
const Bcrypt = require('bcrypt');
const { sign } =require('jsonwebtoken');
const {validateToken} = require('../middlewares/authMiddleware');

Router.post("/authAdmin", (req, res) => {
    const {adminPseudo , adminName , adminEmail, adminPassword} = req.body;   
    console.log(req.body);
    Bcrypt.hash(adminPassword , 10)
        .then((passwordHash)=>{            
            Admins.create({
                adminPseudo: adminPseudo,
                adminName: adminName,
                adminEmail: adminEmail,
                adminPassword: passwordHash            
            }).then((admin)=>{
                res.json(admin)
            }).catch((err)=> {
                if(err.errors[0].path === "admins.adminPseudo"){
                res.json({error : "administarteur déja enregistré"})
                }else if (err.errors[0].path === "admins.adminEmail"){
                    res.json({error:"email déja pris"})
                }                      
            })                   
        }).catch((error)=>{
            if(error){
                res.json({error: "non enregistré"})
            }
        })                
});

Router.post("/loginAdmin" , async (req, res)=>{
    const {adminPseudo, adminPassword} = req.body;

    const admin = await Admins.findOne({where: {adminPseudo: adminPseudo}})

    if(!admin) res.json({error : "Vous ne faites pas partit des administarteurs du site"})

    Bcrypt.compare(adminPassword, admin.adminPassword)
        .then((samePassword) => {
            if(!samePassword) res.json({error: "le mot de passe ne correspond pas à l'utilisateur"});

            const accesToken = sign({adminPseudo: admin.adminPseudo, id: admin.id},"keyScret");
            res.json({token: accesToken, adminPseudo: adminPseudo, id:admin.id})
        })
})

Router.get("/checkToken", validateToken,(req, res)=>{
   return res.json(req.user)
});

Router.get("/AllUser", validateToken,async (req, res)=> {
    const listOfUsers = await Users.findAll({include:[PostsSignalled]});

    res.json(listOfUsers)
});

Router.get("/AllPostsSignalled", validateToken,async (req, res)=> {
    const listOfPostsSignalled = await PostsSignalled.findAll();

    res.json(listOfPostsSignalled)
});

Router.get("/AllCommentsSignalled", validateToken,async (req, res)=> {
    const listOfCommentsSignalled = await PostsSignalled.findAll();

    res.json(listOfCommentsSignalled)
});


Router.put('/changePassword', validateToken , async (req, res) => {
    const {oldPassword, newPassword} = req.body;

    const admin = await Admins.findOne({where:{id : req.user.id}});

    Bcrypt.compare(oldPassword, user.userPassword)
        .then((samePassword) => {
            if(!samePassword) res.json({error: "le mot de passe ne correspond pas à l'utilisateur"});

            Bcrypt.hash(newPassword, 10).then((hashPassword)=>{
                Admins.update({adminPassword:hashPassword},{where:{id: req.user.id}})
                res.json("mot de passe changé")
            }) 
        })
});

Router.delete("/deletUser/:id", validateToken, async (req, res) => {
    const userId = req.params.id;

    await Users.destroy({where:{id:userId}})

    res.json("utilisateur supprimé")
});

Router.delete("/deletPost/:id", validateToken, async (req, res) => {
    const postId = req.params.id;

    await Posts.destroy({where:{id:postId}})
    await PostsSignalled.destroy({where:{PostId:postId}})

    res.json("publication supprimée")
});

Router.delete("/deletComment/:id", validateToken, async (req, res) => {
    const commentId = req.params.id;

    await Comments.destroy({where:{id:commentId}})
    await CommentsSignalled.destroy({where:{CommentId:commentId}})

    res.json("commentaire supprimé")
});



module.exports = Router