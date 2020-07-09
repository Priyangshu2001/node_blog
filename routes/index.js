const express = require('express');
const router = express.Router();
const Post=require('../models/Post')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', async(req, res) => {
  const posts = await Post.find().sort({ "_id" : -1})
  res.render('welcome',{ posts: posts});
})
router.get('/contact', ensureAuthenticated, (req, res) =>
  res.render('contact')
);
// Dashboard
router.get('/post', ensureAuthenticated, (req, res) =>
  res.render('addi', {
    user: req.user
  })
);
router.post('/posts/store', (req, res) => {
  console.log(req.body)
  Post.create(req.body, (error, post) => {
      res.redirect('/')
  })
});

router.get('/update/:id', async (req, res) =>{
  const post = await Post.findById(req.params.id)
    res.render('view', { post: post })
});

router.get('/update/:id/new', async (req, res) =>{
  const post = await Post.findById(req.params.id)
    res.render('updatei', { post: post })
});
  router.post('/update/:id/new/store',function(req, res, next){
    console.log(req.body)
      Post.findById(req.params.id, function (err, post) {
        if (!post) {
          req.flash('error', 'No post found');
          return res.redirect('/');
      }

      var subject = req.body.subject;
      var message = req.body.message;

      post.subject = subject;
      post.message = message;

      post.save((err) => {

          res.redirect('/');
      });
  });
});

router.get('/delete/:id',(req, res) => {
  Post.findOneAndDelete({_id: req.params.id}, (err, docs) => {
    if(err) res.json(err);
    else {
      res.redirect('/');
    }
  });
});


router.get('/addi', (req, res) =>
  res.render('addi', {
    user: req.user
  })
);

module.exports = router;
