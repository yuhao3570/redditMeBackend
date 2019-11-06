const route = require('express').Router();
const promisedQuery = require('../helperFunctions/execQuery');
const changeVotes = require('../helperFunctions/changeVotes');

route.get('/', async (req, res) => {
  try {
    let data = await promisedQuery('SELECT * FROM posts;');
    res.json(data);
  } catch (error) {
    res.status(500).send(error);
  }
})

route.post('/', async (req, res) => {
  let sqlString = `INSERT INTO posts(owner_id, title, timeUpdated, url) values (?, ?, ?, ?);`;
  const {user_id, title, url} = req.body;
  const currentTime =  Math.floor(Date.now() / 60000);
  let queryInput = [1, title, currentTime, url];

  try {
    let insertionResult = await promisedQuery(sqlString, queryInput);
    const inserted = await promisedQuery(`SELECT * FROM posts WHERE post_id=?`, [insertionResult.insertId]);
    res.json(inserted[0]);
  } catch (error) {
    res.status(500).send(error);
  }
})

route.put('/:postId', async (req, res) => {
  let updateQuery = `UPDATE posts SET title=?, url=? WHERE post_id=?`;
  let selectQuery = `SELECT * FROM posts WHERE post_id=?`;
  
  const {title, url} = req.body;
  let queryInput = [title, url, req.params.postId];

  try {
    await promisedQuery(updateQuery, queryInput);
    const postUpdated = await promisedQuery(selectQuery, [req.params.postId]);
    res.json(postUpdated[0]);
  } catch (error) {
    res.status(500).send(error);
  }
})

route.delete('/:postId', async (req, res) => {
  let sqlString = `DELETE FROM posts WHERE post_id=?`;
  let queryInput = [req.params.postId];

  try {
    let data = await promisedQuery(sqlString, queryInput);
    res.json(data);
  } catch (error) {
    res.status(500).send(error);
  }
})

route.put('/:postId/:vote', async (req, res) => {
  try {
    await changeVotes(req.params.postId, 'post', req.params.vote, res, 'posts');
  } catch (error) {
    console.log(error);
  }
})

module.exports = route;