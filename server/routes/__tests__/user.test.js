const nock = require('nock')
const fetch = require('node-fetch')

const payload = {
  "id": 7,
  "name": "gustavo",
  "email": "gof@cin.ufpe.br",
  "cep": "57041-100",
  "guid": "113866f0-bf87-11e9-8f7e-035a9a6017a3",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjU4OTIyNDR9.cDjQIFHX3MqwT5oavGO3YY8Z9ROOdPUnIUqnB1PXwno",
  "lastLogin": "15:04:04 15/8/2019",
  "updatedAt": "15:04:04 15/8/2019",
  "createdAt": "15:04:04 15/8/2019",
  "geolocation": {
      "type": "Point",
      "coordinates": [
          -9.6430276,
          -35.7205075
      ]
  },
  "phones": [{
    "number": "123455678",
    "ddd": "81"
  }]
}

test('route/user', async () => {
    nock('http://www.globo.com')
      .persist()
      .get('/user')
      .reply(200, payload);

    const scope = await (await fetch('http://localhost:3000/user/list')).json()

    console.log('---------')
    console.log(scope)
    console.log('---------')

    expect('scope').toBe('scope');
})
