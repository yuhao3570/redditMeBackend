const express = require('express');
const PORT = process.env.PORT || 8080;
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// GET, POST, PUT, DELETE post
// upvote / downvote posts
app.use('/posts', require('./routes/posts'));

// GET, POST, PUT comments and votes
app.use('/posts/:postId/comments', (req, res, next) => {
  req.postId = req.params.postId;
  next();
}, require('./routes/comments'));

app.listen(PORT, () =>{
  console.log('listening at port: ', PORT);
})