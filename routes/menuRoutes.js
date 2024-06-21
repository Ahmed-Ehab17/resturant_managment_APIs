const express = require("express");
const router = express.Router();
const menuControllers = require('../controllers/menuControllers');
const menuValidator = require("../utils/validators/menuValidator");


router.get('/seasonsList', menuControllers.seasonList);
router.get('/sectionsList', menuControllers.sectionList);
router.get('/orderItemsList', menuControllers.orderItemSectionList);


router.get('/itemPriceChanges/:itemId', menuControllers.getItemPriceChanges);
router.get('/itemPriceRecipes/:itemId', menuControllers.getItemPriceRecipes);
router.get('/itemRecipes/:itemId', menuControllers.getItemPriceRecipes);
router.get('/branchMenuFilter/:branchId/:seasonId?/:itemType?/:categoryId?/:itemStatus?/:vegetarian?/:healthy?', menuControllers.branchMenuFilter);
router.get('/getBranchMenuByTimeAndSeason/:branchId/:timeType/:seasonId', menuControllers.getItemPriceRecipes);



router.post('/itemBySeason', menuControllers.addItemTimeBySeason);
router.post('/itemByTime', menuControllers.addItemTimeByTime);
router.post('/recipe', menuValidator.addRecipes, menuControllers.addRecipes);
router.post('/season', menuControllers.addSeason);
router.post('/category',menuValidator.addCategory, menuControllers.addCategory);
router.post('/addRating', menuControllers.addRating);


router.patch('/change-item-price', menuControllers.changeItemPrice );
router.patch('/changeOrderItemStatus', menuControllers.changeOrderItemStatus );















module.exports = router;
