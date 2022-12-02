const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');
const bcrypt = require('bcrypt');
exports.GetAll = async () => {
  try {
    return await conn.db.connMongo.User.find().populate('createdDecks');
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
  Role,
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
      role: Role,
    });

    data.password = bcrypt.hashSync(data.password, 8);
    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create user', error);
    return await { err: { code: 123, message: error } };
  }
};
exports.Delete = async (id) => {
  try {
    return await conn.db.connMongo.User.findByIdAndDelete(id);
  } catch (error) {
    magic.LogDanger('Cannot Delete user', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Update = async (id, updatedUser) => {
  try {
    return await conn.db.connMongo.User.findByIdAndUpdate(id, updatedUser);
  } catch (error) {
    magic.LogDanger('Cannot Update user', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetById = async (id) => {
  try {
    console.log('el id : ' + id);
    return await conn.db.connMongo.User.findById(id); /* .populate('author'); */
  } catch (error) {
    magic.LogDanger('Cannot get the user by its ID', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetByNickName = async (nickName) => {
  try {
    return await conn.db.connMongo.User.findOne({ nickName: nickName }); //populate('')
  } catch (error) {
    magic.LogDanger('Cannot get the user by its nickname', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetByName = async (name) => {
  try {
    return await conn.db.connMongo.User.find({ name: name });
  } catch (error) {
    magic.LogDanger('Cannot get the deck by its name', error);
    return await { err: { code: 123, message: error } };
  }
};
