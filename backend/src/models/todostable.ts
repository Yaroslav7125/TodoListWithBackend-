
import {ModelType, Sequelize} from "sequelize";

const {
  Model
} = require('sequelize');
module.exports = (sequelize: Sequelize, DataTypes: { STRING: any; BOOLEAN: any; }) => {
  class todosTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:ModelType) {
      // define association here
    }
  };
  todosTable.init({
    title: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'todosTable',
  });
  return todosTable;
};
