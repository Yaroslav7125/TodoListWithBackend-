module.exports = {
  development: {
    username: 'postgres',
    password: '123',
    database: 'TodoDB',
    host: 'db',
    dialect: 'postgres',
    seederStorageTableName: 'SequelizeMetaSeeds',
    seederStorage: 'sequelize',
  },
  test: {
    username: 'postgres',
    password: '123',
    database: 'TodoDB',
    host: 'db',
    dialect: 'postgres',
    seederStorageTableName: 'SequelizeMetaSeeds',
    seederStorage: 'sequelize',
  },
  production: {
    username: 'postgres',
    password: '123',
    database: 'TodoDB',
    host: 'db',
    dialect: 'postgres',
    seederStorageTableName: 'SequelizeMetaSeeds',
    seederStorage: 'sequelize',
  },
};
