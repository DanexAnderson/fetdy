const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const comments = require('../models/comments')

router.get('/', (req, res) => {
    res.send('Router Api Works')
})


router.route('/test2').post((req, res) => {
    console.log('Here in post');
    let comments = new Comments(req.body)
    comments.save().then(comments => {
        res.status(200).json({'result':'Added Successfully'})
    }).catch(err => {res.status(400).send('Failed to create new Record')})
})

router.get ('/testmongo', (req,res)=>{

    comments.find((err, comment)=> {
        if(err)console.log(err)
         else res.json(comment)})
} )



module.exports =router
