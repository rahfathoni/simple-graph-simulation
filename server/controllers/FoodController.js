const { Food } = require("../models/index");

const formatingDate = (item) => {
  const date = new Date(item);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

class FoodController {
  // router.post("/", FoodController.addFood);
  static addFood(req, res, next) {
    const { name, amount, price, createdAt } = req.body;
    const input = {
      name: name ? name.toUpperCase() : name,
      amount,
      price,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
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
        if (!data || data.length === 0) {
          return res.status(200).json({
            list: [],
          });
        }
        const newData = data.map((x) => ({
          name: x.name,
          amount: x.amount,
          price: x.price,
          createdAt: x.createdAt,
          date: formatingDate(x.createdAt),
        }));
        res.status(200).json({
          list: newData,
        });
      })
      .catch((err) => {
        return next(err);
      });
  }

  // router.get("/search", FoodController.readFoodByName);
  static readFoodByName(req, res, next) {
    const { name } = req.body;
    const options = {
      where: {
        name: name ? name.toUpperCase() : name,
      },
      order: [["createdAt", "ASC"]],
    };
    Food.findAll(options)
      .then((data) => {
        if (!data || data.length === 0) {
          return res.status(200).json({
            name: "",
            list: [],
          });
        }
        const newData = data.map((x) => ({
          name: x.name,
          amount: x.amount,
          price: x.price,
          createdAt: x.createdAt,
          date: formatingDate(x.createdAt),
        }));
        const mapping = newData.reduce((map, item) => {
          let date = item.date;
          let amount = +item.amount;
          map[date] = (map[date] || 0) + amount;
          return map;
        }, {});
        const result = Object.keys(mapping).map((date) => {
          return {
            date: date,
            totalAmount: mapping[date],
          };
        });
        res.status(200).json({
          name: data[0].name,
          list: result,
        });
      })
      .catch((err) => {
        return next(err);
      });
  }

  // router.get("/list", FoodController.readList);
  static readList(req, res, next) {
    const options = {
      attributes: { include: ["name"] },
      order: [["createdAt", "ASC"]],
    };
    Food.findAll(options)
      .then((data) => {
        if (!data || data.length === 0) {
          return res.status(200).json({
            list: [],
          });
        }
        const uniqueName = [...new Set(data.map((item) => item.name))];
        res.status(200).json({
          list: uniqueName,
        });
      })
      .catch((err) => {
        return next(err);
      });
  }

  // router.get("/total", FoodController.readTotal);
  static readTotal(req, res, next) {
    const options = {
      attributes: { include: ["name"] },
      order: [["createdAt", "ASC"]],
    };
    Food.findAll(options)
      .then((data) => {
        if (!data || data.length === 0) {
          return res.status(200).json({
            list: [],
          });
        }
        const mapping = data.reduce((map, item) => {
          let name = item.name;
          let amount = +item.amount;
          map[name] = (map[name] || 0) + amount;
          return map;
        }, {});
        const newData = Object.keys(mapping).map((name) => {
          return {
            food: name,
            totalAmount: mapping[name],
          };
        });
        res.status(200).json({
          list: newData,
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
