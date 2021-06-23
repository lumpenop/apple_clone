const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('answer', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    question_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question_subject:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    answer_subject: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    answer_content: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    answer_id: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'answer',
    timestamps: false,
  });
};
