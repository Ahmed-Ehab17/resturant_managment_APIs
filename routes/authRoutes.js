const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController")


router.post('/login', authController.login)
router.post('/register', authController.register)

router.get("/dashboard", (req, res) => {
    res.status(200).sendFile("admin.html", { root: "../admin/Downloaded Web Sites/efood-admin.6amtech.com" });
});
module.exports = router;