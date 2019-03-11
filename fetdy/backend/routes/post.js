const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

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
       cb(error, path.join(__dirname, '../images'));
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '' + Date.now() + '.' + ext);
  }
});

//------------------ Post Data --------------------//'/postdata'

router.post("/postdata", multer({storage: storage}).single('image'),(req,res,next)=>{

  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title, content: req.body.content, imagePath: url + "/images/" + req.file.filename
  })
  post.save().then(createdPost => {

  res.status(201).json({
    message: "Post added Successfully !!",
    // postId: createdPost.id
    post:{
      id:  createdPost.id,
      title: createdPost.title,
      content: createdPost.content,
      imagePath: createdPost.imagePath
    }

    });
  });
  // const post = req.body;
  // console.log(post);
  // res.status(201).json({message: "Post added Successfully !!"});
});

//--------------------- get all posts -------//

router.get('/getpost',(req, res)=> {
   const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage){
    postQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
postQuery.then(documents => {
  fetchedPosts = documents;
  return Post.countDocuments();
    }).then(count =>{
      res.status(200).json({
      message: "Post fetched Successfully !!",
      posts: fetchedPosts,
      maxPosts: count

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

  })
  res.status(200).json({message: "Post deleted! "});
});

router.put('/updatepost/:id',multer({storage: storage}).single('image'), (req, res)=>{
  let imagePath = req.body.imagePath;
  if (req.file){
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
  })
  console.log(post);
  Post.updateOne({_id: req.params.id}, post).then(result =>{

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
