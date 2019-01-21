// import mongoose from 'mongoose';
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;

let Comments = new Schema ({

        id: {type: String},
        postid: {type: String},
        userid: {type: String},
        cat: {type: String},
        comment: {type: String}
    })

module.exports = mongoose.model('comments', Comments, 'comments')

module.exports.getUserById = (id, callback) => { comments.findById(id, callback)}

module.exports.getUserByUsername = (postid, callback) => { 
    comments.findById(postid, callback)
    comments.findOne(query, callback)
}


