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
