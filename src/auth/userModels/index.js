'use strict';

const userModel = require('./userModel.js');
const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.DATABASE_URL === 'test' || 'sqlite::memory';

const DATABASE_CONFIG =  process.env.NODE_ENV === 'production' ?{
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },

} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

module.exports = {
  usersdb: sequelize,
  users: userModel(sequelize, DataTypes),
};