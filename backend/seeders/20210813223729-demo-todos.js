'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('todosTables', [{
        title: 'Купить не хлеб',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
       {
         title: 'Купить хлеб',
         completed: false,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         title: 'Купить полухлеб',
         completed: false,
         createdAt: new Date(),
         updatedAt: new Date(),
       }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('todosTables', null, {});
  },
};
