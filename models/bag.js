const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bag', {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    users_name: {
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
    maximum_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'bag',
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
