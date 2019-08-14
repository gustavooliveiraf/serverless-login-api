const { msOffsetBrazil } = require('./constants')

module.exports = (date) => {
  const dateBrazil = new Date(date.valueOf() - msOffsetBrazil)

  return dateBrazil.toLocaleDateString() + ' ' + dateBrazil.toTimeString().substr(0, 8)
}
