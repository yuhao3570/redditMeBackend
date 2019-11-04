const route = require('express').Router();
const promisedQuery = require('../helperFunctions/execQuery');

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

module.exports = route;