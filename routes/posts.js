const route = require('express').Router();
const promisedQuery = require('../helperFunctions/execQuery');

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
  const {id, title, url} = req.body;
  const currentTime =  Math.floor(Date.now() / 60000);
  let queryInput = [id, title, currentTime, url];

  try {
    let data = await promisedQuery(sqlString, queryInput);
    res.json(data);
  } catch (error) {
    res.status(500).send(error);
  }
})

route.put('/:postId', async (req, res) => {
  let sqlString = `UPDATE posts SET title=?, url=? WHERE post_id=?`;
  const {title, url} = req.body;
  let queryInput = [title, url, req.params.postId];

  try {
    let data = await promisedQuery(sqlString, queryInput);
    res.json(data);
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

module.exports = route;