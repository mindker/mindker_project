const magic = require('../../utils/magic');
const enum_ = require('../../utils/enum');
const ormUser = require('../orm/orm-user');

exports.GetAll = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let respOrm = await ormUser.GetAll();
    if (respOrm.err) {
      (status = 'Failure'),
        (errorcode = respOrm.err.code),
        (message = respOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success GetAll Users'),
        (data = respOrm),
        (statuscode = data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    magic.LogDanger('error: ', error);
    response = await magic.ResponseService('Failure', enum_.CODE_BAD_REQUEST, error, '');
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};

exports.Register = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    const Name = req.body.name;
    const Nickname = req.body.nickname;
    const Email = req.body.email;
    const Password = req.body.password;
    const CreatedDecks = req.body.createdDecks;
    const DownloadedDecks = req.body.downloadedDecks;
    if (Name && Nickname && Email && Password) {
      let respOrm = await ormUser.Register(
        Name,
        Nickname,
        Email,
        Password,
        req,
        CreatedDecks,
        DownloadedDecks,
      );
      if (respOrm.err) {
        (status = 'Failure'),
          (errorcode = respOrm.err.code),
          (message = respOrm.err.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'User created'), (data = respOrm), (statuscode = enum_.CODE_CREATED);
      }
    } else {
      (status = 'Failure'),
        (errorcode = enum_.ERROR_REQUIRED_FIELD),
        (message = 'All fields are required'),
        (statuscode = enum_.CODE_BAD_REQUEST);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', ''));
  }
};

exports.Login = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    const Nickname = req.body.nickname;
    const Password = req.body.password;

    if (Nickname && Password) {
      let respOrm = await ormUser.Login(Nickname, req);

      if (respOrm.err) {
        (status = 'Failure'),
          (errorcode = respOrm.err.code),
          (message = respOrm.err.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'User logged in'), (data = respOrm), (statuscode = enum_.CODE_OK);
      }
    } else {
      (status = 'Failure'),
        (errorcode = enum_.ERROR_REQUIREDFIELD),
        (message = 'All fields are required'),
        (statuscode = enum_.CODE_BAD_REQUEST);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', ''));
  }
};

exports.Delete = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    const { id } = req.params;
    if (id) {
      let respOrm = await ormUser.Delete(id);
      if (respOrm.err) {
        (status = 'Failure'),
          (errorcode = respOrm.err.code),
          (message = respOrm.err.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'User deleted'), (statuscode = enum_.CODE_OK), (data = respOrm);
      }
    } else {
      (status = 'Failure'),
        (errorcode = enum_.ERROR_REQUIRED_FIELD),
        (message = 'id does not exist'),
        (statuscode = enum_.CODE_UNPROCESSABLE_ENTITY);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', ''));
  }
};
exports.Update = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    const { id } = req.params;

    const updatedUser = {
      name: req.body.name,
      nickname: req.body.nickname,
      password: req.body.password,
      email: req.body.email,
      createdDecks: req.body.createdDecks,
      downloadedDecks: req.body.downloadedDecks,
      _id: id,
    };

    if (id && updatedUser) {
      let respOrm = await ormUser.Update(id, updatedUser, req);

      if (respOrm.err) {
        (status = 'Failure'),
          (errorcode = respOrm.err.code),
          (message = respOrm.err.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'User updated'), (statuscode = enum_.CODE_OK), (data = updatedUser);
      }
    } else {
      (status = 'Failure'),
        (errorcode = enum_.ERROR_REQUIRED_FIELD), //este error no cuadra
        (message = 'id does not exist'),
        (statuscode = enum_.CODE_UNPROCESSABLE_ENTITY);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', ''));
  }
};

exports.GetById = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    const { id } = req.params;
    let respOrm = await ormUser.GetById(id);
    if (respOrm.err) {
      (status = 'Failure'),
        (errorcode = respOrm.err.code),
        (message = respOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success getting the user'),
        (data = respOrm),
        (statuscode = data ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    magic.LogDanger('error: ', error);
    response = await magic.ResponseService('Failure', enum_.CODE_BAD_REQUEST, error, '');
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};

exports.GetByNickName = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    const { nickName } = req.params;
    let respOrm = await ormUser.GetByNickName(nickName);

    if (respOrm.err) {
      (status = 'Failure'),
        (errorcode = respOrm.err.code),
        (message = respOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success getting the user'),
        (data = respOrm),
        (statuscode = data ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    magic.LogDanger('error: ', error);
    response = await magic.ResponseService('Failure', enum_.CODE_BAD_REQUEST, error, '');
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};

exports.GetByName = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    const { name } = req.params;
    let respOrm = await ormUser.GetByName(name);
    if (respOrm.err) {
      (status = 'Failure'),
        (errorcode = respOrm.err.code),
        (message = respOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success getting the user'),
        (data = respOrm),
        (statuscode = data ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    magic.LogDanger('error: ', error);
    response = await magic.ResponseService('Failure', enum_.CODE_BAD_REQUEST, error, '');
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};
