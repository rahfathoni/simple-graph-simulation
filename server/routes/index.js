const express = require("express");
const router = express.Router();
const foodRouter = require("./foodRouter");

router.get("/", (req, res) => {
  res.status(200).json({
    message: `simple simulation working`,
  });
});
router.use("/food", foodRouter);

module.exports = router;
