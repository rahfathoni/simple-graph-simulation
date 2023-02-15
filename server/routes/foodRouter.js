const express = require("express");
const router = express.Router();
const FoodController = require("../controllers/FoodController");

router.post("/", FoodController.addFood);
router.get("/", FoodController.readFood);
router.delete("/:foodId", FoodController.deleteFood);

module.exports = router;
