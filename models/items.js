const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('items', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    item_serial_number: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "item_serial_number"
    },
    item_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    item_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item_image: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    item_category: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    item_skill1: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    item_skill2: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    item_skill3: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    maximum_number:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item_tag: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'items',
    timestamps: false,
    indexes: [
    ]
  });
};
