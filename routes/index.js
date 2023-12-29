var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/alluserposts',async function (req, res, next) {
  let user = await userModel
  .findOne({_id:"658e8149d2925d45225288d4"})
  .populate('posts');
  res.send(user);
 });


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






module.exports = router;
