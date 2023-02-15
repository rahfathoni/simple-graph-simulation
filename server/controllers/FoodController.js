const { Food } = require("../models/index");

class FoodController {
  // router.post("/", FoodController.addFood);
  static addFood(req, res, next) {
    const { name, amount, price } = req.body;
    const input = {
      name: name ? name.toUpperCase() : name,
      amount,
      price,
    };
    Food.create(input)
      .then((data) => {
        res.status(201).json({
          id: data.id,
          name: data.name,
          amount: data.amount,
          price: data.price,
          createdAt: data.createdAt,
        });
      })
      .catch((err) => {
        return next(err);
      });
  }

  // router.get("/", FoodController.readFood);
  static readFood(req, res, next) {
    const options = {
      attributes: { exclude: ["updatedAt"] },
      order: [["createdAt", "ASC"]],
    };
    Food.findAll(options)
      .then((data) => {
        res.status(200).json({
          list: data,
        });
      })
      .catch((err) => {
        return next(err);
      });
  }

  // router.delete("/:foodId", FoodController.deleteFood);
  static deleteFood(req, res, next) {
    const { foodId } = req.params;
    const optionsFind = {
      where: {
        id: Number(foodId),
      },
    };
    const optionsDelete = {
      where: {
        id: Number(foodId),
      },
      returning: true,
    };
    Food.findOne(optionsFind)
      .then((data) => {
        if (!data) {
          return next({
            name: "BadRequest",
            errors: [
              {
                message: `Food with id ${foodId} not Found`,
              },
            ],
          });
        } else {
          Food.destroy(optionsDelete).then((_) => {
            return res.status(200).json({
              message: `Food with id ${foodId} delete`,
            });
          });
        }
      })
      .catch((err) => {
        return next(err);
      });
  }
}

module.exports = FoodController;
