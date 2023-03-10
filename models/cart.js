'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User)
      Cart.hasMany(models.CartProduct)
      Cart.belongsToMany(models.Product, {
        through: 'CartProduct', 
        foreignKey: 'CartId'
      })
    }

    static getAllRelation(userId, Product, User, UserDetail){
     return Cart.findOne({where: {UserId:+userId}, include:[{model:Product, order:[['name']]}, {model:User, include:{model:UserDetail}}]})
    }
  }
  Cart.init({
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};