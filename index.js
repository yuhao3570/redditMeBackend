const express = require('express');
const PORT = process.env.PORT || 8080;
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// GET, POST, PUT, DELETE post
app.use('/posts', require('./routes/posts'));

// upvote / downvote posts
app.use('/posts/:postId/:vote', (req, res, next) => {
  req.postId = req.params.postId;
  req.vote = req.params.vote;
  next();
}, require('./routes/votes'));

// GET, POST, PUT comments
app.use('/posts/:postId/comments', (req, res, next) => {
  req.postId = req.params.postId;
  next();
}, require('./routes/comments'));

app.use('/posts/:postId/comments/:vote', require('./routes/votes'));
app.use('/posts/:postId/comments/downvote', require('./routes/votes'));

app.listen(PORT, () =>{
  console.log('listening at port: ', PORT);
})