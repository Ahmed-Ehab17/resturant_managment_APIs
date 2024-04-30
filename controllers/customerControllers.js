const { client } = require("../config/dbConfig");
const httpStatusText = require("../utils/httpStatusText");

const getCustomerAddresses = async (req, res) => {  
    const customerId  = req.params.customerId
      try{
         const query = `SELECT * FROM fn_get_customer_addresses($1)`;
         const values =  [customerId];
         const result = await client.query(query, values)
         res.status(200).json({status: httpStatusText.SUCCESS, data: {attendance: result.rows}});
         }catch(err) {
         res.status(500).json({status: httpStatusText.ERROR, message: err.message});
         }
  }
const getCustomerInformation = async (req, res) => {  
    const customerId  = req.params.customerId
      try{
         const query = `SELECT * FROM fn_get_customer_info($1)`;
         const values =  [customerId];
         const result = await client.query(query, values)
         res.status(200).json({status: httpStatusText.SUCCESS, data: {attendance: result.rows}});
         }catch(err) {
         res.status(500).json({status: httpStatusText.ERROR, message: err.message});
         }
  }
const getCustomerPhones = async (req, res) => {  
    const customerId  = req.params.customerId
      try{
         const query = `SELECT * FROM fn_get_customer_phones($1)`;
         const values =  [customerId];
         const result = await client.query(query, values)
         res.status(200).json({status: httpStatusText.SUCCESS, data: {attendance: result.rows}});
         }catch(err) {
         res.status(500).json({status: httpStatusText.ERROR, message: err.message});
         }
  }
const getFriendRequests = async (req, res) => {  
    const accountId  = req.params.accountId
      try{
         const query = `SELECT * FROM fn_get_friend_requests($1)`;
         const values =  [accountId];
         const result = await client.query(query, values)
         res.status(200).json({status: httpStatusText.SUCCESS, data: {attendance: result.rows}});
         }catch(err) {
         res.status(500).json({status: httpStatusText.ERROR, message: err.message});
         }
  }
const getFriendsList = async (req, res) => {  
    const accountId  = req.params.accountId
      try{
         const query = `SELECT * FROM fn_get_friends_list($1)`;
         const values =  [accountId];
         const result = await client.query(query, values)
         res.status(200).json({status: httpStatusText.SUCCESS, data: {attendance: result.rows}});
         }catch(err) {
         res.status(500).json({status: httpStatusText.ERROR, message: err.message});
         }
  }















  module.exports = {
    getCustomerAddresses,
    getCustomerInformation,
    getCustomerPhones,
    getFriendRequests,
    getFriendsList,
  }