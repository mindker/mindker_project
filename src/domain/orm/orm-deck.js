const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

exports.GetAll = async () => {
  try {
    return await conn.db.connMongo.Deck.find().populate('author').populate('cards');
  } catch (error) {
    magic.LogDanger('Cannot getAll decks', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Create = async (
  title,
  description,
  image,
  cards,
  isOpen,
  idUser,
  likes,
  tags,
) => {
  try {
    const data = await new conn.db.connMongo.Deck({
      title: title,
      description: description,
      image: image,
      cards: cards,
      isOpen: isOpen,
      author: idUser,
      likes: likes,
      tags: tags,
    });

    const user = await conn.db.connMongo.User.findById(idUser);

    if (user) {
      data.author = user._id;
      user.createdDecks = user.createdDecks.concat(data._id);
      await user.save();
    }

    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create deck', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Delete = async (id) => {
  try {
    const deckToDelete = await conn.db.connMongo.Deck.findById(id);
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

exports.Update = async (id, updatedDeck) => {
  try {
    return await conn.db.connMongo.Deck.findByIdAndUpdate(id, updatedDeck);
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
    return await conn.db.connMongo.Deck.findOne({ title: title })
      .populate('author')
      .populate('cards');
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
