const express = require('express');
const Router = express.Router();
const {Admin} = require('../models');
const {validateToken} = require('../middlewares/authMiddleware');

Router.post("/", async(req, res)=>{
    
})
