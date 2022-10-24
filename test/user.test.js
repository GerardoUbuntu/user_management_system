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

let newUser;
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

  describe('update user', () => {
    it('should fetch all users successfully', (done) => {
      chai
        .request(app)
        .get(`/api/v1/users/${newUser.id}`)
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

  describe('delete user', () => {
    it('should fetch all users successfully', (done) => {
      chai
        .request(app)
        .get(`/api/v1/users/${newUser.id}`)
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
});
