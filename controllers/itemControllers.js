const { client } = require("../config/dbConfig");
const httpStatusText = require("../utils/httpStatusText");

// const getItemPriceChanges = async (req, res) => {  
//     const itemId  = req.params.itemId
//       try{
//          const query = `SELECT * FROM fn_get_item_price_changes($1)`;
//          const values =  [itemId];
//          const result = await client.query(query, values)
//          res.status(200).json({status: httpStatusText.SUCCESS, data: {attendance: result.rows}});
//          }catch(err) {
//          res.status(500).json({status: httpStatusText.ERROR, message: err.message});
//          }
//   }
const getItemPriceRecipes = async (req, res) => {  
    const itemId  = req.params.itemId
      try{
         const query = `SELECT * FROM fn_get_item_recipes($1)`;
         const values =  [itemId];
         const result = await client.query(query, values)
         res.status(200).json({status: httpStatusText.SUCCESS, data: {attendance: result.rows}});
         }catch(err) {
         res.status(500).json({status: httpStatusText.ERROR, message: err.message});
         }
  }























module.exports = {
    //getItemPriceChanges,
    getItemPriceRecipes,
}