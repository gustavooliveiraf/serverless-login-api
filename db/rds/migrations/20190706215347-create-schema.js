module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createSchema('security');
    await queryInterface.createSchema('register');
  },
};
