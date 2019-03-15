const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.createUser = (req, res)=>{

  bcrypt.hash(req.body.password, 10).then(hash =>{

    const user = new User({
    email: req.body.email,
    password: hash
  });

    user.save().then(result => {
      res.status(201).json({
        message: 'New User Created !',
        result: result
      });
    }).catch(err => {
      res.status(500).json({
        message: "Invalid Email Authentication Credentials"  // Response Error Message for error-interceptor
      });
    });
  });

}

exports.userLogin = (req, res, next) => {

  let fetchedUser;

  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({
        message: "Auth Failed not User"
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {

    if (!result){

      return res.status(401).json({
        message: "Auth Failed not Password"
      });
    }
      const token = jwt.sign({        // JWTwebToken to encrypt tokens sent to the client
        email: fetchedUser.email, userId: fetchedUser._id },
         'secret_this_should_be_longer',
         {expiresIn: '1h'});  // suggest the duration of the active session

      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });

  }).catch(err => {
    console.log(err);
    return res.status(401).json({
      message: "Authentication Failed. Altered Credentials"
    });
  })
}
