const express = require('express');
const Router = express.Router();
const {Users} = require('../models');
const Bcrypt = require('bcrypt');
const { sign } =require('jsonwebtoken');
const {validateToken} = require('../middlewares/authMiddleware');



Router.post("/auth", (req, res) => {
    const {userPseudo , userName , userEmail, userPassword} = req.body;   

    Bcrypt.hash(userPassword , 10)
        .then((passwordHash)=>{            
                Users.create({
                    userPseudo: userPseudo,
                    userName: userName,
                    userEmail: userEmail,
                    userPassword: passwordHash,
                    userRole:false           
                }).then((user)=>{
                    res.json(user)
                }).catch((err)=> {
                        console.log(err.error);
                    if(err.errors[0].path === "users.userPseudo"){
                    res.json({error : "utilisateur déja enregistré"})
                    }else if (err.errors[0].path === "users.userEmail"){
                        res.json({error:"email déja pris"})
                    }                      
                })                   
        }).catch((error)=>{
            if(error){
                res.json({error: "non enregistré"})
            }
        })                
});

Router.post("/login" , async (req, res)=>{
    const {userPseudo, userPassword} = req.body;

    const user = await Users.findOne({where: {userPseudo: userPseudo}})

    if(!user) res.json({error : "utilisateur non inscrit"})

    Bcrypt.compare(userPassword, user.userPassword)
        .then((samePassword) => {
            if(!samePassword) res.json({error: "le mot de passe ne correspond pas à l'utilisateur"});

            const accesToken = sign({ id: user.id, userPseudo: user.userPseudo, role:user.userRole},"keyScret");
            res.json({token: accesToken, id:user.id, userPseudo: userPseudo, role:user.userRole})
        })
})

Router.get("/checkToken", validateToken,(req, res)=>{
    console.log(req.user);
   return res.json(req.user)
});

Router.get("/userInfo/:id", validateToken,async (req, res)=> {
    const id = req.params.id;

    const userInfo = await Users.findByPk(id,{attributes: {exclude: ["userPassword","userEmail","userRole"]}})

    res.json(userInfo)
});

Router.get("/userAllInfo/:id", validateToken ,async (req, res)=> {
    const id = req.params.id;

    const userAllInfo = await Users.findByPk(id,{attributes: {exclude: ["userRole"]}})

    res.json(userAllInfo)
});

Router.get("/userControl", validateToken ,async (req, res)=> {

    const listOfUsers = await Users.findAll({order:[['id','DESC']]});

    res.json({listOfUsers:listOfUsers})
});

Router.put('/changePassword', validateToken , async (req, res) => {
    const {oldPassword, newPassword} = req.body;

    const user = await Users.findOne({where:{id : req.user.id}});

    Bcrypt.compare(oldPassword, user.userPassword)
        .then((samePassword) => {
            if(!samePassword) res.json({error: "le mot de passe ne correspond pas à l'utilisateur"});

            Bcrypt.hash(newPassword, 10).then((hashPassword)=>{
                Users.update({userPassword:hashPassword},{where:{id: req.user.id}})
                res.json("mot de passe changé")
            }) 
        })
});

Router.put('/roleUser', validateToken , async (req, res) => {
    const id = req.body.idUser;
    const newRole = req.body.role;
      console.log(req.body); 

    Users.update({userRole:newRole},{where:{id:id}})
    res.json({Admin:newRole})           
       
});

Router.delete("/deletUser/:id", validateToken, async (req, res) => {
    const userId = req.params.id;

    await Users.destroy({where:{id:userId}})

    res.json("utilisateur supprimé")
});






module.exports = Router