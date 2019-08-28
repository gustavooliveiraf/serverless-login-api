const request = require('supertest');
const { Joi } = require('server/utils');
const { guidTest, tokenTest } = require('config');

const { userControllerSchema } = require('_tests_/schemas/user');

const app = require('app.js');

// ========================= payloads =========================
const guid = guidTest;
const authentication = `bearer ${tokenTest}`;

// ========================= start test =========================
describe('user', () => {
  describe('/search integration', () => {
    describe('Success', () => {
      test('search', async () => {
        try {
          const res = await request(app.callback())
            .get(`/user/search/${guid}`)
            .set('authentication', authentication)
            .expect(200);

          const { error } = Joi.validate(res.body, userControllerSchema);

          expect(error).toBeNull();
        } catch (err) {
          expect(1).toBeNull();
        }
      });
    });

    describe('Error', () => {
      test('search', async () => {
        try {
          const res = await request(app.callback())
            .get(`/user/search/${'test'}`)
            .set('authentication', authentication)
            .expect(401);

          const { error } = Joi.validate(res.body, userControllerSchema);

          expect(error).not.toBeNull();
        } catch (err) {
          expect(err.statusCode).toEqual(401);
        }
      });
    });
  });
});
