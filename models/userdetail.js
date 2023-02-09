'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserDetail.belongsTo(models.User)
    }

    get age() {
      return new Date().getFullYear() - this.birthDate.getFullYear();
    }
  }
  UserDetail.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First Name cannot be null'
        },
        notEmpty: {
          msg: 'First Name cannot be empty'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Last Name cannot be null'
        },
        notEmpty: {
          msg: 'Last Name cannot be empty'
        }
      }
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Date of Birth cannot be null'
        },
        notEmpty: {
          msg: 'Date of Birth cannot be empty'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Phone Number cannot be null'
        },
        notEmpty: {
          msg: 'Phone Number cannot be empty'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Address cannot be null'
        },
        notEmpty: {
          msg: 'Address cannot be empty'
        }
      }
    },
    balance: DataTypes.BIGINT,
    UserId: DataTypes.INTEGER,
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserDetail',
  });
  UserDetail.beforeCreate((instance, option) => {
    instance.picture = 'http://dummyimage.com/50x50.png/cc0000/ffffff';
    instance.balance = 0;
  })
  return UserDetail;
};