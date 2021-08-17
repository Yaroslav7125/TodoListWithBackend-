
import * as cors from '@koa/cors';
import * as Koa from 'koa';
import  {DataTypes,Sequelize} from 'sequelize';
import * as Router from 'koa-router';
import * as koaBody from 'koa-body';
// @ts-ignore
import * as todos from './models/todostable';
import * as dotenv from 'dotenv';
dotenv.config();

const koa = new Koa();
const router = new Router();
koa.use(cors());

type Todo = {
    title:string,
    completed:boolean,
    id?:number,
    updatedAt?:Date,
    createdAt?:Date,
};

/// db connecting
const sequelize = new Sequelize(process.env.DB_NAME||'TodoDB', process.env.DB_LOGIN || 'postgres', process.env.DB_PASSWORD || '123', {
    host: process.env.HOST||'localhost',
    dialect: 'postgres',
});

let dbTodos = todos(sequelize, DataTypes);

async function getTodos(){ // возвращает все таски
    let theTodo = await dbTodos.findAll();
    return theTodo.map((elm: { dataValues: any; })=>{
        return elm.dataValues;
    });
};

async function addTodo(todo: { title: any; completed: any; }){ // принимает обьект todo с полями title и completed, возвращает созданную туду
    if(todo.title){
        let addedTodo = await dbTodos.create({title:`${todo.title}`, completed:todo.completed});
        return addedTodo.dataValues;
    } else{
        return {};
    }
};

async function deleteTodo(todoId: any){ // принимает id элемента который следует удалить
    await dbTodos.destroy({
        where:{
           id:todoId,
       },
    });
};

async function changeCompleted(todoId: any, complFlag: any){//принимает id элемента который нужно изменить
    return (await dbTodos.update({completed:complFlag}, {
        where:{
            id:todoId,
        },returning:true,
    }))[1][0].dataValues;
};

async function changeTitleTodo(todoId: any, newTitle: any){ // принимает id tido и новый title к нему, возвращает новую tod'ушку
     return (await dbTodos.update({title:newTitle}, {
        where:{
            id:todoId,
        }, returning:true,
    }))[1][0].dataValues;
};

///end db connected
// @ts-ignore
router.get('/tasks',async (ctx: { body: never[]; status: number; })=>{ /// следует вернуть все таски        READ
        let todos = await getTodos();
        if(todos.length){
            ctx.body = (todos);
        } else {
            ctx.status = 204;
            ctx.body = [];
        }
})
    .post('/tasks', async (ctx:  any)=>{  // принимает обьект таски которую сетит в бд      CREATE
        let newTodo = (ctx.request.body);
        ctx.response.body = await addTodo(newTodo);
})
    .put('/tasks/change-title/:id', async (ctx:  any)=>{ // принимает id и новый title     UPDATE
        ctx.body = await changeTitleTodo(ctx.params.id, ctx.request.body.strTitle);
})
    .put('/tasks/change-completed/:id', async (ctx:  any)=>{ // принимает id и меняет completed у соответвующей таски    UPDATE
        ctx.body = await changeCompleted(ctx.params.id, ctx.request.body.todoCompleted);
})
    .delete('/tasks/:id', async (ctx: any)=>{ // принимает id на удаление       DELETE
    await deleteTodo(ctx.params.id);
    ctx.body = {id:ctx.params.id};
});

koa
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods());

koa.listen(process.env.PORT || 3000);

