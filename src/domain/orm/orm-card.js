const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');
const { deleteFile } = require('../../middlewares/delete-file');

exports.GetAll = async () => {
  try {
    return await conn.db.connMongo.Card.find().populate('difficulty');
  } catch (error) {
    magic.LogDanger('Cannot getAll cards', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Create = async (question, answer, resources, difficulty, idDeck, req) => {
  try {
    const data = await new conn.db.connMongo.Card({
      question: question,
      answer: answer,
      resources: resources,
      difficulty: difficulty,
      idDeck: idDeck,
    });
    if (req.file) {
      data.questionFile = req.file.path;
    } else {
      data.questionFile = 'no image question';
    }
    const deck = await conn.db.connMongo.Deck.findById(idDeck);
    if (deck) {
      data.idDeck = deck._id;
      deck.cards = deck.cards.concat(data._id);
      await deck.save();
    }
    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create Card', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Delete = async (id) => {
  try {
    const cardToDelete = await conn.db.connMongo.Card.findById(id);
    const deck = await conn.db.connMongo.Deck.findById(cardToDelete.idDeck);
    const user = await conn.db.connMongo.User.findById(deck.author);
    if (deck && (!deck.isOpen || user.role == 'admin')) {
      if (cardToDelete.questionFile) {
        await deleteFile(cardToDelete.questionFile);
      }
      for (const card of deck.cards) {
        if (card == id) {
          const position = deck.cards.indexOf(card);
          deck.cards.splice(position, 1);
        }
      }
      await deck.save();
      return await conn.db.connMongo.Card.findByIdAndDelete(id);
    } else {
      return magic.LogDanger(
        'Cannot Delete Card because you are not an admin or this deck is not private',
      );
    }
  } catch (error) {
    magic.LogDanger('Cannot Delete Card', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Update = async (id, updatedCard, req) => {
  try {
    const olderCard = await conn.db.connMongo.Card.findById(id);
    olderCard.image && deleteFile(olderCard.image);
    req.file
      ? (updatedCard.image = req.file.path)
      : (updatedCard.image = "there's no image");
    return await conn.db.connMongo.Card.findByIdAndUpdate(id, updatedCard);
  } catch (error) {
    magic.LogDanger('Cannot Update Card', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetById = async (id) => {
  try {
    return await conn.db.connMongo.Card.findById(id).populate('difficulty');
  } catch (error) {
    magic.LogDanger('Cannot get the Card by its ID', error);
    return await { err: { code: 123, message: error } };
  }
};
