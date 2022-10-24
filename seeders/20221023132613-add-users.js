'use strict';
/** @type {import('sequelize-cli').Migration} */
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     *
     */
    const users = [];
    // insert admin user
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync('Password@2022', salt);
    const adminUser = {
      username: 'admin',
      firstName: 'John',
      lastName: 'Doe',
      address: 'Sta. Mesa, Manila',
      postcode: '1003',
      contact: '09989208414',
      password: hash,
      email: 'johndoe@gmail.com',
    };
    users.push(adminUser);
    for (let i = 1; i < 50; i++) {
      salt = bcrypt.genSaltSync(10);
      hash = bcrypt.hashSync('Password@2022', salt);
      users.push({
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: faker.address.city(),
        postcode: faker.address.zipCode(),
        contact: faker.phone.number('09#########'),
        password: hash,
        email: faker.internet.email(),
      });
    }

    console.log(users);

    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};
