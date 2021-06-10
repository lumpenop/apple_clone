'use strict';

const Sequelize = require('sequelize');
const initModels = require('./init-models');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

let models = initModels(sequelize);
console.log(models);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.users = models.users;
db.items = models.items;
db.valuation = models.valuation;
db.buy = models.buy; 
db.bag = models.bag;
db.history = models.history;

module.exports = db;
