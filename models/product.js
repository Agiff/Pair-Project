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
      Product.belongsTo(models.Category)
      Product.hasMany(models.Transaction)
      Product.hasMany(models.CartProduct)
      Product.belongsToMany(models.Cart, {
        through: 'CartProduct',
        foreignKey: 'ProductId'
      })
      Product.belongsToMany(models.User, {
        through: 'Transaction',
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