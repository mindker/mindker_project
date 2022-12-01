const express = require('express');
const router = express.Router();
const users = require('../domain/services/service-user');
const decks = require('../domain/services/service-deck');

/* const difficulties = require('../domain/services/service-user');
const cards = require('../domain/services/service-card'); 
 */
router.get('/users', users.GetAll);

router.post('/users', users.Register);


router.get('/decks', decks.GetAll);
router.post('/decks', decks.Create);
router.delete('/decks/:id', decks.Delete);
router.patch('/decks/:id', decks.Update);
router.get('/decks/:id', decks.GetById);
router.get('/decks/deck/:title', decks.GetByTitle);
router.get('/decks/author/:author', decks.GetByAuthor);


module.exports = router;
