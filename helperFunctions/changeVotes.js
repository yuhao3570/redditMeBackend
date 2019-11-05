const promisedQuery = require('./execQuery');
const actions = {
  upvote: '+1',
  downvote: '-1'
}

module.exports = async function changeVotes(targetId, targetType, vote, res, table){
  let sqlString = `UPDATE ${table} SET score=score${actions[vote]} WHERE ${targetType}_id=?`;
  try {
    let data = await promisedQuery(sqlString, [targetId]);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

