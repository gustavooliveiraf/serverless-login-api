module.exports = {
  up: async (queryInterface, _) => {
    await queryInterface.createSchema('security')
    await queryInterface.createSchema('register')
  },
}
