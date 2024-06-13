const { client } = require("../config/dbConfig");
const httpStatusText = require("../utils/httpStatusText");

const getItemPriceChanges = async (req, res) => {  
    const itemId  = req.params.itemId
      try{
         const query = `SELECT * FROM fn_get_item_price_changes($1)`;
         const values =  [itemId];
         const result = await client.query(query, values)
         res.status(200).json({status: httpStatusText.SUCCESS, data: {priceChanges : result.rows}});
         }catch(err) {
         res.status(500).json({status: httpStatusText.ERROR, message: err.message});
         }
  }
const getItemPriceRecipes = async (req, res) => {  
    const itemId  = req.params.itemId
      try{
         const query = `SELECT * FROM fn_get_item_recipes($1)`;
         const values =  [itemId];
         const result = await client.query(query, values)
         res.status(200).json({status: httpStatusText.SUCCESS, data: {priceRecipes: result.rows}});
         }catch(err) {
         res.status(500).json({status: httpStatusText.ERROR, message: err.message});
         }
  }



const addItemTimeBySeason = async(req, res) => {
  const {itemId, seasonId} = req.body;
  console.log(req.body);
  try {
    const query = `SELECT fn_add_item_season($1, $2)`;
    const values = [itemId, seasonId];
    await client.query(query,values);

    res.status(200).json({status: httpStatusText.SUCCESS, data: {values}});
  } catch(err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    console.log(err)
  }
}
const addItemTimeByTime = async(req, res) => {
  const {itemId, itemDayType} = req.body;
  console.log(req.body)
  try {
    const query = `SELECT fn_add_item_time($1, $2)`;
    const values = [itemId, itemDayType];
    await client.query(query,values);

    res.status(200).json({status: httpStatusText.SUCCESS, data: {values}});
  } catch(err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    console.log(err)
  }
}
const addRecipes = async (req, res) => {
  const { itemId, ingredientId, quantity, recipeStatus } = req.body;
  try {
    const query = "CALL pr_add_recipes($1, $2, $3, $4)";
    const values = [itemId, ingredientId, quantity, recipeStatus];
    await client.query(query, values);

    res.status(200).json({ status: "SUCCESS", data: values });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }

}
const addSeason = async (req, res) => {
  const { seasonName, seasonDesc } = req.body;
  try{
    const query = `SELECT fn_add_season($1, $2)`;
    const values = [ seasonName, seasonDesc ];
    await client.query(query, values);
    res.status(200).json({ status: httpStatusText.SUCCESS, data: values });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
}

const addCategory = async (req, res) => {
  const { sectionId, categoryName, categoryDescription } = req.body;
    try {
      const query = 'CALL pr_add_category($1, $2, $3)';
      const values = [sectionId, categoryName, categoryDescription];
      await client.query(query, values);

      res.status(200).json({status: httpStatusText.SUCCESS, message: 'Category added successfully', data:values});
    } catch (err) {
      console.log(err);
      res.status(400).json({status: httpStatusText.ERROR, message: err.message });
    }    
};


const changeItemPrice = async(req, res) =>{
  const {itemId, branchId, changer, changeType, newValue } = req.body;
    try {
      const query = 'call pr_change_item_price($1, $2, $3, $4, $5)';
      const values = [itemId, branchId, changer, changeType, newValue];
      await client.query(query, values);

      res.status(200).json({ status: httpStatusText.SUCCESS, data:values });
    } catch (err) {
      res.status(400).json({ status: httpStatusText.ERROR, message: err.message });
    } 
}


















module.exports = {
    getItemPriceChanges,
    getItemPriceRecipes,
    addItemTimeBySeason,
    addItemTimeByTime,
    addRecipes,
    addSeason,
    addCategory,
    changeItemPrice,
}