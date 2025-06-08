const express = require("express");
const router = express.Router();
const leakController = require("../controllers/leakController");
const upload = require("../middlewares/upload");

router.get("/", leakController.getLeaks);
router.post("/", upload.single("photo"), leakController.createLeak);

module.exports = router;