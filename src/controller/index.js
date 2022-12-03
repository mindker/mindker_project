const express = require('express');
const router = express.Router();
const users = require('../domain/services/service-user');
const decks = require('../domain/services/service-deck');
const cards = require('../domain/services/service-card');
const difficulties = require('../domain/services/service-difficulty');
const { upload } = require('../middlewares/file');
const { isAdmin } = require('../middlewares/admin.middleware');
const { isAuth } = require('../middlewares/auth.middleware');

router.get('/users', [isAdmin], users.GetAll);
router.post('/users', upload.single('avatar'), users.Register);
router.delete('/users/:id', [isAuth], users.Delete);
router.patch('/users/:id', [isAuth], upload.single('avatar'), users.Update);
router.get('/users/:id', [isAdmin], users.GetById);
router.get('/users/user/:nickName', [isAdmin], users.GetByNickName);
router.get('/users/name/:name', [isAdmin], users.GetByName);
router.post('/users/login', users.Login);

router.get('/decks', decks.GetAll);
router.post('/decks', [isAuth], upload.single('image'), decks.Create);
router.delete('/decks/:id', [isAuth], decks.Delete);
router.patch('/decks/:id', [isAuth], upload.single('image'), decks.Update);
router.get('/decks/:id', decks.GetById);
router.get('/decks/deck/:title', decks.GetByTitle);
router.get('/decks/author/:author', decks.GetByAuthor);

router.get('/cards', cards.GetAll);
router.post('/cards', [isAuth], upload.single('questionFile'), cards.Create);
router.delete('/cards/:id', [isAuth], cards.Delete);
router.patch('/cards/:id', [isAuth], upload.single('questionFile'), cards.Update);
router.get('/cards/:id', cards.GetById);

router.get('/difficulties', difficulties.GetAll);
router.delete('/difficulties/:id', difficulties.Delete);
router.patch('/difficulties/:id', difficulties.Update);
router.post('/difficulties', difficulties.Create);
router.get('/difficulties/:id', difficulties.GetById);
router.get('/difficulties/idUser/:idUser', difficulties.GetDifficultyByUserId);
module.exports = router;
