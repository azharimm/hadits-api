const express = require("express");
const router = express.Router();
const haditsController = require("../controllers/haditsController");

router.get("/", haditsController.index);
router.get("/range/:book", haditsController.range);
router.get("/:book", haditsController.show);
router.get("/:book/:number", haditsController.detail);

module.exports = router;
