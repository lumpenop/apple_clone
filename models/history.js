const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('history', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name1: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    name2: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    address1: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    address2:{
      type: DataTypes.STRING(100),
      allowNull: false
    },
    addressnumber: {
      type: DataTypes.INTEGER(200),
      allowNull: true
    },
    nation: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER(100),
      allowNull: true,
    },
    item_skill1: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    item_skill2: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    item_skill3: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
      type: DataTypes.STRING(100),
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'history',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};