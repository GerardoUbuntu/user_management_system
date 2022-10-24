const db = require('../models');
const User = db.user;

let userService = {
  create: async (user) => {
    return new Promise(async (resolve, reject) => {
      const result = await User.create(user).catch((err) => reject(err));
      resolve(result);
    });
  },
  findAll: async () => {
    return new Promise(async (resolve, reject) => {
      const results = await User.findAll({
        attributes: { exclude: ['password'] },
      }).catch((err) => reject(err));
      resolve(results);
    });
  },

  findById: (id) => {
    return new Promise(async (resolve, reject) => {
      const result = await User.findByPk(id, {
        attributes: { exclude: ['password'] },
      }).catch((err) => reject(err));
      resolve(result);
    });
  },

  findBy: (field, value) => {
    return new Promise(async (resolve, reject) => {
      const result = await User.findOne({
        where: { [field]: value },
      }).catch((err) => reject(err));
      resolve(result);
    });
  },

  deleteUser: (id) => {
    return new Promise(async (resolve, reject) => {
      await User.destroy({
        where: {
          id: id,
        },
      }).catch((err) => reject(err));
      resolve(`Successfully deleted user with id ${id} `);
    });
  },

  editUser: (user) => {
    return new Promise(async (resolve, reject) => {
      await User.update(user, {
        where: {
          id: user.id,
        },
      }).catch((err) => reject(err));
      resolve(`Successfully updated user with id ${user.id} `);
    });
  },
};

module.exports = userService;
