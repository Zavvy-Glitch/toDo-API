'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const toDoModel = require('./questions/model.js.js');

const DATABASE_URL = process.env.DATABASE_URL === 'test' || 'sqlite::memory';

const DATABASE_CONFIG =  process.env.NODE_ENV === 'production' ?{
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },

} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG)

module.exports = {
  toDoDatabase: sequelize,
  toDo: toDoModel(sequelize, DataTypes)
};