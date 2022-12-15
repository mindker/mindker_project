const express = require('express');
const router = express.Router();
const users = require('../domain/services/service-user');
const decks = require('../domain/services/service-deck');
const cards = require('../domain/services/service-card');
const { upload } = require('../middlewares/file');
const { isAdmin } = require('../middlewares/admin.middleware');
const { isAuth } = require('../middlewares/auth.middleware');

router.get('/users', users.GetAll); //poner isadmin
router.post('/users', upload.single('avatar'), users.Register);
router.delete('/users/:id', [isAuth], users.Delete);
router.patch('/users/:id', [isAuth], upload.single('avatar'), users.Update);
router.get('/users/:id', [isAdmin], users.GetById);
router.get('/users/user/:nickName', users.GetByNickName);
router.get('/users/name/:name', users.GetByName);
router.post('/users/login', users.Login);

router.get('/decks', decks.GetAll);
router.post('/decks', upload.single('image'), decks.Create);
router.delete('/decks/:id', [isAuth], decks.Delete);
router.patch('/decks/:id', [isAuth], upload.single('image'), decks.Update);
router.get('/decks/:id', decks.GetById);
router.get('/decks/deck/:title', decks.GetByTitle);

router.get('/cards', cards.GetAll);
router.post('/cards', [isAuth], upload.single('questionFile'), cards.Create);
router.delete('/cards/:id', [isAuth], cards.Delete);
router.patch('/cards/:id', [isAuth], upload.single('questionFile'), cards.Update);
router.get('/cards/:id', cards.GetById);

module.exports = router;
