const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');
const { deleteFile } = require('../../middlewares/delete-file');

exports.GetAll = async (limit = 0, skip = 0) => {
  try {
    return await conn.db.connMongo.Card.find().skip(skip).limit(limit);
  } catch (error) {
    magic.LogDanger('Cannot getAll cards', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Create = async (question, answer, req) => {
  try {
    const data = await new conn.db.connMongo.Card({
      question: question,
      answer: answer,
    });
    if (req.file) {
      data.questionFile = req.file.path;
    } else {
      data.questionFile =
        'https://res.cloudinary.com/drprserzu/image/upload/v1670867991/mindker/dirhbvxwym6mywamacog.png';
    }
    data.save();
    return data;
  } catch (error) {
    magic.LogDanger('Cannot Create Card', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Delete = async (id) => {
  try {
    const cardToDelete = await conn.db.connMongo.Card.findById(id);
    if (cardToDelete.questionFile) {
      await deleteFile(cardToDelete.questionFile);
    }
    return await conn.db.connMongo.Card.findByIdAndDelete(id);
  } catch (error) {
    magic.LogDanger('Cannot Delete Card', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Update = async (id, updatedCard, req) => {
  try {
    const olderCard = await conn.db.connMongo.Card.findById(id);
    olderCard.image && deleteFile(olderCard.image);
    req.file ? (updatedCard.image = req.file.path) : null;
    return await conn.db.connMongo.Card.findByIdAndUpdate(id, updatedCard);
  } catch (error) {
    magic.LogDanger('Cannot Update Card', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetById = async (id) => {
  try {
    return await conn.db.connMongo.Card.findById(id);
  } catch (error) {
    magic.LogDanger('Cannot get the Card by its ID', error);
    return await { err: { code: 123, message: error } };
  }
};
