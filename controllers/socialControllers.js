const { client } = require("../config/dbConfig");
const httpStatusText = require("../utils/httpStatusText");

const getFriendRequests = async(req, res) =>{

    const accountId =  req.params.accountId;

    try {
      const query = `SELECT * FROM fn_get_friend_requests(${accountId})`;
      const result = await client.query(query);

      res.status(200).json({ status: httpStatusText.SUCCESS, data:{requests: result.rows} });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: httpStatusText.ERROR, message:error.message });
    }
  ;
}








module.exports = {
    getFriendRequests,
    
}