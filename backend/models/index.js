const sequelize = require("./db");
const Sequelize = require("sequelize");
const SUser = require("./User.models");
const SRole = require("./Role.model");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.SUsers = SUser;
db.SRoles = SRole;

// Association
db.SUsers.belongsToMany(db.SRoles, {
  through: "User_SRoles",
});
db.SRoles.belongsToMany(db.SUsers, {
  through: "User_SRoles",
});

module.exports = db;
                          