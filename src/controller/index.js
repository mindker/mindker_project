const express = require('express');
const router = express.Router();
const users = require('../domain/services/service-user');
const decks = require('../domain/services/service-deck');
const difficulties = require('../domain/services/service-difficulty');
const cards = require('../domain/services/service-card');

router.get('/users', users.GetAll);
