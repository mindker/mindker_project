const express = require('express');
const router = express.Router();
const users = require('../domain/services/service-user');
const decks = require('../domain/services/service-deck');
const cards = require('../domain/services/service-card');
const difficulties = require('../domain/services/service-difficulty');
const { upload } = require('../middlewares/file');

router.get('/users', users.GetAll);
router.post('/users', upload.single('avatar'), users.Register);
router.delete('/users/:id', users.Delete);
router.patch('/users/:id', upload.single('avatar'), users.Update);
router.get('/users/:id', users.GetById);
router.get('/users/user/:nickName', users.GetByNickName);
router.get('/users/name/:name', users.GetByName);
router.post('/users/login', users.Login);

router.get('/decks', decks.GetAll);
router.post('/decks', upload.single('image'), decks.Create);
router.delete('/decks/:id', decks.Delete);
router.patch('/decks/:id', upload.single('image'), decks.Update);
router.get('/decks/:id', decks.GetById);
router.get('/decks/deck/:title', decks.GetByTitle);
router.get('/decks/author/:author', decks.GetByAuthor);

router.get('/cards', cards.GetAll);
router.post('/cards', upload.single('image'), cards.Create);
router.delete('/cards/:id', cards.Delete);
router.patch('/cards/:id', upload.single('image'), cards.Update);
router.get('/cards/:id', cards.GetById);

router.get('/difficulties', difficulties.GetAll);
router.delete('/difficulties/:id', difficulties.Delete);
router.patch('/difficulties/:id', difficulties.Update);
router.post('/difficulties', difficulties.Create);
router.get('/difficulties/:id', difficulties.GetById);
router.get('/difficulties/idUser/:idUser', difficulties.GetDifficultyByUserId);
module.exports = router;
