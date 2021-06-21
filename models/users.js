const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userid: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "userid"
    },
    userpw: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    userbirth:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    register_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('curdate')
    },
    admin: {
      type: DataTypes.INTEGER(100),
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
  });
};
