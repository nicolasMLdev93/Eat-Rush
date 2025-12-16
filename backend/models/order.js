'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    totalAmount: DataTypes.FLOAT,
    status: DataTypes.STRING,
    deliveryAddress: DataTypes.STRING,
    deliveryNotes: DataTypes.TEXT,
    paymentMethod: DataTypes.STRING,
    paymentStatus: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};