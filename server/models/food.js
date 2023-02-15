"use strict";
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Food extends Model {}

  Food.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Name must be filled`,
          },
        },
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [1],
            msg: "Minimum amount is 1",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: `Price must be equal to or more than 0`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Food",
      tableName: "Foods",
    }
  );
  Food.associate = function (models) {
    // associations can be defined here
  };
  return Food;
};
