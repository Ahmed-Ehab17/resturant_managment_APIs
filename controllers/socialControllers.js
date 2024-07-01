const { query } = require("express");
const { client } = require("../config/dbConfig");
const httpStatusText = require("../utils/httpStatusText");

const getFriendRequests = async (req, res) => {
    const accountId = req.params.accountId;

    try {
        const query = `SELECT * FROM fn_get_friend_requests(${accountId})`;
        const result = await client.query(query);

        res.status(200).json({ status: httpStatusText.SUCCESS, data: { requests: result.rows } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: httpStatusText.ERROR, message: error.message });
    }
};

const addFriendRequests = async (req, res) => {
    const { senderId, receiverId } = req.body;

    try {
        const query = `CALL pr_add_friend_request( $1, $2 )`;
        const values = [senderId, receiverId];
        await client.query(query, values);

        res.status(200).json({ status: httpStatusText.SUCCESS, data: {senderId, receiverId} });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
};

const updateFriendRequest = async (req, res) => {
    const { requestId, requestStatus } = req.params
    try {
        const query = `CALL pr_update_friend_request($1, $2)`;
        const values = [ requestId, requestStatus ];
        await client.query(query, values);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: values });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
};

const getFriendsList = async(req, res) => {
    const { accountId } = req.params
    console.log( accountId);
    try{
        const query = `SELECT fn_get_friends_list($1)`;
        const values = [accountId];
        const result = await client.query(query, values);
        console.log({'Resulttt':result});
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { friends : result.rows } });
    }catch(err){
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
};

const getFriendsFavoriteItem = async(req, res) => {
    const { customerId } = req.params
    try{
        const query = `SELECT get_friends_favorite_items($1)`;
        const values = [customerId];
        const result = await client.query(query, values);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { favoriteItems : result.rows } });
    }catch(err){
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
};

const getAccountByPhone = async (req, res) => {
    const phone = req.params.phone;
  
    try {
      const query = `SELECT * FROM get_account_id_by_phone($1)`;
      const values = [phone];
      const result = await client.query(query, values);
      res.status(200).json({status: httpStatusText.SUCCESS, data: result.rows });
    } catch (err) {
      res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
  };

module.exports = {
    getFriendRequests,
    addFriendRequests,
    updateFriendRequest,
    getFriendsList,
    getFriendsFavoriteItem,
    getAccountByPhone

};
