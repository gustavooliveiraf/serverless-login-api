module.exports = (date) => {
  return date.toLocaleDateString() + ' ' + date.toTimeString().substr(0, 8)
}