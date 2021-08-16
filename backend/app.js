const cors = require('@koa/cors');
const Koa = require('koa');
const  {DataTypes,Sequelize} = require('sequelize');
const Router = require('koa-router');
const koaBody = require('koa-body');
let todos = require('./models/todoes');
require('dotenv').config();

const koa = new Koa();
const router = new Router();
koa.use(cors());

/// db connecting
const sequelize = new Sequelize(process.env.DB_NAME||'TodoDB', process.env.DB_LOGIN || 'postgres', process.env.DB_PASSWORD || '123', {
    host: 'localhost',
    dialect: 'postgres',
});

let dbTodos = todos(sequelize, DataTypes);

async function getTodos(){
    let theTodo = await dbTodos.findAll({
        attributes: ['id', 'title', 'completed'],
    });
    return theTodo.map((elm)=>{
        return elm.dataValues;
    });
};

async function addTodo(todo){ // принимает обьект task с полями title, completed
    if(todo.title){
        let addedTodo = await dbTodos.create({title:`${todo.title}`, completed:todo.completed});
        return addedTodo.dataValues;
    } else{
        return {};
    }
};

async function deleteTodo(todoId){ // принимает id элемента который следует удалить
    await dbTodos.destroy({
        where:{
           id:todoId,
       },
    });
};

async function changeCompleted(todoId, complFlag){//принимает id элемента который нужно изменить
    let a = await dbTodos.update({completed:complFlag}, {
        where:{
            id:todoId,
        },
    });
    return (await dbTodos.findByPk(todoId)).dataValues;
};

async function changeTitleTodo(todoId, newTitle){
    const changedTodo = await dbTodos.update({title:newTitle}, {
        where:{
            id:todoId,
        },
    });
    return changedTodo;
};

///end db connected
router.get('/tasks',async (ctx)=>{ /// следует вернуть все таски        READ
        let todos = await getTodos();
        if(todos.length){
            ctx.body = (todos);
        } else {
            ctx.status = 204;
            ctx.body = [];
        }
})
    .post('/tasks', async (ctx)=>{  // принимает обьект таски которую сетит в бд      CREATE
    let newTodo = (ctx.request.body);
    newTodo.id = await addTodo(newTodo);
    ctx.response.body = newTodo;
})
    .put('/tasks/change-title/:id/:newTitle', async (ctx)=>{ // принимает id и новый title     UPDATE
   ctx.body = await changeTitleTodo(ctx.params.id, ctx.params.newTitle);
})
    .put('/tasks/change-completed/:id/:completFlag', async (ctx)=>{ // принимает id и меняет completed у соответвующей таски    UPDATE
    await changeCompleted(ctx.params.id, ctx.params.completFlag);
    ctx.body = 'Accepted';
    ctx.status = 202;
})
    .delete('/tasks/:id', async (ctx)=>{ // принимает id на удаление       DELETE
    await deleteTodo(ctx.params.id);
    ctx.body = {id:ctx.params.id};
});

koa
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods());

koa.listen(process.env.PORT || 3000);

