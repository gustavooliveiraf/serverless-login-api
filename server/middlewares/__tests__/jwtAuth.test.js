const jwtAuth = require('server/middlewares/jwtAuth')

// ========================= payloads =========================
const payload = {
  headers: {
    authentication: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiZ28zQGNpbi51ZnBlLmJyIiwiaWF0IjoxNTY2NzAzNTU2fQ.HHn-qqzNvZ60__a61DMYaBpyvqJG1ZqrE0um31CsIhk'
  }
}

// ========================= auxiliary functions =========================
const next = (value) => {
  return value
}

// ========================= start test =========================
describe('utils', () => {
    describe('Success', () => {
      test('jwtAuth', async () => {
        const checkPayload = await jwtAuth(payload, next)

        expect(checkPayload).toBe(true)
      })
    })

    describe('Error', () => {
      test('jwtAuth', async () => {
        const payloadError = { ...payload }
        payloadError.headers.authentication = 'test'

        const checkPayload = await jwtAuth(payloadError, next)

        expect(checkPayload).not.toBe(true)
      })
    })
})
