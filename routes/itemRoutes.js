const express = require("express");
const router = express.Router();
const itemControllers = require('../controllers/itemControllers');

//router.get('/itemPriceChanges/:itemId', itemControllers.getItemPriceChanges);
router.get('/itemPriceRecipes/:itemId', itemControllers.getItemPriceRecipes);


















module.exports = router;
