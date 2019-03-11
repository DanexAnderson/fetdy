const mongoose = require('mongoose');

const postSchema = mongoose.Schema({

  title: {type:String, required: true},
  content: {type: String, required: true, default: 'Hello you, Whats popping?'},
  imagePath: { type: String, required: true }

});

module.exports = mongoose.model('Post', postSchema);
