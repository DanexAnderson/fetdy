/*jslint es6 */
const express = require('express');
const mongoose = require('mongoose');
// const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const mongo = require('./routes/mongo');
const sql = require('./routes/mysql');
const post = require('./routes/post');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public'))); // create link to public folder

// const db = 'mongodb://Danex:knox2005@ds159204.mlab.com:59204/truefanmessages'

 const db = 'mongodb://127.0.0.1:27017/truefanmessages';

const connect = mongoose.connection;
mongoose.connect(db,{ useNewUrlParser: true }, (err) => {
  if(err){console.error("Error "+ err)}else
    console.log('Connected to MongoDB');
}  );

connect.once('open', ()=> console.log('MongoDB Connected Successful'))

app.use('/', mongo)
app.use('/', sql)
app.use('/', post)

const PORT = process.env.PORT ||  3001;


app.listen(PORT, ()=> console.log('Server Running'));
