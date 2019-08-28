const request = require('supertest');
const app = require('app.js');

describe('utils', () => {
  describe('/status integration', () => {
    describe('Success', () => {
      test('search', async () => {
        try {
          const res = await request(app.callback())
            .get('/status')
            .expect(200);

          expect(res.body).toBeTruthy();
        } catch (err) {
          expect(1).toBeNull();
        }
      });
    });
  });
});
