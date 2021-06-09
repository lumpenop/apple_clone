var DataTypes = require("sequelize").DataTypes;
var _buy = require("./buy");
var _items = require("./items");
var _users = require("./users");
<<<<<<< HEAD
var _valuation = require("./valuation");
=======
var _bag = require("./bag");
>>>>>>> 1f57ea2246185a45f7803174e414bd57552baaef

function initModels(sequelize) {
  var buy = _buy(sequelize, DataTypes);
  var items = _items(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
<<<<<<< HEAD
  var valuation = _valuation(sequelize, DataTypes);
=======
  var bag = _bag(sequelize, DataTypes);
>>>>>>> 1f57ea2246185a45f7803174e414bd57552baaef

  buy.belongsTo(items, { as: "buying_item_serial_number_item", foreignKey: "buying_item_serial_number"});
  items.hasMany(buy, { as: "buys", foreignKey: "buying_item_serial_number"});
  buy.belongsTo(users, { as: "buying_user", foreignKey: "buying_userid"});
  users.hasMany(buy, { as: "buys", foreignKey: "buying_userid"});

  buy.removeAttribute('id');

  return {
    buy,
    items,
    users,
<<<<<<< HEAD
    valuation,
=======
    bag
>>>>>>> 1f57ea2246185a45f7803174e414bd57552baaef
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
