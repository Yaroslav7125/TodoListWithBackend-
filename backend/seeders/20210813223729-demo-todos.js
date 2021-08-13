'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Todoes', [{
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
     await queryInterface.bulkDelete('Todoes', null, {});
  },
};
