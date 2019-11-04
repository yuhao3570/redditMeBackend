const route = require('express').Router();
const promisedQuery = require('../helperFunctions/execQuery');
const actions = {
  upvote: '+1',
  downvote: '-1'
}

route.put('/', async (req, res) => {
  let sqlString = 'UPDATE posts SET score=score' + actions[req.vote] + ' WHERE post_id=?';

  try {
    let data = await promisedQuery(sqlString, [req.postId]);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
})

module.exports = route;