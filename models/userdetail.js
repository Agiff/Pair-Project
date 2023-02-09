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

    get formatYear() {
      const test = JSON.stringify(this.birthDate).split('T')[0].slice(1);
      console.log(test);
      return JSON.stringify(this.birthDate).split('T')[0].slice(1);
    }
  }
  UserDetail.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
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