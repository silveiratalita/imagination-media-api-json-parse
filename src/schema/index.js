const mongoose = require('mongoose');

const collectionNames = {
  mappObject: 'mapp',
};

const mapp = {
  name: collectionNames.mappObject,
  schema: {
    origin: {type: String},
    static: {type: String},
    target: {type: String, required: false},
    convertion: {type: String, required: false},
  },
  options: {timestamps: true},
  indexes: [{origin: 1}],
};

module.exports.mapp = mapp;
