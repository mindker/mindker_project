const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

exports.GetAll = async () => {
  try {
    return await conn.db.connMongo.User.find(); //.populate('decks')
  } catch (error) {
    magic.LogDanger('Cannot getAll users', error);
  }
};
