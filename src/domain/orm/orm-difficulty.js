const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');
exports.GetAll = async () => {
  try {
    return await conn.db.connMongo.Difficulty.find(); //.populate('decks')
  } catch (error) {
    magic.LogDanger('Cannot getAll difficulties', error);
  }
};

exports.Create = async (idUser, level) => {
  try {
    const data = await new conn.db.connMongo.Difficulty({
      idUser: idUser,
      level: level,
    });

    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create Difficulty', error);
    return await { err: { code: 123, message: error } };
  }
};
exports.Delete = async (id) => {
  try {
    return await conn.db.connMongo.Difficulty.findByIdAndDelete(id);
  } catch (error) {
    magic.LogDanger('Cannot Delete the difficulty', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Update = async (id, updatedDifficulty) => {
  try {
    return await conn.db.connMongo.Difficulty.findByIdAndUpdate(id, updatedDifficulty);
  } catch (error) {
    magic.LogDanger('Cannot Update Difficulty', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetById = async (id) => {
  try {
    return await conn.db.connMongo.Difficulty.findById(id); /* .populate('author'); */
  } catch (error) {
    magic.LogDanger('Cannot get the difficulty by its ID', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetDifficultyByUserId = async (idUser) => {
  try {
    return await conn.db.connMongo.Difficulty.find({ idUser: idUser }); //populate('')
  } catch (error) {
    magic.LogDanger('Cannot get the difficulty by its userId', error);
    return await { err: { code: 123, message: error } };
  }
};
