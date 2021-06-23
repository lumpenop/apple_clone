const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('question', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    question_subject: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "item_serial_number"
    },
    question_content: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    question_id: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'question',
    timestamps: false,
  });
};
