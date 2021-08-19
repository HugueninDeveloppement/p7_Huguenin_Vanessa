const express = require('express');
const Router = express.Router();
const {PostsSignalled} = require('../models');
const {CommentsSignalled} = require('../models');
const {validateToken} = require('../middlewares/authMiddleware');

