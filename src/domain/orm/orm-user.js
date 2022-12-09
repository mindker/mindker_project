const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { deleteFile } = require('../../middlewares/delete-file');

exports.GetAll = async (limit = 0, skip = 0) => {
  try {
    return await conn.db.connMongo.User.find({ isOpen: true })
      .populate('createdDecks')
      .populate('downloadedDecks')
      .skip(skip)
      .limit(limit);
  } catch (error) {
    magic.LogDanger('Cannot getAll users', error);
  }
};

exports.Register = async (
  Name,
  Nickname,
  Email,
  Password,
  req,
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
      createdDecks: CreatedDecks,
      downloadedDecks: DownloadedDecks,
      role: Role,
    });

    if (req.file) {
      data.avatar = req.file.path;
    } else {
      data.avatar = "there's no image";
    }

    data.password = bcrypt.hashSync(data.password, 8);
    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create user', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Login = async (nickname, req) => {
  try {
    const userInfo = await conn.db.connMongo.User.findOne({
      nickname: nickname,
    })
      .populate('downloadedDecks')
      .populate('createdDecks');

    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      userInfo.password = null;
      const token = jwt.sign(
        {
          name: userInfo.name,
          nickname: userInfo.nickname,
          email: userInfo.email,
          role: userInfo.role,
        },
        req.app.get('secretKey'),
        { expiresIn: '30h' },
      );
      return {
        user: userInfo,
        token: token,
      };
    } else {
      return console.log('Incorrect password');
    }
  } catch (error) {
    magic.LogDanger('Cannot log in the user', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Delete = async (id) => {
  try {
    const deletedUser = await conn.db.connMongo.User.findById(id);
    if (deletedUser.avatar) {
      await deleteFile(deletedUser.avatar);
    }
    return await conn.db.connMongo.User.deleteOne({ _id: id });
  } catch (error) {
    magic.LogDanger('Cannot Delete user', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Update = async (id, updatedUser, req) => {
  try {
    console.log('hemos entrado aqui sin token?');
    const olderUser = await conn.db.connMongo.User.findById(id);
    olderUser.avatar && deleteFile(olderUser.avatar);
    req.file
      ? (updatedUser.avatar = req.file.path)
      : (updatedUser.avatar = 'avatar did not change');
    updatedUser.password &&
      (updatedUser.password = bcrypt.hashSync(updatedUser.password, 8));

    return await conn.db.connMongo.User.findByIdAndUpdate(id, updatedUser);
  } catch (error) {
    magic.LogDanger('Cannot Update user', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetById = async (id) => {
  try {
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
