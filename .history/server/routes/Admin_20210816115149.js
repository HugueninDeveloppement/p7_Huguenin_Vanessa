const express = require('express');
const Router = express.Router();
const {Admins, Users, Posts, Comments } = require('../models');
const Bcrypt = require('bcrypt');
const { sign } =require('jsonwebtoken');
const {validateToken} = require('../middlewares/authMiddleware');

Router.post("/authAdmin", (req, res) => {
    const {adminPseudo , adminName , adminEmail, adminPassword} = req.body;   

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
    const id = req.params.id;

    const userInfo = await Users.findByPk(id,{attributes: {exclude: ["userPassword","userEmail"]}})

    res.json(userInfo)
});

Router.get("/userAllInfo/:id", validateToken ,async (req, res)=> {
    const id = req.params.id;

    const userAllInfo = await Users.findByPk(id)

    res.json(userAllInfo)
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

Router.delete("/deletUser/:id", validateToken, async (req, res) => {
    const userId = req.params.id;

    await Users.destroy({where:{id:userId}})

    res.json("utilisateur supprimé")
});



module.exports = Router