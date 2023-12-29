var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");
const passport = require('passport');

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

// home page
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//profile page route
router.get('/profile' ,function (req, res, next) {
res.render("profile");
});

//get all posts of a perticular user route
router.get('/alluserposts',async function (req, res, next) {
  let user = await userModel
  .findOne({_id:"658e8149d2925d45225288d4"})
  .populate('posts');
  res.send(user);
 });

//create new user route
router.get('/createuser', async function (req, res, next) {

  let createduser = await userModel.create({

    username: "jay",
    password: "jay",
    posts: [],
    email: "jay@gmail.com",
    fullName: "Jay Sushil Pokharna",

  });

  res.send(createduser)

});

//create new post route
router.get('/createpost', async function (req, res, next) {

  let createdpost = await postModel.create({

    postText: "Second post",
    user : "658e8149d2925d45225288d4"
  
  });

  let user = await userModel.findOne({_id : '658e8149d2925d45225288d4'});
  user.posts.push(createdpost._id);
  await user.save();
  res.send("Done")
});

//register route
router.post('/register',function(req,res){
  const { username, email, fullname } = req.body;
const userData = new userModel({ username, email, fullName: fullname });

userModel.register(userData,req.body.password)
.then(function(){
  passport.authenticate("local")(req,res , function(){
    res.redirect('/profile')
  })
})
});

//login route
router.post('/login', passport.authenticate("local",{
  successRedirect : "/profile",
  failureRedirect : "/login"
}) ,function(req,res){
});

//login page route
router.get('/login', function (req, res, next) {
  res.render('login');
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
    res.redirect('/');
  });
});

//feed page route
router.get('/feed',function(req,res){
  res.render('feed');
});

module.exports = router;
