const express = require("express");
const router = express.Router();
const menuControllers = require('../controllers/menuControllers');
const menuValidator = require("../utils/validators/menuValidator");

router.get('/itemPriceChanges/:itemId', menuControllers.getItemPriceChanges);
router.get('/itemPriceRecipes/:itemId', menuControllers.getItemPriceRecipes);



router.post('/itemBySeason', menuControllers.addItemTimeBySeason);
router.post('/itemByTime', menuControllers.addItemTimeByTime);
router.post('/recipe', menuValidator.addRecipes, menuControllers.addRecipes);
router.post('/season', menuControllers.addSeason);
router.post('/category',menuValidator.addCategory, menuControllers.addCategory);
router.post('/addRating', menuControllers.addRating);


router.patch('/change-item-price', menuControllers.changeItemPrice );















module.exports = router;
