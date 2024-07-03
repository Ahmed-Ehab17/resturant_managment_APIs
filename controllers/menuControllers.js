const { client } = require("../config/dbConfig");
const httpStatusText = require("../utils/httpStatusText");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const sharp = require('sharp');
const cloudinary = require('../config/cloudinaryConfig');
const axios = require('axios');


const uploadItemImage = uploadSingleImage("itemImg");

const resizeItemImage = async (req, res, next) => {
  try {
    if (req.file) {
      const filename = `menu-${Date.now()}.jpeg`;

      await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 95 })
        .toBuffer();

      req.file.filename = filename;

      next();
    } 
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: `Error processing image: ${err.message}` });
  }
};

const uploadCategoryImage = uploadSingleImage("categoryImg");

const resizeImage = async (req, res, next) => {
	try {
		const filename = `category-${Date.now()}.jpeg`;
		if (req.file) {
			await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat("jpeg")
            .jpeg({ quality: 95 })
            .toBuffer();

			req.file.path = filename;
		}

		next();
	} catch (err) {
		res.status(500).json({ status: httpStatusText.ERROR, message: "Error processing image" });
	}
};

const seasonList = async (req, res) => {  
    try{
       const query = `SELECT * FROM seasons`;
       const result = await client.query(query)
       res.status(200).json({status: httpStatusText.SUCCESS, data: {seasons : result.rows}});
       }catch(err) {
       res.status(500).json({status: httpStatusText.ERROR, message: err.message});
       }
}

const sectionList = async (req, res) => {  
  try{
     const query = `SELECT * FROM sections`;
     const result = await client.query(query)
     res.status(200).json({status: httpStatusText.SUCCESS, data: {sections : result.rows}});
     }catch(err) {
     res.status(500).json({status: httpStatusText.ERROR, message: err.message});
     }
}

const orderItemSectionList = async (req, res) => {  
  try{
     const query = `SELECT * FROM order_items_sections`;
     const result = await client.query(query)
     res.status(200).json({status: httpStatusText.SUCCESS, data: result.rows});
     }catch(err) {
     res.status(500).json({status: httpStatusText.ERROR, message: err.message});
     }
}

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

const getItemRecipes = async (req, res) => {  
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


  const getItemRecommendations = async (req, res) => {
    try {
        // Extract parameters from query string and convert them to numbers if necessary
        const queryParams = { item_id: Number(req.params.item_id) };
        console.log(queryParams);

        // Send the request with the converted parameters
        const response = await axios.post('http://localhost:5002/recommend_item', queryParams, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Respond with the data received
        res.json(response.data);
    } catch (error) {
        console.error('Error during request:', error.message);
        res.status(500).json({ error: error.message });
    }
};
const getCustomerItemRecommendations = async (req, res) => {
  try {
    const queryParams = { customer_id: Number(req.params.customer_id) };
      console.log(queryParams);
      const response = await axios.post('http://localhost:5001/recommend', queryParams,  {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      res.json(response.data);
  } catch (error) {
      console.error('Error during request:', error.message);
      res.status(500).json({ error: error.message });
  }
};





const branchMenuFilter = async (req, res) => {
    const { branchId } = req.params;
    const {seasonId, itemType, categoryId, itemStatus, vegetarian, healthy} = req.query;
  
    try {
      // Base query to call the PostgreSQL function
      let query = `SELECT * FROM filter_menu_items($1`;
      let values = [branchId];
      let valueCounter = 2; 
  
      if (seasonId) {
        query += `, $${valueCounter++}`;
        values.push(seasonId);
      } else {
        query += `, NULL`;
      }
  
      if (itemType) {
        query += `, $${valueCounter++}`;
        values.push(itemType);
      } else {
        query += `, NULL`;
      }
  
      if (categoryId) {
        query += `, $${valueCounter++}`;
        values.push(categoryId);
      } else {
        query += `, NULL`;
      }
  
      if (itemStatus) {
        query += `, $${valueCounter++}`;
        values.push(itemStatus);
      } else {
        query += `, NULL`;
      }
  
      if (vegetarian) {
        query += `, $${valueCounter++}`;
        values.push(vegetarian);
      } else {
        query += `, NULL`;
      }
  
      if (healthy) {
        query += `, $${valueCounter++}`;
        values.push(healthy);
      } else {
        query += `, NULL`;
      }
  
      query += `)`;
  
      const result = await client.query(query, values);
      res.status(200).json({ status: 'success', data: result.rows });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  };


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

    res.status(200).json({ status: httpStatusText.SUCCESS, data: values });
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
  const { sectionId, categoryName, categoryDescription, picture } = req.body;
    try {
      const query = 'CALL pr_add_category($1, $2, $3, $4)';
      const values = [sectionId, categoryName, categoryDescription, picture];
      await client.query(query, values);

      res.status(200).json({status: httpStatusText.SUCCESS, data:values});
    } catch (err) {
      console.log(err);
      res.status(400).json({status: httpStatusText.ERROR, message: err.message });
    }    
};

const addRating = async (req, res) => {
  const { customerId, itemId, rating } = req.body;
  try {
    const query = `CALL p_add_rating($1, $2, $3)`;
    const values = [ customerId, itemId, rating ];
    await client.query(query, values);
    res.status(200).json({ status: httpStatusText.SUCCESS, data: {
      "customerId": customerId,
      "itemId": itemId,
      "rating": rating
    }});
  }catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
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
const changeOrderItemStatus = async(req, res) =>{
  const {orderId, customerId, itemId, newStatus } = req.body;
    try {
      const query = 'call pr_change_order_item_status($1, $2, $3, $4)';
      const values = [orderId, customerId, itemId, newStatus ];
      await client.query(query, values);

      res.status(200).json({ status: httpStatusText.SUCCESS, data:values });
    } catch (err) {
      res.status(400).json({ status: httpStatusText.ERROR, message: err.message });
    } 
}

const changeItemPicture = async (req, res) => {
  const { itemId } = req.body;

  try {
    // Fetch old item image path
    const oldItemImgResult = await client.query('SELECT picture_path FROM menu_items WHERE item_id = $1', [itemId]);
    const oldItemImg = oldItemImgResult.rows[0]?.picture_path;

    // Upload new image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'menu_items' }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
      stream.end(req.file.buffer);
    });

    const newImagePath = result.secure_url;
    console.log(newImagePath);

    // Update the database with the new image path
    const query = 'CALL change_item_picture($1, $2)';
    const values = [itemId, newImagePath];
    await client.query(query, values);

    // Delete the old image from Cloudinary, if it exists
    if (oldItemImg) {
      const publicId = oldItemImg.split('/').slice(-2).join('/').split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    res.status(200).json({ status: httpStatusText.SUCCESS, data: { itemId, newImagePath } });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const changeCategoryPicture = async (req, res) => {
  console.log('Request Body:', req.body); // Debugging line

  const { categoryId } = req.body;

  console.log('Category ID:', categoryId); // Debugging line

  try {
    // Fetch old category image path
    const oldCategoryImgResult = await client.query('SELECT picture_path FROM categories WHERE category_id = $1', [categoryId]);
    const oldCategoryImg = oldCategoryImgResult.rows[0]?.picture_path;

    // Upload new image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'categories' }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
      stream.end(req.file.buffer);
    });

    const newImagePath = result.secure_url;
    console.log(newImagePath);

    // Update the database with the new image path
    const query = 'CALL change_category_picture($1, $2)';
    const values = [categoryId, newImagePath];
    await client.query(query, values);

    // Delete the old image from Cloudinary, if it exists
    if (oldCategoryImg) {
      const publicId = oldCategoryImg.split('/').slice(-2).join('/').split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    res.status(200).json({ status: httpStatusText.SUCCESS, data: { categoryId, newImagePath } });
  } catch (err) {
    console.error(err); // Log error for debugging purposes
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};















module.exports = {
    seasonList,
    sectionList,
    orderItemSectionList,

    getItemPriceChanges,
    getItemRecipes,
    getItemRecommendations,
    getCustomerItemRecommendations,

    branchMenuFilter,
    
    addItemTimeBySeason,
    addItemTimeByTime,
    addRecipes,
    addSeason,
    addCategory,

    changeItemPrice,
    changeOrderItemStatus,
    changeItemPicture,


    addRating,
    changeCategoryPicture,



    uploadItemImage,
    resizeItemImage,
    uploadCategoryImage,
    resizeImage,
}