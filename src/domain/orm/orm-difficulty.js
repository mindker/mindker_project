const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

exports.GetAll = async (limit = 0, skip = 0) => {
  try {
    return await conn.db.connMongo.Difficulty.find().skip(skip).limit(limit);
  } catch (error) {
    magic.LogDanger('Cannot getAll difficulties', error);
  }
};

exports.Create = async (idUser, level, idCard) => {
  try {
    const data = await new conn.db.connMongo.Difficulty({
      idUser: idUser,
      level: level,
      idCard: idCard,
    });

    const card = await conn.db.connMongo.Card.findById(idCard);

    if (card) {
      data.idCard = card._id;
      card.difficulty = card.difficulty.concat(data._id);
      await card.save();
    }

    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create Difficulty', error);
    return await { err: { code: 123, message: error } };
  }
};
exports.Delete = async (id) => {
  try {
    const difficultyToDelete = await conn.db.connMongo.Difficulty.findById(id);
    const card = await conn.db.connMongo.Card.findById(difficultyToDelete.idCard);
    const user = await conn.db.connMongo.User.findById(difficultyToDelete.idUser);
    if (card && (!card.isOpen || user.role === 'admin')) {
      for (const difficulty of card.difficulty) {
        if (difficulty == id) {
          const position = card.difficulty.indexOf(difficulty);
          card.difficulty.splice(position, 1);
        }
      }
    }
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
