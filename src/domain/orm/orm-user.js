const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');
const bcrypt = require('bcrypt');
exports.GetAll = async () => {
  try {
    return await conn.db.connMongo.User.find(); //.populate('decks')
  } catch (error) {
    magic.LogDanger('Cannot getAll users', error);
  }
};

exports.Register = async (
  Name,
  Nickname,
  Email,
  Password,
  Avatar,
  CreatedDecks,
  DownloadedDecks,
) => {
  try {
    const data = await new conn.db.connMongo.User({
      name: Name,
      nickname: Nickname,
      email: Email,
      password: Password,
      avatar: Avatar,
      createdDecks: CreatedDecks,
      downloadedDecks: DownloadedDecks,
    });

    data.password = bcrypt.hashSync(data.password, 8);
    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create user', error);
    return await { err: { code: 123, message: error } };
  }
};
