const { msOffsetBrazil } = require('./constants')

module.exports = (date) => {
  let dateBrazil = new Date(date.valueOf() - msOffsetBrazil)

  return dateBrazil.toLocaleDateString() + ' ' + dateBrazil.toTimeString().substr(0, 8)
}
