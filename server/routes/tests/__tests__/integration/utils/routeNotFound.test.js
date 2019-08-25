const request = require('supertest')
const app = require('app.js')

describe('utils', () => {
  describe('/routeNotFound integration', () => {
    describe('Success', () => {
      test('search', async () => {
        try {
          const res = await request(app.callback())
            .get('/an=example-of-a-route-that-does-not-exist')
            .expect(200)

          expect(res.body).toBeTruthy()
        } catch (err) {
          expect(1).toBeNull()
        }
      })
    })
  })
})
