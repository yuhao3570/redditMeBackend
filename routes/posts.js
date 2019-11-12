const route = require('express').Router();
const promisedQuery = require('../helperFunctions/execQuery');
const changeVotes = require('../helperFunctions/changeVotes');
const getOwner = require('../helperFunctions/getOwner');

route.get('/', async (req, res) => {
  try {
    let data = await promisedQuery('SELECT * FROM posts;');
    res.json(data);
  } catch (error) {
    res.status(500).send(error);
  }
})

route.post('/', async (req, res) => {
  let sqlString = `INSERT INTO posts(ownerName, title, created, lastUpdated, postUrl) values (?, ?, ?, ?, ?);`;
  const {ownerName, title, url} = req.body;
  const currentTime =  Math.floor(Date.now() / 60000);
  let queryInput = [ownerName, title, currentTime, currentTime, url];

  try {
    let insertionResult = await promisedQuery(sqlString, queryInput);
    const inserted = await promisedQuery(`SELECT * FROM posts WHERE postId=?`, [insertionResult.insertId]);
    res.json(inserted[0]);
  } catch (error) {
    res.status(500).send(error);
  }
})

route.put('/:postId', async (req, res) => {
  let updateQuery = `UPDATE posts SET title=?, postUrl=?, lastUpdated=? WHERE postId=?`;
  let selectQuery = `SELECT title, postUrl, lastUpdated FROM posts WHERE postId=?`;
  
  const currentTime =  Math.floor(Date.now() / 60000);
  const {owner, title, url} = req.body;
  let queryInput = [title, url, currentTime, req.params.postId];

  try {
    let ownerOfPost = await getOwner(req.params.postId);
    console.log('postowner', ownerOfPost);
    if(owner === ownerOfPost){
      console.log(ownerOfPost);
      await promisedQuery(updateQuery, queryInput);
      const postUpdated = await promisedQuery(selectQuery, [req.params.postId]);
      res.json(postUpdated[0]);
    }else{
      res.status(403).send("Access Deines: Only the post owner can update a post.");
    }
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