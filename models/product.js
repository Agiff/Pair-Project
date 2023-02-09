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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name cannot be null'
        },
        notEmpty: {
          msg: 'Name cannot be empty'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description cannot be null'
        },
        notEmpty: {
          msg: 'Description cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price cannot be null'
        },
        notEmpty: {
          msg: 'Price cannot be empty'
        },
        min: {
          args: 1,
          msg: 'Price must be greater than 0'
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Image cannot be null'
        },
        notEmpty: {
          msg: 'Image cannot be empty'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Stock cannot be null'
        },
        notEmpty: {
          msg: 'Stock cannot be empty'
        },
        min: {
          args: 1,
          msg: 'Stock must be greater than 0'
        }
      }
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Brand cannot be null'
        },
        notEmpty: {
          msg: 'Brand cannot be empty'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};