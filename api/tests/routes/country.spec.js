/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  // beforeEach(() => Recipe.sync({ force: true })
  //   .then(() => Recipe.create(recipe)));
  // describe('GET /api/recipes', () => {
  //   it('should get 200', () =>
  //     agent.get('/api/recipes').expect(200)
  //   );
  // });
});

describe('/api/recipes', function() {
  it('GET respond with a status 200', function(){
    return agent
      .get('/api/recipes')
      .expect(function(res){
      expect(res.status).equal(200)})
  });
})
