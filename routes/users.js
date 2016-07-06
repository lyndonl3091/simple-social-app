'use strict';

const express = require('express');
const User = require('../models/user');

let router = express.Router();



router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if(err) return res.status(400).send(err);
    res.send(users)
  })
})

router.get('/profile', User.authMiddleware, (req, res) => {
  res.send(req.user);
})

router.post('/register', (req, res) => {
  User.register(req.body, err => {
    res.status(err ? 400 : 200).send(err);
  })
});

router.post('/login', (req, res) => {

  User.authenticate(req.body, (err, user) => {
    if(err) return res.status(400).send(err);

    let token = user.generateToken();

    res.cookie('authtoken', token).send(user)
  })
})

router.post('/logout', (req, res) => {
  res.clearCookie('authtoken').send();
});

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, err => {
    res.status(err ? 400 : 200).send(err);
  })
})

module.exports = router;
