const promisedQuery = require('../helperFunctions/execQuery');

module.exports = getOwner = (postId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let getOwnerQuery = `SELECT ownerName FROM posts WHERE postId=?`;
      let ownerOfPost = await promisedQuery(getOwnerQuery, [postId]);
      resolve(ownerOfPost[0].ownerName);
    } catch (error) {
      reject(error);
    }
  }
  )
}


// route.put('/:postId', async (req, res) => {
//   let updateQuery = `UPDATE posts SET title=?, postUrl=?, lastUpdated=? WHERE postId=?`;
//   let selectQuery = `SELECT * FROM posts WHERE postId=?`;
  
//   const currentTime =  Math.floor(Date.now() / 60000);
//   const {owner, title, url} = req.body;
//   let queryInput = [title, url, currentTime, req.params.postId];

//   try {
//     let getOwnerQuery = `SELECT ownerName FROM posts WHERE postId=?`;
//     let ownerOfPost = await promisedQuery(getOwnerQuery, [req.params.postId])
//     console.log('postowner', ownerOfPost)
//     if(owner === ownerOfPost[0].ownerName){
//       await promisedQuery(updateQuery, queryInput);
//       const postUpdated = await promisedQuery(selectQuery, [req.params.postId]);
//       res.json(postUpdated[0]);
//     }else{
//       res.status(403).send("Access Deines: Only the post owner can update a post.");
//     }
//   } catch (error) {

//     res.status(500).send(error);
//   }
// })