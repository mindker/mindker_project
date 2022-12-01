const express = require('express');
const router = express.Router();
const users = require('../domain/services/service-user');
/* const decks = require('../domain/services/service-deck');
const difficulties = require('../domain/services/service-user');
const cards = require('../domain/services/service-card'); */

router.get('/users', users.GetAll);

router.post('/users', users.Register);

module.exports = router;
