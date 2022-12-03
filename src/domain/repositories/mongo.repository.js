const config = require('config-yml');
const mongoose = require('mongoose');
const magic = require('../../utils/magic');
const user = require('../entities/entity-user');
const deck = require('../entities/entity-deck');
const difficulty = require('../entities/entity-difficulty');
const card = require('../entities/entity-card');
const dotenv = require('dotenv');
const { setUpCloudinary } = require('../../helpers/cloudinary');

dotenv.config();

let db = {};

if (config.db.mongodb && config.db.mongodb.length > 0) {
  config.db.mongodb.map((c) => {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db[c.nameconn] = {};
    db[c.nameconn].conn = mongoose;
    db[c.nameconn].User = user(mongoose);
    db[c.nameconn].Card = card(mongoose);
    db[c.nameconn].Difficulty = difficulty(mongoose);
    db[c.nameconn].Deck = deck(mongoose);
  });
  exports.db = db;
  setUpCloudinary();
  magic.LogInfo('Conectado a la base de datos');
} else {
  magic.LogDanger('No existe la base de datos');
}
