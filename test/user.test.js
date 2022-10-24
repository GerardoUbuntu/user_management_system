const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../index');
chai.should();
let expect = chai.expect;
chai.use(chaiHttp);

let defaultUser = {
  email: 'johndoe@gmail.com',
  password: 'Password@2022',
};

let token;

let newUser = {
  username: 'admin1',
  email: 'johndoe1@gmail.com',
  firstName: 'John1',
  lastName: 'Doe1',
  address: 'Sta. Mesa, Manila',
  contact: '09989208414',
  postcode: '1003',
};

describe('User API', function () {
  beforeEach((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signIn')
      .send(defaultUser)
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        done();
      });
  });

  describe('get all users', () => {
    it('should fetch all users successfully', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('add user', () => {
    it('should successfully add a user', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/')
        .set('Authorization', `Bearer ${token}`)
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          expect(res.body.data).to.be.an('object');
          done();
          newUser = res.body.data;
        });
    });
  });

  describe('update user', () => {
    it('should successfully update a user', (done) => {
      chai
        .request(app)
        .put(`/api/v1/users/${newUser.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'admin231',
          email: 'johndoe1@gmail.com',
          firstName: 'John1',
          lastName: 'Doe1',
          address: 'Sta. Mesa, Manila',
          contact: '09989208414',
          postcode: '1004',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          expect(res.body.message).to.be.equal(`Successfully updated user with id ${newUser.id} `);
          done();
        });
    });
  });

  describe('delete user', () => {
    it('should successfully delete a user', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/users/${newUser.id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          expect(res.body.message).to.be.equal(`Successfully deleted user with id ${newUser.id} `);
          done();
        });
    });
  });
});
