const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buy', {
    buying_userid: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: 'users',
        key: 'userid'
      }
    },
    buying_item_serial_number: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: 'items',
        key: 'item_serial_number'
      }
    }
  }, {
    sequelize,
    tableName: 'buy',
    timestamps: false,
    indexes: [
      {
        name: "buying_id",
        using: "BTREE",
        fields: [
          { name: "buying_userid" },
        ]
      },
      {
        name: "buying_serial",
        using: "BTREE",
        fields: [
          { name: "buying_item_serial_number" },
        ]
      },
    ]
  });
};
