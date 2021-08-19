const express = require('express');
const Router = express.Router();
const {PostsSignalled, CommentsSignalled} = require('../models');
const {validateToken} = require('../middlewares/authMiddleware');

Router.post("/", validateToken,async(req, res)=>{
    
})