const express = require('express');
const router = express.Router();
const multer = require('multer');

const Post = require('../models/post');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/gif': 'gif'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid MIME_TYPE");
    if (isValid){
      error = null;
    }
    cb(error, "/backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

//------------------ Post Data --------------------//'/postdata'

router.post("/postdata", multer({storage: storage}).single("image"),(req,res)=>{

  const post = new Post({
    title: req.body.title, content: req.body.content
  })
  post.save().then(createdPost => {

  res.status(201).json({
    message: "Post added Successfully !!",
    postId: createdPost.id

    });
  });
  // const post = req.body;
  // console.log(post);
  // res.status(201).json({message: "Post added Successfully !!"});
});

//--------------------- get all posts -------//

router.get('/getpost',(req, res)=> {

Post.find().then(documents => {
console.log(documents);
 res.status(200).json({
      message: "Post fetched Successfully !!"
     , posts: documents
    });
})
/*   const posts = [{
    id: 1, title: "First Server Post",
    content: "This content is coming from the server"
},
{
  id: 2, title: "Second Server Post",
  content: "This Second content is also coming from server"
}
]; */

});

router.delete('/deletepost/:id', (req, res) => {

  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
  })
  res.status(200).json({message: "Post deleted! "});
});

router.put('/updatepost/:id', (req, res)=>{
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id}, post).then(result =>{
    console.log(result);
    res.status(200).json({message: "Update Successful !!"});
  })
});

router.get('/getpost/:id', (req, res) => {
  Post.findById(req.params.id).then(post => {
    if (post){
      res.status(200).json(post);
    }else{
      res.status(404).json({message: "Post not Found !!"});
    }
  })
});

module.exports =router
