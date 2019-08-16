const user = require('./server/validators/user')

const ctx = {
  a: 'a',
  b: 'b'
}

const next = async (ctx) => {
  console.log('--------')
  console.log(arguments[0])
  console.log('--------')
}

user.create(ctx, next)
