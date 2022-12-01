const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

exports.GetAll = async () => {
  try {
    return await conn.db.connMongo.Deck.find().populate('author');
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
  author,
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
      author: author,
      likes: likes,
      tags: tags,
    });
    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create deck', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Delete = async (id) => {
  try {
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
    console.log('el id : ' + id);
    return await conn.db.connMongo.Deck.findById(id); /* .populate('author'); */
  } catch (error) {
    magic.LogDanger('Cannot get the deck by its ID', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetByTitle = async (title) => {
  try {
    return await conn.db.connMongo.Deck.findOne({ title: title }).populate('author');
  } catch (error) {
    magic.LogDanger('Cannot get the deck by its title', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetByAuthor = async (authorId) => {
  try {
    const deckbyauthor = await conn.db.connMongo.Deck.find({ author: authorId });
    console.log(deckbyauthor);
    return await deckbyauthor;
  } catch (error) {
    magic.LogDanger('Cannot get the deck by its author', error);
    return await { err: { code: 123, message: error } };
  }
};
