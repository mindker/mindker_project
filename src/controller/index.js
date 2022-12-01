const express = require('express');
const router = express.Router();
const users = require('../domain/services/service-user');
const decks = require('../domain/services/service-deck');
const cards = require('../domain/services/service-card');
//const difficulties = require('../domain/services/service-user');

router.get('/users', users.GetAll);
router.post('/users', users.Register);

router.get('/decks', decks.GetAll);
router.post('/decks', decks.Create);
router.delete('/decks/:id', decks.Delete);
router.patch('/decks/:id', decks.Update);
router.get('/decks/:id', decks.GetById);
router.get('/decks/deck/:title', decks.GetByTitle);
router.get('/decks/author/:author', decks.GetByAuthor);

router.get('/cards', cards.GetAll);
router.post('/cards', cards.Create);
router.delete('/cards/:id', cards.Delete);
router.patch('/cards/:id', cards.Update);
router.get('/cards/:id', cards.GetById);

module.exports = router;
