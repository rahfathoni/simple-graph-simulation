const express = require("express");
const router = express.Router();
const FoodController = require("../controllers/FoodController");

router.post("/", FoodController.addFood);
router.delete("/:foodId", FoodController.deleteFood);
router.get("/", FoodController.readFood);
router.get("/search", FoodController.readFoodByName);
router.get("/list", FoodController.readList);
router.get("/total", FoodController.readTotal);

module.exports = router;
