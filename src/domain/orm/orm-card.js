const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');
const { deleteFile } = require('../../middlewares/delete-file');

exports.GetAll = async () => {
  try {
    return await conn.db.connMongo.City.find().populate('places');
  } catch (error) {
    magic.LogDanger('Cannot getAll cities', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Create = async (name, country, population, history, places, req) => {
  try {
    const data = await new conn.db.connMongo.City({
      name: name,
      country: country,
      population: population,
      history: history,
      places: places,
    });

    if (req.file) {
      data.mapImage = req.file.path;
    } else {
      data.mapImage = "there's no image";
    }

    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create city', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Delete = async (id) => {
  try {
    const deletedCity = await conn.db.connMongo.City.findById(id);
    if (deletedCity.mapImage) {
      await deleteFile(deletedCity.mapImage);
    }
    return await conn.db.connMongo.City.deleteOne({ _id: id });
  } catch (error) {
    magic.LogDanger('Cannot Delete city', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Update = async (id, updatedCity, req) => {
  try {
    const olderCity = await conn.db.connMongo.City.findById(id);

    olderCity.mapImage && deleteFile(olderCity.mapImage);
    req.file
      ? (updatedCity.mapImage = req.file.path)
      : (updatedCity.mapImage = "there's no image");

    return await conn.db.connMongo.City.findByIdAndUpdate(id, updatedCity);
  } catch (error) {
    magic.LogDanger('Cannot Update city', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetById = async (id) => {
  try {
    return await conn.db.connMongo.City.findById(id).populate('places');
  } catch (error) {
    magic.LogDanger('Cannot get the city its ID', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetByName = async (name) => {
  try {
    return await conn.db.connMongo.City.findOne({ name: name }).populate(
      'places'
    );
  } catch (error) {
    magic.LogDanger('Cannot get the city by its name', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetByCountry = async (country) => {
  try {
    const filterByCountry = await conn.db.connMongo.City.find().populate(
      'places'
    );
    return await filterByCountry.filter((c) => c.country == country);
  } catch (error) {
    magic.LogDanger('Cannot get the city by its country', error);
    return await { err: { code: 123, message: error } };
  }
};
