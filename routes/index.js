var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");
const passport = require('passport');
const upload = require('./multer')
const fs = require('fs');
const path = require('path');

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

// home page
router.get('/', function (req, res, next) {
  res.render('index', { failure: req.flash('failure')});
});

//profile page route
router.get('/profile' ,isLoggedIn,async function (req, res, next) { //
  const user = await userModel.findOne({
    username : req.session.passport.user
  })
  .populate('posts');
res.render("profile",{user});
});

//register route
router.post('/register',function(req,res){
  const { username, email, fullname } = req.body;
const userData = new userModel({ username, email, fullName: fullname});

userModel.register(userData,req.body.password)
.then(function(){
  passport.authenticate("local")(req,res , function(){
    res.redirect('/profile')
  });
})
.catch(function(err) {
  // Handle registration errors - missing values/empty field
  req.flash('failure', 'All fields are needed to be filled');
  res.redirect('/');
});
});

//login route
router.post('/login', passport.authenticate("local",{
  successRedirect : "/profile",
  failureRedirect : "/login",
  failureFlash : true
}) ,function(req,res){
});

//login page route
router.get('/login', function (req, res, next) {
  res.render('login',{error :req.flash("error") });
});

//check if logged-in function
function isLoggedIn(req,res,next){
  if (req.isAuthenticated()) return next()
  res.redirect("/login");
}

//logout page route
router.get('/logout', function (req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

//feed page route
router.get('/feed',isLoggedIn,async function(req,res,next){
 
  const posts = await postModel.find();
  res.render("feed",{posts});
});

// upload image to own profile route
router.post('/upload',isLoggedIn,upload.single("file"),async function(req,res,next){
if(!req.file){
  return res.status(404).send("No file was selected...");
}
const user = await userModel.findOne({username : req.session.passport.user});
const post = await postModel.create({
  image : req.file.filename,
  postText : req.body.filecaption,
  user : user._id
});
user.posts.push(post._id);
await user.save();
res.redirect("/profile");
});

// Open profile of post route
router.post('/open-profile',isLoggedIn,async function(req,res,next){

  const post = req.body.postName;
  const foundedPost = await postModel
  .findOne({image : post})
  .populate('user')

  const user = await userModel
  .findOne({_id : foundedPost.user._id})
  .populate('posts')

  res.render('open-profile',{user})
})

// Save Profile Image Route
const multer = require('multer');
const storage = multer.diskStorage({
    destination: './public/images/profile',
    filename: function (req, file, cb) {
        cb(null, req.session.passport.user +'.jpg'); // Use a fixed filename for simplicity
    }
});
const uploads = multer({ storage: storage });

router.post('/save-profile-image', isLoggedIn ,uploads.single('imageData'),async (req, res) => {
  
   const user = await userModel.findOne({username : req.session.passport.user});
   user.dp = user.username +".jpg";
   await user.save();
   res.redirect();

});


module.exports = router;
