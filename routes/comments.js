const route = require('express').Router();
const promisedQuery = require('../helperFunctions/execQuery');
const changeVotes = require('../helperFunctions/changeVotes');

route.get('/', async (req, res) => {
  let sqlString = `SELECT * FROM comments WHERE post_id=?`;
  try{
    let data = await promisedQuery(sqlString, [req.postId]);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
})

route.post('/', async (req, res) => {
  let sqlString = `INSERT INTO comments(content, owner_id, post_id) values (?, ?, ?)`;
  const {content, owner_id} = req.body;
  try{
    let data = await promisedQuery(sqlString, [content, owner_id, req.postId]);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
})

route.put('/:commentId/:vote', async (req, res) => {
  try {
    await changeVotes(req.params.commentId, 'comment', req.params.vote, res, 'comments')
  } catch (error) {
    console.log(error);
  }
})

module.exports = route;