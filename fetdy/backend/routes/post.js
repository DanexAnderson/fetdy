const express = require('express');
const router = express.Router();

// const path = require('path');

// const Post = require('../models/post');

const mimeType = require ('../middleware/mimeTypeFile');

const PostController = require('../controllers/post');

const checkAuth = require('../middleware/check-auth');

//------------------ Post Data --------------------//'/postdata'

router.post("/postdata",checkAuth,mimeType, PostController.createPost);

//--------------------- get all posts -------//

router.get('/getpost', PostController.getPost);

router.delete('/deletepost/:id', checkAuth, PostController.deletePost);

router.put('/updatepost/:id',checkAuth ,mimeType, PostController.updatePost);

router.get('/getpost/:id', PostController.getuserPost);

module.exports =router
