const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');
const { deleteFile } = require('../../middlewares/delete-file');

exports.GetAll = async (limit = 0, skip = 0) => {
  try {
    return await conn.db.connMongo.Deck.find({ isOpen: true })
      .populate('author')
      .populate('cards')
      .skip(skip)
      .limit(limit);
  } catch (error) {
    magic.LogDanger('Cannot getAll decks', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Create = async (title, description, cards, isOpen, idUser, likes, tags, req) => {
  try {
    const data = await new conn.db.connMongo.Deck({
      title: title,
      description: description,
      cards: cards,
      isOpen: isOpen,
      author: idUser,
      likes: likes,
      tags: tags,
    });

    if (req.file) {
      data.image = req.file.path;
    } else {
      data.image = "there's no image";
    }

    const user = await conn.db.connMongo.User.findById(idUser);

    if (user) {
      data.author = user._id;
      user.createdDecks = user.createdDecks.concat(data._id);
      await user.save();
    }

    data.save();
    return data;
  } catch (error) {
    magic.LogDanger('Cannot Create deck', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Delete = async (id) => {
  try {
    const deckToDelete = await conn.db.connMongo.Deck.findById(id);
    if (deckToDelete.image) {
      await deleteFile(deckToDelete.image);
    }
    const user = await conn.db.connMongo.User.findById(deckToDelete.author);
    if (user && (!deckToDelete.isOpen || user.role === 'admin')) {
      for (const deck of user.createdDecks) {
        if (deck == id) {
          const position = user.createdDecks.indexOf(deck);
          user.createdDecks.splice(position, 1);
        }
      }
      await user.save();
    }
    return await conn.db.connMongo.Deck.findByIdAndDelete(id);
  } catch (error) {
    magic.LogDanger('Cannot Delete deck', error);
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
    return await conn.db.connMongo.Deck.findByIdAndUpdate(id, updatedDeck)
      .populate('author')
      .populate('cards');
  } catch (error) {
    magic.LogDanger('Cannot Update deck', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetById = async (id) => {
  try {
    return await conn.db.connMongo.Deck.findById(id).populate('author').populate('cards');
  } catch (error) {
    magic.LogDanger('Cannot get the deck by its ID', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetByTitle = async (title) => {
  try {
    const array = await conn.db.connMongo.Deck.findOne({ title: title })
      .populate('author')
      .populate('cards');
    const arrayObject = await new Array(array);
    return await arrayObject;
  } catch (error) {
    magic.LogDanger('Cannot get the deck by its title', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetByAuthor = async (authorId) => {
  try {
    const deckbyauthor = await conn.db.connMongo.Deck.find({ author: authorId })
      .populate('author')
      .populate('cards');
    return await deckbyauthor;
  } catch (error) {
    magic.LogDanger('Cannot get the deck by its author', error);
    return await { err: { code: 123, message: error } };
  }
};
