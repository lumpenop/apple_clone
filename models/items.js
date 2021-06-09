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
    item_size: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item_color: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    item_capacity: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'items',
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
      {
        name: "item_serial_number",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "item_serial_number" },
        ]
      },
    ]
  });
};
