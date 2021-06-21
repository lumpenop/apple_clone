const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('skills', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    skill_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    iframe_number:{
      type: DataTypes.INTEGER(100),
      allowNull: false,
    },
    iframe_name:{
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    skill_iframe: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'skills',
    timestamps: false,
    indexes: [
    ]
  });
};
