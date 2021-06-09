const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('valuation', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    value_subject: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "item_serial_number"
    },
    userid: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    value_content: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'valuation',
    timestamps: false,
  });
};
