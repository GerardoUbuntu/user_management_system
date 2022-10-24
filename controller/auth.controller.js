require('dotenv').config();
const status = require('http-status');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findBy, create, findById } = require('../service/user.service');

module.exports = {
  signUp: async (req, res) => {
    const user = req.body;
    console.log(user);
    // check for existing user
    const email = await findBy('email', user.email).catch((err) => {
      return res.status(status.INTERNAL_SERVER_ERROR).json({ msg: err });
    });

    if (email)
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ msg: `User with email ${user.email} already exists` });

    const username = await findBy('username', user.username).catch((err) => {
      return res.status(status.INTERNAL_SERVER_ERROR).json({ msg: err });
    });
    if (username)
      return res.status(status.INTERNAL_SERVER_ERROR).json({
        msg: `User with username ${user.username} already exists`,
      });
    const newUser = user;
    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        create(user)
          .then((user) => {
            return res.status(status.OK).json({
              user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
              },
            });
          })
          .catch((err) => {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ msg: err });
          });
      });
    });
  },

  signIn: async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    findBy('email', email)
      .then((user) => {
        if (!user)
          return res.status(status.INTERNAL_SERVER_ERROR).json({ msg: 'User Does not exist' });

        // Validate password
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch)
            return res.status(status.INTERNAL_SERVER_ERROR).json({ msg: 'Invalid Credentials' });
          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            {
              expiresIn: 3600,
            },
            (err, token) => {
              if (err) throw err;
              return res.status(status.OK).json({
                token,
                user: {
                  id: user.id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  username: user.username,
                  email: user.email,
                },
              });
            }
          );
        });
      })
      .catch((err) => {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ msg: err });
      });
  },

  loadUser: async (req, res) => {
    try {
      const users = await findById(req.user.id);
      if (!users) throw Error('No users exist');
      res.status(status.OK).json(users);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  },
};
