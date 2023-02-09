'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Transaction)
      Product.belongsTo(models.Category)
      Product.belongsToMany(models.User, {
        through: models.Transaction,
        foreignKey: 'ProductId'
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    brand: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};