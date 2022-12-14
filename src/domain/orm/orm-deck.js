const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');
const { deleteFile } = require('../../middlewares/delete-file');

exports.GetAll = async (limit = 0, skip = 0) => {
  try {
    return await conn.db.connMongo.Deck.find({ isOpen: true })
      .populate('cards')
      .skip(skip)
      .limit(limit);
  } catch (error) {
    magic.LogDanger('Cannot getAll decks', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Create = async (title, description, cards, isOpen, likes, tags, req) => {
  try {
    const data = await new conn.db.connMongo.Deck({
      title: title,
      description: description,
      cards: cards,
      isOpen: isOpen,
      likes: likes,
      tags: tags,
    });

    if (req.file) {
      data.image = req.file.path;
    } else {
      data.image =
        'https://res.cloudinary.com/drprserzu/image/upload/v1670867991/mindker/dirhbvxwym6mywamacog.png';
    }

    data.save();
    return data;
  } catch (error) {
    magic.LogDanger('Cannot Create deck', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Update = async (id, updatedDeck, req) => {
  try {
    const olderDeck = await conn.db.connMongo.Deck.findById(id);
    olderDeck.image && deleteFile(olderDeck.image);
    req.file
      ? (updatedDeck.image = req.file.path)
      : (updatedDeck.image = 'image did not change');
    return await conn.db.connMongo.Deck.findByIdAndUpdate(id, updatedDeck).populate(
      'cards',
    );
  } catch (error) {
    magic.LogDanger('Cannot Update deck', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetById = async (id) => {
  try {
    return await conn.db.connMongo.Deck.findById(id).populate('cards');
  } catch (error) {
    magic.LogDanger('Cannot get the deck by its ID', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetByTitle = async (title) => {
  try {
    const array = await conn.db.connMongo.Deck.findOne({ title: title }).populate(
      'cards',
    );
    const arrayObject = await new Array(array);
    return await arrayObject;
  } catch (error) {
    magic.LogDanger('Cannot get the deck by its title', error);
    return await { err: { code: 123, message: error } };
  }
};
