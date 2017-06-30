const express = require('express');
const app = express();
const mustache = require("mustache-express")
const models = require("./models")
const bodyParser = require("body-parser");


app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))

// var article = models.blogs.build({
//   title: '4th thing I learned!',
//   text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
// })
// article.save();

app.listen(3000, function(){
  console.log("I made Twitter in a day");
})

app.get('/', function(req, res){
  models.blogs.findAll({
    order:[
      ['createdAt', 'DESCccom']
    ]
  }).then(function(posts){
    res.render('index', {
      posts: posts
    })
  })
})

app.get('/compose', function(req, res){
  res.render('compose')
})

app.get('/:id', function(req, res){
  id = req.params.id
  models.blogs.findOne({
    where: {
        id: id
    }
  }).then(function(posts){
    res.render('blogLong', {
      posts: posts,
      id: id
    })
  })
})

app.get('/:id/edit', function(req, res){
  id = req.params.id
  models.blogs.findOne({
    where: {
      id: id
    }
  }).then(function(post){
    res.render('edit', {
      title: post.title,
      postbody: post.text,
      id: post.id
    })
  })
})

app.post('/:id/delete', function(req, res){
  id = req.params.id
  models.blogs.destroy({
    where: {
      id: id
    }
  }).then(function(){
    res.redirect('/');
  })
})

app.post('/', function(req,res){
  var title = req.body.title;
  var body = req.body.postbody;
  const post = models.blogs.build({
    title: title,
    text: body
  })
  post.save().then(function(){
    res.redirect('/');
  })
  .catch(function(bigErrorObject){

    res.render('compose', {
      post: post,
      error: bigErrorObject.errors
    })
  })
})

app.post('/edit/:id', function(req, res){
  id = req.params.id;
  models.blogs.findOne({
    where: {
      id: id
    }
  }).then(function(post){
    post.title = req.body.title;
    post.text = req.body.postbody;
    post.save().then(function(){
      res.redirect('/')
    })
    .catch(function(bigErrorObject){

      res.render('edit/:id', {
        postbody: post.text,
        title: post.title,
        error: bigErrorObject.errors
      })
    })
  })
})
