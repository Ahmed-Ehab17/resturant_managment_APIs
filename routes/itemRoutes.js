const express = require("express");
const router = express.Router();
const itemControllers = require('../controllers/itemControllers');
const itemValidator = require("../utils/validators/itemValidator");

router.get('/itemPriceChanges/:itemId', itemControllers.getItemPriceChanges);
router.get('/itemPriceRecipes/:itemId', itemControllers.getItemPriceRecipes);



router.post('/itemBySeason', itemControllers.addItemTimeBySeason)
router.post('/itemByTime', itemControllers.addItemTimeByTime)
router.post('/recipe', itemValidator.addRecipes, itemControllers.addRecipes)
router.post('/season', itemControllers.addSeason)














module.exports = router;
